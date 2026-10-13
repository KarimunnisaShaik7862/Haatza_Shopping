export const haatzaNestStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`haatza_nest_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`haatza_nest_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed saving to localStorage', e);
    }
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(`haatza_nest_${key}`);
    } catch (e) {
      console.error('Failed removing from localStorage', e);
    }
  },
};
