<template>
  <div v-if="store.sheetProduct" class="bsheet-content">
    <!-- Close button — absolute top-right -->
    <button class="bsheet-close" @click="store.closeSheet()">
      <span class="material-icons-round">close</span>
    </button>

    <!-- FIXED: Frame image — never scrolls -->
    <div class="bsheet-img">
      <div :class="['frame-lg', 'fr-' + store.sheetProduct.style]">
        <div class="frame-box"><div class="inner-lg"></div></div>
      </div>
    </div>

    <!-- FIXED: Name, Rating, Price — always visible -->
    <div class="bsheet-meta">
      <div class="bsheet-name">{{ store.sheetProduct.name }}</div>

      <div class="bsheet-rating">
        <span
          v-for="s in 5"
          :key="s"
          class="material-icons-round"
        >{{ s <= Math.floor(store.sheetProduct.rating) ? 'star' : (s - store.sheetProduct.rating < 1 ? 'star_half' : 'star_border') }}</span>
        <span>{{ store.sheetProduct.rating }} ({{ store.sheetProduct.reviews }} reviews)</span>
      </div>

      <div class="bsheet-price">
        ${{ store.sheetProduct.price.toFixed(2) }}
        <span v-if="store.sheetProduct.orig" class="old">${{ store.sheetProduct.orig.toFixed(2) }}</span>
      </div>
    </div>

    <!-- SCROLLABLE: Description only — this is the only part that scrolls -->
    <div class="bsheet-desc-wrap">
      <div class="bsheet-desc" :class="{ expanded: descExpanded }">
        {{ store.sheetProduct.desc }}
      </div>
      <button v-if="isDescLong" class="read-more-btn" @click="descExpanded = !descExpanded">
        {{ descExpanded ? 'Read Less' : 'Read More' }}
      </button>
    </div>

    <!-- FIXED: Size selector — always visible -->
    <div class="bsheet-sizes">
      <div class="size-label">Select Size</div>
      <div class="sizes">
        <div
          v-for="(sz, i) in store.sheetProduct.sizes"
          :key="sz"
          class="size-chip"
          :class="{ active: selectedSizeIdx === i }"
          @click="selectedSizeIdx = i"
        >{{ sz }}</div>
      </div>
    </div>

    <!-- FIXED: Action buttons — always visible, pinned at bottom -->
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
import { ref, watch, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const selectedSizeIdx = ref(1)
const descExpanded = ref(false)

// Reset state when product changes
watch(() => store.sheetProduct, () => {
  selectedSizeIdx.value = 1
  descExpanded.value = false
})

// Show Read More only if description is long enough
const isDescLong = computed(() => {
  return (store.sheetProduct?.desc?.length || 0) > 100
})

const addToCart = () => {
  if (!store.sheetProduct) return
  const size = store.sheetProduct.sizes[selectedSizeIdx.value] || store.sheetProduct.sizes[0]
  store.addCart(store.sheetProduct.id, size)
}

const tryWithPhoto = () => {
  store.closeSheet()
  store.nav('preview')
}
</script>
