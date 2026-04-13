<template>
  <main class="page active"><div class="page-pad">
    <div class="profile-head">
      <div class="avatar">
        S
        <span class="avatar-edit"><span class="material-icons-round">edit</span></span>
      </div>
      <div class="profile-name">Sagar</div>
      <div class="profile-email">sagar@snaptales.com</div>
    </div>

    <div class="menu-group">
      <div class="menu-item" @click="store.nav('orders')">
        <span class="material-icons-round">receipt_long</span>
        <span class="menu-item-label">My Orders</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
      <div class="menu-item" @click="store.nav('wishlist')">
        <span class="material-icons-round">favorite</span>
        <span class="menu-item-label">Wishlist</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
      <div class="menu-item">
        <span class="material-icons-round">location_on</span>
        <span class="menu-item-label">Addresses</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
      <div class="menu-item" @click="store.nav('notifications')">
        <span class="material-icons-round">notifications</span>
        <span class="menu-item-label">Notifications</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
      <div class="menu-item">
        <span class="material-icons-round">help</span>
        <span class="menu-item-label">Help & Support</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
    </div>

    <!-- Theme Picker -->
    <div class="theme-picker">
      <div class="theme-picker-title">
        <span class="material-icons-round" style="font-size:20px;color:var(--accent)">palette</span> App Theme
      </div>
      <div class="theme-row">
        <div
          v-for="t in themes"
          :key="t.id"
          class="theme-opt"
          :class="{ active: currentThemeId === t.id }"
          @click="store.setTheme(t.id)"
        >
          <div :class="['theme-dot', t.cls, { active: currentThemeId === t.id }]"></div>
          <span>{{ t.name }}</span>
        </div>
      </div>
    </div>

    <div class="menu-group">
      <div class="menu-item" style="color:var(--error)">
        <span class="material-icons-round" style="color:var(--error)">logout</span>
        <span class="menu-item-label">Sign Out</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { THEMES } from '@/data/products'

const store = useAppStore()
const themes = THEMES

const currentThemeId = computed(() => {
  return THEMES[store.themeIdx]?.id || 'luxury-light'
})
</script>
