import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import {
  Sparkles, Zap, Plus, Minus, ArrowLeft, Clock, ShieldCheck, Star
} from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Curated 22-item high-density catalog of kitchen tools, cookware, containers, cutting boards, spatulas, and foils
export const KITCHEN_ESSENTIALS_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-chef-knife',
    slug: 'prestige-tru-edge-stainless-steel-chef-knife',
    name: "Prestige Tru-Edge Stainless Steel Chef's Knife (8 Inch)",
    brand: 'PRESTIGE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-prep-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Knives & Cutting Boards',
    description: 'High-carbon surgical grade stainless steel razor blade with contoured ergonomic non-slip grip handle.',
    fullDescription: 'Razor-sharp precision edge designed for effortless slicing, dicing, and chopping of meat, fruits, and vegetables.',
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
    tags: ['Knife', 'Chef Knife', 'Prestige', 'Stainless Steel', 'Kitchen Tools'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-bamboo-board',
    slug: 'pigeon-premium-natural-bamboo-chopping-board',
    name: 'Pigeon Natural Bamboo Wood Chopping Board with Juice Groove',
    brand: 'PIGEON',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-prep-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Knives & Cutting Boards',
    description: 'Eco-friendly solid organic bamboo board with deep perimeter juice groove to prevent countertop spills.',
    fullDescription: 'Knife-friendly surface that resists deep cuts, odor absorption, and bacterial moisture build-up.',
    price: 399,
    mrp: 550,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 3120,
    stock: 120,
    inStock: true,
    unit: '34 x 24 cm Board',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80'],
    tags: ['Chopping Board', 'Bamboo', 'Pigeon', 'Kitchen Woodware'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-frying-pan',
    slug: 'hawkins-futura-non-stick-frying-pan',
    name: 'Hawkins Futura Hard Anodised Non-Stick Frying Pan',
    brand: 'HAWKINS FUTURA',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-cookware',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Cookware & Pans',
    description: 'Tough hard anodised base with PFOA-free nonstick coating for low-oil searing, sautéing, and frying.',
    fullDescription: 'Heavy gauge 3.25 mm pure virgin aluminum bottom conducts heat uniformly without hot spots. Stay-cool handle.',
    price: 899,
    mrp: 1075,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 4180,
    stock: 80,
    inStock: true,
    unit: '24 cm Pan (1.75 Litre)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Frying Pan', 'Non-Stick', 'Hawkins', 'Cookware'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dosa-tawa',
    slug: 'prestige-omega-deluxe-granite-dosa-tawa',
    name: 'Prestige Omega Deluxe Granite Non-Stick Dosa Tawa',
    brand: 'PRESTIGE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-cookware',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Cookware & Pans',
    description: '5-layered German granite stone non-stick coating suitable for gas and induction cooktops.',
    fullDescription: 'Wide 280 mm circular diameter designed for paper-crisp dosas, rotis, parathas, and crepes with zero sticking.',
    price: 849,
    mrp: 1100,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 3670,
    stock: 75,
    inStock: true,
    unit: '28 cm Diameter Tawa',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dosa Tawa', 'Prestige', 'Granite', 'Cookware'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cello-containers',
    slug: 'cello-checkers-airtight-food-storage-containers-pack',
    name: 'Cello Checkers Airtight Modular Food Storage Containers',
    brand: 'CELLO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-storage',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Storage Containers & Jars',
    description: '100% BPA-free food-grade plastic containers with checkered grip pattern and airtight silicone seal rings.',
    fullDescription: 'Stackable space-saving design keeps pulses, spices, dry fruits, and snacks crisp and insect-free for months.',
    price: 399,
    mrp: 520,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 3890,
    stock: 140,
    inStock: true,
    unit: 'Set of 6 x 1000 ml Jars',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Containers', 'Cello', 'Airtight', 'Food Storage', 'Jars'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-borosil-glass-bowls',
    slug: 'borosil-klip-n-store-microwavable-glass-containers',
    name: 'Borosil Klip N Store Airtight Borosilicate Glass Containers',
    brand: 'BOROSIL',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-storage',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Storage Containers & Jars',
    description: '100% borosilicate glass that withstands temperatures from -20°C to 400°C. Microwave and dishwasher safe.',
    fullDescription: 'Does not leech toxic chemicals, stains, or odors. Crystal-clear snap lock lids ensure zero gravy leakage in lunchboxes.',
    price: 649,
    mrp: 795,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 4210,
    stock: 90,
    inStock: true,
    unit: 'Set of 3 (320ml, 520ml, 800ml)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Borosil', 'Glass Containers', 'Microwave Safe', 'Storage'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-silicone-spatula',
    slug: 'meyer-silicone-heat-resistant-spatula-spoon-set',
    name: 'Meyer Silicone Heat-Resistant Spatula & Spoon Set',
    brand: 'MEYER PRO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: 'Seamless one-piece hygienic food grade silicone tools heat resistant up to 260°C. Protects non-stick pans.',
    fullDescription: 'Reinforced stainless steel core prevents bending while flexible silicone contours smoothly scrape every drop.',
    price: 349,
    mrp: 450,
    discountPercentage: 22,
    rating: 4.9,
    reviewCount: 2650,
    stock: 110,
    inStock: true,
    unit: 'Pack of 3 Essential Tools',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Spatula', 'Silicone', 'Cooking Tools', 'Non-Stick Safe'],
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
    subcategoryId: 'sub-l-foils',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Foils & Disposables',
    description: '11-micron thick heavy-duty aluminum foil that locks in warmth, freshness, and moisture for up to 12 hours.',
    fullDescription: 'Certified food contact safe. Ideal for packing hot rotis, sandwiches, grilling paneer, and baking delicacies.',
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
    tags: ['Aluminum Foil', 'Freshwrapp', 'Food Wrap', 'Baking Foil'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dish-rack',
    slug: 'plantex-stainless-steel-countertop-dish-drainer-rack',
    name: 'Plantex Stainless Steel Dish Drying Rack with Drip Tray',
    brand: 'PLANTEX',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: 'Anti-rust chrome coated stainless steel countertop drying rack with removable water drainer tray and spoon holder.',
    fullDescription: 'Holds up to 14 dinner plates, 6 bowls, and cutlery simultaneously. Keeps countertop dry and organized.',
    price: 699,
    mrp: 899,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 2190,
    stock: 65,
    inStock: true,
    unit: '1 Stand (45 x 30 x 15 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'],
    tags: ['Dish Rack', 'Drainer Stand', 'Plantex', 'Stainless Steel'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-oil-dispenser',
    slug: 'signoraware-easy-flow-glass-cooking-oil-dispenser',
    name: 'Signoraware Easy-Flow Glass Cooking Oil Dispenser Bottle',
    brand: 'SIGNORAWARE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-storage',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Storage Containers & Jars',
    description: 'Drip-free silicone pour spout with dust cover lid and clear volume measurement markings on thick glass bottle.',
    fullDescription: 'Prevents excess oil pouring and messy countertop rings. Safe for olive oil, sesame oil, mustard oil, and vinegars.',
    price: 249,
    mrp: 320,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 3120,
    stock: 125,
    inStock: true,
    unit: '1000 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'],
    tags: ['Oil Dispenser', 'Glass Bottle', 'Cooking Oil', 'Signoraware'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kitchen-scissors',
    slug: 'solimo-multipurpose-stainless-steel-kitchen-shears',
    name: 'Solimo Multipurpose Stainless Steel Kitchen Scissors',
    brand: 'SOLIMO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-prep-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Knives & Cutting Boards',
    description: 'Heavy duty serrated steel shears designed for cutting poultry, meat bones, herbs, and opening food packets.',
    fullDescription: 'Built-in walnut cracker and bottle opener integrated into center pivot handle. Comfortable non-slip rubber grip.',
    price: 199,
    mrp: 275,
    discountPercentage: 28,
    rating: 4.7,
    reviewCount: 1950,
    stock: 140,
    inStock: true,
    unit: '1 Pair (21 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=600&q=80'],
    tags: ['Kitchen Scissors', 'Shears', 'Solimo', 'Stainless Steel'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-box-grater',
    slug: 'solimo-4-in-1-stainless-steel-box-grater-slicer',
    name: 'Solimo 4-in-1 Stainless Steel Box Grater with Handle',
    brand: 'SOLIMO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-prep-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Knives & Cutting Boards',
    description: '4 versatile grating surfaces: Coarse Shred, Medium Shred, Fine Zester, and Cucumber Slicing blade.',
    fullDescription: 'Extra-sturdy stainless steel construction with non-skid rubber base that prevents sliding while grating cheese or veggies.',
    price: 249,
    mrp: 320,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 2410,
    stock: 105,
    inStock: true,
    unit: '1 Box Grater (22 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Grater', 'Zester', 'Cheese Grater', 'Solimo'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-saucepan',
    slug: 'milton-pro-stainless-steel-tea-saucepan-glass-lid',
    name: 'Milton Pro Stainless Steel Chai & Saucepan with Glass Lid',
    brand: 'MILTON PRO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-cookware',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Cookware & Pans',
    description: 'Tri-ply sandwich bottom pan with cool-touch silicone grip handle and tempered steam-vent glass lid.',
    fullDescription: 'Perfect for brewing morning masala chai, boiling milk, noodles, soups, and baby food with zero burning.',
    price: 599,
    mrp: 750,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 3890,
    stock: 90,
    inStock: true,
    unit: '1.5 Litre Pan (16 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Saucepan', 'Tea Pan', 'Milton', 'Stainless Steel', 'Tri-Ply'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kadai',
    slug: 'vinod-stainless-steel-induction-bottom-kadai-lid',
    name: 'Vinod Stainless Steel Induction Bottom Kadai with Lid',
    brand: 'VINOD',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-cookware',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Cookware & Pans',
    description: 'Heavy gauge mirror finish stainless steel deep kadai with bonded impact base and riveted sturdy handles.',
    fullDescription: 'Retains heat for deep frying pooris, browning aromatics, and simmering curries without discoloration.',
    price: 799,
    mrp: 999,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 2750,
    stock: 70,
    inStock: true,
    unit: '2.5 Litre Kadai (22 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80'],
    tags: ['Kadai', 'Vinod', 'Stainless Steel', 'Induction', 'Cookware'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tongs',
    slug: 'solimo-stainless-steel-cooking-tongs-silicone-heads',
    name: "Solimo Stainless Steel Cooking Tongs with Silicone Grip",
    brand: 'SOLIMO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: 'Smart pull-ring locking mechanism with heat-resistant scalloped silicone tips for safe turning and serving.',
    fullDescription: 'Protects hands from sputtering hot oil while roasting rotis, tossing salads, or flipping tandoori skewers.',
    price: 199,
    mrp: 260,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 3410,
    stock: 130,
    inStock: true,
    unit: '1 Pair (12 Inch / 30 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Tongs', 'Kitchen Tongs', 'Silicone Tongs', 'Cooking Tools'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-measuring-cups',
    slug: 'solimo-kitchen-measuring-cups-spoons-set',
    name: 'Solimo Kitchen Measuring Cups and Spoons Combo (8 Pieces)',
    brand: 'SOLIMO',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: 'Color-coded nesting cups and spoons with engraved metric measurements for exact baking precision.',
    fullDescription: 'Includes 4 cups (1 cup, 1/2 cup, 1/3 cup, 1/4 cup) and 4 spoons (1 tbsp, 1 tsp, 1/2 tsp, 1/4 tsp). BPA free.',
    price: 149,
    mrp: 199,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 2210,
    stock: 150,
    inStock: true,
    unit: 'Set of 8 Measuring Tools',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Measuring Cups', 'Baking', 'Measuring Spoons', 'Kitchen Tools'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-baking-paper',
    slug: 'oddy-ecobake-non-stick-baking-wrapping-paper-roll',
    name: 'Oddy Ecobake Non-Stick Baking & Food Wrapping Paper Roll',
    brand: 'ODDY ECOBAKE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-foils',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Foils & Disposables',
    description: '100% organic cellulose certified non-stick parchment paper heat resistant up to 220°C in oven and air fryer.',
    fullDescription: 'Eliminates need for greasing trays. Reusable up to multiple bakes. Keeps food wholesome without grease seep.',
    price: 180,
    mrp: 220,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 4620,
    stock: 145,
    inStock: true,
    unit: '20 Metres Roll (28 cm Width)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Baking Paper', 'Parchment Paper', 'Air Fryer Paper', 'Oddy'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kitchen-towel',
    slug: 'origami-so-soft-kitchen-tissue-paper-towel-rolls',
    name: 'Origami So Soft 2-Ply Kitchen Paper Towel Rolls',
    brand: 'ORIGAMI',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-foils',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Foils & Disposables',
    description: 'Ultra-absorbent embossed sheets that quickly soak up deep fryer oil, water spills, and countertop moisture.',
    fullDescription: 'Food safe virgin wood pulp paper that does not tear or leave paper fiber residues on fried foods.',
    price: 135,
    mrp: 165,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 3820,
    stock: 160,
    inStock: true,
    unit: 'Pack of 2 Rolls (120 Pulls)',
    instantDeliveryMinutes: 8,
    mainImage: '/images/products/3d_cotton_towel.png',
    images: ['/images/products/3d_cotton_towel.png'],
    tags: ['Kitchen Towel', 'Paper Towels', 'Origami', 'Absorbent Tissue'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-microfiber-cloth',
    slug: 'scotch-brite-heavy-duty-kitchen-scrub-sponge-pack',
    name: 'Scotch-Brite Heavy Duty Kitchen Scrub Sponge & Wipe',
    brand: 'SCOTCH-BRITE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: 'Dual-action green scrub pad with absorbent cellulose sponge back for heavy grease and oily stains.',
    fullDescription: 'Outlasts regular scrubbers 3x longer. High-density foam generates rich suds with minimal dishwash gel.',
    price: 110,
    mrp: 135,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 5120,
    stock: 180,
    inStock: true,
    unit: 'Pack of 4 Scrub Sponges',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Scrub Sponge', 'Scotch-Brite', 'Dish Cleaning', 'Kitchen Sponge'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mixing-bowls',
    slug: 'signoraware-stainless-steel-deep-mixing-bowls-set',
    name: 'Signoraware Stainless Steel Deep Mixing Bowls Set',
    brand: 'SIGNORAWARE',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-storage',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Storage Containers & Jars',
    description: 'Flat base heavy gauge stainless steel bowls for kneading atta dough, whisking batter, and tossing salads.',
    fullDescription: 'Mirror-polished interior with wide rolled rim provides easy handling and spill-free pouring.',
    price: 499,
    mrp: 650,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 1980,
    stock: 85,
    inStock: true,
    unit: 'Set of 3 (1.5L, 2.5L, 3.5L)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Mixing Bowls', 'Stainless Steel', 'Atta Kneading', 'Signoraware'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-whisk-beater',
    slug: 'pigeon-stainless-steel-balloon-whisk-beater',
    name: 'Pigeon Stainless Steel Balloon Whisk & Beater',
    brand: 'PIGEON',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-tools',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Spatulas & Tools',
    description: '10 heavy wire balloon loops that whip maximum air into cake batters, fluffy omelettes, and whipped creams.',
    fullDescription: 'Sealed cylindrical handle prevents dirty wash water from accumulating inside wire barrel. Dishwasher safe.',
    price: 139,
    mrp: 180,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 1720,
    stock: 110,
    inStock: true,
    unit: '1 Whisk (26 cm)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Whisk', 'Beater', 'Pigeon', 'Baking Tools', 'Egg Beater'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-glass-spice-jars',
    slug: 'treo-by-milton-glass-spice-storage-jars-pack',
    name: 'Treo by Milton Glass Spice & Herb Storage Jars',
    brand: 'TREO BY MILTON',
    categoryId: 'cat-lite-kitchen-essentials',
    subcategoryId: 'sub-l-storage',
    categoryName: 'Kitchen Essentials',
    subcategoryName: 'Storage Containers & Jars',
    description: 'Heavy flint clear glass jars with rust-proof stainless steel airtight screw caps.',
    fullDescription: 'Keeps aromatic garam masalas, cloves, cardamoms, and whole cumin fresh without color dulling.',
    price: 299,
    mrp: 395,
    discountPercentage: 24,
    rating: 4.9,
    reviewCount: 3200,
    stock: 130,
    inStock: true,
    unit: 'Pack of 6 x 300 ml Jars',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'],
    tags: ['Spice Jars', 'Glass Jars', 'Treo', 'Milton', 'Masala Storage'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const KitchenEssentials: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = KITCHEN_ESSENTIALS_CATALOG || [];

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Kitchen Essentials">
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

export default KitchenEssentials;
