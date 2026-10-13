import { Product } from '../../../types';

export interface MainCarouselBanner {
  id: string;
  headline: string;
  subtitle: string;
  offerText: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  category: string;
  badge: string;
  bgGradient: string;
}

export interface CashbackBanner {
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

export interface SecondaryPromoBanner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  bgClass: string;
}

export interface DealEndingItem {
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
  dealEndsInHours: number; // mock hours from mount
  stockLeft: number;
}

export interface TrendingItemWithAnalytics extends Product {
  popularityScore: number;
  viewsToday: number;
  salesCountWeek: number;
  trendingRank: number;
}

// ==========================================
// 1. FOUR PROMOTIONAL BANNERS FOR CAROUSEL
// ==========================================
export const mockMainCarouselBanners: MainCarouselBanner[] = [
  {
    id: 'carousel-banner-1',
    headline: 'Grand Festive Fashion Edit',
    subtitle: 'Pure Linen Shirts & Handcrafted Chanderi Silk',
    offerText: 'FLAT 50% - 70% OFF',
    description: 'Elevate your wardrobe with breathable Belgian linens, artisan Kurtas, and contemporary cuts.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop Fashion Sale',
    ctaLink: '/category/men-fashion',
    category: 'Fashion',
    badge: 'MEGA SALE',
    bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
  },
  {
    id: 'carousel-banner-2',
    headline: 'Next-Gen Electronics & Audio',
    subtitle: 'Hybrid ANC Headphones, 5G Mobiles & Smartwatches',
    offerText: 'UP TO 65% OFF + BANK CASHBACK',
    description: 'Immerse in crystal-clear studio acoustics, fast chargers, and high-performance wearable tech.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Electronics Deals',
    ctaLink: '/category/electronics',
    category: 'Electronics',
    badge: 'FLASH DEALS',
    bgGradient: 'from-slate-900 via-[#1E293B] to-[#2962FF]/80',
  },
  {
    id: 'carousel-banner-3',
    headline: 'Dermatologist Skincare & Fragrances',
    subtitle: 'Clinically Tested Vitamin C, Niacinamide & Luxury Scents',
    offerText: 'BUY 1 GET 1 AT ₹1',
    description: 'Transform your skin barrier with clean, cruelty-free serums and captivating evening aromas.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop Skincare & Scents',
    ctaLink: '/category/beauty',
    category: 'Beauty',
    badge: 'SPECIAL OFFER',
    bgGradient: 'from-[#0B1A3A] via-[#1E3A8A] to-[#2563EB]',
  },
  {
    id: 'carousel-banner-4',
    headline: 'Artisan Home & Living Upgrades',
    subtitle: 'Organic Cotton Bedsheets, Ambient Lamps & Cookware',
    offerText: 'MINIMUM 40% OFF',
    description: 'Transform your living spaces with hand-tufted cushions, ceramic tableware, and modern kitchenware.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Home & Living',
    ctaLink: '/category/home-living',
    category: 'Home & Living',
    badge: 'TRENDING NOW',
    bgGradient: 'from-slate-950 via-[#1E293B] to-[#2962FF]/50',
  },
];

// ==========================================
// 2. HURRY! DEALS ENDING SOON DATA
// ==========================================
export const mockDealsEndingSoon: DealEndingItem[] = [
  {
    id: 'deal-ending-1',
    slug: 'pure-linen-mandarin-collar-shirt',
    name: 'Pure Linen Mandarin Collar Slim Fit Shirt',
    brand: 'FABINDIA HERITAGE',
    categoryName: 'Fashion',
    originalPrice: 3499,
    offerPrice: 1599,
    discountPercentage: Math.round(((3499 - 1599) / 3499) * 100), // 54%
    rating: 4.8,
    reviewCount: 420,
    mainImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    badge: 'LIMITED DEAL',
    dealEndsInHours: 3.5,
    stockLeft: 7,
  },
  {
    id: 'deal-ending-2',
    slug: 'noise-cancelling-wireless-headphones',
    name: 'AcousticPro Hybrid Active Noise Cancelling Headphones',
    brand: 'AUDIO-TECHNICA',
    categoryName: 'Electronics',
    originalPrice: 5999,
    offerPrice: 2499,
    discountPercentage: Math.round(((5999 - 2499) / 5999) * 100), // 58%
    rating: 4.9,
    reviewCount: 890,
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    badge: 'LIGHTNING DEAL',
    dealEndsInHours: 2.25,
    stockLeft: 4,
  },
  {
    id: 'deal-ending-3',
    slug: 'glow-radiance-vitamin-c-serum',
    name: 'Radiance Glow 15% Pure Vitamin C & Hyaluronic Serum',
    brand: 'MINIMALIST DERMA',
    categoryName: 'Beauty & Skincare',
    originalPrice: 999,
    offerPrice: 499,
    discountPercentage: Math.round(((999 - 499) / 999) * 100), // 50%
    rating: 4.7,
    reviewCount: 654,
    mainImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    badge: 'FLASH PRICE',
    dealEndsInHours: 4.0,
    stockLeft: 12,
  },
  {
    id: 'deal-ending-4',
    slug: 'retro-court-leather-sneakers-white',
    name: 'Retro Court Minimalist Low-Top Leather Sneakers',
    brand: 'PUMA CLASSICS',
    categoryName: 'Fashion Footwear',
    originalPrice: 4499,
    offerPrice: 1999,
    discountPercentage: Math.round(((4499 - 1999) / 4499) * 100), // 56%
    rating: 4.6,
    reviewCount: 310,
    mainImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    badge: 'LIMITED DEAL',
    dealEndsInHours: 1.75,
    stockLeft: 3,
  },
  {
    id: 'deal-ending-5',
    slug: 'handblock-chanderi-silk-anarkali-kurta',
    name: 'Handblock Printed Chanderi Silk Anarkali Kurta Set',
    brand: 'BIBA ETHNICS',
    categoryName: 'Women Ethnic',
    originalPrice: 6999,
    offerPrice: 3199,
    discountPercentage: Math.round(((6999 - 3199) / 6999) * 100), // 54%
    rating: 4.9,
    reviewCount: 512,
    mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    badge: 'FESTIVE DEAL',
    dealEndsInHours: 5.0,
    stockLeft: 8,
  },
];

// ==========================================
// 3. PAYMENT & CASHBACK PROMOTION BANNERS
// ==========================================
export const mockCashbackBanners: CashbackBanner[] = [
  {
    id: 'cashback-neopay',
    title: 'Flat ₹25 Cashback with NeoPay',
    subtitle: 'On your first checkout above ₹500 across HAATZA marketplace.',
    code: 'NEOPAY25',
    validity: 'Valid till 31st Oct',
    iconType: 'neopay',
    bgGradient: 'from-amber-900/90 via-stone-900 to-zinc-950',
    accentColor: '#F59E0B',
    ctaText: 'Apply Code',
  },
  {
    id: 'cashback-paytm',
    title: 'Up to 50% Cashback with Paytm',
    subtitle: 'Instant scratch card up to ₹100 on UPI transactions above ₹299.',
    validity: 'Auto-applied at payment',
    iconType: 'paytm',
    bgGradient: 'from-sky-950 via-zinc-900 to-neutral-950',
    accentColor: '#0EA5E9',
    ctaText: 'View Terms',
  },
  {
    id: 'cashback-cards',
    title: 'Instant 10% Off on Bank Cards',
    subtitle: 'Extra ₹300 off on HDFC & ICICI Credit/Debit cards on orders > ₹1,999.',
    code: 'BANK10',
    validity: 'Every Weekend',
    iconType: 'card',
    bgGradient: 'from-blue-950 via-[#1E40AF]/70 to-[#0F172A]',
    accentColor: '#60A5FA',
    ctaText: 'Check Eligibility',
  },
  {
    id: 'cashback-emi',
    title: 'No-Cost EMI up to 12 Months',
    subtitle: 'Pay monthly without interest fees on electronics & appliances above ₹3,000.',
    validity: 'All Major Banks',
    iconType: 'emi',
    bgGradient: 'from-purple-950 via-zinc-900 to-neutral-950',
    accentColor: '#A855F7',
    ctaText: 'Explore Plans',
  },
];

// ==========================================
// 4. ₹49 STORE LOW-PRICE MERCHANDISE
// ==========================================
export const mockUnder49Products: Product[] = [
  {
    id: 'prod-49-1',
    slug: 'pure-silk-satin-hair-scrunchies-set',
    name: 'Pure Mulberry Satin Silk Hair Scrunchies (Pack of 3)',
    brand: 'URBAN CRAFT',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Fashion Accessories',
    description: 'Anti-breakage gentle silk satin scrunchies for hair protection and styling.',
    fullDescription: 'Crafted from ultra-smooth silky satin to minimize friction, split ends, and hair tangles. Ideal for everyday buns and ponytails.',
    price: 49,
    mrp: 199,
    discountPercentage: Math.round(((199 - 49) / 199) * 100), // 75%
    rating: 4.8,
    reviewCount: 340,
    stock: 120,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Accessories', 'Haircare', 'Daily'],
    sellerName: 'Urban Craft Studio',
    sellerRating: 4.7,
    deliveryDays: 2,
    isDealOfTheDay: true,
  },
  {
    id: 'prod-49-2',
    slug: 'heavy-duty-braided-sneaker-laces',
    name: 'Reflective Weave Heavy Duty Flat Sneaker Laces',
    brand: 'KICKSUP',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Footwear Accessories',
    description: 'Durable dual-tone woven shoelaces with reinforced clear aglets.',
    fullDescription: 'High tensile strength polyester shoelaces designed for sports and casual sneakers with reflective threading for nighttime visibility.',
    price: 49,
    mrp: 149,
    discountPercentage: Math.round(((149 - 49) / 149) * 100), // 67%
    rating: 4.6,
    reviewCount: 190,
    stock: 95,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Laces', 'Sneakers', 'Fashion'],
    sellerName: 'KicksUp Accessories',
    sellerRating: 4.8,
    deliveryDays: 3,
  },
  {
    id: 'prod-49-3',
    slug: 'matte-metal-minimalist-hair-claw-clip',
    name: 'Matte Finish Non-Slip Geometric Hair Claw Clip',
    brand: 'HAATZA BASICS',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Fashion Accessories',
    description: 'Rust-resistant metal alloy claw with strong internal spring grip.',
    fullDescription: 'Minimalist hollow geometric design holds thick and fine hair securely without pulling or scalp irritation.',
    price: 49,
    mrp: 179,
    discountPercentage: Math.round(((179 - 49) / 179) * 100), // 73%
    rating: 4.7,
    reviewCount: 280,
    stock: 80,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Hair Clip', 'Accessories'],
    sellerName: 'Haatza Curated Essentials',
    sellerRating: 4.9,
    deliveryDays: 2,
  },
  {
    id: 'prod-49-4',
    slug: 'stainless-steel-keychain-bottle-opener',
    name: 'Multi-Tool Compact Keychain with Bottle Opener & Hex',
    brand: 'TECHGEAR',
    destination: 'haatza',
    categoryId: 'cat-electronics',
    categoryName: 'Everyday Gadgets',
    description: 'Pocket-sized stainless steel EDC keychain tool with matte black coating.',
    fullDescription: 'Lightweight multi-function key organizer with built-in bottle opener, mini pry bar, and hex wrench.',
    price: 49,
    mrp: 149,
    discountPercentage: Math.round(((149 - 49) / 149) * 100), // 67%
    rating: 4.5,
    reviewCount: 156,
    stock: 140,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Gadgets', 'EDC', 'Tools'],
    sellerName: 'TechGear Solutions',
    sellerRating: 4.6,
    deliveryDays: 3,
  },
  {
    id: 'prod-49-5',
    slug: 'soft-silicone-cable-organizer-clips',
    name: 'Desk Cable Management Silicone Clips (Pack of 4)',
    brand: 'TECHGEAR',
    destination: 'haatza',
    categoryId: 'cat-electronics',
    categoryName: 'Desk Accessories',
    description: 'Self-adhesive eco-friendly silicone cord holders for phone chargers & USB cables.',
    fullDescription: 'Keeps nightstands and desks clutter-free. Strong 3M adhesive sticks firmly to wood, glass, metal, and ceramic surfaces.',
    price: 49,
    mrp: 129,
    discountPercentage: Math.round(((129 - 49) / 129) * 100), // 62%
    rating: 4.7,
    reviewCount: 412,
    stock: 200,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Desk', 'Cables', 'Organization'],
    sellerName: 'TechGear Solutions',
    sellerRating: 4.6,
    deliveryDays: 2,
  },
  {
    id: 'prod-49-6',
    slug: 'reusable-travel-lint-pet-hair-roller',
    name: 'Compact Travel Washable Lint & Pet Hair Roller',
    brand: 'HOMEPRO',
    destination: 'haatza',
    categoryId: 'cat-home-living',
    categoryName: 'Home Essentials',
    description: 'Pocket-sized reusable sticky roller with dust-proof protective shell.',
    fullDescription: 'Rinse with warm water to restore stickiness instantly. Removes pet fur, lint, and dust particles from blazers and cars.',
    price: 49,
    mrp: 169,
    discountPercentage: Math.round(((169 - 49) / 169) * 100), // 71%
    rating: 4.8,
    reviewCount: 320,
    stock: 110,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Home', 'Travel', 'Cleaning'],
    sellerName: 'HomePro Direct',
    sellerRating: 4.8,
    deliveryDays: 2,
  },
  {
    id: 'prod-49-7',
    slug: 'bamboo-fiber-gentle-facial-sponge',
    name: 'Konjac & Bamboo Fiber Exfoliating Facial Sponge',
    brand: 'DERMA ORGANICS',
    destination: 'haatza',
    categoryId: 'cat-beauty',
    categoryName: 'Beauty Accessories',
    description: '100% natural biodegradable plant fiber sponge for deep pore cleansing.',
    fullDescription: 'Gently cleanses sensitive skin and buffs away dead skin cells without synthetic abrasives.',
    price: 49,
    mrp: 159,
    discountPercentage: Math.round(((159 - 49) / 159) * 100), // 69%
    rating: 4.9,
    reviewCount: 295,
    stock: 150,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'],
    tags: ['Under49', 'Skincare', 'Beauty', 'Eco'],
    sellerName: 'Derma Organics Flagship',
    sellerRating: 4.9,
    deliveryDays: 2,
  },
];

// ==========================================
// 5. SECONDARY PROMOTIONAL BANNERS
// ==========================================
export const mockSecondaryPromotions: SecondaryPromoBanner[] = [
  {
    id: 'sec-promo-1',
    tag: 'FESTIVE COLLECTION',
    title: 'Handloom & Silk Celebration Edit',
    subtitle: 'Authentic Banarasi, Kanjivaram & Zari Work',
    discount: 'UP TO 55% OFF',
    ctaText: 'Explore Collection',
    ctaLink: '/category/women-fashion',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    bgClass: 'bg-gradient-to-r from-[#0F2042] via-[#1E40AF] to-[#2962FF] text-white',
  },
  {
    id: 'sec-promo-2',
    tag: 'SMART LIVING',
    title: 'Minimalist Scandinavian Home Decor',
    subtitle: 'Ambient Table Lamps, Ceramic Vases & Tufted Throws',
    discount: 'STARTING AT ₹499',
    ctaText: 'Upgrade Your Home',
    ctaLink: '/category/home-living',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=80',
    bgClass: 'bg-gradient-to-r from-slate-900 via-[#1E293B] to-[#2962FF]/60 text-white',
  },
  {
    id: 'sec-promo-3',
    tag: 'AUDIO & GAMING',
    title: 'True Wireless Noise-Cancelling Buds',
    subtitle: 'Low Latency Gaming & 48-Hour Battery Backup',
    discount: 'EXTRA ₹300 OFF ON UPI',
    ctaText: 'Shop Gadgets',
    ctaLink: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    bgClass: 'bg-gradient-to-r from-neutral-950 via-[#1E293B] to-[#2962FF]/30 text-white',
  },
];

// ==========================================
// 6. TRENDING ITEMS WITH MOCK ANALYTICS
// ==========================================
export const mockTrendingWithAnalytics: TrendingItemWithAnalytics[] = [
  {
    id: 'prod-fash-1',
    slug: 'pure-linen-mandarin-collar-shirt',
    name: 'Pure Linen Mandarin Collar Slim Fit Shirt',
    brand: 'FABINDIA HERITAGE',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Men Fashion',
    description: 'Handcrafted 100% pure linen shirt with tailored mandarin collar.',
    fullDescription: 'Crafted from premium flax fibres, this classic linen shirt offers superior breathability.',
    price: 1899,
    mrp: 3499,
    discountPercentage: 46,
    rating: 4.8,
    reviewCount: 420,
    stock: 45,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Linen', 'Summer', 'Men', 'Casual', 'Bestseller'],
    isTrending: true,
    isBestseller: true,
    sellerName: 'FabIndia Official Store',
    sellerRating: 4.8,
    deliveryDays: 2,
    popularityScore: 98,
    viewsToday: 3420,
    salesCountWeek: 860,
    trendingRank: 1,
  },
  {
    id: 'prod-elec-1',
    slug: 'acousticpro-hybrid-anc-headphones',
    name: 'AcousticPro Studio Wireless ANC Headphones',
    brand: 'AUDIO-TECHNICA',
    destination: 'haatza',
    categoryId: 'cat-electronics',
    categoryName: 'Electronics',
    description: '40mm titanium drivers with 40dB active noise cancellation.',
    fullDescription: 'Experience pristine hi-res acoustics and 50 hours of battery longevity.',
    price: 2499,
    mrp: 4999,
    discountPercentage: 50,
    rating: 4.9,
    reviewCount: 915,
    stock: 35,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Audio', 'ANC', 'Wireless', 'Headphones'],
    isTrending: true,
    isBestseller: true,
    sellerName: 'AudioTechnica Direct',
    sellerRating: 4.9,
    deliveryDays: 2,
    popularityScore: 96,
    viewsToday: 2950,
    salesCountWeek: 720,
    trendingRank: 2,
  },
  {
    id: 'prod-fash-2',
    slug: 'handblock-chanderi-silk-anarkali-kurta',
    name: 'Handblock Printed Chanderi Silk Anarkali Set',
    brand: 'BIBA ETHNICS',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Women Fashion',
    description: 'Opulent Chanderi silk Anarkali kurta with delicate gota patti detailing.',
    fullDescription: 'Celebrate timeless Indian tradition with this flared Chanderi silk Anarkali set.',
    price: 3299,
    mrp: 6999,
    discountPercentage: 53,
    rating: 4.8,
    reviewCount: 512,
    stock: 28,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ethnic', 'Festive', 'Silk', 'Kurta', 'Women'],
    isTrending: true,
    isBestseller: true,
    sellerName: 'Biba India Flagship',
    sellerRating: 4.9,
    deliveryDays: 3,
    popularityScore: 94,
    viewsToday: 2410,
    salesCountWeek: 540,
    trendingRank: 3,
  },
  {
    id: 'prod-beauty-1',
    slug: 'radiance-glow-vitamin-c-serum',
    name: 'Radiance Glow 15% Pure Vitamin C Derma Serum',
    brand: 'MINIMALIST DERMA',
    destination: 'haatza',
    categoryId: 'cat-beauty',
    categoryName: 'Beauty & Skincare',
    description: 'Formulated with Ethyl Ascorbic Acid, Ferulic Acid & Hyaluronic Acid.',
    fullDescription: 'Brightens dark spots, firms elasticity, and neutralizes free radicals.',
    price: 549,
    mrp: 999,
    discountPercentage: 45,
    rating: 4.7,
    reviewCount: 680,
    stock: 60,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'],
    tags: ['Serum', 'Vitamin C', 'Skincare', 'Clean Beauty'],
    isTrending: true,
    sellerName: 'Minimalist Flagship',
    sellerRating: 4.8,
    deliveryDays: 2,
    popularityScore: 92,
    viewsToday: 2180,
    salesCountWeek: 610,
    trendingRank: 4,
  },
  {
    id: 'prod-home-1',
    slug: 'luxury-egyptian-cotton-bedsheet-set',
    name: '400 TC Egyptian Pure Cotton King Bedsheet Set',
    brand: 'BOMBAY DYEING LUXE',
    destination: 'haatza',
    categoryId: 'cat-home-living',
    categoryName: 'Home & Living',
    description: 'Silky sateen weave with 2 matching Oxford pillow covers.',
    fullDescription: 'Woven with long-staple Egyptian cotton for a feather-soft feel and long-lasting luster.',
    price: 1699,
    mrp: 3999,
    discountPercentage: 57,
    rating: 4.8,
    reviewCount: 390,
    stock: 40,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80'],
    tags: ['Bedsheet', 'Cotton', 'Home', 'Luxury'],
    isTrending: true,
    sellerName: 'Bombay Dyeing Home',
    sellerRating: 4.8,
    deliveryDays: 3,
    popularityScore: 89,
    viewsToday: 1840,
    salesCountWeek: 420,
    trendingRank: 5,
  },
  {
    id: 'prod-fash-3',
    slug: 'retro-court-leather-sneakers-white',
    name: 'Retro Court Minimalist Low-Top Leather Sneakers',
    brand: 'PUMA CLASSICS',
    destination: 'haatza',
    categoryId: 'cat-fashion',
    categoryName: 'Fashion',
    description: 'Supple full-grain leather uppers with cushioned OrthoLite insoles.',
    fullDescription: 'Timeless tennis heritage silhouette featuring perforated side panels and durable vulcanized rubber soles.',
    price: 2499,
    mrp: 4499,
    discountPercentage: 44,
    rating: 4.6,
    reviewCount: 310,
    stock: 22,
    inStock: true,
    mainImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sneakers', 'Shoes', 'Men', 'Casual'],
    isTrending: true,
    sellerName: 'Puma India Flagship',
    sellerRating: 4.8,
    deliveryDays: 2,
    popularityScore: 87,
    viewsToday: 1650,
    salesCountWeek: 380,
    trendingRank: 6,
  },
];
