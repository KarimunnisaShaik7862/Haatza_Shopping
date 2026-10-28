import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryCardItem } from '../../../types/homepageWidgets.types';
import { mockCategoryCards } from '../../../services/mock/data/homepageWidgets.data';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

interface ShopByCategoryWidgetProps {
  categories?: CategoryCardItem[];
  className?: string;
}

export const ShopByCategoryWidget: React.FC<ShopByCategoryWidgetProps> = ({
  categories = mockCategoryCards,
  className = '',
}) => {
  // Scroll reveal trigger for smooth entry animations when scrolling into view
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: false,
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect user motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Detect viewport size for optimal mobile stagger timing
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Marketplace Catalog Shop by Category"
      className={`w-full py-6 sm:py-8 transition-opacity duration-500 ease-out ${className}`}
    >
      {/* 01. SECTION HEADER: TOP CATEGORIES IN BLACK COLOR TEXT AND CHOSEN DESCRIPTION */}
      <div
        style={{
          transitionDuration: prefersReducedMotion ? '0ms' : '650ms',
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`mb-6 transition-all will-change-transform ${
          isVisible || prefersReducedMotion
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-[22px]'
        }`}
      >
        <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight font-heading">
          Top Categories
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-body max-w-2xl">
          Explore curated collections across fashion, audio, beauty, and everyday living.
        </p>
      </div>

      {/* 02. RESPONSIVE CATEGORY CARDS GRID (ALL CARDS IN A SINGLE ROW ON DESKTOP) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
        {categories.map((cat, idx) => {
          // Stagger calculation: 160ms on desktop/tablet, 100ms on mobile
          const staggerDelay = isMobile ? idx * 100 + 100 : idx * 160 + 150;

          return (
            <Link
              key={cat.id}
              to={cat.link}
              style={{
                transitionDelay:
                  isVisible && !prefersReducedMotion ? `${staggerDelay}ms` : '0ms',
                transitionDuration: prefersReducedMotion ? '0ms' : '700ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`group relative rounded-2xl overflow-hidden bg-white border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer transform will-change-transform ${
                isVisible || prefersReducedMotion
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-[26px] pointer-events-none'
              } hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#2962FF]`}
            >
              {/* Image Container with Subtle Hover Scale */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Gradient Scrim for Readable Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Bottom Info Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 text-white">
                  <h3 className="text-sm sm:text-base font-bold tracking-tight leading-snug group-hover:text-blue-200 transition-colors">
                    {cat.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-medium mt-0.5">
                    <span>{cat.itemCount}+ Products</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
