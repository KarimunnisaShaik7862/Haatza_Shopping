import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { Trash2, Bookmark, Zap } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = React.memo(({ item }) => {
  const { updateQuantity, removeFromCart, moveToSaveForLater } = useCart();

  const product = item?.product || (item as any) || {};
  const selectedVariant = item?.selectedVariant;
  const quantity = item?.quantity || 1;

  const effectivePrice = (product.price || 0) + (selectedVariant?.priceDelta || 0);
  const effectiveMrp = product.mrp || Math.round(effectivePrice * 1.35);
  const hasDiscount = effectiveMrp > effectivePrice;
  const discountPct = hasDiscount ? Math.round(((effectiveMrp - effectivePrice) / effectiveMrp) * 100) : 0;

  const optimizedThumb = optimizeImageUrl(product.mainImage, { width: 220, quality: 75 }) || product.mainImage;

  return (
    <div className="group p-4 sm:p-5 bg-white rounded-lg border border-[#E5E7EB] hover:border-[#2962FF]/40 transition-all shadow-2xs hover:shadow-soft-sm">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
        
        {/* Product Image Box */}
        <Link
          to={`/product/${product.slug || product.id}`}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] shrink-0 p-1.5 flex items-center justify-center relative group-hover:border-[#2962FF]/30 transition-colors"
        >
          <img
            src={optimizedThumb || ''}
            alt={product.name || 'Product'}
            width="112"
            height="112"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Content & Details Column */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              {product.brand && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#555555] font-heading block">
                  {product.brand}
                </span>
              )}
              <Link
                to={`/product/${product.slug || product.id}`}
                className="text-sm sm:text-base font-extrabold text-[#1F1F1F] hover:text-[#2962FF] line-clamp-2 transition-colors font-heading leading-snug"
              >
                {product.name || 'Product Title'}
              </Link>

              {/* Variant Tag */}
              {selectedVariant && (
                <div className="inline-flex items-center gap-1.5 bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE] px-2.5 py-0.5 rounded-md text-xs font-bold mt-1">
                  <span>{selectedVariant.name || 'Option'}:</span>
                  <span className="font-semibold text-[#1F1F1F]">{selectedVariant.value}</span>
                </div>
              )}

              {product.instantDeliveryMinutes && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 ml-2">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  <span>15m Delivery</span>
                </span>
              )}
            </div>

            {/* Price Column (Top Right Only - Clean single source of price) */}
            <div className="text-right shrink-0">
              <div className="text-base sm:text-lg font-black text-[#1F1F1F] font-heading">
                {formatINR(effectivePrice * quantity)}
              </div>
              {hasDiscount && (
                <div className="flex items-center justify-end gap-1.5 text-xs text-[#555555] mt-0.5">
                  <span className="line-through">{formatINR(effectiveMrp * quantity)}</span>
                  <span className="font-bold text-emerald-600 text-[11px]">
                    {discountPct}% OFF
                  </span>
                </div>
              )}
              {quantity > 1 && (
                <div className="text-[11px] font-medium text-[#777777] mt-0.5">
                  {formatINR(effectivePrice)} each
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Quantity Controls & Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3.5 mt-3 border-t border-[#E5E7EB]">
            
            {/* Left Actions: Quantity Pill, Remove, and Save for later */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {/* Quantity Selector Pill [ - ] [ 1 ] [ + ] */}
              <div className="inline-flex items-center bg-[#F5F7FF] border border-[#E5E7EB] rounded-lg overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, quantity - 1)}
                  disabled={quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center text-[#1F1F1F] hover:bg-[#EEF3FF] hover:text-[#2962FF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-9 text-center font-bold text-xs sm:text-sm text-[#1F1F1F] font-mono select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#1F1F1F] hover:bg-[#EEF3FF] hover:text-[#2962FF] transition-colors text-base font-bold cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Remove Action */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="text-xs font-semibold text-[#555555] hover:text-rose-600 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                aria-label="Remove product"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>

              {/* Save for later Action */}
              <button
                type="button"
                onClick={() => moveToSaveForLater(item.id)}
                className="text-xs font-semibold text-[#555555] hover:text-[#2962FF] inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                aria-label="Save for later"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save for later</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
});

CartItemRow.displayName = 'CartItemRow';
export default CartItemRow;
