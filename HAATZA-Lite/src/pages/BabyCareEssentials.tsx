import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated catalog for Baby Care & Essentials
export const BABY_CARE_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-pampers-pants-large',
    slug: 'pampers-all-round-protection-pants-large-64',
    name: 'Pampers All Round Protection Diaper Pants (Large, 64 Count)',
    brand: 'PAMPERS',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-diapers',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Diapers & Wipes',
    description: 'Anti-rash lotion with Aloe Vera and 360-degree soft stretch waistband for 12-hour overnight dryness.',
    fullDescription: 'Magic Gel technology locks away wetness instantly, preventing skin irritation and diaper rashes. Dermatologically tested.',
    price: 999,
    mrp: 1249,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 11200,
    stock: 120,
    inStock: true,
    unit: 'Pack of 64 Pants',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80'],
    tags: ['Diapers', 'Pampers', 'Baby Care', 'Pants', 'Overnight Dryness'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-huggies-wonder-pants',
    slug: 'huggies-wonder-pants-bubble-bed-medium-72',
    name: 'Huggies Wonder Pants with Bubble Bed (Medium, 72 Count)',
    brand: 'HUGGIES',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-diapers',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Diapers & Wipes',
    description: 'Cloud-soft 3D bubble bed liner absorbs runny fluid quickly while maintaining breathable airflow.',
    fullDescription: 'Designed for active babies weighing 7-12 kg. Ultra-soft flexible elastic waistband leaves zero red marks.',
    price: 849,
    mrp: 1099,
    discountPercentage: 23,
    rating: 4.8,
    reviewCount: 8940,
    stock: 95,
    inStock: true,
    unit: 'Pack of 72 Pants',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Huggies', 'Diaper Pants', 'Baby Hygiene', 'Bubble Bed'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-johnsons-wipes-lid',
    slug: 'johnsons-baby-ultra-gentle-wet-wipes-with-lid-72',
    name: "Johnson's Baby Ultra-Gentle Fragrance-Free Wet Wipes (72 Wipes)",
    brand: "JOHNSON'S",
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-diapers',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Diapers & Wipes',
    description: 'Enriched with 3x pure moisturizing lotion, alcohol-free and hypoallergenic for delicate newborn skin.',
    fullDescription: 'Protective snap-tight flip lid prevents wipes from drying out. Soft embossed cloth fabric cleans without harsh rubbing.',
    price: 185,
    mrp: 230,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 6410,
    stock: 140,
    inStock: true,
    unit: '72 Wipes Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Baby Wipes', 'Johnsons', 'Hypoallergenic', 'Diaper Care'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-himalaya-baby-shampoo',
    slug: 'himalaya-gentle-baby-tear-free-shampoo-400ml',
    name: 'Himalaya Gentle Baby Tear-Free Shampoo with Hibiscus & Chickpea',
    brand: 'HIMALAYA',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-baby-skin',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Baby Bath & Skincare',
    description: 'No-more-tears gentle Ayurvedic shampoo that softens baby hair and maintains scalp natural moisture balance.',
    fullDescription: 'Infused with natural chickpea protein for hair nourishment and hibiscus to condition and soften delicate strands.',
    price: 245,
    mrp: 295,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 5120,
    stock: 110,
    inStock: true,
    unit: '400 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'],
    tags: ['Baby Shampoo', 'Himalaya', 'Tear Free', 'Bath Care'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sebamed-cleansing-wash',
    slug: 'sebamed-baby-gentle-cleansing-wash-ph-5-5-200ml',
    name: 'Sebamed Baby Gentle Cleansing Wash (pH 5.5)',
    brand: 'SEBAMED',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-baby-skin',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Baby Bath & Skincare',
    description: '100% soap-free and alkali-free German formula engineered with exact pH 5.5 to safeguard acid mantle.',
    fullDescription: 'Enriched with natural botanical lipids to prevent dryness. Recommended by pediatricians worldwide for sensitive baby skin.',
    price: 499,
    mrp: 580,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 3820,
    stock: 65,
    inStock: true,
    unit: '200 ml Bottle',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sebamed', 'Baby Wash', 'pH 5.5', 'Sensitive Skin', 'Pediatrician'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-johnsons-baby-lotion',
    slug: 'johnsons-baby-nourishing-moisturizing-lotion-500ml',
    name: "Johnson's Baby Nourishing Daily Moisturizing Body Lotion",
    brand: "JOHNSON'S",
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-baby-skin',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Baby Bath & Skincare',
    description: '24-hour gentle hydration lotion with coconut oil, keeping baby skin baby-soft and protected.',
    fullDescription: 'Dermatologist tested, free from parabens, phthalates, and harsh dyes. Fast-absorbing, non-sticky formula.',
    price: 325,
    mrp: 385,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 7120,
    stock: 130,
    inStock: true,
    unit: '500 ml Pump Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Baby Lotion', 'Johnsons', 'Moisturizer', 'Baby Skin'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-nestle-cerelac-wheat-apple',
    slug: 'nestle-cerelac-fortified-wheat-apple-cereal-300g',
    name: 'Nestlé Cerelac Fortified Baby Cereal with Milk - Wheat Apple',
    brand: 'NESTLÉ',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-feeding',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Feeding & Teethers',
    description: 'Fortified infant cereal with Iron+, 16 vital nutrients, vitamins, and minerals for infants 6 months onwards.',
    fullDescription: 'Supports healthy brain development, bone strength, and natural immune resistance. Free of artificial colors and flavors.',
    price: 285,
    mrp: 310,
    discountPercentage: 8,
    rating: 4.9,
    reviewCount: 8420,
    stock: 105,
    inStock: true,
    unit: '300 g Refill Box',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80'],
    tags: ['Cerelac', 'Baby Food', 'Nestle', 'Infant Nutrition', 'Wheat Apple'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-avent-anti-colic-bottle',
    slug: 'philips-avent-anti-colic-feeding-bottle-260ml',
    name: 'Philips Avent Anti-Colic Polypropylene Feeding Bottle',
    brand: 'PHILIPS AVENT',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-feeding',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Feeding & Teethers',
    description: 'Clinically proven anti-colic valve system directs air away from baby tummy to reduce wind and fussing.',
    fullDescription: 'BPA-free ergonomic wide-neck bottle with soft ribbed teat that prevents nipple collapse for seamless latching.',
    price: 499,
    mrp: 595,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 3620,
    stock: 55,
    inStock: true,
    unit: '260 ml Bottle',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'],
    tags: ['Feeding Bottle', 'Philips Avent', 'Anti Colic', 'BPA Free'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mother-sparsh-water-wipes',
    slug: 'mother-sparsh-99-pure-water-unscented-baby-wipes',
    name: 'Mother Sparsh 99% Pure Water Unscented Plant Fabric Wipes',
    brand: 'MOTHER SPARSH',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-diapers',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Diapers & Wipes',
    description: '3x thicker plant-based medical grade organic cotton wipes formulated with 99% pure water.',
    fullDescription: 'Eco-friendly biodegradable wipes safe for hands, face, and diaper area from day one. Zero synthetic fragrances.',
    price: 219,
    mrp: 299,
    discountPercentage: 27,
    rating: 4.9,
    reviewCount: 4780,
    stock: 90,
    inStock: true,
    unit: '72 Wipes Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Water Wipes', 'Mother Sparsh', 'Organic Cotton', 'Pure Water'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mamaearth-baby-lotion',
    slug: 'mamaearth-daily-moisturizing-natural-baby-lotion-400ml',
    name: 'Mamaearth Daily Moisturizing Natural Baby Lotion with Shea Butter',
    brand: 'MAMAEARTH',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-baby-skin',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Baby Bath & Skincare',
    description: 'Made Safe certified gentle lotion with cocoa butter, calendula extract, and sweet almond oil.',
    fullDescription: 'Locks in deep skin moisture while calming irritated dry patches. 100% toxin-free with soothing natural botanical aroma.',
    price: 359,
    mrp: 419,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 3910,
    stock: 85,
    inStock: true,
    unit: '400 ml Pump Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80'],
    tags: ['Mamaearth', 'Baby Lotion', 'Shea Butter', 'Made Safe'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-himalaya-massage-oil',
    slug: 'himalaya-baby-massage-oil-olive-winter-cherry-200ml',
    name: 'Himalaya Nourishing Baby Massage Oil with Olive & Winter Cherry',
    brand: 'HIMALAYA',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-baby-skin',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Baby Bath & Skincare',
    description: 'Clinically proven daily massage oil to improve baby growth and strengthen bone muscles.',
    fullDescription: 'Infused with olive oil and winter cherry (ashwagandha) to nourish baby skin tone and promote calm, peaceful sleep.',
    price: 165,
    mrp: 195,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 5210,
    stock: 95,
    inStock: true,
    unit: '200 ml Bottle',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1608248597359-bbad2d52542a?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1608248597359-bbad2d52542a?auto=format&fit=crop&w=600&q=80'],
    tags: ['Massage Oil', 'Himalaya', 'Olive Oil', 'Baby Massage'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sebamed-diaper-rash-cream',
    slug: 'sebamed-baby-diaper-rash-protective-cream-100ml',
    name: 'Sebamed Baby Healing & Protective Diaper Rash Cream',
    brand: 'SEBAMED',
    categoryId: 'cat-lite-baby',
    subcategoryId: 'sub-l-diapers',
    categoryName: 'Baby Care & Essentials',
    subcategoryName: 'Diapers & Wipes',
    description: 'Forms a breathable protective barrier against wetness and aggressively soothes redness with chamomile and panthenol.',
    fullDescription: 'Promotes rapid skin healing within hours without clogging pores. Free of harmful colorants and mineral oils.',
    price: 440,
    mrp: 520,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 2980,
    stock: 70,
    inStock: true,
    unit: '100 ml Tube',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80'],
    tags: ['Diaper Rash Cream', 'Sebamed', 'Panthenol', 'Chamomile'],
    isTrending: true,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const BabyCareEssentials: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = BABY_CARE_CATALOG;

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      <HaatzaLiteCategoryShowcase title="Baby Care & Essentials">
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

export default BabyCareEssentials;
