import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useHaatzaLiteCart } from '../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../utils/formatters';
import { HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { HaatzaLiteCategoryShowcase } from '../components/HaatzaLiteProducts/HaatzaLiteCategoryShowcase';
import { PriceInfoButton } from '../components/common/PriceInfoModal';

// Dedicated curated catalog for Frozen Foods
export const FROZEN_FOODS_CATALOG: HaatzaLiteProduct[] = [
  {
    id: 'prod-lite-safal-green-peas',
    slug: 'safal-select-frozen-green-peas-1kg',
    name: 'Safal Select Tender Sweet Frozen Green Peas',
    brand: 'SAFAL',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-veg',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Frozen Veggies & Corn',
    description: 'Freshly harvested sweet garden peas frozen through individual quick freezing (IQF) technology.',
    fullDescription: 'Locks in crisp natural garden sweetness, vivid green colour, and essential nutrients. No thawing needed before cooking.',
    price: 135,
    mrp: 160,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 7820,
    stock: 140,
    inStock: true,
    unit: '1 kg Pouch',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1592394533824-9440e5d68530?auto=format&fit=crop&w=600&q=80'],
    tags: ['Green Peas', 'Frozen Peas', 'Safal', 'Matar', 'IQF'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mccain-french-fries',
    slug: 'mccain-french-fries-crispy-potato-sticks',
    name: 'McCain Crispy French Fries (Potato Sticks)',
    brand: 'MCCAIN',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Golden, crispy on the outside and fluffy on the inside restaurant-style potato fries.',
    fullDescription: 'Made from specially selected non-GMO potatoes. Ready in just 3 minutes in hot oil or 10 minutes in an air fryer.',
    price: 119,
    mrp: 140,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 9140,
    stock: 160,
    inStock: true,
    unit: '420 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'],
    tags: ['French Fries', 'McCain', 'Potatoes', 'Snacks', 'Air Fryer'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mccain-smiles',
    slug: 'mccain-smiles-crispy-mashed-potato-shapes',
    name: 'McCain Smiles Crispy Mashed Potato Shapes',
    brand: 'MCCAIN',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Fun, happy smiling potato faces made from creamy mashed potatoes seasoned with delicate herbs.',
    fullDescription: 'Beloved evening party snack for children and adults. Fries up crunchy and golden without breaking.',
    price: 125,
    mrp: 145,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 6310,
    stock: 115,
    inStock: true,
    unit: '415 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'],
    tags: ['McCain', 'Smiles', 'Potato Shapes', 'Kids Snacks'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-amul-belgian-icecream',
    slug: 'amul-belgian-chocolate-ice-cream-tub-1l',
    name: 'Amul Belgian Chocolate Super Premium Ice Cream',
    brand: 'AMUL',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-icecream',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Ice Creams & Tubs',
    description: 'Rich, decadent dark Belgian chocolate ice cream swirled with crunchy chocolate shavings.',
    fullDescription: 'Crafted with 100% real dairy buffalo and cow cream. Real cocoa solids deliver an ultra-creamy, velvety chocolate finish.',
    price: 240,
    mrp: 280,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 5410,
    stock: 90,
    inStock: true,
    unit: '1 Litre Tub',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80'],
    tags: ['Ice Cream', 'Amul', 'Belgian Chocolate', 'Dessert', 'Tub'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-safal-sweet-corn',
    slug: 'safal-select-frozen-sweet-corn-kernels-500g',
    name: 'Safal Select Juicy Sweet Corn Kernels',
    brand: 'SAFAL',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-veg',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Frozen Veggies & Corn',
    description: 'Plump golden American sweet corn kernels, tender, juicy, and naturally sweet.',
    fullDescription: 'Perfect for buttered street-style cup corn, fried corn chaat, creamy soups, and vibrant pasta bowls.',
    price: 79,
    mrp: 95,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 3940,
    stock: 120,
    inStock: true,
    unit: '500 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'],
    tags: ['Sweet Corn', 'Frozen Corn', 'Safal', 'Chaat', 'Veggies'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sumeru-malabar-paratha',
    slug: 'sumeru-frozen-malabar-flaky-paratha-pack-of-5',
    name: 'Sumeru Classica Multi-Layered Malabar Paratha',
    brand: 'SUMERU',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Crisp outside, soft and flaky inside authentic Kerala style spiral rolled parottas (Pack of 5).',
    fullDescription: 'Heat directly on a tawa for 3 minutes until golden brown, then fluff with both hands to release dozens of flaky layers.',
    price: 95,
    mrp: 115,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 4210,
    stock: 85,
    inStock: true,
    unit: '400 g (5 Parathas)',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'],
    tags: ['Paratha', 'Malabar Parotta', 'Sumeru', 'Kerala Food', 'Ready to Eat'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-itc-pizza-pockets',
    slug: 'itc-master-chef-veggie-pizza-pockets',
    name: 'ITC Master Chef Cheesy Veggie Pizza Pockets',
    brand: 'ITC MASTER CHEF',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Crispy herb-crusted pastry pockets stuffed with gooey mozzarella cheese, sweet corn, and marinara.',
    fullDescription: 'Bite into sizzling molten mozzarella cheese and spicy Italian tomato pizza stuffing in every corner.',
    price: 145,
    mrp: 175,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2980,
    stock: 75,
    inStock: true,
    unit: '360 g (12 Pockets)',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'],
    tags: ['Pizza Pockets', 'ITC', 'Cheese', 'Party Snack', 'Mozzarella'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-mccain-veggie-nuggets',
    slug: 'mccain-veggie-nuggets-crunchy-crumb',
    name: 'McCain Crunchy Crumb Veggie Nuggets',
    brand: 'MCCAIN',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Delightful bite-sized vegetable nuggets coated in golden toasted breadcrumbs.',
    fullDescription: 'Filled with farm-fresh carrots, green peas, potatoes, and mild spices. Irresistible dipped in mayonnaise or mint chutney.',
    price: 115,
    mrp: 135,
    discountPercentage: 15,
    rating: 4.7,
    reviewCount: 3120,
    stock: 90,
    inStock: true,
    unit: '320 g Pack',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80'],
    tags: ['Veggie Nuggets', 'McCain', 'Nuggets', 'Snacks'],
    isTrending: false,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-kwality-feast-bar',
    slug: 'kwality-walls-feast-chocolate-ice-cream-bar',
    name: "Kwality Wall's Feast Crisp Chocolate Ice Cream Bar",
    brand: "KWALITY WALL'S",
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-icecream',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Ice Creams & Tubs',
    description: 'Crunchy chocolate biscuit coated vanilla ice cream bar with a solid Belgian chocolate slab at the center.',
    fullDescription: 'The ultimate triple chocolate crunch thrill on a stick. Delivered cold in deep-freeze thermal insulated bags.',
    price: 50,
    mrp: 55,
    discountPercentage: 9,
    rating: 4.9,
    reviewCount: 6890,
    stock: 130,
    inStock: true,
    unit: '70 ml Stick',
    instantDeliveryMinutes: 8,
    mainImage: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80'],
    tags: ['Feast', 'Kwality Walls', 'Ice Cream Stick', 'Chocolate Bar'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-godrej-burger-patty',
    slug: 'godrej-yummiez-crispy-veg-burger-patty',
    name: 'Godrej Yummiez Crispy Veg Burger Patty (Pack of 4)',
    brand: 'GODREJ YUMMIEZ',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Cafe-style seasoned vegetable patties that fit standard burger buns seamlessly.',
    fullDescription: 'Crispy spiced crust packed with mashed potatoes, corn, and green peas. Fast-food restaurant crunch made in your own kitchen.',
    price: 125,
    mrp: 150,
    discountPercentage: 17,
    rating: 4.8,
    reviewCount: 2410,
    stock: 80,
    inStock: true,
    unit: '360 g (4 Patties)',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80'],
    tags: ['Burger Patty', 'Godrej', 'Yummiez', 'Veg Burger'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-baskin-mississippi-mud',
    slug: 'baskin-robbins-mississippi-mud-ice-cream-pint',
    name: 'Baskin Robbins Mississippi Mud Premium Ice Cream Pint',
    brand: 'BASKIN ROBBINS',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-icecream',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Ice Creams & Tubs',
    description: 'Decadent chocolate fudge ribbons and rich chocolate cake chunks blended into dark chocolate ice cream.',
    fullDescription: 'Ultra-luxurious gourmet dessert crafted by master chocolatiers. Delivered in frozen dark-store cold vaults.',
    price: 349,
    mrp: 410,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 3820,
    stock: 60,
    inStock: true,
    unit: '450 ml Pint',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=600&q=80'],
    tags: ['Baskin Robbins', 'Mississippi Mud', 'Gourmet Ice Cream', 'Chocolate Pint'],
    isTrending: true,
    isBestseller: true,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
  {
    id: 'prod-lite-sumeru-paneer-rolls',
    slug: 'sumeru-frozen-crispy-paneer-spring-rolls',
    name: 'Sumeru Golden Crispy Paneer Spring Rolls',
    brand: 'SUMERU',
    categoryId: 'cat-lite-frozen',
    subcategoryId: 'sub-l-frozen-snacks',
    categoryName: 'Frozen Foods',
    subcategoryName: 'Fries & Ready Snacks',
    description: 'Thin delicate pastry skin wrapped around spiced cottage cheese paneer cubes and crunchy vegetables.',
    fullDescription: 'Dries up shatteringly crisp without absorbing excess oil. Ready in 5 minutes in a shallow frying pan.',
    price: 165,
    mrp: 195,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 1920,
    stock: 65,
    inStock: true,
    unit: '300 g (8 Rolls)',
    instantDeliveryMinutes: 10,
    mainImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'],
    tags: ['Spring Rolls', 'Paneer Rolls', 'Sumeru', 'Party Snacks'],
    isTrending: false,
    isBestseller: false,
    deliveryDays: 0,
    sellerName: 'Haatza Lite DarkStore #14',
    sellerRating: 4.9,
  },
];

export const FrozenFoods: React.FC = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 25);
    return () => clearTimeout(timer);
  }, []);

  const displayedProducts = FROZEN_FOODS_CATALOG;

  return (
    <div className="bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 min-h-screen pt-3 pb-6 sm:pt-5 sm:pb-10 select-none relative overflow-hidden">
      <HaatzaLiteCategoryShowcase title="Frozen Foods">
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

export default FrozenFoods;
