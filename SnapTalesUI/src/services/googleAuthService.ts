// Google Identity Services (GIS) wrapper — no Firebase dependency.
// The GIS script is loaded via <script async defer> in index.html.
// Call initGoogle() once on app mount, then renderGoogleButton() each time
// the sign-in modal opens.

type CredentialCallback = (idToken: string) => void

/** Registered handler called when Google returns a credential. */
let _handler: CredentialCallback | null = null

/** Minimal GIS interface to avoid @types/google.accounts dependency. */
interface GoogleAccountsId {
  initialize(config: {
    client_id: string
    callback: (response: { credential: string }) => void
    auto_select?: boolean
    cancel_on_tap_outside?: boolean
  }): void
  renderButton(
    element: HTMLElement,
    config: {
      type?: string
      theme?: string
      size?: string
      text?: string
      shape?: string
      logo_alignment?: string
      width?: number
    }
  ): void
}

function gis(): GoogleAccountsId | null {
  return (window as unknown as { google?: { accounts?: { id?: GoogleAccountsId } } })
    .google?.accounts?.id ?? null
}

function onCredentialResponse(response: { credential: string }): void {
  _handler?.(response.credential)
}

/**
 * Initialise GIS. Must be called after the GIS script is loaded.
 * Safe to call multiple times — GIS de-dupes internally.
 */
export function initGoogle(): void {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
  if (!clientId) {
    console.warn('[googleAuth] VITE_GOOGLE_CLIENT_ID is not set.')
    return
  }
  const g = gis()
  if (!g) {
    console.warn('[googleAuth] GIS script not ready. Ensure the <script> tag is in index.html.')
    return
  }
  g.initialize({
    client_id: clientId,
    callback: onCredentialResponse,
    auto_select: false,
    cancel_on_tap_outside: true,
  })
}

/**
 * Render the official Google Sign-In button into `element`.
 * The button fills the container width (max 400 px per GIS constraints).
 */
export function renderGoogleButton(element: HTMLElement): void {
  const g = gis()
  if (!g) return
  g.renderButton(element, {
    type: 'standard',
    theme: 'outline',
    size: 'large',
    text: 'continue_with',
    shape: 'pill',
    logo_alignment: 'center',
  })
}

/**
 * Register the function that handles a successful Google credential.
 * Called once in SignInModal onMounted.
 */
export function setCredentialHandler(handler: CredentialCallback): void {
  _handler = handler
}
