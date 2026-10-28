import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { DealEndingItem, mockDealsEndingSoon } from '../../../services/mock/data/promotions';
import { ProductCarouselTrack } from '../ProductCarouselTrack';
import { CountdownClock } from '../CountdownClock';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';

interface HurryDealsWidgetProps {
  deals?: DealEndingItem[];
  onQuickView?: (product: Product) => void;
  className?: string;
}

interface HurryDealCardItemProps {
  deal: DealEndingItem;
  index: number;
  prefersReducedMotion: boolean;
  onSelectOptions: (e: React.MouseEvent, slug: string) => void;
}

const HurryDealCardItem: React.FC<HurryDealCardItemProps> = ({
  deal,
  index,
  prefersReducedMotion,
  onSelectOptions,
}) => {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const isFavorited = isInWishlist(deal.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productFromDeal: Product = {
      id: deal.id,
      name: deal.name,
      slug: deal.slug,
      brand: deal.brand,
      price: deal.offerPrice,
      mrp: deal.originalPrice,
      mainImage: deal.mainImage,
      images: [deal.mainImage],
      discountPercentage: deal.discountPercentage,
      rating: deal.rating,
      reviewCount: deal.reviewCount,
      inStock: true,
      stock: deal.stockLeft,
      destination: 'haatza',
      categoryId: 'cat-deals',
      categoryName: deal.categoryName,
      description: deal.name,
      fullDescription: deal.name,
      sellerName: deal.brand || 'HAATZA Verified Seller',
      sellerRating: 4.8,
      deliveryDays: 2,
      tags: [],
    };
    const success = addToCart(productFromDeal, 1);
    if (success) {
      navigate('/cart');
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const productFromDeal: Product = {
      id: deal.id,
      name: deal.name,
      slug: deal.slug,
      brand: deal.brand,
      price: deal.offerPrice,
      mrp: deal.originalPrice,
      mainImage: deal.mainImage,
      images: [deal.mainImage],
      discountPercentage: deal.discountPercentage,
      rating: deal.rating,
      reviewCount: deal.reviewCount,
      inStock: true,
      stock: deal.stockLeft,
      destination: 'haatza',
      categoryId: 'cat-deals',
      categoryName: deal.categoryName,
      description: deal.name,
      fullDescription: deal.name,
      sellerName: deal.brand || 'HAATZA Verified Seller',
      sellerRating: 4.8,
      deliveryDays: 2,
      tags: [],
    };
    toggleWishlist(productFromDeal);
  };
  const [isRevealed, setIsRevealed] = useState(false);
  const [animationCycle, setAnimationCycle] = useState(0);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  const checkVisibility = useCallback(() => {
    if (prefersReducedMotion) {
      if (!isRevealedRef.current) {
        isRevealedRef.current = true;
        setIsRevealed(true);
      }
      return;
    }

    const target = slotRef.current;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;

    // Viewport Visibility Trigger:
    // Card begins expanding as it enters the visible area:
    // - Vertically: top is at least 30px inside the bottom (scrolling down), and bottom is at least 40px inside the top (scrolling up)
    // - Horizontally: card is within viewport bounds
    const inView =
      rect.top < vh - 30 &&
      rect.bottom > 40 &&
      rect.left < vw - 20 &&
      rect.right > 20;

    // Viewport Exit Trigger (Two-way scroll replay):
    // Card resets when it is completely out of the visible screen in any direction
    const outOfView =
      rect.bottom <= 0 ||
      rect.top >= vh ||
      rect.right <= 0 ||
      rect.left >= vw;

    if (inView) {
      if (!isRevealedRef.current) {
        isRevealedRef.current = true;
        setIsRevealed(true);
      }
    } else if (outOfView) {
      if (isRevealedRef.current) {
        isRevealedRef.current = false;
        setIsRevealed(false);
        setAnimationCycle((c) => c + 1); // Alternates animation keyframe name to guarantee replay on re-entry
      }
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    // 1. IntersectionObserver for hardware-assisted detection
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              checkVisibility();
            } else {
              const r = entry.boundingClientRect;
              const vh = window.innerHeight || document.documentElement.clientHeight;
              const vw = window.innerWidth || document.documentElement.clientWidth;
              if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) {
                if (isRevealedRef.current) {
                  isRevealedRef.current = false;
                  setIsRevealed(false);
                  setAnimationCycle((c) => c + 1);
                }
              }
            }
          }
        },
        { threshold: [0, 0.08, 0.25, 0.5] }
      );
      observer.observe(el);
    }

    // 2. Window scroll and resize listeners
    const handleScrollOrResize = () => {
      checkVisibility();
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // 3. Carousel horizontal track scroll listener
    const track = el.closest('.overflow-x-auto');
    if (track) {
      track.addEventListener('scroll', handleScrollOrResize, { passive: true });
    }

    // 4. Tab visibility & focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVisibility();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkVisibility);

    // 5. Initial paint guarantee:
    // Guarantees browser paints the initial smaller scale (0.75) first before triggering transition
    const rafId1 = requestAnimationFrame(() => {
      const rafId2 = requestAnimationFrame(() => {
        checkVisibility();
      });
      return () => cancelAnimationFrame(rafId2);
    });

    const t1 = setTimeout(checkVisibility, 60);
    const t2 = setTimeout(checkVisibility, 200);

    return () => {
      cancelAnimationFrame(rafId1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (track) {
        track.removeEventListener('scroll', handleScrollOrResize);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkVisibility);
      if (observer) observer.disconnect();
    };
  }, [checkVisibility]);

  const optimizedImage = optimizeImageUrl(deal.mainImage, { width: 340, quality: 80 });

  // Stagger: 150ms between cards so each card expands in a smooth coordinated wave
  const staggerDelay = (index % 4) * 150; // 0ms, 150ms, 300ms, 450ms

  // Alternates animation name between cycle iterations to guarantee a fresh animation instance on every re-entry
  const animName = animationCycle % 2 === 0 ? 'dealCardGrow' : 'dealCardGrowAlt';

  // Animation Specs (Updated to Slower 1.8-2s Duration with 0.75 Starting Scale):
  // Starting Scale: 0.75 (75% of normal size)
  // Ending Scale: 1.0 (100% of normal size)
  // Animation Duration: 1900ms (1.9 seconds, within requested 1.8–2s range)
  // Easing: Smooth ease-out for gradual, visible expansion throughout the duration
  // Initial Opacity: 0.85
  // Final Opacity: 1.0
  const cardStyle: React.CSSProperties = prefersReducedMotion
    ? { transform: 'none', opacity: 1 }
    : isRevealed
    ? {
        animation: `${animName} 1900ms ease-out ${staggerDelay}ms both`,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }
    : {
        transform: 'scale(0.75) translateY(10px)',
        opacity: 0.85,
        animation: 'none',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      };

  return (
    <div
      ref={slotRef}
      className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0 flex flex-col py-1"
    >
      {/* Scalable Product Card with Smooth 1.9s Small-to-Big Growth (Clean, Borderless) */}
      <div
        style={cardStyle}
        className="origin-center flex flex-col justify-between w-full h-full text-center group cursor-pointer"
      >
        {/* 1. Proportional Square Image Box with Urgent Deal Indicators */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-colors group-hover:bg-slate-200/80">
          {/* Stock Left Urgency Tag Inside Image */}
          <div className="absolute bottom-1.5 left-2 right-2 bg-stone-900/85 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] text-amber-300 font-bold flex items-center justify-between pointer-events-none z-10">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              Only {deal.stockLeft} left
            </span>
            <span className="text-stone-300 text-[8.5px]">{deal.dealEndsInHours}h left</span>
          </div>

          <Link to={`/product/${deal.slug}`} className="block w-full h-full">
            <img
              src={optimizedImage}
              alt={deal.name}
              loading="lazy"
              className="w-full h-full object-cover object-center select-none transition-transform duration-350 ease-out group-hover:scale-[1.04]"
            />
          </Link>

          {/* Wishlist Heart Toggle */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer ${
              isFavorited
                ? 'bg-[#2962FF] text-white shadow-xs'
                : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* 2. Structured Content Wrapper (Exact same height slots as Deals of the Day) */}
        <div className="flex flex-col flex-1 justify-between w-full">
          {/* Product Name (Fixed height slot with 2-line clamp) */}
          <div className="h-8.5 sm:h-9 flex items-center justify-center">
            <Link
              to={`/product/${deal.slug}`}
              className="text-xs sm:text-[13px] font-bold text-[#172033] hover:text-[#2962FF] line-clamp-2 leading-snug transition-colors px-1 font-heading text-center"
              title={deal.name}
            >
              {deal.name}
            </Link>
          </div>

          {/* Product Price & MRP */}
          <div className="h-5.5 sm:h-6 flex items-baseline justify-center gap-1.5 mt-0.5 font-sans shrink-0">
            <span className="text-xs sm:text-[15px] font-black text-slate-950 font-heading">
              ₹{deal.offerPrice.toLocaleString('en-IN')}
            </span>
            {deal.originalPrice && deal.originalPrice > deal.offerPrice && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{deal.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Unified Button: "Add to Cart" pinned at bottom */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full mt-2 h-8 sm:h-8.5 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer select-none active:scale-95 bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-2xs hover:shadow-xs shrink-0"
            aria-label={`Add ${deal.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const HurryDealsWidget: React.FC<HurryDealsWidgetProps> = ({
  deals = mockDealsEndingSoon,
  className = '',
}) => {
  const navigate = useNavigate();

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleSelectOptions = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  if (!deals || deals.length === 0) return null;

  return (
    <section
      aria-label="Hurry! Deals Ending Soon"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      {/* Scoped CSS for Keyframes (Starting at scale 0.75, expanding to scale 1.00) and Grey Border */}
      <style>{`
        @keyframes dealCardGrow {
          0% {
            transform: scale(0.75) translateY(10px);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.00) translateY(0);
            opacity: 1.00;
          }
        }
        @keyframes dealCardGrowAlt {
          0% {
            transform: scale(0.75) translateY(10px);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.00) translateY(0);
            opacity: 1.00;
          }
        }
      `}</style>

      {/* Header (Clean, directly in layout without outer card box or background color) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            Hurry! Deals Ending Soon
          </h2>
          <CountdownClock
            initialHours={3}
            initialMinutes={45}
            initialSeconds={12}
            variant="pill"
            label="Flash ends in"
          />
        </div>

        <Link
          to="/deals-of-the-day"
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors font-heading"
        >
          <span>Explore All Flash Drops</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Product Carousel Track */}
      <ProductCarouselTrack scrollDistance={280}>
        {deals.map((deal, index) => (
          <HurryDealCardItem
            key={deal.id}
            deal={deal}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
            onSelectOptions={handleSelectOptions}
          />
        ))}
      </ProductCarouselTrack>
    </section>
  );
};
