import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';
import { 
  Zap, Plus, Minus, ChevronLeft, ChevronRight, 
  Clock, Sparkles, ArrowRight, Star 
} from 'lucide-react';

interface HaatzaLiteFlashDealsProps {
  products: HaatzaLiteProduct[];
}

// 3D Asset lookup for hyper-realistic renders
const PRODUCT_3D_ASSETS: Record<string, string> = {
  'prod-lite-mango': '/images/categories/3d_fruits.jpg',
  'prod-lite-paneer': '/images/categories/3d_dairy.jpg',
  'prod-lite-apples': '/images/kits/kit_3d_salad.jpg',
  'prod-lite-milk': '/images/categories/3d_dairy.jpg',
  'prod-lite-chips': '/images/categories/3d_snacks.jpg',
  'prod-lite-cleaner': '/images/categories/3d_cleaning.jpg',
};

export const HaatzaLiteFlashDeals: React.FC<HaatzaLiteFlashDealsProps> = ({ products }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  // Animated countdown timer for Flash Deal urgency
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 24, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const spotlightProduct = products[0] || null;

  return (
    <section
      aria-label="Flash Deals in 10-15 Mins"
      className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-[#E5EBE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-4.5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#0C831F] text-white flex items-center justify-center font-black shadow-[0_3px_10px_rgba(12,131,31,0.35)] text-lg">
              %
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
                  Flash Deals in 10-15 Mins
                </h2>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAF8ED] text-[#0C831F] border border-[#0C831F]/25 shadow-2xs">
                  <Zap className="w-2.5 h-2.5 fill-current" />
                  UP TO 45% OFF
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Steal deals on everyday groceries dispatched instantly from your local dark store.
              </p>
            </div>
          </div>

          {/* Carousel Arrows & View All */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              to="/lite/categories/all"
              className="text-xs font-black text-[#0C831F] hover:text-[#09711A] flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#EAF8ED] hover:bg-[#D8F2DD] transition-colors"
            >
              <span>See All Deals</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-8 h-8 rounded-full border border-[#E5EBE6] hover:border-[#0C831F] hover:bg-[#EAF8ED] text-[#111D15] hover:text-[#0C831F] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-8 h-8 rounded-full border border-[#E5EBE6] hover:border-[#0C831F] hover:bg-[#EAF8ED] text-[#111D15] hover:text-[#0C831F] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 40 / 60 Cinematic Split-Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* LEFT PANEL (40% Width): Ultra-Premium White Frosted Glass Spotlight Card with 150% Scaled 3D Mango Image */}
          <div className="lg:col-span-5 relative rounded-[24px] overflow-hidden min-h-[420px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-white via-[#F8FCF9] to-white/95 backdrop-blur-xl border border-[#0C831F]/25 group select-none shadow-[0_6px_25px_rgba(12,131,31,0.06)] hover:border-[#0C831F] hover:shadow-[0_0_32px_rgba(12,131,31,0.32),0_10px_25px_rgba(12,131,31,0.16)] hover:ring-1 hover:ring-[#0C831F]/40 hover:-translate-y-1.5 transition-all duration-150 ease-in-out cursor-pointer">
            
            {/* Ambient Subtle Green Glow in Corner */}
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-[#0C831F]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-300" />
            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-[#0C831F]/08 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-300" />

            {/* Top Bar: Spotlight Pill & Live Animated Urgency Ticker */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider border border-[#0C831F]/25 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0C831F]" />
                <span>FEATURE SPOTLIGHT</span>
              </div>

              {/* Animated Countdown Timer */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F8F5] text-[#111D15] text-[11px] font-mono font-black border border-[#E2E8F0] shadow-2xs">
                <Clock className="w-3 h-3 text-[#0C831F]" />
                <span>
                  {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Middle: 150% Scaled 3D Product Image Breaking Slightly Out of Container */}
            <div className="relative z-10 flex items-center justify-center my-3 sm:my-4 py-2 overflow-visible">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
                <img
                  src="/images/categories/3d_fruits.jpg"
                  alt="Spotlight 3D Ripe Mangoes"
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(12,131,31,0.22)] transform scale-135 sm:scale-150 group-hover:scale-[1.58] group-hover:rotate-[3deg] transition-all duration-300 ease-out pointer-events-none"
                  loading="eager"
                />
                
                {/* Floating Micro Savings Pill */}
                <span className="absolute -bottom-1 -left-2 bg-[#0C831F] text-white text-[10.5px] font-black px-2.5 py-1 rounded-lg shadow-md border border-white/30 tracking-tight">
                  ⚡ SAVE 25%
                </span>
              </div>
            </div>

            {/* Bottom Content: Clean Charcoal Black / Dark Grey Typography & Green Action CTA */}
            <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E5EBE6] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0C831F]">
                  RATNAGIRI GI-TAGGED • 100% FARM INSPECTED
                </span>
                <span className="text-[10.5px] font-extrabold text-[#0C831F] bg-[#EAF8ED] px-2 py-0.5 rounded-md border border-[#0C831F]/20">
                  ⚡ 10-15 Min Dispatch
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-bold text-[#0C831F] uppercase tracking-wider">
                    {spotlightProduct?.brand || 'FARM FRESH'}
                  </span>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{(spotlightProduct?.rating || 4.9).toFixed(1)}</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight leading-tight font-heading">
                  Ratnagiri Alphonso Mangoes (Hapus)
                </h3>
                <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1 leading-relaxed">
                  Naturally sweet, grass-crate ripened golden pulp with zero artificial chemicals. Handpicked coastal harvest.
                </p>
              </div>

              <div className="pt-2 border-t border-[#F0F4F1] flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#0C831F] tracking-tight font-heading">
                      ₹749
                    </span>
                    <span className="text-xs text-slate-400 line-through font-semibold">
                      ₹999
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    1 Box (6 Large Pieces)
                  </span>
                </div>

                {spotlightProduct && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(spotlightProduct, 1);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0C831F] hover:bg-[#09711A] text-white font-black text-xs uppercase tracking-wider transition-all duration-150 shadow-[0_3px_12px_rgba(12,131,31,0.35)] hover:shadow-[0_5px_18px_rgba(12,131,31,0.5)] active:scale-95 cursor-pointer flex items-center gap-1.5 border border-[#0C831F]"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Grab Deal</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (60% Width): Fluid Horizontally Scrolling Carousel of Crisp White 3D Product Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center min-w-0">
            <div
              ref={scrollContainerRef}
              className="flex gap-3.5 sm:gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 px-1 scroll-smooth"
            >
              {products.map((p) => {
                const cartItem = cart.find((item) => item.productId === p.id);
                const qty = cartItem ? cartItem.quantity : 0;
                const render3D = PRODUCT_3D_ASSETS[p.id] || p.mainImage;

                return (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/lite/product/${p.id || p.slug}`)}
                    className="group relative flex-none w-[175px] sm:w-[195px] bg-white rounded-2xl border border-[#E2E8F0]/90 p-3 sm:p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:border-[#0C831F] hover:shadow-[0_0_26px_rgba(12,131,31,0.30),0_6px_16px_rgba(12,131,31,0.12)] hover:ring-1 hover:ring-[#0C831F]/40 hover:-translate-y-1.5 transition-all duration-150 ease-in-out flex flex-col justify-between select-none cursor-pointer"
                  >
                    <div>
                      {/* Floating Vivid 3D Product Render with Micro-Shadow */}
                      <div className="relative aspect-square w-full rounded-xl bg-[#F8FCF9] overflow-hidden mb-2.5 border border-emerald-50 flex items-center justify-center p-1.5">
                        <Link to={`/lite/product/${p.id || p.slug}`} className="block w-full h-full flex items-center justify-center">
                          <img
                            src={render3D}
                            alt={p.name}
                            className="w-full h-full object-contain object-center filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out group-hover:scale-108 group-hover:rotate-[2.5deg]"
                            loading="lazy"
                          />
                        </Link>

                        {/* Delivery Minutes Badge */}
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#0C831F] text-[9.5px] font-black px-1.5 py-0.5 rounded-md border border-[#0C831F]/20 shadow-2xs">
                            <Zap className="w-2.5 h-2.5 fill-current" />
                            {p.instantDeliveryMinutes || 12}m
                          </span>
                        </div>

                        {/* Discount Pill */}
                        {p.discountPercentage > 0 && (
                          <span className="absolute bottom-1.5 left-1.5 bg-[#EAF8ED] text-[#0C831F] text-[9.5px] font-black px-1.5 py-0.5 rounded shadow-2xs border border-[#0C831F]/25">
                            {p.discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      {/* Brand, Unit & Rating */}
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider truncate">
                          {p.brand}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {p.unit && (
                            <span className="text-[9.5px] font-semibold text-[#0C831F] bg-[#EAF8ED] px-1 py-0.5 rounded">
                              {p.unit}
                            </span>
                          )}
                          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shadow-2xs">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>{(p.rating || 4.8).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Title in Compact Bold Sans-Serif Font */}
                      <Link
                        to={`/lite/product/${p.id || p.slug}`}
                        className="text-xs font-bold text-[#111D15] group-hover:text-[#0C831F] transition-colors line-clamp-2 leading-snug mb-2 font-heading"
                      >
                        {p.name}
                      </Link>
                    </div>

                    {/* Pricing & Glowing Vibrant Brand Green Add Button */}
                    <div className="pt-2 border-t border-[#F0F4F1] flex items-center justify-between gap-1.5">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base font-black text-[#111D15] tracking-tight leading-none font-heading">
                          {formatCurrency(p.price)}
                        </span>
                        {p.mrp > p.price && (
                          <span className="text-[10px] text-slate-400 line-through font-medium mt-0.5">
                            {formatCurrency(p.mrp)}
                          </span>
                        )}
                      </div>

                      {/* Glowing Brand Green "+ ADD" / Quantity Button */}
                      <div onClick={(e) => e.stopPropagation()}>
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(p, 1);
                            }}
                            className="group/btn px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-[0_3px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_5px_16px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
                            <span>ADD</span>
                          </button>
                        ) : (
                          <div className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_2px_10px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(cartItem!.id, qty - 1);
                              }}
                              className="px-2 py-1 hover:bg-black/15 text-white transition-colors active:scale-90 cursor-pointer"
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
                              className="px-2 py-1 hover:bg-black/15 text-white transition-colors active:scale-90 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
