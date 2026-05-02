import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { THEMES } from '@/data/products'
import { type User, setAuthToken } from '@/services/userService'
import { type Product, type Category, categoryService, productService } from '@/services/productService'

export interface CartItem {
  id: string
  size: string
  qty: number
}

export const useAppStore = defineStore('app', () => {
  // State
  const currentPage = ref('shop')
  const currentUser = ref<User | null>(null)
  const products    = ref<Product[]>([])
  const categories  = ref<Category[]>([])
  const filter      = ref('all')           // 'all' | 'search' | category Guid
  const cart        = ref<CartItem[]>([])
  const wishlist    = ref<Set<string>>(new Set())
  const themeIdx    = ref(0)
  const checkoutStep   = ref(0)
  const toastMsg       = ref('')
  const toastVisible   = ref(false)
  const sheetProduct   = ref<Product | null>(null)
  const sheetOpen      = ref(false)
  const productsLoaded = ref(false)
  const previewProduct = ref<Product | null>(null)
  let toastTimeout: ReturnType<typeof setTimeout> | null = null

  // ── Confirm dialog ─────────────────────────────────────────────────────────
  const confirmOpen   = ref(false)
  const confirmTitle  = ref('Confirm')
  const confirmMsg    = ref('')
  const confirmDanger = ref(false)
  let   _confirmResolve: ((v: boolean) => void) | null = null

  const showConfirm = (
    msg: string,
    opts?: { title?: string; danger?: boolean }
  ): Promise<boolean> =>
    new Promise(resolve => {
      confirmMsg.value    = msg
      confirmTitle.value  = opts?.title   ?? 'Confirm'
      confirmDanger.value = opts?.danger  ?? false
      confirmOpen.value   = true
      _confirmResolve     = resolve
    })

  const resolveConfirm = (value: boolean) => {
    confirmOpen.value = false
    _confirmResolve?.(value)
    _confirmResolve   = null
  }

  const STORAGE_TOKEN = 'st_token'
  const STORAGE_USER  = 'st_user'
  const STORAGE_THEME = 'st_theme'

  // Restore session — also evict tokens that use the old integer role claim
  const signInOpen = ref(false)
  const savedToken = localStorage.getItem(STORAGE_TOKEN)
  const savedUser  = localStorage.getItem(STORAGE_USER)
  if (savedToken && savedUser) {
    try {
      // Decode JWT payload to check role claim format
      const payloadB64 = savedToken.split('.')[1]
      const payload    = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')))
      const roleRaw    = payload['role'] ?? payload['Role']
      // Old tokens store role as "0" or "1" (integers) — evict them
      if (roleRaw === '0' || roleRaw === '1' || roleRaw === 0 || roleRaw === 1) {
        localStorage.removeItem(STORAGE_TOKEN)
        localStorage.removeItem(STORAGE_USER)
        setAuthToken(null)
      } else {
        currentUser.value = JSON.parse(savedUser) as User
        setAuthToken(savedToken)
      }
    } catch {
      currentUser.value = JSON.parse(savedUser) as User
      setAuthToken(savedToken)
    }
  }

  // Restore theme
  const savedTheme = localStorage.getItem(STORAGE_THEME)
  if (savedTheme) {
    const idx = THEMES.findIndex(t => t.id === savedTheme)
    if (idx !== -1) {
      themeIdx.value = idx
      document.documentElement.dataset.theme = savedTheme
    }
  }

  // ── Auth ──────────────────────────────────────────────────────────────────
  const setUser = (user: User, token?: string) => {
    currentUser.value = user
    localStorage.setItem(STORAGE_USER, JSON.stringify(user))
    if (token) {
      setAuthToken(token)
      localStorage.setItem(STORAGE_TOKEN, token)
    }
  }
  const clearUser = () => {
    currentUser.value = null
    setAuthToken(null)
    localStorage.removeItem(STORAGE_TOKEN)
    localStorage.removeItem(STORAGE_USER)
  }
  const openSignIn  = () => { signInOpen.value = true }
  const closeSignIn = () => { signInOpen.value = false }

  const handleUnauthorized = () => {
    clearUser()
    cart.value     = []
    wishlist.value = new Set()
    currentPage.value  = 'shop'
    checkoutStep.value = 0
    showToast('Session expired. Please sign in again.')
    openSignIn()
  }

  const signOut = () => {
    clearUser()
    cart.value     = []
    wishlist.value = new Set()
    currentPage.value  = 'shop'
    checkoutStep.value = 0
    showToast('Signed out successfully')
  }

  // ── Products & Categories loading ─────────────────────────────────────────
  const loadCatalogue = async () => {
    try {
      const [cats, prods] = await Promise.all([
        categoryService.getAll(),
        productService.getAll(),
      ])
      categories.value  = cats
      products.value    = prods
      productsLoaded.value = true
    } catch {
      showToast('Failed to load products. Please refresh.')
    }
  }

  // ── Role helpers ─────────────────────────────────────────────────────────
  const isAdmin = computed(() => currentUser.value?.role === 1)

  // ── Navigation ────────────────────────────────────────────────────────────
  const AUTH_PAGES = new Set([
    'wishlist', 'orders', 'profile', 'notifications',
    'admin-products', 'admin-categories', 'admin-sizes',
  ])

  function requireAuth(action: () => void) {
    if (currentUser.value) {
      action()
    } else {
      openSignIn()
      const stop = watch(currentUser, (user) => {
        if (user) { stop(); action() }
      })
    }
  }

  const nav = (page: string) => {
    if (AUTH_PAGES.has(page) && !currentUser.value) {
      openSignIn()
      const stop = watch(currentUser, (user) => {
        if (user) { stop(); currentPage.value = page; checkoutStep.value = 0; window.scrollTo(0, 0) }
      })
      return
    }
    currentPage.value  = page
    checkoutStep.value = 0
    window.scrollTo(0, 0)
  }

  // ── Filter ────────────────────────────────────────────────────────────────
  const searchQuery = ref('')

  const setFilter = (f: string) => { filter.value = f }

  const handleSearch = (query: string) => {
    searchQuery.value = query.trim().toLowerCase()
    filter.value = searchQuery.value ? 'search' : 'all'
    if (currentPage.value !== 'shop') currentPage.value = 'shop'
  }

  // ── Wishlist ──────────────────────────────────────────────────────────────
  const toggleWish = (id: string) => {
    requireAuth(() => {
      if (wishlist.value.has(id)) {
        wishlist.value.delete(id)
        showToast('Removed from wishlist')
      } else {
        wishlist.value.add(id)
        showToast('Added to wishlist')
      }
    })
  }

  // ── Cart ──────────────────────────────────────────────────────────────────
  const addCart = (id: string, size: string) => {
    requireAuth(() => {
      const existing = cart.value.find(item => item.id === id && item.size === size)
      if (existing) {
        existing.qty++
      } else {
        cart.value.push({ id, size, qty: 1 })
      }
      const product = products.value.find(p => p.id === id)
      showToast((product?.name || 'Item') + ' added to cart')
      closeSheet()
    })
  }

  const chgQty = (index: number, delta: number) => {
    const item = cart.value[index]
    if (item) {
      item.qty += delta
      if (item.qty <= 0) cart.value.splice(index, 1)
    }
  }

  // ── Checkout ──────────────────────────────────────────────────────────────
  const startCheckout = () => { checkoutStep.value = 1 }

  const placeOrder = () => {
    cart.value         = []
    checkoutStep.value = 0
    currentPage.value  = 'orders'
    showToast('Order placed successfully!')
  }

  // ── Bottom Sheet ──────────────────────────────────────────────────────────
  const openSheet = (product: Product) => {
    sheetProduct.value = product
    sheetOpen.value    = true
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const closeSheet = () => {
    sheetOpen.value = false
    document.body.style.overflow = ''
  }

  // ── Preview Product ───────────────────────────────────────────────────────
  const setPreviewProduct = (p: Product | null) => { previewProduct.value = p }

  // ── Theme ─────────────────────────────────────────────────────────────────
  const setTheme = (id: string) => {
    document.documentElement.dataset.theme = id
    localStorage.setItem(STORAGE_THEME, id)
    const idx = THEMES.findIndex(t => t.id === id)
    if (idx !== -1) themeIdx.value = idx
  }

  const cycleTheme = () => {
    themeIdx.value = (themeIdx.value + 1) % THEMES.length
    setTheme(THEMES[themeIdx.value].id)
  }

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    toastMsg.value     = msg
    toastVisible.value = true
    if (toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => { toastVisible.value = false }, 2400)
  }

  // ── Computed ──────────────────────────────────────────────────────────────
  const filteredProducts = computed(() => {
    if (filter.value === 'search' && searchQuery.value) {
      const q = searchQuery.value
      return products.value.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      )
    }
    if (filter.value === 'all') return products.value
    return products.value.filter(p => p.categoryId === filter.value)
  })

  const newArrivals = computed(() =>
    [...products.value].reverse().slice(0, 4)
  )

  const totalQty = computed(() =>
    cart.value.reduce((sum, item) => sum + item.qty, 0)
  )

  const cartSubtotal = computed(() =>
    cart.value.reduce((sum, item) => {
      const p = products.value.find(x => x.id === item.id)
      return sum + (p?.price || 0) * item.qty
    }, 0)
  )

  const shipping = computed(() =>
    cartSubtotal.value > 0 ? (cartSubtotal.value > 99 ? 0 : 9.99) : 0
  )

  const tax = computed(() => cartSubtotal.value * 0.08)

  const cartTotal = computed(() => cartSubtotal.value + shipping.value + tax.value)

  return {
    currentPage, currentUser, signInOpen,
    products, categories, productsLoaded,
    setUser, clearUser, signOut, handleUnauthorized, openSignIn, closeSignIn,
    filter, cart, wishlist, themeIdx,
    checkoutStep, toastMsg, toastVisible,
    sheetProduct, sheetOpen, searchQuery,
    confirmOpen, confirmTitle, confirmMsg, confirmDanger,
    isAdmin,
    loadCatalogue,
    nav, setFilter, toggleWish, addCart, chgQty,
    startCheckout, placeOrder,
    openSheet, closeSheet, previewProduct, setPreviewProduct,
    setTheme, cycleTheme, showToast, handleSearch,
    showConfirm, resolveConfirm,
    filteredProducts, newArrivals, totalQty,
    cartSubtotal, shipping, tax, cartTotal,
  }
})
