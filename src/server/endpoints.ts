/**
 * API Endpoints Configuration
 * Central catalog of endpoints for future backend integration
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const ENDPOINTS = {
  products: {
    base: `${API_BASE_URL}/products`,
    detail: (idOrSlug: string) => `${API_BASE_URL}/products/${idOrSlug}`,
    deals: `${API_BASE_URL}/products/deals`,
    newArrivals: `${API_BASE_URL}/products/new-arrivals`,
    trending: `${API_BASE_URL}/products/trending`,
    related: (id: string) => `${API_BASE_URL}/products/${id}/related`,
    byCategory: (categorySlug: string) => `${API_BASE_URL}/products/category/${categorySlug}`,
  },
  categories: {
    base: `${API_BASE_URL}/categories`,
    detail: (slug: string) => `${API_BASE_URL}/categories/${slug}`,
  },
  search: {
    query: `${API_BASE_URL}/search`,
    suggestions: `${API_BASE_URL}/search/suggestions`,
  },
  cart: {
    get: `${API_BASE_URL}/cart`,
    addItem: `${API_BASE_URL}/cart/items`,
    updateItem: (id: string) => `${API_BASE_URL}/cart/items/${id}`,
    removeItem: (id: string) => `${API_BASE_URL}/cart/items/${id}`,
    clear: `${API_BASE_URL}/cart/clear`,
  },
  wishlist: {
    get: `${API_BASE_URL}/wishlist`,
    toggle: `${API_BASE_URL}/wishlist/toggle`,
  },
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    profile: `${API_BASE_URL}/auth/me`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  orders: {
    base: `${API_BASE_URL}/orders`,
    detail: (orderId: string) => `${API_BASE_URL}/orders/${orderId}`,
    track: (orderId: string) => `${API_BASE_URL}/orders/${orderId}/track`,
  },
} as const;
