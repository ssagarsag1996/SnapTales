import { auth } from './firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  type ConfirmationResult,
} from 'firebase/auth'

export type { ConfirmationResult }

export type FirebaseCreds = { uid: string; name: string | null; email: string | null; phone: string | null }

function extractCreds(user: { uid: string; displayName: string | null; email: string | null; phoneNumber: string | null }): FirebaseCreds {
  return { uid: user.uid, name: user.displayName, email: user.email, phone: user.phoneNumber }
}

let recaptchaVerifier: RecaptchaVerifier | null = null

export const authService = {
  async signInWithGoogle(): Promise<FirebaseCreds> {
    const provider = new GoogleAuthProvider()
    try {
      // Try popup first — faster UX
      const result = await signInWithPopup(auth, provider)
      return extractCreds(result.user)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? ''
      // If popup is blocked, fall back to redirect
      if (code === 'auth/popup-blocked' || code === 'auth/popup-cancelled-by-user') {
        await signInWithRedirect(auth, provider)
        // signInWithRedirect never resolves — page redirects away
        return new Promise(() => {}) // keeps the promise pending until redirect
      }
      throw err
    }
  },

  // Call this once on app load to handle the Google redirect result
  async getGoogleRedirectResult(): Promise<FirebaseCreds | null> {
    const result = await getRedirectResult(auth)
    if (!result) return null
    return extractCreds(result.user)
  },

  setupRecaptcha(containerId: string): void {
    if (recaptchaVerifier) {
      try { recaptchaVerifier.clear() } catch { /* ignore */ }
      recaptchaVerifier = null
    }
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, { size: 'invisible' })
  },

  clearRecaptcha(): void {
    if (recaptchaVerifier) {
      try { recaptchaVerifier.clear() } catch { /* ignore */ }
      recaptchaVerifier = null
    }
  },

  async sendOTP(phone: string): Promise<ConfirmationResult> {
    if (!recaptchaVerifier) {
      // Re-init if verifier was lost (e.g. after a redirect)
      recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' })
    }
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier)
  },

  async verifyOTP(confirmation: ConfirmationResult, code: string): Promise<FirebaseCreds> {
    const result = await confirmation.confirm(code)
    return extractCreds(result.user)
  },

  signOut(): Promise<void> {
    return firebaseSignOut(auth)
  },
}
