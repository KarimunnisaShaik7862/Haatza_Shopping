import { Category, DestinationType } from '../types';
import { categoryService } from '../services/categoryService';

/**
 * Categories API Module
 */
export const categoriesApi = {
  async getCategories(destination?: DestinationType): Promise<Category[]> {
    return categoryService.getCategories(destination);
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categoryService.getCategoryBySlug(slug);
  },
};

export default categoriesApi;
