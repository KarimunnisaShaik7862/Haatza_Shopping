import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { formatCurrency } from '../../utils/formatters';

export const HaatzaLiteCartButton: React.FC = () => {
  const { itemCount, total } = useHaatzaLiteCart();

  return (
    <button
      type="button"
      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#238636] hover:bg-[#1c6d2c] text-white shadow-sm transition-all duration-150 active:scale-95 shrink-0"
    >
      <div className="relative flex items-center justify-center">
        <ShoppingBag className="w-5 h-5 text-white" />
        {itemCount > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-yellow-400 text-zinc-900 text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-4 text-center">
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
    </button>
  );
};
