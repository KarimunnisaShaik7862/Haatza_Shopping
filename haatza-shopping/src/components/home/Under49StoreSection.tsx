import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Heart, ShoppingBag, Check, ArrowRight, ChevronRight, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface Under49StoreSectionProps {
  products: Product[];
}

export const Under49StoreSection: React.FC<Under49StoreSectionProps> = ({ products }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <section className="bg-gradient-to-r from-[#EEF3FF] via-[#F5F7FF] to-white rounded-3xl p-5 sm:p-7 border border-[#E5EAF3] shadow-soft-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2962FF] text-white flex items-center justify-center font-black text-lg shadow-md">
            ₹49
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                ₹49 Store
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider">
                Unbeatable Budget Finds
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Everyday accessories, hair styling, shoe laces, gadget essentials & home items for ₹49.
            </p>
          </div>
        </div>

        {/* Top See All Link */}
        <Link
          to="/category/under-49"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors group shrink-0"
        >
          <span>See All ({products.length}+)</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Horizontally scrollable product row (5-6 visible on desktop) */}
      <div className="relative">
        <div className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-2 px-2 scroll-smooth">
          {products.map((item) => {
            const isFav = isInWishlist(item.id);
            const isAdded = !!addedIds[item.id];
            const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

            return (
              <div
                key={item.id}
                className="w-[170px] sm:w-[195px] lg:w-[210px] shrink-0 bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
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

                  {/* Badge */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white text-[10px] font-black tracking-wider uppercase shadow-xs flex items-center gap-0.5">
                      <Tag className="w-2.5 h-2.5" />
                      ₹49 ONLY
                    </span>
                    {discount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow-xs">
                        {discount}% OFF
                      </span>
                    )}
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
                </div>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block truncate">
                      {item.brand}
                    </span>
                    <Link
                      to={`/product/${item.slug}`}
                      className="block text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#2962FF] line-clamp-2 leading-snug mt-0.5"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="mt-3 pt-2 border-t border-zinc-100">
                    <div className="flex items-baseline gap-1.5 mb-2">
                      <span className="text-base font-black text-zinc-950">
                        ₹49
                      </span>
                      {item.mrp > 49 && (
                        <span className="text-xs text-zinc-400 line-through">
                          ₹{item.mrp}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/product/${item.slug}`;
                      }}
                      className="w-full py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-2xs bg-[#2962FF] hover:bg-[#1E4ED8] text-white active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dedicated "See All" Card at end of scroll row */}
          <div className="w-[170px] sm:w-[195px] shrink-0 bg-white/90 hover:bg-white rounded-2xl border-2 border-dashed border-[#DBEAFE] hover:border-[#2962FF] transition-all duration-300 flex flex-col items-center justify-center p-6 text-center group cursor-pointer shadow-2xs">
            <Link
              to="/category/under-49"
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div className="w-12 h-12 rounded-full bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs">
                <ArrowRight className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#2962FF] transition-colors">
                View Entire ₹49 Store
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Explore all budget deals & everyday steals
              </p>
              <span className="mt-3 text-xs font-black text-[#2962FF] inline-flex items-center gap-1">
                <span>See All Items</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
