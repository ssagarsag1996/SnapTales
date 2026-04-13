<template>
  <main class="page active"><div class="page-pad">
    <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">My Orders</h2>

    <!-- Empty State -->
    <div v-if="orders.length === 0" class="orders-empty">
      <span class="material-icons-round">receipt_long</span>
      <h3>No orders yet</h3>
      <p>Your order history will appear here</p>
      <button class="btn-primary" @click="store.nav('shop')">Start Shopping</button>
    </div>

    <!-- Orders List -->
    <div v-else>
      <div
        v-for="(o, i) in orders"
        :key="o.id"
        :class="['order-card', 'stag-' + (i + 1)]"
      >
        <div class="order-head">
          <span class="order-id">{{ o.id }}</span>
          <span :class="['order-status', 'status-' + o.status]">{{ o.status }}</span>
        </div>
        <div class="order-items">
          <div
            v-for="id in o.items"
            :key="id"
            class="order-item-thumb"
            :title="getProduct(id)?.name"
          >
            <div class="mini-frame" style="border:3px solid var(--text-tertiary)"></div>
          </div>
        </div>
        <div class="order-track-bar">
          <div class="order-track-fill" :style="{ width: o.progress + '%' }"></div>
        </div>
        <div class="order-track-labels">
          <span>Confirmed</span>
          <span>Shipped</span>
          <span>Delivered</span>
        </div>
        <div class="order-foot">
          <span class="order-date">{{ o.date }}</span>
          <span class="order-total">${{ o.total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { ORDERS_DATA, PRODUCTS } from '@/data/products'

const store = useAppStore()
const orders = ORDERS_DATA

const getProduct = (id: number) => PRODUCTS.find(p => p.id === id)
</script>
