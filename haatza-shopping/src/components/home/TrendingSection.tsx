import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { TrendingItemWithAnalytics } from '../../services/mock/data/promotions';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';
import { Product } from '../../types';

interface TrendingSectionProps {
  items: TrendingItemWithAnalytics[];
  onQuickView?: (product: Product) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = React.memo(({ items, onQuickView }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4" aria-label="Trending Products">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2962FF] to-[#DBEAFE] text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                Trending: Steal the Spotlight
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider font-heading">
                High Velocity
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-body">
              Top visited and highest demand products trending across India this week.
            </p>
          </div>
        </div>

        <Link
          to="/category/all"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E4ED8] transition-colors group self-start sm:self-auto font-heading"
        >
          <span>See All Trending</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Standardized Carousel with Far-Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {items.map((item) => (
          <div key={item.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard
              product={item}
              statusBadge={`#${item.trendingRank} Trending`}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

TrendingSection.displayName = 'TrendingSection';
