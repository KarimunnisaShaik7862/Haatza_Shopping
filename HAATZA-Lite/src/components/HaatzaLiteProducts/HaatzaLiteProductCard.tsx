import React from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface HaatzaLiteProductCardProps {
  product: HaatzaLiteProduct;
  className?: string;
}

export const HaatzaLiteProductCard: React.FC<HaatzaLiteProductCardProps> = React.memo(({
  product,
  className = '',
}) => {
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  const cartItem = cart.find((item) => item.productId === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, qty + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(cartItem.id, qty - 1);
    }
  };

  // Determine weight or pack size cleanly
  const packSize = product.unit || '1 unit';

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-[#0C831F]/12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:-translate-y-1.5 hover:scale-[1.03] hover:border-[#0C831F]/35 hover:shadow-[0_16px_32px_-4px_rgba(12,131,31,0.22),0_6px_16px_-2px_rgba(12,131,31,0.12),0_0_0_1px_rgba(12,131,31,0.25)] will-change-transform flex flex-col justify-between p-3 sm:p-3.5 select-none ${className}`}
    >
      <div>
        {/* Product Image - sitting clean directly on page */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2.5 bg-[#F9FAF9] flex items-center justify-center">
          <Link to={`/product/${product.slug}`} className="block w-full h-full p-2.5">
            <img
              src={product.mainImage}
              alt={product.name}
              width="180"
              height="180"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-200 ease-out"
            />
          </Link>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-semibold text-[#111D15] group-hover:text-[#0C831F] transition-colors line-clamp-2 leading-snug mb-1"
        >
          {product.name}
        </Link>

        {/* Weight / Pack Size (Clean, without colored pills) */}
        <div className="text-[11px] sm:text-xs font-medium text-slate-500 mb-2 truncate">
          {packSize}
        </div>
      </div>

      {/* Pricing & Crisp Green-and-White ADD Action */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-black text-[#0C831F] tracking-tight">
            {formatCurrency(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-[10px] text-slate-400 line-through font-medium">
              {formatCurrency(product.mrp)}
            </span>
          )}
        </div>

        {/* Crisp Green-and-White "+ ADD" Button */}
        <div>
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-white border border-[#0C831F] text-[#0C831F] group-hover:bg-[#0C831F] group-hover:text-white group-hover:border-[#0C831F] group-hover:shadow-[0_4px_14px_rgba(12,131,31,0.4)] text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 flex items-center gap-1 cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="inline-flex items-center bg-[#0C831F] text-white rounded-lg shadow-2xs overflow-hidden border border-[#09711A]">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-2 py-1 hover:bg-[#09711A] text-white transition-colors active:scale-90 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="px-1.5 text-xs font-black min-w-4 text-center select-none text-white">
                {qty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-2 py-1 hover:bg-[#09711A] text-white transition-colors active:scale-90 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

HaatzaLiteProductCard.displayName = 'HaatzaLiteProductCard';
