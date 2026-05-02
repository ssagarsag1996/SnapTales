<template>
  <!-- Header -->
    <header class="app-header">
      <div class="header-logo" @click="store.nav('shop')">
        <div class="logo-icon"><span class="material-icons-round">photo_frame</span></div>
        <span>SnapTales</span>
      </div>
      <div class="hdr-search">
        <span class="material-icons-round">search</span>
        <input
          type="text"
          placeholder="Search frames, styles, sizes..."
          @input="store.handleSearch(($event.target as HTMLInputElement).value)"
        >
      </div>
      <div class="hdr-actions">
        <button class="icon-btn" @click="store.nav('notifications')" title="Notifications">
          <span class="material-icons-round">notifications_none</span>
          <span class="badge">3</span>
        </button>
        <button class="icon-btn" @click="store.nav('cart')" title="Cart">
          <span class="material-icons-round">shopping_bag</span>
          <span class="badge cart-badge" :class="{ hidden: store.totalQty === 0 }">{{ store.totalQty }}</span>
        </button>
        <button class="icon-btn" @click="store.cycleTheme()" title="Change Theme">
          <span class="material-icons-round">palette</span>
        </button>
        <button
          class="icon-btn"
          :class="{ 'icon-btn--authed': store.currentUser }"
          :title="store.currentUser ? 'My Profile' : 'Sign In'"
          @click="store.currentUser ? store.nav('profile') : store.openSignIn()"
        >
          <span v-if="store.currentUser" class="hdr-avatar">{{ store.currentUser.name?.charAt(0).toUpperCase() ?? '?' }}</span>
          <span v-else class="material-icons-round">person_outline</span>
        </button>
      </div>
    </header>

    <!-- Sidebar (desktop only) -->
    <nav class="sidebar">
      <div class="sidebar-brand">
        <div class="logo-icon"><span class="material-icons-round">photo_frame</span></div>
        <span>SnapTales</span>
      </div>

      <div class="sidebar-label">Shop</div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'shop' }" @click="store.nav('shop')">
        <span class="material-icons-round">storefront</span>
        <span>Explore</span>
      </div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'categories' }" @click="store.nav('categories')">
        <span class="material-icons-round">category</span>
        <span>Categories</span>
      </div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'preview' }" @click="store.nav('preview')">
        <span class="material-icons-round">photo_camera</span>
        <span>Frame Preview</span>
      </div>

      <div class="sidebar-divider"></div>

      <div class="sidebar-label">Account</div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'wishlist' }" @click="store.nav('wishlist')">
        <span class="material-icons-round">favorite_border</span>
        <span>Wishlist</span>
      </div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'cart' }" @click="store.nav('cart')">
        <span class="material-icons-round">shopping_bag</span>
        <span>Cart</span>
        <span class="sb-badge" :class="{ hidden: store.totalQty === 0 }">{{ store.totalQty }}</span>
      </div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'orders' }" @click="store.nav('orders')">
        <span class="material-icons-round">receipt_long</span>
        <span>Orders</span>
      </div>
      <div class="sidebar-item" :class="{ active: store.currentPage === 'notifications' }" @click="store.nav('notifications')">
        <span class="material-icons-round">notifications_none</span>
        <span>Notifications</span>
        <span class="sb-badge">3</span>
      </div>

      <div class="sidebar-divider"></div>

      <!-- Admin section -->
      <template v-if="store.isAdmin">
        <div class="sidebar-divider"></div>
        <div class="sidebar-label">Admin</div>
        <div class="sidebar-item" :class="{ active: store.currentPage === 'admin-products' }" @click="store.nav('admin-products')">
          <span class="material-icons-round">inventory_2</span>
          <span>Products</span>
        </div>
        <div class="sidebar-item" :class="{ active: store.currentPage === 'admin-categories' }" @click="store.nav('admin-categories')">
          <span class="material-icons-round">category</span>
          <span>Categories</span>
        </div>
        <div class="sidebar-item" :class="{ active: store.currentPage === 'admin-sizes' }" @click="store.nav('admin-sizes')">
          <span class="material-icons-round">straighten</span>
          <span>Sizes</span>
        </div>
      </template>

      <div class="sidebar-divider"></div>
      <div v-if="store.currentUser" class="sidebar-item" :class="{ active: store.currentPage === 'profile' }" @click="store.nav('profile')">
        <span class="sb-avatar">{{ store.currentUser.name?.charAt(0).toUpperCase() ?? '?' }}</span>
        <div class="sb-user-info">
          <span class="sb-user-name">{{ store.currentUser.name ?? 'My Account' }}</span>
          <span class="sb-user-sub">{{ store.currentUser.email ?? store.currentUser.phone }}</span>
        </div>
      </div>
      <div v-else class="sidebar-item" @click="store.openSignIn()">
        <span class="material-icons-round">person_outline</span>
        <span>Sign In</span>
      </div>
    </nav>

    <!-- Page content -->
    <ShopPage v-if="store.currentPage === 'shop'" />
    <CategoriesPage v-if="store.currentPage === 'categories'" />
    <PreviewPage v-if="store.currentPage === 'preview'" />
    <WishlistPage v-if="store.currentPage === 'wishlist'" />
    <CartPage v-if="store.currentPage === 'cart'" />
    <OrdersPage v-if="store.currentPage === 'orders'" />
    <NotificationsPage v-if="store.currentPage === 'notifications'" />
    <ProfilePage v-if="store.currentPage === 'profile'" />
    <AdminProductsPage    v-if="store.currentPage === 'admin-products'" />
    <AdminCategoriesPage  v-if="store.currentPage === 'admin-categories'" />
    <AdminSizesPage       v-if="store.currentPage === 'admin-sizes'" />

    <!-- Tab bar (mobile only) -->
    <nav class="tab-bar">
      <button class="tab-item" :class="{ active: store.currentPage === 'shop' }" @click="store.nav('shop')">
        <span class="tab-pill"></span>
        <span class="material-icons-round">storefront</span>
        <span>Shop</span>
      </button>
      <button class="tab-item" :class="{ active: store.currentPage === 'categories' }" @click="store.nav('categories')">
        <span class="tab-pill"></span>
        <span class="material-icons-round">category</span>
        <span>Browse</span>
      </button>
      <button class="tab-item" :class="{ active: store.currentPage === 'preview' }" @click="store.nav('preview')">
        <span class="tab-pill"></span>
        <span class="material-icons-round">photo_camera</span>
        <span>Preview</span>
      </button>
      <button class="tab-item" :class="{ active: store.currentPage === 'cart' }" @click="store.nav('cart')">
        <span class="tab-pill"></span>
        <span class="material-icons-round">shopping_bag</span>
        <span>Cart</span>
        <span class="badge cart-badge-tab" :class="{ hidden: store.totalQty === 0 }">{{ store.totalQty }}</span>
      </button>
      <button class="tab-item" :class="{ active: store.currentPage === 'profile' }" @click="store.nav('profile')">
        <span class="tab-pill"></span>
        <span class="material-icons-round">person</span>
        <span>Profile</span>
      </button>
    </nav>

    <!-- Bottom sheet overlay and sheet -->
    <div
      class="overlay"
      :class="{ open: store.sheetOpen }"
      @click="store.closeSheet()"
    ></div>
    <div class="bsheet" :class="{ open: store.sheetOpen }">
      <div class="bsheet-handle"></div>
      <div class="bsheet-body">
        <BottomSheet />
      </div>
    </div>

    <!-- Toast notification -->
    <Teleport to="body">
      <div class="toast" :class="{ show: store.toastVisible }">
        <span class="material-icons-round">check_circle</span>
        <span>{{ store.toastMsg }}</span>
      </div>
    </Teleport>

    <!-- Sign In Modal -->
    <SignInModal />

    <!-- Confirm Dialog -->
    <ConfirmDialog />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { onUnauthorized } from '@/services/userService'
import { initGoogle } from '@/services/googleAuthService'

// Import page components
import ShopPage from '@/pages/ShopPage.vue'
import CategoriesPage from '@/pages/CategoriesPage.vue'
import PreviewPage from '@/pages/PreviewPage.vue'
import WishlistPage from '@/pages/WishlistPage.vue'
import CartPage from '@/pages/CartPage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import NotificationsPage from '@/pages/NotificationsPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import AdminProductsPage from '@/pages/AdminProductsPage.vue'
import AdminCategoriesPage from '@/pages/AdminCategoriesPage.vue'
import AdminSizesPage from '@/pages/AdminSizesPage.vue'
import BottomSheet from '@/components/BottomSheet.vue'
import SignInModal from '@/components/SignInModal.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const store = useAppStore()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  onUnauthorized(() => store.handleUnauthorized())
  store.loadCatalogue()
  // Initialise Google Identity Services so it's ready before the sign-in modal opens
  initGoogle()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
