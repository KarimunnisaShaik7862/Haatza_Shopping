import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Minus, Zap, ChevronRight, Star } from 'lucide-react';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { everydayEssentialsProducts } from '../../data/liteData';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  product: HaatzaLiteProduct;
  index: number;
  isInView: boolean;
  freshnessTag?: string;
}

const getFreshnessTag = (productId: string): string => {
  switch (productId) {
    case 'prod-lite-tomatoes':
      return 'Farm Fresh';
    case 'prod-lite-spinach':
      return 'Organic Hydro';
    case 'prod-lite-bananas':
      return 'Naturally Ripe';
    case 'prod-lite-milk':
      return 'Cold Stored';
    case 'prod-lite-farm-eggs':
      return 'Pasture Raised';
    case 'prod-lite-potato-chips':
      return 'Kettle Cooked';
    case 'prod-lite-dishwash-liquid':
      return 'Grease Cutter';
    case 'prod-lite-hand-wash':
      return '99.9% Protection';
    default:
      return 'Daily Fresh';
  }
};

export const EverydayEssentialsCard: React.FC<ProductCardProps> = React.memo(({ 
  product, 
  index, 
  isInView, 
  freshnessTag 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  const cartItem = cart.find((item) => item.productId === product.id);
  const qty = cartItem ? cartItem.quantity : 0;
  const productId = product.id || product.slug;

  const handleCardClick = () => {
    navigate(`/lite/product/${productId}`);
  };

  // Track cursor position for the interactive radial aura
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, qty + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, qty - 1);
    }
  };

  const tag = freshnessTag || getFreshnessTag(product.id);

  return (
    <div
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 300ms cubic-bezier(0.25, 1, 0.5, 1) ${index * 50}ms, transform 300ms cubic-bezier(0.25, 1, 0.5, 1) ${index * 50}ms`,
        willChange: 'opacity, transform',
      }}
    >
      <div
        ref={cardRef}
        onClick={handleCardClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 hover:border-[rgba(34,197,94,0.50)] hover:scale-[1.02] hover:-translate-y-1.5 hover:shadow-[0_16px_32px_-8px_rgba(12,131,31,0.18),0_0_24px_2px_rgba(34,197,94,0.22),0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform flex flex-col justify-between p-2 sm:p-3 select-none hover:z-20 cursor-pointer"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.06) 0%, transparent 70%), #FFFFFF'
            : '#FFFFFF',
        }}
      >
        {/* Interactive Cursor Radial Aura */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.12), transparent 75%)`,
          }}
          aria-hidden="true"
        />

      <div className="relative z-1">
        {/* 3. Parallax Image Depth Container (overflow: hidden) */}
        <div className="relative card-image-wrapper h-24 sm:h-32 md:h-34 w-full rounded-lg sm:rounded-xl overflow-hidden mb-1.5 sm:mb-2.5 bg-gradient-to-b from-[#F4FAF5] to-[#FAFCFB] border border-[#0C831F]/10 flex items-center justify-center p-1">
          {/* Subtle Ambient Radial Aura behind image */}
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500 opacity-60 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.18) 0%, rgba(12, 131, 31, 0.05) 50%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          {/* Delivery speed badge (10 MINS) */}
          <div className="absolute top-1.5 left-1.5 z-10 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[#0C831F] text-[9px] sm:text-[10px] font-bold shadow-2xs border border-[#0C831F]/20">
            <Zap className="w-2.5 h-2.5 fill-[#0C831F]" />
            <span>10 MINS</span>
          </div>

          {/* Discount badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 rounded-md bg-[#0C831F] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-2xs">
              {product.discountPercentage}% OFF
            </div>
          )}

          <Link
            to={`/lite/product/${productId}`}
            className="block w-full h-full flex items-center justify-center relative z-1"
            tabIndex={-1}
          >
            <img
              src={product.mainImage}
              alt={product.name}
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
              className="card-product-image max-h-full max-w-full w-auto h-auto object-contain object-center pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] scale-[1.08] group-hover:scale-[1.14] group-hover:contrast-[1.04] group-hover:brightness-[1.02] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            />
          </Link>
        </div>

        {/* Freshness attribute tag & Rating */}
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <div className="text-[10px] sm:text-[11px] font-semibold text-[#0C831F] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] shadow-[0_0_6px_rgba(12,131,31,0.6)]"></span>
            <span>{tag}</span>
          </div>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{(product.rating || 4.8).toFixed(1)}</span>
          </div>
        </div>

        {/* Product Name */}
        <Link
          to={`/lite/product/${productId}`}
          className="text-xs sm:text-[13px] md:text-sm font-bold text-[#111D15] group-hover:text-[#0C831F] transition-colors leading-snug line-clamp-1 mb-0.5 block"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Quantity / Pack Size */}
        <div className="text-[11px] sm:text-xs font-medium text-slate-500 mb-2 truncate">
          {product.unit}
        </div>
      </div>

      {/* Pricing & Tactile "+ ADD" Action */}
      <div className="relative z-1 flex items-center justify-between gap-1.5 pt-2 border-t border-slate-100/90 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xs sm:text-sm font-black text-[#111D15] tracking-tight">
              {formatCurrency(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-[10px] sm:text-[11px] text-slate-400 line-through font-medium">
                {formatCurrency(product.mrp)}
              </span>
            )}
          </div>
        </div>

        {/* 5. Premium "ADD" CTA Micro-Interactions */}
        <div onClick={(e) => e.stopPropagation()}>
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="group/btn h-7 sm:h-8 px-3 sm:px-3.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer font-sans select-none bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-105 shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_14px_rgba(16,185,129,0.45)] active:scale-95 transition-all duration-200 will-change-transform"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="h-7 sm:h-8 inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_2px_8px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-6 sm:w-6.5 h-full flex items-center justify-center hover:bg-black/15 text-white transition-colors active:scale-90 cursor-pointer"
                aria-label={`Decrease quantity of ${product.name}`}
              >
                <Minus className="w-2.5 h-2.5 stroke-[3]" />
              </button>
              <span className="px-1 text-[11px] sm:text-xs font-black min-w-5 text-center select-none text-white">
                {qty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-6 sm:w-6.5 h-full flex items-center justify-center hover:bg-black/15 text-white transition-colors active:scale-90 cursor-pointer"
                aria-label={`Increase quantity of ${product.name}`}
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
});

EverydayEssentialsCard.displayName = 'EverydayEssentialsCard';

export const HaatzaLiteEverydayEssentials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Trigger once on view
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '60px 0px 0px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 my-2 sm:my-3 select-none"
    >
      <div 
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-[36px] px-2.5 sm:px-6 lg:px-8 py-3.5 sm:py-6 border border-[#0C831F]/20 shadow-[0_16px_45px_-12px_rgba(12,131,31,0.08),0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-500"
        style={{
          background: 'linear-gradient(180deg, #F6FBF7 0%, #F0F8F2 50%, #F8FAF8 100%)',
        }}
      >
        <style>{`
          /* Subtle Ambient Botanical Drifts in section background */
          @keyframes subtleDriftL {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            50% {
              transform: translate3d(-8px, -10px, 0) rotate(-2deg);
            }
          }

          @keyframes subtleDriftR {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            50% {
              transform: translate3d(10px, -8px, 0) rotate(3deg);
            }
          }

          .ambient-botanical-l {
            animation: subtleDriftL 10s ease-in-out infinite;
          }

          .ambient-botanical-r {
            animation: subtleDriftR 12s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Background Ambience: Soft Emerald Aurora Glow */}
        <div 
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[400px] rounded-full blur-[70px] z-0 opacity-75"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(12, 131, 31, 0.08) 50%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* Abstract Botanical Leaf Silhouette 1 (Left background) */}
        <svg
          className="pointer-events-none absolute top-4 -left-12 w-64 h-64 text-[#0C831F]/[0.055] z-0 ambient-botanical-l"
          viewBox="0 0 200 200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M42.7,105.8 C62.3,71.2 110.5,45.3 162.1,38.2 C154.9,89.8 129,138 94.4,157.6 C67.3,173 31.9,165.7 17.5,138.6 C3.1,111.5 15.6,121.2 42.7,105.8 Z" />
        </svg>

        {/* Abstract Botanical Leaf Silhouette 2 (Right background) */}
        <svg
          className="pointer-events-none absolute bottom-2 -right-10 w-72 h-72 text-[#0C831F]/[0.05] z-0 ambient-botanical-r"
          viewBox="0 0 200 200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M157.3,94.2 C137.7,128.8 89.5,154.7 37.9,161.8 C45.1,110.2 71,62 105.6,42.4 C132.7,27 168.1,34.3 182.5,61.4 C196.9,88.5 184.4,78.8 157.3,94.2 Z" />
        </svg>

        {/* Section Content */}
        <div className="relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3.5">
            <div>
              <h2 className="text-lg sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
                Everyday Essentials
              </h2>
              <p className="text-[11px] sm:text-sm text-slate-500 font-medium mt-0.5">
                Fresh picks and daily favourites, delivered to your doorstep.
              </p>
            </div>

            <Link
              to="/lite/categories"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] transition-colors self-start sm:self-auto px-3 py-1 sm:py-1.5 rounded-full bg-white/80 hover:bg-[#EAF8ED] border border-[#0C831F]/20 shadow-2xs"
            >
              <span>see all</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8-Product Cards Grid Container with subtle rounded border enclosure */}
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-4 p-1.5 sm:p-4 rounded-xl sm:rounded-3xl bg-white/60 backdrop-blur-xs border border-[#0C831F]/15 shadow-[inset_0_1px_4px_rgba(12,131,31,0.03)]"
            style={{ perspective: '1200px' }}
          >
            {everydayEssentialsProducts.map((product, index) => (
              <EverydayEssentialsCard
                key={product.id}
                product={product}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaatzaLiteEverydayEssentials;
