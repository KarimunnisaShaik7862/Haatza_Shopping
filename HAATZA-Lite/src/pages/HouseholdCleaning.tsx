import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { 
  Sparkles, Zap, Plus, Minus, ArrowLeft, Clock, Star 
} from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Curated 18-item catalog of everyday household cleaning, sanitization, and laundry essentials
export const HOUSEHOLD_CLEANING_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-vim-gel',
    slug: 'lemon-fresh-power-dishwash-gel',
    name: 'Vim Pure Lemon Fresh Dishwash Gel',
    brand: 'VIM PURE',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-dishwash',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Dishwashing Liquids',
    description: 'Grease-cutting concentrated gel with natural lemon extracts for sparkling clean utensils.',
    fullDescription: 'One spoonful cleans a sink full of oily cookware. Gentle on skin with long-lasting refreshing citrus aroma.',
    price: 135,
    mrp: 160,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 4210,
    stock: 120,
    inStock: true,
    unit: '750 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_dishwash.png',
    images: ['/images/products/3d_dishwash.png'],
    tags: ['Dishwash', 'Vim', 'Lemon Gel', 'Kitchen Cleaning'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-pril-dishwash',
    slug: 'pril-lime-concentrated-dishwash-liquid',
    name: 'Pril Lime Concentrated Dishwash Liquid',
    brand: 'PRIL',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-dishwash',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Dishwashing Liquids',
    description: 'High-active surfactant formula that breaks down burnt food and oil film instantly.',
    fullDescription: 'German formulation with active degreasers that leave glassware streak-free and stainless steel radiant.',
    price: 110,
    mrp: 125,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 1650,
    stock: 85,
    inStock: true,
    unit: '425 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pril', 'Dishwash', 'Degreaser', 'Kitchen'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-lizol-pine',
    slug: 'lizol-pine-disinfectant-floor-cleaner',
    name: 'Lizol Pine Disinfectant Floor Cleaner',
    brand: 'LIZOL PRO',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-floor',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Floor Cleaners',
    description: 'Kills 99.9% germs with 10x superior cleaning power and long-lasting refreshing pine aroma.',
    fullDescription: 'Safe for marble, granite, ceramic tiles, and mosaic floors. Recommended by the Indian Medical Association.',
    price: 185,
    mrp: 215,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 5400,
    stock: 140,
    inStock: true,
    unit: '1 Litre Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_floorcleaner.png',
    images: ['/images/products/3d_floorcleaner.png'],
    tags: ['Floor Cleaner', 'Lizol', 'Pine', 'Disinfectant'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-nimyle-herbal',
    slug: 'nimyle-herbal-lemongrass-floor-cleaner',
    name: 'Nimyle Herbal Lemongrass Floor Cleanser',
    brand: 'NIMYLE',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-floor',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Floor Cleaners',
    description: '100% natural herbal floor cleaner made with pure neem extract and therapeutic lemongrass oil.',
    fullDescription: 'Pet-safe and eco-friendly floor solution that naturally deters ants and insects while leaving a herbal aroma.',
    price: 145,
    mrp: 170,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 2120,
    stock: 90,
    inStock: true,
    unit: '1 Litre Jug',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80'],
    tags: ['Nimyle', 'Herbal Cleaner', 'Lemongrass', 'Pet Safe'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-surf-excel-liquid',
    slug: 'surf-excel-matic-front-load-liquid',
    name: 'Surf Excel Matic Front Load Liquid Detergent',
    brand: 'SURF EXCEL',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-laundry',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Detergents',
    description: 'Ultra-concentrated liquid detergent with powerful stain buster technology for washing machines.',
    fullDescription: 'Dissolves 100% in wash cycles without leaving behind powdery stains or clogging the drum. Long-lasting floral fragrance.',
    price: 225,
    mrp: 260,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 6890,
    stock: 110,
    inStock: true,
    unit: '1 Litre Pouch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_detergent.png',
    images: ['/images/products/3d_detergent.png'],
    tags: ['Surf Excel', 'Liquid Detergent', 'Matic', 'Laundry'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-ariel-powder',
    slug: 'ariel-complete-detergent-powder-1kg',
    name: 'Ariel Complete 2-in-1 Detergent Powder',
    brand: 'ARIEL',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-laundry',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Detergents',
    description: 'Micro-scrubber technology that lifts deep collar & cuff grease in one single scoop.',
    fullDescription: 'Formulated with built-in brighteners and enzyme complexes to keep whites crisp and colors vibrant.',
    price: 165,
    mrp: 195,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 3820,
    stock: 95,
    inStock: true,
    unit: '1 kg Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ariel', 'Detergent Powder', 'Washing Powder', 'Laundry'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tide-plus',
    slug: 'tide-plus-double-power-jasmine',
    name: 'Tide Plus Double Power Jasmine Detergent',
    brand: 'TIDE',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-laundry',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Detergents',
    description: 'Superior whiteness power with lasting sweet jasmine fragrance and quick lathering action.',
    fullDescription: 'Works effectively in hard water conditions. Leaves fabrics smelling garden fresh all day.',
    price: 135,
    mrp: 155,
    discountPercentage: 13,
    rating: 4.7,
    reviewCount: 2780,
    stock: 130,
    inStock: true,
    unit: '1 kg Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80'],
    tags: ['Tide', 'Detergent', 'Jasmine', 'Fabric Wash'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-comfort-conditioner',
    slug: 'comfort-after-wash-fabric-conditioner',
    name: 'Comfort Morning Fresh Fabric Conditioner',
    brand: 'COMFORT',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-laundry',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Detergents',
    description: 'Provides 24-hour fragrance pearls and protects garment fibers from wash-cycle wear and roughness.',
    fullDescription: 'Leaves clothes touchably soft, static-free, and easy to iron with fresh morning botanical aroma.',
    price: 195,
    mrp: 235,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 4620,
    stock: 90,
    inStock: true,
    unit: '860 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Comfort', 'Fabric Conditioner', 'Softener', 'Fragrance'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-colin-spray',
    slug: 'colin-glass-multi-surface-spray',
    name: 'Colin Glass & Multi-Surface Cleaner Spray',
    brand: 'COLIN ADVANCED',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-surfaces',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Multi-Surface Sprays',
    description: 'Streak-free sparkling crystal shine for glass, mirrors, kitchen appliances, and car windshields.',
    fullDescription: 'Equipped with dual-spray trigger nozzle for wide misting or targeted foam. Eliminates fingerprints and smudges.',
    price: 115,
    mrp: 130,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 3950,
    stock: 100,
    inStock: true,
    unit: '500 ml Trigger',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_spray.png',
    images: ['/images/products/3d_spray.png'],
    tags: ['Colin', 'Glass Cleaner', 'Surface Spray', 'Sparkle'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dettol-surface-spray',
    slug: 'dettol-disinfectant-multi-surface-spray',
    name: 'Dettol Antibacterial Surface Cleanser Spray',
    brand: 'DETTOL PRO',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-surfaces',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Multi-Surface Sprays',
    description: 'Bleach-free disinfectant spray that neutralizes 99.9% viruses and bacteria on high-touch surfaces.',
    fullDescription: 'Safe for door handles, kitchen countertops, baby toys, and dining tables. No rinse required.',
    price: 169,
    mrp: 199,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 2410,
    stock: 75,
    inStock: true,
    unit: '500 ml Trigger',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dettol Spray', 'Disinfectant', 'Antibacterial', 'Sanitizer'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-harpic-original',
    slug: 'harpic-power-plus-toilet-cleaner-1l',
    name: 'Harpic Power Plus Disinfectant Toilet Cleaner',
    brand: 'HARPIC',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-bathroom',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Toilet Cleaners',
    description: '10x stain removal formula that eliminates tough yellow limescale, rust, and bowl odors.',
    fullDescription: 'Curved angled spout reaches under the rim with ease. Thick viscous gel clings to bowl surface for maximum germ kill.',
    price: 185,
    mrp: 215,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 7890,
    stock: 140,
    inStock: true,
    unit: '1 Litre Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'],
    tags: ['Harpic', 'Toilet Cleaner', 'Disinfectant', 'Bathroom'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sanifresh-ultrashine',
    slug: 'sanifresh-ultra-shine-toilet-cleaner',
    name: 'Sanifresh Ultra Shine Germ Guard Cleanser',
    brand: 'SANIFRESH',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-bathroom',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Toilet Cleaners',
    description: 'Thick blue action gel with instant descaling agents for deep porcelain brilliance.',
    fullDescription: 'Special anti-redeposition polymers keep the toilet bowl sparkling white for up to 48 hours.',
    price: 125,
    mrp: 145,
    discountPercentage: 14,
    rating: 4.7,
    reviewCount: 1820,
    stock: 80,
    inStock: true,
    unit: '750 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1583947582387-9b2f6bb1536b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1583947582387-9b2f6bb1536b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sanifresh', 'Toilet Cleaner', 'Descaling', 'Hygiene'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-garbage-bags-medium',
    slug: 'shalimar-biodegradable-garbage-bags-m',
    name: 'Shalimar Oxo-Biodegradable Garbage Bags (M)',
    brand: 'SHALIMAR',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-bins',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Garbage Bags',
    description: 'Eco-conscious leakproof black garbage bags with convenient built-in tie strings.',
    fullDescription: 'Durable 19 x 21 inch tear-resistant bags suitable for medium kitchen and bathroom waste pedal bins.',
    price: 85,
    mrp: 110,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 3670,
    stock: 160,
    inStock: true,
    unit: 'Pack of 30 Bags',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1610444585641-76479860c406?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1610444585641-76479860c406?auto=format&fit=crop&w=600&q=80'],
    tags: ['Garbage Bags', 'Dustbin Bags', 'Biodegradable', 'Shalimar'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-garbage-bags-large',
    slug: 'presto-heavy-duty-garbage-bags-l',
    name: 'Presto! Heavy-Duty Black Garbage Bags (L)',
    brand: 'PRESTO!',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-bins',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Garbage Bags',
    description: 'Thick gauge large 24 x 32 inch trash bags designed to hold wet kitchen and yard refuse.',
    fullDescription: 'Reinforced star-sealed bottom prevents punctures and wet leakage under heavy domestic garbage loads.',
    price: 149,
    mrp: 199,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 2210,
    stock: 90,
    inStock: true,
    unit: 'Pack of 30 Bags Roll',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dustbin Bags', 'Garbage Bags', 'Presto', 'Heavy Duty'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-scotch-brite-scrub',
    slug: 'scotch-brite-heavy-duty-scrub-pads',
    name: 'Scotch-Brite Heavy Duty Kitchen Scrub Pad',
    brand: 'SCOTCH-BRITE',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-dishwash',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Sponges & Wipes',
    description: 'Abrasive nylon fibers infused with mineral particles for removing scorched pans and griddles.',
    fullDescription: 'Evenly coated resin ensures long-lasting scouring performance without disintegrating or shedding fibers.',
    price: 65,
    mrp: 75,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 5120,
    stock: 150,
    inStock: true,
    unit: 'Pack of 5 Pads',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=600&q=80'],
    tags: ['Scrub Pad', 'Scotch Brite', 'Dishwashing', 'Kitchen'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sponge-wipe',
    slug: 'scotch-brite-sponge-wipe-cellulose',
    name: 'Scotch-Brite Cellulose Absorbent Sponge Wipe',
    brand: 'SCOTCH-BRITE',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-dishwash',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Sponges & Wipes',
    description: '100% natural cellulose wipes that absorb 10x their dry weight in water without leaving water marks.',
    fullDescription: 'Dries fast to resist bacterial growth and unpleasant mildew smells. Safe for countertops and refrigerators.',
    price: 135,
    mrp: 165,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 3410,
    stock: 110,
    inStock: true,
    unit: 'Pack of 3 Wipes',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sponge Wipe', 'Cellulose', 'Countertop', 'Scotch Brite'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dettol-antiseptic',
    slug: 'dettol-antiseptic-disinfectant-liquid',
    name: 'Dettol Antiseptic Disinfectant Liquid',
    brand: 'DETTOL PRO',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-surfaces',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Multi-Surface Sprays',
    description: 'Trusted hospital-grade germicide for sanitizing laundry wash, floor mopping, and home surfaces.',
    fullDescription: 'Proven defense against 100 illness-causing germs. Versatile home protection for linen, bathing, and cleaning.',
    price: 195,
    mrp: 235,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 6890,
    stock: 120,
    inStock: true,
    unit: '500 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_disinfectant.png',
    images: ['/images/products/3d_disinfectant.png'],
    tags: ['Dettol', 'Antiseptic', 'Disinfectant', 'Sanitizer'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-odonil-lavender',
    slug: 'odonil-room-air-freshener-lavender',
    name: 'Odonil Bathroom Air Freshener (Lavender Bliss)',
    brand: 'ODONIL',
    categoryId: 'cat-lite-cleaning',
    subcategoryId: 'sub-l-bathroom',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Toilet Cleaners',
    description: 'Special odor-buster molecules that continuously diffuse a calming botanical lavender fragrance.',
    fullDescription: 'Includes convenient hanging hook for wardrobes, bathrooms, and wash areas. Lasts up to 30 days.',
    price: 65,
    mrp: 75,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 3120,
    stock: 140,
    inStock: true,
    unit: '75 g Block',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=600&q=80'],
    tags: ['Odonil', 'Air Freshener', 'Lavender', 'Bathroom'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const HouseholdCleaning: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on selected tab
  const displayedProducts = HOUSEHOLD_CLEANING_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Household Cleaning">
        {/* High-Density Product Card Grid: grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {displayedProducts.map((product, index) => {
            const cartItem = cart.find((item) => item.productId === product.id);
            const qty = cartItem ? cartItem.quantity : 0;
            const packSize = product.unit || '1 unit';
            
            // Calculate discount percentage cleanly
            const discount = product.discountPercentage || (product.mrp > product.price 
              ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
              : 0);

            const deliveryMins = product.instantDeliveryMinutes || 8;

            return (
              /* Staggered entrance transition */
              <div
                key={product.id}
                style={{
                  opacity: isMounted ? 1 : 0,
                  transform: isMounted ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 400ms ease-out ${index * 25}ms, transform 400ms ease-out ${index * 25}ms`,
                  willChange: 'opacity, transform',
                }}
                className={!isMounted ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
              >
                {/* Beautiful Pure White Product Card with Vivid Neon Emerald Aura Hover Glow */}
                <div
                  onClick={() => navigate(`/lite/product/${product.id || product.slug}`)}
                  className="group haatza-neon-aura-card relative bg-white border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between h-full select-none cursor-pointer shadow-xs"
                >
                  <div>
                    {/* Center Image inside soft gray background wrapper with Top Discount Badge */}
                    <div className="relative w-full aspect-square bg-[#F5F7F6] rounded-xl flex items-center justify-center p-1 sm:p-1.5 mb-2.5 overflow-hidden border border-slate-100/80">
                        {/* Top Discount Badge */}
                        {discount > 0 && (
                          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black tracking-wide uppercase shadow-2xs">
                            {discount}% OFF
                          </span>
                        )}

                        {/* Product Image with Subtle Expand (scale-104) on Hover over 400ms ease-out */}
                        <Link
                          to={`/lite/product/${product.id || product.slug}`}
                          className="relative z-0 w-full h-full flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            width="140"
                            height="140"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full max-h-[98%] max-w-[98%] object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] group-hover:scale-104 transition-transform duration-400 ease-out select-none will-change-transform"
                          />
                        </Link>
                      </div>

                      {/* Delivery Time & Rating Badge */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 tracking-tight">
                          <Clock className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
                          <span>{deliveryMins} MINS</span>
                        </div>
                        <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
                          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                          <span>{(product.rating || 4.8).toFixed(1)}</span>
                        </div>
                      </div>

                      {/* Product Name (Symmetrical 2-line clamp with fixed min-height) */}
                      <Link
                        to={`/lite/product/${product.id || product.slug}`}
                        className="block text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[34px] mb-1"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      {/* Unit Weight Text */}
                      <div className="text-[11px] text-slate-400 font-medium truncate mb-2">
                        {packSize}
                      </div>
                    </div>

                    {/* Bottom Details: Price & Compact Aligned Tactile ADD Action */}
                    <div className="relative z-10 flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100 mt-auto">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight leading-none">
                            {formatCurrency(product.price)}
                          </span>
                          <PriceInfoButton
                            productName={product.name}
                            price={product.price}
                            mrp={product.mrp}
                            discountPercentage={discount}
                            unit={packSize}
                            brand={product.brand}
                            size="xs"
                            theme="emerald"
                          />
                        </div>
                        {product.mrp > product.price && (
                          <span className="text-[10px] text-slate-400 line-through font-medium leading-tight mt-0.5">
                            {formatCurrency(product.mrp)}
                          </span>
                        )}
                      </div>

                      {/* Premium Action Trigger (ADD) */}
                      <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="group/btn relative overflow-hidden h-7 sm:h-8 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-[11px] uppercase tracking-wider transition-all duration-200 ease-out hover:scale-105 shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_14px_rgba(16,185,129,0.45)] active:scale-95 cursor-pointer flex items-center justify-center gap-1 select-none will-change-transform"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="h-7 sm:h-8 inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_2px_8px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(cartItem!.id, qty - 1);
                              }}
                              className="px-2 h-full hover:bg-black/15 text-white transition-colors cursor-pointer active:scale-90"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-2.5 h-2.5 stroke-[3]" />
                            </button>
                            <span className="px-1.5 text-xs font-black min-w-5 text-center select-none text-white">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(cartItem!.id, qty + 1);
                              }}
                              className="px-2 h-full hover:bg-black/15 text-white transition-colors cursor-pointer active:scale-90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-2.5 h-2.5 stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </HaatzaLiteCategoryShowcase>
      </div>
    );
  };

export default HouseholdCleaning;
