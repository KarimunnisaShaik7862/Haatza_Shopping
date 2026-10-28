export * from './product.types';
export * from './category.types';
export * from './cart.types';
export * from './user.types';
export * from './order.types';
export * from './homepageWidgets.types';

import { DestinationType } from './product.types';
import { Address } from './user.types';

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
  price: number;
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
