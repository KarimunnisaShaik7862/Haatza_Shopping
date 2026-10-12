import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const breadcrumbs = [{ label: 'Wishlist' }];

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save styles, gadgets, and products you love by tapping the heart icon on any product."
          actionText="Discover Products"
          actionLink="/"
        />
      </div>
    );
  }

  const handleMoveToCart = (prod: any) => {
    addToCart(prod, 1);
    removeFromWishlist(prod.id);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          My Saved Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
        {wishlist.map((item, idx) => {
          const product = item?.product || (item as any);
          if (!product || !product.id) return null;
          return (
            <div
              key={product.id || idx}
              className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
            >
              <div className="relative aspect-square bg-zinc-50 overflow-hidden">
                <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
                  <img
                    src={optimizeImageUrl(product.mainImage, { width: 320, quality: 75 }) || ''}
                    alt={product.name || 'Product'}
                    width="220"
                    height="220"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-zinc-500 hover:text-rose-600 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  aria-label="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    {product.brand || 'HAATZA'}
                  </span>
                  <Link
                    to={`/product/${product.slug || product.id}`}
                    className="block text-xs sm:text-sm font-bold text-zinc-900 line-clamp-2 hover:text-[#A60000] mt-1"
                  >
                    {product.name || 'Product'}
                  </Link>
                  <div className="mt-2">
                    <PriceDisplay
                      price={product.price || 0}
                      mrp={product.mrp}
                      discountPercentage={product.discountPercentage}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 mt-3">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(product)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-[#A60000] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
