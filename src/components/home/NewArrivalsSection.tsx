import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from './ProductCarouselTrack';

interface NewArrivalsSectionProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = React.memo(({
  products,
  onQuickView,
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-4" aria-label="New Arrivals Just Landed">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#A60000] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 fill-current text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight font-heading">
                Just Landed
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#F5DCDC] text-[#A60000] text-[10px] font-black uppercase tracking-wider font-heading">
                Fresh Drops
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5 font-body">
              Discover what's new at HAATZA. Fresh styles, newest smart devices, and seasonal drops.
            </p>
          </div>
        </div>

        <Link
          to="/category/all"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#A60000] hover:text-[#880000] transition-colors group self-start sm:self-auto font-heading"
        >
          <span>Explore New Arrivals</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Standardized Carousel with Far-Edge Navigation Arrows */}
      <ProductCarouselTrack>
        {products.map((product) => (
          <div key={product.id} className="w-[210px] sm:w-[240px] md:w-[260px] shrink-0">
            <ProductCard
              product={product}
              statusBadge="NEW DROP"
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </ProductCarouselTrack>
    </section>
  );
});

NewArrivalsSection.displayName = 'NewArrivalsSection';
