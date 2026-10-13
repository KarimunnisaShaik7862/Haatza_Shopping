import { Product, DestinationType, FilterState } from '../types';
import { productService } from '../services/productService';

/**
 * Products API Module
 * Encapsulates product retrieval, currently backed by mock data service
 */
export const productsApi = {
  async getProducts(destination?: DestinationType, filter?: Partial<FilterState>): Promise<Product[]> {
    return productService.getProducts(filter, destination);
  },

  async getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
    return productService.getProductByIdOrSlug(idOrSlug);
  },

  async getDeals(destination?: DestinationType, limit?: number): Promise<Product[]> {
    return productService.getDeals(destination, limit);
  },

  async getNewArrivals(destination?: DestinationType, limit?: number): Promise<Product[]> {
    return productService.getNewArrivals(destination, limit);
  },

  async getRelatedProducts(productId: string, limit?: number): Promise<Product[]> {
    return productService.getRelatedProducts(productId, limit);
  },

  async getProductsByCategory(categorySlug: string, limit?: number): Promise<Product[]> {
    return productService.getProductsByCategory(categorySlug, limit);
  },
};

export default productsApi;
