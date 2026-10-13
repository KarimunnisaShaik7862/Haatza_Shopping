import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.slug}`}
          className="group relative rounded-2xl overflow-hidden bg-white border border-[#E5EAF3] hover:border-[#DBEAFE] hover:shadow-soft transition-all duration-300 flex flex-col"
        >
          <div className="relative aspect-4/3 overflow-hidden bg-[#F5F7FF]">
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <span className="absolute bottom-2.5 left-2.5 text-white font-bold text-xs sm:text-sm drop-shadow-sm">
              {cat.name}
            </span>
          </div>

          <div className="p-2.5 flex items-center justify-between text-[11px] text-[#64748B] bg-white">
            <span className="truncate">{cat.itemCount}+ Items</span>
            <span className="text-[#2962FF] font-bold group-hover:translate-x-0.5 transition-transform">
              Shop →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};
