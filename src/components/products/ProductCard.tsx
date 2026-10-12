import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { RatingDisplay } from '../common/RatingDisplay';
import { Badge } from '../common/Badge';
import { Heart, ShoppingBag, Eye, Zap, Check, Flame } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface ProductCardProps {
  product: Product;
  className?: string;
  onQuickView?: (product: Product) => void;
  statusBadge?: string;
  stockLeft?: number;
  dealBadge?: string;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({
  product,
  className = '',
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants && product.variants.length > 0) {
      navigate(`/product/${product.slug}`);
      return;
    }

    addToCart(product, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
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

  // Downscale image to 360px for card container, preventing massive GPU texture decodes
  const optimizedImage = optimizeImageUrl(product.mainImage, { width: 360, quality: 75 });

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-zinc-200/80 hover:border-[#D99A9A] transition-all duration-300 flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Product Image Container (Clean, Bright, Natural without dark shadows) */}
      <div className="relative aspect-square w-full bg-[#FAFAFA] overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full p-2">
          <img
            src={optimizedImage}
            alt={product.name}
            width="240"
            height="240"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10 pointer-events-none">
          {dealBadge && (
            <span className="px-2 py-0.5 rounded-md bg-[#A60000] text-white text-[10px] font-black tracking-wider uppercase font-heading">
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

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all z-10 ${
            isFavorited
              ? 'bg-[#A60000] text-white'
              : 'bg-white/90 text-zinc-600 hover:text-[#A60000] hover:bg-white border border-zinc-200/60'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={handleQuickView}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-zinc-800 hover:text-[#A60000] text-xs font-semibold px-3 py-1 rounded-full border border-zinc-200/80 opacity-0 group-hover:opacity-100 transition-all duration-200 items-center gap-1.5 hidden sm:inline-flex z-10"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>

        {/* Stock urgency indicator if provided */}
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
            <RatingDisplay rating={product.rating} size="sm" showCount={false} />
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="block text-xs sm:text-sm font-semibold text-zinc-900 hover:text-[#A60000] transition-colors line-clamp-2 leading-snug h-9 font-body"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-zinc-100 mt-2">
          <div className="flex items-baseline gap-1.5 mb-2.5">
            <span className="text-sm sm:text-base font-black text-zinc-950 font-heading">
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
            onClick={handleAddToCart}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-900 hover:bg-[#A60000] text-white active:scale-95'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : product.variants && product.variants.length > 0 ? (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Select Options</span>
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
});

ProductCard.displayName = 'ProductCard';
