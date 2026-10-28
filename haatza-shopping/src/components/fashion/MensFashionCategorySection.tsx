import React, { useState } from 'react';
import { MENS_FASHION_CATEGORY_GROUPS, FashionCategoryGroup } from '../../data/mensFashionCategories.data';
import { CategoryGroupSection } from './CategoryGroupSection';
import { Sparkles, Compass } from 'lucide-react';

export const MensFashionCategorySection: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');

  const totalCategories = MENS_FASHION_CATEGORY_GROUPS.reduce(
    (sum, grp) => sum + grp.categories.length,
    0
  );

  const displayedGroups: FashionCategoryGroup[] =
    selectedGroupId === 'all'
      ? MENS_FASHION_CATEGORY_GROUPS
      : MENS_FASHION_CATEGORY_GROUPS.filter((g) => g.id === selectedGroupId);

  const handleGroupSelect = (id: string) => {
    setSelectedGroupId(id);
    if (id !== 'all') {
      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 py-2">
      {/* 01. Section Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2962FF] text-xs font-bold uppercase tracking-wider shadow-2xs font-heading">
          <Sparkles className="w-3.5 h-3.5 text-[#2962FF] fill-[#2962FF]" />
          <span>Curated Style Directory • {totalCategories} Categories</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight font-heading">
          Explore Fashion & Accessories
        </h1>

        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-body">
          Find your style, from everyday essentials to statement pieces. Discover high-quality fabrics, trendsetting footwear, precision watches, and bespoke accessories.
        </p>
      </div>

      {/* 02. Quick Group Selector Pills (Sticky or Scrollable) */}
      <div className="sticky top-20 z-20 -mx-4 px-4 sm:mx-0 sm:px-0 py-2.5 bg-white/90 backdrop-blur-md border-y border-zinc-200/80 sm:border-y-0 sm:bg-transparent">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => handleGroupSelect('all')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 font-heading ${
              selectedGroupId === 'all'
                ? 'bg-[#2962FF] text-white shadow-md shadow-blue-500/20 scale-102'
                : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>All Categories ({totalCategories})</span>
          </button>

          {MENS_FASHION_CATEGORY_GROUPS.map((group) => {
            const isSelected = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => handleGroupSelect(group.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 font-heading ${
                  isSelected
                    ? 'bg-[#2962FF] text-white shadow-md shadow-blue-500/20 scale-102'
                    : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#ffffff' : group.accentColor || '#2962FF' }}
                />
                <span>
                  {group.title} ({group.categories.length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 03. All 7 Groups with Staggered Viewport Reveals */}
      <div className="space-y-12 sm:space-y-16">
        {displayedGroups.map((group, index) => (
          <CategoryGroupSection
            key={group.id}
            group={group}
            sectionIndex={index}
          />
        ))}
      </div>
    </div>
  );
};
