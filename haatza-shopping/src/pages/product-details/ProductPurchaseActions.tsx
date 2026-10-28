import React, { forwardRef } from 'react';
import { ShoppingBag, Zap, Check } from 'lucide-react';

interface ProductPurchaseActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isAdded?: boolean;
  inStock?: boolean;
  className?: string;
  isAtEndOfDetails?: boolean;
}

export const ProductPurchaseActions = forwardRef<HTMLDivElement, ProductPurchaseActionsProps>(
  ({ onAddToCart, onBuyNow, isAdded = false, inStock = true, className = '', isAtEndOfDetails = false }, ref) => {
    return (
      <div
        ref={ref}
        className={`sticky bottom-0 z-30 transition-all duration-300 rounded-none -ml-4 sm:-ml-5 lg:-ml-6 xl:-ml-6 -mr-4 sm:-mr-5 lg:mr-0 pl-6 sm:pl-7 lg:pl-8 xl:pl-8 pr-6 sm:pr-7 lg:pr-8 xl:pr-8 py-3 ${
          isAtEndOfDetails
            ? 'bg-transparent border-t-0 shadow-none'
            : 'bg-white border-t border-slate-200 shadow-[0_-4px_16px_rgba(0,0,0,0.07)]'
        } ${className}`}
      >
        <div className="flex items-center gap-3 w-full">
          {/* Add to Cart - Secondary Contrasting Button */}
          <button
            type="button"
            disabled={!inStock}
            onClick={onAddToCart}
            className={`flex-1 py-2.5 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-heading ${
              isAdded
                ? 'bg-emerald-600 text-white border border-emerald-600 shadow-xs'
                : inStock
                ? 'bg-white hover:bg-[#EEF3FF] text-[#2962FF] border border-[#2962FF] hover:border-[#1E4ED8] shadow-xs'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
            aria-label="Add product to cart"
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#2962FF]" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Buy Now - Primary Blue Button */}
          <button
            type="button"
            disabled={!inStock}
            onClick={onBuyNow}
            className={`flex-1 py-2.5 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-heading shadow-xs ${
              inStock
                ? 'bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-blue-500/20 hover:shadow-sm'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
            aria-label="Buy product now"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    );
  }
);

ProductPurchaseActions.displayName = 'ProductPurchaseActions';
export default ProductPurchaseActions;
