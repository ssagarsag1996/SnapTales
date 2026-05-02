<template>
  <main class="page active"><div class="page-pad">
    <!-- Hero Banner -->
    <div class="hero">
      <div class="hero-tag">
        <span class="material-icons-round" style="font-size:14px">auto_awesome</span> New Collection 2026
      </div>
      <div class="hero-title">Craft Your<br>Precious Memories</div>
      <div class="hero-sub">Premium handcrafted frames for every moment worth preserving</div>
      <a class="hero-btn" @click="store.nav('categories')">
        Explore Collection <span class="material-icons-round">arrow_forward</span>
      </a>
    </div>

    <!-- Mobile Search -->
    <div class="mobile-search">
      <span class="material-icons-round">search</span>
      <input type="text" placeholder="Search frames..." @input="store.handleSearch(($event.target as HTMLInputElement).value)">
    </div>

    <!-- Filter Chips -->
    <div class="chips-row">
      <div class="chip" :class="{ active: store.filter === 'all' }" @click="store.setFilter('all')">All</div>
      <div
        v-for="cat in store.categories"
        :key="cat.id"
        class="chip"
        :class="{ active: store.filter === cat.id }"
        @click="store.setFilter(cat.id)"
      >{{ cat.name }}</div>
    </div>

    <!-- Loading state -->
    <div v-if="!store.productsLoaded" class="loading-row">
      <span class="material-icons-round rotating">sync</span> Loading products…
    </div>

    <template v-else>
      <!-- Featured Frames -->
      <div class="sec-head">
        <div class="sec-title">Featured Frames</div>
        <div class="sec-link" @click="store.nav('categories')">View All <span class="material-icons-round">chevron_right</span></div>
      </div>
      <div class="prod-grid">
        <div
          v-for="(p, i) in featuredProducts"
          :key="p.id"
          :class="['prod-card', 'stag-' + ((i % 8) + 1)]"
          @click="store.openSheet(p)"
        >
          <div class="prod-img">
            <img :src="getImage(p)" :alt="p.name" class="prod-photo" />
            <div v-if="p.isSale" class="sale-pill">SALE</div>
            <button
              class="wish-btn"
              :class="{ liked: store.wishlist.has(p.id) }"
              @click.stop="store.toggleWish(p.id)"
            >
              <span class="material-icons-round">{{ store.wishlist.has(p.id) ? 'favorite' : 'favorite_border' }}</span>
            </button>
          </div>
          <div class="prod-info">
            <div class="prod-name">{{ p.name }}</div>
            <div class="prod-rating">
              <span class="material-icons-round">star</span>
              <span>{{ p.rating }} ({{ p.reviewCount }})</span>
            </div>
            <div class="prod-price-row">
              <span class="prod-price">${{ p.price.toFixed(2) }}</span>
              <span v-if="p.originalPrice" class="prod-price-old">${{ p.originalPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- New Arrivals -->
      <div class="sec-head">
        <div class="sec-title">New Arrivals</div>
        <div class="sec-link">See More <span class="material-icons-round">chevron_right</span></div>
      </div>
      <div class="prod-grid">
        <div
          v-for="(p, i) in store.newArrivals"
          :key="'new-' + p.id"
          :class="['prod-card', 'stag-' + ((i % 8) + 1)]"
          @click="store.openSheet(p)"
        >
          <div class="prod-img">
            <img :src="getImage(p)" :alt="p.name" class="prod-photo" />
            <div v-if="p.isSale" class="sale-pill">SALE</div>
            <button
              class="wish-btn"
              :class="{ liked: store.wishlist.has(p.id) }"
              @click.stop="store.toggleWish(p.id)"
            >
              <span class="material-icons-round">{{ store.wishlist.has(p.id) ? 'favorite' : 'favorite_border' }}</span>
            </button>
          </div>
          <div class="prod-info">
            <div class="prod-name">{{ p.name }}</div>
            <div class="prod-rating">
              <span class="material-icons-round">star</span>
              <span>{{ p.rating }} ({{ p.reviewCount }})</span>
            </div>
            <div class="prod-price-row">
              <span class="prod-price">${{ p.price.toFixed(2) }}</span>
              <span v-if="p.originalPrice" class="prod-price-old">${{ p.originalPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div></main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { getProductImage, type Product } from '@/services/productService'

const store = useAppStore()

const getImage = (p: Product) => getProductImage(p.images)

const featuredProducts = computed(() => store.filteredProducts.slice(0, 8))
</script>

<style scoped>
.loading-row {
  display: flex; align-items: center; gap: 8px;
  color: var(--text-tertiary); font-size: .88rem;
  padding: 32px 0; justify-content: center;
}
.prod-photo {
  width: 100%; height: 100%;
  object-fit: cover; border-radius: inherit;
}
@keyframes shop-spin { to { transform: rotate(360deg); } }
.rotating { animation: shop-spin .75s linear infinite; font-size: 20px; }
</style>
