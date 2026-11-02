import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ShoppingBag, Heart, ArrowRight, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ALL_MOCK_PRODUCTS } from '../../services/productService';
import { mockMensFashionProducts } from '../../data/mensFashionProducts.data';
import { mockWomensFashionProducts } from '../../data/womensFashionProducts.data';
import { DealProductCard } from '../../components/products/DealProductCard';
import { SectionHeading } from '../../components/common/SectionHeading';

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
   * - 'horizontal': Horizontal scroll track
   * - 'vertical-grid': Responsive multi-row grid with infinite batch scroll (Home & Categories)
   */
  layout?: 'horizontal' | 'vertical-grid';
  /**
   * When true, automatically loads the next batch as user approaches bottom.
   */
  enableInfiniteScroll?: boolean;
  /**
   * Category slug filter or 'all'
   */
  categoryContext?: string;
}

const FEED_CACHE_PREFIX = 'haatza_more_to_explore_count_';
const SCROLL_POS_KEY = 'haatza_more_to_explore_scroll';

// In-memory feed cache to survive client component unmount/remount in single-page navigation
const memoryFeedCache = new Map<string, number>();

const getSavedCount = (context: string, defaultCount: number): number => {
  if (typeof window === 'undefined') return defaultCount;
  try {
    const mem = memoryFeedCache.get(context);
    if (typeof mem === 'number' && mem >= defaultCount) return mem;

    const stored = sessionStorage.getItem(`${FEED_CACHE_PREFIX}${context}`);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= defaultCount) {
        memoryFeedCache.set(context, parsed);
        return parsed;
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
  return defaultCount;
};

const setSavedCount = (context: string, count: number) => {
  memoryFeedCache.set(context, count);
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`${FEED_CACHE_PREFIX}${context}`, count.toString());
    } catch (e) {
      // Ignore storage errors
    }
  }
};

export const MoreToExploreWidget: React.FC<MoreToExploreWidgetProps> = ({
  products,
  onQuickView,
  className = '',
  title = 'More to Explore',
  subtitle,
  eyebrow,
  viewAllLink = '/products',
  layout = 'horizontal',
  enableInfiniteScroll = false,
  categoryContext = 'all',
}) => {
  const isVerticalGrid = layout === 'vertical-grid';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Responsive column detection (Desktop: 6 columns)
  const [currentColumns, setCurrentColumns] = useState<number>(() => {
    if (typeof window === 'undefined') return 6;
    const w = window.innerWidth;
    if (w >= 1280) return 6;
    if (w >= 1024) return 5;
    if (w >= 768) return 4;
    if (w >= 640) return 3;
    return 2;
  });

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      let cols = 6;
      if (w >= 1280) cols = 6;
      else if (w >= 1024) cols = 5;
      else if (w >= 768) cols = 4;
      else if (w >= 640) cols = 3;
      else cols = 2;
      setCurrentColumns(cols);
    };

    window.addEventListener('resize', updateColumns, { passive: true });
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Two rows per batch (Desktop: 6 cols * 2 rows = 12 items initially and per batch)
  const twoRowsBatchSize = currentColumns * 2;

  // ---------------------------------------------------------------------------
  // 1. DATA SOURCE & CATALOG POOL (Deduplicated with category isolation)
  // ---------------------------------------------------------------------------
  const fullProductPool = useMemo(() => {
    const seen = new Set<string>();
    const pool: Product[] = [];

    // Prioritize explicitly passed products
    if (products && products.length > 0) {
      for (const p of products) {
        if (p && p.id && !seen.has(p.id)) {
          seen.add(p.id);
          pool.push(p);
        }
      }
    }

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

    // Default 'all' catalog: complete unified products
    for (const p of ALL_MOCK_PRODUCTS) {
      if (p && p.id && !seen.has(p.id)) {
        seen.add(p.id);
        pool.push(p);
      }
    }
    return pool;
  }, [categoryContext, products]);

  // ---------------------------------------------------------------------------
  // 2. PROGRESSIVE TWO-ROW BATCH LOADING WITH BROWSING STATE PRESERVATION
  // ---------------------------------------------------------------------------
  const [displayedCount, setDisplayedCount] = useState<number>(() => {
    // 2 complete rows initially (12 items on desktop) or restored from previous session
    const defaultBatch = (typeof window !== 'undefined' && window.innerWidth < 1280)
      ? (window.innerWidth >= 1024 ? 10 : window.innerWidth >= 768 ? 8 : window.innerWidth >= 640 ? 6 : 4)
      : 12;
    return getSavedCount(categoryContext, defaultBatch);
  });

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const isLoadingRef = useRef<boolean>(false);
  const loadTimerRef = useRef<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Restore scroll position if returning from product detail page via browser Back button
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedScroll = sessionStorage.getItem(SCROLL_POS_KEY);
      if (savedScroll) {
        const targetY = parseInt(savedScroll, 10);
        if (!isNaN(targetY) && targetY > 0) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              window.scrollTo({ top: targetY, behavior: 'instant' });
              sessionStorage.removeItem(SCROLL_POS_KEY);
            });
          });
        }
      }
    } catch (err) {
      // ignore
    }
  }, []);

  // Save state on click within grid so Back button will preserve count and scroll position
  const handleGridClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      try {
        sessionStorage.setItem(SCROLL_POS_KEY, window.scrollY.toString());
        setSavedCount(categoryContext, displayedCount);
      } catch (err) {
        // ignore
      }
    }
  }, [categoryContext, displayedCount]);

  // Cleanup pending timer on unmount
  useEffect(() => {
    return () => {
      if (loadTimerRef.current) {
        window.clearTimeout(loadTimerRef.current);
      }
    };
  }, []);

  // Track previous category to ONLY reset if the categoryContext genuinely changes
  const prevCategoryRef = useRef<string>(categoryContext);
  useEffect(() => {
    if (prevCategoryRef.current !== categoryContext) {
      prevCategoryRef.current = categoryContext;
      const baseBatch = currentColumns * 2;
      const saved = getSavedCount(categoryContext, baseBatch);
      setDisplayedCount(saved);
      setIsLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [categoryContext, currentColumns]);

  const displayedProducts = useMemo(() => {
    if (!isVerticalGrid) {
      if (products && products.length > 0) return products;
      return fullProductPool.slice(0, 10);
    }
    return fullProductPool.slice(0, displayedCount);
  }, [isVerticalGrid, products, fullProductPool, displayedCount]);

  const hasMore = isVerticalGrid && enableInfiniteScroll && displayedCount < fullProductPool.length;

  const loadNextBatch = useCallback(() => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;
    setIsLoadingMore(true);

    if (loadTimerRef.current) {
      window.clearTimeout(loadTimerRef.current);
    }

    // High performance progressive loading transition: 360ms realistic network response
    loadTimerRef.current = window.setTimeout(() => {
      setDisplayedCount((prev) => {
        const nextCount = Math.min(prev + twoRowsBatchSize, fullProductPool.length);
        setSavedCount(categoryContext, nextCount);
        return nextCount;
      });
      setIsLoadingMore(false);
      isLoadingRef.current = false;
      loadTimerRef.current = null;
    }, 360);
  }, [hasMore, twoRowsBatchSize, fullProductPool.length, categoryContext]);

  // IntersectionObserver for bottom sentinel
  useEffect(() => {
    if (!isVerticalGrid || !enableInfiniteScroll || !hasMore) return;

    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingRef.current && !isLoadingMore) {
          loadNextBatch();
        }
      },
      {
        rootMargin: '180px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, [isVerticalGrid, enableInfiniteScroll, hasMore, isLoadingMore, loadNextBatch]);

  // =========================================================================
  // VIEW: VERTICAL GRID (Rows appear together in clean alignment)
  // =========================================================================
  if (isVerticalGrid) {
    if (!displayedProducts || displayedProducts.length === 0) {
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
        aria-label="More to Explore Products Grid"
        className={`w-full py-3 sm:py-4.5 ${className}`}
      >
        {/* Subtle row-level entrance keyframes */}
        <style>{`
          @keyframes haatzaRowFadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .haatza-row-item {
            animation: haatzaRowFadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1) both;
          }
          @media (prefers-reduced-motion: reduce) {
            .haatza-row-item {
              animation: none !important;
            }
          }
        `}</style>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6">
          <SectionHeading
            title={title}
          />

          <Link
            to={viewAllLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors font-heading shrink-0 pb-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Multi-Row Grid:
            Desktop displays exactly 6 product cards per row, uniformly aligned with reduced horizontal gap */}
        <div
          aria-label="More to Explore vertical product grid"
          onClick={handleGridClick}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2.5 sm:gap-x-3 lg:gap-x-3.5 xl:gap-x-3 gap-y-4 sm:gap-y-5 md:gap-y-6 justify-items-center"
        >
          {displayedProducts.map((product, idx) => {
            // Subtle stagger between Row 1 and Row 2 of each 2-row batch
            const rowInBatch = Math.floor(idx / currentColumns) % 2;
            const animDelay = rowInBatch === 1 ? '50ms' : '0ms';

            return (
              <div
                key={product.id}
                style={{ animationDelay: animDelay }}
                className="haatza-row-item w-full flex justify-center"
              >
                <DealProductCard product={product} className="w-full max-w-[184px]" />
              </div>
            );
          })}
        </div>

        {/* Progressive Two-Row Loading Sentinel and Minimalist Theme Spinner */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="w-full flex flex-col items-center justify-center py-6 sm:py-8 mt-2 min-h-[64px]"
          >
            {isLoadingMore ? (
              <div
                role="status"
                aria-live="polite"
                className="inline-flex items-center justify-center gap-2.5 py-2 px-4 rounded-full bg-white border border-slate-200/90 shadow-2xs text-slate-700 animate-in fade-in duration-200"
              >
                <div className="w-4 h-4 border-2 border-[#2962FF] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold tracking-wide text-slate-600 font-heading">
                  Loading more discoveries...
                </span>
              </div>
            ) : (
              <div className="w-full h-4" />
            )}
          </div>
        )}

        {/* End of results indication */}
        {!hasMore && displayedProducts.length >= 6 && (
          <div className="w-full pt-6 pb-2 text-center select-none">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-slate-50 border border-slate-200/60 text-slate-400">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium font-heading">
                You've explored all {displayedProducts.length} curated products
              </span>
            </div>
          </div>
        )}
      </section>
    );
  }

  // =========================================================================
  // VIEW: HORIZONTAL SCROLL TRACK (Preserved for carousel usage)
  // =========================================================================
  return (
    <section
      aria-label="More to Explore Products"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <SectionHeading
          title={title}
          highlightWords={['More', 'Explore']}
          accentEffect="subtle-underline"
        />

        <Link
          to={viewAllLink}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors font-heading shrink-0 pb-1"
        >
          <span>Explore All</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Horizontal Carousel Track with Standardized Product Cards */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="More to Explore horizontal product row"
        className="haatza-hide-scrollbar flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 md:gap-[18px] overflow-x-auto overflow-y-hidden py-3 px-1 focus:outline-hidden"
      >
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0 flex flex-col"
          >
            <DealProductCard product={product} className="w-full" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreToExploreWidget;
