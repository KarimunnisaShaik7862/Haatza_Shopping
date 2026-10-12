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
    (filter.minPrice !== undefined && filter.minPrice > 0) ||
    (filter.maxPrice !== undefined && filter.maxPrice < 10000);

  return (
    <aside className={`bg-white rounded-2xl border border-zinc-200 p-5 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <h3 className="font-bold text-sm uppercase tracking-wider text-[#202124]">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-bold text-[#E53935] hover:underline flex items-center gap-1"
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
            className="w-4 h-4 rounded text-[#E53935] focus:ring-[#E53935] border-zinc-300"
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
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs focus:border-[#E53935] focus:outline-hidden"
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
              className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 text-xs focus:border-[#E53935] focus:outline-hidden"
            />
          </div>
        </div>
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
                  className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer select-none hover:text-[#202124]"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded text-[#E53935] focus:ring-[#E53935] border-zinc-300"
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
                    ? 'bg-[#FFEBEE] text-[#E53935] font-bold'
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
                className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer select-none hover:text-[#202124]"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleDiscountToggle(disc)}
                  className="w-4 h-4 rounded text-[#E53935] focus:ring-[#E53935] border-zinc-300"
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
