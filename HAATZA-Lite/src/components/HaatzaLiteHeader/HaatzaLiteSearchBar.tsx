import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, X } from 'lucide-react';

export const HaatzaLiteSearchBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/lite/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className={`relative flex-1 w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for Products, Brands and More"
          aria-label="Search products, brands and categories"
          className="w-full pl-10 pr-20 py-2.5 bg-white hover:bg-[#F8FAF9] focus:bg-white text-sm text-[#111D15] rounded-2xl border border-[#E5EBE6] focus:outline-hidden transition-all shadow-2xs placeholder:text-slate-400 font-normal focus:ring-2 focus:ring-[#0C831F]/25 focus:border-[#0C831F]"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
            title="Search by voice"
            aria-label="Search by voice"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

