import React, { useMemo } from 'react';
import { History, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../../context/RecentlyViewedContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';
import { Product } from '../../types';

interface RecentlyViewedSectionProps {
  onQuickView?: (product: Product) => void;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = React.memo(({
  onQuickView,
}) => {
  const { recentlyViewed } = useRecentlyViewed();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Combine recently viewed products, active cart items, and wishlist items under one heading
  const combinedItems = useMemo(() => {
    const seenIds = new Set<string>();
    const list: { product: Product; badge?: string }[] = [];

    // 1. Prioritize products actually viewed by user
    recentlyViewed.forEach((p) => {
      if (p && p.id && !seenIds.has(p.id)) {
        seenIds.add(p.id);
        const inCart = cart.some((c) => c?.productId === p.id || c?.product?.id === p.id);
        const inWishlist = wishlist.some((w) => w?.productId === p.id || w?.product?.id === p.id);
        const badge = inCart ? 'In Your Cart' : inWishlist ? 'Wishlisted' : undefined;
        list.push({ product: p, badge });
      }
    });

    // 2. Add remaining cart items
    cart.forEach((c) => {
      const prod = c?.product || (c as any);
      if (prod && prod.id && !seenIds.has(prod.id)) {
        seenIds.add(prod.id);
        list.push({ product: prod, badge: 'In Your Cart' });
      }
    });

    // 3. Add remaining wishlist items
    wishlist.forEach((w) => {
      const prod = w?.product || (w as any);
      if (prod && prod.id && !seenIds.has(prod.id)) {
        seenIds.add(prod.id);
        list.push({ product: prod, badge: 'Wishlisted' });
      }
    });

    return list;
  }, [recentlyViewed, cart, wishlist]);

  if (combinedItems.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="Recently Viewed by You">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shadow-xs">
            <History className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                Recently Viewed by You
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider font-heading">
                {combinedItems.length} Items Saved & Viewed
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-body">
              Pick up where you left off. Products you recently explored, saved to your wishlist, or have in your cart.
            </p>
          </div>
        </div>

        <Link
          to="/wishlist"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#A60000] hover:text-[#880000] transition-colors group self-start sm:self-auto font-heading"
        >
          <span>View All Saved Items</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Standardized Carousel with Far-Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {combinedItems.map(({ product, badge }) => (
          <div key={product.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard
              product={product}
              statusBadge={badge}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

RecentlyViewedSection.displayName = 'RecentlyViewedSection';
