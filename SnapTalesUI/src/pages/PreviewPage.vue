<template>
  <main class="page active">
    <div class="page-pad">
    <div class="pvt-wrap">

      <!-- ── LEFT: Canvas ─────────────────────────────────── -->
      <div class="pvt-preview-col">

        <div class="pvt-canvas-outer" :style="canvasOuterStyle">

          <!-- Photo (clipped to aperture area) -->
          <div
            class="pvt-photo-wrapper"
            :style="photoWrapperStyle"
            :class="{ 'pvt-draggable': !!photoSrc, 'pvt-dragging': isDragging }"
            @mousedown.prevent="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
            @wheel.prevent="onWheel"
            @touchstart.prevent="onTouchStart"
            @touchmove.prevent="onTouchMove"
            @touchend="onTouchEnd"
          >
            <div v-if="!photoSrc" class="pvt-no-photo" @click.stop="triggerUpload">
              <span class="material-icons-round">add_photo_alternate</span>
              <p>{{ selectedProduct ? 'Tap to upload your photo' : 'Select a frame to begin' }}</p>
            </div>
            <img
              v-else
              :src="photoSrc"
              :class="['pvt-photo-img', { 'pvt-resetting': isResetting }]"
              :style="photoImgStyle"
              alt=""
              draggable="false"
            />
          </div>

          <!-- Frame overlay PNG (transparent center, opaque frame border) -->
          <img
            v-if="frameImageUrl"
            :src="frameImageUrl"
            class="pvt-frame-overlay"
            alt=""
            draggable="false"
          />

          <!-- No overlay hint — shown when a frame is selected but has no overlay PNG yet -->
          <div v-if="selectedProduct && !frameImageUrl" class="pvt-no-overlay">
            <span class="material-icons-round">layers_clear</span>
            <p>No overlay uploaded for this frame yet</p>
          </div>

        </div><!-- /canvas -->

        <!-- Action row below canvas -->
        <div class="pvt-photo-actions">
          <button class="pvt-action-btn" @click="triggerUpload">
            <span class="material-icons-round">{{ photoSrc ? 'swap_horiz' : 'add_photo_alternate' }}</span>
            {{ photoSrc ? 'Change Photo' : 'Upload Photo' }}
          </button>
          <button
            v-if="photoSrc && hasPanOrZoom"
            class="pvt-action-btn pvt-action-btn--ghost"
            @click="doResetView"
          >
            <span class="material-icons-round">fit_screen</span>
            Reset View
          </button>
        </div>

        <!-- Zoom hint (only when photo loaded) -->
        <p v-if="photoSrc" class="pvt-hint pvt-hint--canvas">
          <span class="material-icons-round">touch_app</span>
          Drag · Scroll to zoom · Pinch on mobile
        </p>

        <input ref="fileInput" type="file" accept="image/*" style="display:none" @change="onFileSelect"/>
      </div>

      <!-- ── RIGHT: Controls ────────────────────────────────── -->
      <div class="pvt-controls-col">

        <div class="pvt-page-title">
          <span class="material-icons-round">photo_camera</span>
          Frame Preview
        </div>
        <p class="pvt-page-subtitle">
          Pick any frame, upload your photo and see exactly how it looks before you buy.
        </p>

        <!-- Category filter chips -->
        <div class="pvt-filter-row">
          <button
            class="pvt-filter-chip"
            :class="{ active: !filterCategoryId }"
            @click="filterCategoryId = null"
          >All</button>
          <button
            v-for="cat in store.categories"
            :key="cat.id"
            class="pvt-filter-chip"
            :class="{ active: filterCategoryId === cat.id }"
            @click="filterCategoryId = cat.id"
          >{{ cat.name }}</button>
        </div>

        <!-- Frame grid -->
        <div v-if="!store.productsLoaded" class="pvt-loading">
          <span class="material-icons-round rotating">sync</span>
          Loading frames…
        </div>
        <div v-else-if="filteredFrames.length === 0" class="pvt-empty-frames">
          No frames in this category yet.
        </div>
        <div v-else class="pvt-frame-grid">
          <div
            v-for="p in filteredFrames"
            :key="p.id"
            class="pvt-frame-card"
            :class="{ active: selectedProductId === p.id }"
            @click="selectProduct(p)"
          >
            <div class="pvt-frame-thumb">
              <img
                :src="getProductImage(p.images)"
                :alt="p.name"
              />
            </div>
            <div class="pvt-frame-card-info">
              <span class="pvt-frame-card-name">{{ p.name }}</span>
              <span class="pvt-frame-card-price">${{ p.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Mat picker -->
        <div class="pvt-section-head" style="margin-top:18px">
          <span class="pvt-section-label">Mat Color</span>
        </div>
        <div class="pvt-mat-row">
          <button
            v-for="m in matColors"
            :key="m.value"
            class="pvt-mat-swatch"
            :class="{ active: matColor === m.value }"
            :title="m.label"
            @click="matColor = m.value"
          >
            <span
              v-if="m.value === 'none'"
              class="material-icons-round"
              style="font-size:15px;color:var(--text-tertiary)"
            >block</span>
            <span
              v-else
              class="pvt-swatch-dot"
              :style="{ background: m.value, border: ['#FFFFFF','#EBEBEB','#F5EFE3'].includes(m.value) ? '1px solid var(--divider)' : 'none' }"
            ></span>
          </button>
        </div>

        <!-- CTA — only shown when a frame is selected -->
        <div v-if="selectedProduct" class="pvt-cta">
          <div class="pvt-cta-top">
            <div class="pvt-cta-label">You're previewing:</div>
            <div class="pvt-cta-info">
              <span class="pvt-cta-name">{{ selectedProduct.name }}</span>
              <span class="pvt-cta-price">${{ selectedProduct.price.toFixed(2) }}</span>
            </div>
          </div>
          <button class="btn-gold pvt-cta-btn" @click="addToCart">
            <span class="material-icons-round" style="font-size:18px">add_shopping_cart</span>
            Add to Cart
          </button>
          <p class="pvt-cta-note">Opens size selector to choose your size before ordering.</p>
        </div>

      </div><!-- /controls -->
    </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { getProductImage, type Product } from '@/services/productService'

const store = useAppStore()

// ── File upload ────────────────────────────────────────────────────
const fileInput = ref<HTMLInputElement | null>(null)
const photoSrc  = ref('')

const triggerUpload = () => fileInput.value?.click()

const onFileSelect = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => { photoSrc.value = ev.target?.result as string; doResetView() }
  reader.readAsDataURL(file)
  ;(e.target as HTMLInputElement).value = ''
}

// ── Frame selection ────────────────────────────────────────────────
const selectedProductId = ref<string | null>(null)
const filterCategoryId  = ref<string | null>(null)

// All products, optionally filtered by category
const filteredFrames = computed(() => {
  const all = store.products
  if (!filterCategoryId.value) return all
  return all.filter(p => p.categoryId === filterCategoryId.value)
})

const selectedProduct = computed(() =>
  selectedProductId.value
    ? (store.products.find(p => p.id === selectedProductId.value) ?? null)
    : null
)

const selectProduct = (p: Product) => {
  selectedProductId.value = selectedProductId.value === p.id ? null : p.id
  doResetView()
}

// Pre-select from BottomSheet camera button
onMounted(() => {
  if (store.previewProduct) {
    selectedProductId.value = store.previewProduct.id
    store.setPreviewProduct(null)
  }
})

watch(() => store.previewProduct, p => {
  if (p) { selectedProductId.value = p.id; store.setPreviewProduct(null) }
})

// ── Frame aperture & overlay ───────────────────────────────────────
// aperturePct drives the photo wrapper CSS inset so photo is clipped
// to the visible aperture area behind the transparent PNG overlay
const aperturePct = computed(() =>
  selectedProduct.value?.aperturePercent ?? 15
)

const frameImageUrl = computed(() => {
  const p = selectedProduct.value
  if (!p?.overlayImage) return ''
  if (!p.images?.length) return ''
  return getProductImage([p.overlayImage])
})

// ── Mat ────────────────────────────────────────────────────────────
const matColor = ref('none')
const matColors = [
  { value: 'none',    label: 'No Mat'  },
  { value: '#FFFFFF', label: 'White'   },
  { value: '#F5EFE3', label: 'Cream'   },
  { value: '#EBEBEB', label: 'Silver'  },
  { value: '#2C2C2C', label: 'Dark'    },
  { value: '#C9A876', label: 'Kraft'   },
]

const MAT_GAP = 3.5

// ── Computed styles ────────────────────────────────────────────────
const canvasOuterStyle = computed(() => ({
  background: matColor.value !== 'none' ? matColor.value : 'var(--bg-tertiary)',
}))

const photoWrapperStyle = computed(() => {
  const base  = aperturePct.value
  const extra = matColor.value !== 'none' ? MAT_GAP : 0
  return { inset: `${base + extra}%` }
})

// ── Pan / Zoom ─────────────────────────────────────────────────────
const photoTx    = ref(0)
const photoTy    = ref(0)
const photoScale = ref(1)
const isDragging = ref(false)
const isResetting = ref(false)

// Show "Reset View" only when there's something to reset
const hasPanOrZoom = computed(() =>
  photoTx.value !== 0 || photoTy.value !== 0 || photoScale.value !== 1
)

let _dragLastX  = 0
let _dragLastY  = 0
let _pinchDist  = 0
let _touchLastX = 0
let _touchLastY = 0

const onMouseDown = (e: MouseEvent) => {
  if (!photoSrc.value) return
  isDragging.value = true
  _dragLastX = e.clientX
  _dragLastY = e.clientY
}
const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  photoTx.value += e.clientX - _dragLastX
  photoTy.value += e.clientY - _dragLastY
  _dragLastX = e.clientX
  _dragLastY = e.clientY
}
const onMouseUp = () => { isDragging.value = false }

const onWheel = (e: WheelEvent) => {
  const step = e.deltaY > 0 ? -0.1 : 0.1
  photoScale.value = Math.max(0.5, Math.min(8, photoScale.value + step))
}

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    isDragging.value = true
    _touchLastX = e.touches[0].clientX
    _touchLastY = e.touches[0].clientY
  } else if (e.touches.length === 2) {
    isDragging.value = false
    _pinchDist = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
    )
  }
}
const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 1 && isDragging.value) {
    photoTx.value += e.touches[0].clientX - _touchLastX
    photoTy.value += e.touches[0].clientY - _touchLastY
    _touchLastX = e.touches[0].clientX
    _touchLastY = e.touches[0].clientY
  } else if (e.touches.length === 2) {
    const dist = Math.hypot(
      e.touches[1].clientX - e.touches[0].clientX,
      e.touches[1].clientY - e.touches[0].clientY
    )
    if (_pinchDist > 0)
      photoScale.value = Math.max(0.5, Math.min(8, photoScale.value * (dist / _pinchDist)))
    _pinchDist = dist
  }
}
const onTouchEnd = () => { isDragging.value = false; _pinchDist = 0 }

const photoImgStyle = computed(() => ({
  transform: `translate(${photoTx.value}px, ${photoTy.value}px) scale(${photoScale.value})`,
}))

// Smooth animated reset
const doResetView = () => {
  isResetting.value = true
  photoTx.value    = 0
  photoTy.value    = 0
  photoScale.value = 1
  setTimeout(() => { isResetting.value = false }, 400)
}

// ── Add to cart ────────────────────────────────────────────────────
const addToCart = () => {
  if (selectedProduct.value) store.openSheet(selectedProduct.value)
}
</script>
