import React from 'react';
import { Link } from 'react-router-dom';

export interface CompactCategoryCardProps {
  id?: string;
  name: string;
  description?: string;
  image: string;
  link: string;
  badge?: string;
  itemCount?: string;
  accentColor?: string;
  index?: number;
  isVisible?: boolean;
}

export const CompactCategoryCard: React.FC<CompactCategoryCardProps> = ({
  name,
  image,
  link,
}) => {
  return (
    <Link
      to={link}
      className="group flex flex-col items-center text-center cursor-pointer min-w-[76px] sm:min-w-0 flex-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-2xl p-1 transition-colors"
    >
      {/* 01. Double Circle (2 Circles Effect) Container - Only first circle turns light blue on cursor hover */}
      <div
        className="relative w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full aspect-square p-1 sm:p-1.5 border-2 border-zinc-300 group-hover:border-blue-400 flex items-center justify-center shrink-0 mx-auto bg-white shadow-2xs group-hover:shadow-xs transition-colors duration-200"
      >
        {/* Inner Second Circle - Stays grey, never turns blue */}
        <div
          className="w-full h-full rounded-full border border-zinc-200 overflow-hidden flex items-center justify-center bg-white"
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-1.5 sm:p-2 object-center rounded-full transform group-hover:scale-108 transition-transform duration-300 ease-out"
          />
        </div>
      </div>

      {/* 02. Category Name Directly Below Circle */}
      <span className="mt-2 text-center text-xs sm:text-sm font-semibold text-zinc-800 group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight max-w-[110px] sm:max-w-none">
        {name}
      </span>
    </Link>
  );
};

