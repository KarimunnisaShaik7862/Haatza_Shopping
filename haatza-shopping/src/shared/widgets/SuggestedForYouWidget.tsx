import React, { useMemo } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ALL_MOCK_PRODUCTS } from '../../services/productService';
import { DealProductCard } from '../../components/products/DealProductCard';
import { ProductCarouselWidget } from './ProductCarouselWidget';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SectionHighlightArtwork } from '../../components/common/SectionHighlightArtwork';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export interface SuggestedForYouWidgetProps {
  products?: Product[];
  categoryContext?: string;
  excludeProductId?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  layout?: 'carousel' | 'grid';
  onQuickView?: (product: Product) => void;
}

export const SuggestedForYouWidget: React.FC<SuggestedForYouWidgetProps> = ({
  products: overrideProducts,
  categoryContext,
  excludeProductId,
  title = 'Suggested for You',
  subtitle,
  className = '',
  layout = 'carousel',
  onQuickView,
}) => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });

  // Curate tailored product list
  const suggestedProducts = useMemo(() => {
    if (overrideProducts && overrideProducts.length > 0) {
      return overrideProducts.filter((p) => p.id !== excludeProductId);
    }

    let pool = ALL_MOCK_PRODUCTS.filter((p) => p.id !== excludeProductId);

    if (categoryContext && categoryContext !== 'all') {
      const lower = categoryContext.toLowerCase();
      const matched = pool.filter(
        (p) =>
          p.categoryId?.toLowerCase().includes(lower) ||
          p.subcategoryId?.toLowerCase().includes(lower) ||
          p.tags?.some((t) => t.toLowerCase().includes(lower))
      );
      pool = matched;
    }

    // Sort by rating & discount percentage to surface high-appeal suggestions
    return pool
      .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0) || b.rating - a.rating)
      .slice(0, 10);
  }, [overrideProducts, categoryContext, excludeProductId]);

  if (!suggestedProducts || suggestedProducts.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Suggested for You"
      className={`relative w-full py-3 sm:py-4.5 ${className}`}
    >
      {/* Background Artwork: Personalized Orbital Curves & Faint Ambient Orb */}
      <SectionHighlightArtwork variant="suggested" isVisible={isVisible} />

      {/* Section Header: Pure Blue-and-White Theme with Coordinated Reveal */}
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
            {suggestedProducts.map((product) => (
              <div key={product.id} className="w-full flex justify-center">
                <DealProductCard product={product} className="w-full max-w-[184px]" />
              </div>
            ))}
          </div>
        ) : (
          <ProductCarouselWidget scrollDistance={280}>
            {suggestedProducts.map((product) => (
              <div
                key={product.id}
                className="w-[124px] xs:w-[130px] sm:w-[160px] md:w-[172px] lg:w-[184px] shrink-0 flex flex-col"
              >
                <DealProductCard product={product} className="w-full" />
              </div>
            ))}
          </ProductCarouselWidget>
        )}
      </div>
    </section>
  );
};

export default SuggestedForYouWidget;
