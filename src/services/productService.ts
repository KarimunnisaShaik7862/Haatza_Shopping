import { DestinationType, FilterState, Product } from '../types';
import { mockProducts } from './mock/data/products';
import { mockUnder49Products } from './mock/data/promotions';

const ALL_MOCK_PRODUCTS: Product[] = [...mockProducts, ...mockUnder49Products];

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    // Simulating async network delay for realism
    return [...ALL_MOCK_PRODUCTS];
  },

  async getProducts(filter?: Partial<FilterState>, destination?: DestinationType): Promise<Product[]> {
    let list = [...ALL_MOCK_PRODUCTS];

    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }

    if (filter?.category) {
      const catSlug = filter.category.toLowerCase();
      if (catSlug === 'under-49') {
        list = list.filter((p) => p.price <= 49 || p.tags?.some((t) => t.toLowerCase() === 'under49'));
      } else if (catSlug === 'deals') {
        list = list.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35);
      } else {
        list = list.filter(
          (p) =>
            p.categoryId.toLowerCase().includes(catSlug) ||
            p.slug.toLowerCase().includes(catSlug) ||
            p.categoryName.toLowerCase().includes(catSlug) ||
            p.tags?.some((t) => t.toLowerCase().includes(catSlug))
        );
      }
    }

    if (filter?.minPrice !== undefined) {
      list = list.filter((p) => p.price >= (filter.minPrice || 0));
    }

    if (filter?.maxPrice !== undefined && filter.maxPrice > 0) {
      list = list.filter((p) => p.price <= (filter.maxPrice || Infinity));
    }

    if (filter?.brands && filter.brands.length > 0) {
      list = list.filter((p) => filter.brands?.includes(p.brand));
    }

    if (filter?.minRating !== undefined && filter.minRating > 0) {
      list = list.filter((p) => p.rating >= (filter.minRating || 0));
    }

    if (filter?.discountRanges && filter.discountRanges.length > 0) {
      const minDiscount = Math.min(...filter.discountRanges);
      list = list.filter((p) => p.discountPercentage >= minDiscount);
    }

    if (filter?.inStockOnly) {
      list = list.filter((p) => p.inStock);
    }

    // Sorting
    if (filter?.sortBy) {
      switch (filter.sortBy) {
        case 'price_low':
          list.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          list.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
          break;
        default:
          // 'featured'
          list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      }
    }

    return list;
  },

  async getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
    const found = ALL_MOCK_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug.toLowerCase() === idOrSlug.toLowerCase()
    );
    return found ? { ...found } : null;
  },

  async getTrendingProducts(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isTrending);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getBestsellers(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isBestseller);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getNewArrivals(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isNewArrival);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getDeals(destination?: DestinationType, limit: number = 8): Promise<Product[]> {
    let list = ALL_MOCK_PRODUCTS.filter((p) => p.isDealOfTheDay || p.discountPercentage >= 35);
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    return list.slice(0, limit);
  },

  async getProductsByCategory(categorySlug: string, limit: number = 8): Promise<Product[]> {
    const term = categorySlug.toLowerCase();
    const list = ALL_MOCK_PRODUCTS.filter((p) => 
      p.categoryId.toLowerCase().includes(term) ||
      p.categoryName.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    );
    return list.slice(0, limit);
  },

  async getRelatedProducts(currentProductId: string, limit: number = 4): Promise<Product[]> {
    const current = ALL_MOCK_PRODUCTS.find((p) => p.id === currentProductId);
    if (!current) return ALL_MOCK_PRODUCTS.slice(0, limit);

    const related = ALL_MOCK_PRODUCTS.filter(
      (p) => p.id !== currentProductId && (p.categoryId === current.categoryId || p.destination === current.destination)
    );
    return related.slice(0, limit);
  },

  async searchProducts(query: string, destination?: DestinationType): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    let list = ALL_MOCK_PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }

    return list;
  },

  async getAvailableBrands(destination?: DestinationType): Promise<string[]> {
    let list = ALL_MOCK_PRODUCTS;
    if (destination) {
      list = list.filter((p) => p.destination === destination);
    }
    const brands = Array.from(new Set(list.map((p) => p.brand)));
    return brands.sort();
  },
};
