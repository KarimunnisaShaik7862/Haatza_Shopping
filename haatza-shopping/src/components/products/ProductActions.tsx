import React from 'react';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../types';

export interface ProductActionsProps {
  product: Product;
  isFavorited: boolean;
  isAddedRecently: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onWishlistToggle: (e: React.MouseEvent) => void;
  onQuickView?: (e: React.MouseEvent) => void;
  compact?: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  isFavorited,
  isAddedRecently,
  onAddToCart,
  onWishlistToggle,
  onQuickView,
  compact = false,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={onWishlistToggle}
        aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          isFavorited
            ? 'bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE]'
            : 'bg-white hover:bg-[#F5F7FF] text-[#64748B] hover:text-[#2962FF] border border-[#E5EAF3]'
        }`}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
      </button>

      {/* Quick View Button */}
      {onQuickView && (
        <button
          type="button"
          onClick={onQuickView}
          aria-label="Quick view product"
          className="w-8 h-8 rounded-xl bg-white hover:bg-[#F5F7FF] text-[#64748B] hover:text-[#2962FF] border border-[#E5EAF3] flex items-center justify-center transition-all cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={onAddToCart}
        aria-label="Add to cart"
        className={`flex-1 flex items-center justify-center gap-1.5 font-bold rounded-xl transition-all cursor-pointer font-heading ${
          compact ? 'py-1.5 px-2.5 text-[11px]' : 'py-2 px-3 text-xs'
        } ${
          isAddedRecently
            ? 'bg-[#16A34A] text-white'
            : 'bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-soft-sm hover:shadow-soft active:scale-[0.98]'
        }`}
      >
        {isAddedRecently ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ProductActions;
