import { Product } from '../types';
import { productService } from '../services/productService';

/**
 * Search API Module
 */
export const searchApi = {
  async search(query: string): Promise<Product[]> {
    return productService.searchProducts(query);
  },

  async getSuggestions(query: string): Promise<string[]> {
    if (!query) return [];
    const products = await productService.searchProducts(query);
    return products.slice(0, 5).map((p) => p.name);
  },
};

export default searchApi;
