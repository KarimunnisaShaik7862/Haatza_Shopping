import React from 'react';
import { ProductVariant } from '../../types';

export interface ProductVariantsProps {
  variants?: ProductVariant[];
  selectedVariant?: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
  error?: string;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  selectedVariant,
  onSelect,
  error,
}) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-2 py-3 border-y border-[#E5EAF3]">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#172033] font-heading">
          Select Option: <strong className="text-[#2962FF]">{selectedVariant?.value || 'None Selected'}</strong>
        </span>
        {error && <span className="text-xs font-semibold text-rose-600">{error}</span>}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {variants.map((v) => {
          const isSelected = selectedVariant?.id === v.id;
          return (
            <button
              key={v.id}
              type="button"
              disabled={!v.inStock}
              onClick={() => onSelect(v)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-heading ${
                isSelected
                  ? 'bg-[#2962FF] text-white shadow-soft-sm'
                  : v.inStock
                  ? 'bg-white hover:bg-[#F5F7FF] text-[#172033] border border-[#E5EAF3] hover:border-[#2962FF]/40'
                  : 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed line-through'
              }`}
            >
              <span>{v.value}</span>
              {v.priceDelta && v.priceDelta > 0 ? (
                <span className="ml-1 text-[10px] opacity-80">(+₹{v.priceDelta})</span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariants;
