import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDestination } from '../../context/DestinationContext';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import {
  LayoutGrid, Shirt, Sparkles, Smartphone, Laptop,
  HeartHandshake, Armchair, Tv, Gamepad2, Dumbbell,
  BookOpen, Building, ShoppingBasket, Car, MoreHorizontal,
  Apple, Milk, Cookie, Coffee, ShieldCheck, UtensilsCrossed,
  Sparkle, Brush, Box, Tag, ChevronsLeft
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Shirt: <Shirt className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Sparkles: <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Smartphone: <Smartphone className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Laptop: <Laptop className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  HeartHandshake: <HeartHandshake className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Armchair: <Armchair className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Tv: <Tv className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Gamepad2: <Gamepad2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Dumbbell: <Dumbbell className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  BookOpen: <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Building: <Building className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  ShoppingBasket: <ShoppingBasket className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Car: <Car className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  MoreHorizontal: <MoreHorizontal className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Apple: <Apple className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Milk: <Milk className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Cookie: <Cookie className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Coffee: <Coffee className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  ShieldCheck: <ShieldCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Sparkle: <Sparkle className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Brush: <Brush className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Box: <Box className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
  Tag: <Tag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />,
};

const CATEGORY_STYLES: Record<string, { bg: string; text: string }> = {
  all: { bg: 'bg-[#2962FF] text-white', text: '#2962FF' },
  'men-fashion': { bg: 'bg-blue-50 text-blue-600', text: '#2563EB' },
  'women-fashion': { bg: 'bg-pink-50 text-pink-500', text: '#DB2777' },
  electronics: { bg: 'bg-sky-50 text-sky-600', text: '#0284C7' },
  'home-living': { bg: 'bg-indigo-50 text-indigo-600', text: '#4F46E5' },
  beauty: { bg: 'bg-rose-50 text-rose-500', text: '#E11D48' },
  appliances: { bg: 'bg-cyan-50 text-cyan-600', text: '#0891B2' },
  'toys-games': { bg: 'bg-orange-50 text-orange-500', text: '#EA580C' },
  'sports-fitness': { bg: 'bg-indigo-50 text-indigo-600', text: '#4F46E5' },
  books: { bg: 'bg-sky-50 text-sky-600', text: '#0284C7' },
  furniture: { bg: 'bg-amber-50 text-amber-600', text: '#D97706' },
  groceries: { bg: 'bg-emerald-50 text-emerald-600', text: '#16A34A' },
  automotive: { bg: 'bg-purple-50 text-purple-600', text: '#9333EA' },
  more: { bg: 'bg-zinc-100 text-zinc-600', text: '#52525B' },
  mobiles: { bg: 'bg-amber-50 text-amber-600', text: '#D97706' },
  'baby-care': { bg: 'bg-rose-50 text-rose-500', text: '#E11D48' },
  'pet-supplies': { bg: 'bg-amber-50 text-amber-700', text: '#B45309' },
  jewellery: { bg: 'bg-amber-50 text-amber-500', text: '#D97706' },
  'gift-cards': { bg: 'bg-purple-50 text-purple-600', text: '#9333EA' },
  'fruits-vegetables': { bg: 'bg-emerald-50 text-emerald-600', text: '#059669' },
  'dairy-breakfast': { bg: 'bg-blue-50 text-blue-600', text: '#2563EB' },
  'snacks-beverages': { bg: 'bg-amber-50 text-amber-600', text: '#D97706' },
  'household-cleaning': { bg: 'bg-teal-50 text-teal-600', text: '#0D9488' },
  'personal-care': { bg: 'bg-rose-50 text-rose-600', text: '#E11D48' },
  'kitchen-essentials': { bg: 'bg-orange-50 text-orange-600', text: '#EA580C' },
  'home-cleaning': { bg: 'bg-purple-50 text-[#6C3FC5]', text: '#6C3FC5' },
  'kitchen-cleaning': { bg: 'bg-amber-50 text-amber-600', text: '#D97706' },
  'bathroom-cleaning': { bg: 'bg-cyan-50 text-cyan-600', text: '#0891B2' },
  'sweeping-mopping': { bg: 'bg-emerald-50 text-emerald-600', text: '#059669' },
  'utensil-cleaning': { bg: 'bg-indigo-50 text-indigo-600', text: '#4F46E5' },
  'laundry-ironing': { bg: 'bg-sky-50 text-sky-600', text: '#0284C7' },
  'home-organization': { bg: 'bg-pink-50 text-pink-600', text: '#DB2777' },
};

export const CategoryNavigation: React.FC = () => {
  const { destination, theme } = useDestination();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(100);
  const [needsMore, setNeedsMore] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    categoryService.getCategories(destination).then(setCategories);
    setIsMoreExpanded(false);
  }, [destination]);

  const activeColor = theme?.primary || '#2962FF';
  const productCategories = categories.filter((c) => c.slug !== 'more');

  // Dynamically calculate the maximum number of categories that fit in the container
  const recalculateVisibleCategories = useCallback(() => {
    if (!scrollRef.current || !measureContainerRef.current) return;

    const scrollEl = scrollRef.current;
    const computedStyle = window.getComputedStyle(scrollEl);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const availableWidth = scrollEl.clientWidth - paddingLeft - paddingRight;

    if (availableWidth <= 0) return;

    const measureChildren = Array.from(measureContainerRef.current.children) as HTMLElement[];
    if (measureChildren.length === 0) return;

    // The last element in the measurement container is the More control
    const moreElement = measureChildren[measureChildren.length - 1];
    const moreWidth = moreElement.getBoundingClientRect().width || 48;

    // Category items (all except the last More control)
    const categoryElements = measureChildren.slice(0, measureChildren.length - 1);
    const itemWidths = categoryElements.map((el) => el.getBoundingClientRect().width);

    const MIN_GAP = 16; // Minimum comfortable gap between items

    if (itemWidths.length === 0) {
      setVisibleCount(0);
      setNeedsMore(false);
      return;
    }

    // Calculate total width if ALL categories are rendered together
    const totalAllWidth = itemWidths.reduce(
      (acc, w, idx) => acc + w + (idx > 0 ? MIN_GAP : 0),
      0
    );

    // If every category fits within the available width with minimum gap, show all and hide More completely
    if (totalAllWidth <= availableWidth) {
      setVisibleCount(itemWidths.length);
      setNeedsMore(false);
      return;
    }

    // Otherwise, find the maximum number of categories that fit alongside More:
    let runningWidth = 0;
    let fitCount = 0;

    for (let i = 0; i < itemWidths.length; i++) {
      const itemWidth = itemWidths[i];
      const gapBefore = i > 0 ? MIN_GAP : 0;
      const widthIfIncludeThisAndMore = runningWidth + gapBefore + itemWidth + MIN_GAP + moreWidth;

      if (widthIfIncludeThisAndMore <= availableWidth) {
        runningWidth += gapBefore + itemWidth;
        fitCount = i + 1;
      } else {
        break;
      }
    }

    // Ensure at least 1 category is shown
    fitCount = Math.max(1, fitCount);

    setVisibleCount((prev) => (prev !== fitCount ? fitCount : prev));
    setNeedsMore((prev) => {
      const needed = fitCount < itemWidths.length;
      return prev !== needed ? needed : prev;
    });
  }, []);

  // Re-measure and update visible categories on container resize, window resize, font loading, or category changes
  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        recalculateVisibleCategories();
      });
    };

    handleResize();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        handleResize();
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [categories, destination, recalculateVisibleCategories]);

  // Visible categories:
  // - When expanded: show all categories
  // - When collapsed: show only the dynamically calculated count that fits
  const visibleCategories = isMoreExpanded
    ? productCategories
    : productCategories.slice(0, visibleCount);

  const handleExpand = () => {
    setIsMoreExpanded(true);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleCollapse = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    setIsMoreExpanded(false);
  };

  // Reusable toggle control: Identical visual design for both More and Less
  const renderToggleControl = (type: 'more' | 'less') => {
    const isLess = type === 'less';
    return (
      <button
        key={`category-toggle-${type}`}
        type="button"
        onClick={isLess ? handleCollapse : handleExpand}
        className="group flex flex-col items-center shrink-0 text-center py-0.5 transition-all select-none relative focus:outline-hidden cursor-pointer"
        title={isLess ? 'Show less categories' : 'Show more categories'}
        aria-label={isLess ? 'Show less categories' : 'Show more categories'}
      >
        {/* Icon box - identical between More and Less */}
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-200 mb-1 bg-zinc-100 text-zinc-600 hover:scale-105 hover:bg-zinc-200 group-hover:text-zinc-950"
        >
          {isLess ? (
            <ChevronsLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          ) : (
            <MoreHorizontal className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          )}
        </div>

        {/* Label - identical typography, spacing, and alignment */}
        <span
          className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-colors leading-tight text-zinc-700 group-hover:text-zinc-950"
        >
          {isLess ? 'Less' : 'More'}
        </span>
      </button>
    );
  };

  return (
    <nav
      aria-label="Category navigation"
      className="bg-white border-b border-zinc-200/80 shadow-2xs relative z-30 group/nav"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 relative">
        {/* 
          HORIZONTAL ROW OF CATEGORIES:
          - Dynamically displays the maximum number of categories that can fit in available space.
          - When collapsed: uses justify-between so categories and More perfectly span from left to right padding.
          - When expanded: horizontally scrollable with consistent gap-5.
          - If all categories fit, More is completely hidden.
        */}
        <div
          ref={scrollRef}
          className={`w-full flex items-center ${
            isMoreExpanded ? 'gap-5 overflow-x-auto' : 'justify-between overflow-x-hidden'
          } no-scrollbar scroll-smooth py-2 select-none`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Category Links */}
          {visibleCategories.map((cat, idx) => {
            const isAll = cat.slug === 'all';
            const isActive =
              (isAll && (location.pathname === `/${destination}` || location.pathname === '/')) ||
              location.pathname.includes(`/category/${cat.slug}`);

            const targetLink =
              isAll
                ? `/${destination}`
                : destination === 'nest'
                ? `/nest?category=${cat.slug}`
                : `/category/${cat.slug}`;

            const style = CATEGORY_STYLES[cat.slug] || { bg: 'bg-zinc-100 text-zinc-700', text: '#202124' };

            return (
              <Link
                key={cat.id || idx}
                to={targetLink}
                className="group flex flex-col items-center shrink-0 text-center py-0.5 transition-all select-none relative focus:outline-hidden"
              >
                {/* Icon box - matching reference screenshot */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-200 mb-1 ${
                    isAll && isActive
                      ? 'shadow-xs scale-105'
                      : isActive
                      ? 'ring-2 ring-offset-1 scale-105 shadow-2xs'
                      : 'hover:scale-105 transition-transform'
                  } ${
                    isAll
                      ? destination === 'haatza'
                        ? 'bg-[#2962FF] text-white shadow-xs'
                        : destination === 'lite'
                        ? 'bg-[#238636] text-white shadow-xs'
                        : 'bg-[#6C3FC5] text-white shadow-xs'
                      : style.bg
                  }`}
                  style={{
                    outlineColor: isActive ? activeColor : undefined,
                  }}
                >
                  {ICON_MAP[cat.iconName] || <LayoutGrid className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
                </div>

                {/* Label text */}
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-colors leading-tight ${
                    isActive ? 'font-black' : 'text-zinc-700 group-hover:text-zinc-950'
                  }`}
                  style={{ color: isActive ? activeColor : undefined }}
                >
                  {cat.name}
                </span>

                {/* Active Underline Indicator Bar - spans horizontally across content area */}
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 inset-x-0 h-0.5 rounded-full transition-all"
                    style={{ backgroundColor: activeColor }}
                  />
                )}
              </Link>
            );
          })}

          {/* 
            MORE / LESS TOGGLE CONTROL:
            - When expanded: exactly one 'Less' control at the very end
            - When collapsed: exactly one 'More' control only if additional categories exist that don't fit
            - If all categories fit without overflow: no toggle button is rendered
          */}
          {isMoreExpanded
            ? renderToggleControl('less')
            : needsMore
            ? renderToggleControl('more')
            : null}
        </div>
      </div>

      {/* Hidden offscreen measurement row for exact sub-pixel item width detection */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] invisible pointer-events-none flex items-center gap-5 whitespace-nowrap"
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {productCategories.map((cat, idx) => (
          <div
            key={`measure-${cat.id || idx}`}
            className="group flex flex-col items-center shrink-0 text-center py-0.5 select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl mb-1" />
            <span className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap leading-tight">
              {cat.name}
            </span>
          </div>
        ))}
        <div
          key="measure-more-toggle"
          className="group flex flex-col items-center shrink-0 text-center py-0.5 select-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl mb-1" />
          <span className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap leading-tight">
            More
          </span>
        </div>
      </div>
    </nav>
  );
};
