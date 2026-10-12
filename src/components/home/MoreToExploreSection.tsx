import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, Loader2, CheckCircle2, ArrowDown } from 'lucide-react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { ProductCard } from '../products/ProductCard';

interface MoreToExploreSectionProps {
  onQuickView?: (product: Product) => void;
  excludeIds?: string[];
}

const BATCH_SIZE = 8;

export const MoreToExploreSection: React.FC<MoreToExploreSectionProps> = React.memo(({
  onQuickView,
  excludeIds,
}) => {
  const [allAvailable, setAllAvailable] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Use a stringified primitive key so new array references don't re-trigger catalog fetches
  const excludeKey = (excludeIds || []).join(',');

  useEffect(() => {
    let isMounted = true;

    async function initCatalog() {
      try {
        const fullCatalog = await productService.getAllProducts();
        if (!isMounted) return;

        const excludedSet = new Set(excludeKey ? excludeKey.split(',') : []);
        const filtered = fullCatalog.filter((p) => !excludedSet.has(p.id));
        const unique = Array.from(new Map(filtered.map((item) => [item.id, item])).values());

        if (isMounted) {
          setAllAvailable(unique);
          setDisplayedProducts(unique.slice(0, BATCH_SIZE));
          setHasMore(unique.length > BATCH_SIZE);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load explore catalog:', err);
        }
      }
    }

    initCatalog();

    return () => {
      isMounted = false;
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [excludeKey]);

  const loadNextBatch = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);

    loadTimeoutRef.current = setTimeout(() => {
      setDisplayedProducts((prev) => {
        const currentLength = prev.length;
        const nextBatch = allAvailable.slice(currentLength, currentLength + BATCH_SIZE);
        if (currentLength + nextBatch.length >= allAvailable.length) {
          setHasMore(false);
        }
        return [...prev, ...nextBatch];
      });
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, hasMore, allAvailable]);

  if (displayedProducts.length === 0) return null;

  return (
    <section className="space-y-6" aria-label="More to Explore">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A60000] to-[#D99A9A] text-white flex items-center justify-center shadow-md">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                More to Explore
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#F5DCDC] text-[#A60000] text-[10px] font-black uppercase tracking-wider font-heading">
                Endless Discovery
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-body">
              Endless exploration awaits. Discover diverse handpicked curations across fashion, tech & home.
            </p>
          </div>
        </div>
      </div>

      {/* Open Product Grid (4 columns on desktop, 2 on mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>

      {/* Progressive Load Trigger / End of Collection State */}
      <div className="pt-4 flex flex-col items-center justify-center">
        {hasMore ? (
          <button
            type="button"
            onClick={loadNextBatch}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200/90 font-black text-xs sm:text-sm transition-all duration-200 shadow-sm hover:border-[#D99A9A] active:scale-95 group disabled:opacity-50"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="w-4 h-4 text-[#A60000] animate-spin" />
                <span>Loading more treasures...</span>
              </>
            ) : (
              <>
                <span>Load More Products</span>
                <ArrowDown className="w-4 h-4 text-[#A60000] group-hover:translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        ) : (
          <div className="flex flex-col items-center text-center p-6 bg-zinc-50 rounded-2xl border border-zinc-200/60 max-w-md mx-auto space-y-1.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <p className="text-sm font-bold text-zinc-900">
              You've explored all available products!
            </p>
            <p className="text-xs text-zinc-500">
              Our catalog is updated daily with fresh artisan drops and deals. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

MoreToExploreSection.displayName = 'MoreToExploreSection';
