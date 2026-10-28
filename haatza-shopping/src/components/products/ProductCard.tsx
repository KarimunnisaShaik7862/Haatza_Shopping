import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, Eye, Zap, Check, Flame, Star } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { Badge } from '../common/Badge';
import { DealProductCard } from './DealProductCard';

export interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'standard' | 'fashion' | 'deal';
  onQuickView?: (product: Product) => void;
  statusBadge?: string;
  stockLeft?: number;
  dealBadge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  className = '',
  variant = 'standard',
  onQuickView,
  statusBadge,
  stockLeft,
  dealBadge,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const hasVariants = Boolean(product.variants && product.variants.length > 0);

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      navigate(`/product/${product.slug}`);
    }
  };

  // Downscale image for crisp display and fast rendering
  const optimizedImage = optimizeImageUrl(product.mainImage, { width: 400, quality: 80 });

  // =========================================================================
  // VARIANT: FASHION / DEAL (Standardized Deal Product Card with Square Aspect)
  // =========================================================================
  if (variant === 'fashion' || variant === 'deal') {
    return (
      <DealProductCard
        product={product}
        className={className}
        showRating={true}
      />
    );
  }

  // =========================================================================
  // VARIANT: STANDARD (Catalog / Marketplace Grid Product Card)
  // =========================================================================
  return (
    <div
      className={`group relative bg-white rounded-[14px] border border-slate-200 hover:border-[#2166F3]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full p-2.5">
          <img
            src={optimizedImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-center group-hover:scale-[1.04] transition-transform duration-300 ease-out will-change-transform"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {dealBadge && (
            <span className="px-2 py-0.5 rounded-md bg-[#2166F3] text-white text-[10px] font-black tracking-wider uppercase font-heading">
              {dealBadge}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <Badge variant="discount" size="sm">
              {product.discountPercentage}% OFF
            </Badge>
          )}
          {product.instantDeliveryMinutes && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              <Zap className="w-3 h-3 fill-current" /> {product.instantDeliveryMinutes}m
            </span>
          )}
          {statusBadge && (
            <span className="inline-flex items-center gap-1 bg-zinc-900/90 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
              {statusBadge}
            </span>
          )}
        </div>

        {/* Exactly ONE Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer ${
            isFavorited
              ? 'bg-[#2166F3] text-white shadow-xs'
              : 'bg-white/95 text-zinc-700 hover:text-[#2166F3] hover:bg-white border border-[#E5EAF3] shadow-2xs'
          }`}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : 'stroke-[1.8]'}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-zinc-800 hover:text-[#2166F3] text-xs font-semibold px-3 py-1 rounded-full border border-[#E5EAF3] opacity-0 group-hover:opacity-100 transition-all duration-200 items-center gap-1.5 hidden sm:inline-flex z-10 shadow-2xs cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Stock urgency indicator */}
        {stockLeft !== undefined && (
          <div className="absolute bottom-1.5 left-2 right-2 bg-stone-900/85 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] text-amber-300 font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              Almost Gone
            </span>
            <span>{stockLeft} left</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider truncate font-heading">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-700">
              <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs sm:text-sm font-semibold text-[#111827] hover:text-[#2166F3] transition-colors line-clamp-2 leading-snug h-9 font-body"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Action button */}
        <div className="pt-2 border-t border-zinc-100 mt-2">
          <div className="flex items-baseline gap-1.5 mb-2.5">
            <span className="text-sm sm:text-base font-bold text-zinc-950 font-heading">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-zinc-400 line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleActionClick}
            className={`w-full h-[40px] rounded-[10px] text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer active:scale-98 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-[#2166F3] hover:bg-[#1A56DB] text-white shadow-2xs hover:shadow-xs'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
