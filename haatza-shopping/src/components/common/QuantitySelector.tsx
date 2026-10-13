import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const isMin = quantity <= min;
  const isMax = quantity >= max;

  const sizeClasses = {
    sm: {
      btn: 'w-7 h-7 text-xs',
      text: 'w-8 text-xs',
      wrapper: 'h-7',
    },
    md: {
      btn: 'w-8 h-8 text-sm',
      text: 'w-10 text-sm',
      wrapper: 'h-8',
    },
    lg: {
      btn: 'w-10 h-10 text-base',
      text: 'w-12 text-base font-semibold',
      wrapper: 'h-10',
    },
  };

  const current = sizeClasses[size];

  return (
    <div className={`inline-flex items-center border border-zinc-300 rounded-lg overflow-hidden bg-white shadow-2xs ${current.wrapper}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={isMin}
        className={`flex items-center justify-center ${current.btn} text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className={`text-center font-medium text-[#202124] ${current.text} select-none`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={isMax}
        className={`flex items-center justify-center ${current.btn} text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
