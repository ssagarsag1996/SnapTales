<template>
  <main class="page active"><div class="page-pad">
    <div class="admin-header">
      <h2 class="admin-title">Manage Categories</h2>
      <button class="btn-gold" @click="toggleAdd">
        <span class="material-icons-round" style="font-size:18px">{{ showForm ? 'close' : 'add' }}</span>
        {{ showForm ? 'Cancel' : 'Add Category' }}
      </button>
    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="admin-form-card">
      <div class="admin-form-title">New Category</div>
      <div class="admin-field">
        <label class="admin-label">Name</label>
        <input class="admin-input" v-model="newName" placeholder="e.g. Vintage" @keyup.enter="create" />
      </div>
      <div class="admin-form-actions">
        <button class="admin-cancel-btn" @click="toggleAdd">Cancel</button>
        <button class="btn-gold" :disabled="saving" @click="create">
          <span v-if="saving" class="material-icons-round rotating" style="font-size:18px">sync</span>
          <span v-else class="material-icons-round" style="font-size:18px">check</span>
          Save Category
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="admin-toolbar">
      <div class="admin-search">
        <span class="material-icons-round">search</span>
        <input type="text" v-model="searchQuery" placeholder="Search categories..." class="admin-search-input" />
        <button v-if="searchQuery" class="admin-search-clear" @click="searchQuery = ''" title="Clear">
          <span class="material-icons-round">close</span>
        </button>
      </div>
      <span class="admin-toolbar-count">{{ filteredCategories.length }} / {{ store.categories.length }}</span>
    </div>

    <!-- List -->
    <div v-if="store.categories.length === 0 && store.productsLoaded" class="admin-empty">
      No categories yet.
    </div>
    <div v-else-if="filteredCategories.length === 0" class="admin-empty">
      No categories match your search.
    </div>
    <div class="admin-list">
      <div v-for="cat in filteredCategories" :key="cat.id" class="admin-row">

        <!-- View mode -->
        <template v-if="editId !== cat.id">
          <div class="admin-row-info">
            <span class="admin-row-name">{{ cat.name }}</span>
            <span class="admin-row-sub">{{ cat.productCount }} product{{ cat.productCount !== 1 ? 's' : '' }}</span>
          </div>
          <div class="admin-row-actions">
            <button class="admin-icon-btn" title="Edit" @click="startEdit(cat)">
              <span class="material-icons-round">edit</span>
            </button>
            <button class="admin-del-btn" :disabled="deletingId === cat.id" title="Delete"
              @click="remove(cat.id, cat.productCount)">
              <span class="material-icons-round">{{ deletingId === cat.id ? 'hourglass_empty' : 'delete_outline' }}</span>
            </button>
          </div>
        </template>

        <!-- Edit mode — inline input -->
        <template v-else>
          <input
            class="admin-input admin-row-edit-input"
            v-model="editName"
            @keyup.enter="saveEdit(cat.id)"
            @keyup.escape="cancelEdit"
            ref="editInputRef"
          />
          <div class="admin-row-actions">
            <button class="admin-icon-btn" title="Save" :disabled="savingId === cat.id" @click="saveEdit(cat.id)">
              <span class="material-icons-round">{{ savingId === cat.id ? 'hourglass_empty' : 'check' }}</span>
            </button>
            <button class="admin-icon-btn" title="Cancel" @click="cancelEdit">
              <span class="material-icons-round">close</span>
            </button>
          </div>
        </template>

      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { categoryService } from '@/services/productService'

const store = useAppStore()
const searchQuery = ref('')
const filteredCategories = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return store.categories
  return store.categories.filter(c => c.name.toLowerCase().includes(q))
})
const showForm    = ref(false)
const newName     = ref('')
const saving      = ref(false)
const deletingId  = ref<string | null>(null)
const editId      = ref<string | null>(null)
const editName    = ref('')
const savingId    = ref<string | null>(null)
const editInputRef = ref<HTMLInputElement | null>(null)

function toggleAdd() {
  showForm.value = !showForm.value
  if (showForm.value) { newName.value = ''; cancelEdit() }
}

async function create() {
  if (!newName.value.trim()) { store.showToast('Enter a category name'); return }
  saving.value = true
  try {
    const cat = await categoryService.create(newName.value.trim())
    store.categories.push(cat)
    newName.value  = ''
    showForm.value = false
    store.showToast('Category added')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to add category')
  } finally {
    saving.value = false
  }
}

function startEdit(cat: { id: string; name: string }) {
  editId.value   = cat.id
  editName.value = cat.name
  nextTick(() => editInputRef.value?.focus())
}

function cancelEdit() {
  editId.value   = null
  editName.value = ''
}

async function saveEdit(id: string) {
  if (!editName.value.trim()) { store.showToast('Name cannot be empty'); return }
  savingId.value = id
  try {
    const updated = await categoryService.update(id, editName.value.trim())
    const idx = store.categories.findIndex(c => c.id === id)
    if (idx !== -1) store.categories[idx] = updated
    cancelEdit()
    store.showToast('Category renamed')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to rename')
  } finally {
    savingId.value = null
  }
}

async function remove(id: string, count: number) {
  if (count > 0) { store.showToast('Move products to another category first'); return }
  if (!await store.showConfirm(`Delete "${store.categories.find(c=>c.id===id)?.name}"? This cannot be undone.`, { title: 'Delete Category', danger: true })) return
  deletingId.value = id
  try {
    await categoryService.delete(id)
    const idx = store.categories.findIndex(c => c.id === id)
    if (idx !== -1) store.categories.splice(idx, 1)
    store.showToast('Category deleted')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to delete')
  } finally {
    deletingId.value = null
  }
}
</script>

<style scoped>
.admin-row-actions   { display: flex; gap: 6px; flex-shrink: 0; }
.admin-row-edit-input { flex: 1; min-width: 0; margin-right: 4px; }

/* ── Filter toolbar ─── */
.admin-toolbar {
  display: flex; flex-wrap: wrap; align-items: center; gap: 10px;
  padding: 10px 0 14px;
}
.admin-search {
  flex: 1 1 220px; min-width: 0;
  display: flex; align-items: center;
  background: var(--bg-card);
  border: 1.5px solid var(--divider);
  border-radius: 12px; padding: 0 10px;
  transition: border-color .15s;
}
.admin-search:focus-within { border-color: var(--accent); }
.admin-search > .material-icons-round { color: var(--text-tertiary); font-size: 18px; }
.admin-search-input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent;
  padding: 9px 8px; font-size: .9rem; font-family: inherit; color: var(--text-primary);
}
.admin-search-clear {
  background: transparent; border: none; cursor: pointer;
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--text-tertiary);
}
.admin-search-clear:hover { background: var(--ripple); color: var(--text-primary); }
.admin-search-clear .material-icons-round { font-size: 14px; }
.admin-toolbar-count {
  font-size: .78rem; color: var(--text-tertiary);
  margin-left: auto;
}
</style>
