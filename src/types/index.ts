export type DestinationType = 'haatza' | 'lite' | 'nest';

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'color' | 'storage' | 'weight' | 'pack';
  value: string;
  inStock: boolean;
  priceDelta?: number; // Price difference from base price
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
  fullDescription: string;
  price: number; // Selling price in INR
  mrp: number; // Maximum Retail Price in INR
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
  instantDeliveryMinutes?: number; // For Lite quick-commerce, e.g. 15 mins
  unit?: string; // e.g. '1 kg', '500 ml', 'pack of 2'
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  itemCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  iconName: string; // Lucide icon name representation
  image: string;
  destination: DestinationType;
  itemCount: number;
  description: string;
  subcategories: SubCategory[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart (productId + variantId)
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  altPhone?: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  addressType: 'home' | 'work' | 'other';
  isDefault: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export interface OrderItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  price: number;
}

export interface OrderTrackingStep {
  title: string;
  date: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  paymentStatus: 'paid' | 'pending';
  shippingAddress: Address;
  status: 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';
  trackingSteps: OrderTrackingStep[];
  estimatedDelivery: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  productId: string;
  productName: string;
  productImage: string;
  reason: string;
  comment?: string;
  status: 'requested' | 'approved' | 'picked_up' | 'refunded';
  requestedAt: string;
  refundAmount: number;
  resolutionType: 'refund' | 'replacement';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface HeroSlide {
  id: string;
  destination: DestinationType;
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

export interface PromoBannerData {
  id: string;
  destination: DestinationType;
  title: string;
  subtitle: string;
  badge?: string;
  discountText: string;
  ctaText: string;
  ctaLink: string;
  bgClass: string;
  image: string;
}

export interface HomeSectionConfig {
  id: string;
  destination: DestinationType;
  title: string;
  subtitle?: string;
  type: 'hero' | 'categories' | 'products' | 'banner' | 'benefits' | 'deals' | 'split-banners' | 'newsletter' | 'recently-viewed';
  filterType?: 'trending' | 'bestsellers' | 'new_arrivals' | 'deals' | 'category' | 'recent';
  categorySlug?: string;
  displayStyle?: 'grid' | 'carousel';
  ctaText?: string;
  ctaLink?: string;
  bannerId?: string;
  enabled: boolean;
  order: number;
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  brands: string[];
  minRating?: number;
  discountRanges: number[];
  inStockOnly?: boolean;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
}

export interface DeliveryLocation {
  pincode: string;
  city: string;
  state: string;
  area: string;
  formattedAddress: string;
}

// ==========================================
// NEST ON-DEMAND HOME SERVICES INTERFACES
// ==========================================

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  recommended?: boolean;
}

export interface HomeService {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  price: number; // Indicative starting price
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  iconName: string;
  image: string;
  popular?: boolean;
  packages: ServicePackage[];
  included: string[];
  excluded: string[];
  faqList?: { question: string; answer: string }[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  image: string;
  serviceCount: number;
  description: string;
}

export interface ServiceBooking {
  id: string;
  bookingNumber: string;
  serviceId: string;
  serviceName: string;
  serviceImage: string;
  packageId?: string;
  packageName?: string;
  date: string;
  timeSlot: string;
  address: Address;
  status: 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  professionalName?: string;
  professionalRating?: number;
  amount: number;
  createdAt: string;
  notes?: string;
}

export interface UserActivity {
  viewedProductIds: string[];
  viewedServiceIds: string[];
  recentSearches: string[];
  visitedCategories: string[];
}
