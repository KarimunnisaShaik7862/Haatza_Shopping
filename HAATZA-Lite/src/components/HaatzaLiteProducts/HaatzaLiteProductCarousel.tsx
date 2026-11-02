import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Minus, ChevronLeft, ChevronRight, Zap, Sparkles, Star } from 'lucide-react';

interface HaatzaLiteProductCarouselProps {
  products: HaatzaLiteProduct[];
  title?: string;
  variant?: 'fruits' | 'cleaning' | string;
}

export const HaatzaLiteProductCarousel: React.FC<HaatzaLiteProductCarouselProps> = ({
  products,
  variant = 'default',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  const handleArrow = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 265; // approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group/carousel">
      <style>{`
        /* Base Card Structure */
        .lite-carousel-card {
          transform: translate3d(0, 0, 0) scale(1);
          backface-visibility: hidden;
          opacity: 1;
          background: #FFFFFF;
          border-color: rgba(226, 232, 240, 0.9);
          box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 380ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      box-shadow 380ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      border-color 380ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      background 380ms cubic-bezier(0.2, 0.9, 0.3, 1);
          will-change: transform, box-shadow;
          z-index: 10;
        }

        /* 1. CINEMATIC FRUITS & PRODUCE CARD ANIMATIONS (Green & White) */
        @keyframes fruitsImgHoverBreath {
          0%, 100% { transform: scale(1) translate3d(0, 0, 0); }
          50% { transform: scale(1.02) translate3d(0, -3px, 0); }
        }
        @keyframes fruitsSheenAnim {
          0% { transform: translate3d(-150%, 0, 0) skewX(-25deg); opacity: 0; }
          30% { opacity: 0.85; }
          100% { transform: translate3d(260%, 0, 0) skewX(-25deg); opacity: 0; }
        }

        .card-variant-fruits .product-img {
          animation: fruitsImgHoverBreath 6s ease-in-out infinite;
          transition: transform 380ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      filter 380ms cubic-bezier(0.2, 0.9, 0.3, 1);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
        }

        .card-variant-fruits:hover {
          transform: translate3d(0, -8px, 0) scale(1.025);
          border-color: rgba(12, 131, 31, 0.55);
          background: radial-gradient(circle at 50% 12%, rgba(12, 131, 31, 0.07) 0%, transparent 70%), #FFFFFF;
          box-shadow: 0 20px 40px -10px rgba(12, 131, 31, 0.22),
                      0 0 24px 2px rgba(12, 131, 31, 0.16),
                      0 4px 12px rgba(0, 0, 0, 0.04);
          z-index: 25;
        }

        .card-variant-fruits:hover .product-img {
          animation: none;
          transform: scale(1.12) translate3d(0, -7px, 0) rotate(-1.5deg);
          filter: drop-shadow(0 16px 22px rgba(12, 131, 31, 0.24)) contrast(1.06) brightness(1.02);
        }

        .card-variant-fruits .img-aura {
          background: radial-gradient(circle, rgba(12, 131, 31, 0.40) 0%, transparent 70%);
          transition: opacity 380ms ease, transform 380ms ease;
          opacity: 0;
          transform: scale(0.85);
        }

        .card-variant-fruits:hover .img-aura {
          opacity: 1;
          transform: scale(1.3) translateY(2px);
        }

        .card-variant-fruits:hover .cinematic-sheen-streak {
          animation: fruitsSheenAnim 0.95s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        /* 2. CINEMATIC CLEANING & HYGIENE CARD ANIMATIONS (Pure Green & White) */
        @keyframes cleaningImgHoverFloat {
          0%, 100% { transform: scale(1) translate3d(0, 0, 0); }
          50% { transform: scale(1.015) translate3d(0, -3px, 0); }
        }
        @keyframes cleaningPrismAnim {
          0% { transform: translate3d(-160%, 0, 0) rotate(35deg); opacity: 0; }
          35% { opacity: 0.9; }
          100% { transform: translate3d(260%, 0, 0) rotate(35deg); opacity: 0; }
        }
        @keyframes lensFlareSpin {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          45% { transform: scale(1.3) rotate(90deg); opacity: 1; }
          100% { transform: scale(1) rotate(180deg); opacity: 0.85; }
        }

        .card-variant-cleaning .product-img {
          animation: cleaningImgHoverFloat 6s ease-in-out infinite;
          transition: transform 380ms cubic-bezier(0.2, 0.9, 0.3, 1),
                      filter 380ms cubic-bezier(0.2, 0.9, 0.3, 1);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.06));
        }

        .card-variant-cleaning:hover {
          transform: translate3d(0, -8px, 0) scale(1.025);
          border-color: rgba(12, 131, 31, 0.60);
          background: radial-gradient(circle at 50% 10%, rgba(12, 131, 31, 0.05) 0%, transparent 65%), #FFFFFF;
          box-shadow: 0 20px 40px -10px rgba(12, 131, 31, 0.20),
                      0 0 28px 2px rgba(16, 185, 129, 0.16),
                      0 4px 12px rgba(0, 0, 0, 0.04);
          z-index: 25;
        }

        .card-variant-cleaning:hover .product-img {
          animation: none;
          transform: scale(1.10) translate3d(0, -7px, 0);
          filter: drop-shadow(0 16px 24px rgba(0, 0, 0, 0.14)) drop-shadow(0 0 16px rgba(12, 131, 31, 0.20)) contrast(1.05);
        }

        .card-variant-cleaning .img-aura {
          background: radial-gradient(circle, rgba(12, 131, 31, 0.35) 0%, rgba(255, 255, 255, 0.9) 45%, transparent 75%);
          transition: opacity 380ms ease, transform 380ms ease;
          opacity: 0;
          transform: scale(0.85);
        }

        .card-variant-cleaning:hover .img-aura {
          opacity: 1;
          transform: scale(1.25);
        }

        .card-variant-cleaning:hover .cinematic-sheen-streak {
          animation: cleaningPrismAnim 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .card-variant-cleaning:hover .lens-star-flare {
          animation: lensFlareSpin 0.75s ease-out forwards;
        }

        /* Default fallback hover */
        .card-variant-default:hover {
          transform: translate3d(0, -5px, 0) scale(1.02);
          border-color: rgba(12, 131, 31, 0.45);
          box-shadow: 0 16px 32px -8px rgba(12, 131, 31, 0.16), 0 0 20px rgba(12, 131, 31, 0.14);
        }
        .card-variant-default:hover .product-img {
          transform: scale(1.06);
          filter: drop-shadow(0 10px 18px rgba(0, 0, 0, 0.09));
        }

        @media (prefers-reduced-motion: reduce) {
          .lite-carousel-card,
          .lite-carousel-card .product-img,
          .lite-carousel-card .img-aura,
          .cinematic-sheen-streak,
          .lens-star-flare {
            transition: none !important;
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>

      {/* Scroll Controls (Desktop Floating Chevrons) */}
      {products.length > 3 && (
        <>
          <button
            type="button"
            onClick={() => handleArrow('left')}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-slate-700 hover:text-[#0C831F] hover:border-[#0C831F]/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 cursor-pointer hidden md:flex hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => handleArrow('right')}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.12)] text-slate-700 hover:text-[#0C831F] hover:border-[#0C831F]/40 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 cursor-pointer hidden md:flex hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Fluid Horizontally-Scrolling Carousel with Zero-Clipping Hover Clearance */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pt-2 sm:pt-3 pb-3 sm:pb-4 px-1.5 sm:px-4 scroll-smooth"
      >
        {products.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          const qty = cartItem ? cartItem.quantity : 0;
          const packSize = product.unit || '1 unit';
          const productId = product.id || product.slug;

          return (
            <div
              key={product.id}
              onClick={() => navigate(`/lite/product/${productId}`)}
              className={`lite-carousel-card ${
                variant === 'fruits'
                  ? 'card-variant-fruits'
                  : variant === 'cleaning'
                  ? 'card-variant-cleaning'
                  : 'card-variant-default'
              } group relative w-[165px] sm:w-[220px] md:w-[245px] shrink-0 snap-center select-none flex flex-col justify-between rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border cursor-pointer overflow-hidden`}
            >
              {/* Cinematic Specular Light Sheen Layer */}
              <div
                className="cinematic-sheen-streak absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 z-30"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 48%, rgba(12, 131, 31, 0.20) 52%, transparent 100%)',
                }}
              />

              <div>
                {/* 3D Product Render Stage */}
                <div className="relative h-32 sm:h-44 md:h-48 w-full flex items-center justify-center mb-2 sm:mb-3 pt-3 sm:pt-6 pb-1 sm:pb-2">
                  {/* Underneath Brand Aura Glow on Hover */}
                  <div
                    className="img-aura absolute bottom-1 inset-x-8 h-8 rounded-full blur-xl pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Cleaning Variant: Optical 4-Point Lens Star Flare on Hover */}
                  {variant === 'cleaning' && (
                    <div className="lens-star-flare absolute top-1 right-2 pointer-events-none opacity-0 z-20">
                      <Sparkles className="w-5 h-5 text-[#0C831F] fill-[#0C831F]/25 filter drop-shadow-[0_0_8px_rgba(12,131,31,0.7)]" />
                    </div>
                  )}

                  {/* Delivery Pill Badge */}
                  <div className="absolute top-0 left-0 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-2xs">
                    <Zap className="w-3 h-3 text-[#0C831F] fill-current" />
                    <span className="text-[10px] font-black tracking-tight text-[#0C831F]">
                      {product.instantDeliveryMinutes || 10} MINS
                    </span>
                  </div>

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-0 right-0 z-20 bg-[#0C831F] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* 3D Floating Product Image */}
                  <Link
                    to={`/lite/product/${productId}`}
                    className="relative z-10 w-full h-full flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      width="180"
                      height="180"
                      loading="lazy"
                      decoding="async"
                      className="product-img max-h-[75%] max-w-[75%] scale-[1.08] group-hover:scale-[1.14] object-contain mix-blend-multiply select-none transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Typography */}
                <div className="pt-1">
                  <Link
                    to={`/lite/product/${productId}`}
                    className="block text-sm font-bold text-[#111D15] group-hover:text-[#0C831F] transition-colors line-clamp-2 leading-snug mb-1.5 min-h-[2.5rem]"
                  >
                    {product.name}
                  </Link>

                  {/* Unit / Weight & Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-3">
                    <span className="truncate">{packSize}</span>
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{(product.rating || 4.8).toFixed(1)}</span>
                    </div>
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
                <div onClick={(e) => e.stopPropagation()}>
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="group/btn px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-105 shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_14px_rgba(16,185,129,0.45)] font-black text-xs transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1 select-none"
                    >
                      <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2 py-1 rounded-xl shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          updateQuantity(cartItem!.id, qty - 1);
                        }}
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-md transition-colors cursor-pointer active:scale-90"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
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
                        className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-md transition-colors cursor-pointer active:scale-90"
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
  );
};

export default HaatzaLiteProductCarousel;
