import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';
import { SectionHeader } from '../../common/SectionHeader';
import { DealProductCard } from '../../products/DealProductCard';

interface DealsOfTheDayWidgetProps {
  deals: Product[];
  onQuickView?: (product: Product) => void;
  className?: string;
  title?: string;
  viewAllLink?: string;
  subtitle?: string;
}

export const DealsOfTheDayWidget: React.FC<DealsOfTheDayWidgetProps> = ({
  deals,
  className = '',
  title = 'Deals of the day',
  viewAllLink = '/deals-of-the-day',
  subtitle,
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Hover state tracking
  const [isRowHovered, setIsRowHovered] = useState(false);
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null);

  // Touch and interaction state
  const [isTouchActive, setIsTouchActive] = useState(false);
  const touchResumeTimeoutRef = useRef<number | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Triplicate the deals array to ensure a perfectly seamless infinite scroll loop
  const displayDeals = useMemo(() => {
    if (!deals || deals.length === 0) return [];
    return [...deals, ...deals, ...deals];
  }, [deals]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate the pixel width of one complete set of deals
  const getSingleSetWidth = (): number => {
    const container = scrollContainerRef.current;
    if (!container || deals.length === 0) return 0;
    const firstCard = itemRefs.current[0];
    const secondSetFirstCard = itemRefs.current[deals.length];
    if (firstCard && secondSetFirstCard) {
      const diff = secondSetFirstCard.offsetLeft - firstCard.offsetLeft;
      if (diff > 0) return diff;
    }
    return container.scrollWidth / 3;
  };

  // Continuous smooth horizontal auto-scrolling with seamless loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || prefersReducedMotion || deals.length === 0) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const scrollSpeed = 36; // 36px per second: smooth, graceful, easily readable

    const step = (timestamp: number) => {
      const elapsed = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      // Cap delta time to prevent jumping when tab is backgrounded
      const dt = Math.min(elapsed, 0.1);

      // Auto-scroll ONLY when cursor is not hovering the row/cards and user is not touching/dragging
      if (!isRowHovered && !isTouchActive && !isDraggingRef.current) {
        container.scrollLeft += scrollSpeed * dt;

        const setWidth = getSingleSetWidth();
        if (setWidth > 0) {
          if (container.scrollLeft >= setWidth) {
            container.scrollLeft -= setWidth;
          } else if (container.scrollLeft < 0) {
            container.scrollLeft += setWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRowHovered, isTouchActive, prefersReducedMotion, deals.length]);

  // Clean up touch timeout on unmount
  useEffect(() => {
    return () => {
      if (touchResumeTimeoutRef.current) {
        clearTimeout(touchResumeTimeoutRef.current);
      }
    };
  }, []);

  // Touch event handlers: pause during touch/swipe, resume smoothly after interaction ends
  const handleTouchStart = () => {
    if (touchResumeTimeoutRef.current) {
      clearTimeout(touchResumeTimeoutRef.current);
      touchResumeTimeoutRef.current = null;
    }
    setIsTouchActive(true);
  };

  const handleTouchEnd = () => {
    if (touchResumeTimeoutRef.current) {
      clearTimeout(touchResumeTimeoutRef.current);
    }
    touchResumeTimeoutRef.current = window.setTimeout(() => {
      setIsTouchActive(false);
    }, 1000);
  };

  // Mouse drag handlers for smooth manual interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftStartRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftStartRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleSelectOptions = (e: React.MouseEvent, slug: string) => {
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  if (!deals || deals.length === 0) return null;

  return (
    <section
      aria-label="Deals of the day"
      className={`w-full py-5 sm:py-7 ${className}`}
    >
      {/* Scoped CSS for hidden scrollbar without disabling horizontal scrolling */}
      <style>{`
        .deals-hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .deals-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* =========================================================================
          01. SECTION HEADER
          - Heading with View All link
          ========================================================================= */}
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllLink={viewAllLink}
        className="mb-4 sm:mb-6"
      />

      {/* =========================================================================
          02. CONTINUOUS HORIZONTAL SCROLL ROW WITH SEAMLESS LOOP
          - Seamless RAF auto-scrolling smoothly left to right
          - Instant pause when cursor enters row or any card
          - Resumes smoothly ONLY when pointer leaves the entire row
          - Touch pause & smooth resume
          - Normal card scale (no small-to-big entrance scale animation)
          - scale(1.05) hover highlight with subtle glow and NO rectangular card background
          - No badges, star ratings, or navigation arrows
          ========================================================================= */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="Scrollable horizontal deals of the day"
        onMouseEnter={() => setIsRowHovered(true)}
        onMouseLeave={() => {
          setIsRowHovered(false);
          setHoveredCardKey(null);
          handleMouseUpOrLeave();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className="deals-hide-scrollbar flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 md:gap-[18px] overflow-x-auto overflow-y-hidden py-4 px-1 focus:outline-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {displayDeals.map((product, index) => {
          const cardKey = `${product.id}-${index}`;
          const isCardHovered = hoveredCardKey === cardKey;
          const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

          return (
            <div
              key={cardKey}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0"
            >
              <DealProductCard
                product={product}
                isHovered={isCardHovered}
                onMouseEnter={() => {
                  setIsRowHovered(true);
                  setHoveredCardKey(cardKey);
                }}
                onMouseLeave={() => {
                  if (hoveredCardKey === cardKey) {
                    setHoveredCardKey(null);
                  }
                }}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
