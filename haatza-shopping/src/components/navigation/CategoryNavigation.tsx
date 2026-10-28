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
  Sparkle, Brush, Box, Tag, ChevronsLeft, ChevronDown
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

const CATEGORY_IMAGES: Record<string, { local?: string; fallback: string }> = {
  all: {
    fallback: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=160&q=80',
  },
  'men-fashion': {
    local: '/images/categories/men-fashion.jpg',
    fallback: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=160&q=80',
  },
  'women-fashion': {
    local: '/images/categories/women-fashion.jpg',
    fallback: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=160&q=80',
  },
  electronics: {
    fallback: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=160&q=80',
  },
  'home-living': {
    fallback: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=160&q=80',
  },
  beauty: {
    fallback: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=160&q=80',
  },
  appliances: {
    fallback: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=160&q=80',
  },
  'toys-games': {
    fallback: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=160&q=80',
  },
  'sports-fitness': {
    fallback: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=160&q=80',
  },
  books: {
    fallback: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=160&q=80',
  },
  furniture: {
    fallback: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=160&q=80',
  },
  groceries: {
    fallback: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=160&q=80',
  },
  automotive: {
    fallback: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=160&q=80',
  },
  mobiles: {
    fallback: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=160&q=80',
  },
  'baby-care': {
    fallback: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=160&q=80',
  },
  'pet-supplies': {
    fallback: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=160&q=80',
  },
  jewellery: {
    fallback: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=160&q=80',
  },
  'gift-cards': {
    fallback: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=160&q=80',
  },
  // Lite Categories
  'fruits-vegetables': {
    fallback: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=160&q=80',
  },
  'dairy-breakfast': {
    fallback: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=160&q=80',
  },
  'snacks-beverages': {
    fallback: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=160&q=80',
  },
  'household-cleaning': {
    fallback: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=160&q=80',
  },
  'personal-care': {
    fallback: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=160&q=80',
  },
  'kitchen-essentials': {
    fallback: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=160&q=80',
  },
  // Nest Categories
  'home-cleaning': {
    fallback: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=160&q=80',
  },
  'kitchen-cleaning': {
    fallback: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=160&q=80',
  },
  'bathroom-cleaning': {
    fallback: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=160&q=80',
  },
  'sweeping-mopping': {
    fallback: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=160&q=80',
  },
  'utensil-cleaning': {
    fallback: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=160&q=80',
  },
  'laundry-ironing': {
    fallback: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=160&q=80',
  },
  'home-organization': {
    fallback: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=160&q=80',
  },
};

const getCategoryPhoto = (cat: Category) => {
  const custom = CATEGORY_IMAGES[cat.slug];
  if (custom) return custom;
  if (cat.image) {
    return { local: cat.image, fallback: cat.image };
  }
  return null;
};

export interface CategoryNavigationProps {
  isScrolled?: boolean;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ isScrolled = false }) => {
  const { destination, theme } = useDestination();
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(100);
  const [needsMore, setNeedsMore] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const moreContainerRef = useRef<HTMLDivElement>(null);
  const lastClientWidthRef = useRef<number>(0);
  const location = useLocation();

  useEffect(() => {
    categoryService.getCategories(destination).then(setCategories);
    setIsDropdownOpen(false);
  }, [destination]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreContainerRef.current && !moreContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
    const moreWidth = moreElement.getBoundingClientRect().width || 44;

    // Category items (all except the last More control)
    const categoryElements = measureChildren.slice(0, measureChildren.length - 1);
    const itemWidths = categoryElements.map((el) => Math.ceil(el.getBoundingClientRect().width));

    // Minimum compact gap required for clean separation without overlapping
    const minGap = window.innerWidth >= 1024 ? 6 : 6;

    // Calculate total width if ALL categories are rendered together
    const totalAllWidth = itemWidths.reduce(
      (acc, w, idx) => acc + w + (idx > 0 ? minGap : 0),
      0
    );

    // Case A: All categories fit within available width -> show all directly, hide "More"
    // Allows 4px tolerance for subpixel rounding differences across displays
    if (totalAllWidth <= availableWidth + 4) {
      setVisibleCount(itemWidths.length);
      setNeedsMore(false);
      return;
    }

    // Case B: Categories exceed available width -> calculate how many fit alongside "More"
    const overflowGap = window.innerWidth >= 768 ? 10 : 8;
    let runningWidth = 0;
    let fitCount = 0;

    for (let i = 0; i < itemWidths.length; i++) {
      const itemWidth = itemWidths[i];
      const gapBefore = i > 0 ? overflowGap : 0;
      const widthIfIncludeThisAndMore = runningWidth + gapBefore + itemWidth + overflowGap + moreWidth;

      if (widthIfIncludeThisAndMore <= availableWidth) {
        runningWidth += gapBefore + itemWidth;
        fitCount = i + 1;
      } else {
        break;
      }
    }

    fitCount = Math.max(1, fitCount);

    setVisibleCount((prev) => (prev !== fitCount ? fitCount : prev));
    setNeedsMore((prev) => {
      const needed = fitCount < itemWidths.length;
      return prev !== needed ? needed : prev;
    });
  }, []);

  // Re-measure and update visible categories on container resize, window resize, font loading, category changes, or scroll state
  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (scrollRef.current) {
          const currentWidth = scrollRef.current.clientWidth;
          if (currentWidth > 0 && currentWidth === lastClientWidthRef.current) {
            return; // Ignore vertical height changes from icon collapse/expand animation
          }
          lastClientWidthRef.current = currentWidth;
        }
        recalculateVisibleCategories();
      });
    };

    handleResize();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        handleResize();
      });
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined' && scrollRef.current
      ? new ResizeObserver(handleResize)
      : null;

    if (resizeObserver && scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [categories, destination, recalculateVisibleCategories]);

  // Visible and overflow categories:
  const visibleCategories = needsMore
    ? productCategories.slice(0, visibleCount)
    : productCategories;

  const hiddenCategories = needsMore
    ? productCategories.slice(visibleCount)
    : [];

  return (
    <nav
      aria-label="Category navigation"
      className={`relative z-30 group/nav bg-white border-t border-zinc-100 transition-shadow duration-200 ${
        isScrolled ? 'shadow-2xs' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 relative">
        <div
          ref={scrollRef}
          className="w-full flex items-center justify-between no-scrollbar py-1.5 sm:py-2 select-none overflow-x-auto"
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
            const categoryPhoto = getCategoryPhoto(cat);

            return (
              <Link
                key={cat.id || cat.slug || idx}
                to={targetLink}
                className="group flex flex-col items-center shrink-0 text-center py-0.5 select-none relative focus:outline-hidden"
              >
                {/* Icon box or Real Category Photo - Smooth animated slide-up & fade (Flipkart style) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-center shrink-0 ${
                    isScrolled
                      ? '-translate-y-2 opacity-0 max-h-0 mb-0 pointer-events-none'
                      : 'translate-y-0 opacity-100 max-h-12 mb-1'
                  }`}
                  style={{
                    willChange: 'transform, opacity, max-height',
                  }}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-transform duration-200 relative overflow-hidden ${
                      isAll && isActive
                        ? 'shadow-xs scale-105'
                        : isActive
                        ? 'ring-2 ring-offset-1 scale-105 shadow-2xs'
                        : 'hover:scale-105'
                    } ${
                      isAll
                        ? destination === 'haatza'
                          ? 'bg-[#2962FF] text-white shadow-xs'
                          : destination === 'lite'
                          ? 'bg-[#238636] text-white shadow-xs'
                          : 'bg-[#6C3FC5] text-white shadow-xs'
                        : categoryPhoto
                        ? 'bg-zinc-100'
                        : style.bg
                    }`}
                    style={{
                      outlineColor: isActive ? activeColor : undefined,
                    }}
                  >
                    {categoryPhoto ? (
                      <img
                        src={categoryPhoto.local || categoryPhoto.fallback}
                        onError={(e) => {
                          if (categoryPhoto.fallback && e.currentTarget.src !== categoryPhoto.fallback) {
                            e.currentTarget.src = categoryPhoto.fallback;
                          }
                        }}
                        alt={cat.name}
                        className="w-full h-full object-cover object-center rounded-2xl group-hover:scale-110 transition-transform duration-300"
                        loading="eager"
                        decoding="async"
                        width="40"
                        height="40"
                      />
                    ) : (
                      ICON_MAP[cat.iconName] || <LayoutGrid className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    )}
                  </div>
                </div>

                {/* Label text - Consistent font sizing to eliminate text reflow jumping */}
                <span
                  className={`whitespace-nowrap transition-colors duration-200 leading-tight text-center text-[10px] sm:text-[11px] font-semibold ${
                    isActive ? 'font-black' : 'text-zinc-700 group-hover:text-zinc-950'
                  }`}
                  style={{ color: isActive ? activeColor : undefined }}
                >
                  {cat.name}
                </span>

                {/* Active Underline Indicator Bar */}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full transition-all duration-200"
                    style={{ backgroundColor: activeColor }}
                  />
                )}
              </Link>
            );
          })}

          {/* MORE DROPDOWN CONTROL: Rendered ONLY when needsMore is true */}
          {needsMore && (
            <div className="relative shrink-0" ref={moreContainerRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="group flex flex-col items-center py-0.5 shrink-0 text-center select-none relative focus:outline-hidden cursor-pointer"
                title="More categories"
                aria-label="More categories"
                aria-expanded={isDropdownOpen}
              >
                {/* Icon box - Smooth animated slide-up & fade (Flipkart style) */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out flex items-center justify-center shrink-0 ${
                    isScrolled
                      ? '-translate-y-2 opacity-0 max-h-0 mb-0 pointer-events-none'
                      : 'translate-y-0 opacity-100 max-h-12 mb-1'
                  }`}
                  style={{
                    willChange: 'transform, opacity, max-height',
                  }}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                      isDropdownOpen
                        ? 'bg-[#2962FF] text-white shadow-xs'
                        : 'bg-zinc-100 text-zinc-600 hover:scale-105 hover:bg-zinc-200 group-hover:text-zinc-950'
                    }`}
                  >
                    <MoreHorizontal className="w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
                  </div>
                </div>

                <span
                  className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-colors duration-200 leading-tight text-zinc-700 group-hover:text-zinc-950 flex items-center gap-0.5"
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-zinc-900' : ''
                    }`}
                  />
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && hiddenCategories.length > 0 && (
                <div
                  className="absolute right-0 top-full mt-2 z-50 min-w-[210px] max-w-[260px] bg-white rounded-2xl shadow-xl border border-zinc-200/90 py-2 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                  aria-label="Additional categories"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 mb-1">
                    More Categories ({hiddenCategories.length})
                  </div>
                  <div className="max-h-[280px] overflow-y-auto no-scrollbar py-0.5 space-y-0.5">
                    {hiddenCategories.map((cat) => {
                      const catPhoto = getCategoryPhoto(cat);
                      return (
                        <Link
                          key={cat.id}
                          to={
                            destination === 'nest'
                              ? `/nest?category=${cat.slug}`
                              : `/category/${cat.slug}`
                          }
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group"
                          role="menuitem"
                        >
                          {catPhoto ? (
                            <img
                              src={catPhoto.local || catPhoto.fallback}
                              alt={cat.name}
                              className="w-6 h-6 rounded-lg object-cover shrink-0"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                              <LayoutGrid className="w-3.5 h-3.5 text-zinc-600" />
                            </div>
                          )}
                          <span className="truncate group-hover:text-[#2962FF]">{cat.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden offscreen measurement row for exact sub-pixel item width detection */}
      <div
        ref={measureContainerRef}
        aria-hidden="true"
        className="absolute -top-[9999px] -left-[9999px] invisible pointer-events-none flex items-center whitespace-nowrap"
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
            <span
              className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap leading-tight text-center"
            >
              {cat.name}
            </span>
          </div>
        ))}
        <div
          key="measure-more-toggle"
          className="group flex flex-col items-center py-0.5 shrink-0 text-center select-none"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl mb-1" />
          <span
            className="text-[10px] sm:text-[11px] font-semibold whitespace-nowrap leading-tight text-center flex items-center gap-0.5"
          >
            <span>More</span>
            <ChevronDown className="w-3 h-3" />
          </span>
        </div>
      </div>
    </nav>
  );
};
