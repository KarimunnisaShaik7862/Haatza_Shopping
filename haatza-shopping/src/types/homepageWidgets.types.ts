import { Product } from './product.types';

// Widget 1: Announcement Ticker
export interface AnnouncementItem {
  id: string;
  text: string;
  highlight?: string;
  link?: string;
  tag?: string;
}

// Widget 2: Hero Marketing Carousel Slide
export interface HeroCampaignSlide {
  id: string;
  headline: string;
  subtitle: string;
  offerText: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  category?: string;
  badge: string;
  bgGradient: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

// Widget 3: Trusted Brands & Marketplace Credibility
export interface BrandPartner {
  id: string;
  name: string;
  brand: string;
  category: string;
  itemCount: number;
  rating: number;
  logoUrl?: string;
  verified: boolean;
}

// Widget 4: Shop by Category
export interface CategoryCardItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  itemCount: number;
  link: string;
  badge?: string;
  heroImage?: string;
  tagline?: string;
  subcategories?: string[];
  department?: 'apparel' | 'electronics' | 'beauty' | 'home';
  highlightOffer?: string;
  accentColor?: string;
  rating?: number;
}

// Widget 5: Featured Campaign Banner
export interface FeaturedCampaign {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgGradient: string;
  layout: 'large-hero' | 'duo-card' | 'wide-strip';
}

// Widget 6: Fashion Storytelling (Pinned & Scroll Parallax)
export interface StorytellingConfig {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  images: {
    topLeft: { url: string; alt: string; label: string };
    topRight: { url: string; alt: string; label: string };
    bottomLeft: { url: string; alt: string; label: string };
    bottomRight: { url: string; alt: string; label: string };
  };
}

// Widget 7: Men's & Women's Fashion Showcases
export interface FashionShowcaseCategory {
  name: string;
  slug: string;
  image: string;
  itemCount: number;
}

export interface FashionShowcaseData {
  gender: 'men' | 'women';
  eyebrow: string;
  title: string;
  subtitle: string;
  bannerImage: string;
  ctaText: string;
  ctaLink: string;
  categories: FashionShowcaseCategory[];
  featuredItems: Product[];
}

// Widget 10: Hurry Deals with Real Expiration & Stock
export interface HurryDealItem {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryName: string;
  originalPrice: number;
  offerPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  badge: string;
  dealEndsInHours: number;
  stockLeft: number;
}

// Widget 12: Cashback and Payment Offers
export interface CashbackOfferItem {
  id: string;
  title: string;
  subtitle: string;
  code?: string;
  validity: string;
  iconType: 'neopay' | 'paytm' | 'card' | 'emi';
  bgGradient: string;
  accentColor: string;
  ctaText: string;
}

// Widget 14: Why Shop with HAATZA
export interface WhyShopBenefit {
  id: string;
  title: string;
  description: string;
  iconName: 'ShieldCheck' | 'Truck' | 'RefreshCw' | 'Headphones' | 'Award' | 'CreditCard';
  tag?: string;
}

// Widget 15: Customer Reviews and Ratings
export interface CustomerReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  productName?: string;
  productImage?: string;
}

// Widget 16: Shopping Benefits & App Promotion
export interface ShoppingBenefitApp {
  eyebrow: string;
  headline: string;
  description: string;
  perks: string[];
  ctaText: string;
  ctaLink: string;
  badgeText: string;
}
