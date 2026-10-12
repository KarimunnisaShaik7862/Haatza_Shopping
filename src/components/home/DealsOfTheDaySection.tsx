import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';
import { CountdownClock } from './CountdownClock';

interface DealsOfTheDaySectionProps {
  deals: Product[];
  onQuickView?: (product: Product) => void;
}

export const DealsOfTheDaySection: React.FC<DealsOfTheDaySectionProps> = React.memo(({
  deals,
  onQuickView,
}) => {
  if (!deals || deals.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="Deals of the Day">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#A60000] to-[#D99A9A] text-white flex items-center justify-center shadow-xs">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                Deals of the Day
              </h2>
              {/* Isolated Countdown Pill */}
              <CountdownClock
                initialHours={7}
                initialMinutes={31}
                initialSeconds={20}
                variant="pill"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-body">
              Handpicked top-rated products with verified 24-hour exclusive markdowns.
            </p>
          </div>
        </div>

        <Link
          to="/category/deals"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#A60000] hover:text-[#880000] transition-colors group self-start sm:self-auto font-heading"
        >
          <span>View All Deals</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Standardized Carousel with Far-Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {deals.map((product) => (
          <div key={product.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard product={product} onQuickView={onQuickView} />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

DealsOfTheDaySection.displayName = 'DealsOfTheDaySection';
