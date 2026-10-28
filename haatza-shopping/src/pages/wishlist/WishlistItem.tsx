import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ShoppingBag, Heart } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface WishlistItemProps {
  product: Product;
  onMoveToCart: (product: Product) => void;
  onRemove: (productId: string) => void;
}

/**
 * WishlistItem
 * Matches the exact card design, dimensions, typography, and button styling
 * of More to Explore and Recently Viewed by You (DealProductCard).
 */
export const WishlistItem: React.FC<WishlistItemProps> = ({
  product,
  onMoveToCart,
  onRemove,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const effectivePrice = product.price || 0;
  const effectiveMrp = product.mrp || (effectivePrice > 0 ? Math.round(effectivePrice * 1.35) : 0);
  const hasDiscount = effectiveMrp > effectivePrice;

  const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 }) || product.mainImage;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMoveToCart(product);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-[212px] shrink-0 flex flex-col relative py-2 select-none mx-auto"
    >
      {/* Product Card Container */}
      <div
        className={`origin-center flex flex-col justify-between w-full h-full text-center transition-all duration-300 ease-out cursor-pointer ${
          isHovered
            ? 'scale-[1.04] z-20 drop-shadow-[0_8px_20px_rgba(41,98,255,0.18)] brightness-[1.02]'
            : 'scale-100 z-10'
        }`}
      >
        {/* 1. Proportional Square Image Box */}
        <div
          className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-all duration-300 ${
            isHovered
              ? 'shadow-md shadow-blue-500/15 ring-2 ring-blue-500/30'
              : 'hover:bg-slate-200/80'
          }`}
        >
          <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
            <img
              src={optimizedImage}
              alt={product.name || 'Product'}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover object-center select-none transition-transform duration-350 ease-out ${
                isHovered ? 'scale-[1.06]' : 'hover:scale-[1.04]'
              }`}
            />
          </Link>

          {/* Wishlist Heart Toggle (Active blue circle with heart, clicking removes from My List) */}
          <button
            type="button"
            onClick={handleHeartClick}
            className="absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer bg-[#2962FF] text-white shadow-xs hover:bg-rose-600 hover:scale-105 active:scale-95"
            title="Remove from My List"
            aria-label={`Remove ${product.name} from wishlist`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>

        {/* 2. Structured Content Wrapper (Exact same height slots as More to Explore / Deals of the Day) */}
        <div className="flex flex-col flex-1 justify-between w-full">
          {/* Product Name (Fixed height slot with 2-line clamp) */}
          <div className="h-8.5 sm:h-9 flex items-center justify-center">
            <Link
              to={`/product/${product.slug || product.id}`}
              className={`text-xs sm:text-[13px] font-bold line-clamp-2 leading-snug transition-colors px-1 font-heading text-center ${
                isHovered ? 'text-[#2962FF]' : 'text-[#172033] hover:text-[#2962FF]'
              }`}
              title={product.name}
            >
              {product.name}
            </Link>
          </div>

          {/* Product Price & MRP (Fixed height slot) */}
          <div className="h-5.5 sm:h-6 flex items-baseline justify-center gap-1.5 mt-0.5 font-sans shrink-0">
            <span className="text-xs sm:text-[15px] font-black text-slate-950 font-heading">
              ₹{effectivePrice.toLocaleString('en-IN')}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{effectiveMrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action Button: 'Add to Cart' */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-2 h-8 sm:h-8.5 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer select-none active:scale-95 text-white shrink-0 ${
              isHovered
                ? 'bg-[#1E4ED8] shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40'
                : 'bg-[#2962FF] hover:bg-[#1E4ED8] shadow-2xs hover:shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
