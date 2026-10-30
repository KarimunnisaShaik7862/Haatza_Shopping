import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Curated 24-item balanced high-density catalog across all categories (Fruits, Dairy, Snacks, Cleaning, Personal Care, Kitchen)
export const ALL_FOR_YOU_CATALOG: HaatzaLiteProduct[] = [
  // Fruits & Vegetables
  {
    id: 'prod-lite-mangoes',
    slug: 'ratnagiri-alphonso-mangoes-box',
    name: 'Ratnagiri Alphonso Mangoes (GI Certified)',
    brand: 'NATURE FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Naturally ripened, export-grade Devgad Alphonso mangoes with rich golden pulp and intoxicating aroma.',
    fullDescription: 'Hand-picked from certified coastal orchards in Maharashtra. Chemical-free, carbide-free guarantee.',
    price: 499,
    mrp: 650,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 3820,
    stock: 90,
    inStock: true,
    unit: 'Pack of 6 (1.2 kg)',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_mango.png',
    images: ['/images/products/3d_mango.png'],
    tags: ['Mango', 'Alphonso', 'Fresh Fruits', 'Organic'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-apples',
    slug: 'crisp-shimla-royal-delicious-apples',
    name: 'Crisp Shimla Royal Delicious Mountain Apples',
    brand: 'HIMALAYAN ORCHARDS',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Hand-sorted high-altitude crunchy red apples packed with natural sweetness, antioxidants, and dietary fiber.',
    fullDescription: 'Cold-chain preserved to retain snap and juiciness. 100% wax-free skin safe for direct consumption.',
    price: 180,
    mrp: 220,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 2940,
    stock: 140,
    inStock: true,
    unit: '1 kg Box (4-5 Pcs)',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_apple.png',
    images: ['/images/products/3d_apple.png'],
    tags: ['Apple', 'Shimla', 'Fresh Fruits', 'Healthy'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-avocado',
    slug: 'imported-hass-avocados-ready-to-eat',
    name: 'Hydroponic Hass Avocados (Rich & Buttery)',
    brand: 'GREEN HARVEST',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Creamy Hass avocados rich in monounsaturated heart-healthy fats, potassium, and vitamin E.',
    fullDescription: 'Perfect for guacamole, keto salads, protein shakes, and sourdough morning toast.',
    price: 199,
    mrp: 260,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 1890,
    stock: 75,
    inStock: true,
    unit: 'Pack of 2 (300g)',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_avocado.png',
    images: ['/images/products/3d_avocado.png'],
    tags: ['Avocado', 'Hass', 'Keto', 'Superfood'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-spinach',
    slug: 'tender-hydroponic-baby-spinach-leaves',
    name: 'Tender Hydroponic Baby Spinach Leaves',
    brand: 'PURE GREENS',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veg',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Crisp Vegetables',
    description: 'Soil-less grown crisp baby spinach leaves harvested at daybreak for peak iron, vitamin A, and chlorophyll.',
    fullDescription: 'Ozone-washed and ready to toss directly into curries, smoothies, or salads with zero grit.',
    price: 35,
    mrp: 45,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 3120,
    stock: 160,
    inStock: true,
    unit: '250 g Bunch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_farm_spinach.jpg',
    images: ['/images/products/3d_farm_spinach.jpg'],
    tags: ['Spinach', 'Baby Greens', 'Organic Vegetables'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },

  // Dairy & Breakfast
  {
    id: 'prod-lite-milk',
    slug: 'amul-taaza-fresh-homogenised-toned-milk',
    name: 'Amul Taaza Fresh Toned Milk',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy-breakfast',
    subcategoryId: 'sub-l-dairy',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Dairy Essentials',
    description: 'Pasteurized homogenised toned milk packed with calcium and protein for everyday bone strength.',
    fullDescription: 'Pure dairy milk processed with zero preservatives or adulterants under stringent quality standards.',
    price: 54,
    mrp: 56,
    discountPercentage: 4,
    rating: 4.9,
    reviewCount: 8940,
    stock: 250,
    inStock: true,
    unit: '1 Litre Pouch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_milk_bottle.png',
    images: ['/images/products/3d_milk_bottle.png'],
    tags: ['Milk', 'Amul', 'Dairy', 'Daily Essentials'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-farm-eggs',
    slug: 'country-fresh-brown-farm-eggs-pack-of-6',
    name: 'Country Fresh Brown Farm Eggs (Protein Rich)',
    brand: 'FARM HARVEST',
    categoryId: 'cat-lite-dairy-breakfast',
    subcategoryId: 'sub-l-dairy',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Eggs & Poultry',
    description: 'Clean brown farm-fresh eggs sourced daily from bio-secure farms. High in lutein and natural protein.',
    fullDescription: 'Antibiotic-residue free with golden-yellow yolk. Carefully cushioned packaging prevents hairline transit cracks.',
    price: 75,
    mrp: 90,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 4620,
    stock: 180,
    inStock: true,
    unit: 'Pack of 6 Eggs',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_egg_box.png',
    images: ['/images/products/3d_egg_box.png'],
    tags: ['Eggs', 'Brown Eggs', 'Protein', 'Breakfast'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-butter',
    slug: 'amul-pasteurized-salted-butter-block',
    name: 'Amul Pasteurized Salted Table Butter',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy-breakfast',
    subcategoryId: 'sub-l-dairy',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Butter & Spreads',
    description: 'Iconic Indian table butter made from pure fresh cream with signature salty tang.',
    fullDescription: 'Spreads smoothly on warm toasts, melts into hot parathas, and enhances everyday cooking.',
    price: 275,
    mrp: 290,
    discountPercentage: 5,
    rating: 4.9,
    reviewCount: 6810,
    stock: 150,
    inStock: true,
    unit: '500 g Block',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_yellow_cheese.png',
    images: ['/images/products/3d_yellow_cheese.png'],
    tags: ['Butter', 'Amul', 'Table Butter', 'Dairy'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kelloggs-cornflakes',
    slug: 'kelloggs-real-almond-honey-corn-flakes',
    name: "Kellogg's Real Almond & Honey Crunchy Corn Flakes",
    brand: "KELLOGG'S",
    categoryId: 'cat-lite-dairy-breakfast',
    subcategoryId: 'sub-l-breakfast',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Cereals & Breakfast',
    description: 'Golden sun-ripened corn flakes tossed with real sliced Californian almonds and natural wild honey.',
    fullDescription: 'High in B vitamins and iron. Stays crunchier in cold milk for an energetic morning start.',
    price: 265,
    mrp: 320,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2980,
    stock: 110,
    inStock: true,
    unit: '500 g Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Corn Flakes', 'Kelloggs', 'Almond Honey', 'Breakfast Cereal'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },

  // Snacks & Beverages
  {
    id: 'prod-lite-lays-classic',
    slug: 'lays-classic-salted-potato-chips',
    name: "Lay's Classic Salted Crispy Potato Chips",
    brand: "LAY'S",
    categoryId: 'cat-lite-snacks-beverages',
    subcategoryId: 'sub-l-chips',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Crisps',
    description: 'Thinly sliced golden potatoes fried to crunch perfection and seasoned with sea salt.',
    fullDescription: 'India’s favorite tea-time crunchy accompaniment with zero trans fat.',
    price: 20,
    mrp: 20,
    discountPercentage: 0,
    rating: 4.8,
    reviewCount: 9400,
    stock: 300,
    inStock: true,
    unit: '50 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_chips_bag.png',
    images: ['/images/products/3d_chips_bag.png'],
    tags: ['Chips', 'Lays', 'Potato Chips', 'Snacks'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cadbury-silk',
    slug: 'cadbury-dairy-milk-silk-chocolate-bar',
    name: 'Cadbury Dairy Milk Silk Chocolate Bar',
    brand: 'CADBURY',
    categoryId: 'cat-lite-snacks-beverages',
    subcategoryId: 'sub-l-sweets',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chocolates & Sweets',
    description: 'Silky smooth, creamier milk chocolate that melts like velvet on the tongue.',
    fullDescription: 'Made with 100% sustainably sourced cocoa beans under Cocoa Life.',
    price: 175,
    mrp: 190,
    discountPercentage: 8,
    rating: 4.9,
    reviewCount: 5210,
    stock: 140,
    inStock: true,
    unit: '150 g Bar',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80'],
    tags: ['Chocolate', 'Silk', 'Cadbury', 'Dessert'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-redbull',
    slug: 'red-bull-energy-drink-can',
    name: 'Red Bull Energy Drink (Vitalizes Body & Mind)',
    brand: 'RED BULL',
    categoryId: 'cat-lite-snacks-beverages',
    subcategoryId: 'sub-l-beverages',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Beverages',
    description: 'Iconic functional beverage with caffeine, taurine, B-group vitamins, and alpine water.',
    fullDescription: 'Appreciated worldwide by top athletes, busy professionals, and college students.',
    price: 125,
    mrp: 125,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 4120,
    stock: 160,
    inStock: true,
    unit: '250 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_iced_tea_can.png',
    images: ['/images/products/3d_iced_tea_can.png'],
    tags: ['Red Bull', 'Energy Drink', 'Caffeine', 'Beverage'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mixed-nuts',
    slug: 'nutty-gritties-jumbo-roasted-almonds-cashews',
    name: 'Nutty Gritties Jumbo Roasted Almonds & Cashews',
    brand: 'NUTTY GRITTIES',
    categoryId: 'cat-lite-snacks-beverages',
    subcategoryId: 'sub-l-chips',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Dry Fruits & Nuts',
    description: 'Slow dry-roasted jumbo nuts lightly dusted with pink Himalayan rock salt.',
    fullDescription: 'High in plant protein, magnesium, and dietary fiber with zero refined oils.',
    price: 320,
    mrp: 399,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 2340,
    stock: 95,
    inStock: true,
    unit: '200 g Zip Pouch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_mixed_nuts.png',
    images: ['/images/products/3d_mixed_nuts.png'],
    tags: ['Dry Fruits', 'Almonds', 'Cashews', 'Healthy Snacks'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },

  // Household Cleaning
  {
    id: 'prod-lite-vim-gel',
    slug: 'lemon-fresh-power-dishwash-gel',
    name: 'Vim Pure Lemon Fresh Dishwash Gel',
    brand: 'VIM PURE',
    categoryId: 'cat-lite-household-cleaning',
    subcategoryId: 'sub-l-cleaning',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Dishwashing Liquids',
    description: 'Grease-cutting concentrated gel with natural lemon extracts for sparkling clean utensils.',
    fullDescription: 'One spoonful cleans a sink full of oily cookware. Gentle on skin with citrus aroma.',
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
    id: 'prod-lite-lizol-pine',
    slug: 'lizol-pine-disinfectant-floor-cleaner',
    name: 'Lizol Pine Disinfectant Floor Cleaner',
    brand: 'LIZOL PRO',
    categoryId: 'cat-lite-household-cleaning',
    subcategoryId: 'sub-l-cleaning',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Floor Cleaners',
    description: 'Kills 99.9% germs with 10x superior cleaning power and long-lasting pine aroma.',
    fullDescription: 'Safe for marble, granite, ceramic tiles, and mosaic floors.',
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
    id: 'prod-lite-surf-excel',
    slug: 'surf-excel-matic-top-load-liquid-detergent',
    name: 'Surf Excel Matic Top Load Liquid Detergent',
    brand: 'SURF EXCEL',
    categoryId: 'cat-lite-household-cleaning',
    subcategoryId: 'sub-l-cleaning',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Laundry Detergents',
    description: 'Deep-penetrating liquid wash formula that removes stubborn stains inside washing machines.',
    fullDescription: 'Generates optimal foam levels to protect top load motors and fabric color vibrancy.',
    price: 225,
    mrp: 250,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 3890,
    stock: 110,
    inStock: true,
    unit: '1 Litre Pouch',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_detergent.png',
    images: ['/images/products/3d_detergent.png'],
    tags: ['Surf Excel', 'Matic', 'Liquid Detergent', 'Laundry'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dettol-disinfectant',
    slug: 'dettol-antiseptic-disinfectant-liquid',
    name: 'Dettol Antiseptic Surface & First Aid Liquid',
    brand: 'DETTOL',
    categoryId: 'cat-lite-household-cleaning',
    subcategoryId: 'sub-l-cleaning',
    categoryName: 'Household Cleaning',
    subcategoryName: 'Antiseptics',
    description: 'Proven germ defense formula trusted by millions for personal hygiene and home disinfection.',
    fullDescription: 'Add to bathwater, laundry rinse, or surface mopping bucket for non-poisonous germ protection.',
    price: 210,
    mrp: 240,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 6120,
    stock: 130,
    inStock: true,
    unit: '550 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_disinfectant.png',
    images: ['/images/products/3d_disinfectant.png'],
    tags: ['Dettol', 'Antiseptic', 'First Aid', 'Disinfection'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },

  // Personal Care
  {
    id: 'prod-lite-dettol-handwash',
    slug: 'dettol-aloe-citrus-antibacterial-hand-wash',
    name: 'Dettol Aloe & Citrus Antibacterial Hand Wash',
    brand: 'DETTOL PRO',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-personal',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Germ-defense liquid hand wash infused with soothing aloe vera and natural citrus extract.',
    fullDescription: 'Clinically tested to eliminate 99.9% germs while keeping hands moisturized.',
    price: 120,
    mrp: 150,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 3410,
    stock: 140,
    inStock: true,
    unit: '350 ml Pump Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_hand_wash.jpg',
    images: ['/images/products/3d_hand_wash.jpg'],
    tags: ['Hand Wash', 'Dettol', 'Aloe Vera', 'Antibacterial'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-pears-soap',
    slug: 'pears-pure-gentle-amber-glycerine-soap',
    name: 'Pears Pure & Gentle Amber Glycerine Soap',
    brand: 'PEARS',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-personal',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Crafted with 98% pure glycerine and natural botanical oils for smooth, hydrated skin.',
    fullDescription: 'Traditional gentle formula that preserves natural skin moisture.',
    price: 195,
    mrp: 235,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2890,
    stock: 110,
    inStock: true,
    unit: 'Pack of 3 x 125g',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_luxury_soap.png',
    images: ['/images/products/3d_luxury_soap.png'],
    tags: ['Soap', 'Pears', 'Glycerine', 'Body Care'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-loreal-totalrepair',
    slug: 'loreal-paris-total-repair-5-repairing-shampoo',
    name: "L'Oréal Paris Total Repair 5 Shampoo",
    brand: "L'ORÉAL PARIS",
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-personal',
    categoryName: 'Personal Care',
    subcategoryName: 'Hair Care & Shampoos',
    description: 'Formulated with Keratin-XS and Ceramide to fight hair fall, dryness, and split ends.',
    fullDescription: 'Intense micro-repair formula that penetrates damaged hair fibers from root to tip.',
    price: 299,
    mrp: 375,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 4120,
    stock: 95,
    inStock: true,
    unit: '340 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80'],
    tags: ['Shampoo', 'Loreal', 'Haircare', 'Repair'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-minimalist-serum',
    slug: 'minimalist-10-percent-niacinamide-face-serum',
    name: 'Minimalist 10% Niacinamide Face Serum',
    brand: 'MINIMALIST',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-personal',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Pure Grade Niacinamide with Zinc PCA to fade acne marks, reduce blemishes, and strengthen barrier.',
    fullDescription: 'Fragrance-free clinical formulation. Clears blemishes and balances oil production.',
    price: 549,
    mrp: 599,
    discountPercentage: 8,
    rating: 4.9,
    reviewCount: 5210,
    stock: 75,
    inStock: true,
    unit: '30 ml Dropper Bottle',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_serum_bottle.png',
    images: ['/images/products/3d_serum_bottle.png'],
    tags: ['Minimalist', 'Serum', 'Niacinamide', 'Skincare'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-colgate-total',
    slug: 'colgate-total-advanced-health-antibacterial-toothpaste',
    name: 'Colgate Total Whole Mouth Health Toothpaste',
    brand: 'COLGATE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-personal',
    categoryName: 'Personal Care',
    subcategoryName: 'Oral Care',
    description: 'Dual Zinc + Arginine antibacterial technology that provides 12-hour whole mouth defense.',
    fullDescription: 'Protects teeth, tongue, cheeks, and gums from cavities and bad breath.',
    price: 135,
    mrp: 160,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 5600,
    stock: 175,
    inStock: true,
    unit: '150 g Tube',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80'],
    tags: ['Toothpaste', 'Colgate', 'Oral Care', 'Dental'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },

  // Kitchen Essentials
  {
    id: 'prod-lite-chef-knife',
    slug: 'prestige-tru-edge-stainless-steel-chef-knife',
    name: "Prestige Tru-Edge Stainless Steel Chef's Knife (8 Inch)",
    brand: 'PRESTIGE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-kitchen',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Knives & Cutting Boards',
    description: 'High-carbon stainless steel razor blade with contoured ergonomic non-slip grip handle.',
    fullDescription: 'Precision edge designed for effortless slicing, dicing, and chopping.',
    price: 349,
    mrp: 425,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 2310,
    stock: 95,
    inStock: true,
    unit: '1 Knife (20 cm Blade)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80'],
    tags: ['Knife', 'Chef Knife', 'Prestige', 'Kitchen Tools'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-aluminum-foil',
    slug: 'freshwrapp-premium-food-grade-aluminum-foil',
    name: 'Freshwrapp Premium Food Grade Aluminum Foil Roll (1 kg)',
    brand: 'FRESHWRAPP',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-kitchen',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Foils & Disposables',
    description: 'Heavy-duty aluminum foil that locks in warmth, freshness, and moisture for up to 12 hours.',
    fullDescription: 'Certified food contact safe. Ideal for packing hot rotis and grilling.',
    price: 320,
    mrp: 380,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 5410,
    stock: 160,
    inStock: true,
    unit: '1 kg Jumbo Roll (72 Metres)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Aluminum Foil', 'Freshwrapp', 'Food Wrap'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const AllForYou: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = ALL_FOR_YOU_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="All For You">
        {/* High-Density Common Product Card Grid (grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {(displayedProducts || []).map((product, index) => {
            if (!product) return null;
            const cartItem = cart?.find((item) => item?.productId === product?.id);
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
                key={product.id || index}
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

                      {/* Unit Weight / Dimension Text */}
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

export default AllForYou;
