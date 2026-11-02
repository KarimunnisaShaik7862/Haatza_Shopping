import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { haatzaLiteProducts } from '../data/liteData';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { 
  Sparkles, Zap, Plus, Minus, ArrowLeft, Clock, Star 
} from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated dairy, bakery, and breakfast essentials
export const DAIRY_BREAKFAST_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-amul-milk',
    slug: 'amul-taaza-homogenised-toned-milk',
    name: 'Amul Taaza Homogenised Toned Milk',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Fresh, pasteurized, homogenised toned cow & buffalo milk with 3.0% fat, rich in calcium.',
    fullDescription: 'Long shelf-life aseptic pack requiring no boiling. Fresh and pure, ideal for daily tea, coffee, and cereal.',
    price: 54,
    mrp: 56,
    discountPercentage: 4,
    rating: 4.9,
    reviewCount: 4210,
    stock: 120,
    inStock: true,
    unit: '1 Litre Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80'],
    tags: ['Milk', 'Toned Milk', 'Dairy', 'Breakfast', 'Amul'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-motherdairy-cowmilk',
    slug: 'mother-dairy-classic-cow-milk',
    name: 'Mother Dairy Classic Cow Milk',
    brand: 'MOTHER DAIRY',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Pure, easily digestible sweet cow milk, enriched with Vitamin A and D for healthy bones.',
    fullDescription: 'Sourced from well-nourished cattle, chilled instantly at collection centres to lock in morning farm freshness.',
    price: 28,
    mrp: 30,
    discountPercentage: 7,
    rating: 4.8,
    reviewCount: 2310,
    stock: 90,
    inStock: true,
    unit: '500 ml Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cow Milk', 'Milk', 'Dairy', 'Fresh', 'Mother Dairy'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-country-delight-milk',
    slug: 'country-delight-farm-fresh-cow-milk',
    name: 'Country Delight Farm Fresh Desi Cow Milk',
    brand: 'COUNTRY DELIGHT',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: '100% natural, unadulterated raw-tested farm milk bottled in premium sanitized glass bottles.',
    fullDescription: 'Delivered cold straight from regional partner dairy farms within 24-36 hours of milking.',
    price: 79,
    mrp: 90,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 1850,
    stock: 65,
    inStock: true,
    unit: '1 Litre Glass Bottle',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Desi Milk', 'Raw Milk', 'Dairy', 'Glass Bottle'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-butter',
    slug: 'amul-pasteurised-salted-butter',
    name: 'Amul Pasteurised Salted Table Butter',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'The golden classic Indian table butter made from pure fresh cream with signature salty richness.',
    fullDescription: 'Spreads smoothly over crisp toasts, parathas, dosas, and warm baked goods. Utterly butterly delicious.',
    price: 275,
    mrp: 290,
    discountPercentage: 5,
    rating: 5.0,
    reviewCount: 9400,
    stock: 140,
    inStock: true,
    unit: '500 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80'],
    tags: ['Butter', 'Table Butter', 'Salted Butter', 'Amul', 'Breakfast'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-britannia-butter',
    slug: 'britannia-delicious-table-butter',
    name: 'Britannia Delicious Creamy Table Butter',
    brand: 'BRITANNIA',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Smooth, golden-yellow butter churned from pure cow milk cream for delicate morning toasts.',
    fullDescription: 'Rich creamy texture with balanced sodium content, crafted for both cooking and tabletop spreading.',
    price: 58,
    mrp: 62,
    discountPercentage: 6,
    rating: 4.7,
    reviewCount: 1120,
    stock: 80,
    inStock: true,
    unit: '100 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80'],
    tags: ['Butter', 'Britannia', 'Dairy', 'Creamy'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-farm-eggs',
    slug: 'eggsoz-free-range-brown-eggs-12',
    name: 'Eggsoz Free-Range Organic Brown Eggs',
    brand: 'EGGSOZ',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-eggs',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Farm Eggs',
    description: 'Graded, free-range brown eggs in a protective molded pulp carton, enriched with omega-3 & deep golden yolks.',
    fullDescription: 'Sourced from pasture-raised hens fed a 100% vegetarian organic diet. Cleaned, UV-sanitized, and farm-fresh.',
    price: 119,
    mrp: 145,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 3450,
    stock: 95,
    inStock: true,
    unit: 'Pack of 12 Eggs',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80'],
    tags: ['Eggs', 'Brown Eggs', 'Protein', 'Breakfast', 'Free-range'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-white-eggs',
    slug: 'farm-fresh-white-country-eggs-6',
    name: 'Farm Fresh Classic White Eggs',
    brand: 'HAATZA FARMS',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-eggs',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Farm Eggs',
    description: 'High-protein fresh white table eggs, candled and temperature checked for daily omelettes & baking.',
    fullDescription: 'Handpicked daily from bio-secure farms. High in essential amino acids and choline.',
    price: 52,
    mrp: 60,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 2890,
    stock: 110,
    inStock: true,
    unit: 'Pack of 6 Eggs',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80'],
    tags: ['Eggs', 'White Eggs', 'Protein', 'Breakfast'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-wheat-bread',
    slug: 'english-oven-whole-wheat-bread',
    name: 'English Oven 100% Whole Wheat Bread',
    brand: 'ENGLISH OVEN',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-bread',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Breads & Bakery',
    description: 'Zero maida artisan brown bread crafted from 100% whole grain wheat flour with high dietary fiber.',
    fullDescription: 'Soft, airy texture baked fresh every morning without artificial preservatives or trans fats.',
    price: 48,
    mrp: 55,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 5210,
    stock: 90,
    inStock: true,
    unit: '400 g Loaf',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Bread', 'Whole Wheat', 'Bakery', 'Zero Maida', 'Breakfast'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-multigrain-bread',
    slug: 'modern-multigrain-artisan-bread',
    name: 'Modern 7-Grain Multigrain Sandwich Bread',
    brand: 'MODERN',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-bread',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Breads & Bakery',
    description: 'Crusted with roasted flax, oats, sesame, and sunflower seeds for high fiber healthy breakfast toasts.',
    fullDescription: 'Baked with premium whole grains to keep you energized through the morning. Thick, soft sandwich slices.',
    price: 55,
    mrp: 65,
    discountPercentage: 15,
    rating: 4.7,
    reviewCount: 1670,
    stock: 75,
    inStock: true,
    unit: '400 g Loaf',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'],
    tags: ['Bread', 'Multigrain', 'Bakery', 'Seeds', 'Fiber'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-paneer',
    slug: 'amul-fresh-malai-paneer-block',
    name: 'Amul Fresh Soft Malai Paneer',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Ultra-fresh soft cottage cheese made from 100% pasteurized cow & buffalo milk, high protein.',
    fullDescription: 'Vacuum sealed for maximum softness and freshness. Perfect for creamy shahi paneer, bhurji, or tikka.',
    price: 95,
    mrp: 105,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 6800,
    stock: 130,
    inStock: true,
    unit: '200 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Paneer', 'Malai Paneer', 'Dairy', 'Protein', 'Amul'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-milky-mist-paneer',
    slug: 'milky-mist-fresh-diced-paneer',
    name: 'Milky Mist Premium Diced Fresh Paneer',
    brand: 'MILKY MIST',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Convenient pre-diced cottage cheese cubes with firm texture that won’t crumble during curry simmering.',
    fullDescription: 'Made from farm-fresh pasteurized milk under untouched automated processing. High in calcium and whey protein.',
    price: 110,
    mrp: 125,
    discountPercentage: 12,
    rating: 4.8,
    reviewCount: 2190,
    stock: 85,
    inStock: true,
    unit: '200 g Vacuum Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'],
    tags: ['Paneer', 'Diced Paneer', 'Dairy', 'Protein'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-motherdairy-dahi',
    slug: 'mother-dairy-classic-dahi-curd-tub',
    name: 'Mother Dairy Ultimate Fresh Curd / Dahi',
    brand: 'MOTHER DAIRY',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Thick, creamy, set dahi with active live probiotic cultures for smooth gut health and digestion.',
    fullDescription: 'Prepared using standardized pasteurized milk with consistent velvety firmness. Great for raita, lassi, or chaat.',
    price: 40,
    mrp: 45,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 4100,
    stock: 115,
    inStock: true,
    unit: '400 g Tub',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'],
    tags: ['Curd', 'Dahi', 'Probiotics', 'Dairy', 'Mother Dairy'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-epigamia-yogurt',
    slug: 'epigamia-greek-yogurt-natural',
    name: 'Epigamia Probiotic Greek Yogurt (Zero Fat)',
    brand: 'EPIGAMIA',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Strained authentic Greek yogurt packed with 6g natural protein and zero added refined sugars.',
    fullDescription: 'Thick, velvety texture that pairs delightfully with morning granola, honey, or fresh berries.',
    price: 60,
    mrp: 70,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 1940,
    stock: 70,
    inStock: true,
    unit: '100 g Cup',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=600&q=80'],
    tags: ['Yogurt', 'Greek Yogurt', 'Protein', 'Zero Fat'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-cheese-block',
    slug: 'amul-processed-cheese-blocks',
    name: 'Amul Classic Processed Cheese Block',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'The iconic Indian processed cheddar cheese block with signature creamy texture and melt-in-mouth taste.',
    fullDescription: 'Grates effortlessly over chilli cheese toasts, sandwiches, dosas, and parathas. High in calcium and dairy protein.',
    price: 135,
    mrp: 145,
    discountPercentage: 7,
    rating: 4.9,
    reviewCount: 7890,
    stock: 120,
    inStock: true,
    unit: '200 g Block',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cheese', 'Amul Cheese', 'Dairy', 'Cheddar', 'Breakfast'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-britannia-mozzarella',
    slug: 'britannia-cheezza-mozzarella-shreds',
    name: 'Britannia Cheezza Mozzarella Blend',
    brand: 'BRITANNIA',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Pre-shredded mozzarella cheese with dramatic stretch and rich browning for homemade pizza and garlic toasts.',
    fullDescription: 'Perfect moisture blend formulated for gooey stretches without turning oily or tough.',
    price: 149,
    mrp: 165,
    discountPercentage: 10,
    rating: 4.8,
    reviewCount: 2430,
    stock: 80,
    inStock: true,
    unit: '200 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cheese', 'Mozzarella', 'Pizza Cheese', 'Dairy'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-cream',
    slug: 'amul-fresh-malai-cream',
    name: 'Amul Fresh Low-Fat Whipping Cream',
    brand: 'AMUL',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Sterilized low-fat fresh cream (25% milk fat) for silky smooth curries, desserts, fruit salads, and coffee.',
    fullDescription: 'Prepared using chilled sweet cream. Aseptic packaging keeps it fresh without refrigeration until opened.',
    price: 68,
    mrp: 75,
    discountPercentage: 9,
    rating: 4.8,
    reviewCount: 3100,
    stock: 95,
    inStock: true,
    unit: '250 ml Tetra',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556760544-74068565f05c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cream', 'Fresh Cream', 'Amul', 'Dairy'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-gowardhan-ghee',
    slug: 'gowardhan-pure-cow-ghee-jar',
    name: 'Gowardhan Pure Traditional Cow Ghee',
    brand: 'GOWARDHAN',
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-milk',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Milk & Paneer',
    description: 'Golden granular cow ghee crafted from fresh cow milk fat with rich nutty aroma and authentic taste.',
    fullDescription: 'Natural source of fat-soluble vitamins A, D, E, and K. Enhances hot parathas, khichdi, and morning dosas.',
    price: 345,
    mrp: 390,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 4670,
    stock: 65,
    inStock: true,
    unit: '500 ml Glass Jar',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ghee', 'Cow Ghee', 'Dairy', 'Gowardhan'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kelloggs-oats',
    slug: 'kelloggs-real-whole-rolled-oats',
    name: 'Kellogg’s 100% Whole Grain Rolled Oats',
    brand: "KELLOGG'S",
    categoryId: 'cat-lite-dairy',
    subcategoryId: 'sub-l-bread',
    categoryName: 'Dairy & Breakfast',
    subcategoryName: 'Breads & Bakery',
    description: 'High-fiber heart-healthy breakfast rolled oats that cook in just 3 minutes with hot milk or water.',
    fullDescription: 'Rich in beta-glucan fiber to support active mornings and steady cholesterol levels. Zero added sugar.',
    price: 125,
    mrp: 145,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 3820,
    stock: 85,
    inStock: true,
    unit: '500 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80'],
    tags: ['Oats', 'Rolled Oats', 'Breakfast', 'Cereal', 'Fiber'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const DairyBreakfast: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = DAIRY_BREAKFAST_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Dairy & Breakfast">
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

export default DairyBreakfast;
