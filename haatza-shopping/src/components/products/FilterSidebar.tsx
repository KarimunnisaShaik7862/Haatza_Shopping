import React from 'react';
import { FilterState } from '../../types';
import { Star, X } from 'lucide-react';

interface FilterSidebarProps {
  filter: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
  className?: string;
}

const FASHION_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filter,
  onChange,
  onReset,
  availableBrands,
  className = '',
}) => {
  const handleBrandToggle = (brand: string) => {
    const brands = filter.brands.includes(brand)
      ? filter.brands.filter((b) => b !== brand)
      : [...filter.brands, brand];
    onChange({ ...filter, brands });
  };

  const handleSizeToggle = (size: string) => {
    const currentSizes = filter.sizes || [];
    const sizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    onChange({ ...filter, sizes });
  };

  const handleRatingSelect = (rating: number) => {
    const minRating = filter.minRating === rating ? undefined : rating;
    onChange({ ...filter, minRating });
  };

  const handleDiscountToggle = (minDisc: number) => {
    const discountRanges = filter.discountRanges.includes(minDisc)
      ? filter.discountRanges.filter((d) => d !== minDisc)
      : [...filter.discountRanges, minDisc];
    onChange({ ...filter, discountRanges });
  };

  const hasActiveFilters =
    filter.brands.length > 0 ||
    filter.minRating !== undefined ||
    filter.discountRanges.length > 0 ||
    filter.inStockOnly ||
    (filter.sizes && filter.sizes.length > 0) ||
    (filter.minPrice !== undefined && filter.minPrice > 0) ||
    (filter.maxPrice !== undefined && filter.maxPrice < 10000);

  return (
    <aside className={`bg-white rounded-2xl border border-[#E5EAF3] p-5 space-y-6 shadow-2xs ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <h3 className="font-bold text-sm uppercase tracking-wider text-[#172033]">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Availability / In Stock */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Availability</h4>
        <label className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={!!filter.inStockOnly}
            onChange={(e) => onChange({ ...filter, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#2962FF] focus:ring-[#2962FF] border-[#E5EAF3]"
          />
          <span>Exclude Out of Stock</span>
        </label>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-zinc-100">
        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Price Range</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[10px] text-zinc-400 block mb-1">Min (₹)</span>
            <input
              type="number"
              min={0}
              max={10000}
              value={filter.minPrice || ''}
              placeholder="0"
              onChange={(e) =>
                onChange({
                  ...filter,
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5EAF3] text-xs focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 focus:outline-hidden"
            />
          </div>
          <span className="text-zinc-400 text-xs mt-4">-</span>
          <div className="flex-1">
            <span className="text-[10px] text-zinc-400 block mb-1">Max (₹)</span>
            <input
              type="number"
              min={0}
              max={25000}
              value={filter.maxPrice || ''}
              placeholder="10000"
              onChange={(e) =>
                onChange({
                  ...filter,
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5EAF3] text-xs focus:border-[#2962FF] focus:ring-2 focus:ring-[#2962FF]/15 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Size Filter Pills (Matching Image 5) */}
      <div className="space-y-2.5 pt-4 border-t border-zinc-100">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Size</h4>
          {filter.sizes && filter.sizes.length > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filter, sizes: [] })}
              className="text-[11px] text-[#2962FF] hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {FASHION_SIZES.map((size) => {
            const isSelected = (filter.sizes || []).includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`min-w-8 h-8 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#2962FF] text-white shadow-2xs'
                    : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 hover:border-zinc-300'
                }`}
                aria-pressed={isSelected}
              >
                {size}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-zinc-400">Also: colour, rating, discount, availability</p>
      </div>

      {/* Brands Filter */}
      {availableBrands.length > 0 && (
        <div className="space-y-2.5 pt-4 border-t border-zinc-100">
          <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Brands</h4>
          <div className="max-h-48 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {availableBrands.map((brand) => {
              const checked = filter.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer select-none hover:text-[#172033]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded text-[#2962FF] focus:ring-[#2962FF] border-[#E5EAF3]"
                  />
                  <span className="truncate">{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Customer Ratings Filter */}
      <div className="space-y-2 pt-4 border-t border-zinc-100">
        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Customer Rating</h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => {
            const isSelected = filter.minRating === stars;
            return (
              <button
                key={stars}
                type="button"
                onClick={() => handleRatingSelect(stars)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                  isSelected
                    ? 'bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] font-bold'
                    : 'hover:bg-zinc-50 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < stars ? 'fill-current' : 'text-zinc-200 stroke-zinc-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{stars}★ & above</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="space-y-2 pt-4 border-t border-zinc-100">
        <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Discount</h4>
        <div className="space-y-1.5">
          {[50, 40, 30, 20, 10].map((disc) => {
            const isSelected = filter.discountRanges.includes(disc);
            return (
              <label
                key={disc}
                className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer select-none hover:text-[#172033]"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleDiscountToggle(disc)}
                  className="w-4 h-4 rounded text-[#2962FF] focus:ring-[#2962FF] border-[#E5EAF3]"
                />
                <span>{disc}% off or more</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
