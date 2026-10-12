import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ChevronRight } from 'lucide-react';
import { useActivity } from '../../context/ActivityContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { recommendationService } from '../../services/recommendationService';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';
import { Product } from '../../types';

interface PerfectPicksSectionProps {
  onQuickView?: (product: Product) => void;
}

export const PerfectPicksSection: React.FC<PerfectPicksSectionProps> = React.memo(({
  onQuickView,
}) => {
  const { recentSearches, viewedProducts, visitedCategories } = useActivity();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Compute dynamic personalized recommendations
  const { products, reason } = useMemo(() => {
    return recommendationService.getPersonalizedRecommendations(
      {
        recentSearches: recentSearches || [],
        viewedProductIds: viewedProducts.map((p) => p.id),
        visitedCategories: visitedCategories || [],
        cartProductIds: cart.map((c) => c.productId),
        wishlistProductIds: wishlist.map((w) => w.productId),
      },
      8
    );
  }, [recentSearches, viewedProducts, visitedCategories, cart, wishlist]);

  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="Perfect Picks Just for You">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#A60000] to-[#D99A9A] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                Perfect Picks Just for You
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#F5DCDC] text-[#A60000] text-[10px] font-black uppercase tracking-wider font-heading">
                Tailored for You
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5 font-body">
              <Compass className="w-3.5 h-3.5 text-[#A60000] shrink-0" />
              <span>{reason}</span>
            </p>
          </div>
        </div>

        <Link
          to="/category/all"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#A60000] hover:text-[#880000] transition-colors group self-start sm:self-auto font-heading"
        >
          <span>Explore All Curations</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Standardized Carousel with Far-Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {products.map((product) => (
          <div key={product.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

PerfectPicksSection.displayName = 'PerfectPicksSection';
