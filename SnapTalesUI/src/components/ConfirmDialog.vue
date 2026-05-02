<template>
  <Teleport to="body">
    <Transition name="confirm">
      <div v-if="store.confirmOpen" class="modal-backdrop confirm-backdrop" @click.self="store.resolveConfirm(false)">
        <div class="confirm-card" role="dialog" :aria-label="store.confirmTitle">

          <!-- Icon -->
          <div class="confirm-icon-wrap" :class="store.confirmDanger ? 'danger' : 'info'">
            <span class="material-icons-round">
              {{ store.confirmDanger ? 'delete_outline' : 'help_outline' }}
            </span>
          </div>

          <!-- Text -->
          <div class="confirm-title">{{ store.confirmTitle }}</div>
          <div class="confirm-msg">{{ store.confirmMsg }}</div>

          <!-- Actions -->
          <div class="confirm-actions">
            <button class="confirm-cancel" @click="store.resolveConfirm(false)">Cancel</button>
            <button
              class="confirm-ok"
              :class="store.confirmDanger ? 'confirm-ok--danger' : 'confirm-ok--primary'"
              @click="store.resolveConfirm(true)"
            >
              {{ store.confirmDanger ? 'Delete' : 'Confirm' }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
const store = useAppStore()
</script>

<style scoped>
.confirm-backdrop { z-index: 9500; }

.confirm-card {
  background: var(--bg-card);
  border-radius: 22px;
  padding: 28px 24px 22px;
  width: min(360px, 92vw);
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,.22);
}

.confirm-icon-wrap {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.confirm-icon-wrap.danger {
  background: #fee2e2;
  color: #dc2626;
}
.confirm-icon-wrap.info {
  background: var(--accent-container);
  color: var(--accent);
}
.confirm-icon-wrap .material-icons-round { font-size: 28px; }

.confirm-title {
  font-size: 1.05rem; font-weight: 700;
  color: var(--text-primary); margin-bottom: 8px;
}
.confirm-msg {
  font-size: .88rem; color: var(--text-secondary);
  line-height: 1.5; margin-bottom: 22px;
}

.confirm-actions {
  display: flex; gap: 10px;
}
.confirm-cancel {
  flex: 1; padding: 11px;
  border-radius: 14px;
  border: 1.5px solid var(--divider);
  background: transparent; color: var(--text-secondary);
  font-size: .9rem; font-weight: 600; cursor: pointer;
  transition: background .15s;
}
.confirm-cancel:hover { background: var(--ripple); }

.confirm-ok {
  flex: 1; padding: 11px;
  border-radius: 14px; border: none;
  font-size: .9rem; font-weight: 700; cursor: pointer;
  transition: opacity .15s;
}
.confirm-ok:hover { opacity: .88; }
.confirm-ok--danger  { background: #dc2626; color: #fff; }
.confirm-ok--primary { background: var(--accent); color: #fff; }

/* Transition */
.confirm-enter-active { transition: opacity .2s, transform .2s; }
.confirm-leave-active { transition: opacity .16s, transform .16s; }
.confirm-enter-from  { opacity: 0; transform: scale(.94); }
.confirm-leave-to    { opacity: 0; transform: scale(.94); }
</style>
