import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Eye, ShoppingBag, Check, Heart, ChevronRight, Award } from 'lucide-react';
import { TrendingItemWithAnalytics } from '../../services/mock/data/promotions';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingDisplay } from '../common/RatingDisplay';

interface TrendingItemsSectionProps {
  items: TrendingItemWithAnalytics[];
}

export const TrendingItemsSection: React.FC<TrendingItemsSectionProps> = ({ items }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, item: TrendingItemWithAnalytics) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(item, 1);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent, item: TrendingItemWithAnalytics) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2962FF] to-[#DBEAFE] text-white flex items-center justify-center shadow-md">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                Trending Items
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider">
                Top Velocity
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Most visited and highly demanded products across all categories this week.
            </p>
          </div>
        </div>

        <Link
          to="/category/all"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors group shrink-0"
        >
          <span>See All Trending</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {items.map((item) => {
          const isFav = isInWishlist(item.id);
          const isAdded = !!addedIds[item.id];

          return (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full bg-zinc-50 overflow-hidden">
                <Link to={`/product/${item.slug}`} className="block w-full h-full">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </Link>

                {/* Trending Rank Badge */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                  <span className="px-2 py-0.5 rounded-md bg-stone-900/90 text-white text-[10px] font-black tracking-wider uppercase shadow-xs flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    #{item.trendingRank}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(e, item)}
                  aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all z-10 ${
                    isFav
                      ? 'bg-[#2962FF] text-white shadow-md'
                      : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Live views metric tag */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/65 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] text-zinc-200 font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Eye className="w-2.5 h-2.5" />
                    {item.viewsToday.toLocaleString()} views
                  </span>
                  <span className="text-zinc-300">{item.salesCountWeek}+ bought</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">
                      {item.brand}
                    </span>
                    <RatingDisplay rating={item.rating} size="sm" showCount={false} />
                  </div>

                  <Link
                    to={`/product/${item.slug}`}
                    className="block text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#2962FF] line-clamp-2 leading-snug"
                  >
                    {item.name}
                  </Link>
                </div>

                {/* Price & Add to Cart */}
                <div className="mt-3 pt-2 border-t border-zinc-100">
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm sm:text-base font-black text-zinc-950">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-zinc-400 line-through">
                        ₹{item.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#2962FF] hover:bg-[#1E4ED8] text-white active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
