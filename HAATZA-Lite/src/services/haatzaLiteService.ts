import { 
  HaatzaLiteCategory, 
  HaatzaLiteHeroSlide, 
  HaatzaLiteProduct, 
  HaatzaLitePromoBanner 
} from '../types/haatzaLite.types';
import { 
  haatzaLiteCategories, 
  haatzaLiteHeroSlides, 
  haatzaLiteProducts, 
  haatzaLitePromoBanners 
} from '../data/liteData';

export const haatzaLiteService = {
  async getHeroSlides(): Promise<HaatzaLiteHeroSlide[]> {
    return [...haatzaLiteHeroSlides];
  },

  async getPromoBanners(): Promise<HaatzaLitePromoBanner[]> {
    return [...haatzaLitePromoBanners];
  },

  async getCategories(): Promise<HaatzaLiteCategory[]> {
    return [...haatzaLiteCategories];
  },

  async getCategoryBySlug(slug: string): Promise<HaatzaLiteCategory | null> {
    const found = haatzaLiteCategories.find((c) => c.slug === slug);
    return found ? { ...found } : null;
  },

  async getAllProducts(): Promise<HaatzaLiteProduct[]> {
    return [...haatzaLiteProducts];
  },

  async getDeals(limit: number = 6): Promise<HaatzaLiteProduct[]> {
    return haatzaLiteProducts.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 20).slice(0, limit);
  },

  async getProductsByCategory(categorySlug: string, limit: number = 6): Promise<HaatzaLiteProduct[]> {
    const rawTerm = categorySlug.toLowerCase();
    const term = rawTerm.replace(/-/g, ' ');
    const cat = haatzaLiteCategories.find((c) => c.slug === rawTerm || c.id === rawTerm || c.slug.includes(rawTerm));
    const catId = cat ? cat.id.toLowerCase() : '';

    const list = haatzaLiteProducts.filter(
      (p) =>
        (catId && p.categoryId.toLowerCase() === catId) ||
        p.categoryId.toLowerCase().includes(rawTerm) ||
        p.categoryName.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(rawTerm) ||
        p.tags.some((t) => t.toLowerCase().includes(term) || t.toLowerCase().includes(rawTerm))
    );
    return list.slice(0, limit);
  },

  async getProductBySlug(slug: string): Promise<HaatzaLiteProduct | null> {
    const found = haatzaLiteProducts.find((p) => p.slug === slug || p.id === slug);
    return found ? { ...found } : null;
  },

  async searchProducts(query: string): Promise<HaatzaLiteProduct[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return haatzaLiteProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  },
};
