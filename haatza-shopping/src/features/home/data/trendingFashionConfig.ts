/**
 * Trending Fashion Banner - Dynamic Seasonal Theme Configuration
 * 
 * ARCHITECTURE:
 * This configuration isolates the visual banner theme, seasonal styling, and promotional
 * messaging from the underlying category card / product data.
 * 
 * When a seasonal campaign API is integrated in the future, the API response can be
 * mapped directly to this interface without rewriting or modifying the UI component.
 */

import { Product } from '../../../types';

export interface TrendingFashionCardItem {
  id: string;
  name: string;
  fullName?: string;
  price?: number | string;
  image: string;
  link: string;
  badge?: string;
  isBestseller?: boolean;
  borderColor?: string;
  originalProduct?: Product;
}

export interface SeasonalBannerThemeConfig {
  /** Unique identifier for the seasonal theme (e.g. 'new-arrivals-blue', 'summer-edit', 'festive-silk') */
  themeId: string;

  /** Small uppercase promotional label above the main heading (e.g. 'NEW ARRIVALS') */
  label: string;

  /** First line of the heading (e.g. 'Trending') */
  titlePrimary: string;

  /** Second emphasized line of the heading (e.g. 'Fashion') */
  titleHighlight: string;

  /** Descriptive subtitle (e.g. 'Fresh looks. Everyday.') */
  subtitle: string;

  /** Optional link for viewing all items in the collection */
  viewAllLink?: string;

  /** Optional button text for explore CTA */
  ctaText?: string;

  // ----------------------------------------------------
  // Visual Theme Colors & Gradients
  // ----------------------------------------------------

  /** Gradient or background color class for the left promotional panel */
  bannerGradient: string;

  /** Fallback background hex color */
  bannerBgColor?: string;

  /** Background class for the entire outer banner wrapper */
  containerBg: string;

  /** Border class for the outer banner container */
  containerBorder: string;

  /** Background class for the small label pill */
  labelBg: string;

  /** Text color class for the small label pill */
  labelTextColor: string;

  /** Text color class for the main heading */
  titleTextColor: string;

  /** Text color class for the subtitle */
  subtitleTextColor: string;

  /** Color class for the decorative underline bar */
  accentBarColor: string;

  /** Card border color palette for cycling through items */
  cardBorderColors?: string[];

  // ----------------------------------------------------
  // Decorative Geometry & Patterns
  // ----------------------------------------------------

  /** Decorative geometric pattern style */
  patternType: 'isometric-wireframe' | 'geometric-diamonds' | 'diagonal-waves' | 'festive-mandala' | 'dots-matrix' | 'none';

  /** Optional badge text displayed on featured cards (e.g. 'BEST SELLER') */
  featuredBadgeText?: string;

  /** Card title text color class */
  cardTitleColor?: string;

  /** Card price text color class */
  cardPriceColor?: string;
}

/**
 * Consistent Signature Sky/Blue perimeter border color (#7DD3FC) across all cards
 */
export const DEFAULT_CARD_BORDER_COLORS = [
  '#7DD3FC',
  '#7DD3FC',
  '#7DD3FC',
  '#7DD3FC',
];

/**
 * Default Featured Fashion Cards (Clean reference items with unified blue accents)
 */
export const DEFAULT_FEATURED_FASHION_CARDS: TrendingFashionCardItem[] = [
  {
    id: 'prod-elec-2',
    name: 'AeroPulse 1.96" AMOL...',
    fullName: 'AeroPulse 1.96" AMOLED HD Bluetooth Calling Smartwatch',
    price: '₹2,499',
    image: '/images/trending-fashion/white-smartwatch.jpg',
    link: '/product/amoled-bluetooth-calling-smartwatch',
    isBestseller: false,
    borderColor: '#7DD3FC',
  },
  {
    id: 'prod-beauty-1',
    name: 'Vitamin C Radiance...',
    fullName: 'Advanced Vitamin C Glow & Collagen Radiance Face Serum',
    price: '₹899',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    link: '/product/vitamin-c-glow-radiance-face-serum',
    isBestseller: true,
    borderColor: '#7DD3FC',
  },
  {
    id: 'prod-home-1',
    name: 'Egyptian Cotton Luxury...',
    fullName: '100% Egyptian Pure Combed Cotton King Bed Linen Set',
    price: '₹2,199',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    link: '/product/egyptian-cotton-luxury-bed-linen-set',
    isBestseller: true,
    borderColor: '#7DD3FC',
  },
  {
    id: 'prod-elec-3',
    name: 'OnePlus 12R 5G...',
    fullName: 'OnePlus 12R 5G Flagship Smartphone 16GB/256GB',
    price: '₹39,999',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    link: '/product/oneplus-12r-5g-smartphone',
    isBestseller: true,
    borderColor: '#7DD3FC',
  },
];

/**
 * Default Theme: High-Impact Blue Modern Fashion (Matching Reference Design 16:5 Panoramic UI)
 */
export const DEFAULT_TRENDING_FASHION_CONFIG: SeasonalBannerThemeConfig = {
  themeId: 'new-arrivals-blue',
  label: 'NEW ARRIVALS',
  titlePrimary: 'Trending',
  titleHighlight: 'Fashion',
  subtitle: 'Fresh looks. Everyday.',
  viewAllLink: '/category/men-fashion',
  ctaText: 'Explore All',
  bannerGradient: 'from-[#0B5ED7] via-[#1062E6] to-[#1D4ED8]',
  bannerBgColor: '#0B5ED7',
  containerBg: 'bg-gradient-to-r from-[#EFF6FF] via-[#EBF4FE] to-[#F0F7FF]',
  containerBorder: 'border-[#BFDBFE]',
  labelBg: 'bg-white/15',
  labelTextColor: 'text-white',
  titleTextColor: 'text-white',
  subtitleTextColor: 'text-white/85',
  accentBarColor: 'bg-white',
  cardBorderColors: ['#7DD3FC', '#7DD3FC', '#7DD3FC', '#7DD3FC'],
  patternType: 'isometric-wireframe',
  featuredBadgeText: 'BEST SELLER',
  cardTitleColor: 'text-slate-900',
  cardPriceColor: 'text-[#1D4ED8]',
};

/**
 * Ready-to-use Seasonal Presets for Future API Mapping
 */
export const SEASONAL_THEME_PRESETS: Record<string, SeasonalBannerThemeConfig> = {
  'summer-collection': {
    themeId: 'summer-collection',
    label: 'SUMMER DROP',
    titlePrimary: 'Summer',
    titleHighlight: 'Fashion',
    subtitle: 'Breezy linens. Bold colors.',
    viewAllLink: '/category/men-fashion',
    ctaText: 'View Summer Edit',
    bannerGradient: 'from-[#0284C7] via-[#0EA5E9] to-[#38BDF8]',
    bannerBgColor: '#0EA5E9',
    containerBg: 'bg-gradient-to-r from-sky-50/70 via-cyan-50/30 to-white',
    containerBorder: 'border-sky-200',
    labelBg: 'bg-white/20',
    labelTextColor: 'text-white',
    titleTextColor: 'text-white',
    subtitleTextColor: 'text-white/90',
    accentBarColor: 'bg-white',
    cardBorderColors: ['#38BDF8', '#7DD3FC', '#FCD34D', '#FDA4AF'],
    patternType: 'isometric-wireframe',
    featuredBadgeText: 'SUMMER PICK',
    cardTitleColor: 'text-slate-900',
    cardPriceColor: 'text-[#0284C7]',
  },
  'festive-collection': {
    themeId: 'festive-collection',
    label: 'FESTIVE ATELIER',
    titlePrimary: 'Festive',
    titleHighlight: 'Couture',
    subtitle: 'Royal silks. Pure celebrations.',
    viewAllLink: '/category/women-fashion',
    ctaText: 'Explore Festive',
    bannerGradient: 'from-[#6B21A8] via-[#7E22CE] to-[#9333EA]',
    bannerBgColor: '#7E22CE',
    containerBg: 'bg-gradient-to-r from-purple-50/70 via-fuchsia-50/30 to-white',
    containerBorder: 'border-purple-200',
    labelBg: 'bg-white/20',
    labelTextColor: 'text-white',
    titleTextColor: 'text-white',
    subtitleTextColor: 'text-white/90',
    accentBarColor: 'bg-amber-300',
    cardBorderColors: ['#FCA5A5', '#FCD34D', '#C084FC', '#93C5FD'],
    patternType: 'geometric-diamonds',
    featuredBadgeText: 'ROYAL PICK',
    cardTitleColor: 'text-slate-900',
    cardPriceColor: 'text-[#7E22CE]',
  },
  'winter-collection': {
    themeId: 'winter-collection',
    label: 'WINTER WARDROBE',
    titlePrimary: 'Winter',
    titleHighlight: 'Layers',
    subtitle: 'Cozy woolens. Tailored warmth.',
    viewAllLink: '/category/men-fashion',
    ctaText: 'Shop Winter',
    bannerGradient: 'from-[#0F172A] via-[#1E293B] to-[#334155]',
    bannerBgColor: '#1E293B',
    containerBg: 'bg-gradient-to-r from-slate-50/70 via-slate-100/40 to-white',
    containerBorder: 'border-slate-300',
    labelBg: 'bg-white/15',
    labelTextColor: 'text-white',
    titleTextColor: 'text-white',
    subtitleTextColor: 'text-white/90',
    accentBarColor: 'bg-white',
    cardBorderColors: ['#94A3B8', '#CBD5E1', '#60A5FA', '#FCA5A5'],
    patternType: 'isometric-wireframe',
    featuredBadgeText: 'WARM CHOICE',
    cardTitleColor: 'text-slate-900',
    cardPriceColor: 'text-[#1E293B]',
  },
};
