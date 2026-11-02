import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import {
  SeasonalBannerThemeConfig,
  TrendingFashionCardItem,
  DEFAULT_TRENDING_FASHION_CONFIG,
  DEFAULT_FEATURED_FASHION_CARDS,
  DEFAULT_CARD_BORDER_COLORS,
} from '../data/trendingFashionConfig';

export type { TrendingFashionCardItem };

export interface TrendingFashionBannerProps {
  /**
   * Existing card data (either Product[] or generic category card items).
   * Exact existing titles, prices, images, and links are preserved.
   */
  products?: Product[];
  items?: TrendingFashionCardItem[];

  /**
   * Optional custom seasonal theme configuration.
   * If omitted, defaults to the high-impact blue Trending Fashion theme.
   */
  themeConfig?: Partial<SeasonalBannerThemeConfig>;

  /** Quick View callback */
  onQuickView?: (product: Product) => void;

  /** Additional container classes */
  className?: string;
}

/**
 * High-definition reference image fallback mapping for matched mock products
 */
const REFERENCE_IMAGE_MAP: Record<string, { image: string; badge: string; shortName: string; borderColor: string }> = {
  'prod-elec-2': {
    image: '/images/trending-fashion/white-smartwatch.jpg',
    badge: '',
    shortName: 'AeroPulse 1.96" AMOL...',
    borderColor: '#7DD3FC',
  },
  'prod-beauty-1': {
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    badge: '',
    shortName: 'Vitamin C Radiance...',
    borderColor: '#7DD3FC',
  },
  'prod-home-1': {
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    badge: '',
    shortName: 'Egyptian Cotton Luxury...',
    borderColor: '#7DD3FC',
  },
  'prod-elec-3': {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    badge: '',
    shortName: 'OnePlus 12R 5G...',
    borderColor: '#7DD3FC',
  },
};

/**
 * Normalizes either Product[] or generic card data into a uniform interface.
 * Excludes the shirt, saree, and headphones (image one) as requested.
 * Uses the uniform signature sky-blue background color across all cards.
 */
function normalizeCards(
  products?: Product[],
  items?: TrendingFashionCardItem[],
  borderColors: string[] = DEFAULT_CARD_BORDER_COLORS
): TrendingFashionCardItem[] {
  if (items && items.length > 0) {
    const filteredItems = items.filter(
      (item) => item.id !== 'prod-fash-1' && item.id !== 'prod-fash-2' && item.id !== 'prod-elec-1'
    );
    return filteredItems.map((item, idx) => ({
      ...item,
      badge: undefined,
      borderColor: '#7DD3FC',
    }));
  }

  if (products && products.length > 0) {
    // Specifically remove the shirt, saree, and headphones (image one)
    const filteredProducts = products.filter(
      (prod) =>
        prod.id !== 'prod-fash-1' &&
        prod.id !== 'prod-fash-2' &&
        prod.id !== 'prod-elec-1' &&
        prod.slug !== 'pure-linen-mandarin-collar-shirt' &&
        prod.slug !== 'handblock-chanderi-silk-anarkali-kurta' &&
        prod.slug !== 'active-noise-cancelling-wireless-headphones'
    );

    return filteredProducts.map((prod, idx) => {
      const refMatch = REFERENCE_IMAGE_MAP[prod.id];
      const assignedBorderColor = '#7DD3FC'; // Consistent blue background/border color across all cards

      // Format price accurately
      const formattedPrice = `₹${prod.price.toLocaleString('en-IN')}`;

      // Prefer reference extracted image when available, else product image
      const image = refMatch?.image || prod.mainImage || (prod.images && prod.images[0]) || '';

      return {
        id: prod.id,
        name: refMatch?.shortName || prod.name,
        fullName: prod.name,
        price: formattedPrice,
        image,
        link: `/product/${prod.slug}`,
        badge: undefined, // Badges removed per user request
        isBestseller: prod.isBestseller,
        borderColor: assignedBorderColor,
        originalProduct: prod,
      };
    });
  }

  // Fallback to the default reference cards (which start from smartwatch with unified blue)
  return DEFAULT_FEATURED_FASHION_CARDS;
}

export const TrendingFashionBanner: React.FC<TrendingFashionBannerProps> = ({
  products,
  items,
  themeConfig,
  className = '',
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Merge runtime theme config with static defaults
  const config: SeasonalBannerThemeConfig = useMemo(
    () => ({
      ...DEFAULT_TRENDING_FASHION_CONFIG,
      ...themeConfig,
    }),
    [themeConfig]
  );

  const cards = useMemo(
    () => normalizeCards(products, items, config.cardBorderColors),
    [products, items, config.cardBorderColors]
  );

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Check scroll bounds and calculate active carousel index
  const checkScrollBounds = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    // Card step width accounting for adjusted card size + gap
    const cardStep = 235;
    const currentIndex = Math.min(
      Math.round(scrollLeft / cardStep),
      Math.max(0, cards.length - 1)
    );
    setActiveIndex(currentIndex);
  }, [cards.length]);

  useEffect(() => {
    checkScrollBounds();
    window.addEventListener('resize', checkScrollBounds);
    return () => window.removeEventListener('resize', checkScrollBounds);
  }, [checkScrollBounds]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -235 : 235;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollBounds, 320);
  };

  const scrollToCard = (index: number) => {
    if (!scrollContainerRef.current) return;
    const cardStep = 235;
    scrollContainerRef.current.scrollTo({
      left: index * cardStep,
      behavior: 'smooth',
    });
    setActiveIndex(index);
    setTimeout(checkScrollBounds, 320);
  };

  /**
   * Directly navigates to the Product Details Page on product card click.
   * Excludes clicks on the interactive wishlist like button.
   */
  const handleCardClick = (e: React.MouseEvent, card: TrendingFashionCardItem) => {
    // If the click originated from a button (e.g. wishlist toggle), don't navigate
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate(card.link);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, card: TrendingFashionCardItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'instant' });
      navigate(card.link);
    }
  };

  /**
   * Toggles product in Wishlist
   */
  const handleLikeToggle = (e: React.MouseEvent, card: TrendingFashionCardItem) => {
    e.stopPropagation();
    e.preventDefault();

    const prod: Product = card.originalProduct || ({
      id: card.id,
      slug: card.link.replace('/product/', ''),
      name: card.fullName || card.name,
      brand: 'HAATZA',
      destination: 'haatza',
      categoryId: 'cat-fashion',
      categoryName: 'Trending Fashion',
      description: card.fullName || card.name,
      sellerName: 'HAATZA Official',
      sellerRating: 4.8,
      deliveryDays: 2,
      price: typeof card.price === 'number' ? card.price : parseInt(String(card.price).replace(/[^0-9]/g, '')) || 1999,
      mrp: typeof card.price === 'number' ? Math.round(card.price * 1.5) : 2999,
      discountPercentage: 35,
      rating: 4.6,
      reviewCount: 120,
      stock: 20,
      inStock: true,
      mainImage: card.image,
      images: [card.image],
      tags: ['trending', 'fashion'],
      isTrending: true,
      isBestseller: true,
      isNewArrival: false,
    } as Product);

    toggleWishlist(prod);
  };

  if (!cards || cards.length === 0) return null;

  return (
    <section
      aria-label={`${config.titlePrimary} ${config.titleHighlight}`}
      className={`relative w-full ${className}`}
    >
      {/* =========================================================================
          PANORAMIC 16:5 CAROUSEL CONTAINER (HIGH-FIDELITY MODERN E-COMMERCE BANNER)
          ========================================================================= */}
      <div
        className={`w-full ${config.containerBg} ${config.containerBorder} border rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden`}
      >
        {/* Subtle Background 3D Isometric Wireframe Cube Overlays (SaaS / Fintech Grade) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.22] z-0">
          <svg
            className="w-full h-full text-blue-500"
            viewBox="0 0 1200 400"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            preserveAspectRatio="none"
          >
            {/* 3D Isometric Cube Matrix (Left) */}
            <g transform="translate(240, 40) scale(0.9)">
              <polygon points="50,10 90,30 50,50 10,30" stroke="currentColor" strokeDasharray="3 3" />
              <polygon points="10,30 50,50 50,95 10,75" stroke="currentColor" />
              <polygon points="50,50 90,30 90,75 50,95" stroke="currentColor" />
            </g>
            <g transform="translate(290, 110) scale(1.1)">
              <polygon points="50,10 90,30 50,50 10,30" stroke="currentColor" />
              <polygon points="10,30 50,50 50,95 10,75" stroke="currentColor" strokeDasharray="4 2" />
              <polygon points="50,50 90,30 90,75 50,95" stroke="currentColor" />
            </g>
            <g transform="translate(260, 220) scale(0.85)">
              <polygon points="50,10 90,30 50,50 10,30" stroke="currentColor" />
              <polygon points="10,30 50,50 50,95 10,75" stroke="currentColor" />
              <polygon points="50,50 90,30 90,75 50,95" stroke="currentColor" strokeDasharray="2 2" />
            </g>

            {/* 3D Isometric Cube Matrix (Right) */}
            <g transform="translate(1080, 20) scale(0.9)">
              <polygon points="50,10 90,30 50,50 10,30" stroke="currentColor" />
              <polygon points="10,30 50,50 50,95 10,75" stroke="currentColor" strokeDasharray="3 3" />
              <polygon points="50,50 90,30 90,75 50,95" stroke="currentColor" />
            </g>
            <g transform="translate(1120, 140) scale(0.75)">
              <polygon points="50,10 90,30 50,50 10,30" stroke="currentColor" />
              <polygon points="10,30 50,50 50,95 10,75" stroke="currentColor" />
              <polygon points="50,50 90,30 90,75 50,95" stroke="currentColor" />
            </g>

            {/* Background Grid Pattern */}
            <pattern id="iso-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill="currentColor" opacity="0.4" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#iso-dots)" />
          </svg>
        </div>

        {/* Content Wrapper: Left Hero Banner + Right Cards Track */}
        <div className="flex flex-row items-stretch gap-2.5 sm:gap-4 lg:gap-5 relative z-10">
          {/* =====================================================================
              LEFT SIDE - HERO PROMOTIONAL BANNER CARD
              - Distinctive angled, cone-style tapered right edge pointing to cards
              - Slanted semi-translucent cyan glassmorphic shard plates
              - Pure white clean typography & frosted CTA button
              ===================================================================== */}
          <div className="w-[125px] xs:w-[145px] sm:w-[220px] md:w-[280px] lg:w-[310px] xl:w-[330px] shrink-0 relative flex flex-col min-h-[190px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[350px]">
            {/* The Main Angled Royal Blue Card */}
            <div
              className={`w-full h-full bg-gradient-to-r ${config.bannerGradient} rounded-xl sm:rounded-2xl md:rounded-l-2xl md:rounded-r-none p-2.5 xs:p-3.5 sm:p-6 lg:p-7 text-white relative overflow-hidden flex flex-col justify-between shadow-[0_8px_25px_rgba(11,94,215,0.22)] select-none`}
              style={{
                // Cone-style angled chevron right edge on desktop pointing to the cards
                clipPath:
                  typeof window !== 'undefined' && window.innerWidth >= 768
                    ? 'polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)'
                    : undefined,
              }}
            >
              {/* Subtle Low-Opacity Vector Grid & Isometric Lines Inside Blue Banner */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg
                  className="w-full h-full text-white"
                  viewBox="0 0 300 320"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  preserveAspectRatio="none"
                >
                  <line x1="0" y1="40" x2="300" y2="40" strokeDasharray="3 3" />
                  <line x1="0" y1="120" x2="300" y2="120" strokeDasharray="4 2" />
                  <line x1="0" y1="200" x2="300" y2="200" strokeDasharray="3 3" />
                  <line x1="0" y1="280" x2="300" y2="280" strokeDasharray="4 2" />
                  <line x1="60" y1="0" x2="60" y2="320" strokeDasharray="4 2" />
                  <line x1="150" y1="0" x2="150" y2="320" strokeDasharray="3 3" />
                  <line x1="240" y1="0" x2="240" y2="320" strokeDasharray="4 2" />
                  <line x1="0" y1="320" x2="300" y2="120" stroke="white" strokeWidth="1.2" opacity="0.3" />
                </svg>
              </div>

              {/* Slanted Semi-Translucent Cyan Glassmorphic Shard Plates Layering the Angled Edge */}
              <div className="hidden md:block absolute right-3 top-0 bottom-0 w-16 bg-gradient-to-tr from-cyan-400/30 via-sky-300/20 to-transparent -skew-x-[18deg] backdrop-blur-xs border-r border-sky-300/40 pointer-events-none" />
              <div className="hidden md:block absolute right-7 top-0 bottom-0 w-10 bg-gradient-to-tr from-cyan-300/20 via-sky-200/10 to-transparent -skew-x-[18deg] backdrop-blur-xs border-r border-white/20 pointer-events-none" />
              <div className="hidden md:block absolute right-11 top-0 bottom-0 w-6 bg-white/10 -skew-x-[18deg] pointer-events-none" />

              {/* Top Section: Frosted Pill Badge */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-widest uppercase font-heading shadow-xs">
                  <span>{config.label}</span>
                </div>

                {/* Main Headline: Clean Medium "Trending" + Bold Prominent "Fashion" */}
                <div className="mt-2 sm:mt-4">
                  <span className="block text-xs xs:text-sm sm:text-2xl lg:text-[26px] font-medium text-white/95 leading-tight tracking-tight">
                    {config.titlePrimary}
                  </span>
                  <span className="block text-sm xs:text-lg sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none mt-0.5 sm:mt-1 font-heading drop-shadow-xs">
                    {config.titleHighlight}
                  </span>
                  <p className="text-[9px] xs:text-[10px] sm:text-sm text-white/85 font-normal mt-1 sm:mt-2 leading-snug line-clamp-2 sm:line-clamp-none">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Frosted Glass Pill CTA Button */}
              <div className="relative z-10 pt-2 sm:pt-4 mt-auto">
                <Link
                  to={config.viewAllLink || '/category/fashion'}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2.5 py-1 xs:px-3 xs:py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/35 backdrop-blur-md border border-white/35 text-white text-[10px] xs:text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <span>{config.ctaText || 'Explore All'}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT SIDE - PRODUCT CARDS CAROUSEL
              - Distinctive chamfered (angled cut) top-left corner on each card
              - Increased card dimensions for high prominence
              - Left side: Royal Blue Pill Badge
              - Right end: Interactive Wishlist Like Symbol (Heart Icon)
              - Clicking card navigates directly to Product Details Page
              - Sleek 1px pastel accent perimeter borders
              - Circular white floating next/prev arrow buttons
              ===================================================================== */}
          <div className="relative flex-1 min-w-0 flex items-center">
            {/* Circular White Floating Prev-Arrow Button (Hidden on Mobile) */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="hidden sm:flex absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-200/80 items-center justify-center text-slate-700 hover:text-[#1D4ED8] hover:scale-105 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
            )}

            {/* Scrollable Track */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScrollBounds}
              className="flex items-stretch gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 w-full"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {cards.map((card, idx) => {
                const borderColor = card.borderColor || DEFAULT_CARD_BORDER_COLORS[idx % DEFAULT_CARD_BORDER_COLORS.length];
                const isLiked = isInWishlist(card.id);

                return (
                  <div
                    key={card.id || idx}
                    role="link"
                    tabIndex={0}
                    onClick={(e) => handleCardClick(e, card)}
                    onKeyDown={(e) => handleCardKeyDown(e, card)}
                    className="w-[126px] xs:w-[140px] sm:w-[195px] md:w-[210px] lg:w-[225px] xl:w-[235px] shrink-0 cursor-pointer group select-none relative transition-transform duration-300 hover:-translate-y-1.5 focus:outline-hidden"
                    style={{
                      // SVG drop-shadow filter follows the exact chamfered outline cleanly
                      filter: 'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.08))',
                    }}
                  >
                    {/* Outer Chamfered Border Layer (Unified Signature Sky-Blue Perimeter Background) */}
                    <div
                      className="w-full h-full rounded-br-2xl rounded-tr-2xl rounded-bl-2xl p-[1px] transition-colors duration-300"
                      style={{
                        backgroundColor: '#7DD3FC',
                        clipPath: 'polygon(18px 0, 100% 0, 100% 100%, 0 100%, 0 18px)',
                      }}
                    >
                      {/* Inner Pure White Card Container */}
                      <div
                        className="w-full h-full bg-white rounded-br-2xl rounded-tr-2xl rounded-bl-2xl overflow-hidden flex flex-col justify-between"
                        style={{
                          clipPath: 'polygon(17px 0, 100% 0, 100% 100%, 0 100%, 0 17px)',
                        }}
                      >
                        {/* Chamfered Inner Image Container with Matching Soft Blue Background */}
                        <div
                          className="m-2 sm:m-2.5 rounded-br-xl rounded-tr-xl rounded-bl-xl overflow-hidden aspect-square relative flex items-center justify-center bg-gradient-to-b from-[#EFF6FF] via-[#F0F7FF] to-[#E8F2FE]"
                          style={{
                            clipPath: 'polygon(14px 0, 100% 0, 100% 100%, 0 100%, 0 14px)',
                          }}
                        >
                          {/* Wishlist Like Symbol (Heart Icon - Small badge on mobile) */}
                          <button
                            type="button"
                            onClick={(e) => handleLikeToggle(e, card)}
                            className={`absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                              isLiked
                                ? 'bg-rose-50 text-rose-500 scale-105 shadow-sm'
                                : 'bg-white/90 backdrop-blur-xs text-slate-500 hover:text-rose-500 hover:bg-white hover:scale-105'
                            }`}
                            aria-label={isLiked ? `Remove ${card.name} from wishlist` : `Save ${card.name} to wishlist`}
                          >
                            <Heart
                              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
                                isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                              }`}
                            />
                          </button>

                          {/* Crisp High-Quality Product Image */}
                          <img
                            src={card.image}
                            alt={card.fullName || card.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-500 ease-out select-none pointer-events-none"
                          />
                        </div>

                        {/* Card Meta Content (Bottom Section) */}
                        <div className="px-2.5 sm:px-3 pb-3 sm:pb-3.5 pt-0.5 text-center flex flex-col justify-center">
                          {/* Product / Category Title (Clean Charcoal Sans-Serif) */}
                          <span
                            className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#1D4ED8] transition-colors leading-snug truncate font-heading block"
                            title={card.fullName || card.name}
                          >
                            {card.name}
                          </span>

                          {/* Price in Signature Vivid Royal Blue */}
                          {card.price && (
                            <span className="text-sm sm:text-base font-extrabold text-[#1D4ED8] leading-tight mt-1 font-heading block">
                              {typeof card.price === 'number'
                                ? `₹${card.price.toLocaleString('en-IN')}`
                                : card.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Circular White Floating Next-Arrow Button (Hidden on Mobile) */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="hidden sm:flex absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-slate-200/80 items-center justify-center text-slate-700 hover:text-[#1D4ED8] hover:scale-105 active:scale-95 transition-all focus:outline-hidden cursor-pointer"
                aria-label="Next products"
              >
                <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            MINIMAL HORIZONTAL PILL-SHAPED CAROUSEL DOT INDICATORS (BOTTOM CENTERED)
            ========================================================================= */}
        <div className="flex items-center justify-center gap-1.5 pt-3 sm:pt-4 relative z-10">
          {cards.slice(0, Math.min(cards.length, 6)).map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToCard(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 focus:outline-hidden cursor-pointer ${
                  isActive
                    ? 'w-6 sm:w-7 bg-[#1D4ED8]'
                    : 'w-2 bg-slate-300/80 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingFashionBanner;
