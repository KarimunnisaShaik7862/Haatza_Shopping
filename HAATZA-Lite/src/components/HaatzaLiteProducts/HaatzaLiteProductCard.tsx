import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { PriceInfoButton } from '../common/PriceInfoModal';

interface HaatzaLiteProductCardProps {
  product: HaatzaLiteProduct;
  className?: string;
}

export const HaatzaLiteProductCard: React.FC<HaatzaLiteProductCardProps> = React.memo(({
  product,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { cart, addToCart, updateQuantity } = useHaatzaLiteCart();

  const cartItem = cart.find((item) => item.productId === product.id);
  const qty = cartItem ? cartItem.quantity : 0;
  const productId = product.id || product.slug;

  const handleCardClick = () => {
    navigate(`/lite/product/${productId}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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

  const packSize = product.unit || '1 unit';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group haatza-neon-aura-card relative bg-white rounded-2xl border border-slate-100/90 p-3 sm:p-4 flex flex-col justify-between h-full select-none cursor-pointer shadow-xs overflow-hidden ${className}`}
      style={{
        background: isHovered
          ? 'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.04) 0%, transparent 70%), #FFFFFF'
          : '#FFFFFF',
      }}
    >
      {/* Interactive Cursor Ambient Emerald Halo */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ease-out z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.12), transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-1">
        {/* Product Image Stage */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2.5 bg-[#F5F7F6] group-hover:bg-white border border-slate-100/80 flex items-center justify-center transition-colors duration-300 ease-out">
          <Link to={`/lite/product/${productId}`} className="block w-full h-full p-0.5 flex items-center justify-center">
            <img
              src={product.mainImage}
              alt={product.name}
              width="180"
              height="180"
              loading="lazy"
              decoding="async"
              className="w-full h-full max-h-full max-w-full object-contain object-center scale-[1.08] group-hover:scale-[1.14] transition-transform duration-400 ease-out pointer-events-none will-change-transform filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)]"
            />
          </Link>
        </div>

        {/* Delivery & Rating Badge */}
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-700 tracking-tight">
            <Clock className="w-2.5 h-2.5 text-emerald-600 stroke-[2.5]" />
            <span>{product.instantDeliveryMinutes || 8} MINS</span>
          </div>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50/90 border border-amber-200/80 text-[10px] font-black text-amber-800 shrink-0 shadow-2xs">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span>{(product.rating || 4.8).toFixed(1)}</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/lite/product/${productId}`}
          className="text-xs sm:text-sm font-semibold text-[#111D15] group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-1 block"
        >
          {product.name}
        </Link>

        {/* Weight / Pack Size */}
        <div className="text-[11px] sm:text-xs font-medium text-slate-500 mb-2 truncate">
          {packSize}
        </div>
      </div>

      {/* Pricing & Tactile "+ ADD" Action */}
      <div className="relative z-1 flex items-center justify-between gap-2 pt-1 border-t border-slate-100 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-black text-emerald-700 tracking-tight">
              {formatCurrency(product.price)}
            </span>
            <PriceInfoButton
              productName={product.name}
              price={product.price}
              mrp={product.mrp}
              discountPercentage={product.discountPercentage}
              unit={product.unit}
              brand={product.brand}
              size="xs"
              theme="emerald"
            />
          </div>
          {product.mrp > product.price && (
            <span className="text-[10px] text-slate-400 line-through font-medium">
              {formatCurrency(product.mrp)}
            </span>
          )}
        </div>

        {/* Tactile "ADD" Button Container with stopPropagation */}
        <div onClick={(e) => e.stopPropagation()}>
          {qty === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="group/btn px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_14px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 ease-out cursor-pointer flex items-center gap-1 select-none will-change-transform"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-3 h-3 stroke-[2.75] transition-transform duration-200 group-hover/btn:rotate-90" />
              <span>ADD</span>
            </button>
          ) : (
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl shadow-[0_2px_8px_rgba(16,185,129,0.25)] overflow-hidden transition-all duration-200 hover:scale-[1.02]">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-2 py-1 hover:bg-black/15 text-white transition-all active:scale-90 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 stroke-[3]" />
              </button>
              <span className="px-1.5 text-xs font-black min-w-5 text-center select-none text-white">
                {qty}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-2 py-1 hover:bg-black/15 text-white transition-all active:scale-90 cursor-pointer"
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
