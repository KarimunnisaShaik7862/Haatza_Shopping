import React from 'react';
import { FashionCategoryGroup } from '../../data/mensFashionCategories.data';
import { CategoryCard } from './CategoryCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface CategoryGroupSectionProps {
  group: FashionCategoryGroup;
  sectionIndex: number;
}

export const CategoryGroupSection: React.FC<CategoryGroupSectionProps> = ({
  group,
  sectionIndex,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px',
  });

  return (
    <section
      id={group.id}
      ref={ref}
      className="scroll-mt-32 space-y-5"
      aria-label={group.title}
    >
      {/* 01. Group Header with Scroll Fade */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-zinc-200/90 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: group.accentColor || '#2962FF' }}
            />
            <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-zinc-500 font-heading">
              {group.tag}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-900 tracking-tight font-heading">
            {group.title}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl font-body">
            {group.description}
          </p>
        </div>

        <div className="text-xs font-semibold text-zinc-500 shrink-0">
          Showing {group.categories.length} categories
        </div>
      </div>

      {/* 02. Responsive Staggered Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3.5 sm:gap-5">
        {group.categories.map((cat, idx) => (
          <CategoryCard
            key={cat.id}
            item={cat}
            index={idx}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
};
