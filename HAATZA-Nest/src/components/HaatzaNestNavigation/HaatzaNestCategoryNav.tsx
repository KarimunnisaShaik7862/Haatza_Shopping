import React from 'react';
import { Link } from 'react-router-dom';
import { haatzaNestCategories } from '../../data/nestData';

export const HaatzaNestCategoryNav: React.FC = () => {
  return (
    <nav className="bg-white border-b border-zinc-200/70 overflow-x-auto scrollbar-none py-2">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 sm:gap-3 shrink-0">
        {haatzaNestCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/services?category=${cat.slug}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-zinc-200/80 hover:border-purple-400 hover:bg-purple-50/50 transition-all text-xs font-bold text-zinc-700 hover:text-[#6C3FC5] shrink-0"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
              loading="lazy"
            />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
