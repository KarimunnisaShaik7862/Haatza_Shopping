import { Product } from '../../types';
import ghostMannequinKurtaPng from '../../assets/promos/gallery/ghost-mannequin-kurta.png';
import ghostMannequinBlazerPng from '../../assets/promos/gallery/ghost-mannequin-blazer.png';
import floatingHandbagPng from '../../assets/promos/gallery/floating-luxury-handbag.png';
import floatingSunglassesPng from '../../assets/promos/gallery/floating-designer-sunglasses.png';
import floatingSkincarePng from '../../assets/promos/gallery/floating-skincare-serum.png';
import floatingWatchPng from '../../assets/promos/gallery/floating-chronograph-watch.png';
import floatingSneakersPng from '../../assets/images/store49/sneakers.png';

export interface PromotionalProductItem {
  id: string;
  productId: string;
  promotionTitle: string;
  badge: string;
  productName: string;
  category: string;
  originalPrice: number;
  sellingPrice: number;
  image: string;
  navigationUrl: string;
  validUntil: string;
  isActive: boolean;
  isGhostMannequin?: boolean;
  tagline?: string;
  bgGradient?: string;
}

export interface MosaicPromosDataset {
  topRowItems: PromotionalProductItem[]; // Exactly 3 promotional areas
  bottomWiderItem: PromotionalProductItem; // 1 wider promotional area
  bottomSmallerItem: PromotionalProductItem; // 1 smaller promotional area
  rotatingApparelItems: PromotionalProductItem[]; // List of apparel items rotating in wider area
}

export interface TwoColumnPromosDataset {
  featuredPromotion: PromotionalProductItem; // Single large featured product for 35% left column
  rotatingFeatured: PromotionalProductItem[]; // List of apparel items rotating in the 35% left column
  galleryPromotions: PromotionalProductItem[]; // Dynamic items for 65% right column
}

/**
 * Calculate dynamic savings and discount percentage from API pricing
 */
export function calculateDiscount(originalPrice: number, sellingPrice: number): {
  percentage: number;
  savings: number;
} {
  if (!originalPrice || originalPrice <= sellingPrice) {
    return { percentage: 0, savings: 0 };
  }
  const savings = originalPrice - sellingPrice;
  const percentage = Math.round((savings / originalPrice) * 100);
  return { percentage, savings };
}

// ---------------------------------------------------------------------------
// ALL PROMOTIONAL PRODUCT CATALOG WITH TRANSPARENT PNG CUTOUTS
// ---------------------------------------------------------------------------
export const PROMO_CATALOG = {
  // Ghost Mannequin Apparel 1 (Women's Silk Anarkali)
  kurta: {
    id: 'promo-mosaic-kurta',
    productId: 'wf-anarkali-01',
    promotionTitle: 'Festive Atelier Spotlight',
    badge: 'Ghost Mannequin Edit',
    productName: 'Royal Blue Embroidered Silk Anarkali Gown',
    category: "Women's Ethnic",
    originalPrice: 4999,
    sellingPrice: 2999,
    image: ghostMannequinKurtaPng,
    navigationUrl: '/category/women-clothing',
    validUntil: '2026-11-30',
    isActive: true,
    isGhostMannequin: true,
    tagline: 'Invisible 3D drape with handcrafted gold zari embroidery',
    bgGradient: 'from-[#EEF4FF] via-[#F6F9FF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Ghost Mannequin Apparel 2 (Men's Navy Wool Blazer)
  blazer: {
    id: 'promo-mosaic-blazer',
    productId: 'mf-blazer-02',
    promotionTitle: 'Signature Tailoring Edition',
    badge: 'Ghost Mannequin Edit',
    productName: 'Italian Cut Navy Wool Blend Tailored Blazer',
    category: "Men's Formals",
    originalPrice: 6499,
    sellingPrice: 3899,
    image: ghostMannequinBlazerPng,
    navigationUrl: '/category/men-clothing',
    validUntil: '2026-11-30',
    isActive: true,
    isGhostMannequin: true,
    tagline: 'Structured volumetric lapels with silk interior lining',
    bgGradient: 'from-[#EBF2FF] via-[#F4F8FF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Top Row 1: Designer Eyewear
  sunglasses: {
    id: 'promo-mosaic-sunglasses',
    productId: 'acc-sunglasses-02',
    promotionTitle: 'Designer Eyewear',
    badge: 'Polarized',
    productName: 'Titanium Aviator Sunglasses with Gradient Blue Lenses',
    category: 'Eyewear',
    originalPrice: 2799,
    sellingPrice: 1699,
    image: floatingSunglassesPng,
    navigationUrl: '/category/accessories',
    validUntil: '2026-11-30',
    isActive: true,
    tagline: 'Ultra-lightweight titanium with UV400 gradient lenses',
    bgGradient: 'from-[#F0F5FF] via-[#F8FAFF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Top Row 2: Skincare Serum
  skincare: {
    id: 'promo-mosaic-skincare',
    productId: 'beauty-serum-03',
    promotionTitle: 'Skin Care',
    badge: 'Cobalt Elixir',
    productName: 'Intense Hydration Cobalt Elixir Serum (50ml)',
    category: 'Beauty',
    originalPrice: 1999,
    sellingPrice: 1299,
    image: floatingSkincarePng,
    navigationUrl: '/category/beauty',
    validUntil: '2026-11-30',
    isActive: true,
    tagline: 'Hyaluronic acid + peptide micro-droplets for 24h glow',
    bgGradient: 'from-[#EFF5FF] via-[#F8FAFF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Top Row 3: Chronograph Watch
  watch: {
    id: 'promo-mosaic-watch',
    productId: 'watch-chrono-04',
    promotionTitle: 'Essentials',
    badge: 'Swiss Mvt',
    productName: 'Sunburst Midnight Blue Chronograph Watch',
    category: 'Watches',
    originalPrice: 7999,
    sellingPrice: 4799,
    image: floatingWatchPng,
    navigationUrl: '/category/watches',
    validUntil: '2026-11-30',
    isActive: true,
    tagline: 'Surgical stainless steel with sapphire crystal glass',
    bgGradient: 'from-[#EEF4FF] via-[#F7FAFF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Bottom Row Smaller: Luxury Handbag
  handbag: {
    id: 'promo-mosaic-handbag',
    productId: 'acc-handbag-01',
    promotionTitle: 'Luxury Accessories',
    badge: 'Limited Edition',
    productName: 'Sapphire & Ivory Dual-Tone Structured Handbag',
    category: 'Handbags',
    originalPrice: 3499,
    sellingPrice: 2099,
    image: floatingHandbagPng,
    navigationUrl: '/category/accessories',
    validUntil: '2026-11-30',
    isActive: true,
    tagline: 'Precision leathercraft with 24k gold-plated lock clasp',
    bgGradient: 'from-[#EFF5FF] via-[#F8FAFF] to-[#FFFFFF]',
  } as PromotionalProductItem,

  // Bottom Row Item 2: Urban Performance Sneakers
  sneakers: {
    id: 'promo-mosaic-sneakers',
    productId: 'ftw-sneakers-05',
    promotionTitle: 'Urban Performance',
    badge: 'Trending',
    productName: 'AeroGlide Cloud Foam Breathable Urban Sneakers',
    category: 'Footwear',
    originalPrice: 4499,
    sellingPrice: 2699,
    image: floatingSneakersPng,
    navigationUrl: '/category/footwear',
    validUntil: '2026-11-30',
    isActive: true,
    tagline: 'Ultralight responsive knit upper with all-day memory cushioning',
    bgGradient: 'from-[#EEF4FF] via-[#F6F9FF] to-[#FFFFFF]',
  } as PromotionalProductItem,
};

/**
 * Return the 5-area mosaic dataset tailored to the current product context
 */
export function getMosaicPromos(product: Product): MosaicPromosDataset {
  const cat = (product.categoryId || '').toLowerCase();
  const catName = (product.categoryName || '').toLowerCase();
  const subcat = (product.subcategoryId || '').toLowerCase();
  const subcatName = (product.subcategoryName || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  const isMens =
    cat.includes('men') ||
    catName.includes('men') ||
    subcat.includes('men') ||
    subcatName.includes('men') ||
    tags.some((t) => ['men', 'mens', 'shirt', 'blazer', 'suit', 'trouser', 'polo'].includes(t));

  // Determine apparel rotation list based on category
  const rotatingApparel = isMens
    ? [PROMO_CATALOG.blazer, PROMO_CATALOG.kurta]
    : [PROMO_CATALOG.kurta, PROMO_CATALOG.blazer];

  return {
    topRowItems: [
      PROMO_CATALOG.sunglasses,
      PROMO_CATALOG.skincare,
      PROMO_CATALOG.watch,
    ],
    bottomWiderItem: rotatingApparel[0],
    bottomSmallerItem: PROMO_CATALOG.handbag,
    rotatingApparelItems: rotatingApparel,
  };
}

/**
 * Return the Two-Column (35% Left Featured + 65% Right Dynamic Gallery: 3 Top + 2 Bottom) dataset
 */
export function getTwoColumnPromos(product: Product): TwoColumnPromosDataset {
  const cat = (product.categoryId || '').toLowerCase();
  const catName = (product.categoryName || '').toLowerCase();
  const subcat = (product.subcategoryId || '').toLowerCase();
  const subcatName = (product.subcategoryName || '').toLowerCase();
  const tags = (product.tags || []).map((t) => t.toLowerCase());

  const isMens =
    cat.includes('men') ||
    catName.includes('men') ||
    subcat.includes('men') ||
    subcatName.includes('men') ||
    tags.some((t) => ['men', 'mens', 'shirt', 'blazer', 'suit', 'trouser', 'polo'].includes(t));

  const rotatingFeatured = isMens
    ? [PROMO_CATALOG.blazer, PROMO_CATALOG.kurta]
    : [PROMO_CATALOG.kurta, PROMO_CATALOG.blazer];

  // Dynamic gallery promotions for the 65% right column (3 Top + 2 Bottom)
  const galleryPromotions: PromotionalProductItem[] = [
    PROMO_CATALOG.sunglasses,
    PROMO_CATALOG.skincare,
    PROMO_CATALOG.watch,
    PROMO_CATALOG.handbag,
    PROMO_CATALOG.sneakers,
  ];

  return {
    featuredPromotion: rotatingFeatured[0],
    rotatingFeatured,
    galleryPromotions,
  };
}

