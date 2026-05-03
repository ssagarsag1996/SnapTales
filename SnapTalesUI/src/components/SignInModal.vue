<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="store.signInOpen" class="modal-backdrop" @click.self="store.closeSignIn()">
        <div class="modal-card">

          <!-- Drag handle (mobile) -->
          <div class="modal-handle"></div>

          <!-- Close button -->
          <button class="modal-close-btn" @click="store.closeSignIn()" aria-label="Close">
            <span class="material-icons-round">close</span>
          </button>

          <!-- Header -->
          <div class="modal-head">
            <div class="modal-logo">
              <span class="material-icons-round">crop_original</span>
            </div>
            <div class="modal-title">Welcome to SnapTales</div>
            <div class="modal-sub">Sign in to save wishlists, track orders, and more.</div>
          </div>

          <div class="modal-body">

            <!-- Loading overlay while auth is in progress -->
            <div v-if="loading" class="auth-loading">
              <span class="material-icons-round rotating">sync</span>
              <span>Signing you in…</span>
            </div>

            <!-- GIS renders the official Google button into this div -->
            <div v-show="!loading" ref="googleBtnEl" class="gsi-wrap"></div>

            <!-- Error message -->
            <p v-if="error" class="auth-error">
              <span class="material-icons-round" style="font-size:16px;vertical-align:middle">error_outline</span>
              {{ error }}
            </p>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { userService } from '@/services/userService'
import { initGoogle, renderGoogleButton, setCredentialHandler } from '@/services/googleAuthService'

const store = useAppStore()

const googleBtnEl = ref<HTMLElement | null>(null)
const loading      = ref(false)
const error        = ref('')

// Register handler once — fires whenever GIS returns a credential
onMounted(() => {
  setCredentialHandler(async (idToken: string) => {
    loading.value = true
    error.value   = ''
    try {
      const auth = await userService.signInWithGoogle(idToken)
      store.setUser(auth.user, auth.token)
      store.closeSignIn()
      store.showToast(`Welcome${auth.user.name ? ', ' + auth.user.name : ''}!`)
    } catch (e: unknown) {
      error.value = (e instanceof Error ? e.message : null) || 'Sign-in failed. Please try again.'
    } finally {
      loading.value = false
    }
  })
})

// Render (or re-render) the GIS button each time the modal opens
watch(() => store.signInOpen, (isOpen) => {
  if (!isOpen) { error.value = ''; return }
  nextTick(() => {
    if (googleBtnEl.value) {
      // Clear previous render before re-rendering
      googleBtnEl.value.innerHTML = ''
      initGoogle()
      renderGoogleButton(googleBtnEl.value)
    }
  })
})
</script>

<style scoped>
/* ── Backdrop ──────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
@media (min-width: 520px) {
  .modal-backdrop { align-items: center; padding: 24px; }
}

/* ── Card ──────────────────────────────────────── */
.modal-card {
  background: var(--bg-card);
  border-radius: 28px 28px 0 0;
  width: 100%;
  max-width: 440px;
  max-height: calc(100dvh - 60px); /* never taller than viewport - 60px for safe backdrop tap area */
  overflow-y: auto;
  position: relative;
  /* Keep 28 px of breathing room AND clear the system gesture bar on all devices */
  padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px));
}
@media (min-width: 520px) {
  .modal-card { border-radius: 28px; }
}

/* ── Drag handle ───────────────────────────────── */
.modal-handle {
  width: 40px; height: 4px;
  border-radius: 2px;
  background: var(--divider);
  margin: 14px auto 0;
}
@media (min-width: 520px) { .modal-handle { display: none; } }

/* ── Close button ──────────────────────────────── */
.modal-close-btn {
  position: absolute; top: 14px; right: 14px;
  width: 36px; height: 36px; border-radius: 50%;
  background: transparent; color: var(--text-tertiary);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: none;
  transition: background var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
}
.modal-close-btn:hover { background: var(--ripple); color: var(--text-primary); }
.modal-close-btn .material-icons-round { font-size: 20px; }

/* ── Header ────────────────────────────────────── */
.modal-head { padding: 20px 28px 0; }
.modal-logo {
  width: 54px; height: 54px;
  background: var(--accent-container);
  border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent); font-size: 28px; margin-bottom: 14px;
}
.modal-title { font-family: var(--font-display); font-size: 1.55rem; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
.modal-sub { font-size: .83rem; color: var(--text-secondary); margin-top: 4px; }

/* ── Body ──────────────────────────────────────── */
.modal-body { padding: 24px 28px 0; }

/* ── GIS button container ──────────────────────── */
.gsi-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px; /* 4 px buffer around the 40 px GIS 'large' iframe — border never clips */
}

/* ── Loading state ─────────────────────────────── */
.auth-loading {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 44px;
  color: var(--text-secondary); font-size: .9rem;
}

/* ── Error message ─────────────────────────────── */
.auth-error {
  display: flex; align-items: center; gap: 6px;
  margin-top: 14px; padding: 10px 14px;
  background: rgba(234, 67, 53, .08);
  border-radius: 12px;
  color: #c62828; font-size: .83rem;
}

/* ── Spinner ───────────────────────────────────── */
@keyframes modal-spin { to { transform: rotate(360deg); } }
.rotating { animation: modal-spin .75s linear infinite; font-size: 22px; }

/* ── Modal transition ──────────────────────────── */
.modal-enter-active { transition: opacity .22s var(--ease); }
.modal-leave-active { transition: opacity .18s var(--ease); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-card { transition: transform .3s var(--spring); }
.modal-leave-active .modal-card  { transition: transform .2s  var(--ease); }
.modal-enter-from   .modal-card  { transform: translateY(48px); }
.modal-leave-to     .modal-card  { transform: translateY(24px); }
</style>
