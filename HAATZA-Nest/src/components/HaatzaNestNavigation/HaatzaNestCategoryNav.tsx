import React from 'react';
import { Link } from 'react-router-dom';
import { haatzaNestCategories } from '../../data/nestData';

export const HaatzaNestCategoryNav: React.FC = () => {
  return (
    <nav className="bg-white border-b border-zinc-200/70 overflow-x-auto scrollbar-none py-2">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center gap-2 sm:gap-3 shrink-0">
        {haatzaNestCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/nest/services?category=${cat.slug}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E8E0F3] hover:border-[#7027C9] hover:bg-[#F2ECFC] transition-all text-xs font-bold text-[#625D6E] hover:text-[#7027C9] shrink-0"
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
