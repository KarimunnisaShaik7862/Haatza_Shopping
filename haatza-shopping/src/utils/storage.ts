/**
 * Safe Browser Storage Helpers (with fallback for SSR / storage full / disabled storage)
 */

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const item = window.localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed to persist item to localStorage for key: ${key}`, e);
    }
  },

  remove(key: string): void {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Failed to remove item from localStorage for key: ${key}`, e);
    }
  },
};
