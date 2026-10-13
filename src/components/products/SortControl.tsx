import React from 'react';
import { FilterState } from '../../types';
import { ArrowUpDown } from 'lucide-react';

interface SortControlProps {
  sortBy: FilterState['sortBy'];
  onChange: (sort: FilterState['sortBy']) => void;
}

export const SortControl: React.FC<SortControlProps> = ({ sortBy, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-[#64748B] hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
      </span>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as FilterState['sortBy'])}
        className="text-xs font-semibold text-[#172033] bg-white border border-[#E5EAF3] rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#2962FF] focus-ring-blue cursor-pointer shadow-soft-sm transition-all"
      >
        <option value="featured">Featured & Recommended</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
};
