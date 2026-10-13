import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ProductCarouselProps {
  children: React.ReactNode;
  scrollDistance?: number;
  className?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
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
          aria-label="Scroll left"
          className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#EEF3FF] text-[#172033] hover:text-[#2962FF] border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-soft flex items-center justify-center z-20 transition-all active:scale-95 cursor-pointer focus:outline-hidden"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Product Scroll Track */}
      <div
        ref={scrollRef}
        onScroll={handleTrackScroll}
        className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 -mx-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {children}
      </div>

      {/* Right Navigation Arrow */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
          className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#EEF3FF] text-[#172033] hover:text-[#2962FF] border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-soft flex items-center justify-center z-20 transition-all active:scale-95 cursor-pointer focus:outline-hidden"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ProductCarousel;
