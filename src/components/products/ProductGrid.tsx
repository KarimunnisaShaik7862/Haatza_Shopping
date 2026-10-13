import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { EmptyState } from '../common/EmptyState';
import { ChevronDown, Sparkles } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  initialBatchSize?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = React.memo(({
  products,
  columns = 4,
  className = '',
  emptyTitle = 'No Products Found',
  emptyDescription = 'Try adjusting your filters or search keywords.',
  initialBatchSize = 16,
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(initialBatchSize);

  // Reset pagination when products collection or filters change
  useEffect(() => {
    setVisibleCount(initialBatchSize);
  }, [products, initialBatchSize]);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + initialBatchSize);
  }, [initialBatchSize]);

  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="space-y-6">
      <div className={`grid ${columnClasses[columns]} gap-4 sm:gap-6 ${className}`}>
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={handleQuickView}
          />
        ))}
      </div>

      {/* Incremental Load More Trigger */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-4 pb-2 gap-2">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#F5F7FF] text-[#172033] border border-[#E5EAF3] font-bold text-xs sm:text-sm transition-all duration-200 shadow-2xs hover:border-[#DBEAFE] hover:text-[#2962FF] active:scale-95 group cursor-pointer"
          >
            <span>Load More Products</span>
            <ChevronDown className="w-4 h-4 text-[#2962FF] group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="text-[11px] text-zinc-500 font-medium">
            Showing {displayedProducts.length} of {products.length} products
          </span>
        </div>
      )}

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';
