import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export const HaatzaNestSearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/nest/services?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for "deep clean", "kitchen degreasing", "bathroom", "mopping"...'
          className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white border border-transparent focus:border-purple-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-zinc-400 font-medium"
        />
      </div>
    </form>
  );
};
