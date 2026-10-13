import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ChevronRight } from 'lucide-react';
import { useActivity } from '../../context/ActivityContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { recommendationService } from '../../services/recommendationService';
import { ProductCard } from '../products/ProductCard';
import { Product } from '../../types';

interface SuggestionsForYouSectionProps {
  onQuickView?: (product: Product) => void;
}

export const SuggestionsForYouSection: React.FC<SuggestionsForYouSectionProps> = ({
  onQuickView,
}) => {
  const { recentSearches, viewedProducts, visitedCategories } = useActivity();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Compute recommendations dynamically
  const { products, reason } = useMemo(() => {
    return recommendationService.getPersonalizedRecommendations(
      {
        recentSearches: recentSearches || [],
        viewedProductIds: viewedProducts.map((p) => p.id),
        visitedCategories: visitedCategories || [],
        cartProductIds: cart.map((c) => c.productId),
        wishlistProductIds: wishlist.map((w) => w.productId),
      },
      4
    );
  }, [recentSearches, viewedProducts, visitedCategories, cart, wishlist]);

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-gradient-to-b from-[#EEF3FF] via-[#F5F7FF] to-white rounded-3xl p-5 sm:p-7 border border-[#E5EAF3] shadow-soft-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2962FF] to-[#DBEAFE] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Suggestions for You
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider">
                Personalized
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>{reason}</span>
            </p>
          </div>
        </div>

        <Link
          to="/category/all"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors group self-start sm:self-auto"
        >
          <span>Explore More Curations</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
};
