import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Minus, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface HaatzaLiteProductCarouselProps {
  products: HaatzaLiteProduct[];
  title?: string;
}

export const HaatzaLiteProductCarousel: React.FC<HaatzaLiteProductCarouselProps> = ({
  products,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll Controls (Desktop Floating Chevrons) */}
      {products.length > 4 && (
        <>
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-slate-700 hover:text-[#0C831F] hover:border-[#0C831F]/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 cursor-pointer hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-slate-700 hover:text-[#0C831F] hover:border-[#0C831F]/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 cursor-pointer hidden md:flex"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Fluid Horizontally-Scrolling Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-4 sm:pt-5 pb-7 px-1.5 scroll-smooth"
      >
        {products.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          const qty = cartItem ? cartItem.quantity : 0;
          const packSize = product.unit || '1 unit';

          return (
            <div
              key={product.id}
              className="group relative w-[220px] sm:w-[245px] shrink-0 snap-start select-none flex flex-col justify-between bg-white rounded-2xl p-3.5 sm:p-4 border border-[#0C831F]/12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-[#0C831F]/35 hover:shadow-[0_16px_32px_-4px_rgba(12,131,31,0.22),0_6px_16px_-2px_rgba(12,131,31,0.12),0_0_0_1px_rgba(12,131,31,0.25)] will-change-transform cursor-pointer"
            >
              <div>
                {/* 3D Product Render Stage - Clean Canvas, 50-60% fill, No Box Borders */}
                <div className="relative h-44 sm:h-48 w-full flex items-center justify-center mb-3 pt-6 pb-2">
                  {/* Soft Brand-Green Aura Glow Underneath on Hover */}
                  <div className="absolute bottom-1 inset-x-10 h-7 rounded-full bg-transparent group-hover:bg-[#0C831F]/25 blur-lg transition-all duration-300 scale-90 group-hover:scale-115 pointer-events-none" />

                  {/* Delivery Pill Badge (Top Left with clearance) */}
                  <div className="absolute top-0 left-0 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                    <Zap className="w-3 h-3 text-[#0C831F] fill-current" />
                    <span className="text-[10px] font-black tracking-tight text-[#0C831F]">
                      {product.instantDeliveryMinutes || 10} MINS
                    </span>
                  </div>

                  {/* Discount Badge (Top Right with clearance) */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-0 right-0 z-20 bg-[#0C831F] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* 3D Floating Product Image - Scaled cleanly to ~55% of container */}
                  <Link
                    to={`/product/${product.slug}`}
                    className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      width="180"
                      height="180"
                      loading="lazy"
                      decoding="async"
                      className="max-h-[58%] max-w-[58%] object-contain mix-blend-multiply group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ease-out filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] select-none"
                    />
                  </Link>
                </div>

                {/* Typography: Pushed down for breathing room */}
                <div className="pt-1">
                  <Link
                    to={`/product/${product.slug}`}
                    className="block text-sm font-bold text-[#111D15] group-hover:text-[#0C831F] transition-colors line-clamp-2 leading-snug mb-1.5 min-h-[2.5rem]"
                  >
                    {product.name}
                  </Link>

                  {/* Unit / Weight */}
                  <div className="text-xs text-slate-500 font-medium mb-3">
                    {packSize}
                  </div>
                </div>
              </div>

              {/* Pricing & Premium Action Button */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#0C831F]/10">
                <div className="flex flex-col">
                  <span className="text-base font-black text-[#0C831F] tracking-tight">
                    {formatCurrency(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-[11px] text-slate-400 line-through font-medium">
                      {formatCurrency(product.mrp)}
                    </span>
                  )}
                </div>

                {/* Interactive Green/White ADD Action */}
                <div>
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="px-4 py-1.5 rounded-xl border border-[#0C831F] bg-white text-[#0C831F] group-hover:bg-[#0C831F] group-hover:text-white group-hover:border-[#0C831F] group-hover:shadow-[0_4px_14px_rgba(12,131,31,0.4)] font-black text-xs transition-all duration-200 active:scale-95 shadow-2xs cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#0C831F] text-white px-2 py-1 rounded-xl shadow-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateQuantity(cartItem!.id, qty - 1);
                        }}
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-md transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="text-xs font-black min-w-[14px] text-center">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateQuantity(cartItem!.id, qty + 1);
                        }}
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-md transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
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
  );
};
