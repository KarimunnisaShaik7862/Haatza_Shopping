import { Product } from '../types';
import { mockProducts } from './mock/data/products';

export interface UserActivitySnapshot {
  recentSearches: string[];
  viewedProductIds: string[];
  visitedCategories: string[];
  cartProductIds: string[];
  wishlistProductIds: string[];
}

export const recommendationService = {
  /**
   * Generates personalized product recommendations based on user's recent local activity.
   * If user has no prior activity, returns top trending and bestseller products.
   */
  getPersonalizedRecommendations(
    activity: UserActivitySnapshot,
    limit: number = 8
  ): { products: Product[]; reason: string } {
    const {
      recentSearches = [],
      viewedProductIds = [],
      visitedCategories = [],
      cartProductIds = [],
      wishlistProductIds = [],
    } = activity;

    const hasActivity =
      recentSearches.length > 0 ||
      viewedProductIds.length > 0 ||
      visitedCategories.length > 0 ||
      cartProductIds.length > 0 ||
      wishlistProductIds.length > 0;

    // 1. Fallback for new users: Trending + Bestsellers
    if (!hasActivity) {
      const fallback = mockProducts
        .filter((p) => p.destination === 'haatza' && (p.isTrending || p.isBestseller))
        .slice(0, limit);
      return {
        products: fallback,
        reason: 'Trending & Popular on HAATZA',
      };
    }

    const scoredProducts = new Map<string, { product: Product; score: number }>();

    // Helper to add score
    const boostProduct = (product: Product, points: number) => {
      const existing = scoredProducts.get(product.id);
      if (existing) {
        existing.score += points;
      } else {
        scoredProducts.set(product.id, { product, score: points });
      }
    };

    // 2. Score based on search keywords
    if (recentSearches.length > 0) {
      const latestSearch = recentSearches[0].toLowerCase();
      mockProducts.forEach((p) => {
        if (p.destination !== 'haatza') return;
        const matchesName = p.name.toLowerCase().includes(latestSearch);
        const matchesBrand = p.brand.toLowerCase().includes(latestSearch);
        const matchesCat = p.categoryName.toLowerCase().includes(latestSearch);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(latestSearch));

        if (matchesName || matchesBrand || matchesCat || matchesTags) {
          boostProduct(p, 25);
        }
      });
    }

    // 3. Score based on viewed products and their categories
    const viewedProducts = mockProducts.filter((p) => viewedProductIds.includes(p.id));
    viewedProducts.forEach((viewed) => {
      // Recommend products in same category/tags
      mockProducts.forEach((candidate) => {
        if (candidate.destination !== 'haatza' || candidate.id === viewed.id) return;
        if (candidate.categoryId === viewed.categoryId) {
          boostProduct(candidate, 15);
        }
        const commonTags = candidate.tags.filter((t) => viewed.tags.includes(t));
        if (commonTags.length > 0) {
          boostProduct(candidate, commonTags.length * 5);
        }
      });
    });

    // 4. Score based on visited categories
    visitedCategories.forEach((catSlug, index) => {
      const weight = Math.max(20 - index * 4, 6);
      mockProducts.forEach((p) => {
        if (p.destination !== 'haatza') return;
        if (
          p.categoryId.toLowerCase().includes(catSlug.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(catSlug.toLowerCase())
        ) {
          boostProduct(p, weight);
        }
      });
    });

    // 5. Score based on wishlist & cart items (related accessories/items)
    const cartAndWishlist = [...new Set([...cartProductIds, ...wishlistProductIds])];
    cartAndWishlist.forEach((itemId) => {
      const item = mockProducts.find((p) => p.id === itemId);
      if (item) {
        mockProducts.forEach((candidate) => {
          if (candidate.destination !== 'haatza' || candidate.id === item.id) return;
          if (candidate.categoryId === item.categoryId) {
            boostProduct(candidate, 12);
          }
        });
      }
    });

    // Sort by descending score
    const sorted = Array.from(scoredProducts.values())
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.product);

    // If fewer than limit, backfill with trending items not yet in list
    if (sorted.length < limit) {
      const existingIds = new Set(sorted.map((p) => p.id));
      const fillers = mockProducts.filter(
        (p) => p.destination === 'haatza' && !existingIds.has(p.id)
      );
      sorted.push(...fillers.slice(0, limit - sorted.length));
    }

    let reason = 'Curated based on your recent activity';
    if (recentSearches.length > 0) {
      reason = `Inspired by your search for "${recentSearches[0]}"`;
    } else if (visitedCategories.length > 0) {
      reason = `Recommended from your favorite categories`;
    }

    return {
      products: sorted.slice(0, limit),
      reason,
    };
  },
};
