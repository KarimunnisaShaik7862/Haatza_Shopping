import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface DealProductCardProps {
  product: Product;
  className?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showRating?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

/**
 * DealProductCard
 * Unified product card component matching the exact dimensions, aspect ratio,
 * typography, and button styling of Men's Deal of the Day.
 * 
 * Reused across:
 * - Men's Deals of the Day (DealsOfTheDayWidget)
 * - Trending in Men's Fashion (MensTrendingFashionSection)
 */
export const DealProductCard: React.FC<DealProductCardProps> = React.memo(({
  product,
  className = '',
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
  showRating = false,
  onClick,
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    e.preventDefault();
    e.stopPropagation();

    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-full max-w-[212px] shrink-0 flex flex-col relative py-2 select-none ${className}`}
    >
      {/* Product Card Container */}
      <div
        className={`origin-center flex flex-col justify-between w-full h-full text-center transition-all duration-300 ease-out cursor-pointer ${
          isHovered
            ? 'scale-[1.05] z-30 drop-shadow-[0_12px_24px_rgba(41,98,255,0.22)] brightness-[1.02]'
            : 'scale-100 z-10'
        }`}
      >
        {/* 1. Square Product Image Box with Exactly One Wishlist Heart Button */}
        <div
          className={`relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-all duration-300 ${
            isHovered
              ? 'shadow-md shadow-blue-500/15 ring-2 ring-blue-500/30'
              : 'hover:bg-slate-200/80'
          }`}
        >
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={optimizedImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover object-center select-none transition-transform duration-350 ease-out ${
                isHovered ? 'scale-[1.06]' : 'hover:scale-[1.04]'
              }`}
            />
          </Link>

          {/* Wishlist Heart Toggle (Exactly ONE interactive icon) */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer ${
              isFavorited
                ? 'bg-[#2962FF] text-white shadow-xs'
                : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
            }`}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* 2. Structured Content Wrapper (Uniform height across cards) */}
        <div className="flex flex-col flex-1 justify-between w-full">
          {/* Product Name (Fixed height slot with 2-line clamp) */}
          <div className="h-8.5 sm:h-9 flex items-center justify-center">
            <Link
              to={`/product/${product.slug}`}
              className={`text-xs sm:text-[13px] font-bold line-clamp-2 leading-snug transition-colors px-1 font-heading text-center ${
                isHovered ? 'text-[#2962FF]' : 'text-[#172033] hover:text-[#2962FF]'
              }`}
              title={product.name}
            >
              {product.name}
            </Link>
          </div>

          {/* Rating and Review Count (when enabled or available) */}
          {showRating && product.rating !== undefined && (
            <div className="h-4 flex items-center justify-center gap-1.5 mt-1 text-xs font-semibold text-slate-700">
              <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B] shrink-0" />
              <span>{product.rating}</span>
              {product.reviewCount !== undefined && (
                <span className="text-slate-400 font-normal">({product.reviewCount})</span>
              )}
            </div>
          )}

          {/* Product Price & MRP */}
          <div className="h-5.5 sm:h-6 flex items-baseline justify-center gap-1.5 mt-0.5 font-sans shrink-0">
            <span className="text-xs sm:text-[15px] font-black text-slate-950 font-heading">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] text-slate-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action Button: 'Add to Cart' */}
          <button
            type="button"
            onClick={handleActionClick}
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
});

DealProductCard.displayName = 'DealProductCard';
export default DealProductCard;
