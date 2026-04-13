<template>
  <main class="page active">
    <div class="page-pad">
      <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">Categories</h2>
      <p style="color:var(--text-tertiary);font-size:.88rem;margin-bottom:16px">Browse by frame style</p>

      <div class="cat-grid">
        <div
          v-for="(c, i) in categories"
          :key="c.name"
          :class="['cat-card', 'stag-' + (i + 1)]"
          @click="goToCategory(c.filter)"
        >
          <!-- Frame carousel thumb -->
          <div class="cat-thumb">

            <!-- Left arrow -->
            <button
              v-if="getCatProducts(c.filter).length > 1"
              class="cat-nav cat-nav-l"
              @click.stop="nav(c.name, -1, getCatProducts(c.filter).length)"
            >
              <span class="material-icons-round">chevron_left</span>
            </button>

            <!-- Sliding frame stage -->
            <div class="cat-frame-stage">
              <Transition name="cat-slide">
                <div
                  :key="c.name + '-' + getIdx(c.name)"
                  :class="['cat-frame-wrap', 'fr-' + currentProd(c).style]"
                >
                  <div class="cat-frame-box">
                    <div class="cat-frame-inner"></div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Right arrow -->
            <button
              v-if="getCatProducts(c.filter).length > 1"
              class="cat-nav cat-nav-r"
              @click.stop="nav(c.name, 1, getCatProducts(c.filter).length)"
            >
              <span class="material-icons-round">chevron_right</span>
            </button>

            <!-- Dot indicators -->
            <div class="cat-dots" v-if="getCatProducts(c.filter).length > 1">
              <span
                v-for="(_, pi) in getCatProducts(c.filter)"
                :key="pi"
                :class="['cat-dot', { active: getIdx(c.name) === pi }]"
              ></span>
            </div>

          </div>

          <!-- Label -->
          <div class="cat-label">
            {{ c.name }}<br>
            <span class="cat-count">{{ c.count }} items</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { CATEGORIES, PRODUCTS } from '@/data/products'
import type { Category } from '@/data/products'

const store = useAppStore()
const categories = CATEGORIES

// Track current slide index per category name
const idxMap = ref<Record<string, number>>({})

const getIdx = (name: string): number => idxMap.value[name] ?? 0

const nav = (name: string, dir: number, total: number) => {
  const cur = getIdx(name)
  idxMap.value[name] = (cur + dir + total) % total
}

const getCatProducts = (filter: string) => {
  if (filter === 'all') return PRODUCTS.filter(p => [1, 3, 5, 8, 2, 6].includes(p.id))
  return PRODUCTS.filter(p => p.style === filter)
}

const currentProd = (c: Category) => {
  const prods = getCatProducts(c.filter)
  return prods[getIdx(c.name)] ?? prods[0]
}

const goToCategory = (filter: string) => {
  store.setFilter(filter)
  store.nav('shop')
}
</script>
