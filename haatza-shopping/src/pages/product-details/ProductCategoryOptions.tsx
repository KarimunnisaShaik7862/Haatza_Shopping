import React from 'react';
import { Ruler } from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { getProductCategoryFamily } from './productDetailHelper';

interface ProductCategoryOptionsProps {
  product: Product;
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  quantity?: number;
  onQuantityChange?: (qty: number) => void;
  onOpenSizeChart?: () => void;
  variantError?: string;
}

export const ProductCategoryOptions: React.FC<ProductCategoryOptionsProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
  onOpenSizeChart,
  variantError,
}) => {
  const family = getProductCategoryFamily(product);
  const isFashion = family === 'fashion';
  const hasVariants = product.variants && product.variants.length > 0;

  // Derive default fallback sizes if product is fashion but lacks explicit variants array
  const displayVariants: ProductVariant[] = hasVariants
    ? product.variants!
    : isFashion
    ? [
        { id: 'size-s', name: 'Size', type: 'size', value: 'S (38)', inStock: true },
        { id: 'size-m', name: 'Size', type: 'size', value: 'M (40)', inStock: true },
        { id: 'size-l', name: 'Size', type: 'size', value: 'L (42)', inStock: true },
        { id: 'size-xl', name: 'Size', type: 'size', value: 'XL (44)', inStock: true },
        { id: 'size-xxl', name: 'Size', type: 'size', value: 'XXL (46)', inStock: false },
      ]
    : [];

  const optionTypeLabel = isFashion
    ? 'Select Size'
    : family === 'mobiles' || family === 'electronics'
    ? 'Select Configuration'
    : family === 'groceries' || family === 'beauty'
    ? 'Select Pack Size / Weight'
    : 'Select Option';

  return (
    <div id="product-category-options" className="space-y-4 py-1">
      {/* Variants Selection Header */}
      {displayVariants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-900 font-heading">
              {optionTypeLabel}
              {selectedVariant && (
                <>
                  :{' '}
                  <span className="text-[#2962FF] font-black">
                    {selectedVariant.value}
                  </span>
                </>
              )}
            </span>

            {/* Size Chart Button for Fashion Products */}
            {isFashion && onOpenSizeChart && (
              <button
                type="button"
                onClick={onOpenSizeChart}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:underline cursor-pointer font-heading"
              >
                <Ruler className="w-4 h-4" />
                <span>Size Chart</span>
              </button>
            )}
          </div>

          {variantError && (
            <p className="text-xs font-semibold text-rose-600 font-body">
              {variantError}
            </p>
          )}

          {/* Variant Option Chips */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {displayVariants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={!v.inStock}
                  onClick={() => onSelectVariant(v)}
                  className={`min-w-[42px] sm:min-w-[46px] h-9 sm:h-9.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer font-heading ${
                    isSelected
                      ? 'bg-[#2962FF] text-white shadow-soft-sm ring-2 ring-[#2962FF]/30 border-2 border-[#2962FF] scale-[1.02]'
                      : v.inStock
                      ? 'bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-[#2962FF]/50'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed line-through opacity-60'
                  }`}
                >
                  <span>{v.value}</span>
                  {v.priceDelta && v.priceDelta > 0 ? (
                    <span className="ml-1 text-xs opacity-80">(+₹{v.priceDelta})</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
