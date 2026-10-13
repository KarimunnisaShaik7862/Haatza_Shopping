export const haatzaLiteStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`haatza_lite_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`haatza_lite_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(`haatza_lite_${key}`);
    } catch (e) {
      console.error('Failed removing from localStorage', e);
    }
  },
};
