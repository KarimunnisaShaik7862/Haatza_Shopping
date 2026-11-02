import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';

export const HaatzaLiteCartButton: React.FC = () => {
  const { itemCount, total } = useHaatzaLiteCart();

  return (
    <Link
      to="/cart"
      className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0C831F] hover:bg-[#09711A] text-white shadow-[0_3px_12px_rgba(12,131,31,0.25)] hover:shadow-[0_6px_20px_rgba(12,131,31,0.35)] transition-all duration-150 active:scale-95 shrink-0 cursor-pointer border border-[#0C831F]"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingBag className="w-5 h-5 text-white" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-white text-[#0C831F] text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-4 text-center shadow-xs">
            {itemCount}
          </span>
        )}
      </div>

      <div className="flex flex-col text-left leading-none hidden sm:flex">
        <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        <span className="text-xs font-black text-white mt-0.5">
          {total > 0 ? formatCurrency(total) : 'My Cart'}
        </span>
      </div>
    </Link>
  );
};
