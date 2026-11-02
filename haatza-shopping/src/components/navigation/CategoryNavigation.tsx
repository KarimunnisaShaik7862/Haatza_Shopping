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

const CATEGORY_STYLES: Record<string, { bg: string; text: string; accent: string }> = {
  all: { bg: 'bg-[#2962FF] text-white', text: '#2962FF', accent: '#2962FF' },
  'men-fashion': { bg: 'bg-blue-50 text-blue-600', text: '#1F1F1F', accent: '#8492A6' },
  'women-fashion': { bg: 'bg-pink-50 text-pink-500', text: '#1F1F1F', accent: '#FB7185' },
  kids: { bg: 'bg-amber-50 text-amber-600', text: '#1F1F1F', accent: '#F59E0B' },
  electronics: { bg: 'bg-sky-50 text-sky-600', text: '#1F1F1F', accent: '#38BDF8' },
  'home-living': { bg: 'bg-indigo-50 text-indigo-600', text: '#1F1F1F', accent: '#2563EB' },
  beauty: { bg: 'bg-rose-50 text-rose-500', text: '#1F1F1F', accent: '#A855F7' },
  appliances: { bg: 'bg-cyan-50 text-cyan-600', text: '#1F1F1F', accent: '#C084FC' },
  'toys-games': { bg: 'bg-orange-50 text-orange-500', text: '#EA580C', accent: '#F97316' },
  'sports-fitness': { bg: 'bg-indigo-50 text-indigo-600', text: '#4F46E5', accent: '#6366F1' },
  books: { bg: 'bg-sky-50 text-sky-600', text: '#0284C7', accent: '#0EA5E9' },
  furniture: { bg: 'bg-amber-50 text-amber-600', text: '#D97706', accent: '#F59E0B' },
  groceries: { bg: 'bg-emerald-50 text-emerald-600', text: '#16A34A', accent: '#22C55E' },
  automotive: { bg: 'bg-purple-50 text-purple-600', text: '#9333EA', accent: '#A855F7' },
  more: { bg: 'bg-zinc-100 text-zinc-600', text: '#52525B', accent: '#71717A' },
  mobiles: { bg: 'bg-amber-50 text-amber-600', text: '#D97706', accent: '#F59E0B' },
  'baby-care': { bg: 'bg-rose-50 text-rose-500', text: '#E11D48', accent: '#F43F5E' },
  'pet-supplies': { bg: 'bg-amber-50 text-amber-700', text: '#B45309', accent: '#D97706' },
  jewellery: { bg: 'bg-amber-50 text-amber-500', text: '#D97706', accent: '#F59E0B' },
  'gift-cards': { bg: 'bg-purple-50 text-purple-600', text: '#9333EA', accent: '#A855F7' },
  'fruits-vegetables': { bg: 'bg-emerald-50 text-emerald-600', text: '#059669', accent: '#10B981' },
  'dairy-breakfast': { bg: 'bg-blue-50 text-blue-600', text: '#2563EB', accent: '#3B82F6' },
  'snacks-beverages': { bg: 'bg-amber-50 text-amber-600', text: '#D97706', accent: '#F59E0B' },
  'household-cleaning': { bg: 'bg-teal-50 text-teal-600', text: '#0D9488', accent: '#14B8A6' },
  'personal-care': { bg: 'bg-rose-50 text-rose-600', text: '#E11D48', accent: '#EC4899' },
  'kitchen-essentials': { bg: 'bg-orange-50 text-orange-600', text: '#EA580C', accent: '#F97316' },
  'home-cleaning': { bg: 'bg-purple-50 text-[#6C3FC5]', text: '#6C3FC5', accent: '#8B5CF6' },
  'kitchen-cleaning': { bg: 'bg-amber-50 text-amber-600', text: '#D97706', accent: '#F59E0B' },
  'bathroom-cleaning': { bg: 'bg-cyan-50 text-cyan-600', text: '#0891B2', accent: '#06B6D4' },
  'sweeping-mopping': { bg: 'bg-emerald-50 text-emerald-600', text: '#059669', accent: '#10B981' },
  'utensil-cleaning': { bg: 'bg-indigo-50 text-indigo-600', text: '#4F46E5', accent: '#6366F1' },
  'laundry-ironing': { bg: 'bg-sky-50 text-sky-600', text: '#0284C7', accent: '#0EA5E9' },
  'home-organization': { bg: 'bg-pink-50 text-pink-600', text: '#DB2777', accent: '#EC4899' },
};

const CATEGORY_IMAGES: Record<string, { local?: string; fallback: string; backup?: string }> = {
  all: {
    fallback: 'https://pngimg.com/uploads/shopping_bag/shopping_bag_PNG6377.png',
  },
  'men-fashion': {
    local: '/images/top-categories/men-fashion.png?v=20261030b',
    fallback: 'https://pngimg.com/uploads/suit/suit_PNG93207.png',
  },
  'women-fashion': {
    local: '/images/top-categories/women-fashion.png?v=20261031_kurti',
    fallback: '/images/top-categories/women-fashion.png?v=20261031_kurti',
  },
  kids: {
    local: '/images/top-categories/kids-fashion.png?v=20261030b',
    fallback: '/images/top-categories/kids-fashion.png?v=20261030b',
  },
  electronics: {
    local: '/images/top-categories/electronics.png?v=20261030b',
    fallback: 'https://pngimg.com/uploads/headphones/headphones_PNG7659.png',
  },
  'home-living': {
    local: '/images/top-categories/home-living.png?v=20261030b',
    fallback: 'https://pngimg.com/uploads/armchair/armchair_PNG7025.png',
  },
  beauty: {
    local: '/images/top-categories/beauty.png?v=20261030b',
    fallback: 'https://pngimg.com/uploads/brush/brush_PNG7355.png',
  },
  appliances: {
    local: '/images/top-categories/appliances.png?v=20261030b',
    fallback: 'https://pngimg.com/uploads/coffee_machine/coffee_machine_PNG17306.png',
  },
  'toys-games': {
    fallback: 'https://pngimg.com/uploads/gamepad/gamepad_PNG78.png',
  },
  'sports-fitness': {
    fallback: 'https://pngimg.com/uploads/dumbbell/dumbbell_PNG16378.png',
  },
  books: {
    fallback: 'https://pngimg.com/uploads/book/book_PNG2108.png',
  },
  furniture: {
    fallback: 'https://pngimg.com/uploads/sofa/sofa_PNG6961.png',
  },
  groceries: {
    fallback: 'https://pngimg.com/uploads/apple/apple_PNG12405.png',
  },
  automotive: {
    fallback: 'https://pngimg.com/uploads/ferrari/ferrari_PNG10638.png',
  },
  mobiles: {
    fallback: 'https://pngimg.com/uploads/smartphone/smartphone_PNG8525.png',
  },
  'baby-care': {
    fallback: 'https://pngimg.com/uploads/pram/pram_PNG101282.png',
  },
  'pet-supplies': {
    fallback: 'https://pngimg.com/uploads/dog/dog_PNG150.png',
  },
  jewellery: {
    fallback: 'https://pngimg.com/uploads/necklace/necklace_PNG61.png',
    backup: 'https://pngimg.com/uploads/necklace/necklace_PNG12.png',
  },
  'gift-cards': {
    fallback: 'https://pngimg.com/uploads/gift/gift_PNG5954.png',
  },
  // Lite Categories
  'fruits-vegetables': {
    fallback: 'https://pngimg.com/uploads/apple/apple_PNG12405.png',
  },
  'dairy-breakfast': {
    fallback: 'https://pngimg.com/uploads/milk/milk_PNG12760.png',
  },
  'snacks-beverages': {
    fallback: 'https://pngimg.com/uploads/cookie/cookie_PNG13656.png',
  },
  'household-cleaning': {
    fallback: 'https://pngimg.com/uploads/spray/spray_PNG8912.png',
  },
  'personal-care': {
    fallback: 'https://pngimg.com/uploads/perfume/perfume_PNG10280.png',
  },
  'kitchen-essentials': {
    fallback: 'https://pngimg.com/uploads/pan/pan_PNG6995.png',
  },
  // Nest Categories
  'home-cleaning': {
    fallback: 'https://pngimg.com/uploads/spray/spray_PNG8912.png',
  },
  'kitchen-cleaning': {
    fallback: 'https://pngimg.com/uploads/sponge/sponge_PNG39.png',
  },
  'bathroom-cleaning': {
    fallback: 'https://pngimg.com/uploads/soap/soap_PNG81.png',
  },
  'sweeping-mopping': {
    fallback: 'https://pngimg.com/uploads/mop/mop_PNG18.png',
  },
  'utensil-cleaning': {
    fallback: 'https://pngimg.com/uploads/sponge/sponge_PNG39.png',
  },
  'laundry-ironing': {
    fallback: 'https://pngimg.com/uploads/iron/iron_PNG95.png',
  },
  'home-organization': {
    fallback: 'https://pngimg.com/uploads/box/box_PNG60.png',
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

const renderCategoryName = (name: string) => {
  const parts = name.split(' ');
  if (parts.length === 2) {
    return (
      <>
        <span className="block sm:inline">{parts[0]}</span>
        <span className="block sm:inline">{parts[1]}</span>
      </>
    );
  }
  if (parts.length === 3 && parts[1] === '&') {
    return (
      <>
        <span className="block sm:inline">{parts[0]} &amp;</span>
        <span className="block sm:inline">{parts[2]}</span>
      </>
    );
  }
  return name;
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

  // Detect mobile screen for touch horizontal scrolling and hiding 'More'
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Visible and overflow categories:
  // On mobile (< 640px), show all categories in the touch-scrollable strip so none are truncated
  const visibleCategories = (!isMobileScreen && needsMore)
    ? productCategories.slice(0, visibleCount)
    : productCategories;

  const hiddenCategories = (!isMobileScreen && needsMore)
    ? productCategories.slice(visibleCount)
    : [];

  return (
    <nav
      aria-label="Category navigation"
      className={`relative z-30 group/nav bg-white border-t border-zinc-100 transition-shadow duration-200 ${
        isScrolled ? 'shadow-2xs' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 sm:px-10 lg:px-14 xl:px-16 relative">
        <div
          ref={scrollRef}
          className="w-full flex items-center justify-start sm:justify-between gap-3.5 sm:gap-2 no-scrollbar py-1.5 sm:py-2 select-none overflow-x-auto scroll-smooth"
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
                className="group flex flex-col items-center shrink-0 text-center py-0.5 select-none relative focus:outline-hidden min-w-[54px] max-w-[64px] sm:max-w-none"
              >
                {/* Isolated Transparent Category Cutout - Directly on Navbar Background */}
                <div
                  className={`overflow-visible transition-all duration-300 ease-out flex items-center justify-center shrink-0 ${
                    isScrolled
                      ? '-translate-y-2 opacity-0 max-h-0 mb-0 pointer-events-none'
                      : 'translate-y-0 opacity-100 max-h-12 mb-1'
                  }`}
                  style={{
                    willChange: 'transform, opacity, max-height',
                  }}
                >
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-200 relative ${
                      isActive ? 'scale-105' : 'hover:scale-105'
                    }`}
                  >
                    {categoryPhoto ? (
                      <img
                        src={categoryPhoto.local || categoryPhoto.fallback}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (categoryPhoto.backup && target.src !== categoryPhoto.backup) {
                            target.src = categoryPhoto.backup;
                          } else if (categoryPhoto.fallback && target.src !== categoryPhoto.fallback) {
                            target.src = categoryPhoto.fallback;
                          }
                        }}
                        alt={cat.name}
                        className="w-full h-full object-contain object-center drop-shadow-xs group-hover:scale-110 transition-transform duration-300 select-none pointer-events-none"
                        loading="eager"
                        decoding="async"
                        width="40"
                        height="40"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        {ICON_MAP[cat.iconName] || <LayoutGrid className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
                      </div>
                    )}
                  </div>
                </div>

                {/* Label text - Consistent font sizing to eliminate text reflow jumping */}
                <span
                  className={`transition-colors duration-200 leading-tight text-center text-[10px] sm:text-[11px] font-semibold break-words sm:whitespace-nowrap px-0.5 ${
                    isActive ? 'font-black' : 'text-zinc-700 group-hover:text-zinc-950'
                  }`}
                  style={{ color: isActive ? activeColor : undefined }}
                >
                  {renderCategoryName(cat.name)}
                </span>
              </Link>
            );
          })}

          {/* MORE DROPDOWN CONTROL: Rendered ONLY on sm screens and above when needsMore is true */}
          {!isMobileScreen && needsMore && (
            <div className="hidden sm:block relative shrink-0" ref={moreContainerRef}>
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
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (catPhoto.backup && target.src !== catPhoto.backup) {
                                  target.src = catPhoto.backup;
                                } else if (catPhoto.fallback && target.src !== catPhoto.fallback) {
                                  target.src = catPhoto.fallback;
                                }
                              }}
                              alt={cat.name}
                              className="w-6 h-6 object-contain shrink-0 drop-shadow-2xs"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-6 h-6 flex items-center justify-center shrink-0 text-zinc-600">
                              <LayoutGrid className="w-3.5 h-3.5" />
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
