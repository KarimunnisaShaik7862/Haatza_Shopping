import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, HeartHandshake, History, TrendingUp } from 'lucide-react';
import { Product } from '../../types';
import { DealProductCard } from '../../components/products/DealProductCard';
import { MoreToExploreWidget } from '../../components/home/widgets/MoreToExploreWidget';

export interface ProductRecommendationsProps {
  currentProduct: Product;
  similarProducts?: Product[];
  customersAlsoLike?: Product[];
  recentlyViewedProducts?: Product[];
  topCategoryProducts?: Product[];
  filter?: 'all' | 'similar-only' | 'other-only';
}

interface RecommendationRowProps {
  title: string;
  subtitle: string;
  products: Product[];
  icon?: React.ReactNode;
}

const RecommendationRow: React.FC<RecommendationRowProps> = ({
  title,
  subtitle,
  products,
  icon,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-4 space-y-3.5">
      {/* Header with Navigation Controls */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-heading">
            {title}
          </h3>
          <p className="text-xs text-slate-500 font-body">
            {subtitle}
          </p>
        </div>

        {products.length > 3 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll left"
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll right"
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Horizontal Scroll Track matching Men's Deal of the Day dimensions and spacing */}
      <div
        ref={rowRef}
        className="flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 md:gap-[18px] overflow-x-auto no-scrollbar py-2 px-0.5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0"
          >
            <DealProductCard product={product} showRating={true} />
          </div>
        ))}
      </div>
    </section>
  );
};

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  similarProducts = [],
  customersAlsoLike = [],
  recentlyViewedProducts = [],
  topCategoryProducts = [],
  filter = 'all',
}) => {
  const showSimilar = filter === 'all' || filter === 'similar-only';
  const showOthers = filter === 'all' || filter === 'other-only';

  return (
    <div className={`w-full ${filter === 'similar-only' ? 'pt-2 pb-2' : 'space-y-8 pt-6'}`}>
      {/* 1. Similar Products */}
      {showSimilar && similarProducts.length > 0 && (
        <RecommendationRow
          title="Similar Products"
          subtitle={`Handpicked selections matching ${currentProduct.subcategoryName || currentProduct.categoryName}`}
          products={similarProducts}
          icon={<Sparkles className="w-3.5 h-3.5" />}
        />
      )}

      {/* 2. Customers Also Like */}
      {showOthers && customersAlsoLike.length > 0 && (
        <RecommendationRow
          title="Customers Also Like"
          subtitle="Frequently viewed and bought together by shoppers"
          products={customersAlsoLike}
          icon={<HeartHandshake className="w-3.5 h-3.5" />}
        />
      )}

      {/* 3. Recently Viewed by You */}
      {showOthers && recentlyViewedProducts.length > 0 && (
        <RecommendationRow
          title="Recently Viewed by You"
          subtitle="Items you explored during your recent browsing session"
          products={recentlyViewedProducts}
          icon={<History className="w-3.5 h-3.5" />}
        />
      )}

      {/* 4. Top Category Products */}
      {showOthers && topCategoryProducts.length > 0 && (
        <RecommendationRow
          title={`Top Products in ${currentProduct.categoryName}`}
          subtitle="Highest-rated and bestselling picks from this department"
          products={topCategoryProducts}
          icon={<TrendingUp className="w-3.5 h-3.5" />}
        />
      )}

      {/* 5. More to Explore */}
      {showOthers && (
        <div className="pt-4 border-t border-slate-100">
          <MoreToExploreWidget
            categoryContext={currentProduct.categoryId}
            layout="vertical-grid"
            title="More to Explore"
            eyebrow=""
            subtitle="Discover curated picks across categories tailored to your style"
          />
        </div>
      )}
    </div>
  );
};
