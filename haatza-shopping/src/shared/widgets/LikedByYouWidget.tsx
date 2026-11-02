import React, { useMemo } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { ALL_MOCK_PRODUCTS } from '../../services/productService';
import { DealProductCard } from '../../components/products/DealProductCard';
import { ProductCarouselWidget } from './ProductCarouselWidget';
import { SectionHeading } from '../../components/common/SectionHeading';
import { SectionHighlightArtwork } from '../../components/common/SectionHighlightArtwork';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export interface LikedByYouWidgetProps {
  onQuickView?: (product: Product) => void;
  title?: string;
  subtitle?: string;
  className?: string;
  layout?: 'carousel' | 'grid';
  categoryContext?: string;
}

/**
 * LikedByYouWidget
 * Displays the user's liked and saved products.
 * Synchronized live with WishlistContext.
 * In current existing-user preview mode (prior to full auth API integration),
 * displays active wishlist products, or popular favorites if wishlist is currently empty,
 * ensuring the existing-user shopping experience is visible and interactive.
 */
export const LikedByYouWidget: React.FC<LikedByYouWidgetProps> = ({
  onQuickView,
  title = 'Liked by You',
  subtitle,
  className = '',
  layout = 'carousel',
  categoryContext,
}) => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });
  const { isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();

  // Extract products from live wishlist context
  const activeLikedProducts: Product[] = useMemo(() => {
    if (wishlist && wishlist.length > 0) {
      return wishlist
        .map((item) => item?.product)
        .filter((prod): prod is Product => Boolean(prod && prod.id));
    }
    return [];
  }, [wishlist]);

  // If user has saved products, show them first and pad up to 10 with popular catalog favorites
  // so the carousel card count, track width, and spacing always match Suggested for You.
  const displayProducts = useMemo(() => {
    let pool = ALL_MOCK_PRODUCTS.filter((p) => p.isTrending || p.isBestseller);
    if (categoryContext && categoryContext !== 'all') {
      const catFiltered = pool.filter(
        (p) =>
          p.categoryId?.toLowerCase().includes(categoryContext.toLowerCase()) ||
          p.tags?.some((t) => t.toLowerCase().includes(categoryContext.toLowerCase()))
      );
      if (catFiltered.length >= 4) pool = catFiltered;
    }

    if (activeLikedProducts.length > 0) {
      let filteredLiked = activeLikedProducts;
      if (categoryContext && categoryContext !== 'all') {
        const catFiltered = activeLikedProducts.filter(
          (p) =>
            p.categoryId?.toLowerCase().includes(categoryContext.toLowerCase()) ||
            p.tags?.some((t) => t.toLowerCase().includes(categoryContext.toLowerCase()))
        );
        if (catFiltered.length > 0) filteredLiked = catFiltered;
      }
      const likedIds = new Set(filteredLiked.map((p) => p.id));
      const remainingFavorites = pool.filter((p) => !likedIds.has(p.id));
      return [...filteredLiked, ...remainingFavorites].slice(0, 10);
    }

    return pool.slice(0, 10);
  }, [activeLikedProducts, categoryContext]);

  const hasRealWishlist = activeLikedProducts.length > 0;

  return (
    <section
      ref={sectionRef}
      aria-label="Liked by You"
      className={`relative w-full py-3 sm:py-4.5 ${className}`}
    >
      {/* Background Artwork: Subtle Heart Contour Art & Soft Radiant Warmth */}
      <SectionHighlightArtwork variant="liked" isVisible={isVisible} />

      {/* Section Header: Pure Blue-and-White Theme with Coordinated Reveal */}
      <div className={`flex flex-row items-center sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6 ${
        isVisible ? 'haatza-section-reveal-visible' : 'haatza-section-reveal-hidden'
      }`}>
        <SectionHeading
          title={title}
        />

        <div className="shrink-0 flex items-center gap-2">
          <Link
            to="/wishlist"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors font-heading shrink-0 pb-1"
          >
            <span>View All Wishlist ({hasRealWishlist ? activeLikedProducts.length : displayProducts.length})</span>
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
                  enableCardShimmer={true}
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
                  enableCardShimmer={true}
                />
              </div>
            ))}
          </ProductCarouselWidget>
        )}
      </div>
    </section>
  );
};

export default LikedByYouWidget;
