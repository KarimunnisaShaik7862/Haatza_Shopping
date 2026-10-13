import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Search, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useActivity } from '../../context/ActivityContext';
import { ProductCard } from '../products/ProductCard';
import { Product } from '../../types';

interface PersonalizedShoppingSectionProps {
  onQuickView?: (product: Product) => void;
}

export const PersonalizedShoppingSection: React.FC<PersonalizedShoppingSectionProps> = ({
  onQuickView,
}) => {
  const { wishlist } = useWishlist();
  const { cart, subtotal } = useCart();
  const { recentSearches } = useActivity();

  // If no wishlist, cart or searches, don't show empty boxes
  const hasWishlist = wishlist && wishlist.length > 0;
  const hasCart = cart && cart.length > 0;
  const hasSearches = recentSearches && recentSearches.length > 0;

  if (!hasWishlist && !hasCart && !hasSearches) return null;

  return (
    <div className="space-y-8" aria-label="Personalized Shopping Activity">
      
      {/* 1. From Your Wishlist */}
      {hasWishlist && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center shadow-soft-sm">
                <Heart className="w-4.5 h-4.5 fill-current" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#172033] tracking-tight flex items-center gap-2">
                  <span>From Your Wishlist</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE]">
                    {wishlist.length} Items Saved
                  </span>
                </h3>
                <p className="text-xs text-[#64748B]">
                  Ready to make them yours? Don't let your favorites slip away.
                </p>
              </div>
            </div>

            <Link
              to="/wishlist"
              className="text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] inline-flex items-center gap-1 group transition-colors"
            >
              <span>Go to Wishlist</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1">
            {wishlist.map((item) => (
              <div key={item.productId} className="w-[200px] sm:w-[240px] shrink-0">
                <ProductCard product={item.product} onQuickView={onQuickView} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. Still in Your Cart */}
      {hasCart && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center shadow-soft-sm">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#172033] tracking-tight flex items-center gap-2">
                  <span>Still in Your Cart</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
                    Cart Value: ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </h3>
                <p className="text-xs text-[#64748B]">
                  Complete your checkout to lock in current promotional prices and fast dispatch.
                </p>
              </div>
            </div>

            <Link
              to="/cart"
              className="text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] inline-flex items-center gap-1 group transition-colors"
            >
              <span>View Cart & Checkout</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex gap-3.5 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1">
            {cart.map((item) => (
              <div key={item.productId} className="w-[200px] sm:w-[240px] shrink-0">
                <ProductCard product={item.product} onQuickView={onQuickView} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Recent Search Suggestions Tag Strip */}
      {hasSearches && (
        <div className="flex items-center gap-2.5 flex-wrap pt-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#64748B]">
            <Search className="w-3.5 h-3.5" />
            <span>Recent searches:</span>
          </div>
          {recentSearches.slice(0, 6).map((term, idx) => (
            <Link
              key={idx}
              to={`/search?q=${encodeURIComponent(term)}`}
              className="px-3 py-1 rounded-full bg-white border border-[#E5EAF3] hover:bg-[#EEF3FF] hover:text-[#2962FF] hover:border-[#DBEAFE] text-xs font-semibold text-[#172033] transition-colors shadow-2xs"
            >
              {term}
            </Link>
          ))}
        </div>
      )}

    </div>
  );
};
