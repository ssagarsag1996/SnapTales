<template>
  <main class="page active"><div class="page-pad">
    <div class="admin-header">
      <h2 class="admin-title">Manage Products</h2>
      <button class="btn-gold" @click="openAdd">
        <span class="material-icons-round" style="font-size:18px">add</span>
        Add Product
      </button>
    </div>

    <!-- ── Add / Edit Form ──────────────────────────────────────── -->
    <div v-if="formOpen" class="admin-form-card">
      <div class="admin-form-title">{{ editId ? 'Edit Product' : 'New Product' }}</div>

      <div class="admin-form-grid">
        <div class="admin-field">
          <label class="admin-label">Name *</label>
          <input class="admin-input" v-model="form.name" placeholder="Product name" />
        </div>
        <div class="admin-field">
          <label class="admin-label">SKU *</label>
          <input class="admin-input" v-model="form.sku" placeholder="ST-XX-000" />
        </div>
        <div class="admin-field">
          <label class="admin-label">Category *</label>
          <select class="admin-input" v-model="form.categoryId">
            <option value="">— Select —</option>
            <option v-for="c in store.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div class="admin-field">
          <label class="admin-label">Stock</label>
          <input class="admin-input" type="number" v-model.number="form.stock" min="0" />
        </div>
        <div class="admin-field">
          <label class="admin-label">Price ($) *</label>
          <input class="admin-input" type="number" step="0.01" v-model.number="form.price" min="0" />
        </div>
        <div class="admin-field">
          <label class="admin-label">Original Price ($)</label>
          <input class="admin-input" type="number" step="0.01" v-model="form.originalPrice" placeholder="Leave blank if no sale" />
        </div>
        <div class="admin-field">
          <label class="admin-label">Rating</label>
          <input class="admin-input" type="number" step="0.1" v-model.number="form.rating" min="0" max="5" />
        </div>
        <div class="admin-field">
          <label class="admin-label">Review Count</label>
          <input class="admin-input" type="number" v-model.number="form.reviewCount" min="0" />
        </div>
        <div class="admin-field" style="grid-column:1/-1">
          <label class="admin-label">Description *</label>
          <textarea class="admin-input admin-textarea" v-model="form.description" rows="3" placeholder="Product description"></textarea>
        </div>
        <div class="admin-field">
          <label class="admin-label">
            Frame Aperture
            <span class="admin-field-hint">border width as % of image</span>
          </label>
          <select class="admin-input" v-model.number="form.aperturePercent">
            <option :value="5">Ultra-thin  — 5%</option>
            <option :value="10">Thin        — 10%</option>
            <option :value="15">Standard    — 15%</option>
            <option :value="20">Wide        — 20%</option>
            <option :value="25">Ornate      — 25%</option>
          </select>
        </div>
        <div class="admin-field" style="grid-column:1/-1">
          <label class="admin-label">On Sale</label>
          <label class="admin-toggle">
            <input type="checkbox" v-model="form.isSale" />
            <span class="admin-toggle-track"></span>
            <span class="admin-toggle-label">{{ form.isSale ? 'Yes' : 'No' }}</span>
          </label>
        </div>
      </div>

      <!-- Sizes -->
      <div class="admin-field" style="margin-top:4px">
        <label class="admin-label">Sizes</label>
        <div class="admin-sizes-wrap">
          <div
            v-for="sz in allSizes" :key="sz.id"
            class="admin-size-chip"
            :class="{ active: form.sizeIds.includes(sz.id) }"
            @click="toggleSize(sz.id)"
          >{{ sz.label }}</div>
        </div>
      </div>

      <!-- ── Images section (edit mode only) ───────────────────── -->
      <div v-if="editId" class="admin-field admin-img-section" style="margin-top:16px">
        <label class="admin-label">
          <span class="material-icons-round" style="font-size:15px">photo_library</span>
          Images
          <span class="admin-img-count">{{ formImages.length }} photo{{ formImages.length !== 1 ? 's' : '' }}</span>
        </label>

        <!-- Image grid -->
        <div v-if="formImages.length" class="admin-img-grid">
          <div v-for="(img, i) in formImages" :key="i" class="admin-img-item">
            <img :src="IMG_BASE + '/' + img" alt="" />
            <button class="admin-img-del" :disabled="formImgDeleting === i" @click="deleteFormImage(i)">
              <span class="material-icons-round">{{ formImgDeleting === i ? 'hourglass_empty' : 'delete' }}</span>
            </button>
          </div>
          <!-- Upload-more tile -->
          <label class="admin-img-add-tile" :class="{ disabled: formImgUploading }">
            <span v-if="formImgUploading" class="material-icons-round rotating">sync</span>
            <span v-else class="material-icons-round">add_photo_alternate</span>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple style="display:none"
              @change="uploadFormImages" :disabled="formImgUploading" />
          </label>
        </div>

        <!-- Empty state -->
        <label v-else class="admin-upload-btn" :class="{ disabled: formImgUploading }">
          <span v-if="formImgUploading" class="material-icons-round rotating">sync</span>
          <span v-else class="material-icons-round">add_photo_alternate</span>
          {{ formImgUploading ? 'Uploading…' : 'Add Images' }}
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple style="display:none"
            @change="uploadFormImages" :disabled="formImgUploading" />
        </label>

        <p v-if="formImgUploading" class="admin-img-uploading-hint">
          Uploading {{ formUploadProgress.done }}/{{ formUploadProgress.total }}…
        </p>
      </div>

      <!-- ── Frame Preview Overlay (edit mode only) ──────────────── -->
      <div v-if="editId" class="admin-field admin-overlay-section" style="margin-top:8px">
        <label class="admin-label">
          <span class="material-icons-round" style="font-size:15px">layers</span>
          Frame Preview Overlay
          <span class="admin-img-count">transparent PNG</span>
        </label>
        <p class="admin-overlay-hint">
          Upload a PNG of your frame with the glass/center area made transparent.
          Used in the Frame Preview tool so customers can see their photo inside the frame.
        </p>

        <!-- Current overlay preview -->
        <div v-if="formOverlay" class="admin-overlay-preview-wrap">
          <img :src="IMG_BASE + '/' + formOverlay" class="admin-overlay-preview-img" alt="Frame overlay" />
          <button
            class="admin-overlay-del-btn"
            :disabled="overlayDeleting"
            @click="deleteOverlay"
            title="Remove overlay"
          >
            <span class="material-icons-round">{{ overlayDeleting ? 'hourglass_empty' : 'delete' }}</span>
          </button>
        </div>
        <div v-else class="admin-overlay-empty">
          <span class="material-icons-round">layers_clear</span>
          No overlay uploaded yet
        </div>

        <!-- Upload button -->
        <label class="admin-upload-btn admin-overlay-upload-btn" :class="{ disabled: overlayUploading }">
          <span v-if="overlayUploading" class="material-icons-round rotating">sync</span>
          <span v-else class="material-icons-round">upload</span>
          {{ overlayUploading ? 'Uploading…' : (formOverlay ? 'Replace Overlay PNG' : 'Upload Overlay PNG') }}
          <input
            type="file" accept=".png,.webp" style="display:none"
            @change="uploadOverlay" :disabled="overlayUploading"
          />
        </label>
      </div>

      <!-- New product image note -->
      <div v-else class="admin-img-new-note">
        <span class="material-icons-round">info_outline</span>
        Images &amp; frame overlay can be added after the product is saved.
      </div>

      <!-- Form actions -->
      <div class="admin-form-actions">
        <button class="admin-cancel-btn" @click="closeForm">Cancel</button>
        <button class="btn-gold" :disabled="saving" @click="save">
          <span v-if="saving" class="material-icons-round rotating" style="font-size:18px">sync</span>
          <span v-else class="material-icons-round" style="font-size:18px">check</span>
          {{ editId ? 'Update Product' : 'Create Product' }}
        </button>
      </div>
    </div>

    <!-- ── Filter toolbar ────────────────────────────────────────── -->
    <div class="admin-toolbar">
      <div class="admin-search">
        <span class="material-icons-round">search</span>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by name or SKU..."
          class="admin-search-input"
        />
        <button v-if="searchQuery" class="admin-search-clear" @click="searchQuery = ''" title="Clear">
          <span class="material-icons-round">close</span>
        </button>
      </div>
      <select class="admin-input admin-toolbar-select" v-model="filterCategoryId">
        <option value="">All categories</option>
        <option v-for="c in store.categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <label class="admin-toolbar-check">
        <input type="checkbox" v-model="inStockOnly" />
        <span>In stock only</span>
      </label>
      <span class="admin-toolbar-count">{{ filteredProducts.length }} / {{ store.products.length }}</span>
    </div>

    <!-- ── Product List ──────────────────────────────────────────── -->
    <div v-if="store.products.length === 0 && store.productsLoaded" class="admin-empty">
      No products yet.
    </div>
    <div v-else-if="filteredProducts.length === 0" class="admin-empty">
      No products match your filters.
    </div>

    <div class="admin-prod-list">
      <div v-for="p in filteredProducts" :key="p.id" class="admin-prod-card">
        <div class="admin-prod-thumb">
          <img :src="getProductImage(p.images)" :alt="p.name" />
        </div>
        <div class="admin-prod-info">
          <div class="admin-prod-name">{{ p.name }}</div>
          <div class="admin-prod-meta">
            <span class="admin-tag">{{ p.categoryName }}</span>
            <span class="admin-tag">${{ p.price.toFixed(2) }}</span>
            <span class="admin-tag">Stock: {{ p.stock }}</span>
            <span class="admin-tag">{{ p.images.length }} img{{ p.images.length !== 1 ? 's' : '' }}</span>
            <span v-if="p.isSale" class="admin-tag admin-tag-sale">SALE</span>
          </div>
        </div>
        <div class="admin-prod-actions">
          <button class="admin-icon-btn" title="Manage images" @click="openImgModal(p)">
            <span class="material-icons-round">photo_library</span>
          </button>
          <button class="admin-icon-btn" title="Edit" @click="openEdit(p)">
            <span class="material-icons-round">edit</span>
          </button>
          <button class="admin-icon-btn admin-icon-btn--danger" title="Delete"
            :disabled="deletingId === p.id" @click="remove(p.id)">
            <span class="material-icons-round">{{ deletingId === p.id ? 'hourglass_empty' : 'delete_outline' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Image Manager Modal (standalone, from photo button) ───── -->
    <Teleport to="body">
      <Transition name="img-modal">
        <div v-if="imgProduct" class="modal-backdrop" @click.self="imgProduct = null">
          <div class="prod-img-modal">
            <!-- Header -->
            <div class="prod-img-modal-head">
              <div>
                <div class="prod-img-modal-title">{{ imgProduct.name }}</div>
                <div class="prod-img-modal-sub">{{ imgProduct.images.length }} image{{ imgProduct.images.length !== 1 ? 's' : '' }}</div>
              </div>
              <button class="modal-close-btn" @click="imgProduct = null">
                <span class="material-icons-round">close</span>
              </button>
            </div>

            <!-- Image grid -->
            <div class="prod-img-scroll">
              <div v-if="imgProduct.images.length" class="admin-img-grid">
                <div v-for="(img, i) in imgProduct.images" :key="i" class="admin-img-item">
                  <img :src="IMG_BASE + '/' + img" alt="" />
                  <button class="admin-img-del" :disabled="imgDeleting === i" @click="deleteModalImage(i)">
                    <span class="material-icons-round">{{ imgDeleting === i ? 'hourglass_empty' : 'delete' }}</span>
                  </button>
                </div>
              </div>
              <div v-else class="admin-img-empty">No images yet. Upload some below.</div>
            </div>

            <!-- Upload zone -->
            <div class="prod-img-upload-zone">
              <label class="admin-upload-btn" :class="{ disabled: imgUploading }">
                <span v-if="imgUploading" class="material-icons-round rotating">sync</span>
                <span v-else class="material-icons-round">cloud_upload</span>
                {{ imgUploading
                    ? `Uploading ${modalUploadProgress.done}/${modalUploadProgress.total}…`
                    : 'Upload Images (select multiple)' }}
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple style="display:none"
                  @change="uploadModalImages" :disabled="imgUploading" />
              </label>
              <p class="prod-img-hint">JPEG · PNG · WebP &nbsp;|&nbsp; Multiple files supported</p>
            </div>

            <!-- Overlay section in modal -->
            <div class="prod-img-overlay-section">
              <div class="prod-img-overlay-title">
                <span class="material-icons-round" style="font-size:16px">layers</span>
                Frame Preview Overlay
              </div>
              <p class="prod-img-hint" style="margin-bottom:10px">
                Transparent PNG with glass area erased — used in the preview tool.
              </p>
              <div v-if="imgProduct.overlayImage" class="admin-overlay-preview-wrap">
                <img :src="IMG_BASE + '/' + imgProduct.overlayImage" class="admin-overlay-preview-img" alt="overlay" />
                <button class="admin-overlay-del-btn" :disabled="modalOverlayDeleting" @click="deleteModalOverlay" title="Remove">
                  <span class="material-icons-round">{{ modalOverlayDeleting ? 'hourglass_empty' : 'delete' }}</span>
                </button>
              </div>
              <div v-else class="admin-overlay-empty" style="margin-bottom:10px">
                <span class="material-icons-round">layers_clear</span>
                No overlay uploaded yet
              </div>
              <label class="admin-upload-btn admin-overlay-upload-btn" :class="{ disabled: modalOverlayUploading }">
                <span v-if="modalOverlayUploading" class="material-icons-round rotating">sync</span>
                <span v-else class="material-icons-round">upload</span>
                {{ modalOverlayUploading ? 'Uploading…' : (imgProduct.overlayImage ? 'Replace Overlay' : 'Upload Overlay PNG') }}
                <input type="file" accept=".png,.webp" style="display:none"
                  @change="uploadModalOverlay" :disabled="modalOverlayUploading" />
              </label>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div></main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { productService, sizeService, getProductImage, type Product, type Size } from '@/services/productService'

const store    = useAppStore()
const IMG_BASE = 'http://localhost:5184'

// ── Filter / search ────────────────────────────────────────────────────────────
const searchQuery      = ref('')
const filterCategoryId = ref('')
const inStockOnly      = ref(false)

const filteredProducts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return store.products.filter(p => {
    if (q && !p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q)) return false
    if (filterCategoryId.value && p.categoryId !== filterCategoryId.value) return false
    if (inStockOnly.value && p.stock <= 0) return false
    return true
  })
})

// ── Sizes ──────────────────────────────────────────────────────────────────────
const allSizes = ref<Size[]>([])
onMounted(async () => {
  try { allSizes.value = await sizeService.getAll() } catch { /**/ }
})

// ── Form ───────────────────────────────────────────────────────────────────────
const formOpen   = ref(false)
const editId     = ref<string | null>(null)
const saving     = ref(false)
const deletingId = ref<string | null>(null)

// Inline image state (edit form)
const formImages         = ref<string[]>([])
const formImgUploading   = ref(false)
const formImgDeleting    = ref<number | null>(null)
const formUploadProgress = reactive({ done: 0, total: 0 })

// ── Overlay state ──────────────────────────────────────────────────────────────
const formOverlay        = ref<string | null>(null)
const overlayUploading   = ref(false)
const overlayDeleting    = ref(false)
const modalOverlayUploading = ref(false)
const modalOverlayDeleting  = ref(false)

const emptyForm = () => ({
  name: '', sku: '', categoryId: '', description: '',
  price: 0, originalPrice: '' as number | '',
  isSale: false, stock: 0, rating: 0, reviewCount: 0,
  sizeIds: [] as string[],
  aperturePercent: 15,
})
const form = reactive(emptyForm())

function openAdd() {
  Object.assign(form, emptyForm())
  formImages.value  = []
  formOverlay.value = null
  editId.value      = null
  formOpen.value    = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function openEdit(p: Product) {
  Object.assign(form, {
    name:            p.name,
    sku:             p.sku,
    categoryId:      p.categoryId,
    description:     p.description,
    price:           p.price,
    originalPrice:   p.originalPrice ?? '',
    isSale:          p.isSale,
    stock:           p.stock,
    rating:          p.rating,
    reviewCount:     p.reviewCount,
    sizeIds:         p.sizes.map(s => s.id),
    aperturePercent: p.aperturePercent ?? 15,
  })
  formImages.value  = [...p.images]
  formOverlay.value = p.overlayImage
  editId.value      = p.id
  formOpen.value    = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function closeForm() {
  formOpen.value    = false
  editId.value      = null
  formImages.value  = []
  formOverlay.value = null
}

function toggleSize(id: string) {
  const idx = form.sizeIds.indexOf(id)
  if (idx === -1) form.sizeIds.push(id)
  else            form.sizeIds.splice(idx, 1)
}

async function save() {
  if (!form.name.trim())        { store.showToast('Name is required'); return }
  if (!form.categoryId)         { store.showToast('Select a category'); return }
  if (!form.sku.trim())         { store.showToast('SKU is required'); return }
  if (form.price <= 0)          { store.showToast('Price must be > 0'); return }
  if (!form.description.trim()) { store.showToast('Description is required'); return }

  saving.value = true
  const payload = {
    categoryId:      form.categoryId,
    name:            form.name.trim(),
    price:           form.price,
    originalPrice:   form.originalPrice !== '' ? Number(form.originalPrice) : null,
    isSale:          form.isSale,
    description:     form.description.trim(),
    stock:           form.stock,
    sku:             form.sku.trim(),
    rating:          form.rating,
    reviewCount:     form.reviewCount,
    sizeIds:         form.sizeIds,
    aperturePercent: form.aperturePercent,
  }

  try {
    if (editId.value) {
      const updated = await productService.update(editId.value, payload)
      const idx = store.products.findIndex(p => p.id === editId.value)
      if (idx !== -1) store.products[idx] = updated
      store.showToast('Product updated')
      closeForm()
    } else {
      const created = await productService.create(payload)
      store.products.unshift(created)
      store.showToast('Product created — you can now add images')
      closeForm()
      // Auto-open image modal so user can immediately add images
      openImgModal(created)
    }
  } catch (e: any) {
    store.showToast(e.message || 'Failed to save product')
  } finally {
    saving.value = false
  }
}

async function remove(id: string) {
  if (!await store.showConfirm('This product and all its data will be permanently removed.', { title: 'Delete Product', danger: true })) return
  deletingId.value = id
  try {
    await productService.delete(id)
    store.products = store.products.filter(p => p.id !== id)
    store.showToast('Product deleted')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to delete')
  } finally {
    deletingId.value = null
  }
}

// ── Inline image upload (inside edit form) ─────────────────────────────────────
async function uploadFormImages(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  if (!files.length || !editId.value) return
  formImgUploading.value = true
  formUploadProgress.done  = 0
  formUploadProgress.total = files.length
  let successes = 0
  let lastErr   = ''
  for (const file of files) {
    try {
      const updated = await productService.uploadImage(editId.value, file)
      syncProduct(updated)
      formImages.value = [...updated.images]
      successes++
    } catch (err: any) {
      lastErr = err.message || 'Upload failed'
    }
    formUploadProgress.done++
  }
  formImgUploading.value = false
  ;(e.target as HTMLInputElement).value = ''
  if (successes > 0) store.showToast(`${successes} image(s) uploaded`)
  else store.showToast(lastErr || 'Upload failed')
}

async function deleteFormImage(index: number) {
  if (!editId.value || !await store.showConfirm('Remove this image from the product?', { title: 'Delete Image', danger: true })) return
  formImgDeleting.value = index
  try {
    const updated = await productService.removeImage(editId.value, index)
    syncProduct(updated)
    formImages.value = [...updated.images]
    store.showToast('Image deleted')
  } catch (err: any) {
    store.showToast(err.message || 'Delete failed')
  } finally {
    formImgDeleting.value = null
  }
}

// ── Overlay management (inline edit form) ─────────────────────────────────────
async function uploadOverlay(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !editId.value) return
  overlayUploading.value = true
  try {
    const updated = await productService.uploadOverlay(editId.value, file)
    syncProduct(updated)
    formOverlay.value = updated.overlayImage
    store.showToast('Overlay uploaded')
  } catch (err: any) {
    store.showToast(err.message || 'Upload failed')
  } finally {
    overlayUploading.value = false
    ;(e.target as HTMLInputElement).value = ''
  }
}

async function deleteOverlay() {
  if (!editId.value || !await store.showConfirm('Remove the frame preview overlay for this product?', { title: 'Remove Overlay', danger: true })) return
  overlayDeleting.value = true
  try {
    const updated = await productService.removeOverlay(editId.value)
    syncProduct(updated)
    formOverlay.value = null
    store.showToast('Overlay removed')
  } catch (err: any) {
    store.showToast(err.message || 'Remove failed')
  } finally {
    overlayDeleting.value = false
  }
}

// ── Overlay management (standalone image modal) ───────────────────────────────
async function uploadModalOverlay(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !imgProduct.value) return
  modalOverlayUploading.value = true
  try {
    const updated = await productService.uploadOverlay(imgProduct.value.id, file)
    syncProduct(updated)
    imgProduct.value = { ...updated, images: [...updated.images] }
    store.showToast('Overlay uploaded')
  } catch (err: any) {
    store.showToast(err.message || 'Upload failed')
  } finally {
    modalOverlayUploading.value = false
    ;(e.target as HTMLInputElement).value = ''
  }
}

async function deleteModalOverlay() {
  if (!imgProduct.value || !await store.showConfirm('Remove the frame preview overlay?', { title: 'Remove Overlay', danger: true })) return
  modalOverlayDeleting.value = true
  try {
    const updated = await productService.removeOverlay(imgProduct.value.id)
    syncProduct(updated)
    imgProduct.value = { ...updated, images: [...updated.images] }
    store.showToast('Overlay removed')
  } catch (err: any) {
    store.showToast(err.message || 'Remove failed')
  } finally {
    modalOverlayDeleting.value = false
  }
}

// ── Standalone image modal ─────────────────────────────────────────────────────
const imgProduct           = ref<Product | null>(null)
const imgUploading         = ref(false)
const imgDeleting          = ref<number | null>(null)
const modalUploadProgress  = reactive({ done: 0, total: 0 })

function openImgModal(p: Product) {
  imgProduct.value = { ...p, images: [...p.images] }
}

async function uploadModalImages(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files ?? [])
  if (!files.length || !imgProduct.value) return
  imgUploading.value = true
  modalUploadProgress.done  = 0
  modalUploadProgress.total = files.length
  let successes = 0
  let lastErr   = ''
  for (const file of files) {
    try {
      const updated = await productService.uploadImage(imgProduct.value.id, file)
      syncProduct(updated)
      imgProduct.value = { ...updated, images: [...updated.images] }
      successes++
    } catch (err: any) {
      lastErr = err.message || 'Upload failed'
    }
    modalUploadProgress.done++
  }
  imgUploading.value = false
  ;(e.target as HTMLInputElement).value = ''
  if (successes > 0) store.showToast(`${successes} image(s) uploaded`)
  else store.showToast(lastErr || 'Upload failed')
}

async function deleteModalImage(index: number) {
  if (!imgProduct.value || !await store.showConfirm('Remove this image from the product?', { title: 'Delete Image', danger: true })) return
  imgDeleting.value = index
  try {
    const updated = await productService.removeImage(imgProduct.value.id, index)
    syncProduct(updated)
    imgProduct.value = { ...updated, images: [...updated.images] }
    store.showToast('Image deleted')
  } catch (err: any) {
    store.showToast(err.message || 'Delete failed')
  } finally {
    imgDeleting.value = null
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function syncProduct(updated: Product) {
  const idx = store.products.findIndex(p => p.id === updated.id)
  if (idx !== -1) store.products[idx] = updated
}
</script>

<style scoped>
/* ── Filter toolbar ─── */
.admin-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
  padding: 10px 0 14px;
}
.admin-search {
  flex: 1 1 220px; min-width: 0;
  position: relative;
  display: flex; align-items: center;
  background: var(--bg-card);
  border: 1.5px solid var(--divider);
  border-radius: 12px; padding: 0 10px;
  transition: border-color .15s;
}
.admin-search:focus-within { border-color: var(--accent); }
.admin-search > .material-icons-round { color: var(--text-tertiary); font-size: 18px; }
.admin-search-input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent;
  padding: 9px 8px; font-size: .9rem; font-family: inherit; color: var(--text-primary);
}
.admin-search-clear {
  background: transparent; border: none; cursor: pointer;
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-tertiary);
}
.admin-search-clear:hover { background: var(--ripple); color: var(--text-primary); }
.admin-search-clear .material-icons-round { font-size: 14px; }
.admin-toolbar-select {
  flex: 0 0 auto; min-width: 160px;
}
.admin-toolbar-check {
  display: flex; align-items: center; gap: 6px;
  font-size: .85rem; color: var(--text-secondary); cursor: pointer;
  user-select: none;
}
.admin-toolbar-check input { accent-color: var(--accent); cursor: pointer; }
.admin-toolbar-count {
  font-size: .78rem; color: var(--text-tertiary);
  margin-left: auto;
}
@media (max-width: 480px) {
  .admin-toolbar { gap: 8px; }
  .admin-search { flex-basis: 100%; }
  .admin-toolbar-select { flex: 1 1 auto; min-width: 0; }
  .admin-toolbar-count { flex-basis: 100%; text-align: right; }
}

/* ── Image section inside form ─── */
.admin-img-section { gap: 10px; }
.admin-img-count {
  margin-left: 6px; font-size: .72rem; font-weight: 500;
  color: var(--text-tertiary); font-style: normal;
}
.admin-img-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px; margin-top: 4px;
}
.admin-img-item { position: relative; border-radius: 10px; overflow: hidden; aspect-ratio: 1; }
.admin-img-item img { width: 100%; height: 100%; object-fit: cover; }
.admin-img-del {
  position: absolute; top: 4px; right: 4px;
  width: 26px; height: 26px; border-radius: 50%;
  background: rgba(0,0,0,.6); color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s;
}
.admin-img-del:hover { background: rgba(220,38,38,.85); }
.admin-img-del .material-icons-round { font-size: 14px; }
.admin-img-add-tile {
  aspect-ratio: 1; border-radius: 10px;
  border: 2px dashed var(--divider); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-tertiary); transition: all .15s;
  background: var(--bg-primary);
}
.admin-img-add-tile:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-container); }
.admin-img-add-tile .material-icons-round { font-size: 26px; }
.admin-img-add-tile.disabled { opacity: .5; cursor: not-allowed; }
.admin-img-uploading-hint { font-size: .78rem; color: var(--text-tertiary); margin: 4px 0 0; }
.admin-img-new-note {
  display: flex; align-items: center; gap: 6px;
  font-size: .82rem; color: var(--text-tertiary);
  background: var(--bg-primary); border-radius: 10px;
  padding: 10px 14px; margin-top: 14px;
}
.admin-img-new-note .material-icons-round { font-size: 16px; }
.admin-img-empty {
  text-align: center; color: var(--text-tertiary);
  font-size: .85rem; padding: 20px 0;
}
.admin-upload-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px; border-radius: 14px;
  border: 2px dashed var(--accent); color: var(--accent);
  font-weight: 600; font-size: .9rem; cursor: pointer;
  transition: background .15s; box-sizing: border-box;
}
.admin-upload-btn:hover { background: var(--accent-container); }
.admin-upload-btn.disabled { opacity: .5; cursor: not-allowed; }

/* ── Standalone image modal ─── */
.prod-img-modal {
  background: var(--bg-card);
  border-radius: 22px;
  width: min(560px, 96vw);
  max-height: 90vh;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.prod-img-modal-head {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding: 16px 18px 12px; flex-shrink: 0;
  border-bottom: 1px solid var(--divider);
}
.prod-img-modal-title { font-weight: 700; font-size: 1rem; color: var(--text-primary); }
.prod-img-modal-sub   { font-size: .78rem; color: var(--text-tertiary); margin-top: 2px; }
.prod-img-scroll {
  overflow-y: auto;
  padding: 14px 18px;
  flex: 0 1 auto;
  max-height: 40vh;
}
.prod-img-upload-zone {
  padding: 12px 18px 14px; flex-shrink: 0;
  border-top: 1px solid var(--divider);
}
.prod-img-hint { font-size: .75rem; color: var(--text-tertiary); text-align: center; margin: 6px 0 0; }

/* Mobile: tighter padding + smaller thumbnails */
@media (max-width: 480px) {
  .prod-img-modal { border-radius: 18px; max-height: 92vh; }
  .prod-img-modal-head { padding: 14px 14px 10px; }
  .prod-img-scroll { padding: 12px 14px; max-height: 35vh; }
  .prod-img-upload-zone { padding: 10px 14px 12px; }
  .admin-img-grid { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; }
}

/* ── Aperture field hint ─── */
.admin-field-hint {
  font-size: .7rem; font-weight: 400;
  color: var(--text-tertiary); margin-left: 4px;
}

/* ── Overlay section ─── */
.admin-overlay-section { gap: 8px; }
.admin-overlay-hint {
  font-size: .78rem; color: var(--text-tertiary);
  margin: 0 0 8px; line-height: 1.45;
}
/* Checkerboard bg to visualise transparency */
.admin-overlay-preview-wrap {
  position: relative;
  width: 160px; height: 160px;
  border-radius: 10px; overflow: hidden;
  background-image:
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 14px 14px;
  background-position: 0 0, 0 7px, 7px -7px, -7px 0px;
  background-color: #fff;
  border: 1.5px solid var(--divider);
  margin-bottom: 8px;
}
.admin-overlay-preview-img {
  width: 100%; height: 100%; object-fit: contain; display: block;
}
.admin-overlay-del-btn {
  position: absolute; top: 4px; right: 4px;
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(0,0,0,.65); color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s;
}
.admin-overlay-del-btn:hover { background: rgba(220,38,38,.85); }
.admin-overlay-del-btn .material-icons-round { font-size: 14px; }
.admin-overlay-empty {
  display: flex; align-items: center; gap: 6px;
  font-size: .8rem; color: var(--text-tertiary);
  padding: 10px 0; margin-bottom: 6px;
}
.admin-overlay-empty .material-icons-round { font-size: 18px; opacity: .5; }
.admin-overlay-upload-btn { border-style: solid; margin-top: 0; }

/* ── Modal overlay section ─── */
.prod-img-overlay-section {
  padding: 14px 18px 16px;
  border-top: 1px solid var(--divider);
  flex-shrink: 0;
}
.prod-img-overlay-title {
  display: flex; align-items: center; gap: 6px;
  font-weight: 700; font-size: .88rem; color: var(--text-primary);
  margin-bottom: 4px;
}
@media (max-width: 480px) {
  .prod-img-overlay-section { padding: 12px 14px 14px; }
  .admin-overlay-preview-wrap { width: 130px; height: 130px; }
}

/* ── Transitions ─── */
.img-modal-enter-active { transition: opacity .22s; }
.img-modal-leave-active { transition: opacity .18s; }
.img-modal-enter-from, .img-modal-leave-to { opacity: 0; }

@keyframes prod-spin { to { transform: rotate(360deg); } }
.rotating { animation: prod-spin .75s linear infinite; }
</style>
