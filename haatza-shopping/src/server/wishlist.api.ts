import { WishlistItem } from '../types';

/**
 * Wishlist API Module
 * Prepared for future server-side wishlist synchronization
 */
export const wishlistApi = {
  async getWishlist(): Promise<WishlistItem[]> {
    return [];
  },

  async toggleWishlistItem(productId: string): Promise<boolean> {
    return true;
  },
};

export default wishlistApi;
