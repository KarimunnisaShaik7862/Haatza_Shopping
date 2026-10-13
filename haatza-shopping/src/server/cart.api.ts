import { CartItem } from '../types';

/**
 * Cart API Module
 * Prepared for future server-side cart persistence
 */
export const cartApi = {
  async getCart(): Promise<CartItem[]> {
    return [];
  },

  async syncCart(items: CartItem[]): Promise<boolean> {
    return true;
  },
};

export default cartApi;
