import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PRODUCTS, THEMES, type Product } from '@/data/products'

export interface CartItem {
  id: number
  size: string
  qty: number
}

export const useAppStore = defineStore('app', () => {
  // State
  const API_BASE = 'http://localhost:5000/api'
  const currentPage = ref('shop')
  const filter = ref('all')
  const cart = ref<CartItem[]>([])
  const wishlist = ref<Set<number>>(new Set())
  const themeIdx = ref(0)
  const checkoutStep = ref(0)
  const toastMsg = ref('')
  const toastVisible = ref(false)
  const sheetProduct = ref<Product | null>(null)
  const sheetOpen = ref(false)
  let toastTimeout: NodeJS.Timeout | null = null

  // Navigation
  const nav = (page: string) => {
    currentPage.value = page
    checkoutStep.value = 0
    window.scrollTo(0, 0)
  }

  // Filter
  const setFilter = (f: string) => {
    filter.value = f
  }

  // Wishlist
  const toggleWish = (id: number) => {
    if (wishlist.value.has(id)) {
      wishlist.value.delete(id)
      showToast('Removed from wishlist')
    } else {
      wishlist.value.add(id)
      showToast('Added to wishlist')
    }
  }

  // Cart
  const addCart = (id: number, size: string) => {
    const existing = cart.value.find(item => item.id === id && item.size === size)
    if (existing) {
      existing.qty++
    } else {
      cart.value.push({ id, size, qty: 1 })
    }
    const product = PRODUCTS.find(p => p.id === id)
    showToast((product?.name || 'Item') + ' added to cart')
    sheetOpen.value = false
  }

  const chgQty = (index: number, delta: number) => {
    const item = cart.value[index]
    if (item) {
      item.qty += delta
      if (item.qty <= 0) {
        cart.value.splice(index, 1)
      }
    }
  }

  // Checkout
  const startCheckout = () => {
    checkoutStep.value = 1
  }

  const placeOrder = () => {
    cart.value = []
    checkoutStep.value = 0
    currentPage.value = 'orders'
    showToast('Order placed successfully!')
  }

  // Bottom Sheet
  const openSheet = (product: Product) => {
    sheetProduct.value = product
    sheetOpen.value = true
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const closeSheet = () => {
    sheetOpen.value = false
    document.body.style.overflow = ''
  }

  // Theme
  const setTheme = (id: string) => {
    document.documentElement.dataset.theme = id
    const idx = THEMES.findIndex(t => t.id === id)
    if (idx !== -1) {
      themeIdx.value = idx
    }
  }

  const cycleTheme = () => {
    themeIdx.value = (themeIdx.value + 1) % THEMES.length
    setTheme(THEMES[themeIdx.value].id)
  }

  // Toast
  const showToast = (msg: string) => {
    toastMsg.value = msg
    toastVisible.value = true
    if (toastTimeout) clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
      toastVisible.value = false
    }, 2400)
  }

  // Search
  const searchQuery = ref('')
  const handleSearch = (query: string) => {
    searchQuery.value = query.trim().toLowerCase()
    if (!searchQuery.value) {
      setFilter('all')
    } else {
      setFilter('search')
    }
    if (currentPage.value !== 'shop') {
      currentPage.value = 'shop'
    }
  }

  // Computed
  const filteredProducts = computed(() => {
    if (filter.value === 'search' && searchQuery.value) {
      const q = searchQuery.value
      return PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q)
      )
    }
    if (filter.value === 'all') {
      return PRODUCTS
    }
    return PRODUCTS.filter(p => p.style === filter.value)
  })

  const newArrivals = computed(() => {
    return [...PRODUCTS].reverse().slice(0, 4)
  })

  const totalQty = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.qty, 0)
  })

  const cartSubtotal = computed(() => {
    return cart.value.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id)
      return sum + (product?.price || 0) * item.qty
    }, 0)
  })

  const shipping = computed(() => {
    return cartSubtotal.value > 0 ? (cartSubtotal.value > 99 ? 0 : 9.99) : 0
  })

  const tax = computed(() => {
    return cartSubtotal.value * 0.08
  })

  const cartTotal = computed(() => {
    return cartSubtotal.value + shipping.value + tax.value
  })

  return {
    currentPage,
    filter,
    cart,
    wishlist,
    themeIdx,
    checkoutStep,
    toastMsg,
    toastVisible,
    sheetProduct,
    sheetOpen,
    searchQuery,
    nav,
    setFilter,
    toggleWish,
    addCart,
    chgQty,
    startCheckout,
    placeOrder,
    openSheet,
    closeSheet,
    setTheme,
    cycleTheme,
    showToast,
    handleSearch,
    filteredProducts,
    newArrivals,
    totalQty,
    cartSubtotal,
    shipping,
    tax,
    cartTotal
  }
})
