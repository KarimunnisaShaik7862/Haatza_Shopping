import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { 
  Sparkles, Zap, Plus, Minus, ArrowLeft, Clock, Heart, ShieldCheck, Star 
} from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Curated 22-item high-density catalog of everyday personal care, hygiene, haircare, skincare, and grooming essentials
export const PERSONAL_CARE_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-dettol-handwash',
    slug: 'dettol-aloe-citrus-antibacterial-hand-wash',
    name: 'Dettol Aloe & Citrus Antibacterial Hand Wash',
    brand: 'DETTOL PRO',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-bath-body',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Germ-defense liquid hand wash infused with soothing aloe vera and natural citrus extract.',
    fullDescription: 'Clinically tested to eliminate 99.9% germs while nourishing dry hands. Dermatologically tested for daily use.',
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
    tags: ['Hand Wash', 'Dettol', 'Aloe Vera', 'Antibacterial', 'Hygiene'],
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
    subcategoryId: 'sub-l-bath-body',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Crafted with 98% pure glycerine and natural botanical oils for smooth, hydrated, radiant skin.',
    fullDescription: 'Traditional gentle formula that preserves natural skin moisture without stripping essential protective oils.',
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
    tags: ['Soap', 'Pears', 'Glycerine', 'Body Care', 'Gentle'],
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
    subcategoryId: 'sub-l-haircare',
    categoryName: 'Personal Care',
    subcategoryName: 'Hair Care & Shampoos',
    description: 'Formulated with Keratin-XS and Ceramide to fight hair fall, dryness, roughness, dullness, and split ends.',
    fullDescription: 'Intense micro-repair formula that penetrates damaged hair fibers from root to tip for silky salon-smooth strands.',
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
    tags: ['Shampoo', 'Loreal', 'Haircare', 'Repair', 'Keratin'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dove-shampoo',
    slug: 'dove-intense-repair-damage-therapy-shampoo',
    name: 'Dove Intense Repair Damage Therapy Shampoo',
    brand: 'DOVE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-haircare',
    categoryName: 'Personal Care',
    subcategoryName: 'Hair Care & Shampoos',
    description: 'Enriched with Fiber Actives and 1/4th moisturizing cream to deeply reconstruct brittle cuticles.',
    fullDescription: 'Progressively nourishes hair wash after wash, making hair visibly healthier, resilient, and 10x stronger against breakage.',
    price: 285,
    mrp: 340,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 3820,
    stock: 120,
    inStock: true,
    unit: '340 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dove', 'Shampoo', 'Moisturizing', 'Haircare'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-head-shoulders',
    slug: 'head-shoulders-cool-menthol-anti-dandruff-shampoo',
    name: 'Head & Shoulders Cool Menthol Anti-Dandruff Shampoo',
    brand: 'HEAD & SHOULDERS',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-haircare',
    categoryName: 'Personal Care',
    subcategoryName: 'Hair Care & Shampoos',
    description: 'Icy cool sensation with clinically proven zinc pyrithione formula that eliminates up to 100% visible dandruff.',
    fullDescription: 'Leaves hair completely fresh, flakes-free, and invigorated with long-lasting crisp cooling menthol sensation.',
    price: 310,
    mrp: 360,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 4670,
    stock: 130,
    inStock: true,
    unit: '340 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Anti-Dandruff', 'Cool Menthol', 'Shampoo', 'Head & Shoulders'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tresemme-conditioner',
    slug: 'tresemme-keratin-smooth-argan-oil-conditioner',
    name: 'Tresemme Keratin Smooth & Argan Oil Conditioner',
    brand: 'TRESEMME',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-haircare',
    categoryName: 'Personal Care',
    subcategoryName: 'Hair Care & Shampoos',
    description: 'Infused with precious Moroccan Argan oil and Keratin proteins to tame unruly frizz for up to 72 hours.',
    fullDescription: 'Provides lightweight salon-quality hydration, making hair manageable, shiny, and silky smooth.',
    price: 230,
    mrp: 275,
    discountPercentage: 16,
    rating: 4.7,
    reviewCount: 1980,
    stock: 80,
    inStock: true,
    unit: '190 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=600&q=80'],
    tags: ['Tresemme', 'Conditioner', 'Keratin', 'Argan Oil'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-nivea-bodywash',
    slug: 'nivea-creme-soft-pampering-shower-gel',
    name: 'Nivea Creme Soft Nourishing Shower Gel',
    brand: 'NIVEA',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-bath-body',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Enriched with rich almond oil to moisturize dry skin with a delicate, gentle cleansing foam.',
    fullDescription: 'Maintains skin natural microbiome balance. Biodegradable, pH skin-neutral formula that leaves skin velvety soft.',
    price: 165,
    mrp: 199,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2450,
    stock: 115,
    inStock: true,
    unit: '250 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1608248597359-597548b26097?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1608248597359-597548b26097?auto=format&fit=crop&w=600&q=80'],
    tags: ['Nivea', 'Body Wash', 'Shower Gel', 'Almond Oil'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dove-bodywash',
    slug: 'dove-deeply-nourishing-hydrating-body-wash',
    name: 'Dove Deeply Nourishing Hydrating Body Wash',
    brand: 'DOVE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-bath-body',
    categoryName: 'Personal Care',
    subcategoryName: 'Bath & Hand Soaps',
    description: 'Triple moisture serum and NutriumMoisture formula that transforms even the driest skin in just one shower.',
    fullDescription: 'Dermatologist-recommended mild cleansers with no parabens or sulfates. Delivers soft, smooth, healthy skin.',
    price: 180,
    mrp: 220,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 3150,
    stock: 100,
    inStock: true,
    unit: '250 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dove', 'Body Wash', 'Nourishing', 'Gentle'],
    isTrending: false,
    isBestseller: false,
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
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Pure Grade Niacinamide with Zinc PCA to fade acne marks, reduce blemishes, and strengthen skin barrier.',
    fullDescription: 'Fragrance-free clinical formulation. Clears blemishes and balances oil production for clean, flawless texture.',
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
    tags: ['Minimalist', 'Serum', 'Niacinamide', 'Skincare', 'Zinc'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cetaphil-cleanser',
    slug: 'cetaphil-gentle-skin-cleanser-sensitive-skin',
    name: 'Cetaphil Gentle Skin Cleanser Face Wash',
    brand: 'CETAPHIL',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Dermatologist backed soothing soap-free cleanser for dry to normal sensitive facial skin.',
    fullDescription: 'Formulated with Niacinamide, Panthenol, and hydrating Glycerin. Defends against 5 signs of skin sensitivity.',
    price: 360,
    mrp: 415,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 4890,
    stock: 85,
    inStock: true,
    unit: '125 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556228722-d0b6d214a1a3?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228722-d0b6d214a1a3?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cetaphil', 'Face Wash', 'Cleanser', 'Sensitive Skin'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-nivea-soft-cream',
    slug: 'nivea-soft-light-moisturizer-vitamin-e',
    name: 'Nivea Soft Light Moisturizing Cream with Vitamin E',
    brand: 'NIVEA',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Quick-absorbing non-greasy refreshing daily moisturizer infused with Jojoba oil and Vitamin E.',
    fullDescription: 'Ideal for face, hands, and body. Leaves skin feeling instantly refreshed, supple, and comfortably hydrated.',
    price: 240,
    mrp: 295,
    discountPercentage: 19,
    rating: 4.8,
    reviewCount: 3600,
    stock: 140,
    inStock: true,
    unit: '200 ml Tub',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Nivea', 'Moisturizer', 'Face Cream', 'Vitamin E'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-ponds-superlight',
    slug: 'ponds-super-light-oil-free-gel-moisturiser',
    name: "Pond's Super Light Oil-Free Gel Moisturiser",
    brand: "POND'S",
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Ultra-lightweight water-burst gel with Hyaluronic Acid and Vitamin E for a 24-hour non-sticky glow.',
    fullDescription: 'Locks in hydration 2x faster than heavy creams. Restores water balance with zero greasy residue.',
    price: 185,
    mrp: 230,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 3410,
    stock: 130,
    inStock: true,
    unit: '100 g Tub',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ponds', 'Gel Cream', 'Hyaluronic Acid', 'Moisturiser'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-neutrogena-sunscreen',
    slug: 'neutrogena-ultra-sheer-dry-touch-sunscreen-spf50',
    name: 'Neutrogena Ultra Sheer Dry-Touch Sunscreen SPF 50+',
    brand: 'NEUTROGENA',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Helioplex broad-spectrum UVA/UVB defense with ultra-matte oil-free finish that does not clog pores.',
    fullDescription: 'Water-resistant, non-comedogenic sunscreen lotion with a light clean scent and weightless, non-shiny texture.',
    price: 499,
    mrp: 580,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 4200,
    stock: 90,
    inStock: true,
    unit: '80 ml Tube',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sunscreen', 'SPF 50', 'Neutrogena', 'UV Protection'],
    isTrending: true,
    isBestseller: true,
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
    subcategoryId: 'sub-l-oral-care',
    categoryName: 'Personal Care',
    subcategoryName: 'Oral Care & Toothpastes',
    description: 'Dual Zinc + Arginine antibacterial technology that provides 12-hour whole mouth defense against plaque.',
    fullDescription: 'Protects teeth, tongue, cheeks, and gums from cavities, tartar, enamel decay, and morning bad breath.',
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
  {
    id: 'prod-lite-sensodyne-rapid',
    slug: 'sensodyne-rapid-relief-sensitive-teeth-toothpaste',
    name: 'Sensodyne Rapid Relief Sensitive Toothpaste',
    brand: 'SENSODYNE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-oral-care',
    categoryName: 'Personal Care',
    subcategoryName: 'Oral Care & Toothpastes',
    description: 'Clinically proven fast relief from tooth sensitivity pain within 60 seconds of gentle direct application.',
    fullDescription: 'Builds a protective mineral scaffold over exposed dentine areas to block nerve pain triggers from hot and cold beverages.',
    price: 195,
    mrp: 230,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 3820,
    stock: 110,
    inStock: true,
    unit: '80 g Tube',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sensodyne', 'Toothpaste', 'Sensitivity', 'Oral Care'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-oralb-toothbrush',
    slug: 'oral-b-ultrathin-pro-deep-clean-toothbrushes-pack',
    name: 'Oral-B UltraThin Pro Deep Clean Toothbrushes',
    brand: 'ORAL-B',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-oral-care',
    categoryName: 'Personal Care',
    subcategoryName: 'Oral Care & Toothpastes',
    description: '0.01 mm ultrathin tapered bristles designed for 2x deeper cleaning along the delicate gum line.',
    fullDescription: 'Ergonomic non-slip grip handle with molded tongue cleaner on the reverse side for 360-degree daily mouth hygiene.',
    price: 140,
    mrp: 175,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 2190,
    stock: 130,
    inStock: true,
    unit: 'Pack of 4 Brushes',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=600&q=80'],
    tags: ['Oral-B', 'Toothbrush', 'Oral Hygiene', 'Pack of 4'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-listerine-mouthwash',
    slug: 'listerine-cool-mint-antiseptic-mouthwash',
    name: 'Listerine Cool Mint Antiseptic Mouthwash',
    brand: 'LISTERINE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-oral-care',
    categoryName: 'Personal Care',
    subcategoryName: 'Oral Care & Toothpastes',
    description: 'Kills 99.9% bad breath germs and cleans where toothbrush bristles cannot reach.',
    fullDescription: 'Powered by 4 essential botanical oils (Eucalyptol, Menthol, Methyl Salicylate, and Thymol) for 24-hour fresh breath.',
    price: 155,
    mrp: 185,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 2950,
    stock: 95,
    inStock: true,
    unit: '250 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556228722-d0b6d214a1a3?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228722-d0b6d214a1a3?auto=format&fit=crop&w=600&q=80'],
    tags: ['Listerine', 'Mouthwash', 'Cool Mint', 'Oral Care'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-nivea-men-deodorant',
    slug: 'nivea-men-fresh-active-48h-deodorant-spray',
    name: 'Nivea Men Fresh Active 48h Deodorant Spray',
    brand: 'NIVEA MEN',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Personal Care',
    subcategoryName: 'Deodorants & Grooming',
    description: 'Ocean extracts formula delivering long-lasting 48-hour freshness with zero aluminum and gentle skin tolerance.',
    fullDescription: 'Invigorating crisp marine aroma that combats body odor bacteria directly, leaving no white marks on dark clothing.',
    price: 199,
    mrp: 249,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 4210,
    stock: 120,
    inStock: true,
    unit: '150 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_amber_spray.png',
    images: ['/images/products/3d_amber_spray.png'],
    tags: ['Deodorant', 'Nivea Men', 'Fresh Active', 'Spray'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-gillette-mach3',
    slug: 'gillette-mach3-turbo-men-shaving-razor',
    name: "Gillette Mach3 Turbo Men's Razor (1 Handle + 2 Cartridges)",
    brand: 'GILLETTE',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Personal Care',
    subcategoryName: 'Deodorants & Grooming',
    description: '3 stronger-than-steel blades designed for a cleaner, closer shave with up to 15 comfortable shaves per cartridge.',
    fullDescription: 'Longer-lasting lubrication strip glides smoothly to prevent shaving burns and redness, complete with microfins skin guard.',
    price: 349,
    mrp: 399,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 3120,
    stock: 85,
    inStock: true,
    unit: '1 Razor + 2 Cartridges',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80'],
    tags: ['Gillette', 'Mach3', 'Razor', 'Shaving', 'Grooming'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-yardley-deodorant',
    slug: 'yardley-london-english-lavender-body-spray',
    name: 'Yardley London English Lavender Luxury Body Spray',
    brand: 'YARDLEY LONDON',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Personal Care',
    subcategoryName: 'Deodorants & Grooming',
    description: 'Contemporary fragrance crafted with pure lavender oil and delicate floral notes for all-day elegance.',
    fullDescription: 'Timeless British heritage formulation that leaves skin delicately scented with crisp aromatic freshness.',
    price: 185,
    mrp: 230,
    discountPercentage: 20,
    rating: 4.7,
    reviewCount: 1650,
    stock: 90,
    inStock: true,
    unit: '150 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'],
    tags: ['Yardley', 'Lavender', 'Body Spray', 'Fragrance', 'Deodorant'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-shaving-foam',
    slug: 'bombay-shaving-company-charcoal-shaving-foam',
    name: 'Bombay Shaving Company Charcoal Shaving Foam',
    brand: 'BOMBAY SHAVING CO',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-grooming',
    categoryName: 'Personal Care',
    subcategoryName: 'Deodorants & Grooming',
    description: 'Enriched with activated charcoal, Moroccan argan oil, and aloe vera for effortless razor glide.',
    fullDescription: '2x creamy conditioning lather prevents cuts and razor burn while unclogging pores during shave.',
    price: 175,
    mrp: 220,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 1840,
    stock: 80,
    inStock: true,
    unit: '200 ml Can',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=600&q=80'],
    tags: ['Shaving Foam', 'Charcoal', 'Grooming', 'Men Care'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cotton-pads',
    slug: 'tulips-pure-cotton-pads-dual-sided',
    name: 'Tulips 100% Pure Natural Cotton Pads',
    brand: 'TULIPS',
    categoryId: 'cat-lite-personal-care',
    subcategoryId: 'sub-l-skincare',
    categoryName: 'Personal Care',
    subcategoryName: 'Skincare & Creams',
    description: 'Lint-free dual-sided stitched pads ideal for makeup removal, micellar water, and facial toner application.',
    fullDescription: 'Super-soft dermatologically tested cotton gentle on delicate eye contours and baby skin.',
    price: 99,
    mrp: 125,
    discountPercentage: 21,
    rating: 4.8,
    reviewCount: 1980,
    stock: 140,
    inStock: true,
    unit: 'Pack of 50 Pads',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_cotton_towel.png',
    images: ['/images/products/3d_cotton_towel.png'],
    tags: ['Cotton Pads', 'Skincare', 'Makeup Remover', 'Gentle'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const PersonalCare: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = PERSONAL_CARE_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Personal Care">
        {/* High-Density Product Card Grid (grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5) */}
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

export default PersonalCare;
