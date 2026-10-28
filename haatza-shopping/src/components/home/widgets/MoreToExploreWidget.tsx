import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { useSequentialScrollScale } from '../../../hooks';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';
import { ALL_MOCK_PRODUCTS } from '../../../services/productService';
import { mockMensFashionProducts } from '../../../data/mensFashionProducts.data';
import { mockWomensFashionProducts } from '../../../data/womensFashionProducts.data';
import { DealProductCard } from '../../products/DealProductCard';

export interface MoreToExploreWidgetProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  viewAllLink?: string;
  /**
   * Layout mode:
   * - 'horizontal': Existing horizontal scroll track (default for all other pages)
   * - 'vertical-grid': Responsive multi-row grid with infinite scroll (opt-in for Men's Fashion & Home)
   */
  layout?: 'horizontal' | 'vertical-grid';
  /**
   * When true, automatically fetches and appends additional products as user scrolls down.
   */
  enableInfiniteScroll?: boolean;
  /**
   * Data pool context for infinite scrolling - supports any category slug or 'all'
   */
  categoryContext?: string;
}

// Curated diverse products from existing mock catalog for default horizontal mode
const DEFAULT_EXPLORE_IDS = [
  'prod-fash-3',
  'prod-elec-1',
  'prod-elec-2',
  'prod-beauty-1',
  'prod-furn-1',
  'prod-fash-1',
  'prod-fash-2',
  'prod-elec-3',
  'prod-haatza-bedsheet',
  'prod-haatza-comforter',
];

const BATCH_SIZE = 10;

export const MoreToExploreWidget: React.FC<MoreToExploreWidgetProps> = ({
  products,
  onQuickView,
  className = '',
  title = 'More to Explore',
  subtitle = 'Handpicked recommendations tailored to your taste.',
  eyebrow = 'Curated For You',
  viewAllLink = '/products',
  layout = 'horizontal',
  enableInfiniteScroll = false,
  categoryContext = 'all',
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isVerticalGrid = layout === 'vertical-grid';

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

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

  // ---------------------------------------------------------------------------
  // 1. DATA SOURCE & POOL CONFIGURATION (Strict Category Isolation)
  // ---------------------------------------------------------------------------
  const fullProductPool = useMemo(() => {
    const seen = new Set<string>();
    const pool: Product[] = [];

    // Prioritize explicitly passed products first if present
    if (products && products.length > 0) {
      for (const p of products) {
        if (p && p.id && !seen.has(p.id)) {
          seen.add(p.id);
          pool.push(p);
        }
      }
    }

    // Specific category context isolation
    const catSlug = (categoryContext || 'all').toLowerCase().trim();

    if (catSlug === 'men-fashion' || catSlug === 'men') {
      for (const p of mockMensFashionProducts) {
        if (p && p.id && !seen.has(p.id)) {
          seen.add(p.id);
          pool.push(p);
        }
      }
      return pool;
    }

    if (catSlug === 'women-fashion' || catSlug === 'women') {
      for (const p of mockWomensFashionProducts) {
        if (p && p.id && !seen.has(p.id)) {
          seen.add(p.id);
          pool.push(p);
        }
      }
      return pool;
    }

    // If specific top-level category (e.g. electronics, home-living, beauty, books, groceries, etc.)
    if (catSlug !== 'all') {
      const isJewelry = catSlug === 'jewelry' || catSlug === 'jewellery';
      const filtered = ALL_MOCK_PRODUCTS.filter((p) => {
        if (isJewelry) {
          return (
            p.categoryId.toLowerCase().includes('jewel') ||
            p.categoryName.toLowerCase().includes('jewel') ||
            p.subcategoryId?.toLowerCase().includes('jewel') ||
            p.tags?.some((t) => t.toLowerCase().includes('jewel'))
          );
        }
        return (
          p.categoryId.toLowerCase().includes(catSlug) ||
          p.slug.toLowerCase().includes(catSlug) ||
          p.categoryName.toLowerCase().includes(catSlug) ||
          p.subcategoryId?.toLowerCase().includes(catSlug) ||
          p.subcategoryName?.toLowerCase().includes(catSlug) ||
          p.tags?.some((t) => t.toLowerCase().includes(catSlug))
        );
      });

      for (const p of filtered) {
        if (p && p.id && !seen.has(p.id)) {
          seen.add(p.id);
          pool.push(p);
        }
      }

      return pool;
    }

    // Default 'all' pool: entire unified catalog without duplicates
    for (const p of ALL_MOCK_PRODUCTS) {
      if (p && p.id && !seen.has(p.id)) {
        seen.add(p.id);
        pool.push(p);
      }
    }
    return pool;
  }, [categoryContext, products]);

  // ---------------------------------------------------------------------------
  // 2. PROGRESSIVE LOADING STATE (Batches of exactly 10, 3.5s spinner duration)
  // ---------------------------------------------------------------------------
  const [displayedCount, setDisplayedCount] = useState<number>(BATCH_SIZE);
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const isLoadingRef = useRef<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const animationAbortRef = useRef<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const verticalSectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasVisitedTopRef = useRef<boolean>(false);
  const loadingTimeoutRef = useRef<number | null>(null);
  const activeTimersRef = useRef<number[]>([]);

  const displayedProducts = useMemo(() => {
    if (!isVerticalGrid) {
      if (products && products.length > 0) return products;
      return fullProductPool.slice(0, 10);
    }
    return fullProductPool.slice(0, displayedCount);
  }, [isVerticalGrid, products, fullProductPool, displayedCount]);

  const hasMore = isVerticalGrid && enableInfiniteScroll && displayedCount < fullProductPool.length;

  const clearAllTimers = () => {
    activeTimersRef.current.forEach((t) => clearTimeout(t));
    activeTimersRef.current = [];
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
      const timer = window.setTimeout(resolve, ms);
      activeTimersRef.current.push(timer);
    });
  };

  // Animate cards one by one from left to right, completing rows with a brief pause
  const animateBatchOneByOne = async (startIndex: number, endIndex: number) => {
    if (prefersReducedMotion) {
      setRevealedCount(endIndex);
      return;
    }

    isAnimatingRef.current = true;
    animationAbortRef.current = false;

    // Detect number of columns in row from rendered grid
    let cols = 5;
    if (gridRef.current && gridRef.current.children.length > 1) {
      const children = Array.from(gridRef.current.children) as HTMLElement[];
      const firstTop = children[0]?.offsetTop ?? 0;
      const secondRowIndex = children.findIndex((c) => c.offsetTop > firstTop + 10);
      if (secondRowIndex > 0) {
        cols = secondRowIndex;
      }
    }

    const CARD_STAGGER_MS = 180;
    const ROW_PAUSE_MS = 380;

    try {
      for (let i = startIndex; i < endIndex; i++) {
        if (animationAbortRef.current) break;

        setRevealedCount(i + 1);

        // Check if this card completes a visual row
        const positionInBatch = i - startIndex + 1;
        const isRowEnd = positionInBatch % cols === 0 && i < endIndex - 1;

        if (isRowEnd) {
          await sleep(ROW_PAUSE_MS);
        } else if (i < endIndex - 1) {
          await sleep(CARD_STAGGER_MS);
        }
      }
    } finally {
      isAnimatingRef.current = false;
      // Immediately check if sentinel is in view to show loading state effect with zero delay!
      window.setTimeout(() => {
        checkAndTriggerNextBatch();
      }, 60);
    }
  };

  const revealedCountRef = useRef<number>(0);
  useEffect(() => {
    revealedCountRef.current = revealedCount;
  }, [revealedCount]);

  const displayedCountRef = useRef<number>(displayedCount);
  useEffect(() => {
    displayedCountRef.current = displayedCount;
  }, [displayedCount]);

  const hasMoreRef = useRef<boolean>(hasMore);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  // Check if sentinel is in viewport and trigger next batch immediately
  const checkAndTriggerNextBatch = () => {
    if (isLoadingRef.current || isAnimatingRef.current || !hasMoreRef.current) return;
    if (revealedCountRef.current < displayedCountRef.current) return;

    if (sentinelRef.current) {
      const rect = sentinelRef.current.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight + 150 && rect.bottom >= -100;
      if (inView) {
        triggerNextBatch();
      }
    }
  };

  // Reset to initial 10 products and animate from 1st product
  const resetAndReplayFromFirstProduct = () => {
    animationAbortRef.current = true;
    isAnimatingRef.current = false;
    clearAllTimers();

    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setIsLoadingMore(false);
    isLoadingRef.current = false;

    setDisplayedCount(BATCH_SIZE);
    setRevealedCount(0);

    const t = window.setTimeout(() => {
      animationAbortRef.current = false;
      animateBatchOneByOne(0, BATCH_SIZE);
    }, 100);
    activeTimersRef.current.push(t);
  };

  // Trigger loading next batch of 10 products with 3.3s visible spinner
  const triggerNextBatch = () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    isLoadingRef.current = true;
    setIsLoadingMore(true);

    // 3.3 seconds loading spinner (between 3 and 4 seconds)
    loadingTimeoutRef.current = window.setTimeout(() => {
      const currentCount = displayedCountRef.current;
      const nextCount = Math.min(currentCount + BATCH_SIZE, fullProductPool.length);

      setDisplayedCount(nextCount);
      setIsLoadingMore(false);
      isLoadingRef.current = false;

      // Animate newly appended products one after another
      const t = window.setTimeout(() => {
        animateBatchOneByOne(currentCount, nextCount);
      }, 60);
      activeTimersRef.current.push(t);
    }, 3300);
  };

  // Infinite scroll sentinel observer: triggers as soon as sentinel is in view
  useEffect(() => {
    if (!isVerticalGrid || !enableInfiniteScroll || !hasMore) return;

    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          checkAndTriggerNextBatch();
        }
      },
      {
        root: null,
        rootMargin: '100px 0px 100px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(sentinelEl);

    return () => {
      observer.disconnect();
    };
  }, [isVerticalGrid, enableInfiniteScroll, hasMore]);

  // Track scroll position: detect top of page and check sentinel proximity
  useEffect(() => {
    if (!isVerticalGrid) return;

    const handleScroll = () => {
      if (window.scrollY < 200) {
        hasVisitedTopRef.current = true;
      }
      checkAndTriggerNextBatch();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVerticalGrid]);

  // Section observer to detect entry into More to Explore
  useEffect(() => {
    if (!isVerticalGrid) return;

    const sectionEl = verticalSectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (hasVisitedTopRef.current) {
            hasVisitedTopRef.current = false;
            resetAndReplayFromFirstProduct();
          } else if (revealedCountRef.current === 0 && !isAnimatingRef.current) {
            animateBatchOneByOne(0, BATCH_SIZE);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.08,
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [isVerticalGrid]);

  // Reset to initial 10 products when categoryContext changes
  const prevCategoryRef = useRef<string | undefined>(categoryContext);
  useEffect(() => {
    if (prevCategoryRef.current !== categoryContext) {
      prevCategoryRef.current = categoryContext;
      resetAndReplayFromFirstProduct();
    }
  }, [categoryContext]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      animationAbortRef.current = true;
      isAnimatingRef.current = false;
      clearAllTimers();
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Sequential scroll scale-up animation hook for horizontal carousel mode
  const {
    sectionRef,
    scrollContainerRef,
    itemRefs,
    hasEntered,
    getItemStyle,
  } = useSequentialScrollScale({
    itemCount: displayedProducts.length,
    staggerMs: 120,
    entranceDurationMs: 500,
    initialScale: 0.82,
    initialOpacity: 0,
    initialTranslateY: 0,
  });

  const handleSelectOptions = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // =========================================================================
  // OPT-IN: VERTICAL PRODUCT GRID WITH INFINITE SCROLL & STAGGERED ENTRANCE
  // (Applied strictly to Men's Fashion Page and Home (All) Page)
  // =========================================================================
  if (isVerticalGrid) {
    if (displayedProducts.length === 0) {
      return (
        <section
          aria-label="More to Explore Products"
          className={`w-full py-8 text-center ${className}`}
        >
          <div className="max-w-md mx-auto py-8 px-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
            <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2.5" />
            <h3 className="text-sm font-bold text-slate-700 font-heading">No products available</h3>
            <p className="text-xs text-slate-500 mt-1">Check back soon for new arrivals in this department.</p>
          </div>
        </section>
      );
    }

    return (
      <section
        ref={verticalSectionRef}
        aria-label="More to Explore Products Grid"
        className={`w-full py-6 sm:py-8 ${className}`}
      >
        {/* Scoped CSS for slow one-by-one staggered scroll reveal animation */}
        <style>{`
          .haatza-reveal-card {
            opacity: 0;
            transform: translateY(12px);
            transition: opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), transform 450ms cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .haatza-reveal-card.is-revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .haatza-reveal-card {
              opacity: 1 !important;
              transform: none !important;
              transition: none !important;
            }
          }
        `}</style>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            {eyebrow && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1 font-heading">
                <Compass className="w-3.5 h-3.5 text-[#2962FF]" />
                <span>{eyebrow}</span>
              </div>
            )}
            <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <Link
            to={viewAllLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors font-heading shrink-0 pb-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Vertical Grid:
            - Exactly matches horizontal card spacing of Deals of the Day (gap-3.5 sm:gap-4 md:gap-[18px])
            - Fits as many cards as reasonably fit the container width (repeat(auto-fill, minmax(185px, 1fr)))
            - Mobile: 2 columns (grid-cols-2)
            - Tablet & Desktop: auto-fill responsive columns
            - Cards fill column width without excessive empty margins */}
        <div
          ref={gridRef}
          aria-label="More to Explore vertical product grid"
          className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-3.5 sm:gap-4 md:gap-[18px]"
        >
          {displayedProducts.map((product, index) => {
            const isRevealed = prefersReducedMotion || index < revealedCount;

            return (
              <div
                key={product.id}
                data-product-id={product.id}
                data-product-index={index}
                className={`haatza-reveal-card w-full ${isRevealed ? 'is-revealed' : ''}`}
              >
                <DealProductCard product={product} className="w-full max-w-none" />
              </div>
            );
          })}
        </div>

        {/* Sentinel element and visible loading indicator */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="w-full flex flex-col items-center justify-center py-8 sm:py-10 mt-3 min-h-[110px]"
          >
            {isLoadingMore ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center gap-3 text-slate-700"
              >
                <div className="w-8 h-8 border-3 border-[#2962FF] border-t-transparent rounded-full animate-spin shadow-xs" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700 font-heading">
                  Loading more products...
                </span>
              </div>
            ) : (
              <div className="w-full h-4" />
            )}
          </div>
        )}

        {/* All products reached message */}
        {!hasMore && displayedProducts.length >= 10 && (
          <div className="w-full pt-8 pb-4 text-center">
            <p className="text-xs font-semibold text-slate-400 font-heading tracking-wide">
              You've reached the end of More to Explore ({displayedProducts.length} products).
            </p>
          </div>
        )}
      </section>
    );
  }

  // =========================================================================
  // DEFAULT: HORIZONTAL SCROLLING ROW (Preserved for all other pages)
  // =========================================================================
  return (
    <section
      ref={sectionRef}
      aria-label="More to Explore Products"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      <style>{`
        .haatza-hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .haatza-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* 01. SECTION HEADER */}
      <div
        style={{
          opacity: hasEntered || prefersReducedMotion ? 1 : 0.6,
          transform: hasEntered || prefersReducedMotion ? 'translateY(0)' : 'translateY(10px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6"
      >
        <div>
          {eyebrow && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1 font-heading">
              <Compass className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          to={viewAllLink}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors font-heading shrink-0 pb-1"
        >
          <span>Explore All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 02. HORIZONTAL SCROLL TRACK */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="More to Explore horizontal product row"
        className="haatza-hide-scrollbar flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 md:gap-[18px] overflow-x-auto overflow-y-hidden py-3 px-1 focus:outline-hidden"
      >
        {displayedProducts.map((product, index) => {
          const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });
          const isFavorited = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0 flex flex-col"
            >
              <div
                style={getItemStyle(index)}
                className="origin-center flex flex-col justify-between w-full h-full text-center will-change-transform group cursor-pointer"
              >
                {/* 1. Proportional Square Image Box */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-colors group-hover:bg-slate-200/80">
                  <Link to={`/product/${product.slug}`} className="block w-full h-full">
                    <img
                      src={optimizedImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center select-none transition-transform duration-350 ease-out group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* Wishlist Heart Toggle */}
                  <button
                    type="button"
                    onClick={(e) => handleWishlistToggle(e, product)}
                    className={`absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-10 ${
                      isFavorited
                        ? 'bg-[#2962FF] text-white shadow-xs'
                        : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
                    }`}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* 2. Structured Content Wrapper */}
                <div className="flex flex-col flex-1 justify-between w-full">
                  {/* Product Name */}
                  <div className="h-8.5 sm:h-9 flex items-center justify-center">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-xs sm:text-[13px] font-bold text-[#172033] hover:text-[#2962FF] line-clamp-2 leading-snug transition-colors px-1 font-heading text-center"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Product Price & Optional MRP */}
                  <div className="h-5.5 sm:h-6 flex items-baseline justify-center gap-1.5 mt-0.5 font-sans shrink-0">
                    <span className="text-xs sm:text-[15px] font-black text-slate-950 font-heading">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Unified Button: "Add to Cart" pinned at bottom */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full mt-2 h-8 sm:h-8.5 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer select-none active:scale-95 bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-2xs hover:shadow-xs shrink-0"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MoreToExploreWidget;
