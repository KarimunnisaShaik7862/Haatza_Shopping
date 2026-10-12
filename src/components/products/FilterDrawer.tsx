import React from 'react';
import { FilterState } from '../../types';
import { FilterSidebar } from './FilterSidebar';
import { X } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filter: FilterState;
  onChange: (updated: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filter,
  onChange,
  onReset,
  availableBrands,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <h3 className="font-bold text-base text-[#202124]">Refine & Filter</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <FilterSidebar
            filter={filter}
            onChange={onChange}
            onReset={onReset}
            availableBrands={availableBrands}
            className="border-none p-0 shadow-none"
          />
        </div>

        <div className="p-4 border-t border-zinc-200 bg-zinc-50 flex gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-2.5 rounded-xl border border-zinc-300 font-semibold text-xs text-zinc-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#E53935] font-semibold text-xs text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
