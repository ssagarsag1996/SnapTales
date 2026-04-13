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
      <div
        v-for="s in styles"
        :key="s"
        class="chip"
        :class="{ active: store.filter === s }"
        @click="store.setFilter(s)"
      >{{ s.charAt(0).toUpperCase() + s.slice(1) }}</div>
    </div>

    <!-- Featured Frames -->
    <div class="sec-head">
      <div class="sec-title">Featured Frames</div>
      <div class="sec-link" @click="store.nav('categories')">View All <span class="material-icons-round">chevron_right</span></div>
    </div>
    <div class="prod-grid">
      <div
        v-for="(p, i) in featuredProducts"
        :key="p.id"
        :class="['prod-card', 'fr-' + p.style, 'stag-' + ((i % 8) + 1)]"
        @click="store.openSheet(p)"
      >
        <div class="prod-img">
          <div class="frame-box"><div class="inner"></div></div>
          <div v-if="p.sale" class="sale-pill">SALE</div>
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
            <span>{{ p.rating }} ({{ p.reviews }})</span>
          </div>
          <div class="prod-price-row">
            <span class="prod-price">${{ p.price.toFixed(2) }}</span>
            <span v-if="p.orig" class="prod-price-old">${{ p.orig.toFixed(2) }}</span>
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
        :class="['prod-card', 'fr-' + p.style, 'stag-' + ((i % 8) + 1)]"
        @click="store.openSheet(p)"
      >
        <div class="prod-img">
          <div class="frame-box"><div class="inner"></div></div>
          <div v-if="p.sale" class="sale-pill">SALE</div>
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
            <span>{{ p.rating }} ({{ p.reviews }})</span>
          </div>
          <div class="prod-price-row">
            <span class="prod-price">${{ p.price.toFixed(2) }}</span>
            <span v-if="p.orig" class="prod-price-old">${{ p.orig.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()
const styles = ['all', 'classic', 'modern', 'ornate', 'minimal', 'rustic', 'gallery']

const featuredProducts = computed(() => {
  return store.filteredProducts.slice(0, 8)
})
</script>
