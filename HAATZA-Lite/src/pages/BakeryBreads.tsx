import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated catalog for Bakery & Breads
export const BAKERY_BREADS_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-harvest-gold-atta',
    slug: 'harvest-gold-100-atta-whole-wheat-bread',
    name: 'Harvest Gold 100% Atta Whole Wheat Bread',
    brand: 'HARVEST GOLD',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-breads',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Breads & Buns',
    description: 'Freshly baked 100% whole wheat bread rich in dietary fiber with zero maida or palm oil.',
    fullDescription: 'Crafted with premium whole grain wheat flour, soft texture and naturally baked daily at regional bakeries for wholesome morning sandwiches.',
    price: 55,
    mrp: 60,
    discountPercentage: 8,
    rating: 4.8,
    reviewCount: 3820,
    stock: 90,
    inStock: true,
    unit: '400 g Loaf',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Bread', 'Atta Bread', 'Whole Wheat', 'Bakery', 'Harvest Gold'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-english-oven-multigrain',
    slug: 'english-oven-premium-multigrain-bread',
    name: 'English Oven Premium Multigrain Bread',
    brand: 'ENGLISH OVEN',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-breads',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Breads & Buns',
    description: 'Hearty artisanal brown bread loaded with oats, flax seeds, sunflower seeds, and sesame.',
    fullDescription: 'Wholesome multigrain loaf packed with natural crunch and toasted seeds. Superb toasted with butter or avocado spread.',
    price: 65,
    mrp: 75,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 2940,
    stock: 75,
    inStock: true,
    unit: '400 g Loaf',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'],
    tags: ['Multigrain', 'Bread', 'Healthy Breakfast', 'Seeds', 'English Oven'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-britannia-pav-buns',
    slug: 'britannia-fresh-pav-buns-pack-of-6',
    name: 'Britannia Fresh Pav Buns (Pack of 6)',
    brand: 'BRITANNIA',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-breads',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Breads & Buns',
    description: 'Ultra-soft, fluffy, golden-baked pav buns perfect for pav bhaji, vada pav, and misal.',
    fullDescription: 'Baked daily to pillowy perfection with zero trans-fats. Holds rich gravies and melted butter effortlessly.',
    price: 32,
    mrp: 35,
    discountPercentage: 9,
    rating: 4.8,
    reviewCount: 4510,
    stock: 110,
    inStock: true,
    unit: '300 g (6 Pavs)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pav', 'Buns', 'Pav Bhaji', 'Vada Pav', 'Britannia'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-bakers-dozen-sourdough',
    slug: 'the-bakers-dozen-artisanal-sourdough-bread',
    name: "The Baker's Dozen Artisanal Sourdough Bread",
    brand: "THE BAKER'S DOZEN",
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-breads',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Breads & Buns',
    description: 'Authentic stone-baked 100% whole wheat sourdough with signature mild tangy crumb and crusty top.',
    fullDescription: 'Fermented naturally for over 20 hours with wild sourdough starter. Free of added chemical preservatives and emulsifiers.',
    price: 149,
    mrp: 175,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 1640,
    stock: 45,
    inStock: true,
    unit: '250 g Loaf',
    instantDeliveryMinutes: 12,
    mainImage: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sourdough', 'Artisan Bread', 'Fermented', 'Gourmet Bakery'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-bonn-burger-buns',
    slug: 'bonn-fresh-sesame-seed-burger-buns',
    name: 'Bonn Fresh Sesame Seed Burger Buns (Pack of 4)',
    brand: 'BONN',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-breads',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Breads & Buns',
    description: 'Pre-sliced soft, sweet and savoury burger buns sprinkled with toasted white sesame seeds.',
    fullDescription: 'Specially formulated to toast up golden crispy on the cut side while keeping patties snug and juicy.',
    price: 45,
    mrp: 50,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 2120,
    stock: 80,
    inStock: true,
    unit: '300 g (4 Buns)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'],
    tags: ['Burger Buns', 'Sesame', 'Bonn', 'Fast Food'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-french-croissant',
    slug: 'artisan-all-butter-french-croissant-pack-of-2',
    name: 'Artisan All-Butter French Croissant (Pack of 2)',
    brand: 'PARISIAN OVEN',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-cakes',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cakes & Pastries',
    description: 'Flaky, buttery, crescent rolls laminated with real cream butter and baked golden brown.',
    fullDescription: 'Hundreds of airy, honeycomb layers deliver an unforgettable melt-in-mouth experience when warmed for 20 seconds.',
    price: 129,
    mrp: 160,
    discountPercentage: 19,
    rating: 4.9,
    reviewCount: 1890,
    stock: 50,
    inStock: true,
    unit: '150 g (2 Pieces)',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80'],
    tags: ['Croissant', 'Pastry', 'Butter', 'Breakfast', 'Artisan'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dark-fantasy-fills',
    slug: 'sunfeast-dark-fantasy-choco-fills-cookies',
    name: 'Sunfeast Dark Fantasy Choco Fills Cookies',
    brand: 'SUNFEAST',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-rusks',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cookies & Rusks',
    description: 'Rich, dark baked crust cookies oozing with molten molten chocolate cream in the center.',
    fullDescription: 'Indulgent baked biscuits with a crisp exterior that yields to silky warm fudge chocolate.',
    price: 135,
    mrp: 160,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 6820,
    stock: 140,
    inStock: true,
    unit: '300 g Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cookies', 'Dark Fantasy', 'Choco Fills', 'Chocolate Biscuits'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-haldirams-suji-rusk',
    slug: 'haldirams-crispy-crunchy-suji-rusk',
    name: "Haldiram's Crispy Crunchy Elaichi Suji Rusk",
    brand: "HALDIRAM'S",
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-rusks',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cookies & Rusks',
    description: 'Twice-baked aromatic semolina toast infused with natural cardamom seeds. Made for hot chai dipping.',
    fullDescription: 'Crunchy golden rusks with light sweetness and fragrant cardamom punch that stays crisp in every bite.',
    price: 68,
    mrp: 80,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 4120,
    stock: 110,
    inStock: true,
    unit: '400 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Rusk', 'Suji Rusk', 'Chai Biscuit', 'Tea Time', 'Haldirams'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-winkies-swiss-roll',
    slug: 'winkies-rich-chocolate-swiss-roll-pastry',
    name: 'Winkies Rich Chocolate Cream Swiss Rolls (Pack of 6)',
    brand: 'WINKIES',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-cakes',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cakes & Pastries',
    description: 'Soft cocoa sponge cake rolled with luscious whipped vanilla cream filling.',
    fullDescription: 'Individually wrapped snacks for lunchboxes and sweet midnight cravings. Moist, bouncy, and chocolatey.',
    price: 90,
    mrp: 100,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 2310,
    stock: 70,
    inStock: true,
    unit: '180 g (6 Rolls)',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80'],
    tags: ['Swiss Roll', 'Cake', 'Chocolate Pastry', 'Winkies'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-karachi-fruit-biscuits',
    slug: 'karachi-bakery-hyderabad-special-fruit-biscuits',
    name: 'Karachi Bakery Special Candied Tutti-Frutti Biscuits',
    brand: 'KARACHI BAKERY',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-rusks',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cookies & Rusks',
    description: 'Iconic Hyderabadi square butter cookies studded with colorful candied fruit bits and cashew nuts.',
    fullDescription: 'Legendary recipe with delicate crumb that melts seamlessly on the tongue. Great for festive gifting and teatime joy.',
    price: 185,
    mrp: 210,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 3670,
    stock: 65,
    inStock: true,
    unit: '400 g Box',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Karachi Bakery', 'Fruit Biscuits', 'Tutti Frutti', 'Cookies'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-elite-plum-cake',
    slug: 'elite-rich-plum-and-fruit-cake-bar',
    name: 'Elite Traditional Rich Plum & Mixed Fruit Cake',
    brand: 'ELITE',
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-cakes',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cakes & Pastries',
    description: 'Spiced aromatic moist dark cake loaded with raisins, candied ginger, orange peel, and cherries.',
    fullDescription: 'Brimming with soaked dry fruits and warm aromatic cinnamon notes. Free of alcohol and 100% vegetarian.',
    price: 140,
    mrp: 165,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 1980,
    stock: 55,
    inStock: true,
    unit: '300 g Loaf',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Plum Cake', 'Fruit Cake', 'Elite', 'Christmas Cake', 'Sponge'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-garlic-butter-toast',
    slug: 'the-bakers-dozen-crispy-garlic-butter-toast',
    name: "The Baker's Dozen Crispy Garlic Butter Toast",
    brand: "THE BAKER'S DOZEN",
    categoryId: 'cat-lite-bakery',
    subcategoryId: 'sub-l-rusks',
    categoryName: 'Bakery & Breads',
    subcategoryName: 'Cookies & Rusks',
    description: 'Thin crispy baguette slices toasted with roasted garlic, parsley, and salted cream butter.',
    fullDescription: 'Crunchy savory toasts that pair wonderfully with tomato soup, creamy pasta, or as a midnight cocktail snack.',
    price: 99,
    mrp: 120,
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 1420,
    stock: 60,
    inStock: true,
    unit: '150 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80'],
    tags: ['Garlic Toast', 'Baguette', 'Croutons', 'Savory Toast', 'Bakery'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const BakeryBreads: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = BAKERY_BREADS_CATALOG;

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      <HaatzaLiteCategoryShowcase title="Bakery & Breads">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
          {displayedProducts.map((product, index) => {
            const cartItem = cart.find((item) => item.productId === product.id);
            const qty = cartItem ? cartItem.quantity : 0;
            const packSize = product.unit || '1 unit';
            const discount = product.discountPercentage || (product.mrp > product.price 
              ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
              : 0);
            const deliveryMins = product.instantDeliveryMinutes || 8;

            return (
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
                <div
                  onClick={() => navigate(`/lite/product/${product.id || product.slug}`)}
                  className="group haatza-neon-aura-card relative bg-white border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between h-full select-none cursor-pointer shadow-xs"
                >
                  <div>
                    <div className="relative w-full aspect-square bg-[#F5F7F6] rounded-xl flex items-center justify-center p-1 sm:p-1.5 mb-2.5 overflow-hidden border border-slate-100/80">
                      {discount > 0 && (
                        <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black tracking-wide uppercase shadow-2xs">
                          {discount}% OFF
                        </span>
                      )}

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

                    <Link
                      to={`/lite/product/${product.id || product.slug}`}
                      className="block text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug min-h-[32px] sm:min-h-[34px] mb-1"
                      title={product.name}
                    >
                      {product.name}
                    </Link>

                    <div className="text-[11px] text-slate-400 font-medium truncate mb-2">
                      {packSize}
                    </div>
                  </div>

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

export default BakeryBreads;
