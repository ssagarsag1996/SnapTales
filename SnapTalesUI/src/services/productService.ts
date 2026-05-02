import { authHeaders, triggerUnauthorized } from './userService'

const API_BASE = 'http://localhost:5184/api'
const IMG_BASE = 'http://localhost:5184'

export interface Category {
  id: string
  name: string
  productCount: number
}

export interface Size {
  id: string
  label: string
}

export interface Product {
  id: string
  categoryId: string
  categoryName: string
  name: string
  price: number
  originalPrice: number | null
  isSale: boolean
  description: string
  stock: number
  sku: string
  rating: number
  reviewCount: number
  sizes: Size[]
  images: string[]
  overlayImage: string | null
  aperturePercent: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductPayload {
  categoryId: string
  name: string
  price: number
  originalPrice?: number | null
  isSale: boolean
  description: string
  stock: number
  sku: string
  rating: number
  reviewCount: number
  sizeIds: string[]
  aperturePercent?: number
}

export function getProductImage(images: string[]): string {
  return images?.length ? `${IMG_BASE}/${images[0]}` : '/no-image.svg'
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json() as Promise<T>
}

async function adminJson<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: authHeaders(),
    body: body != null ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    if (res.status === 401) {
      triggerUnauthorized()
      throw new Error('Session expired — please sign in again.')
    }
    if (res.status === 403) {
      throw new Error('Permission denied. Please sign out and sign back in to refresh your Admin session.')
    }
    const text = await res.text()
    let msg = text
    try { const j = JSON.parse(text); msg = j.error ?? j.title ?? text } catch { /**/ }
    throw new Error(msg || `Operation failed (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// ── Public ────────────────────────────────────────────────────────────────────

export const categoryService = {
  getAll: () => get<Category[]>('/categories'),

  create: (name: string)     => adminJson<Category>('POST',   '/categories',     { name }),
  update: (id: string, name: string) => adminJson<Category>('PUT', `/categories/${id}`, { name }),
  delete: (id: string)       => adminJson<void>('DELETE',   `/categories/${id}`),
}

export const sizeService = {
  getAll: () => get<Size[]>('/sizes'),

  create: (label: string)    => adminJson<Size>('POST',   '/sizes',     { label }),
  update: (id: string, label: string) => adminJson<Size>('PUT', `/sizes/${id}`, { label }),
  delete: (id: string)       => adminJson<void>('DELETE', `/sizes/${id}`),
}

export const productService = {
  getAll:        ()                        => get<Product[]>('/products'),
  getById:       (id: string)              => get<Product>(`/products/${id}`),
  getByCategory: (catId: string)           => get<Product[]>(`/products/category/${catId}`),

  create: (payload: CreateProductPayload)  =>
    adminJson<Product>('POST', '/products', payload),

  update: (id: string, payload: Partial<CreateProductPayload>) =>
    adminJson<Product>('PUT', `/products/${id}`, payload),

  delete: (id: string)                     =>
    adminJson<void>('DELETE', `/products/${id}`),

  async uploadImage(productId: string, file: File): Promise<Product> {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${API_BASE}/products/${productId}/images`, {
      method:  'POST',
      headers: authHeaders(false),   // no Content-Type — browser sets multipart boundary
      body:    form,
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json() as Promise<Product>
  },

  removeImage: (productId: string, index: number) =>
    adminJson<Product>('DELETE', `/products/${productId}/images/${index}`),

  async uploadOverlay(productId: string, file: File): Promise<Product> {
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(`${API_BASE}/products/${productId}/overlay`, {
      method:  'POST',
      headers: authHeaders(false),
      body:    form,
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json() as Promise<Product>
  },

  removeOverlay: (productId: string) =>
    adminJson<Product>('DELETE', `/products/${productId}/overlay`),
}
