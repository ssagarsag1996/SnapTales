const API_BASE = 'http://localhost:5184/api'

export interface Address {
  label?: string | null
  fullName: string
  phone: string
  line1: string
  city: string
  state: string
  pinCode: string
}

export interface User {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  role: number
  avatarUrl: string | null
  firebaseUid: string | null
  addresses: Address[]
  createdAt: string
  updatedAt: string
}

export interface AuthResult {
  user: User
  token: string
}

// Module-level token — lives only for the current page session (cleared on refresh)
let _token: string | null = null
let _onUnauthorized: (() => void) | null = null

export function setAuthToken(token: string | null): void {
  _token = token
}

export function onUnauthorized(handler: () => void): void {
  _onUnauthorized = handler
}

export function triggerUnauthorized(): void {
  _token = null
  _onUnauthorized?.()
}

export function authHeaders(json = true): HeadersInit {
  const h: Record<string, string> = {}
  if (json) h['Content-Type'] = 'application/json'
  if (_token) h['Authorization'] = `Bearer ${_token}`
  return h
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    _token = null
    _onUnauthorized?.()
    throw Object.assign(new Error('Unauthorized'), { status: 401 })
  }
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<T>
}

export const userService = {
  async findOrCreate(
    payload: { name?: string; email?: string; phone?: string; firebaseUid?: string }
  ): Promise<AuthResult> {
    const res = await fetch(`${API_BASE}/users/find-or-create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const auth = await handleResponse<{ user: User; token: string }>(res)
    // Normalise casing from C# PascalCase response
    return {
      user:  (auth as any).user  ?? (auth as any).User,
      token: (auth as any).token ?? (auth as any).Token,
    }
  },

  async getById(id: string): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`, { headers: authHeaders() })
    return handleResponse<User>(res)
  },

  async update(id: string, payload: { name?: string; avatarUrl?: string }): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    })
    return handleResponse<User>(res)
  },

  async addAddress(id: string, address: Address): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}/addresses`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(address),
    })
    return handleResponse<User>(res)
  },

  async removeAddress(id: string, index: number): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}/addresses/${index}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    return handleResponse<User>(res)
  },
}
