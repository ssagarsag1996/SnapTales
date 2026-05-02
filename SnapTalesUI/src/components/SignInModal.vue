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
            <div class="modal-sub">Sign in to continue</div>
          </div>

          <div class="modal-body">

            <!-- Google -->
            <button class="google-btn" :disabled="googleLoading" @click="handleGoogle">
              <span v-if="googleLoading" class="material-icons-round rotating" style="font-size:20px;color:#4285F4">sync</span>
              <svg v-else class="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {{ googleLoading ? 'Redirecting…' : 'Continue with Google' }}
            </button>

            <div class="divider"><span>or</span></div>

            <!-- OTP Step 1 — phone input -->
            <template v-if="otpStep === 'phone'">
              <div class="field-group">
                <label class="field-label">Phone Number</label>
                <div class="field-wrap">
                  <span class="material-icons-round field-icon">phone_android</span>
                  <input
                    class="field-input"
                    v-model="phoneInput"
                    placeholder="+91 9876543210"
                    type="tel"
                    autofocus
                    @keyup.enter="sendOTP"
                  >
                </div>
                <p class="field-hint">Enter number with country code, e.g. +91…</p>
              </div>
              <button class="md-action-btn" :disabled="otpLoading" @click="sendOTP">
                <span v-if="otpLoading" class="material-icons-round rotating">sync</span>
                <span v-else class="material-icons-round">sms</span>
                <span>{{ otpLoading ? 'Sending OTP…' : 'Send OTP' }}</span>
              </button>
            </template>

            <!-- OTP Step 2 — enter code -->
            <template v-else>
              <p class="otp-sent-msg">
                <span class="material-icons-round" style="font-size:16px;vertical-align:middle">check_circle</span>
                OTP sent to <strong>{{ phoneInput }}</strong>
                <button class="link-btn" @click="otpStep = 'phone'">Change</button>
              </p>
              <div class="field-group">
                <label class="field-label">Enter OTP</label>
                <div class="field-wrap">
                  <span class="material-icons-round field-icon">pin</span>
                  <input
                    class="field-input otp-input"
                    v-model="otpCode"
                    placeholder="6-digit code"
                    type="number"
                    maxlength="6"
                    autofocus
                    @keyup.enter="verifyOTP"
                  >
                </div>
              </div>
              <button class="md-action-btn" :disabled="otpLoading" @click="verifyOTP">
                <span v-if="otpLoading" class="material-icons-round rotating">sync</span>
                <span v-else class="material-icons-round">verified</span>
                <span>{{ otpLoading ? 'Verifying…' : 'Verify OTP' }}</span>
              </button>
            </template>

            <!-- Invisible reCAPTCHA anchor -->
            <div id="recaptcha-container"></div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { userService } from '@/services/userService'
import { authService, type ConfirmationResult } from '@/services/authService'

const store = useAppStore()

const googleLoading = ref(false)
const otpLoading    = ref(false)

const phoneInput   = ref('')
const otpCode      = ref('')
const otpStep      = ref<'phone' | 'otp'>('phone')
const confirmation = ref<ConfirmationResult | null>(null)

watch(() => store.signInOpen, (open) => {
  if (open) {
    resetAll()
    nextTick(() => { authService.setupRecaptcha('recaptcha-container') })
  } else {
    authService.clearRecaptcha()
  }
})

function resetAll() {
  phoneInput.value   = ''
  otpCode.value      = ''
  otpStep.value      = 'phone'
  confirmation.value = null
}

async function finishAuth(payload: { uid?: string; name?: string | null; email?: string | null; phone?: string | null }) {
  const clean: { name?: string; email?: string; phone?: string; firebaseUid?: string } = {}
  if (payload.uid)   clean.firebaseUid = payload.uid
  if (payload.name)  clean.name        = payload.name
  if (payload.email) clean.email       = payload.email
  if (payload.phone) clean.phone       = payload.phone

  const { user, token } = await userService.findOrCreate(clean)
  store.setUser(user, token)
  store.closeSignIn()
  store.showToast(`Welcome${user.name ? ', ' + user.name : ''}!`)
}

async function handleGoogle() {
  googleLoading.value = true
  try {
    const creds = await authService.signInWithGoogle()
    await finishAuth(creds)
  } catch (e: unknown) {
    const code = (e as { code?: string }).code ?? ''
    const msg  = (e as { message?: string }).message ?? ''
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      googleLoading.value = false
      return
    }
    if (code === 'auth/network-request-failed') {
      store.showToast('No internet connection. Please check your network.')
    } else if (msg) {
      store.showToast('Google sign-in failed: ' + msg)
    } else {
      store.showToast('Google sign-in failed. Please try again.')
    }
    googleLoading.value = false
  }
}

async function sendOTP() {
  const phone = phoneInput.value.trim()
  if (!phone) { store.showToast('Enter your phone number with country code (+91…)'); return }
  otpLoading.value = true
  try {
    confirmation.value = await authService.sendOTP(phone)
    otpStep.value = 'otp'
  } catch (e: unknown) {
    const code = (e as { code?: string }).code ?? ''
    if (code === 'auth/invalid-phone-number') {
      store.showToast('Invalid phone number. Use format: +91 9876543210')
    } else if (code === 'auth/too-many-requests') {
      store.showToast('Too many attempts. Please try again later.')
    } else {
      store.showToast('Failed to send OTP. Check the number and try again.')
    }
  } finally {
    otpLoading.value = false
  }
}

async function verifyOTP() {
  if (!otpCode.value || !confirmation.value) return
  otpLoading.value = true
  try {
    const creds = await authService.verifyOTP(confirmation.value, otpCode.value.trim())
    await finishAuth(creds)
  } catch (e: unknown) {
    const code = (e as { code?: string }).code ?? ''
    if (code === 'auth/invalid-verification-code') {
      store.showToast('Wrong OTP. Please check and try again.')
    } else if (code === 'auth/code-expired') {
      store.showToast('OTP expired. Please request a new one.')
      otpStep.value = 'phone'
    } else {
      store.showToast('Verification failed. Please try again.')
    }
  } finally {
    otpLoading.value = false
  }
}
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
  position: relative;
  padding-bottom: 28px;
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
.modal-body { padding: 20px 28px 0; }

/* ── Google button ─────────────────────────────── */
.google-btn {
  display: flex; align-items: center; justify-content: center; gap: 10px;
  width: 100%; height: 48px; border-radius: 24px;
  background: var(--bg-primary); color: var(--text-primary);
  border: 1.5px solid var(--divider);
  font-size: .92rem; font-weight: 600; cursor: pointer;
  transition: background var(--t-fast) var(--ease), border-color var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease);
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
}
.google-btn:hover { border-color: var(--accent); box-shadow: 0 2px 8px rgba(0,0,0,.12); }
.google-btn:disabled { opacity: .6; cursor: not-allowed; }
.google-icon { width: 20px; height: 20px; flex-shrink: 0; }

/* ── Divider ───────────────────────────────────── */
.divider {
  display: flex; align-items: center; gap: 10px;
  margin: 16px 0; color: var(--text-tertiary); font-size: .78rem;
}
.divider::before, .divider::after {
  content: ''; flex: 1; height: 1px; background: var(--divider);
}

/* ── Fields ────────────────────────────────────── */
.field-group { margin-bottom: 12px; }
.field-label {
  display: flex; align-items: center; gap: 6px;
  font-size: .73rem; font-weight: 600; letter-spacing: .5px; text-transform: uppercase;
  color: var(--text-tertiary); margin-bottom: 7px;
}
.field-hint { font-size: .72rem; color: var(--text-tertiary); margin: 4px 0 0 2px; }
.field-wrap { position: relative; }
.field-icon {
  position: absolute; left: 13px; top: 50%; transform: translateY(-50%);
  font-size: 18px; color: var(--text-tertiary); pointer-events: none;
  transition: color var(--t-fast) var(--ease);
}
.field-wrap:focus-within .field-icon { color: var(--accent); }
.field-input {
  display: block; width: 100%; padding: 12px 14px 12px 44px;
  background: var(--bg-tertiary); border: 1.5px solid transparent;
  border-radius: 14px; font-size: .95rem; color: var(--text-primary);
  transition: border-color var(--t-fast) var(--ease), background var(--t-fast) var(--ease);
  outline: none; box-sizing: border-box;
}
.field-input::placeholder { color: var(--text-tertiary); }
.field-input:focus { border-color: var(--accent); background: var(--bg-card); }
.otp-input { letter-spacing: .25em; font-size: 1.1rem; font-weight: 700; }

/* ── OTP sent confirmation ─────────────────────── */
.otp-sent-msg {
  font-size: .83rem; color: var(--text-secondary);
  margin: 0 0 14px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
}
.otp-sent-msg .material-icons-round { color: #34A853; }
.link-btn {
  background: none; border: none; color: var(--accent);
  font-size: .83rem; font-weight: 600; cursor: pointer; padding: 0; text-decoration: underline;
}

/* ── Action button ─────────────────────────────── */
.md-action-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; height: 52px; border-radius: 26px;
  background: var(--accent); color: var(--fab-text);
  font-family: inherit; font-size: .97rem; font-weight: 700; letter-spacing: .3px;
  border: none; cursor: pointer; margin-top: 18px;
  box-shadow: 0 3px 10px rgba(0,0,0,.22), 0 1px 3px rgba(0,0,0,.1);
  transition: filter var(--t-fast) var(--ease), box-shadow var(--t-fast) var(--ease), transform var(--t-fast) var(--ease);
}
.md-action-btn .material-icons-round { font-size: 20px; }
.md-action-btn:not(:disabled):hover {
  filter: brightness(1.07);
  box-shadow: 0 6px 20px rgba(0,0,0,.24), 0 2px 6px rgba(0,0,0,.1);
  transform: translateY(-1px);
}
.md-action-btn:not(:disabled):active { filter: brightness(.96); transform: translateY(0); }
.md-action-btn:disabled { opacity: .6; cursor: not-allowed; }

/* ── Spinner ───────────────────────────────────── */
@keyframes modal-spin { to { transform: rotate(360deg); } }
.rotating { animation: modal-spin .75s linear infinite; }

/* ── Modal transition ──────────────────────────── */
.modal-enter-active { transition: opacity .22s var(--ease); }
.modal-leave-active { transition: opacity .18s var(--ease); }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-card { transition: transform .3s var(--spring); }
.modal-leave-active .modal-card  { transition: transform .2s  var(--ease); }
.modal-enter-from   .modal-card  { transform: translateY(48px); }
.modal-leave-to     .modal-card  { transform: translateY(24px); }
</style>
