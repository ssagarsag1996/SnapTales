<template>
  <main class="page active"><div class="page-pad">
    <!-- Auth gate -->
    <div v-if="!store.currentUser" class="auth-gate">
      <span class="material-icons-round auth-gate-icon">account_circle</span>
      <h3 class="auth-gate-title">Sign in to your account</h3>
      <p class="auth-gate-sub">Access your orders, wishlist, addresses and more</p>
      <button class="btn-gold" @click="store.openSignIn()">Sign In</button>
    </div>

    <template v-else>
    <div class="profile-head">
      <div class="avatar">
        {{ avatarInitial }}
        <span class="avatar-edit" @click="startNameEdit" title="Edit name">
          <span class="material-icons-round">edit</span>
        </span>
      </div>

      <!-- Name display / edit -->
      <template v-if="!editingName">
        <div class="profile-name">{{ store.currentUser.name ?? 'My Account' }}</div>
      </template>
      <template v-else>
        <div class="name-edit-row">
          <input
            ref="nameInputRef"
            v-model="editNameVal"
            class="name-input"
            placeholder="Your name"
            maxlength="60"
            @keyup.enter="saveName"
            @keyup.escape="cancelNameEdit"
          />
          <button class="name-save-btn" :disabled="savingName" @click="saveName">
            <span :class="['material-icons-round', { rotating: savingName }]">{{ savingName ? 'sync' : 'check' }}</span>
          </button>
          <button class="name-cancel-btn" @click="cancelNameEdit">
            <span class="material-icons-round">close</span>
          </button>
        </div>
      </template>

      <div class="profile-email">{{ store.currentUser.email ?? store.currentUser.phone ?? '' }}</div>
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
      <!-- Addresses — expandable -->
      <div class="menu-item" @click="toggleAddresses">
        <span class="material-icons-round">location_on</span>
        <span class="menu-item-label">Addresses</span>
        <span class="material-icons-round menu-item-arrow" :style="{ transform: showAddresses ? 'rotate(90deg)' : '' }">chevron_right</span>
      </div>

      <!-- Address panel -->
      <Transition name="slide-down">
        <div v-if="showAddresses" class="addr-panel">
          <!-- Existing addresses -->
          <div v-if="addresses.length === 0" class="addr-empty">No saved addresses</div>
          <div v-for="(a, i) in addresses" :key="i" class="addr-card">
            <button class="addr-delete-btn" @click.stop="deleteAddress(i)" title="Remove">
              <span class="material-icons-round">delete_outline</span>
            </button>
            <div class="addr-card-head">
              <span class="addr-label">{{ a.label || 'Address ' + (i + 1) }}</span>
            </div>
            <div class="addr-name-line">{{ a.fullName }}</div>
            <div class="addr-line">{{ a.phone }}</div>
            <div class="addr-line">{{ a.line1 }}, {{ a.city }}, {{ a.state }} {{ a.pinCode }}</div>
          </div>

          <!-- Add new address form -->
          <div v-if="!showAddForm" class="addr-add-btn-wrap">
            <button class="btn-outline-sm" @click="showAddForm = true">
              <span class="material-icons-round">add</span> Add Address
            </button>
          </div>
          <div v-else class="addr-form">
            <div class="addr-form-title">New Address</div>
            <div class="addr-form-row">
              <input v-model="newAddr.label" class="addr-input" placeholder="Label (Home, Work…)" />
            </div>
            <div class="addr-form-row two-col">
              <input v-model="newAddr.fullName" class="addr-input" placeholder="Full name *" />
              <input v-model="newAddr.phone" class="addr-input" placeholder="Phone *" />
            </div>
            <div class="addr-form-row">
              <input v-model="newAddr.line1" class="addr-input" placeholder="Street / Flat / Area *" />
            </div>
            <div class="addr-form-row two-col">
              <input v-model="newAddr.city" class="addr-input" placeholder="City *" />
              <input v-model="newAddr.state" class="addr-input" placeholder="State *" />
            </div>
            <div class="addr-form-row half">
              <input v-model="newAddr.pinCode" class="addr-input" placeholder="PIN Code *" maxlength="10" />
            </div>
            <div class="addr-form-actions">
              <button class="btn-outline-sm" @click="cancelAddForm">Cancel</button>
              <button class="btn-primary-sm" :disabled="savingAddr" @click="saveAddress">
                <span v-if="savingAddr" class="material-icons-round rotating" style="font-size:16px">sync</span>
                <span v-else>Save</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

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
      <div class="menu-item" style="color:var(--error)" @click="store.signOut()">
        <span class="material-icons-round" style="color:var(--error)">logout</span>
        <span class="menu-item-label">Sign Out</span>
        <span class="material-icons-round menu-item-arrow">chevron_right</span>
      </div>
    </div>
    </template>
  </div></main>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { userService, type Address } from '@/services/userService'
import { THEMES } from '@/data/products'

const store = useAppStore()
const themes = THEMES

const currentThemeId = computed(() => THEMES[store.themeIdx]?.id || 'luxury-light')
const avatarInitial = computed(() => store.currentUser?.name?.charAt(0).toUpperCase() ?? '?')

// ── Name edit ──────────────────────────────────────────
const editingName = ref(false)
const editNameVal = ref('')
const savingName = ref(false)
const nameInputRef = ref<HTMLInputElement | null>(null)

function startNameEdit() {
  editNameVal.value = store.currentUser?.name ?? ''
  editingName.value = true
  nextTick(() => nameInputRef.value?.focus())
}

function cancelNameEdit() {
  editingName.value = false
}

async function saveName() {
  if (!store.currentUser || savingName.value) return
  savingName.value = true
  try {
    const updated = await userService.update(store.currentUser.id, { name: editNameVal.value.trim() })
    store.setUser(updated)
    editingName.value = false
    store.showToast('Name updated')
  } catch {
    store.showToast('Failed to update name')
  } finally {
    savingName.value = false
  }
}

// ── Addresses ──────────────────────────────────────────
const showAddresses = ref(false)
const showAddForm = ref(false)
const savingAddr = ref(false)

const addresses = computed(() => store.currentUser?.addresses ?? [])

function toggleAddresses() {
  showAddresses.value = !showAddresses.value
  if (!showAddresses.value) showAddForm.value = false
}

const emptyAddr = (): Address => ({
  label: '', fullName: '', phone: '', line1: '', city: '', state: '', pinCode: ''
})
const newAddr = reactive<Address>(emptyAddr())

function cancelAddForm() {
  Object.assign(newAddr, emptyAddr())
  showAddForm.value = false
}

async function saveAddress() {
  if (!store.currentUser || savingAddr.value) return
  if (!newAddr.fullName || !newAddr.phone || !newAddr.line1 || !newAddr.city || !newAddr.state || !newAddr.pinCode) {
    store.showToast('Please fill all required fields')
    return
  }
  savingAddr.value = true
  try {
    const updated = await userService.addAddress(store.currentUser.id, { ...newAddr })
    store.setUser(updated)
    Object.assign(newAddr, emptyAddr())
    showAddForm.value = false
    store.showToast('Address saved')
  } catch {
    store.showToast('Failed to save address')
  } finally {
    savingAddr.value = false
  }
}

async function deleteAddress(index: number) {
  if (!store.currentUser) return
  try {
    const updated = await userService.removeAddress(store.currentUser.id, index)
    store.setUser(updated)
    store.showToast('Address removed')
  } catch {
    store.showToast('Failed to remove address')
  }
}
</script>
