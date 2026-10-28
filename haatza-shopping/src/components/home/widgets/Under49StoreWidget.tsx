import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import { mockUnder49Products } from '../../../services/mock/data/promotions';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';

// Assets imported directly so Vite bundles and resolves them without 404s
import storeBannerImg from '../../../assets/images/banners/49-store1.png';
import shirtImg from '../../../assets/images/store49/shirt.png';
import sunglassesImg from '../../../assets/images/store49/sunglasses.png';
import sneakersImg from '../../../assets/images/store49/sneakers.png';
import handbagImg from '../../../assets/images/store49/handbag.png';
import bottleImg from '../../../assets/images/store49/bottle.png';
import walletImg from '../../../assets/images/store49/wallet.png';

// Transparent stage showcase asset mapping for the 3D podium
const STAGE_IMAGES: Record<string, string> = {
  'prod-49-1': sunglassesImg,
  'prod-49-2': sneakersImg,
  'prod-49-3': shirtImg,
  'prod-49-4': handbagImg,
  'prod-49-5': bottleImg,
  'prod-49-6': walletImg,
};

const getStageImage = (product: Product | null): string => {
  if (!product) return sunglassesImg;
  return STAGE_IMAGES[product.id] || product.mainImage || product.images?.[0] || sunglassesImg;
};

interface Under49StoreWidgetProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const Under49StoreWidget: React.FC<Under49StoreWidgetProps> = ({
  products = mockUnder49Products,
  onQuickView,
  className = '',
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // ----------------------------------------------------
  // 1. Dynamic Featured Stage Products from Collection
  // Reuses the exact product data and image assets from the ₹49 Store collection below
  // ----------------------------------------------------
  const stageProducts = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    return products.slice(0, Math.min(6, products.length));
  }, [products]);

  // Preload actual ₹49 Store product images on mount for instant transitions
  useEffect(() => {
    if (!stageProducts || stageProducts.length === 0) return;
    stageProducts.forEach((p) => {
      const src = getStageImage(p);
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [stageProducts]);

  // Tab visibility tracking to pause animation when browser tab is inactive
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // ----------------------------------------------------
  // 2. Sequential Single-Product 3D Stage Showcase
  // ----------------------------------------------------
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerInView, setBannerInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  // Viewport tracking: pause or reduce animations when offscreen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setBannerInView(true);
        setCurrentIndex(0);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setBannerInView(entries[0].isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Viewport tracking for 3D Typography Entrance Animation
  const textSectionRef = useRef<HTMLDivElement>(null);
  const [textInView, setTextInView] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setTextInView(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTextInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sequential transition:
  // Show product for 2000ms, then trigger smooth 600ms handoff to the next actual product
  useEffect(() => {
    if (!bannerInView || !isTabVisible || stageProducts.length <= 1) return;

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        setExitingIndex(prev % stageProducts.length);
        // Clear outgoing product after smooth handoff completes (600ms)
        setTimeout(() => {
          setExitingIndex(null);
        }, 600);
        return (prev + 1) % stageProducts.length;
      });
    }, 2600); // 2000ms stable viewing + 600ms transition

    return () => clearInterval(interval);
  }, [bannerInView, isTabVisible, stageProducts.length]);

  // ----------------------------------------------------
  // 3. Five-Product Carousel Pagination
  // ----------------------------------------------------
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Exactly 5 products per desktop view
  const PRODUCTS_PER_GROUP = 5;
  const totalGroups = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_GROUP));

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
      setIsTransitioning(false);
    }, 160);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
      setIsTransitioning(false);
    }, 160);
  };

  const displayedProducts = products.slice(
    currentGroup * PRODUCTS_PER_GROUP,
    currentGroup * PRODUCTS_PER_GROUP + PRODUCTS_PER_GROUP
  );

  if (!products || products.length === 0) return null;

  const currentProduct = stageProducts.length > 0 ? stageProducts[currentIndex % stageProducts.length] : null;
  const exitingProduct = exitingIndex !== null && stageProducts.length > 0 ? stageProducts[exitingIndex % stageProducts.length] : null;

  return (
    <section
      aria-label="₹49 Store"
      className={`w-full py-6 sm:py-8 bg-white ${className}`}
    >
      {/* Scoped CSS for ₹49 Store 3D Typography & Subtle Light Shimmer */}
      <style>{`
        /* 1. ₹49 Price: Royal blue with layered 3D extrusion & specular highlight */
        .haatza-3d-price {
          color: #2962FF;
          text-shadow:
            0 1px 0 #93C5FD,
            1px 1px 0 #1D4ED8,
            2px 2px 0 #1E40AF,
            3px 3px 0 #1E3A8A,
            4px 4px 0 #0F172A,
            5px 6px 14px rgba(15, 23, 42, 0.22);
          will-change: transform, filter;
        }

        /* 2. STORE: Deep navy with layered depth shadows */
        .haatza-3d-store {
          color: #0A192F;
          text-shadow:
            0 1px 0 #94A3B8,
            1px 1px 0 #334155,
            2px 2px 0 #1E293B,
            3px 3px 0 #0F172A,
            4px 5px 12px rgba(10, 25, 47, 0.18);
        }

        /* 3. Smooth 3D tilt & settle entrance animation on viewport entry */
        @keyframes haatza3dEntrance {
          0% {
            opacity: 0;
            transform: perspective(900px) rotateX(-22deg) rotateY(-6deg) translateY(16px);
          }
          65% {
            transform: perspective(900px) rotateX(3deg) rotateY(1deg) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px);
          }
        }

        .haatza-3d-entrance {
          animation: haatza3dEntrance 0.85s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: center bottom;
        }

        /* 4. Restrained, elegant light shimmer pulse on ₹49 text (slow 6s cycle) */
        @keyframes haatza3dShimmer {
          0%, 75%, 100% {
            filter: brightness(1);
            text-shadow:
              0 1px 0 #93C5FD,
              1px 1px 0 #1D4ED8,
              2px 2px 0 #1E40AF,
              3px 3px 0 #1E3A8A,
              4px 4px 0 #0F172A,
              5px 6px 14px rgba(15, 23, 42, 0.22);
          }
          85% {
            filter: brightness(1.2) drop-shadow(0 0 10px rgba(41, 98, 255, 0.35));
            text-shadow:
              0 1px 0 #BFDBFE,
              1px 1px 0 #3B82F6,
              2px 2px 0 #2563EB,
              3px 3px 0 #1D4ED8,
              4px 4px 0 #1E3A8A,
              5px 6px 18px rgba(41, 98, 255, 0.4);
          }
        }

        .haatza-3d-shimmer {
          animation: haatza3dShimmer 6s ease-in-out infinite;
        }

        /* 5. Realistic Floating Product Animation (6–12px vertical movement) */
        @keyframes haatzaFloatMotion {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(0.6deg);
          }
        }

        /* Synchronized platform shadow (expands & softens when product rises; tightens & darkens when product descends) */
        @keyframes haatzaShadowBreath {
          0%, 100% {
            transform: translateX(-50%) scale(0.92);
            opacity: 0.54;
            filter: blur(2.5px);
          }
          50% {
            transform: translateX(-50%) scale(1.08);
            opacity: 0.28;
            filter: blur(4.5px);
          }
        }

        .haatza-floating-product {
          animation: haatzaFloatMotion 3.2s ease-in-out infinite;
          will-change: transform;
        }

        .haatza-floating-shadow {
          animation: haatzaShadowBreath 3.2s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }

        /* Accessibility: Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .haatza-3d-entrance,
          .haatza-3d-shimmer,
          .haatza-floating-product,
          .haatza-floating-shadow {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* -------------------------------------------------- */}
      {/* 1. COMPACT HERO BANNER (FULL WIDTH, NO CROPPING)   */}
      {/* -------------------------------------------------- */}
      <div className="w-full mb-8 sm:mb-10">
        <div
          ref={bannerRef}
          className="relative w-full aspect-[2089/753] select-none rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs"
        >
          {/* Base Uncropped Banner Artwork (100% visible, original aspect ratio) */}
          <img
            src={storeBannerImg}
            alt="₹49 Store - Everyday Finds. Unbeatable Prices."
            className="w-full h-full object-contain pointer-events-none select-none"
            loading="eager"
          />

          {/* Centered Single-Product Stage Spotlight Container Hovering Above Platform */}
          <div
            className="absolute pointer-events-none flex items-center justify-center select-none"
            style={{
              left: '73.2%',
              top: '73.2%',
              transform: 'translate(-50%, -100%)',
              width: '23%',
              height: '50%',
              perspective: '1000px',
            }}
          >
            {/* Soft, Realistic Synchronized Hover Shadow directly beneath the product on the circular stage */}
            <div className="haatza-floating-shadow absolute -bottom-2 left-1/2 w-[70%] h-3.5 bg-[#081838]/40 rounded-full pointer-events-none" />

            {/* Continuous Floating Container (6-12px natural vertical movement) */}
            <div className="haatza-floating-product relative w-full h-full flex items-center justify-center">
              {/* Outgoing Featured Product (smooth 600ms exit transition) */}
              {exitingProduct && (
                <div
                  key={`exit-${exitingProduct.id}`}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-600 ease-in"
                  style={{
                    opacity: 0,
                    transform: 'scale(0.88) translateY(-10px) rotate(-3deg)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={getStageImage(exitingProduct)}
                    alt={exitingProduct.name}
                    className="max-h-[82%] max-w-[88%] w-auto h-auto object-contain select-none"
                    style={{
                      filter: 'drop-shadow(0 10px 18px rgba(15, 32, 66, 0.28)) drop-shadow(0 2px 6px rgba(41, 98, 255, 0.22))',
                    }}
                    loading="eager"
                  />
                </div>
              )}

              {/* Active Featured Product (centered with subtle blue-white glow & hovering above stage) */}
              {currentProduct && (
                <div
                  key={`active-${currentProduct.id}`}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-600 ease-out"
                  style={{
                    opacity: 1,
                    transform: 'scale(1) rotate(0deg)',
                    willChange: 'transform, opacity',
                  }}
                >
                  <img
                    src={getStageImage(currentProduct)}
                    alt={currentProduct.name}
                    className="max-h-[82%] max-w-[88%] w-auto h-auto object-contain select-none transition-transform duration-600 ease-out"
                    style={{
                      filter: 'drop-shadow(0 10px 18px rgba(15, 32, 66, 0.28)) drop-shadow(0 2px 6px rgba(41, 98, 255, 0.22))',
                    }}
                    loading="eager"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* 2. PRODUCT SHOWCASE DIRECTLY BELOW THE BANNER      */}
      {/* -------------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 sm:gap-6 pt-3 sm:pt-5">
        {/* Left Side: Premium 3D Typography for ₹49 Store (Center-aligned, brought down to align with products) */}
        <div
          ref={textSectionRef}
          className="w-full md:w-[220px] lg:w-[250px] xl:w-[270px] shrink-0 flex flex-col items-center text-center justify-start select-none pt-4 md:pt-8.5"
        >
          {/* Main 3D Heading: ₹49 STORE (Center Aligned) */}
          <h2
            className={`font-heading font-black tracking-tight leading-[0.92] text-center flex flex-col items-center ${
              textInView ? 'haatza-3d-entrance' : 'opacity-0'
            }`}
          >
            <span className="haatza-3d-price haatza-3d-shimmer block text-5xl sm:text-6xl lg:text-[62px] xl:text-[66px] font-black tracking-tighter text-center">
              ₹49
            </span>
            <span className="haatza-3d-store block text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight mt-1 text-center">
              STORE
            </span>
          </h2>

          {/* Short Description (Center Aligned) */}
          <p className="text-xs sm:text-sm text-slate-600 font-normal font-sans mt-2.5 sm:mt-3 leading-snug text-center max-w-[210px] mx-auto">
            Everyday essentials at prices you'll love.
          </p>

          {/* Arrow Link Only (Center Aligned) */}
          <div className="mt-3 sm:mt-3.5 flex justify-center">
            <Link
              to="/category/under-49"
              aria-label="Explore ₹49 Store Collection"
              title="Explore ₹49 Store Collection"
              className="group inline-flex items-center justify-center text-[#2962FF] hover:text-[#1E40AF] transition-colors p-1"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Right Side: Header with Reduced-Size Arrows on Top + Five Product Items */}
        <div className="flex-1 w-full flex flex-col">
          {/* Top Arrows Row - placed at top of products, aligned to the right */}
          <div className="flex items-center justify-end gap-1.5 mb-2.5 select-none">
            {/* Functional Previous Arrow (Reduced size: 28px) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous 5 products"
              className="w-7 h-7 rounded-full border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/80 flex items-center justify-center text-[#2962FF] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              title="Previous 5 products"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Functional Next Arrow (Reduced size: 28px) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next 5 products"
              className="w-7 h-7 rounded-full border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/80 flex items-center justify-center text-[#2962FF] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
              title="Next 5 products"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Strictly Single Row of 5 Products - Never wraps into 2 rows */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div
              className={`grid grid-cols-5 min-w-[540px] sm:min-w-0 gap-3 sm:gap-4 lg:gap-5 w-full transition-all duration-300 ease-out ${
                isTransitioning
                  ? 'opacity-0 scale-98 -translate-x-2'
                  : 'opacity-100 scale-100 translate-x-0'
              }`}
            >
            {displayedProducts.map((product) => {
              const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

              return (
                <div
                  key={product.id}
                  className="flex flex-col group cursor-pointer text-left select-none"
                >
                  {/* Clean rounded image container WITHOUT grey background box */}
                  <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:scale-[1.02]">
                    <Link
                      to={`/product/${product.slug}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={optimizedImage}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80';
                        }}
                        className="w-full h-full object-cover object-center transition-transform duration-350 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Wishlist Heart Toggle */}
                    <button
                      type="button"
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className={`absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer ${
                        isInWishlist(product.id)
                          ? 'bg-[#2962FF] text-white shadow-xs'
                          : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
                      }`}
                      aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Product Details: Name and Price */}
                  <div className="mt-2 px-0.5 flex flex-col">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-xs sm:text-[13px] font-semibold text-[#172033] hover:text-[#2962FF] line-clamp-1 leading-snug transition-colors font-heading"
                      title={product.name}
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-baseline gap-1.5 mt-0.5 font-sans">
                      <span className="text-xs sm:text-[13.5px] font-bold text-[#0F2042] font-heading">
                        {product.price === 49 ? '₹49*' : `₹${product.price}*`}
                      </span>
                      {product.mrp && product.mrp > product.price && (
                        <span className="text-[11px] text-slate-400 line-through">
                          ₹{product.mrp}
                        </span>
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



