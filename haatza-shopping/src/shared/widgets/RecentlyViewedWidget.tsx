import React, { useMemo } from 'react';
import { History, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { ALL_MOCK_PRODUCTS } from '../../services/productService';
import { DealProductCard } from '../../components/products/DealProductCard';
import { ProductCarouselWidget } from './ProductCarouselWidget';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SectionHighlightArtwork } from '../../components/common/SectionHighlightArtwork';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export interface RecentlyViewedWidgetProps {
  products?: Product[];
  categoryContext?: string;
  title?: string;
  subtitle?: string;
  onQuickView?: (product: Product) => void;
  className?: string;
  layout?: 'carousel' | 'grid';
}

export const RecentlyViewedWidget: React.FC<RecentlyViewedWidgetProps> = ({
  products: overrideProducts,
  categoryContext,
  title = 'Recently Viewed by You',
  subtitle,
  onQuickView,
  className = '',
  layout = 'carousel',
}) => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });
  const { recentlyViewed } = useRecentlyViewed();

  // Smart fallback to ensure this critical discovery section is always populated
  const displayProducts = useMemo(() => {
    if (overrideProducts && overrideProducts.length > 0) {
      return overrideProducts;
    }
    if (recentlyViewed && recentlyViewed.length > 0) {
      return recentlyViewed;
    }

    // Fallback: high-appeal catalog items matching category context
    const filtered = categoryContext && categoryContext !== 'all'
      ? ALL_MOCK_PRODUCTS.filter(
          (p) =>
            p.categoryId?.toLowerCase() === categoryContext.toLowerCase() ||
            p.subcategoryId?.toLowerCase() === categoryContext.toLowerCase() ||
            p.tags?.some((t) => t.toLowerCase().includes(categoryContext.toLowerCase()))
        )
      : ALL_MOCK_PRODUCTS;

    return filtered.slice(0, 10);
  }, [overrideProducts, recentlyViewed, categoryContext]);

  const isFallback = !overrideProducts?.length && (!recentlyViewed || recentlyViewed.length === 0);

  if (!displayProducts || displayProducts.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Recently Viewed Products"
      className={`relative w-full py-3 sm:py-4.5 ${className}`}
    >
      {/* Background Artwork: Minimalist Gradient Strip & Subtle History Arc */}
      <SectionHighlightArtwork variant="recently-viewed" isVisible={isVisible} />

      {/* Header: Pure Blue-and-White Theme with Coordinated Reveal */}
      <div className={`flex flex-row items-center sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 ${
        isVisible ? 'haatza-section-reveal-visible' : 'haatza-section-reveal-hidden'
      }`}>
        <SectionHeading
          title={title}
        />

        <div className="shrink-0 flex items-center gap-2">
          <Link
            to="/products?filter=trending"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors font-heading shrink-0 pb-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Product Display: Standardized Card Dimensions with Coordinated Reveal */}
      <div className={isVisible ? 'haatza-products-reveal-visible' : 'haatza-section-reveal-hidden'}>
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-[18px] justify-items-center">
            {displayProducts.map((product) => (
              <div key={product.id} className="w-full flex justify-center">
                <DealProductCard
                  product={product}
                  className="w-full max-w-[184px]"
                  enableElevationShadow={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <ProductCarouselWidget scrollDistance={280}>
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="w-[124px] xs:w-[130px] sm:w-[160px] md:w-[172px] lg:w-[184px] shrink-0 flex flex-col"
              >
                <DealProductCard
                  product={product}
                  className="w-full"
                  enableElevationShadow={true}
                />
              </div>
            ))}
          </ProductCarouselWidget>
        )}
      </div>
    </section>
  );
};

export default RecentlyViewedWidget;
