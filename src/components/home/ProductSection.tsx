import React, { useRef } from 'react';
import { Product } from '../../types';
import { HomeSection } from './HomeSection';
import { ProductCard } from '../products/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  displayStyle?: 'grid' | 'carousel';
  ctaText?: string;
  ctaLink?: string;
  onQuickView?: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  subtitle,
  products,
  displayStyle = 'grid',
  ctaText,
  ctaLink,
  onQuickView,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  return (
    <HomeSection
      title={title}
      subtitle={subtitle}
      ctaText={ctaText}
      ctaLink={ctaLink}
    >
      {displayStyle === 'carousel' ? (
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-zinc-200 text-zinc-700 hover:text-[#E53935] flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Carousel Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-3"
          >
            {products.map((prod) => (
              <div key={prod.id} className="w-[240px] sm:w-[280px] shrink-0">
                <ProductCard product={prod} onQuickView={onQuickView} />
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-zinc-200 text-zinc-700 hover:text-[#E53935] flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} onQuickView={onQuickView} />
          ))}
        </div>
      )}
    </HomeSection>
  );
};
