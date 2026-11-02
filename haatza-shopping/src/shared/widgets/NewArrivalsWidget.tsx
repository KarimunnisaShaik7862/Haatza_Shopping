import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { DealProductCard } from '../../components/products/DealProductCard';
import { ProductCarouselWidget } from './ProductCarouselWidget';
import { SectionHeading } from '../../components/common/SectionHeading';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { SectionHighlightArtwork } from '../../components/common/SectionHighlightArtwork';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export interface NewArrivalsWidgetProps {
  products?: Product[];
  categoryContext?: string;
  limit?: number;
  onQuickView?: (product: Product) => void;
  title?: string;
  subtitle?: string;
  className?: string;
  layout?: 'carousel' | 'grid';
}

export const NewArrivalsWidget: React.FC<NewArrivalsWidgetProps> = ({
  products: initialProducts,
  categoryContext,
  limit = 8,
  onQuickView,
  title = 'Fresh New Arrivals',
  subtitle,
  className = '',
  layout = 'carousel',
}) => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState<boolean>(!initialProducts);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchNewArrivals() {
      try {
        setLoading(true);
        if (categoryContext && categoryContext !== 'all') {
          const catProducts = await productService.getProducts({ category: categoryContext }, 'haatza');
          let filtered = catProducts.filter((p) => p.isNewArrival || (p.discountPercentage && p.discountPercentage >= 20));
          if (filtered.length < 4) {
            filtered = [...catProducts].reverse();
          }
          if (isMounted) {
            setProducts(filtered.slice(0, limit));
          }
        } else {
          const data = await productService.getNewArrivals('haatza', limit);
          if (isMounted) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error('Failed to load New Arrivals:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchNewArrivals();
    return () => {
      isMounted = false;
    };
  }, [initialProducts, categoryContext, limit]);

  if (loading) {
    return (
      <div className={`space-y-4 py-6 ${className}`}>
        <LoadingSkeleton type="grid" count={4} />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      aria-label="New Arrival Products"
      className={`relative w-full py-3 sm:py-4.5 ${className}`}
    >
      {/* Background Artwork: Fresh Ripple Arcs & Soft Blue Ambient Glow */}
      <SectionHighlightArtwork variant="new-arrivals" isVisible={isVisible} />

      {/* Section Header: Pure Blue-and-White Theme with Coordinated Reveal */}
      <div className={`flex flex-row items-center sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 ${
        isVisible ? 'haatza-section-reveal-visible' : 'haatza-section-reveal-hidden'
      }`}>
        <SectionHeading
          title={title}
        />

        <div className="shrink-0 flex items-center gap-2">
          <Link
            to="/products?filter=new-arrivals"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors font-heading shrink-0 pb-1"
          >
            <span>Explore All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Product Display: Standardized Card Dimensions with .hc-lift and Pre-rendered Shadow */}
      <div className={isVisible ? 'haatza-products-reveal-visible' : 'haatza-section-reveal-hidden'}>
        {layout === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-[18px] justify-items-center">
            {products.map((product) => (
              <div key={product.id} className="w-full flex justify-center">
                <DealProductCard
                  product={product}
                  className="w-full max-w-[184px]"
                  enableLiftShadow={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <ProductCarouselWidget scrollDistance={280}>
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[124px] xs:w-[130px] sm:w-[160px] md:w-[172px] lg:w-[184px] shrink-0 flex flex-col"
              >
                <DealProductCard
                  product={product}
                  className="w-full"
                  enableLiftShadow={true}
                />
              </div>
            ))}
          </ProductCarouselWidget>
        )}
      </div>
    </section>
  );
};

export default NewArrivalsWidget;
