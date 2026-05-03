<template>
  <div v-if="store.sheetProduct" class="bsheet-content">
    <!-- Close button -->
    <button class="bsheet-close" @click="store.closeSheet()">
      <span class="material-icons-round">close</span>
    </button>

    <!-- Image carousel wrapper — handles the edge-to-edge margin & nav button positioning.
         Intentionally has NO overflow:hidden so the buttons are never clipped. -->
    <div class="bsheet-img-wrap">
      <!-- Inner image zone clips the sliding track -->
      <div class="bsheet-img">
        <div
          class="bsheet-img-track"
          :class="{ 'no-transition': slideNoTransition }"
          :style="{ transform: `translateX(-${activeImageIdx * 100}%)` }"
        >
          <template v-if="store.sheetProduct.images?.length">
            <img
              v-for="(img, i) in store.sheetProduct.images"
              :key="i"
              :src="getProductImage([img])"
              :alt="store.sheetProduct.name"
              class="bsheet-photo"
            />
          </template>
          <img
            v-else
            :src="getProductImage([])"
            :alt="store.sheetProduct.name"
            class="bsheet-photo"
          />
        </div>

        <div v-if="hasMultipleImages" class="bsheet-img-dots">
          <span
            v-for="(_, i) in store.sheetProduct.images"
            :key="i"
            class="bsheet-img-dot"
            :class="{ active: i === activeImageIdx }"
            @click="goToImage(i)"
          ></span>
        </div>
      </div>

      <!-- Nav buttons are OUTSIDE .bsheet-img so they are never clipped -->
      <button
        v-if="hasMultipleImages"
        class="bsheet-img-nav bsheet-img-nav--prev"
        @click="prevImage"
        title="Previous image"
      >
        <span class="material-icons-round">chevron_left</span>
      </button>
      <button
        v-if="hasMultipleImages"
        class="bsheet-img-nav bsheet-img-nav--next"
        @click="nextImage"
        title="Next image"
      >
        <span class="material-icons-round">chevron_right</span>
      </button>
    </div>


    <!-- Name, Rating, Price -->
    <div class="bsheet-meta">
      <div class="bsheet-name">{{ store.sheetProduct.name }}</div>

      <div class="bsheet-rating">
        <span
          v-for="s in 5"
          :key="s"
          class="material-icons-round"
        >{{ s <= Math.floor(store.sheetProduct.rating) ? 'star' : (s - store.sheetProduct.rating < 1 ? 'star_half' : 'star_border') }}</span>
        <span>{{ store.sheetProduct.rating }} ({{ store.sheetProduct.reviewCount }} reviews)</span>
      </div>

      <div class="bsheet-price">
        ${{ store.sheetProduct.price.toFixed(2) }}
        <span v-if="store.sheetProduct.originalPrice" class="old">${{ store.sheetProduct.originalPrice.toFixed(2) }}</span>
      </div>
    </div>

    <!-- Description -->
    <div class="bsheet-desc-wrap">
      <div class="bsheet-desc" :class="{ expanded: descExpanded }">
        {{ store.sheetProduct.description }}
      </div>
      <button v-if="isDescLong" class="read-more-btn" @click="descExpanded = !descExpanded">
        {{ descExpanded ? 'Read Less' : 'Read More' }}
      </button>
    </div>

    <!-- Size selector -->
    <div class="bsheet-sizes">
      <div class="size-label">Select Size</div>
      <div class="sizes-wrap" :class="{ 'has-overflow': sizesOverflow }">
        <button
          v-if="sizesOverflow"
          class="sizes-nav"
          :disabled="atSizeStart"
          @click="scrollSizes(-1)"
          title="Scroll left"
        >
          <span class="material-icons-round">chevron_left</span>
        </button>
        <div class="sizes-viewport">
          <div ref="sizesEl" class="sizes" @scroll="onSizesScroll">
            <div
              v-for="(sz, i) in store.sheetProduct.sizes"
              :key="sz.id"
              class="size-chip"
              :class="{ active: selectedSizeIdx === i }"
              @click="selectedSizeIdx = i"
            >{{ sz.label }}</div>
          </div>
        </div>
        <button
          v-if="sizesOverflow"
          class="sizes-nav"
          :disabled="atSizeEnd"
          @click="scrollSizes(1)"
          title="Scroll right"
        >
          <span class="material-icons-round">chevron_right</span>
        </button>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="bsheet-acts">
      <button
        class="btn-wish"
        @click="store.toggleWish(store.sheetProduct.id)"
        :title="store.wishlist.has(store.sheetProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'"
      >
        <span class="material-icons-round">{{ store.wishlist.has(store.sheetProduct.id) ? 'favorite' : 'favorite_border' }}</span>
      </button>
      <button class="btn-try" @click="tryWithPhoto" title="Try with your photo">
        <span class="material-icons-round">photo_camera</span>
      </button>
      <button class="bsheet-cart-btn" @click="addToCart">
        <span class="material-icons-round">add_shopping_cart</span>
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { getProductImage } from '@/services/productService'

const store = useAppStore()
const selectedSizeIdx  = ref(0)
const descExpanded     = ref(false)
const activeImageIdx   = ref(0)
const slideNoTransition = ref(false)

// ── Size carousel state ──────────────────────────────────────────────────
const sizesEl       = ref<HTMLElement | null>(null)
const sizesOverflow = ref(false)
const atSizeStart   = ref(true)
const atSizeEnd     = ref(false)

const measureSizes = () => {
  const el = sizesEl.value
  if (!el) {
    sizesOverflow.value = false
    return
  }
  const overflow = el.scrollWidth - el.clientWidth > 1
  sizesOverflow.value = overflow
  atSizeStart.value   = el.scrollLeft <= 1
  atSizeEnd.value     = !overflow || el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
}

const onSizesScroll = () => measureSizes()

const scrollSizes = (dir: 1 | -1) => {
  const el = sizesEl.value
  if (!el) return
  const delta = Math.max(120, Math.round(el.clientWidth * 0.7)) * dir
  el.scrollBy({ left: delta, behavior: 'smooth' })
}

watch(() => store.sheetProduct, () => {
  selectedSizeIdx.value = 0
  descExpanded.value    = false
  // Jump to first image instantly (no slide animation on product change)
  slideNoTransition.value = true
  activeImageIdx.value    = 0
  nextTick(() => {
    slideNoTransition.value = false
    sizesEl.value?.scrollTo({ left: 0, behavior: 'auto' })
    measureSizes()
  })
})

onMounted(() => {
  measureSizes()
  window.addEventListener('resize', measureSizes)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureSizes)
})

const hasMultipleImages = computed(() =>
  (store.sheetProduct?.images?.length || 0) > 1
)

const prevImage = () => {
  const total = store.sheetProduct?.images?.length || 0
  if (total < 2) return
  activeImageIdx.value = (activeImageIdx.value - 1 + total) % total
}

const nextImage = () => {
  const total = store.sheetProduct?.images?.length || 0
  if (total < 2) return
  activeImageIdx.value = (activeImageIdx.value + 1) % total
}

const goToImage = (i: number) => {
  activeImageIdx.value = i
}

const isDescLong = computed(() =>
  (store.sheetProduct?.description?.length || 0) > 100
)

const addToCart = () => {
  if (!store.sheetProduct) return
  const size = store.sheetProduct.sizes[selectedSizeIdx.value]?.label
    ?? store.sheetProduct.sizes[0]?.label
    ?? ''
  store.addCart(store.sheetProduct.id, size)
}

const tryWithPhoto = () => {
  if (store.sheetProduct) store.setPreviewProduct(store.sheetProduct)
  store.closeSheet()
  store.nav('preview')
}
</script>

<style scoped>
/* Wrapper — normal flow width (respects .bsheet-body padding), positioning context for buttons.
   NO overflow:hidden here — that would clip the buttons. Visual rounding is on .bsheet-img. */
.bsheet-img-wrap {
  position: relative;
  margin: 0 0 16px;
}

/* Inner image area — clips the sliding track and provides the card visual */
.bsheet-img {
  position: relative;
  overflow: hidden;
  margin: 0;            /* override any global negative-margin on .bsheet-img */
  border-radius: 16px;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%);
}

/* Sliding track — all images sit side-by-side; translateX drives the carousel */
.bsheet-img-track {
  display: flex;
  height: 100%;
  transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}
.bsheet-img-track.no-transition { transition: none; }

.bsheet-photo {
  flex: 0 0 100%;
  width: 100%; height: 100%;
  object-fit: contain;
  padding: 14px;
  box-sizing: border-box;
  display: block;
}

/* Nav buttons — live in .bsheet-img-wrap (no overflow clip), always fully visible */
.bsheet-img-nav {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--accent); color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.25);
  transition: background .15s, transform .15s;
  z-index: 2;
}
.bsheet-img-nav:hover {
  background: var(--accent-hover, var(--accent));
  transform: translateY(-50%) scale(1.08);
}
.bsheet-img-nav:active { transform: translateY(-50%) scale(0.92); }
.bsheet-img-nav--prev { left: 12px; }
.bsheet-img-nav--next { right: 12px; }
.bsheet-img-dots {
  position: absolute; bottom: 10px; left: 0; right: 0;
  display: flex; justify-content: center; gap: 6px;
}
.bsheet-img-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: rgba(0,0,0,.25); cursor: pointer;
  transition: background .15s, transform .15s;
}
.bsheet-img-dot.active { background: var(--accent); transform: scale(1.25); }

/* ── Size carousel ─────────────────────────────────────────────── */
.sizes-wrap {
  display: flex;
  align-items: flex-start; /* top-align so buttons line up with chip top, not chip+scrollbar center */
  gap: 8px;
}
.sizes-viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.sizes-nav {
  flex: 0 0 auto;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--accent);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  transition: transform var(--t-fast) var(--ease), background var(--t-fast) var(--ease), opacity var(--t-fast) var(--ease);
}
.sizes-nav:hover:not(:disabled) {
  transform: scale(1.06);
  background: var(--accent-hover, var(--accent));
}
.sizes-nav:active:not(:disabled) {
  transform: scale(0.94);
}
.sizes-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  box-shadow: none;
}
.sizes-nav .material-icons-round { font-size: 22px; line-height: 1; }
</style>
