import React from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { Zap, Plus, Minus } from 'lucide-react';
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

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-zinc-200/90 overflow-hidden hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between p-3 ${className}`}
    >
      <div>
        {/* Product Image & Time Pill */}
        <div className="relative aspect-square w-full rounded-xl bg-zinc-50 overflow-hidden mb-2.5">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.mainImage}
              alt={product.name}
              width="180"
              height="180"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* 10-15 Min Delivery Badge */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
            <span className="inline-flex items-center gap-1 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs tracking-tight">
              <Zap className="w-2.5 h-2.5 fill-current text-yellow-300" />
              {product.instantDeliveryMinutes || 12} MINS
            </span>
          </div>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <span className="absolute bottom-2 left-2 bg-[#238636] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Brand / Unit */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">
            {product.brand}
          </span>
          {product.unit && (
            <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
              {product.unit}
            </span>
          )}
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-xs sm:text-sm font-bold text-[#202124] hover:text-[#238636] transition-colors line-clamp-2 leading-snug mb-2"
        >
          {product.name}
        </Link>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="pt-2 border-t border-zinc-100 mt-2 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-black text-[#202124]">
            {formatCurrency(product.price)}
          </span>
          {product.mrp > product.price && (
            <span className="text-[11px] text-zinc-400 line-through -mt-0.5 font-medium">
              {formatCurrency(product.mrp)}
            </span>
          )}
        </div>

        {/* Quick-Commerce Add / Quantity Button */}
        <div>
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl border border-emerald-600 bg-[#EAF6EC] text-[#238636] hover:bg-[#238636] hover:text-white text-xs font-black uppercase tracking-wider transition-all duration-150 shadow-2xs active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="inline-flex items-center bg-[#238636] text-white rounded-xl shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={handleDecrement}
                className="p-1.5 hover:bg-emerald-700 transition-colors active:scale-90 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
              <span className="px-2 text-xs font-black min-w-5 text-center select-none">
                {qty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="p-1.5 hover:bg-emerald-700 transition-colors active:scale-90 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

HaatzaLiteProductCard.displayName = 'HaatzaLiteProductCard';
