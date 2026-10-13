import React from 'react';

export interface SearchFiltersProps {
  totalResults: number;
  query: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ totalResults, query }) => {
  return (
    <div className="flex items-center gap-2 text-xs text-[#64748B]">
      <span>Showing <strong>{totalResults}</strong> items for</span>
      <span className="font-bold text-[#172033]">"{query}"</span>
    </div>
  );
};

export default SearchFilters;
