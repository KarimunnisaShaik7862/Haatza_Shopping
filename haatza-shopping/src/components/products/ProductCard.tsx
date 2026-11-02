import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, Eye, Zap, Check, Flame, Star, Trophy, Sparkles } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { Badge } from '../common/Badge';
import { DealProductCard } from './DealProductCard';

export type ProductCardVariant =
  | 'standard'
  | 'classic'
  | 'editorial'
  | 'promotional'
  | 'bestseller'
  | 'compact'
  | 'featured'
  | 'personalized'
  | 'fashion'
  | 'deal';

export interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: ProductCardVariant;
  onQuickView?: (product: Product) => void;
  statusBadge?: string;
  stockLeft?: number;
  dealBadge?: string;
  showRating?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  className = '',
  variant = 'standard',
  onQuickView,
  statusBadge,
  stockLeft,
  dealBadge,
  showRating = true,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const success = addToCart(product, 1);
    if (success) {
      setIsAddedRecently(true);
      setTimeout(() => setIsAddedRecently(false), 1800);
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
  // DELEGATE: FASHION / DEAL (Preserves exact Men's & Women's Deal dimensions)
  // =========================================================================
  if (variant === 'fashion' || variant === 'deal') {
    return (
      <DealProductCard
        product={product}
        className={className}
        showRating={showRating}
      />
    );
  }

  // =========================================================================
  // VARIANT: COMPACT (Secondary Discovery, dense sidebars, small carousels)
  // =========================================================================
  if (variant === 'compact') {
    return (
      <div
        className={`group relative bg-white rounded-xl border border-slate-200/90 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden select-none hover:-translate-y-1 will-change-transform haatza-shimmer-border ${className}`}
      >
        <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden p-2">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={optimizedImage}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 ease-out"
            />
          </Link>

          {/* Quick Wishlist Icon (Small, sleek badge on mobile) */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            className={`absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer ${
              isFavorited
                ? 'bg-[#2962FF] text-white shadow-xs'
                : 'bg-white/90 text-zinc-700 hover:text-[#2962FF] border border-slate-200 shadow-2xs'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${isFavorited ? 'fill-current' : 'stroke-[1.8]'}`} />
          </button>
        </div>

        <div className="p-2.5 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate block font-heading">
              {product.brand}
            </span>
            <Link
              to={`/product/${product.slug}`}
              className="block text-xs font-semibold text-[#111827] hover:text-[#2962FF] transition-colors line-clamp-1 font-body mt-0.5"
              title={product.name}
            >
              {product.name}
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between gap-1.5 mt-1 border-t border-zinc-100">
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-bold text-zinc-950 font-heading">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-[10px] text-zinc-400 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleActionClick}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2962FF] hover:bg-[#1747CC] text-white'
              }`}
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              {isAddedRecently ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT: BESTSELLER (Gold proofing, bestseller ranking, verified badge)
  // =========================================================================
  const isBestsellerVariant = variant === 'bestseller';
  const isEditorialVariant = variant === 'editorial';
  const isPromotionalVariant = variant === 'promotional';
  const isPersonalizedVariant = variant === 'personalized';
  const isFeaturedVariant = variant === 'featured';

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 hover:shadow-[0_20px_30px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden will-change-transform haatza-shimmer-border ${className}`}
    >
      {/* Product Image Container with Clipped Subtle Zoom Effect */}
      <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full p-2">
          <img
            src={optimizedImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-center group-hover:scale-[1.06] transition-transform duration-500 ease-out will-change-transform"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {/* Bestseller Highlight Badge */}
          {isBestsellerVariant && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2962FF] text-white text-[10px] font-black tracking-wider uppercase font-heading shadow-xs">
              <Trophy className="w-3 h-3 fill-current" />
              <span>Bestseller</span>
            </span>
          )}

          {/* Personalized / Liked Badge */}
          {isPersonalizedVariant && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2962FF] text-white text-[10px] font-black tracking-wider uppercase font-heading shadow-xs">
              <Heart className="w-3 h-3 fill-current" />
              <span>Saved by You</span>
            </span>
          )}

          {/* Deal & Promotional Badges */}
          {dealBadge && (
            <span className="px-2 py-0.5 rounded-md bg-[#2962FF] text-white text-[10px] font-black tracking-wider uppercase font-heading">
              {dealBadge}
            </span>
          )}

          {product.discountPercentage > 0 && !isPersonalizedVariant && (
            <Badge variant="discount" size="sm">
              {product.discountPercentage}% OFF
            </Badge>
          )}

          {isPromotionalVariant && product.mrp > product.price && (
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
              Save ₹{(product.mrp - product.price).toLocaleString('en-IN')}
            </span>
          )}

          {statusBadge && (
            <span className="inline-flex items-center gap-1 bg-zinc-900/90 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
              {statusBadge}
            </span>
          )}

          {product.instantDeliveryMinutes && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              <Zap className="w-3 h-3 fill-current" /> {product.instantDeliveryMinutes}m
            </span>
          )}
        </div>

        {/* Exactly ONE Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer ${
            isFavorited
              ? 'bg-[#2962FF] text-white shadow-xs scale-105'
              : 'bg-white/95 text-zinc-700 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3] shadow-2xs'
          }`}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-white' : 'stroke-[1.8]'}`} />
        </button>

        {/* Quick View Button (Reveals smoothly on hover) */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-zinc-800 hover:text-[#2962FF] text-xs font-semibold px-3 py-1 rounded-full border border-[#E5EAF3] opacity-0 group-hover:opacity-100 transition-all duration-300 items-center gap-1.5 hidden sm:inline-flex z-10 shadow-2xs cursor-pointer transform translate-y-1 group-hover:translate-y-0"
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
      <div className="p-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider truncate font-heading">
              {product.brand}
            </span>
            {showRating && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-700">
                <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                <span>{product.rating}</span>
                {product.reviewCount && (
                  <span className="text-[10px] text-zinc-400">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs sm:text-[13px] font-semibold text-[#1F1F1F] hover:text-[#2962FF] transition-colors line-clamp-2 leading-snug h-8 sm:h-8.5 font-body"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Action Button */}
        <div className="pt-1.5 border-t border-zinc-100 mt-1.5">
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm sm:text-[15px] font-bold text-[#1F1F1F] font-heading">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-[#555555] line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[10.5px] font-bold text-emerald-600 ml-auto">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          {/* Main Action Button */}
          <button
            type="button"
            onClick={handleActionClick}
            className={`w-full h-[34px] rounded-[10px] text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer active:scale-98 ${
              isAddedRecently
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#2962FF] hover:bg-[#1747CC] text-white shadow-2xs hover:shadow-xs'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isPersonalizedVariant ? 'Move to Cart' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
