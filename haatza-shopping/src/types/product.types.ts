export type DestinationType = 'haatza' | 'lite' | 'nest';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'storage' | 'weight' | 'pack';
  value: string;
  inStock: boolean;
  priceDelta?: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  destination: DestinationType;
  categoryId: string;
  subcategoryId?: string;
  categoryName: string;
  subcategoryName?: string;
  description: string;
  fullDescription?: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  images: string[];
  mainImage: string;
  tags: string[];
  isTrending?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
  sellerName: string;
  sellerRating: number;
  deliveryDays: number;
  instantDeliveryMinutes?: number;
  unit?: string;
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  sizes?: string[];
  colors?: string[];
  minRating?: number;
  discountRanges: number[];
  inStockOnly?: boolean;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
}
