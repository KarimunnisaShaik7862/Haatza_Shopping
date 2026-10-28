import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FashionCategoryItem } from '../../data/mensFashionCategories.data';

interface CategoryCardProps {
  item: FashionCategoryItem;
  index: number;
  isVisible: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ item, index, isVisible }) => {
  // Stagger calculation capped at 10 items per sequence to avoid long wait
  const staggerDelay = (index % 12) * 50;

  return (
    <Link
      to={item.link}
      style={{
        transitionDelay: `${staggerDelay}ms`,
      }}
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-200/80 hover:border-[#2962FF]/40 shadow-xs hover:shadow-xl transition-all duration-500 transform will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-[0.97] pointer-events-none'
      } hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#2962FF]`}
    >
      {/* 01. Visual Image Frame with Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Gradient Shade for Text Readability & Image Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badge Indicator if Available */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-zinc-900 shadow-sm backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>{item.badge}</span>
            </span>
          </div>
        )}

        {/* Item count tag */}
        {item.itemCount && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/60 text-white backdrop-blur-sm">
              {item.itemCount}
            </span>
          </div>
        )}
      </div>

      {/* 02. Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-[#2962FF] transition-colors leading-snug line-clamp-1 font-heading">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed line-clamp-2 font-body">
            {item.description}
          </p>
        </div>

        {/* 03. Subtle CTA with Arrow */}
        <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
          <span className="text-xs font-bold text-[#2962FF] group-hover:underline">
            Explore Collection
          </span>
          <div className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-[#2962FF] flex items-center justify-center transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-[#2962FF] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
};
