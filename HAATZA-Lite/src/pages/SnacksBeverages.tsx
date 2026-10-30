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

// Curated 18-item catalog of high-demand snacks, cold drinks, energy sodas, and munchies
export const SNACKS_BEVERAGES_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-kettle-chips',
    slug: 'aurora-sea-salt-kettle-chips',
    name: 'Aurora Hand-Cooked Sea Salt Potato Chips',
    brand: 'AURORA GOURMET',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Slow batch-cooked kettle potato chips seasoned with fine sea salt crystals for extra crunch.',
    fullDescription: 'Handcrafted from select russet potatoes, batch fried in cold-pressed oil with zero trans fat or artificial flavours.',
    price: 99,
    mrp: 125,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 1980,
    stock: 95,
    inStock: true,
    unit: '150 g Bag',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Chips', 'Potato Chips', 'Snacks', 'Sea Salt', 'Crispy'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-lays-tomato',
    slug: 'lays-spanish-tomato-tango-chips',
    name: "Lay's Spanish Tomato Tango Potato Chips",
    brand: "LAY'S",
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Crisp wafer-thin sliced potatoes sprinkled with tangy Spanish tomato seasoning.',
    fullDescription: 'India’s favourite snacking chips with the sweet and spicy burst of Mediterranean sun-dried tomatoes.',
    price: 20,
    mrp: 20,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 8420,
    stock: 180,
    inStock: true,
    unit: '50 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=600&q=80'],
    tags: ['Lays', 'Chips', 'Snacks', 'Tomato', 'Munchies'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-pringles-sourcream',
    slug: 'pringles-sour-cream-and-onion',
    name: 'Pringles Sour Cream & Onion Crisps',
    brand: 'PRINGLES',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Iconic stackable potato crisps seasoned with savory sour cream, onion, and herbs in a pop-canister.',
    fullDescription: 'Perfect curve and uniform crunch in every bite. Zero broken chips inside the protective canister.',
    price: 115,
    mrp: 130,
    discountPercentage: 11,
    rating: 4.8,
    reviewCount: 3100,
    stock: 70,
    inStock: true,
    unit: '107 g Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pringles', 'Potato Crisps', 'Sour Cream', 'Snacks'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-red-bull',
    slug: 'red-bull-energy-drink-can',
    name: 'Red Bull Energy Drink (Chilled)',
    brand: 'RED BULL',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Vitalizes body and mind with caffeine, taurine, B-group vitamins, and alpine mountain water.',
    fullDescription: 'Chilled from cold-chain dark store for instant refreshment during workouts, late-night studies, or long drives.',
    price: 125,
    mrp: 130,
    discountPercentage: 4,
    rating: 4.9,
    reviewCount: 5200,
    stock: 120,
    inStock: true,
    unit: '250 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'],
    tags: ['Energy Drink', 'Red Bull', 'Caffeine', 'Beverages', 'Chilled'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-monster-ultra',
    slug: 'monster-energy-ultra-zero-sugar',
    name: 'Monster Energy Ultra Zero Sugar (White Can)',
    brand: 'MONSTER ENERGY',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Crisp, citrus energy blend with zero calories, zero sugar, and maximum monster energy kick.',
    fullDescription: 'Light, refreshing citrus taste loaded with B-vitamins, L-carnitine, and ginseng root extract.',
    price: 135,
    mrp: 145,
    discountPercentage: 7,
    rating: 4.8,
    reviewCount: 2310,
    stock: 85,
    inStock: true,
    unit: '350 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Monster Energy', 'Zero Sugar', 'Energy Drink', 'Beverages'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-coca-cola',
    slug: 'coca-cola-classic-chilled-can',
    name: 'Coca-Cola Classic Sparkling Soda',
    brand: 'COCA-COLA',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Original crisp effervescent cola delivered icy cold in a recyclable aluminum can.',
    fullDescription: 'The classic taste that goes with every burger, pizza, and movie marathon. Delivered chilled in 8-10 minutes.',
    price: 40,
    mrp: 40,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 9600,
    stock: 200,
    inStock: true,
    unit: '300 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Coke', 'Coca Cola', 'Cold Drink', 'Soda', 'Chilled'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-thums-up',
    slug: 'thums-up-charged-soda-can',
    name: 'Thums Up Charged Strong Cola Can',
    brand: 'THUMS UP',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Extra carbonated spicy cola taste with signature thunderous punch.',
    fullDescription: 'High fizz, bold taste that complements spicy Indian meals and evening street food treats.',
    price: 40,
    mrp: 40,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 7100,
    stock: 160,
    inStock: true,
    unit: '300 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581098365948-6a5a912b7a49?auto=format&fit=crop&w=600&q=80'],
    tags: ['Thums Up', 'Cold Drink', 'Soda', 'Carbonated', 'Fizz'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sprite',
    slug: 'sprite-refreshing-lemon-lime-soda',
    name: 'Sprite Refreshing Lemon-Lime Soda',
    brand: 'SPRITE',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Clear, crisp lemon and lime flavored carbonated soft drink with zero caffeine.',
    fullDescription: 'Icy thirst-quenching citrus fizz delivered straight out of our store chiller in minutes.',
    price: 40,
    mrp: 40,
    discountPercentage: 0,
    rating: 4.8,
    reviewCount: 4890,
    stock: 140,
    inStock: true,
    unit: '300 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sprite', 'Lemon Soda', 'Cold Drink', 'Clear Fizz'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cashews',
    slug: 'gourmet-roasted-salted-cashews',
    name: 'Gourmet Slow-Roasted Salted Cashews (W240)',
    brand: 'NUTRAJ PREMIUM',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Jumbo whole cashews roasted in Himalayan pink salt without palm oil, ultra crunchy.',
    fullDescription: 'Only whole, jumbo W240 grade cashews dry roasted to golden perfection with delicate pink salt.',
    price: 349,
    mrp: 499,
    discountPercentage: 30,
    rating: 4.9,
    reviewCount: 1420,
    stock: 80,
    inStock: true,
    unit: '250 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cashews', 'Nuts', 'Roasted Nuts', 'Healthy Snacks'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-almonds',
    slug: 'nutraj-california-roasted-almonds',
    name: 'Nutraj California Roasted Salted Almonds',
    brand: 'NUTRAJ',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Premium whole California badam roasted with light salt, rich in Vitamin E & plant protein.',
    fullDescription: 'Hand-sorted nonpareil almonds dry roasted for maximum nutty aroma and satisfying evening crunch.',
    price: 299,
    mrp: 399,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 1870,
    stock: 90,
    inStock: true,
    unit: '200 g Zip Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80'],
    tags: ['Almonds', 'Badam', 'Roasted Nuts', 'Protein'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cadbury-silk',
    slug: 'cadbury-dairy-milk-silk-hazelnut',
    name: 'Cadbury Dairy Milk Silk Hazelnut Bar',
    brand: 'CADBURY',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Melt-in-mouth smooth milk chocolate embedded with whole roasted Turkish hazelnuts.',
    fullDescription: 'Creamy, silky, indulgent chocolate crafted from 100% sustainably sourced cocoa beans.',
    price: 175,
    mrp: 195,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 6540,
    stock: 110,
    inStock: true,
    unit: '143 g Bar',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Chocolate', 'Silk', 'Cadbury', 'Hazelnut', 'Sweet'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-dark-chocolate',
    slug: 'amul-dark-chocolate-55-cocoa',
    name: 'Amul Dark Chocolate (55% Rich Cocoa)',
    brand: 'AMUL',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Real dark chocolate made from single-origin cocoa solids with smooth velvety bitterness.',
    fullDescription: 'Rich antioxidant treat with 55% cocoa solids and zero vegetable oil substitutions.',
    price: 105,
    mrp: 120,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 3980,
    stock: 85,
    inStock: true,
    unit: '150 g Bar',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dark Chocolate', 'Cocoa', 'Amul', 'Antioxidants'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kitkat',
    slug: 'kitkat-rich-chocolate-wafer-bar',
    name: 'Nestlé KitKat 4-Finger Crisp Wafer Bar',
    brand: 'NESTLÉ',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-namkeen',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Chips & Namkeen',
    description: 'Crispy oven-baked wafer fingers enrobed in smooth milk chocolate for the ultimate break.',
    fullDescription: 'Snap, bite, and break away with four crunchy fingers of light golden wafers coated in milk chocolate.',
    price: 30,
    mrp: 30,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 5120,
    stock: 140,
    inStock: true,
    unit: '38.5 g Bar',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80'],
    tags: ['KitKat', 'Chocolate Wafer', 'Nestle', 'Snacks'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tetley-greentea',
    slug: 'tetley-pure-green-tea-bags',
    name: 'Tetley 100% Pure Green Tea (25 Bags)',
    brand: 'TETLEY',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Steamed green tea leaves naturally rich in antioxidants to kickstart metabolism and focus.',
    fullDescription: 'Staple-free tea bags with smooth herbal aroma and clean uplifting finish without bitterness.',
    price: 145,
    mrp: 165,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 2890,
    stock: 90,
    inStock: true,
    unit: '25 Tea Bags Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'],
    tags: ['Green Tea', 'Tetley', 'Antioxidants', 'Herbal Tea'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-organic-india-tea',
    slug: 'organic-india-tulsi-ginger-green-tea',
    name: 'Organic India Tulsi Ginger Green Tea',
    brand: 'ORGANIC INDIA',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Healing adaptogenic blend of Rama, Krishna, and Vana Tulsi with pungent sun-dried ginger.',
    fullDescription: 'Supports healthy immunity and soothes digestion. Certified organic whole leaf tea bags.',
    price: 195,
    mrp: 220,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 1640,
    stock: 75,
    inStock: true,
    unit: '25 Bags Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'],
    tags: ['Tulsi Tea', 'Organic India', 'Ginger Tea', 'Immunity'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-valencia-juice',
    slug: 'raw-cold-pressed-valencia-orange-juice',
    name: 'Raw Pressery 100% Valencia Orange Juice',
    brand: 'RAW PRESSERY',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Fresh cold-pressed sweet Valencia oranges with zero added sugar, water, or preservatives.',
    fullDescription: 'Cold high-pressure processed to maintain raw enzymes and 100% recommended daily Vitamin C.',
    price: 99,
    mrp: 120,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 3120,
    stock: 65,
    inStock: true,
    unit: '250 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80'],
    tags: ['Orange Juice', 'Cold Pressed', 'Raw Pressery', 'Juices'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-real-mixed-fruit',
    slug: 'real-fruit-power-mixed-fruit-juice',
    name: 'Real Fruit Power 100% Mixed Fruit Juice',
    brand: 'REAL',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Nourishing blend of apples, mangoes, bananas, oranges, guavas, and pineapples in aseptic tetra pack.',
    fullDescription: 'Loaded with mixed fruit goodness, potassium, and antioxidants without artificial colorings.',
    price: 110,
    mrp: 130,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 4210,
    stock: 95,
    inStock: true,
    unit: '1 Litre Tetra Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80'],
    tags: ['Mixed Fruit', 'Juice', 'Real Fruit Power', 'Beverages'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-paperboat-aamras',
    slug: 'paper-boat-aamras-alphonso-juice',
    name: 'Paper Boat Alphonso Mango Aamras Juice',
    brand: 'PAPER BOAT',
    categoryId: 'cat-lite-snacks',
    subcategoryId: 'sub-l-drinks',
    categoryName: 'Snacks & Beverages',
    subcategoryName: 'Cold Drinks & Juices',
    description: 'Thick, sweet, nostalgic pure Ratnagiri alphonso mango pulp drink without preservatives.',
    fullDescription: 'Authentic Indian summer mango taste packed in an eco-friendly squeezable pouch.',
    price: 35,
    mrp: 40,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 3890,
    stock: 120,
    inStock: true,
    unit: '200 ml Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80'],
    tags: ['Aamras', 'Mango Juice', 'Paper Boat', 'Indian Drinks'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const SnacksBeverages: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = SNACKS_BEVERAGES_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Snacks & Beverages">
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

export default SnacksBeverages;
