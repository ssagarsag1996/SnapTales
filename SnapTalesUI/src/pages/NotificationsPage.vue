<template>
  <main class="page active"><div class="page-pad">
    <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">Notifications</h2>
    <!-- Auth gate -->
    <div v-if="!store.currentUser" class="auth-gate">
      <span class="material-icons-round auth-gate-icon">notifications_none</span>
      <h3 class="auth-gate-title">Sign in for notifications</h3>
      <p class="auth-gate-sub">Order updates and offers will appear here</p>
      <button class="btn-gold" @click="store.openSignIn()">Sign In</button>
    </div>

    <div v-else class="notif-list">
      <div
        v-for="(n, i) in notifications"
        :key="i"
        :class="['notif-item', { unread: n.unread }, 'stag-' + (i + 1)]"
      >
        <div :class="['notif-icon', n.type]">
          <span class="material-icons-round">{{ getNotifIcon(n.type) }}</span>
        </div>
        <div class="notif-body">
          <div class="notif-title">{{ n.title }}</div>
          <div class="notif-desc">{{ n.desc }}</div>
          <div class="notif-time">{{ n.time }}</div>
        </div>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { NOTIFS } from '@/data/products'

const store = useAppStore()

const notifications = NOTIFS

const getNotifIcon = (type: string) => {
  switch (type) {
    case 'order': return 'check_circle'
    case 'ship': return 'local_shipping'
    default: return 'local_offer'
  }
}
</script>
