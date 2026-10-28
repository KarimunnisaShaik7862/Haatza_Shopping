import {
  AnnouncementItem,
  HeroCampaignSlide,
  BrandPartner,
  CategoryCardItem,
  FeaturedCampaign,
  StorytellingConfig,
  FashionShowcaseData,
  WhyShopBenefit,
  CustomerReviewItem,
  ShoppingBenefitApp,
} from '../../../types/homepageWidgets.types';
import { mockProducts } from './products';

// ==========================================
// WIDGET 1: PROMOTIONAL ANNOUNCEMENT TICKER
// ==========================================
export const mockAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-1',
    text: 'The Festive Grand Sale is Live — Extra 10% instant off on UPI checkout',
    highlight: 'LIMITED TIME',
    link: '/category/deals',
    tag: 'FESTIVE SALE',
  },
  {
    id: 'ann-2',
    text: 'Explore New Season Men & Women Collections — 100% Genuine Handcrafted Pieces',
    highlight: 'NEW ARRIVALS',
    link: '/category/men-fashion',
    tag: 'FASHION EDIT',
  },
  {
    id: 'ann-3',
    text: 'Zero Convenience Fee & Free Shipping on all orders above ₹499 across India',
    highlight: 'FREE DELIVERY',
    link: '/category/all',
    tag: 'BENEFIT',
  },
  {
    id: 'ann-4',
    text: 'Discover The ₹49 Budget Store — Everyday accessories & essentials at unbeatable prices',
    highlight: 'JUST ₹49',
    link: '/category/under-49',
    tag: 'BUDGET DROP',
  },
];

// ==========================================
// WIDGET 2: HERO MARKETING CAROUSEL SLIDES
// ==========================================
export const mockHeroCampaignSlides: HeroCampaignSlide[] = [
  {
    id: 'hero-slide-1',
    headline: 'Your Style. Your Way.',
    subtitle: 'Pure Linen Shirts & Handcrafted Chanderi Silk Kurtas',
    offerText: 'FLAT 50% - 70% OFF',
    description: 'Elevate your seasonal rotation with breathable fabrics, heritage handlooms, and tailored modern fits.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Fashion Sale',
    ctaLink: '/category/men-fashion',
    secondaryCtaText: 'View Festive Edit',
    secondaryCtaLink: '/category/women-fashion',
    category: 'Fashion',
    badge: 'GRAND FESTIVE EDIT',
    bgGradient: 'from-[#0B1528] via-[#102A6B] to-[#1D4ED8]',
  },
  {
    id: 'hero-slide-2',
    headline: 'Next-Gen Audio & Gear',
    subtitle: 'Hybrid ANC Studio Headphones, Smartwatches & 5G Tech',
    offerText: 'UP TO 65% OFF + BANK CASHBACK',
    description: 'Immerse in crystal-clear acoustics, rapid charging, and ergonomic performance wearables.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Discover Tech Deals',
    ctaLink: '/category/electronics',
    secondaryCtaText: 'Audio Collection',
    secondaryCtaLink: '/category/electronics',
    category: 'Electronics',
    badge: 'FLASH RELEASE',
    bgGradient: 'from-slate-950 via-[#0F172A] to-[#1E3A8A]',
  },
  {
    id: 'hero-slide-3',
    headline: 'Dermatologist Skincare & Scents',
    subtitle: 'Clinically Formulated Vitamin C, Niacinamide & Luxury Aromas',
    offerText: 'BUY 1 GET 1 AT ₹1',
    description: 'Nourish your skin barrier with clean, non-comedogenic serums and long-lasting artisanal evening fragrances.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Shop Skincare & Glow',
    ctaLink: '/category/beauty',
    secondaryCtaText: 'Explore Fragrances',
    secondaryCtaLink: '/category/beauty',
    category: 'Beauty',
    badge: 'DERMA APPROVED',
    bgGradient: 'from-[#0B1A3A] via-[#1E3A8A] to-[#2563EB]',
  },
  {
    id: 'hero-slide-4',
    headline: 'Artisan Living & Comfort',
    subtitle: '300-TC Pure Cotton Sheets, Ceramic Tableware & Ambient Lighting',
    offerText: 'MINIMUM 40% OFF',
    description: 'Redefine everyday living with sustainable handloom weaves, minimalist ceramics, and inviting lighting fixtures.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Home & Living',
    ctaLink: '/category/home-living',
    secondaryCtaText: 'Bedding Sets',
    secondaryCtaLink: '/category/home-living',
    category: 'Home & Living',
    badge: 'TRENDING INTERIORS',
    bgGradient: 'from-slate-950 via-[#1E293B] to-[#2962FF]/60',
  },
];

// ==========================================
// WIDGET 3: TRUSTED BRANDS & MARKETPLACE CREDIBILITY
// ==========================================
export const mockTrustedBrands: BrandPartner[] = [
  {
    id: 'brand-fabindia',
    name: 'FabIndia',
    brand: 'FABINDIA HERITAGE',
    category: 'Handlooms & Fashion',
    itemCount: 120,
    rating: 4.8,
    verified: true,
  },
  {
    id: 'brand-biba',
    name: 'Biba India',
    brand: 'BIBA ETHNICS',
    category: 'Ethnic Wear',
    itemCount: 95,
    rating: 4.7,
    verified: true,
  },
  {
    id: 'brand-boat',
    name: 'boAt Lifestyle',
    brand: 'BOAT LIFESTYLE',
    category: 'Audio & Wearables',
    itemCount: 140,
    rating: 4.6,
    verified: true,
  },
  {
    id: 'brand-sony',
    name: 'Sony Audio',
    brand: 'SONY AUDIO',
    category: 'Studio Acoustics & Tech',
    itemCount: 85,
    rating: 4.9,
    verified: true,
  },
  {
    id: 'brand-redtape',
    name: 'Red Tape',
    brand: 'RED TAPE',
    category: 'Casual Footwear',
    itemCount: 65,
    rating: 4.5,
    verified: true,
  },
  {
    id: 'brand-xiaomi',
    name: 'Redmi / Xiaomi',
    brand: 'REDMI',
    category: 'Smart Devices & Accessories',
    itemCount: 75,
    rating: 4.6,
    verified: true,
  },
  {
    id: 'brand-dermaco',
    name: 'The Derma Co',
    brand: 'THE DERMA CO',
    category: 'Active Skincare',
    itemCount: 90,
    rating: 4.8,
    verified: true,
  },
  {
    id: 'brand-bombay-dyeing',
    name: 'Bombay Dyeing',
    brand: 'BOMBAY DYEING',
    category: 'Bedding & Textiles',
    itemCount: 60,
    rating: 4.7,
    verified: true,
  },
];

// Marketplace statistics strictly based on current catalog items & verified seller network
export const mockMarketplaceStats = [
  { label: 'Curated Products', value: '5,000+' },
  { label: 'Certified Brand Stores', value: '45+' },
  { label: 'Quality Verified Rate', value: '99.4%' },
  { label: 'Pan-India Delivery Pin Codes', value: '19,000+' },
];

// ==========================================
// WIDGET 4: SHOP BY CATEGORY DISCOVERY CARDS
// ==========================================
export const mockCategoryCards: CategoryCardItem[] = [
  {
    id: 'card-men',
    slug: 'men-fashion',
    name: "Men's Fashion",
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    itemCount: 420,
    link: '/category/men-fashion',
    badge: 'Popular Edit',
    tagline: 'Tailored linen shirts, handcrafted festive kurtas, relaxed chinos & wardrobe staples.',
    department: 'apparel',
    highlightOffer: 'FLAT 50% - 70% OFF',
    accentColor: '#2962FF',
    rating: 4.8,
    subcategories: ['Linen Shirts', 'Handloom Kurtas', 'Chinos & Trousers', 'Polo T-Shirts', 'Structured Blazers'],
  },
  {
    id: 'card-women',
    slug: 'women-fashion',
    name: "Women's Fashion",
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    itemCount: 580,
    link: '/category/women-fashion',
    badge: 'Trending Now',
    tagline: 'Artisanal Chanderi sarees, embroidered festive anarkalis, fusion co-ords & luxe accessories.',
    department: 'apparel',
    highlightOffer: 'MIN. 60% OFF',
    accentColor: '#E11D48',
    rating: 4.9,
    subcategories: ['Festive Sarees', 'Anarkali Sets', 'Fusion Co-ords', 'Maxi Dresses', 'Embroidered Dupattas'],
  },
  {
    id: 'card-electronics',
    slug: 'electronics',
    name: 'Audio & Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 310,
    link: '/category/electronics',
    badge: 'Tech Spotlight',
    tagline: 'Flagship ANC headphones, low-latency true wireless earbuds, AMOLED smartwatches & smart chargers.',
    department: 'electronics',
    highlightOffer: 'UP TO 65% OFF',
    accentColor: '#7C3AED',
    rating: 4.8,
    subcategories: ['ANC Headphones', 'True Wireless Buds', 'AMOLED Watches', 'Hi-Fi Speakers', 'Fast Chargers'],
  },
  {
    id: 'card-footwear',
    slug: 'footwear',
    name: 'Footwear & Sneakers',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
    itemCount: 240,
    link: '/category/footwear',
    badge: 'Bestsellers',
    tagline: 'Cushioned street sneakers, genuine leather penny loafers, performance runners & summer slides.',
    department: 'apparel',
    highlightOffer: 'EXTRA 20% OFF',
    accentColor: '#D97706',
    rating: 4.7,
    subcategories: ['Street Sneakers', 'Leather Loafers', 'Running Trainers', 'Casual Slip-Ons', 'Formal Derbies'],
  },
  {
    id: 'card-beauty',
    slug: 'beauty',
    name: 'Beauty & Skincare',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    itemCount: 290,
    link: '/category/beauty',
    badge: 'Clean Picks',
    tagline: 'Dermatologist-approved niacinamide serums, SPF50 invisible sunscreens, velvet matte lipsticks & signature perfumes.',
    department: 'beauty',
    highlightOffer: 'BUY 1 GET 1 FREE',
    accentColor: '#059669',
    rating: 4.9,
    subcategories: ['Niacinamide Serums', 'SPF 50 Sunscreens', 'Matte Lipsticks', 'Luxe Eau De Parfum', 'Keratin Care'],
  },
  {
    id: 'card-home',
    slug: 'home-living',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    itemCount: 350,
    link: '/category/home-living',
    badge: 'Modern Living',
    tagline: '400-thread count pure cotton bedsheets, handcrafted ceramic dinnerware, warm ambient lamps & accent rugs.',
    department: 'home',
    highlightOffer: 'UP TO 55% OFF',
    accentColor: '#0284C7',
    rating: 4.8,
    subcategories: ['Cotton Bedsheets', 'Ceramic Dinnerware', 'Ambient Lamps', 'Plush Cushions', 'Aroma Diffusers'],
  },
];

// ==========================================
// WIDGET 5: FEATURED CAMPAIGN BANNERS
// ==========================================
export const mockFeaturedCampaigns: FeaturedCampaign[] = [
  {
    id: 'camp-1',
    tag: 'SEASONAL HERO',
    title: 'Autumn Contemporary Edit',
    subtitle: 'Clean Silhouettes & Structured Handweaves',
    discount: 'UP TO 60% OFF',
    description: 'Curated by in-house fashion stylists. Lightweight jackets, crisp poplin shirts, and relaxed weekend chinos.',
    ctaText: 'Explore Collection',
    ctaLink: '/category/men-fashion',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    bgGradient: 'from-[#0B1528] via-[#102A6B] to-[#1D4ED8]',
    layout: 'large-hero',
  },
  {
    id: 'camp-2',
    tag: 'FESTIVE GLAMOUR',
    title: 'Chanderi & Organza Sets',
    subtitle: 'Artisanal Zari Threadwork & Regal Dupattas',
    discount: 'STARTING ₹1,499',
    description: 'Celebrate Indian festivities with handcrafted details, jewel tones, and feather-light textures.',
    ctaText: 'Shop Festive Wear',
    ctaLink: '/category/women-fashion',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
    layout: 'duo-card',
  },
  {
    id: 'camp-3',
    tag: 'STUDIO AUDIO',
    title: 'Acoustic Soundscapes',
    subtitle: 'Noise-Cancelling Wireless & Hi-Fi Buds',
    discount: 'FLAT ₹1,000 CASHBACK',
    description: 'Immersive sound engineering with 40-hour playback, low latency gaming modes, and plush memory foam cups.',
    ctaText: 'Shop Audio Devices',
    ctaLink: '/category/electronics',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    bgGradient: 'from-slate-950 via-stone-900 to-blue-950',
    layout: 'duo-card',
  },
];

// ==========================================
// WIDGET 6: FASHION STORYTELLING (PARALLAX & PINNED)
// ==========================================
export const mockStorytellingConfig: StorytellingConfig = {
  eyebrow: 'EDITORIAL SPOTLIGHT',
  title: 'Style That Moves With You.',
  description:
    'Experience fashion crafted for modern Indian living. From effortless breathable cottons to statement occasion wear, our collections harmonize artisan heritage with progressive design.',
  ctaText: 'Explore All Collections',
  ctaLink: '/category/men-fashion',
  images: {
    topLeft: {
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      alt: 'Vibrant Contemporary Ensemble',
      label: 'Bold Statements',
    },
    topRight: {
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      alt: 'Chic Tailored Minimalism',
      label: 'Modern Classics',
    },
    bottomLeft: {
      url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
      alt: 'Heritage Handloom Silhouettes',
      label: 'Artisan Roots',
    },
    bottomRight: {
      url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      alt: 'Casual Luxury Streetwear',
      label: 'Urban Ease',
    },
  },
};

// ==========================================
// WIDGET 7: MEN'S & WOMEN'S FASHION SHOWCASES
// ==========================================
export const mockMenFashionShowcase: FashionShowcaseData = {
  gender: 'men',
  eyebrow: 'MENSWEAR EDIT',
  title: 'Refined Everyday Dressing',
  subtitle: 'Crisp Linen, Tailored Chinos & Structured Outerwear',
  bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  ctaText: 'View All Men’s Fashion',
  ctaLink: '/category/men-fashion',
  categories: [
    {
      name: 'Linen & Casual Shirts',
      slug: 'shirts',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80',
      itemCount: 120,
    },
    {
      name: 'Polo & Graphic Tees',
      slug: 't-shirts',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      itemCount: 85,
    },
    {
      name: 'Clean Denim & Chinos',
      slug: 'jeans',
      image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=400&q=80',
      itemCount: 65,
    },
    {
      name: 'Sneakers & Loafers',
      slug: 'footwear',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
      itemCount: 90,
    },
  ],
  featuredItems: mockProducts.filter((p) => p.categoryId === 'cat-fashion' || p.categoryName?.includes('Men')).slice(0, 4),
};

export const mockWomenFashionShowcase: FashionShowcaseData = {
  gender: 'women',
  eyebrow: 'WOMENSWEAR ATELIER',
  title: 'Elegance in Every Stitch',
  subtitle: 'Chanderi Anarkalis, Contemporary Dresses & Artisan Jewelry',
  bannerImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80',
  ctaText: 'View All Women’s Fashion',
  ctaLink: '/category/women-fashion',
  categories: [
    {
      name: 'Kurtas & Ethnic Sets',
      slug: 'kurtas-ethnic',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
      itemCount: 180,
    },
    {
      name: 'Flowing Dresses',
      slug: 'dresses',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80',
      itemCount: 95,
    },
    {
      name: 'Tops & Workwear',
      slug: 'tops',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80',
      itemCount: 70,
    },
    {
      name: 'Handcrafted Jewelry',
      slug: 'jewelry',
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
      itemCount: 110,
    },
  ],
  featuredItems: mockProducts.filter((p) => p.categoryName?.includes('Women') || p.tags?.includes('Ethnic')).slice(0, 4),
};

// ==========================================
// WIDGET 14: WHY SHOP WITH HAATZA
// ==========================================
export const mockWhyShopBenefits: WhyShopBenefit[] = [
  {
    id: 'benefit-1',
    title: '100% Certified Authentic',
    description: 'Every fashion piece and electronic device is sourced directly from verified Indian brand manufacturers.',
    iconName: 'ShieldCheck',
    tag: 'GENUINE GUARANTEE',
  },
  {
    id: 'benefit-2',
    title: 'Express Doorstep Delivery',
    description: 'Fast pan-India delivery reaching over 19,000 pin codes with end-to-end GPS tracking at every stage.',
    iconName: 'Truck',
    tag: 'SPEED & SAFETY',
  },
  {
    id: 'benefit-3',
    title: 'Hassle-Free 7-Day Returns',
    description: 'Simple doorstep pickup for eligible clothing and accessories with instant refund processing to your original method.',
    iconName: 'RefreshCw',
    tag: 'EASY POLICY',
  },
  {
    id: 'benefit-4',
    title: '24/7 Dedicated Concierge',
    description: 'Real customer support specialists reachable via live in-app chat, email, or toll-free hotline whenever you need.',
    iconName: 'Headphones',
    tag: 'HUMAN ASSISTANCE',
  },
];

// ==========================================
// WIDGET 15: CUSTOMER REVIEWS & RATINGS
// ==========================================
export const mockCustomerReviews: CustomerReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: 'October 12, 2026',
    title: 'Exceptional linen quality and perfect fit',
    comment:
      'The mandarin collar linen shirt arrived in pristine packaging. Breathable fabric that holds up beautifully in humid weather. Highly recommend HAATZA for men’s fashion.',
    verifiedPurchase: true,
    productName: 'Pure Linen Mandarin Collar Slim Fit Shirt',
    productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-2',
    author: 'Rohan Mehra',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'October 8, 2026',
    title: 'True studio sound at an unbelievable price',
    comment:
      'ANC on these headphones completely isolates local train commute rumble. Battery life easily lasted me four full workdays without recharging. Delivery took only 48 hours.',
    verifiedPurchase: true,
    productName: 'AcousticPro Hybrid Active Noise Cancelling Headphones',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-3',
    author: 'Pooja Iyer',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    date: 'October 4, 2026',
    title: 'Authentic Chanderi silk with gorgeous zari work',
    comment:
      'Ordered this kurta set for Navratri festivities. The handblock print and color richness exceeded expectations. It looks even better in natural sunlight than on the screen.',
    verifiedPurchase: true,
    productName: 'Handblock Printed Chanderi Silk Anarkali Kurta Set',
    productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 'rev-4',
    author: 'Vikram Sengupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    date: 'September 29, 2026',
    title: 'The ₹49 store is genuinely great value',
    comment:
      'Picked up the desk cable organizers and hair scrunchies pack for my sister. Premium materials for ₹49 each. Fast shipping and no surprise hidden fees at checkout.',
    verifiedPurchase: true,
    productName: 'Desk Cable Management Silicone Clips (Pack of 4)',
    productImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80',
  },
];

// ==========================================
// WIDGET 16: SHOPPING BENEFITS & APP PROMOTION
// ==========================================
export const mockShoppingBenefitApp: ShoppingBenefitApp = {
  eyebrow: 'ELEVATE YOUR HAATZA EXPERIENCE',
  headline: 'Exclusive Perks. Seamless Tracking. Members First.',
  description:
    'Enjoy early access to seasonal fashion edits, personalized price drop notifications, and one-tap checkout with NeoPay.',
  perks: [
    'First access to flash sales & ₹49 store drops',
    'Real-time order map & courier live tracking',
    'Instant contactless returns with doorstep inspection',
    'Personalized AI styling & wardrobe recommendations',
  ],
  ctaText: 'Start Shopping Now',
  ctaLink: '/category/all',
  badgeText: 'MEMBER PRIVILEGES',
};
