<template>
  <main class="page active"><div class="page-pad">
    <div class="admin-header">
      <h2 class="admin-title">Manage Sizes</h2>
      <button class="btn-gold" @click="toggleAdd">
        <span class="material-icons-round" style="font-size:18px">{{ showForm ? 'close' : 'add' }}</span>
        {{ showForm ? 'Cancel' : 'Add Size' }}
      </button>
    </div>

    <!-- Add Form -->
    <div v-if="showForm" class="admin-form-card">
      <div class="admin-form-title">New Size</div>
      <div class="admin-field">
        <label class="admin-label">Label</label>
        <input class="admin-input" v-model="newLabel" placeholder="e.g. 18×24" @keyup.enter="create" />
      </div>
      <div class="admin-form-actions">
        <button class="admin-cancel-btn" @click="toggleAdd">Cancel</button>
        <button class="btn-gold" :disabled="saving" @click="create">
          <span v-if="saving" class="material-icons-round rotating" style="font-size:18px">sync</span>
          <span v-else class="material-icons-round" style="font-size:18px">check</span>
          Save Size
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="admin-toolbar">
      <div class="admin-search">
        <span class="material-icons-round">search</span>
        <input type="text" v-model="searchQuery" placeholder="Search sizes..." class="admin-search-input" />
        <button v-if="searchQuery" class="admin-search-clear" @click="searchQuery = ''" title="Clear">
          <span class="material-icons-round">close</span>
        </button>
      </div>
      <span class="admin-toolbar-count">{{ filteredSizes.length }} / {{ sizes.length }}</span>
    </div>

    <!-- List -->
    <div v-if="sizes.length === 0" class="admin-empty">No sizes yet.</div>
    <div v-else-if="filteredSizes.length === 0" class="admin-empty">No sizes match your search.</div>
    <div class="admin-list">
      <div v-for="sz in filteredSizes" :key="sz.id" class="admin-row">

        <!-- View mode -->
        <template v-if="editId !== sz.id">
          <div class="admin-row-info">
            <span class="admin-row-name">{{ sz.label }}</span>
          </div>
          <div class="admin-row-actions">
            <button class="admin-icon-btn" title="Edit" @click="startEdit(sz)">
              <span class="material-icons-round">edit</span>
            </button>
            <button class="admin-del-btn" :disabled="deletingId === sz.id" title="Delete" @click="remove(sz.id)">
              <span class="material-icons-round">{{ deletingId === sz.id ? 'hourglass_empty' : 'delete_outline' }}</span>
            </button>
          </div>
        </template>

        <!-- Edit mode — inline input -->
        <template v-else>
          <input
            class="admin-input admin-row-edit-input"
            v-model="editLabel"
            @keyup.enter="saveEdit(sz.id)"
            @keyup.escape="cancelEdit"
            ref="editInputRef"
          />
          <div class="admin-row-actions">
            <button class="admin-icon-btn" title="Save" :disabled="savingId === sz.id" @click="saveEdit(sz.id)">
              <span class="material-icons-round">{{ savingId === sz.id ? 'hourglass_empty' : 'check' }}</span>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { sizeService, type Size } from '@/services/productService'

const store = useAppStore()
const sizes       = ref<Size[]>([])
const searchQuery = ref('')
const filteredSizes = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return sizes.value
  return sizes.value.filter(s => s.label.toLowerCase().includes(q))
})
const showForm    = ref(false)
const newLabel    = ref('')
const saving      = ref(false)
const deletingId  = ref<string | null>(null)
const editId      = ref<string | null>(null)
const editLabel   = ref('')
const savingId    = ref<string | null>(null)
const editInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  try { sizes.value = await sizeService.getAll() } catch { /**/ }
})

function toggleAdd() {
  showForm.value = !showForm.value
  if (showForm.value) { newLabel.value = ''; cancelEdit() }
}

async function create() {
  if (!newLabel.value.trim()) { store.showToast('Enter a size label'); return }
  saving.value = true
  try {
    const sz = await sizeService.create(newLabel.value.trim())
    sizes.value.push(sz)
    newLabel.value = ''
    showForm.value = false
    store.showToast('Size added')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to add size')
  } finally {
    saving.value = false
  }
}

function startEdit(sz: Size) {
  editId.value    = sz.id
  editLabel.value = sz.label
  nextTick(() => editInputRef.value?.focus())
}

function cancelEdit() {
  editId.value    = null
  editLabel.value = ''
}

async function saveEdit(id: string) {
  if (!editLabel.value.trim()) { store.showToast('Label cannot be empty'); return }
  savingId.value = id
  try {
    const updated = await sizeService.update(id, editLabel.value.trim())
    const idx = sizes.value.findIndex(s => s.id === id)
    if (idx !== -1) sizes.value[idx] = updated
    cancelEdit()
    store.showToast('Size updated')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to update')
  } finally {
    savingId.value = null
  }
}

async function remove(id: string) {
  if (!await store.showConfirm(`Delete "${sizes.value.find(s=>s.id===id)?.label}"? This cannot be undone.`, { title: 'Delete Size', danger: true })) return
  deletingId.value = id
  try {
    await sizeService.delete(id)
    sizes.value = sizes.value.filter(s => s.id !== id)
    store.showToast('Size deleted')
  } catch (e: any) {
    store.showToast(e.message || 'Failed to delete')
  } finally {
    deletingId.value = null
  }
}
</script>

<style scoped>
.admin-row-actions    { display: flex; gap: 6px; flex-shrink: 0; }
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
