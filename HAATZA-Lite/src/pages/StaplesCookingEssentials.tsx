import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated catalog for Staples & Cooking Essentials
export const STAPLES_COOKING_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-aashirvaad-atta',
    slug: 'aashirvaad-shudh-chakki-atta-whole-wheat-5kg',
    name: 'Aashirvaad Shudh Chakki Atta 100% Whole Wheat',
    brand: 'AASHIRVAAD',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-atta-rice',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Atta & Rice',
    description: '100% pure whole wheat grain flour ground with traditional 4-step stone chakki process.',
    fullDescription: 'Locks in whole grain dietary fibers and essential bran nutrients. Makes golden, extra-soft rotis that stay fluffy for hours.',
    price: 245,
    mrp: 275,
    discountPercentage: 11,
    rating: 4.9,
    reviewCount: 9410,
    stock: 150,
    inStock: true,
    unit: '5 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80'],
    tags: ['Atta', 'Chakki Atta', 'Whole Wheat', 'Aashirvaad', 'Flour'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-daawat-rozana-rice',
    slug: 'daawat-rozana-super-basmati-rice-5kg',
    name: 'Daawat Rozana Super Everyday Basmati Rice',
    brand: 'DAAWAT',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-atta-rice',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Atta & Rice',
    description: 'Naturally aged slender long-grain basmati rice with distinctive sweet aroma and non-sticky texture.',
    fullDescription: 'Hand-selected grains aged under master millers. Perfect for daily steamed rice, pulao, jeera rice, and khichdi.',
    price: 389,
    mrp: 460,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 5210,
    stock: 120,
    inStock: true,
    unit: '5 kg Bag',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80'],
    tags: ['Basmati Rice', 'Daawat', 'Rozana', 'Rice', 'Staples'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tata-sampann-toor-dal',
    slug: 'tata-sampann-unpolished-toor-dal-1kg',
    name: 'Tata Sampann Unpolished Toor Dal (Arhar Dal)',
    brand: 'TATA SAMPANN',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-dals',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Dals & Pulses',
    description: '100% unpolished nutritious arhar toor dal with natural wholesome plant protein and zero artificial shine.',
    fullDescription: 'Sourced from the heartlands of Maharashtra and Karnataka. Cooks evenly to create rich, comforting dal tadka.',
    price: 169,
    mrp: 195,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 6140,
    stock: 130,
    inStock: true,
    unit: '1 kg Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1585994192701-f1a505c817ea?auto=format&fit=crop&w=600&q=80'],
    tags: ['Toor Dal', 'Arhar Dal', 'Pulses', 'Tata Sampann', 'Protein'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-fortune-sunflower-oil',
    slug: 'fortune-sunlite-refined-sunflower-cooking-oil-1l',
    name: 'Fortune Sunlite Refined Sunflower Cooking Oil',
    brand: 'FORTUNE',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-oils',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Cooking Oils & Ghee',
    description: 'Light, healthy refined sunflower oil enriched with natural Vitamin E and heart-healthy Omega-6.',
    fullDescription: 'Low absorb technology keeps food light and non-greasy during everyday sautéing, deep frying, and curries.',
    price: 138,
    mrp: 165,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 4980,
    stock: 140,
    inStock: true,
    unit: '1 Litre Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sunflower Oil', 'Cooking Oil', 'Fortune', 'Refined Oil'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-dhara-mustard-oil',
    slug: 'dhara-kachi-ghani-pure-mustard-oil-1l',
    name: 'Dhara Kachi Ghani Pure Cold Pressed Mustard Oil',
    brand: 'DHARA',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-oils',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Cooking Oils & Ghee',
    description: 'Traditional cold pressed kachi ghani sarson oil with strong pungent aroma and natural antioxidants.',
    fullDescription: 'Cold extracted from finest mustard seeds to retain natural pungent pungency. Essential for authentic curries and pickles.',
    price: 152,
    mrp: 180,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 3820,
    stock: 95,
    inStock: true,
    unit: '1 Litre Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Mustard Oil', 'Sarson Tel', 'Kachi Ghani', 'Dhara', 'Cold Pressed'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-aashirvaad-cow-ghee',
    slug: 'aashirvaad-svasti-pure-cow-ghee-1l',
    name: 'Aashirvaad Svasti Pure Desi Cow Ghee',
    brand: 'AASHIRVAAD',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-oils',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Cooking Oils & Ghee',
    description: 'Granular golden desi cow ghee produced with traditional slow-cook process for divine aroma.',
    fullDescription: 'Rich golden danedar texture with authentic home-clarified butter aroma. Ideal for rotis, dal tadka, and traditional sweets.',
    price: 649,
    mrp: 720,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 4120,
    stock: 85,
    inStock: true,
    unit: '1 Litre Jar',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ghee', 'Cow Ghee', 'Desi Ghee', 'Aashirvaad', 'Danedar'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-tata-salt',
    slug: 'tata-salt-vacuum-evaporated-iodized-salt-1kg',
    name: 'Tata Salt Vacuum Evaporated Iodized Salt',
    brand: 'TATA',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-spices',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Spices & Seasonings',
    description: "Desh Ka Namak - pure vacuum-evaporated solar salt enriched with iodine for family health.",
    fullDescription: 'Finely granulated, moisture-free salt with guaranteed purity. Elevates the true natural flavors of every meal.',
    price: 27,
    mrp: 30,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 15400,
    stock: 250,
    inStock: true,
    unit: '1 kg Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1518110903498-8ec10d860d21?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1518110903498-8ec10d860d21?auto=format&fit=crop&w=600&q=80'],
    tags: ['Tata Salt', 'Namak', 'Iodized Salt', 'Staples'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-madhur-sugar',
    slug: 'madhur-pure-and-hygienic-sugar-1kg',
    name: 'Madhur Pure & Hygienic Sulphur-Free Sugar',
    brand: 'MADHUR',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-spices',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Spices & Seasonings',
    description: 'Sparkling crystalline white refined sugar processed without harmful sulphur chemicals.',
    fullDescription: 'Untouched by hands throughout processing and packaging. Dissolves cleanly in tea, coffee, and homemade desserts.',
    price: 52,
    mrp: 60,
    discountPercentage: 13,
    rating: 4.8,
    reviewCount: 5120,
    stock: 180,
    inStock: true,
    unit: '1 kg Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sugar', 'Madhur', 'Sulphur Free', 'Sweetener', 'Chini'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-catch-turmeric',
    slug: 'catch-super-rich-turmeric-haldi-powder-200g',
    name: 'Catch Super Rich High-Curcumin Turmeric Powder (Haldi)',
    brand: 'CATCH',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-spices',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Spices & Seasonings',
    description: 'Ground at low temperature to retain essential aromatic oils and vibrant golden yellow curcumin color.',
    fullDescription: 'Hand-picked turmeric rhizomes cleaned and powdered to bring natural golden hues and immunity-boosting goodness.',
    price: 68,
    mrp: 80,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 3620,
    stock: 110,
    inStock: true,
    unit: '200 g Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80'],
    tags: ['Haldi', 'Turmeric', 'Catch Spices', 'Masala'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-everest-kashmiri-chilli',
    slug: 'everest-kashmiri-lal-mirch-powder-100g',
    name: 'Everest Kashmiri Lal Mirch Powder',
    brand: 'EVEREST',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-spices',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Spices & Seasonings',
    description: 'Vibrant scarlet red chilli powder providing glorious natural food colour with mild, gentle heat.',
    fullDescription: 'Gives tandoori dishes, paneer gravies, and biryanis their signature restaurant-style ruby red radiance.',
    price: 78,
    mrp: 90,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 4720,
    stock: 95,
    inStock: true,
    unit: '100 g Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'],
    tags: ['Kashmiri Mirch', 'Red Chilli', 'Everest', 'Masala', 'Spices'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-24mantra-moong-dal',
    slug: '24-mantra-organic-yellow-moong-dal-split-1kg',
    name: '24 Mantra 100% Certified Organic Yellow Moong Dal Split',
    brand: '24 MANTRA',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-dals',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Dals & Pulses',
    description: 'Grown without chemical pesticides or synthetic fertilizers, easy to digest and rich in natural proteins.',
    fullDescription: 'Gentle on digestion, quick cooking and mild flavoured. Perfect for khichdi, moong dal soup, and yellow dal fry.',
    price: 175,
    mrp: 205,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 2190,
    stock: 70,
    inStock: true,
    unit: '1 kg Pouch',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80'],
    tags: ['Moong Dal', 'Organic Dal', '24 Mantra', 'Pulses'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-fortune-besan',
    slug: 'fortune-besan-100-chana-dal-flour-500g',
    name: 'Fortune Besan (100% Pure Chana Dal Flour)',
    brand: 'FORTUNE',
    categoryId: 'cat-lite-staples',
    subcategoryId: 'sub-l-atta-rice',
    categoryName: 'Staples & Cooking Essentials',
    subcategoryName: 'Atta & Rice',
    description: 'Fine ground gram flour made exclusively from choice chana dal with no adulterants.',
    fullDescription: 'Produces extra-crispy pakodas, savory dhoklas, sweet laddus, and silky kadhi with consistent lump-free batter.',
    price: 58,
    mrp: 68,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 3890,
    stock: 100,
    inStock: true,
    unit: '500 g Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'],
    tags: ['Besan', 'Gram Flour', 'Chana Dal', 'Fortune', 'Snacks'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const StaplesCookingEssentials: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = STAPLES_COOKING_CATALOG;

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      <HaatzaLiteCategoryShowcase title="Staples & Cooking Essentials">
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

export default StaplesCookingEssentials;
