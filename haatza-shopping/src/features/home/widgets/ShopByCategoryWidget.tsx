import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { SectionHeading } from '../../../components/common/SectionHeading';

export interface TopCategoryItem {
  id: string;
  name: string;
  slug: string;
  link: string;
  image: string;
  accentColor: string;
}

export const DEFAULT_TOP_CATEGORIES: TopCategoryItem[] = [
  {
    id: 'top-cat-men',
    name: 'Men Fashion',
    slug: 'men-fashion',
    link: '/category/men-fashion',
    image: '/images/top-categories/men-fashion.png?v=20261030b',
    accentColor: '#8492A6',
  },
  {
    id: 'top-cat-women',
    name: 'Women Fashion',
    slug: 'women-fashion',
    link: '/category/women-fashion',
    image: '/images/top-categories/women-fashion.png?v=20261031_kurti',
    accentColor: '#FB7185',
  },
  {
    id: 'top-cat-kids',
    name: 'Kids Fashion',
    slug: 'kids',
    link: '/category/kids',
    image: '/images/top-categories/kids-fashion.png?v=20261030b',
    accentColor: '#F59E0B',
  },
  {
    id: 'top-cat-electronics',
    name: 'Electronics',
    slug: 'electronics',
    link: '/category/electronics',
    image: '/images/top-categories/electronics.png?v=20261030b',
    accentColor: '#38BDF8',
  },
  {
    id: 'top-cat-home',
    name: 'Home & Living',
    slug: 'home-living',
    link: '/category/home-living',
    image: '/images/top-categories/home-living.png?v=20261030b',
    accentColor: '#2563EB',
  },
  {
    id: 'top-cat-beauty',
    name: 'Beauty',
    slug: 'beauty',
    link: '/category/beauty',
    image: '/images/top-categories/beauty.png?v=20261030b',
    accentColor: '#A855F7',
  },
  {
    id: 'top-cat-appliances',
    name: 'Appliances',
    slug: 'appliances',
    link: '/category/appliances',
    image: '/images/top-categories/appliances.png?v=20261030b',
    accentColor: '#C084FC',
  },
];

interface ShopByCategoryWidgetProps {
  categories?: any[];
  className?: string;
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
}

export const ShopByCategoryWidget: React.FC<ShopByCategoryWidgetProps> = ({
  categories,
  className = '',
  title = 'Top Categories',
  subtitle,
  showHeader = true,
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

    // Detect viewport size
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

  // Use the 7 top categories matching reference design
  const items = DEFAULT_TOP_CATEGORIES;

  return (
    <section
      ref={sectionRef}
      aria-label="Top Categories"
      className={`w-full py-2 sm:py-3.5 transition-opacity duration-500 ease-out ${className}`}
    >
      {/* 01. SECTION HEADER: TOP CATEGORIES */}
      {showHeader && (
        <div
          style={{
            transitionDuration: prefersReducedMotion ? '0ms' : '650ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className={`mb-4 sm:mb-6 transition-all will-change-transform ${
            isVisible || prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[22px]'
          }`}
        >
          <SectionHeading title={title} />
        </div>
      )}

      {/* 02. CLEAN CUTOUT TOP CATEGORIES ROW (NO BOX CARD, DIRECT SEAMLESS LAYOUT, NO SHADOWS) */}
      <div className="w-full">
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-6 lg:gap-8 items-end justify-start sm:justify-between no-scrollbar py-2 sm:py-4 px-1 sm:px-0">
          {items.map((cat, idx) => {
            const staggerDelay = isMobile ? idx * 70 + 70 : idx * 90 + 90;

            return (
              <Link
                key={cat.id}
                to={cat.link}
                style={{
                  transitionDelay:
                    isVisible && !prefersReducedMotion ? `${staggerDelay}ms` : '0ms',
                  transitionDuration: prefersReducedMotion ? '0ms' : '600ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`group flex flex-col items-center shrink-0 sm:shrink text-center select-none cursor-pointer py-1.5 px-0.5 sm:px-1 w-[82px] sm:w-auto transform will-change-transform ${
                  isVisible || prefersReducedMotion
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[20px] pointer-events-none'
                }`}
              >
                {/* 1. High-Definition Studio Cutout (Scaled down proportionally on mobile) */}
                <div className="w-14 h-14 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-38 xl:h-38 flex items-center justify-center mb-1.5 sm:mb-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain object-center transform group-hover:scale-106 group-hover:-translate-y-1.5 transition-transform duration-300 ease-out select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* 2. Bold Category Title */}
                <span className="text-xs sm:text-[15px] lg:text-base font-bold text-[#1F1F1F] group-hover:text-[#2962FF] transition-colors leading-tight font-heading whitespace-nowrap">
                  {cat.name}
                </span>

                {/* 3. Distinct Colored Accent Indicator Pill */}
                <div className="mt-1.5 sm:mt-3 flex items-center justify-center">
                  <span
                    className="h-[2.5px] sm:h-[4px] w-5 sm:w-8 rounded-full transition-all duration-300 group-hover:w-12"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategoryWidget;
