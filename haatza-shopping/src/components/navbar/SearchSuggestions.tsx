import React from 'react';
import { Search, TrendingUp } from 'lucide-react';

export interface SearchSuggestionsProps {
  suggestions: string[];
  trendingKeywords?: string[];
  onSelect: (keyword: string) => void;
  className?: string;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  trendingKeywords = ['Linen Shirts', 'Earbuds', 'Face Serum', 'Egyptian Cotton', 'Air Fryer'],
  onSelect,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-soft-lg border border-[#E5EAF3] py-2 overflow-hidden ${className}`}>
      {suggestions.length > 0 ? (
        <div className="py-1">
          <p className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#64748B] font-heading">
            Matching Searches
          </p>
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#172033] hover:bg-[#F5F7FF] hover:text-[#2962FF] transition-colors text-left cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-1">
          <p className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#64748B] font-heading flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#2962FF]" />
            Trending Searches
          </p>
          {trendingKeywords.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect(item)}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-[#172033] hover:bg-[#F5F7FF] hover:text-[#2962FF] transition-colors text-left cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
