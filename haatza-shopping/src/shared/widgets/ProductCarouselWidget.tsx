import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductCarouselWidgetProps {
  children: React.ReactNode;
  scrollDistance?: number;
  className?: string;
  showScrollbar?: boolean;
}

export const ProductCarouselWidget: React.FC<ProductCarouselWidgetProps> = ({
  children,
  scrollDistance = 300,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const nextCanLeft = scrollLeft > 10;
    const nextCanRight = scrollLeft + clientWidth < scrollWidth - 10;
    setCanScrollLeft((prev) => (prev !== nextCanLeft ? nextCanLeft : prev));
    setCanScrollRight((prev) => (prev !== nextCanRight ? nextCanRight : prev));
  };

  const handleTrackScroll = () => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      checkScrollBounds();
      rafId.current = null;
    });
  };

  useEffect(() => {
    checkScrollBounds();
    window.addEventListener('resize', checkScrollBounds);
    return () => {
      window.removeEventListener('resize', checkScrollBounds);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const distance = direction === 'left' ? -scrollDistance : scrollDistance;
    scrollRef.current.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
    setTimeout(checkScrollBounds, 350);
  };

  return (
    <div className={`relative group/carousel ${className}`}>
      {/* Left Navigation Arrow */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="hidden sm:flex absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-slate-200/80 items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Scrollable Track with Generous Padding to Prevent Elevation/Shadow Clipping */}
      <div
        ref={scrollRef}
        onScroll={handleTrackScroll}
        className="flex items-stretch gap-3 sm:gap-4 lg:gap-5 overflow-x-auto no-scrollbar scroll-smooth pt-3 pb-4.5 px-1.5 -my-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>

      {/* Right Navigation Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="hidden sm:flex absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg border border-slate-200/80 items-center justify-center text-slate-700 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}
    </div>
  );
};

export { ProductCarouselWidget as ProductCarouselTrack };
export default ProductCarouselWidget;

