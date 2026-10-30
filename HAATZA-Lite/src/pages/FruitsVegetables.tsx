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

// Additional high-freshness produce items to ensure a rich, bustling 18-item grid
export const ADDITIONAL_PRODUCE: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-strawberries',
    slug: 'fresh-mahabaleshwar-strawberries',
    name: 'Mahabaleshwar Fresh Strawberries',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Sweet, juicy, hand-picked red berries from the mist-covered hills of Mahabaleshwar.',
    fullDescription: 'Packed with vitamin C and manganese. Chilled right at harvest to keep berries firm and sweet.',
    price: 139,
    mrp: 179,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 780,
    stock: 50,
    inStock: true,
    unit: '1 Pack (200g)',
    mainImage: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=400&q=80'],
    tags: ['Strawberries', 'Berries', 'Fruits', 'Fresh', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-capsicum',
    slug: 'crisp-green-capsicum-bell-pepper',
    name: 'Crisp Green Bell Pepper (Capsicum)',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Firm, crunchy green capsicum rich in antioxidants and vitamins.',
    fullDescription: 'Ideal for pizza, stir-fry and fresh salads. Harvested daily with zero pesticide residues.',
    price: 36,
    mrp: 48,
    discountPercentage: 25,
    rating: 4.7,
    reviewCount: 920,
    stock: 95,
    inStock: true,
    unit: '2 pcs (250g)',
    mainImage: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80'],
    tags: ['Capsicum', 'Vegetables', 'Salad', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sweet-corn',
    slug: 'tender-sweet-golden-corn',
    name: 'Tender Sweet Golden Corn (Cob)',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Sweet, juicy yellow corn cobs with tender kernels, farm harvested in the morning.',
    fullDescription: 'Naturally sweet and juicy. Perfect for boiling, roasting, or fresh salads.',
    price: 39,
    mrp: 50,
    discountPercentage: 22,
    rating: 4.8,
    reviewCount: 650,
    stock: 70,
    inStock: true,
    unit: '2 cobs pack',
    mainImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=400&q=80'],
    tags: ['Corn', 'Sweet Corn', 'Vegetables', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.8,
  },
  {
    id: 'prod-lite-carrots',
    slug: 'organic-red-juicy-carrots',
    name: 'Organic Red Farm Carrots',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Crunchy, naturally sweet red carrots loaded with beta-carotene and dietary fiber.',
    fullDescription: 'Hydro-washed and sorted for premium sweetness. Great for salads and juicing.',
    price: 32,
    mrp: 45,
    discountPercentage: 28,
    rating: 4.9,
    reviewCount: 1200,
    stock: 110,
    inStock: true,
    unit: '500 g pack',
    mainImage: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=400&q=80'],
    tags: ['Carrots', 'Vegetables', 'Organic', 'Salad'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-cucumber',
    slug: 'crisp-english-green-cucumber',
    name: 'Crisp Seedless English Cucumber',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Refreshing, hydrating seedless cucumber with thin tender skin.',
    fullDescription: 'Grown in climate-controlled polyhouses. High water content and cooling crunch.',
    price: 28,
    mrp: 38,
    discountPercentage: 26,
    rating: 4.7,
    reviewCount: 840,
    stock: 80,
    inStock: true,
    unit: '1 pc (approx. 250g)',
    mainImage: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=400&q=80'],
    tags: ['Cucumber', 'Salad', 'Vegetables', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.8,
  },
  {
    id: 'prod-lite-pomegranate',
    slug: 'fresh-ruby-red-pomegranate',
    name: 'Ruby Red Seedless Pomegranate (Anar)',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Deep red pearls overflowing with antioxidant-rich juice and delicate sweetness.',
    fullDescription: 'Hand-picked from Solapur orchards. 100% natural, sweet and easily digestible.',
    price: 169,
    mrp: 220,
    discountPercentage: 23,
    rating: 4.9,
    reviewCount: 1450,
    stock: 60,
    inStock: true,
    unit: '2 pcs (approx. 500g)',
    mainImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'],
    tags: ['Pomegranate', 'Fruits', 'Fresh', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kiwi',
    slug: 'fresh-green-imported-kiwi-pack',
    name: 'Zespri Green Kiwi (Pack of 3)',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Tangy-sweet green kiwis loaded with vitamin C, potassium, and digestive enzymes.',
    fullDescription: 'Directly sourced from trusted orchards. Firm and juicy flesh packed with vital nutrition.',
    price: 119,
    mrp: 150,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 520,
    stock: 45,
    inStock: true,
    unit: 'Pack of 3 (approx. 300g)',
    mainImage: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=400&q=80'],
    tags: ['Kiwi', 'Fruits', 'Fresh', 'Exotic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.8,
  },
  {
    id: 'prod-lite-grapes',
    slug: 'seedless-thompson-green-grapes',
    name: 'Nashik Seedless Green Table Grapes',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-fruits',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Fresh Fruits',
    description: 'Crisp, sweet seedless green grapes grown in the wine capital of Nashik.',
    fullDescription: 'Naturally sweet and juicy. Thoroughly washed and packed in breathable punnets.',
    price: 89,
    mrp: 120,
    discountPercentage: 25,
    rating: 4.8,
    reviewCount: 1100,
    stock: 85,
    inStock: true,
    unit: '500 g box',
    mainImage: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=400&q=80'],
    tags: ['Grapes', 'Fruits', 'Fresh', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-coriander',
    slug: 'fresh-aromatic-coriander-mint-combo',
    name: 'Fresh Coriander & Mint Herbs Bunch',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Aromatic, dewy fresh coriander and pudina leaves straight from morning harvest.',
    fullDescription: 'Roots intact with hydro-wrap to retain farm freshness for up to 5 days in your fridge.',
    price: 24,
    mrp: 35,
    discountPercentage: 31,
    rating: 4.9,
    reviewCount: 1650,
    stock: 120,
    inStock: true,
    unit: '1 Combo (100g each)',
    mainImage: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80'],
    tags: ['Coriander', 'Mint', 'Herbs', 'Greens', 'Vegetables', 'Organic'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-baby-potatoes',
    slug: 'tender-farm-fresh-baby-potatoes',
    name: 'Tender Baby Potatoes (Dum Aloo Special)',
    brand: 'HAATZA FARM FRESH',
    categoryId: 'cat-lite-fruits-veg',
    subcategoryId: 'sub-l-veggies',
    categoryName: 'Fruits & Vegetables',
    subcategoryName: 'Daily Vegetables',
    description: 'Thin-skinned, tender small potatoes curated specially for dum aloo and roasting.',
    fullDescription: 'Direct farm sourced from Punjab plains. Firm, earthy, and perfectly sized.',
    price: 34,
    mrp: 45,
    discountPercentage: 24,
    rating: 4.7,
    reviewCount: 710,
    stock: 90,
    inStock: true,
    unit: '500 g net',
    mainImage: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
    images: ['https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80'],
    tags: ['Potatoes', 'Vegetables', 'Daily'],
    instantDeliveryMinutes: 8,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.8,
  },
];

export const FruitsVegetables: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  // Staggered bottom-to-top entrance trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 30);
    return () => clearTimeout(timer);
  }, []);

  // Filter produce products from Lite catalogue + high-freshness items
  const produceProducts = useMemo(() => {
    const baseProduce = haatzaLiteProducts.filter(
      (p) =>
        p.categoryId === 'cat-lite-fruits-veg' ||
        p.categoryId === 'fruits-vegetables' ||
        p.subcategoryId === 'sub-l-fruits' ||
        p.subcategoryId === 'sub-l-veggies' ||
        p.tags.some((t) =>
          ['Mango', 'Apple', 'Avocado', 'Broccoli', 'Orange', 'Tomatoes', 'Spinach', 'Bananas', 'Fruits', 'Vegetables'].includes(t)
        )
    );

    return [...baseProduce, ...ADDITIONAL_PRODUCE];
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      {/* Rich Emerald Showcase Canvas Container with Animated Neon Ribbons */}
      <HaatzaLiteCategoryShowcase title="Fruits & Vegetables">
        {/* High-Density Product Card Grid: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-3.5 md:gap-4">
          {produceProducts.map((product, index) => {
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
                  transition: `opacity 400ms ease-out ${index * 30}ms, transform 400ms ease-out ${index * 30}ms`,
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
                        {/* Top Tag: Small, neat discount badge in the corner */}
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

export default FruitsVegetables;
