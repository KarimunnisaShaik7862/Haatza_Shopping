export interface HaatzaLiteProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategoryId?: string;
  categoryName: string;
  subcategoryName?: string;
  description: string;
  fullDescription: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  unit?: string;
  instantDeliveryMinutes: number;
  mainImage: string;
  images: string[];
  tags: string[];
  isTrending?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isDealOfTheDay?: boolean;
  sellerName: string;
  sellerRating: number;
  deliveryDays: number;
}

export interface HaatzaLiteCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  image: string;
  itemCount: number;
  description: string;
  isFeatured?: boolean;
  subcategories?: {
    id: string;
    name: string;
    slug: string;
    itemCount: number;
  }[];
}

export interface HaatzaLiteHeroSlide {
  id: string;
  title: string;
  highlightText: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  tag: string;
  badge: string;
  bgGradient: string;
  image: string;
  accentColor: string;
}

export interface HaatzaLitePromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  discountText: string;
  ctaText: string;
  ctaLink: string;
  bgClass: string;
  image: string;
}

export interface HaatzaLiteCartItem {
  id: string;
  productId: string;
  product: HaatzaLiteProduct;
  quantity: number;
}

export interface HaatzaLiteLocation {
  pincode: string;
  city: string;
  state: string;
  locality: string;
  formattedAddress: string;
}
