<template>
  <main class="page active"><div class="page-pad">
    <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">My Wishlist</h2>

    <div v-if="!store.currentUser" class="auth-gate">
      <span class="material-icons-round auth-gate-icon">favorite_border</span>
      <h3 class="auth-gate-title">Sign in to see your wishlist</h3>
      <p class="auth-gate-sub">Save frames you love and access them anytime</p>
      <button class="btn-gold" @click="store.openSignIn()">Sign In</button>
    </div>

    <div v-else-if="wishlistItems.length === 0" class="wish-empty">
      <span class="material-icons-round">favorite_border</span>
      <h3>Your wishlist is empty</h3>
      <p>Save frames you love for later</p>
      <button class="btn-primary" @click="store.nav('shop')">Browse Frames</button>
    </div>

    <div v-else class="prod-grid" style="padding-top:12px">
      <div
        v-for="(p, i) in wishlistItems"
        :key="p.id"
        :class="['prod-card', 'stag-' + ((i % 8) + 1)]"
        @click="store.openSheet(p)"
      >
        <div class="prod-img">
          <img :src="getProductImage(p.images)" :alt="p.name" class="prod-photo" />
          <button class="wish-btn liked" @click.stop="store.toggleWish(p.id)">
            <span class="material-icons-round">favorite</span>
          </button>
        </div>
        <div class="prod-info">
          <div class="prod-name">{{ p.name }}</div>
          <div class="prod-price-row">
            <span class="prod-price">${{ p.price.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { getProductImage } from '@/services/productService'

const store = useAppStore()

const wishlistItems = computed(() =>
  store.products.filter(p => store.wishlist.has(p.id))
)
</script>

<style scoped>
.prod-photo { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
</style>
