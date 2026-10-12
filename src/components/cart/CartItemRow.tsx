import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { QuantitySelector } from '../common/QuantitySelector';
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
  const effectiveMrp = product.mrp || effectivePrice;

  const optimizedThumb = optimizeImageUrl(product.mainImage, { width: 160, quality: 70 });

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-zinc-200/90 shadow-2xs transition-all hover:border-zinc-300">
      {/* Product Image */}
      <Link
        to={`/product/${product.slug || product.id}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0"
      >
        <img
          src={optimizedThumb || ''}
          alt={product.name || 'Product'}
          width="96"
          height="96"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {product.brand || 'HAATZA'}
              </span>
              <Link
                to={`/product/${product.slug || product.id}`}
                className="block text-sm sm:text-base font-bold text-[#202124] hover:text-[#E53935] line-clamp-2 leading-snug"
              >
                {product.name || 'Product'}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => removeFromCart(item.id)}
              className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Variant & Express badges */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {selectedVariant && (
              <span className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-md">
                {selectedVariant.name}: <strong>{selectedVariant.value}</strong>
              </span>
            )}
            {product.instantDeliveryMinutes && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3" /> 15m Delivery
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Qty controls */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-100 flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => updateQuantity(item.id, quantity + 1)}
              onDecrease={() => updateQuantity(item.id, quantity - 1)}
              size="sm"
            />

            <button
              type="button"
              onClick={() => moveToSaveForLater(item.id)}
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 inline-flex items-center gap-1 transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Save for later</span>
            </button>
          </div>

          <div>
            <PriceDisplay
              price={effectivePrice * quantity}
              mrp={effectiveMrp ? effectiveMrp * quantity : undefined}
              discountPercentage={product.discountPercentage}
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

CartItemRow.displayName = 'CartItemRow';
