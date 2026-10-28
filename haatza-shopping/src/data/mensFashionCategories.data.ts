export interface FashionCategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  badge?: string;
  itemCount?: string;
}

export interface FashionCategoryGroup {
  id: string;
  title: string;
  description: string;
  tag: string;
  accentColor?: string;
  categories: FashionCategoryItem[];
}

export const MENS_FASHION_CATEGORY_GROUPS: FashionCategoryGroup[] = [
  // ==========================================
  // GROUP A: MEN'S CLOTHING (14 CATEGORIES)
  // ==========================================
  {
    id: 'group-mens-clothing',
    title: "Men's Clothing",
    description: 'Everyday staples, tailored silhouettes, and statement occasion-wear for men.',
    tag: "14 CATEGORIES",
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-mens-shirts',
        name: "Men's Shirts",
        description: 'Everyday essentials, smart fits, and occasion-ready styles.',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Shirts',
        badge: 'Bestseller',
        itemCount: '120+ Styles',
      },
      {
        id: 'cat-mens-innerwear',
        name: "Men's Innerwear",
        description: 'Briefs, underwear, and breathable cotton vests.',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Innerwear',
        itemCount: '80+ Styles',
      },
      {
        id: 'cat-mens-trackpants',
        name: "Men's Track Pants & Tracksuits",
        description: 'Comfort-stretch athletic wear for training and lounging.',
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Track+Pants',
        badge: 'Activewear',
        itemCount: '65+ Styles',
      },
      {
        id: 'cat-mens-trousers',
        name: "Men's Trousers & Pants",
        description: 'Tailored formal trousers, chinos, and modern stretch pants.',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Trousers',
        itemCount: '90+ Styles',
      },
      {
        id: 'cat-mens-kurtas',
        name: "Men's Kurtas",
        description: 'Traditional silhouettes, festive embroidery, and contemporary fits.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Kurtas',
        badge: 'Festive',
        itemCount: '75+ Styles',
      },
      {
        id: 'cat-mens-shorts',
        name: "Men's Shorts",
        description: 'Breathable casual, denim, and workout shorts.',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Shorts',
        itemCount: '55+ Styles',
      },
      {
        id: 'cat-mens-jeans',
        name: "Men's Jeans",
        description: 'Slim, regular, and relaxed-fit denim in classic washes.',
        image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Jeans',
        badge: 'Trending',
        itemCount: '110+ Styles',
      },
      {
        id: 'cat-mens-nightwear',
        name: "Men's Nightwear",
        description: 'Ultra-soft cotton pyjamas, lounge sets, and sleep shirts.',
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Nightwear',
        itemCount: '45+ Styles',
      },
      {
        id: 'cat-mens-formalwear',
        name: "Men's Formal Wear",
        description: 'Crisp blazers, executive shirts, and sharp boardroom suits.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Formal+Wear',
        badge: 'Executive',
        itemCount: '85+ Styles',
      },
      {
        id: 'cat-mens-casualwear',
        name: "Men's Casual Wear",
        description: 'Relaxed polos, graphic tees, and effortless weekend fits.',
        image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Casual+Wear',
        itemCount: '150+ Styles',
      },
      {
        id: 'cat-mens-jackets',
        name: "Men's Jackets",
        description: 'Bombers, windbreakers, denim jackets, and winter coats.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Jackets',
        badge: 'Winter Edit',
        itemCount: '60+ Styles',
      },
      {
        id: 'cat-mens-sweatshirts',
        name: "Men's Sweatshirts",
        description: 'Cozy fleece hoodies, crewnecks, and pullover sweatshirts.',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Sweatshirts',
        itemCount: '70+ Styles',
      },
      {
        id: 'cat-mens-cargopants',
        name: "Men's Cargo Pants",
        description: 'Utility pocket pants engineered for comfort and durability.',
        image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Cargo+Pants',
        badge: 'Streetwear',
        itemCount: '50+ Styles',
      },
      {
        id: 'cat-mens-kurtapajamas',
        name: "Men's Kurta Pajamas",
        description: 'Regal ethnic sets for weddings, celebrations, and festive gatherings.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Kurta+Pajamas',
        badge: 'Wedding',
        itemCount: '65+ Styles',
      },
    ],
  },

  // ==========================================
  // GROUP B: KIDS' WEAR (12 CATEGORIES)
  // ==========================================
  {
    id: 'group-kids-wear',
    title: "Kids' Wear",
    description: "Vibrant, durable, and playful fashion crafted with gentle fabrics for boys and girls.",
    tag: "12 CATEGORIES",
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-boys-clothing',
        name: "Boys' Clothing",
        description: 'Smart casuals, festive sets, and activewear for boys.',
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Boys+Clothing',
        badge: 'Popular',
        itemCount: '95+ Styles',
      },
      {
        id: 'cat-girls-clothing',
        name: "Girls' Clothing",
        description: 'Vibrant frocks, ethnic wear, and trendy daily sets for girls.',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Girls+Clothing',
        badge: 'Popular',
        itemCount: '110+ Styles',
      },
      {
        id: 'cat-kids-tshirts',
        name: "Kids' T-shirts & Tops",
        description: 'Fun prints, 100% combed cotton, and everyday play tops.',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Tshirts',
        itemCount: '130+ Styles',
      },
      {
        id: 'cat-kids-shirts',
        name: "Kids' Shirts",
        description: 'Classic checks, button-downs, and party-wear shirts.',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Shirts',
        itemCount: '60+ Styles',
      },
      {
        id: 'cat-kids-jeans-trousers',
        name: "Kids' Jeans & Trousers",
        description: 'Flexible elastic waists and durable stretch denim.',
        image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Jeans',
        itemCount: '75+ Styles',
      },
      {
        id: 'cat-kids-shorts',
        name: "Kids' Shorts",
        description: 'Cool bermudas and lightweight summer cotton shorts.',
        image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Shorts',
        itemCount: '50+ Styles',
      },
      {
        id: 'cat-kids-ethnicwear',
        name: "Kids' Ethnic Wear",
        description: 'Sherwanis, lehenga sets, and festive dhotis for kids.',
        image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Ethnic+Wear',
        badge: 'Festive',
        itemCount: '65+ Styles',
      },
      {
        id: 'cat-kids-dresses',
        name: "Kids' Dresses",
        description: 'Party dresses, floral twirl frocks, and celebration wear.',
        image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5c1?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Dresses',
        badge: 'Party Wear',
        itemCount: '80+ Styles',
      },
      {
        id: 'cat-kids-nightwear',
        name: "Kids' Nightwear",
        description: 'Organic cotton sleepwear sets with whimsical bedtime prints.',
        image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Nightwear',
        itemCount: '40+ Styles',
      },
      {
        id: 'cat-kids-jackets-sweatshirts',
        name: "Kids' Jackets & Sweatshirts",
        description: 'Warm winter layers, cute fleece jackets, and hooded pullovers.',
        image: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Jackets',
        itemCount: '45+ Styles',
      },
      {
        id: 'cat-kids-clothingsets',
        name: "Kids' Clothing Sets",
        description: 'Coordinated top-and-bottom matching sets for easy dressing.',
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Clothing+Sets',
        badge: 'Value Pack',
        itemCount: '70+ Styles',
      },
      {
        id: 'cat-kids-shoes',
        name: "Kids' Shoes",
        description: 'Light-up sneakers, slip-on loafers, and comfy school shoes.',
        image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Kids+Shoes',
        itemCount: '60+ Styles',
      },
    ],
  },

  // ==========================================
  // GROUP C: WATCHES (6 CATEGORIES)
  // ==========================================
  {
    id: 'group-watches',
    title: 'Watches',
    description: 'Precision timekeeping from minimalist dress watches to rugged sports dials.',
    tag: '6 CATEGORIES',
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-mens-analog-watches',
        name: "Men's Analog Watches",
        description: 'Timeless dials, stainless steel links, and leather straps.',
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Analog+Watches',
        badge: 'Classic',
        itemCount: '75+ Models',
      },
      {
        id: 'cat-mens-digital-watches',
        name: "Men's Digital Watches",
        description: 'Rugged retro displays with chronographs and backlight.',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Digital+Watches',
        itemCount: '40+ Models',
      },
      {
        id: 'cat-smartwatches',
        name: 'Smartwatches',
        description: 'AMOLED touch displays, health sensors, and Bluetooth calling.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Smartwatches',
        badge: 'Tech Hot',
        itemCount: '65+ Models',
      },
      {
        id: 'cat-sports-watches',
        name: 'Sports Watches',
        description: 'Water-resistant performance timepieces with lap timers.',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Sports+Watches',
        itemCount: '35+ Models',
      },
      {
        id: 'cat-casual-watches',
        name: 'Casual Watches',
        description: 'Minimalist dials for weekend outings and daily office wear.',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Casual+Watches',
        itemCount: '50+ Models',
      },
      {
        id: 'cat-formal-watches',
        name: 'Formal Watches',
        description: 'Sleek dress watches with ultra-slim cases and rose gold accents.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Formal+Watches',
        badge: 'Luxury',
        itemCount: '45+ Models',
      },
    ],
  },

  // ==========================================
  // GROUP D: MEN'S FOOTWEAR (7 CATEGORIES)
  // ==========================================
  {
    id: 'group-mens-footwear',
    title: "Men's Footwear",
    description: 'Engineered for comfort and modern style, from city sneakers to boardroom oxfords.',
    tag: '7 CATEGORIES',
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-mens-casual-shoes',
        name: "Men's Casual Shoes",
        description: 'Versatile boat shoes, driving moccasins, and slip-ons.',
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Casual+Shoes',
        badge: 'Comfort',
        itemCount: '85+ Styles',
      },
      {
        id: 'cat-sports-running-shoes',
        name: 'Sports Shoes & Running Shoes',
        description: 'Responsive cushioning and breathable mesh for running.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Running+Shoes',
        badge: 'Performance',
        itemCount: '120+ Styles',
      },
      {
        id: 'cat-formal-shoes',
        name: 'Formal Shoes',
        description: 'Handcrafted Oxford, Derby, and monk-strap leather shoes.',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Formal+Shoes',
        badge: 'Executive',
        itemCount: '60+ Styles',
      },
      {
        id: 'cat-sneakers',
        name: 'Sneakers',
        description: 'Retro court sneakers, high-tops, and modern street runners.',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Sneakers',
        badge: 'Trending',
        itemCount: '140+ Styles',
      },
      {
        id: 'cat-clogs',
        name: 'Clogs',
        description: 'Lightweight EVA waterproof clogs with pivoting heel straps.',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Clogs',
        itemCount: '30+ Styles',
      },
      {
        id: 'cat-sandals',
        name: 'Sandals',
        description: 'Ergonomic leather strap sandals and trekking floaters.',
        image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Sandals',
        itemCount: '45+ Styles',
      },
      {
        id: 'cat-slippers-dailywear',
        name: 'Slippers & Daily-Wear Footwear',
        description: 'Ultra-cushioned comfort sliders and house flip-flops.',
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Slippers',
        itemCount: '55+ Styles',
      },
    ],
  },

  // ==========================================
  // GROUP E: JEWELRY & ACCESSORIES (7 CATEGORIES)
  // ==========================================
  {
    id: 'group-jewelry-accessories',
    title: 'Jewelry & Accessories',
    description: 'Subtle metallic accents, polarized eyewear, and refined finishing touches.',
    tag: '7 CATEGORIES',
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-mens-chains-necklaces',
        name: "Men's Chains & Necklaces",
        description: 'Cuban curb links, rope chains, and silver-tone collars.',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Chains',
        badge: 'Trending',
        itemCount: '50+ Styles',
      },
      {
        id: 'cat-mens-bracelets',
        name: "Men's Bracelets",
        description: 'Braided genuine leather, cuff bangles, and bead bracelets.',
        image: 'https://images.unsplash.com/photo-1611591475155-42e452a3f261?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Bracelets',
        itemCount: '40+ Styles',
      },
      {
        id: 'cat-mens-rings',
        name: "Men's Rings",
        description: 'Brushed tungsten carbide, signet rings, and titanium bands.',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Rings',
        itemCount: '45+ Styles',
      },
      {
        id: 'cat-mens-earrings',
        name: "Men's Earrings",
        description: 'Sleek magnetic studs, huggie hoops, and cross earrings.',
        image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Earrings',
        itemCount: '30+ Styles',
      },
      {
        id: 'cat-mens-pendants',
        name: "Men's Pendants",
        description: 'Minimalist dog tags, geometric charms, and symbolic medallions.',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Pendants',
        itemCount: '35+ Styles',
      },
      {
        id: 'cat-mens-cufflinks',
        name: "Men's Cufflinks",
        description: 'Polished enamel, brass, and crystal-inlaid executive cufflinks.',
        image: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Cufflinks',
        badge: 'Executive',
        itemCount: '40+ Styles',
      },
      {
        id: 'cat-mens-sunglasses',
        name: "Men's Sunglasses",
        description: 'Polarized aviators, wayfarers, and UV400 rectangular frames.',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Sunglasses',
        badge: 'Bestseller',
        itemCount: '90+ Styles',
      },
    ],
  },

  // ==========================================
  // GROUP F: BAGS & BACKPACKS (6 CATEGORIES)
  // ==========================================
  {
    id: 'group-bags-backpacks',
    title: 'Bags & Backpacks',
    description: 'Durable gear for urban commutes, wilderness expeditions, and flight carry-on.',
    tag: '6 CATEGORIES',
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-backpacks',
        name: 'Backpacks',
        description: 'Multi-compartment everyday commuters and college daypacks.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Backpacks',
        badge: 'Essential',
        itemCount: '80+ Styles',
      },
      {
        id: 'cat-rucksacks',
        name: 'Rucksacks',
        description: 'Heavy-duty 50L+ expedition packs with ergonomic harness.',
        image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Rucksacks',
        badge: 'Adventure',
        itemCount: '30+ Styles',
      },
      {
        id: 'cat-laptop-bags',
        name: 'Laptop Bags',
        description: 'Padded 15.6-inch briefcases with water-repellent ballistic nylon.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Laptop+Bags',
        badge: 'Office Ready',
        itemCount: '55+ Styles',
      },
      {
        id: 'cat-travel-bags',
        name: 'Travel Bags',
        description: 'Spacious weekend duffels, wheeled travel bags, and weekender holdalls.',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Travel+Bags',
        itemCount: '45+ Styles',
      },
      {
        id: 'cat-gym-sports-bags',
        name: 'Gym & Sports Bags',
        description: 'Ventilated shoe compartment bags with water bottle holsters.',
        image: 'https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Gym+Bags',
        itemCount: '40+ Styles',
      },
      {
        id: 'cat-sling-bags',
        name: 'Sling Bags',
        description: 'Compact crossbody chest packs and anti-theft shoulder bags.',
        image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Sling+Bags',
        badge: 'Street Style',
        itemCount: '35+ Styles',
      },
    ],
  },

  // ==========================================
  // GROUP G: BELTS & WALLETS (5 CATEGORIES)
  // ==========================================
  {
    id: 'group-belts-wallets',
    title: 'Belts & Wallets',
    description: 'Full-grain leathers, RFID security, and luxury gift ensembles.',
    tag: '5 CATEGORIES',
    accentColor: '#2962FF',
    categories: [
      {
        id: 'cat-mens-belts',
        name: "Men's Belts",
        description: 'Reversible full-grain leather belts with auto-lock buckles.',
        image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Belts',
        badge: 'Pure Leather',
        itemCount: '50+ Styles',
      },
      {
        id: 'cat-mens-wallets',
        name: "Men's Wallets",
        description: 'Classic bi-fold and tri-fold wallets with RFID shielding.',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Men+Wallets',
        badge: 'Bestseller',
        itemCount: '65+ Styles',
      },
      {
        id: 'cat-card-holders',
        name: 'Card Holders',
        description: 'Slimline aluminum popup and leather minimalist card sleeves.',
        image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Card+Holders',
        itemCount: '30+ Styles',
      },
      {
        id: 'cat-travel-wallets',
        name: 'Travel Wallets',
        description: 'Passport organizers with boarding pass slots and currency pockets.',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Travel+Wallets',
        itemCount: '25+ Styles',
      },
      {
        id: 'cat-belt-wallet-gift-sets',
        name: 'Belt & Wallet Gift Sets',
        description: 'Premium boxed sets crafted for gifting and celebrations.',
        image: 'https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=600&q=80',
        link: '/search?q=Belt+Wallet+Gift+Set',
        badge: 'Ideal Gift',
        itemCount: '35+ Sets',
      },
    ],
  },
];
