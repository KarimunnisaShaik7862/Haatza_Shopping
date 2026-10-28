export interface CategorySubItem {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  description: string;
  image: string;
  badge?: string;
  itemCount?: string;
  productFilterTerm: string;
  aliases?: string[];
}

export interface CategoryMajorSection {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: string;
  badge?: string;
  accentColor?: string;
  aliases?: string[];
  subcategories: CategorySubItem[];
}

export interface CategoryConfig {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroBanner: {
    title: string;
    subtitle: string;
    tag: string;
    discount: string;
    image: string;
    bgGradient: string;
    badgeColor: string;
  };
  accentColor: string;
  sections: CategoryMajorSection[];
}

// =========================================================================
// 1. ELECTRONICS
// =========================================================================
const ELECTRONICS_CONFIG: CategoryConfig = {
  id: 'cat-electronics',
  slug: 'electronics',
  name: 'Electronics',
  shortName: 'Electronics',
  tagline: 'Flagship Computing, Studio Audio & Smart Accessories',
  description: 'Explore high-performance laptops, ANC audio, high-refresh monitors, and smart devices.',
  heroBanner: {
    title: 'Next-Gen Computing & Studio Audio',
    subtitle: 'Ultra-thin laptops, active noise cancelling headphones, AMOLED wearables & PC peripherals.',
    tag: 'TECH FESTIVAL 2026',
    discount: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#0B1A3A] via-[#1E4ED8] to-[#1D4ED8]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#2563EB',
  sections: [
    {
      id: 'sec-elec-laptops',
      slug: 'laptops',
      title: 'Laptops & Computers',
      shortTitle: 'Laptops',
      subtitle: 'Ultrabooks, gaming rigs, MacBooks & 2-in-1 touch convertibles',
      description: 'Engineered for developers, creators, power gamers, and corporate executives.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
      itemCount: '60+ Models',
      badge: 'High Performance',
      accentColor: '#2563EB',
      subcategories: [
        { id: 'sub-lap-ultra', slug: 'ultrabooks', name: 'Ultrabooks', shortTitle: 'Ultrabooks', description: 'Featherlight all-day battery laptops.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Models', productFilterTerm: 'laptop' },
        { id: 'sub-lap-game', slug: 'gaming-laptops', name: 'Gaming Laptops', shortTitle: 'Gaming', description: 'RTX graphics, 165Hz displays & RGB.', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80', badge: 'RTX 40-Series', itemCount: '30+ Models', productFilterTerm: 'gaming' },
        { id: 'sub-lap-mac', slug: 'macbooks', name: 'Apple MacBooks', shortTitle: 'MacBooks', description: 'Apple Silicon M3 & M3 Pro powerhouses.', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Models', productFilterTerm: 'laptop' },
        { id: 'sub-lap-2in1', slug: '2-in-1-laptops', name: '2-in-1 Convertibles', shortTitle: '2-in-1 Touch', description: 'Touchscreen stylus convertibles for designers.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Models', productFilterTerm: 'laptop' },
        { id: 'sub-lap-desk', slug: 'desktops', name: 'Desktops & All-in-Ones', shortTitle: 'Desktops', description: 'Workstation towers & minimal AIO PCs.', image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Models', productFilterTerm: 'desktop' },
        { id: 'sub-lap-mon', slug: 'monitors', name: 'Monitors & Displays', shortTitle: 'Monitors', description: '4K IPS, 144Hz high refresh & curved panels.', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80', itemCount: '28+ Displays', productFilterTerm: 'monitor' },
        { id: 'sub-lap-acc', slug: 'computer-accessories', name: 'Computer Accessories', shortTitle: 'PC Acc', description: 'USB-C docks, cooling pads & stands.', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80', itemCount: '45+ Items', productFilterTerm: 'accessories' },
        { id: 'sub-lap-kb', slug: 'keyboards-mice', name: 'Keyboards & Mice', shortTitle: 'Keyboards', description: 'Hot-swappable mechanical keyboards & optical mice.', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80', itemCount: '40+ Styles', productFilterTerm: 'keyboard' },
      ],
    },
    {
      id: 'sec-elec-audio',
      slug: 'audio',
      title: 'Headphones & Audio',
      shortTitle: 'Audio',
      subtitle: 'Active noise cancellation, studio monitors & high-bass speakers',
      description: 'Acoustic excellence from wireless earbuds to room-filling party soundbars.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
      itemCount: '80+ Audio Items',
      accentColor: '#2563EB',
      subcategories: [
        { id: 'sub-aud-tws', slug: 'earbuds', name: 'Wireless Earbuds', shortTitle: 'TWS Earbuds', description: 'Spatial audio & dual mic noise cancellation.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80', badge: 'Top Seller', itemCount: '35+ Models', productFilterTerm: 'audio' },
        { id: 'sub-aud-anc', slug: 'headphones', name: 'Over-Ear Headphones', shortTitle: 'Headphones', description: 'Plush protein memory foam with 40mm titanium drivers.', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Models', productFilterTerm: 'audio' },
        { id: 'sub-aud-spk', slug: 'speakers', name: 'Bluetooth Speakers', shortTitle: 'BT Speakers', description: 'IPX7 waterproof portable punchy speakers.', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Models', productFilterTerm: 'speaker' },
        { id: 'sub-aud-bar', slug: 'soundbars', name: 'Soundbars & Home Audio', shortTitle: 'Soundbars', description: 'Dolby Atmos home cinema audio bars.', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80', itemCount: '14+ Systems', productFilterTerm: 'soundbar' },
        { id: 'sub-aud-mic', slug: 'microphones', name: 'Microphones & Studio', shortTitle: 'Microphones', description: 'Cardioid USB condenser mics for podcasting.', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80', itemCount: '10+ Units', productFilterTerm: 'audio' },
      ],
    },
    {
      id: 'sec-elec-smart',
      slug: 'smart-gadgets',
      title: 'Smart Gadgets & Storage',
      shortTitle: 'Smart Gadgets',
      subtitle: 'AMOLED smartwatches, high-speed NVMe storage & networking',
      description: 'Connected living essentials and lightning-fast backup drives.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Gadgets',
      accentColor: '#2563EB',
      subcategories: [
        { id: 'sub-smt-wat', slug: 'smartwatches', name: 'Smartwatches', shortTitle: 'Smartwatches', description: 'Continuous heart rate & Bluetooth calling.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', itemCount: '30+ Styles', productFilterTerm: 'smartwatch' },
        { id: 'sub-smt-cam', slug: 'cameras', name: 'Cameras & Vlogging', shortTitle: 'Cameras', description: '4K action cameras & vlogging mirrorless kits.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Models', productFilterTerm: 'camera' },
        { id: 'sub-smt-ssd', slug: 'storage', name: 'SSDs & Storage', shortTitle: 'Storage', description: '1050MB/s USB 3.2 external SSD drives.', image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80', itemCount: '22+ Drives', productFilterTerm: 'storage' },
        { id: 'sub-smt-net', slug: 'networking', name: 'Routers & Mesh', shortTitle: 'Routers', description: 'Wi-Fi 6 gigabit dual band mesh routers.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Units', productFilterTerm: 'electronics' },
        { id: 'sub-smt-prn', slug: 'printers', name: 'Printers & Scanners', shortTitle: 'Printers', description: 'Wireless ink-tank all-in-one printers.', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80', itemCount: '8+ Models', productFilterTerm: 'printer' },
      ],
    },
  ],
};

// =========================================================================
// 2. MOBILES
// =========================================================================
const MOBILES_CONFIG: CategoryConfig = {
  id: 'cat-mobiles',
  slug: 'mobiles',
  name: 'Mobiles',
  shortName: 'Mobiles',
  tagline: 'Flagship 5G Smartphones, Tablets & Accessories',
  description: 'Shop the newest Snapdragon, Bionic and Dimensity powered smartphones with AMOLED screens.',
  heroBanner: {
    title: 'Flagship 5G Smartphones & Power Gear',
    subtitle: '120Hz curved AMOLED displays, 200MP OIS cameras & 120W HyperCharge power banks.',
    tag: '5G MOBILES MEGA DEAL',
    discount: 'UP TO 40% OFF',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#0F172A] via-[#1E293B] to-[#3B82F6]',
    badgeColor: 'bg-emerald-400 text-stone-950',
  },
  accentColor: '#0EA5E9',
  sections: [
    {
      id: 'sec-mob-smartphones',
      slug: 'smartphones',
      title: 'Smartphones & Tablets',
      shortTitle: 'Phones',
      subtitle: 'Apple iPhones, Samsung Galaxy, OnePlus & Xiaomi 5G',
      description: 'Ultra-fast processors, liquid cooled gaming chipsets, and long-lasting batteries.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Devices',
      badge: '5G Ready',
      accentColor: '#0EA5E9',
      subcategories: [
        { id: 'sub-mob-flag', slug: 'flagship-phones', name: 'Flagship Phones', shortTitle: 'Flagships', description: 'Top tier cameras & Titanium designs.', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80', badge: 'Ultra Series', itemCount: '15+ Models', productFilterTerm: 'smartphone' },
        { id: 'sub-mob-mid', slug: 'budget-5g', name: 'Budget 5G Phones', shortTitle: 'Budget 5G', description: 'High performance at accessible prices.', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Models', productFilterTerm: 'smartphone' },
        { id: 'sub-mob-tab', slug: 'tablets', name: 'Tablets & iPads', shortTitle: 'Tablets', description: 'Stunning displays for reading, notes & drawing.', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Models', productFilterTerm: 'tablet' },
        { id: 'sub-mob-feat', slug: 'feature-phones', name: 'Feature Phones', shortTitle: 'Feature Phones', description: 'Long battery endurance daily phones.', image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=400&q=80', itemCount: '8+ Models', productFilterTerm: 'mobile' },
      ],
    },
    {
      id: 'sec-mob-accessories',
      slug: 'mobile-accessories',
      title: 'Mobile Accessories',
      shortTitle: 'Accessories',
      subtitle: 'Protective cases, tempered glass, fast power banks & wireless chargers',
      description: 'Military grade drop protection and GaN chargers.',
      image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80',
      itemCount: '120+ Acc',
      accentColor: '#0EA5E9',
      subcategories: [
        { id: 'sub-acc-cas', slug: 'cases-covers', name: 'Cases & Covers', shortTitle: 'Cases', description: 'Shockproof silicone, rugged & leather covers.', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=400&q=80', itemCount: '60+ Styles', productFilterTerm: 'case' },
        { id: 'sub-acc-gla', slug: 'screen-protectors', name: 'Screen Protectors', shortTitle: 'Tempered Glass', description: '9H hardness scratch-resistant shields.', image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=400&q=80', itemCount: '30+ Models', productFilterTerm: 'protector' },
        { id: 'sub-acc-pow', slug: 'power-banks', name: 'Power Banks', shortTitle: 'Power Banks', description: '20000mAh 65W fast-charging backup batteries.', image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Models', productFilterTerm: 'powerbank' },
        { id: 'sub-acc-cbl', slug: 'chargers-cables', name: 'Fast Chargers & Cables', shortTitle: 'Chargers', description: '65W GaN dual port Type-C adapters.', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80', itemCount: '35+ Items', productFilterTerm: 'charger' },
        { id: 'sub-acc-mnt', slug: 'mobile-holders', name: 'Car Mounts & Stands', shortTitle: 'Stands', description: 'Magnetic dashboard mounts & desktop docks.', image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Models', productFilterTerm: 'holder' },
      ],
    },
  ],
};

// =========================================================================
// 3. HOME & LIVING
// =========================================================================
const HOME_LIVING_CONFIG: CategoryConfig = {
  id: 'cat-home-living',
  slug: 'home-living',
  name: 'Home & Living',
  shortName: 'Home',
  tagline: 'Pure Cotton Bedding, Artisanal Decor & Kitchenware',
  description: 'Transform your space with handcrafted textiles, warm ambient lighting, and sleek organizers.',
  heroBanner: {
    title: 'Transform Your Living Space',
    subtitle: '100% combed cotton bedsheets, blackout linen curtains, ambient lamps & ceramic cookware.',
    tag: 'HOME UPGRADE FESTIVAL',
    discount: 'FLAT 40% - 60% OFF',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#1A2E26] via-[#2D5A46] to-[#059669]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#059669',
  sections: [
    {
      id: 'sec-home-bedding',
      slug: 'bedding-curtains',
      title: 'Bedding, Curtains & Cushions',
      shortTitle: 'Bedding',
      subtitle: '300TC cotton sheets, comforters, and tailored window drapes',
      description: 'Hypoallergenic bed sets woven for restful sleep.',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      itemCount: '70+ Styles',
      accentColor: '#059669',
      subcategories: [
        { id: 'sub-bed-sht', slug: 'bedsheets', name: 'Cotton Bedsheets', shortTitle: 'Bedsheets', description: 'Pure cotton double & king fitted bedsheets.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80', badge: '100% Cotton', itemCount: '35+ Styles', productFilterTerm: 'bedsheet' },
        { id: 'sub-bed-cur', slug: 'curtains', name: 'Window & Door Curtains', shortTitle: 'Curtains', description: 'Thermal blackout & semi-sheer linen drapes.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Styles', productFilterTerm: 'curtain' },
        { id: 'sub-bed-csh', slug: 'cushions', name: 'Cushions & Covers', shortTitle: 'Cushions', description: 'Hand-embroidered textured cushion covers.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80', itemCount: '30+ Styles', productFilterTerm: 'cushion' },
        { id: 'sub-bed-bln', slug: 'blankets', name: 'Blankets & Quilts', shortTitle: 'Blankets', description: 'All-season microfiber comforters & Dohars.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Styles', productFilterTerm: 'blanket' },
      ],
    },
    {
      id: 'sec-home-decor',
      slug: 'decor-lighting',
      title: 'Home Decor & Lighting',
      shortTitle: 'Decor',
      subtitle: 'Sculptural table lamps, ceramic vases, wall clocks & aroma diffusers',
      description: 'Artistic accents for modern living rooms and cozy bedrooms.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
      itemCount: '90+ Pieces',
      accentColor: '#059669',
      subcategories: [
        { id: 'sub-dec-wll', slug: 'wall-decor', name: 'Wall Decor & Clocks', shortTitle: 'Wall Decor', description: 'Abstract canvas prints & minimalist dials.', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80', itemCount: '40+ Pieces', productFilterTerm: 'decor' },
        { id: 'sub-dec-lmp', slug: 'lighting', name: 'Lamps & Ambient Lights', shortTitle: 'Lighting', description: 'Warm wooden base desk lamps & pendant lights.', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Items', productFilterTerm: 'light' },
        { id: 'sub-dec-vas', slug: 'vases-planters', name: 'Vases & Planters', shortTitle: 'Planters', description: 'Matte terracotta & glazed ceramic planters.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Styles', productFilterTerm: 'decor' },
        { id: 'sub-dec-frg', slug: 'fragrance', name: 'Aroma Diffusers & Candles', shortTitle: 'Candles', description: 'Soy wax scented candles with calming lavender.', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Scents', productFilterTerm: 'candle' },
      ],
    },
    {
      id: 'sec-home-kitchen',
      slug: 'kitchen-dining',
      title: 'Kitchen & Dining',
      shortTitle: 'Kitchen',
      subtitle: 'Cast iron cookware, bone china dinner sets, and pantry organizers',
      description: 'Culinary grade cookware and elegant dinnerware for hosting.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      itemCount: '80+ Kitchen Finds',
      accentColor: '#059669',
      subcategories: [
        { id: 'sub-kit-cook', slug: 'cookware', name: 'Cookware & Pans', shortTitle: 'Cookware', description: 'Pre-seasoned cast iron skillets & tri-ply pots.', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', badge: 'Tri-Ply', itemCount: '25+ Sets', productFilterTerm: 'cookware' },
        { id: 'sub-kit-din', slug: 'dinnerware', name: 'Dinner Sets & Cutlery', shortTitle: 'Dinnerware', description: 'Porcelain tableware & gold-plated spoons.', image: 'https://images.unsplash.com/photo-1615865417491-9941019fbc00?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Sets', productFilterTerm: 'dinnerware' },
        { id: 'sub-kit-org', slug: 'storage-organizers', name: 'Pantry Storage & Jars', shortTitle: 'Organizers', description: 'Airtight borosilicate glass containers.', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80', itemCount: '30+ Jars', productFilterTerm: 'storage' },
        { id: 'sub-kit-bth', slug: 'bath-essentials', name: 'Bath & Towels', shortTitle: 'Bath Towels', description: '600 GSM plush Egyptian cotton bath towels.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Styles', productFilterTerm: 'towel' },
      ],
    },
  ],
};

// =========================================================================
// 4. BEAUTY
// =========================================================================
const BEAUTY_CONFIG: CategoryConfig = {
  id: 'cat-beauty',
  slug: 'beauty',
  name: 'Beauty',
  shortName: 'Beauty',
  tagline: 'Clean Dermatologist Skincare, Luxury Fragrances & Makeup',
  description: 'Dermatologically tested formulations, toxin-free serums, and expressive makeup palettes.',
  heroBanner: {
    title: 'Glow With Science-Backed Beauty',
    subtitle: 'Niacinamide serums, hyaluronic acid moisturizers, velvet matte lipsticks & signature perfumes.',
    tag: 'BEAUTY GLOW FEST',
    discount: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#3B122D] via-[#701A75] to-[#BE185D]',
    badgeColor: 'bg-pink-300 text-stone-950',
  },
  accentColor: '#DB2777',
  sections: [
    {
      id: 'sec-bt-skincare',
      slug: 'skincare',
      title: 'Skincare & Serums',
      shortTitle: 'Skincare',
      subtitle: 'Gentle cleansers, vitamin C, sunscreens & night repair creams',
      description: 'Potent active botanicals formulated for glowing, healthy skin.',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
      itemCount: '60+ Products',
      badge: 'Derm Approved',
      accentColor: '#DB2777',
      subcategories: [
        { id: 'sub-skn-ser', slug: 'face-serums', name: 'Face Serums', shortTitle: 'Serums', description: '10% Niacinamide & 2% Salicylic acid treatments.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80', badge: 'Bestseller', itemCount: '20+ Serums', productFilterTerm: 'serum' },
        { id: 'sub-skn-sun', slug: 'sunscreens', name: 'Sunscreens & SPF', shortTitle: 'Sunscreens', description: 'Invisible water-fluid SPF 50+ PA++++ filters.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Lotions', productFilterTerm: 'sunscreen' },
        { id: 'sub-skn-mst', slug: 'moisturizers', name: 'Moisturizers & Creams', shortTitle: 'Moisturizers', description: 'Ceramide barrier repair creams.', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Creams', productFilterTerm: 'moisturizer' },
        { id: 'sub-skn-cln', slug: 'cleansers', name: 'Cleansers & Toners', shortTitle: 'Cleansers', description: 'Hydrating non-foaming gentle face washes.', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80', itemCount: '14+ Washes', productFilterTerm: 'cleanser' },
      ],
    },
    {
      id: 'sec-bt-makeup',
      slug: 'makeup',
      title: 'Makeup & Lipsticks',
      shortTitle: 'Makeup',
      subtitle: 'Long-wear matte lipsticks, waterproof kajals & highlighters',
      description: 'Cruelty-free formulas for effortless day-to-night glamour.',
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Items',
      accentColor: '#DB2777',
      subcategories: [
        { id: 'sub-mk-lip', slug: 'lipsticks', name: 'Lipsticks & Lip Care', shortTitle: 'Lipsticks', description: 'Transferproof matte crayons & moisturizing balms.', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', badge: 'Trending', itemCount: '25+ Shades', productFilterTerm: 'lipstick' },
        { id: 'sub-mk-eye', slug: 'eye-makeup', name: 'Eye Makeup & Kajals', shortTitle: 'Eye Makeup', description: '24-hour waterproof gel eyeliners & mascaras.', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Products', productFilterTerm: 'makeup' },
        { id: 'sub-mk-fce', slug: 'face-makeup', name: 'Foundations & Powders', shortTitle: 'Base Makeup', description: 'Skin-tint lightweight buildable coverage.', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', itemCount: '16+ Shading', productFilterTerm: 'foundation' },
      ],
    },
    {
      id: 'sec-bt-fragrance',
      slug: 'fragrances-haircare',
      title: 'Fragrances & Haircare',
      shortTitle: 'Hair & Fragrance',
      subtitle: 'Artisanal perfumes, cold-pressed oils & salon styling',
      description: 'Signature scent profiles and restorative botanical hair formulas.',
      image: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&w=600&q=80',
      itemCount: '45+ Products',
      accentColor: '#DB2777',
      subcategories: [
        { id: 'sub-frg-prf', slug: 'perfumes', name: 'Perfumes & Eau De Parfum', shortTitle: 'Perfumes', description: 'Long-lasting luxury amber and woody EDP sprays.', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Scents', productFilterTerm: 'perfume' },
        { id: 'sub-frg-har', slug: 'haircare', name: 'Shampoos & Hair Masks', shortTitle: 'Hair Care', description: 'Sulphate-free rosemary & keratin repair formulas.', image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Products', productFilterTerm: 'hair' },
        { id: 'sub-frg-grm', slug: 'grooming', name: 'Men’s Grooming & Beard', shortTitle: 'Grooming', description: 'Beard growth oils & soothing razor balms.', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80', itemCount: '14+ Kits', productFilterTerm: 'grooming' },
      ],
    },
  ],
};

// =========================================================================
// 5. APPLIANCES
// =========================================================================
const APPLIANCES_CONFIG: CategoryConfig = {
  id: 'cat-appliances',
  slug: 'appliances',
  name: 'Appliances',
  shortName: 'Appliances',
  tagline: 'Energy Efficient Smart Kitchen & Home Appliances',
  description: 'Upgrade to 5-star inverter air conditioners, smart microwaves, air fryers, and frost-free refrigerators.',
  heroBanner: {
    title: 'Smart Home & Kitchen Innovations',
    subtitle: '5-star energy rated appliances with inverter motors, digital touch controls & manufacturer warranties.',
    tag: 'APPLIANCE BONANZA',
    discount: 'UP TO 45% OFF',
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#111827] via-[#1E293B] to-[#4F46E5]',
    badgeColor: 'bg-indigo-300 text-stone-950',
  },
  accentColor: '#4F46E5',
  sections: [
    {
      id: 'sec-app-kitchen',
      slug: 'kitchen-appliances',
      title: 'Kitchen Appliances',
      shortTitle: 'Kitchen App',
      subtitle: 'Digital air fryers, mixer grinders, microwaves & electric kettles',
      description: 'Cook healthier and faster with smart temperature controls.',
      image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Appliances',
      accentColor: '#4F46E5',
      subcategories: [
        { id: 'sub-kit-fry', slug: 'air-fryers', name: 'Digital Air Fryers', shortTitle: 'Air Fryers', description: 'Rapid 360-degree hot air circulation fryers.', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=400&q=80', badge: 'Health Choice', itemCount: '12+ Models', productFilterTerm: 'air fryer' },
        { id: 'sub-kit-mix', slug: 'mixer-grinders', name: 'Mixer Grinders', shortTitle: 'Mixers', description: '750W heavy-duty copper motor mixers.', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Models', productFilterTerm: 'mixer' },
        { id: 'sub-kit-mwo', slug: 'microwaves', name: 'Microwave Ovens', shortTitle: 'Microwaves', description: 'Convection ovens with auto-cook menus.', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=400&q=80', itemCount: '14+ Models', productFilterTerm: 'microwave' },
        { id: 'sub-kit-pur', slug: 'water-purifiers', name: 'Water Purifiers', shortTitle: 'RO Purifiers', description: 'Multi-stage RO+UV+Copper alkaline water systems.', image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=400&q=80', itemCount: '10+ Systems', productFilterTerm: 'purifier' },
      ],
    },
    {
      id: 'sec-app-home',
      slug: 'home-appliances',
      title: 'Major Home Appliances',
      shortTitle: 'Home App',
      subtitle: 'Smart TVs, washing machines, refrigerators & air conditioners',
      description: 'Reliable engineering designed for large modern households.',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
      itemCount: '40+ Units',
      accentColor: '#4F46E5',
      subcategories: [
        { id: 'sub-maj-tv', slug: 'televisions', name: 'Smart 4K Televisions', shortTitle: 'Smart TVs', description: '55" Dolby Vision 4K QLED bezel-less screens.', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80', badge: '4K QLED', itemCount: '15+ TVs', productFilterTerm: 'tv' },
        { id: 'sub-maj-wm', slug: 'washing-machines', name: 'Washing Machines', shortTitle: 'Washers', description: 'Front-load AI wash inverter machines.', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Units', productFilterTerm: 'washer' },
        { id: 'sub-maj-rf', slug: 'refrigerators', name: 'Refrigerators', shortTitle: 'Fridges', description: 'Double door frost-free smart inverter fridges.', image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80', itemCount: '14+ Units', productFilterTerm: 'refrigerator' },
        { id: 'sub-maj-ac', slug: 'air-conditioners', name: 'Inverter Air Conditioners', shortTitle: 'Air Conditioners', description: '1.5 Ton 5-star copper condenser split ACs.', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', itemCount: '10+ ACs', productFilterTerm: 'ac' },
      ],
    },
  ],
};

// =========================================================================
// 6. TOYS & GAMES
// =========================================================================
const TOYS_GAMES_CONFIG: CategoryConfig = {
  id: 'cat-toys-games',
  slug: 'toys-games',
  name: 'Toys & Games',
  shortName: 'Toys & Games',
  tagline: 'STEM Learning Kits, Board Games & Action Collectibles',
  description: 'Fuel curiosity and creative play with construction blocks, puzzle sets, and RC vehicles.',
  heroBanner: {
    title: 'Imagination, Learning & Endless Play',
    subtitle: 'Safe non-toxic materials, creative STEM building blocks & strategy board games for the family.',
    tag: 'KIDS WONDERLAND',
    discount: 'FLAT 30% - 50% OFF',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#431407] via-[#9A3412] to-[#EA580C]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#EA580C',
  sections: [
    {
      id: 'sec-toy-learn',
      slug: 'learning-toys',
      title: 'Learning & Building Toys',
      shortTitle: 'Learning',
      subtitle: 'Building blocks, robotic STEM kits & jigsaw puzzles',
      description: 'Develop critical thinking and fine motor skills.',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
      itemCount: '45+ Sets',
      accentColor: '#EA580C',
      subcategories: [
        { id: 'sub-toy-blk', slug: 'building-blocks', name: 'Building Blocks & LEGO', shortTitle: 'Blocks', description: 'Architecture & city construction sets.', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=400&q=80', badge: 'Popular', itemCount: '20+ Sets', productFilterTerm: 'toy' },
        { id: 'sub-toy-stm', slug: 'educational-toys', name: 'STEM Educational Toys', shortTitle: 'STEM Kits', description: 'Coding & robotics kits for budding minds.', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Kits', productFilterTerm: 'educational' },
        { id: 'sub-toy-puz', slug: 'puzzles', name: 'Puzzles & Brainteasers', shortTitle: 'Puzzles', description: '1000-piece landscape jigsaw puzzles.', image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Puzzles', productFilterTerm: 'puzzle' },
      ],
    },
    {
      id: 'sec-toy-fun',
      slug: 'action-games',
      title: 'Action Figures & Board Games',
      shortTitle: 'Games & RC',
      subtitle: 'Remote control cars, strategy board games & soft toys',
      description: 'Exciting outdoor and tabletop fun for kids and adults alike.',
      image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Games',
      accentColor: '#EA580C',
      subcategories: [
        { id: 'sub-act-brd', slug: 'board-games', name: 'Family Board Games', shortTitle: 'Board Games', description: 'Classic Monopoly, Scrabble, Chess & Catan.', image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80', itemCount: '22+ Games', productFilterTerm: 'board game' },
        { id: 'sub-act-rc', slug: 'remote-control', name: 'Remote Control Cars & Drones', shortTitle: 'RC Toys', description: '4WD high-speed all-terrain monster trucks.', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=400&q=80', itemCount: '16+ Vehicles', productFilterTerm: 'rc toy' },
        { id: 'sub-act-sft', slug: 'soft-toys', name: 'Plush & Soft Toys', shortTitle: 'Plush Toys', description: 'Huggable super-soft velvet teddy bears.', image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Plushies', productFilterTerm: 'soft toy' },
      ],
    },
  ],
};

// =========================================================================
// 7. SPORTS & FITNESS
// =========================================================================
const SPORTS_FITNESS_CONFIG: CategoryConfig = {
  id: 'cat-sports-fitness',
  slug: 'sports-fitness',
  name: 'Sports & Fitness',
  shortName: 'Sports',
  tagline: 'Professional Gym Gear, Cricket, Badminton & Sportswear',
  description: 'Train harder with rubber hex dumbbells, high-grip yoga mats, and tournament-grade racquets.',
  heroBanner: {
    title: 'Crush Your Fitness Milestones',
    subtitle: 'Cast iron dumbbells, anti-burst gym balls, English willow cricket bats & aero racquets.',
    tag: 'FITNESS REVOLUTION',
    discount: 'UP TO 55% OFF',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#064E3B] via-[#047857] to-[#10B981]',
    badgeColor: 'bg-emerald-300 text-stone-950',
  },
  accentColor: '#10B981',
  sections: [
    {
      id: 'sec-spt-gym',
      slug: 'gym-equipment',
      title: 'Gym & Fitness Equipment',
      shortTitle: 'Gym Gear',
      subtitle: 'Hex dumbbells, resistance tubes, yoga mats & cardio accessories',
      description: 'Build your home gym with durable, non-slip equipment.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Fitness Gear',
      accentColor: '#10B981',
      subcategories: [
        { id: 'sub-gym-dmb', slug: 'dumbbells', name: 'Dumbbells & Weights', shortTitle: 'Dumbbells', description: 'Rubber encased cast iron hex dumbbells.', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80', badge: 'Heavy Duty', itemCount: '20+ Sets', productFilterTerm: 'fitness' },
        { id: 'sub-gym-yog', slug: 'yoga-mats', name: 'Yoga Mats & Bands', shortTitle: 'Yoga Mats', description: '6mm extra-thick anti-tear TPE exercise mats.', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Mats', productFilterTerm: 'yoga' },
        { id: 'sub-gym-acc', slug: 'cardio-equipment', name: 'Cardio & Treadmills', shortTitle: 'Cardio', description: 'Foldable motorized treadmills & spin bikes.', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Units', productFilterTerm: 'fitness' },
      ],
    },
    {
      id: 'sec-spt-outdoor',
      slug: 'outdoor-sports',
      title: 'Cricket, Badminton & Football',
      shortTitle: 'Sports Gear',
      subtitle: 'Willow bats, carbon fiber badminton racquets & tournament balls',
      description: 'Precision sporting equipment for competitive champions.',
      image: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=600&q=80',
      itemCount: '60+ Sports Items',
      accentColor: '#10B981',
      subcategories: [
        { id: 'sub-spt-crk', slug: 'cricket', name: 'Cricket Equipment', shortTitle: 'Cricket', description: 'English willow bats, leather balls & batting pads.', image: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80', badge: 'Tournament Grade', itemCount: '25+ Items', productFilterTerm: 'cricket' },
        { id: 'sub-spt-bad', slug: 'badminton', name: 'Badminton Racquets & Shuttles', shortTitle: 'Badminton', description: 'Isometric full graphite lightweight racquets.', image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Racquets', productFilterTerm: 'badminton' },
        { id: 'sub-spt-ftb', slug: 'football', name: 'Football & Outdoor Sports', shortTitle: 'Football', description: 'FIFA quality thermally bonded size-5 footballs.', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Balls', productFilterTerm: 'football' },
      ],
    },
  ],
};

// =========================================================================
// 8. BOOKS
// =========================================================================
const BOOKS_CONFIG: CategoryConfig = {
  id: 'cat-books',
  slug: 'books',
  name: 'Books',
  shortName: 'Books',
  tagline: 'Timeless Literature, Bestselling Fiction & Self-Growth',
  description: 'Immerse in captivating stories, financial wisdom, biographies, and academic entrance guides.',
  heroBanner: {
    title: 'Feed Your Curiosity & Mind',
    subtitle: 'New York Times bestsellers, psychology masterpieces, gripping thrillers & exam preparatory books.',
    tag: 'BOOK LOVERS EDIT',
    discount: 'FLAT 30% - 60% OFF',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#1E1B4B] via-[#312E81] to-[#4338CA]',
    badgeColor: 'bg-indigo-300 text-stone-950',
  },
  accentColor: '#4338CA',
  sections: [
    {
      id: 'sec-bk-fiction',
      slug: 'fiction-novels',
      title: 'Fiction, Novels & Literature',
      shortTitle: 'Fiction',
      subtitle: 'Mystery thrillers, historical fiction, contemporary romance & sci-fi',
      description: 'Page-turners from renowned Indian and international authors.',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      itemCount: '120+ Titles',
      accentColor: '#4338CA',
      subcategories: [
        { id: 'sub-fic-thr', slug: 'thrillers', name: 'Mystery & Thrillers', shortTitle: 'Thrillers', description: 'Fast-paced plot twists and detective investigative cases.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', badge: 'Bestseller', itemCount: '35+ Titles', productFilterTerm: 'book' },
        { id: 'sub-fic-cls', slug: 'classics', name: 'Literary Classics & Drama', shortTitle: 'Classics', description: 'Time-tested literary collector hardcovers.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Titles', productFilterTerm: 'book' },
        { id: 'sub-fic-rom', slug: 'romance', name: 'Romance & Fiction', shortTitle: 'Romance', description: 'Heartwarming romantic contemporary fiction.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', itemCount: '30+ Titles', productFilterTerm: 'book' },
      ],
    },
    {
      id: 'sec-bk-nonfic',
      slug: 'non-fiction-business',
      title: 'Self-Help, Business & Biographies',
      shortTitle: 'Non-Fiction',
      subtitle: 'Financial freedom, mindset mastery, productivity & founder stories',
      description: 'Practical playbooks and memoirs from global leaders.',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
      itemCount: '110+ Titles',
      accentColor: '#4338CA',
      subcategories: [
        { id: 'sub-non-slf', slug: 'self-help', name: 'Self-Help & Habits', shortTitle: 'Self-Help', description: 'Atomic behavioral change and mental strength.', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80', badge: 'Top Rated', itemCount: '40+ Titles', productFilterTerm: 'book' },
        { id: 'sub-non-biz', slug: 'business-investing', name: 'Business & Finance', shortTitle: 'Business', description: 'Wealth accumulation, investing & venture building.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', itemCount: '35+ Titles', productFilterTerm: 'book' },
        { id: 'sub-non-bio', slug: 'biographies', name: 'Biographies & Memoirs', shortTitle: 'Biographies', description: 'Authentic life lessons from visionary icons.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Titles', productFilterTerm: 'book' },
      ],
    },
  ],
};

// =========================================================================
// 9. FURNITURE
// =========================================================================
const FURNITURE_CONFIG: CategoryConfig = {
  id: 'cat-furniture',
  slug: 'furniture',
  name: 'Furniture',
  shortName: 'Furniture',
  tagline: 'Solid Sheesham Wood, Ergonomic Office & Living Collections',
  description: 'High-density foam sofas, solid wood beds, ergonomic mesh chairs, and compact storage.',
  heroBanner: {
    title: 'Solid Craftsmanship & Modern Comfort',
    subtitle: 'Termite-resistant Sheesham wood beds, lumbar-support ergonomic chairs & modular TV units.',
    tag: 'FURNITURE FESTIVAL',
    discount: 'UP TO 50% OFF',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#29180E] via-[#5C3217] to-[#B45309]',
    badgeColor: 'bg-amber-400 text-stone-950',
  },
  accentColor: '#B45309',
  sections: [
    {
      id: 'sec-fur-living',
      slug: 'living-room-furniture',
      title: 'Living Room & Seating',
      shortTitle: 'Living Room',
      subtitle: '3-seater fabric sofas, recliner armchairs, coffee tables & TV consoles',
      description: 'Lounge in supreme comfort with pet-friendly, stain-resistant fabrics.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      itemCount: '35+ Pieces',
      accentColor: '#B45309',
      subcategories: [
        { id: 'sub-fur-sof', slug: 'sofas', name: 'Sofas & Recliners', shortTitle: 'Sofas', description: 'Solid Sal wood frame 3-seater sofas.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80', badge: 'Top Seller', itemCount: '15+ Models', productFilterTerm: 'furniture' },
        { id: 'sub-fur-tbl', slug: 'tables', name: 'Coffee & Side Tables', shortTitle: 'Coffee Tables', description: 'Walnut finish center tables with storage drawers.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986b88?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Designs', productFilterTerm: 'table' },
        { id: 'sub-fur-tvu', slug: 'tv-units', name: 'TV Units & Consoles', shortTitle: 'TV Units', description: 'Wall mounted modular entertainment centers.', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80', itemCount: '8+ Units', productFilterTerm: 'furniture' },
      ],
    },
    {
      id: 'sec-fur-work',
      slug: 'office-study-furniture',
      title: 'Office, Study & Bedroom',
      shortTitle: 'Study & Bedroom',
      subtitle: 'Breathable ergonomic mesh chairs, study desks & king storage beds',
      description: 'Designed for healthy posture during 8+ hours of focused work.',
      image: 'https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?auto=format&fit=crop&w=600&q=80',
      itemCount: '40+ Furniture Items',
      accentColor: '#B45309',
      subcategories: [
        { id: 'sub-fur-chr', slug: 'office-chairs', name: 'Ergonomic Office Chairs', shortTitle: 'Office Chairs', description: 'High-back mesh chairs with dynamic lumbar support.', image: 'https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?auto=format&fit=crop&w=400&q=80', badge: 'Orthopedic', itemCount: '14+ Chairs', productFilterTerm: 'chair' },
        { id: 'sub-fur-dsk', slug: 'study-tables', name: 'Study Desks & Workstations', shortTitle: 'Study Tables', description: 'Scratch-resistant engineered wood computer desks.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Desks', productFilterTerm: 'table' },
        { id: 'sub-fur-bed', slug: 'beds', name: 'King & Queen Storage Beds', shortTitle: 'Beds', description: 'Hydraulic lift-on storage solid Sheesham beds.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80', itemCount: '10+ Beds', productFilterTerm: 'furniture' },
      ],
    },
  ],
};

// =========================================================================
// 10. GROCERIES
// =========================================================================
const GROCERIES_CONFIG: CategoryConfig = {
  id: 'cat-groceries',
  slug: 'groceries',
  name: 'Groceries',
  shortName: 'Groceries',
  tagline: 'Farm-Fresh Staples, Pure Ghee & Daily Essentials',
  description: 'Unpolished dals, cold-pressed mustard oil, whole wheat chakki atta, and gourmet nuts.',
  heroBanner: {
    title: 'Pure, Unadulterated Daily Nutrition',
    subtitle: 'Organic pulses, stone-ground flours, A2 desi cow ghee & vacuum-packed dry fruits.',
    tag: 'FARM FRESH ESSENTIALS',
    discount: 'UP TO 35% OFF',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#14532D] via-[#166534] to-[#15803D]',
    badgeColor: 'bg-emerald-300 text-stone-950',
  },
  accentColor: '#16A34A',
  sections: [
    {
      id: 'sec-grc-staples',
      slug: 'staples-dals',
      title: 'Flours, Rice & Unpolished Dals',
      shortTitle: 'Staples',
      subtitle: 'Chakki fresh atta, aged Basmati rice & organic pulses',
      description: 'Zero artificial preservatives, 100% natural crop origin.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80',
      itemCount: '60+ Staples',
      accentColor: '#16A34A',
      subcategories: [
        { id: 'sub-grc-ric', slug: 'rice-grains', name: 'Aged Basmati Rice', shortTitle: 'Basmati Rice', description: 'Long-grain royal aromatic aged basmati.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80', badge: 'Grade A', itemCount: '15+ Packs', productFilterTerm: 'grocery' },
        { id: 'sub-grc-att', slug: 'flours', name: 'Whole Wheat Chakki Atta', shortTitle: 'Atta & Flours', description: '100% whole grain stone-milled dietary fiber atta.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Varieties', productFilterTerm: 'grocery' },
        { id: 'sub-grc-dal', slug: 'pulses', name: 'Unpolished Toor & Moong Dal', shortTitle: 'Dals', description: 'Clean sorted protein-rich unpolished lentils.', image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Dals', productFilterTerm: 'grocery' },
      ],
    },
    {
      id: 'sec-grc-oils',
      slug: 'oils-ghee-dryfruits',
      title: 'Oils, Pure Ghee & Dry Fruits',
      shortTitle: 'Oils & Dry Fruits',
      subtitle: 'Cold-pressed mustard oil, A2 cow ghee, cashews & almonds',
      description: 'Traditional kachi ghani extractions and California almonds.',
      image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80',
      itemCount: '50+ Items',
      accentColor: '#16A34A',
      subcategories: [
        { id: 'sub-grc-oil', slug: 'oils-ghee', name: 'Cold Pressed Oils & Ghee', shortTitle: 'Ghee & Oils', description: 'Traditional bilona churned A2 Vedic cow ghee.', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80', badge: 'A2 Vedic', itemCount: '18+ Oils', productFilterTerm: 'grocery' },
        { id: 'sub-grc-dry', slug: 'dry-fruits', name: 'Almonds, Walnuts & Cashews', shortTitle: 'Dry Fruits', description: 'Crisp California almonds and jumbo Afghan cashews.', image: 'https://images.unsplash.com/photo-1509912760195-4f40f0653600?auto=format&fit=crop&w=400&q=80', itemCount: '22+ Packs', productFilterTerm: 'grocery' },
        { id: 'sub-grc-spc', slug: 'spices', name: 'Whole & Ground Spices', shortTitle: 'Spices', description: 'Aromatic Malabar black pepper & turmeric powder.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Spices', productFilterTerm: 'spice' },
      ],
    },
  ],
};

// =========================================================================
// 11. AUTOMOTIVE
// =========================================================================
const AUTOMOTIVE_CONFIG: CategoryConfig = {
  id: 'cat-automotive',
  slug: 'automotive',
  name: 'Automotive',
  shortName: 'Automotive',
  tagline: 'Smart Vehicle Dashcams, Car Care & Riding Gear',
  description: 'Equip your ride with dual-channel dashcams, ceramic waxes, and ISI certified helmets.',
  heroBanner: {
    title: 'Drive Safe & Maintain Peak Performance',
    subtitle: '4K dual-channel night-vision dashcams, tire inflators, car vacuum cleaners & riding gloves.',
    tag: 'AUTO CARE ZONE',
    discount: 'UP TO 40% OFF',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#18181B] via-[#27272A] to-[#DC2626]',
    badgeColor: 'bg-red-500 text-white',
  },
  accentColor: '#DC2626',
  sections: [
    {
      id: 'sec-aut-tech',
      slug: 'car-electronics',
      title: 'Car Electronics & Gadgets',
      shortTitle: 'Car Electronics',
      subtitle: 'Dual-camera dashcams, fast QC car chargers & tire inflators',
      description: 'Connected in-car tech for peace of mind on Indian highways.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      itemCount: '40+ Gadgets',
      accentColor: '#DC2626',
      subcategories: [
        { id: 'sub-aut-cam', slug: 'dash-cams', name: '4K GPS Dashcams', shortTitle: 'Dashcams', description: 'Sony Starvis sensor with 24h parking monitor.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', badge: 'Sony Sensor', itemCount: '12+ Models', productFilterTerm: 'auto' },
        { id: 'sub-aut-inf', slug: 'tire-inflators', name: 'Digital Tire Inflators', shortTitle: 'Inflators', description: '150 PSI cordless auto-cutoff electric pumps.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', itemCount: '10+ Models', productFilterTerm: 'auto' },
        { id: 'sub-aut-chg', slug: 'car-chargers', name: 'Fast Car Chargers', shortTitle: 'Car Chargers', description: '65W dual Type-C laptop and phone plugs.', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Items', productFilterTerm: 'auto' },
      ],
    },
    {
      id: 'sec-aut-care',
      slug: 'car-care-gear',
      title: 'Car Cleaning & Motorcycle Gear',
      shortTitle: 'Care & Riding',
      subtitle: 'Ceramic coatings, foam wash shampoos, riding jackets & helmets',
      description: 'Showroom shine maintenance and DOT-certified rider safety.',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
      itemCount: '45+ Products',
      accentColor: '#DC2626',
      subcategories: [
        { id: 'sub-aut-hlm', slug: 'helmets', name: 'Motorcycle Helmets & Gloves', shortTitle: 'Helmets', description: 'ISI & DOT full-face aerodynamic helmets.', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80', badge: 'DOT Certified', itemCount: '18+ Styles', productFilterTerm: 'auto' },
        { id: 'sub-aut-wax', slug: 'car-wash', name: 'Ceramic Wax & Polish', shortTitle: 'Car Care', description: 'Hydrophobic spray ceramic detailer gloss.', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Kits', productFilterTerm: 'auto' },
        { id: 'sub-aut-cov', slug: 'vehicle-covers', name: 'All-Weather Vehicle Covers', shortTitle: 'Covers', description: '100% waterproof UV reflective car & bike tarps.', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Sizes', productFilterTerm: 'auto' },
      ],
    },
  ],
};

// =========================================================================
// 12. BABY CARE
// =========================================================================
const BABY_CARE_CONFIG: CategoryConfig = {
  id: 'cat-baby-care',
  slug: 'baby-care',
  name: 'Baby Care',
  shortName: 'Baby Care',
  tagline: 'Gentle Organic Cotton, Sensitive Skincare & Strollers',
  description: 'Toxin-free hypoallergenic baby washes, anti-colic feeding bottles, and feather-soft diapers.',
  heroBanner: {
    title: 'Purest Care For Your Little One',
    subtitle: 'Pediatrician certified organic cotton rompers, fragrance-free wipes & multi-recline strollers.',
    tag: 'NEW MOM & BABY SPECIAL',
    discount: 'FLAT 35% - 50% OFF',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#0C4A6E] via-[#0284C7] to-[#38BDF8]',
    badgeColor: 'bg-sky-200 text-sky-950',
  },
  accentColor: '#0284C7',
  sections: [
    {
      id: 'sec-bby-daily',
      slug: 'diapering-skincare',
      title: 'Diapering & Gentle Skincare',
      shortTitle: 'Diapers & Skin',
      subtitle: 'Tape diapers, 99% pure water wipes, baby massage oil & wash',
      description: 'Keep delicate baby skin dry, rash-free, and nourished.',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
      itemCount: '40+ Essentials',
      accentColor: '#0284C7',
      subcategories: [
        { id: 'sub-bby-dip', slug: 'diapers', name: 'Feather-Soft Pant Diapers', shortTitle: 'Diapers', description: '12-hour leak-lock bubble breathable pants.', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80', badge: '12H LeakLock', itemCount: '15+ Sizes', productFilterTerm: 'baby' },
        { id: 'sub-bby-wip', slug: 'baby-wipes', name: '99% Pure Water Wipes', shortTitle: 'Baby Wipes', description: 'Zero fragrance coconut water thick wipes.', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80', itemCount: '12+ Packs', productFilterTerm: 'baby' },
        { id: 'sub-bby-oil', slug: 'baby-skincare', name: 'Organic Almond Baby Oil & Wash', shortTitle: 'Baby Bath', description: 'Tears-free pH 5.5 natural botanical body wash.', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=400&q=80', itemCount: '16+ Lotions', productFilterTerm: 'baby' },
      ],
    },
    {
      id: 'sec-bby-gear',
      slug: 'feeding-gear',
      title: 'Feeding Bottles & Strollers',
      shortTitle: 'Gear & Feeding',
      subtitle: 'BPA-free glass bottles, compact fold strollers & carriers',
      description: 'Ergonomic baby mobility and safe feeding systems.',
      image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
      itemCount: '35+ Gear Finds',
      accentColor: '#0284C7',
      subcategories: [
        { id: 'sub-bby-bot', slug: 'feeding-bottles', name: 'Anti-Colic Feeding Bottles', shortTitle: 'Feeding', description: 'Medical grade borosilicate glass bottles.', image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=400&q=80', badge: 'BPA Free', itemCount: '14+ Bottles', productFilterTerm: 'baby' },
        { id: 'sub-bby-str', slug: 'strollers', name: 'Travel Lightweight Strollers', shortTitle: 'Strollers', description: 'One-hand compact airplane cabin strollers.', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80', itemCount: '10+ Models', productFilterTerm: 'baby' },
        { id: 'sub-bby-clo', slug: 'baby-clothing', name: 'Organic Cotton Onesies', shortTitle: 'Baby Clothing', description: 'GOTS certified combed cotton footie rompers.', image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Outfits', productFilterTerm: 'baby' },
      ],
    },
  ],
};

// =========================================================================
// 13. PET SUPPLIES
// =========================================================================
const PET_SUPPLIES_CONFIG: CategoryConfig = {
  id: 'cat-pet-supplies',
  slug: 'pet-supplies',
  name: 'Pet Supplies',
  shortName: 'Pet Supplies',
  tagline: 'Vet-Formulated Dog & Cat Nutrition, Toys & Beds',
  description: 'Grain-free kibble, dental treats, anti-chew plush toys, and orthopedic memory foam beds.',
  heroBanner: {
    title: 'Happy, Healthy & Playful Pets',
    subtitle: 'High-protein grain-free pet food, non-clumping bentonite litter & grooming accessories.',
    tag: 'PET PARADISE',
    discount: 'UP TO 40% OFF',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#7C2D12] via-[#C2410C] to-[#F97316]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#F97316',
  sections: [
    {
      id: 'sec-pet-food',
      slug: 'dog-cat-food',
      title: 'Dog & Cat Food & Treats',
      shortTitle: 'Food & Treats',
      subtitle: 'Real chicken kibble, salmon gravy pouches & calcium bones',
      description: 'Wholesome natural ingredients for glossy coats and vitality.',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=600&q=80',
      itemCount: '45+ Food Items',
      accentColor: '#F97316',
      subcategories: [
        { id: 'sub-pet-dog', slug: 'dog-food', name: 'Real Meat Dog Food', shortTitle: 'Dog Food', description: 'Chicken and brown rice dry kibble formula.', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80', badge: 'High Protein', itemCount: '20+ Packs', productFilterTerm: 'pet' },
        { id: 'sub-pet-cat', slug: 'cat-food', name: 'Gourmet Cat Food & Gravy', shortTitle: 'Cat Food', description: 'Tuna & salmon in jelly pouches for adult cats.', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Packs', productFilterTerm: 'pet' },
        { id: 'sub-pet-trt', slug: 'pet-treats', name: 'Dental Sticks & Treats', shortTitle: 'Treats', description: 'Natural calcium bone treats for clean teeth.', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=400&q=80', itemCount: '18+ Treats', productFilterTerm: 'pet' },
      ],
    },
    {
      id: 'sec-pet-gear',
      slug: 'beds-leashes-grooming',
      title: 'Beds, Leashes & Grooming',
      shortTitle: 'Beds & Care',
      subtitle: 'Orthopedic memory foam beds, reflective harness & slicker brushes',
      description: 'Comfort and safety for walks, lounging, and bath sessions.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80',
      itemCount: '35+ Care Items',
      accentColor: '#F97316',
      subcategories: [
        { id: 'sub-pet-bed', slug: 'pet-beds', name: 'Orthopedic Pet Beds', shortTitle: 'Pet Beds', description: 'Machine washable anti-skid memory foam beds.', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=400&q=80', badge: 'Orthopedic', itemCount: '12+ Sizes', productFilterTerm: 'pet' },
        { id: 'sub-pet-lsh', slug: 'collars-leashes', name: 'Padded Collars & Leashes', shortTitle: 'Leashes', description: 'Reflective nylon harness with heavy duty clips.', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80', itemCount: '15+ Styles', productFilterTerm: 'pet' },
        { id: 'sub-pet-toy', slug: 'pet-toys', name: 'Chew Toys & Cat Scratchers', shortTitle: 'Pet Toys', description: 'Durable natural rubber interactive treat toys.', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=400&q=80', itemCount: '16+ Toys', productFilterTerm: 'pet' },
      ],
    },
  ],
};

// =========================================================================
// 14. JEWELLERY (Standalone)
// =========================================================================
const JEWELLERY_CONFIG: CategoryConfig = {
  id: 'cat-jewellery',
  slug: 'jewellery',
  name: 'Jewellery',
  shortName: 'Jewellery',
  tagline: 'Precious Silver, Kundan Chokers & Diamond Solitaires',
  description: 'Handcrafted hallmarked 925 sterling silver, heritage Kundan sets, and certified solitaire rings.',
  heroBanner: {
    title: 'Timeless Radiance & Master Craftsmanship',
    subtitle: '925 sterling silver anklets, 24K gold plated choker sets & certified moissanite solitaires.',
    tag: 'FESTIVE JEWELLERY SPECIAL',
    discount: 'FLAT 30% - 50% OFF',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#2E1065] via-[#581C87] to-[#7E22CE]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#7E22CE',
  sections: [
    {
      id: 'sec-jwl-neck',
      slug: 'necklaces-earrings',
      title: 'Necklaces & Designer Earrings',
      shortTitle: 'Necklaces & Earrings',
      subtitle: 'Kundan bridal sets, pearl chokers, jhumkas & solitaire studs',
      description: 'Showstopping focal pieces for celebrations and weddings.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
      itemCount: '70+ Designs',
      accentColor: '#7E22CE',
      subcategories: [
        { id: 'sub-jwl-ear', slug: 'earrings', name: 'Jhumkas & Stud Earrings', shortTitle: 'Earrings', description: 'Intricate meenakari chandbalis & cubic zirconia studs.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80', badge: 'Handcrafted', itemCount: '30+ Styles', productFilterTerm: 'earrings' },
        { id: 'sub-jwl-nck', slug: 'necklaces', name: 'Choker & Necklace Sets', shortTitle: 'Necklaces', description: 'Gold plated multi-strand Kundan bridal chokers.', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80', badge: 'Bridal Pick', itemCount: '25+ Sets', productFilterTerm: 'necklace' },
        { id: 'sub-jwl-pnd', slug: 'pendants', name: 'Solitaire Pendants & Chains', shortTitle: 'Pendants', description: '925 silver delicate everyday shimmer pendants.', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Styles', productFilterTerm: 'pendant' },
      ],
    },
    {
      id: 'sec-jwl-wrist',
      slug: 'rings-bangles-anklets',
      title: 'Rings, Bangles & Silver Anklets',
      shortTitle: 'Rings & Bangles',
      subtitle: '925 pure silver payals, stone studded cocktail rings & kadas',
      description: 'Delicate wrist and feet embellishments for graceful elegance.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      itemCount: '60+ Pieces',
      accentColor: '#7E22CE',
      subcategories: [
        { id: 'sub-jwl-rng', slug: 'rings', name: 'Cocktail & Solitaire Rings', shortTitle: 'Rings', description: 'Rhodium finished adjustable sterling silver rings.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80', itemCount: '25+ Rings', productFilterTerm: 'ring' },
        { id: 'sub-jwl-bng', slug: 'bangles', name: 'Kadas & Designer Bangles', shortTitle: 'Bangles', description: 'Traditional brass and matte gold temple kadas.', image: 'https://images.unsplash.com/photo-1611591475879-1662df943509?auto=format&fit=crop&w=400&q=80', itemCount: '20+ Pairs', productFilterTerm: 'bangles' },
        { id: 'sub-jwl-ank', slug: 'anklets', name: 'Hallmarked Silver Anklets', shortTitle: 'Anklets', description: 'Oxidized silver ghungroo payal sets.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80', itemCount: '16+ Sets', productFilterTerm: 'anklet' },
      ],
    },
  ],
};

// =========================================================================
// 15. GIFT CARDS
// =========================================================================
const GIFT_CARDS_CONFIG: CategoryConfig = {
  id: 'cat-gift-cards',
  slug: 'gift-cards',
  name: 'Gift Cards',
  shortName: 'Gift Cards',
  tagline: 'Instant Digital E-Gift Cards & Brand Vouchers',
  description: 'Delivered in seconds via email & SMS with custom greetings and celebration themes.',
  heroBanner: {
    title: 'Give The Gift of Infinite Choices',
    subtitle: 'HAATZA universal shopping gift cards, brand e-vouchers & customized festive greeting vouchers.',
    tag: 'INSTANT DIGITAL DELIVERY',
    discount: 'NO EXPIRY FEES',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'from-[#311042] via-[#581C87] to-[#A21CAF]',
    badgeColor: 'bg-amber-300 text-stone-950',
  },
  accentColor: '#A21CAF',
  sections: [
    {
      id: 'sec-gc-types',
      slug: 'shopping-cards',
      title: 'Universal & Brand Vouchers',
      shortTitle: 'Vouchers',
      subtitle: 'HAATZA marketplace vouchers, fashion gift cards & dining vouchers',
      description: 'Usable across 50,000+ products with 1-click checkout redemption.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      itemCount: '25+ Vouchers',
      accentColor: '#A21CAF',
      subcategories: [
        { id: 'sub-gc-uni', slug: 'shopping-gift-cards', name: 'Universal Shopping Cards', shortTitle: 'Universal Card', description: 'Redeemable across all marketplace departments.', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80', badge: 'Most Popular', itemCount: 'Denominations ₹500 - ₹10,000', productFilterTerm: 'gift card' },
        { id: 'sub-gc-fsh', slug: 'fashion-gift-cards', name: 'Fashion & Apparel Cards', shortTitle: 'Fashion Cards', description: 'Valid on Men and Women designer collections.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80', itemCount: 'Denominations ₹1000 - ₹5000', productFilterTerm: 'gift card' },
        { id: 'sub-gc-elc', slug: 'electronics-gift-cards', name: 'Electronics & Tech Cards', shortTitle: 'Tech Cards', description: 'For smartphones, laptops, and studio audio.', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', itemCount: 'Denominations ₹2000 - ₹25,000', productFilterTerm: 'gift card' },
        { id: 'sub-gc-fes', slug: 'festive-gift-cards', name: 'Diwali & Wedding Cards', shortTitle: 'Festive Cards', description: 'Custom gold foil digital greetings included.', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&q=80', badge: 'Festive Theme', itemCount: 'Custom Value', productFilterTerm: 'gift card' },
      ],
    },
  ],
};

// =========================================================================
// MASTER CONFIGURATION MAP FOR ALL CATEGORIES
// =========================================================================
export const CATEGORY_CONFIG_MAP: Record<string, CategoryConfig> = {
  electronics: ELECTRONICS_CONFIG,
  mobiles: MOBILES_CONFIG,
  'home-living': HOME_LIVING_CONFIG,
  beauty: BEAUTY_CONFIG,
  appliances: APPLIANCES_CONFIG,
  'toys-games': TOYS_GAMES_CONFIG,
  'sports-fitness': SPORTS_FITNESS_CONFIG,
  books: BOOKS_CONFIG,
  furniture: FURNITURE_CONFIG,
  groceries: GROCERIES_CONFIG,
  automotive: AUTOMOTIVE_CONFIG,
  'baby-care': BABY_CARE_CONFIG,
  'pet-supplies': PET_SUPPLIES_CONFIG,
  jewellery: JEWELLERY_CONFIG,
  jewelry: JEWELLERY_CONFIG,
  'gift-cards': GIFT_CARDS_CONFIG,
};

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  if (!slug) return undefined;
  const norm = slug.toLowerCase().trim();
  return CATEGORY_CONFIG_MAP[norm];
}

export function getCategorySection(catSlug: string, sectionSlug: string): CategoryMajorSection | undefined {
  const cat = getCategoryConfig(catSlug);
  if (!cat) return undefined;
  const norm = sectionSlug.toLowerCase().trim();
  return cat.sections.find(
    (s) => s.slug === norm || s.aliases?.some((a) => a.toLowerCase() === norm)
  );
}

export function getCategorySubcategory(catSlug: string, sectionSlug: string, itemSlug: string): CategorySubItem | undefined {
  const sec = getCategorySection(catSlug, sectionSlug);
  if (!sec) return undefined;
  const norm = itemSlug.toLowerCase().trim();
  return sec.subcategories.find(
    (s) => s.slug === norm || s.aliases?.some((a) => a.toLowerCase() === norm)
  );
}
