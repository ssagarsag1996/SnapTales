<template>
  <main class="page active">
    <div class="page-pad">
      <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">Categories</h2>
      <p style="color:var(--text-tertiary);font-size:.88rem;margin-bottom:16px">Browse by frame style</p>

      <!-- Loading -->
      <div v-if="!store.productsLoaded" class="loading-row">
        <span class="material-icons-round rotating">sync</span> Loading…
      </div>

      <div v-else class="cat-grid">
        <div
          v-for="(c, i) in store.categories"
          :key="c.id"
          :class="['cat-card', 'stag-' + (i + 1)]"
          @click="goToCategory(c.id)"
        >
          <!-- Product image carousel -->
          <div class="cat-thumb">
            <button
              v-if="getCatProducts(c.id).length > 1"
              class="cat-nav cat-nav-l"
              @click.stop="nav(c.id, -1, getCatProducts(c.id).length)"
            >
              <span class="material-icons-round">chevron_left</span>
            </button>

            <div class="cat-frame-stage">
              <Transition name="cat-slide">
                <div :key="c.id + '-' + getIdx(c.id)" class="cat-frame-wrap">
                  <img
                    :src="getImage(currentProd(c))"
                    :alt="c.name"
                    class="cat-prod-img"
                  />
                </div>
              </Transition>
            </div>

            <button
              v-if="getCatProducts(c.id).length > 1"
              class="cat-nav cat-nav-r"
              @click.stop="nav(c.id, 1, getCatProducts(c.id).length)"
            >
              <span class="material-icons-round">chevron_right</span>
            </button>

            <div class="cat-dots" v-if="getCatProducts(c.id).length > 1">
              <span
                v-for="(_, pi) in getCatProducts(c.id)"
                :key="pi"
                :class="['cat-dot', { active: getIdx(c.id) === pi }]"
              ></span>
            </div>
          </div>

          <div class="cat-label">
            {{ c.name }}<br>
            <span class="cat-count">{{ c.productCount }} items</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { getProductImage, type Category, type Product } from '@/services/productService'

const store = useAppStore()

const idxMap = ref<Record<string, number>>({})

const getIdx = (id: string): number => idxMap.value[id] ?? 0

const nav = (id: string, dir: number, total: number) => {
  const cur = getIdx(id)
  idxMap.value[id] = (cur + dir + total) % total
}

// Returns products in a category, sorted so products WITH images appear first.
// This ensures the carousel shows a real product image up front whenever
// at least one product in the category has one.
const getCatProducts = (categoryId: string): Product[] => {
  const inCat = store.products.filter(p => p.categoryId === categoryId)
  return [...inCat].sort((a, b) => {
    const aHas = (a.images?.length ?? 0) > 0 ? 1 : 0
    const bHas = (b.images?.length ?? 0) > 0 ? 1 : 0
    return bHas - aHas // products with images come first
  })
}

const currentProd = (c: Category): Product | undefined => {
  const prods = getCatProducts(c.id)
  return prods[getIdx(c.id)] ?? prods[0]
}

const getImage = (p: Product | undefined) =>
  getProductImage(p?.images ?? [])

const goToCategory = (id: string) => {
  store.setFilter(id)
  store.nav('shop')
}
</script>

<style scoped>
.loading-row {
  display: flex; align-items: center; gap: 8px;
  color: var(--text-tertiary); font-size: .88rem;
  padding: 32px 0; justify-content: center;
}
.cat-prod-img {
  width: 100%; height: 100%;
  object-fit: cover; border-radius: 8px;
}
@keyframes cat-spin { to { transform: rotate(360deg); } }
.rotating { animation: cat-spin .75s linear infinite; font-size: 20px; }
</style>
