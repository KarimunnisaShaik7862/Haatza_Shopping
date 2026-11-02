import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { SectionHeading } from '../../components/common/SectionHeading';

export interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountText: string;
  itemCount: string;
  image: string;
  link: string;
  accentColor?: string;
}

export interface TrendingCollectionsWidgetProps {
  categoryContext?: string;
  title?: string;
  subtitle?: string;
  collections?: CollectionItem[];
  className?: string;
}

const MENS_COLLECTIONS: CollectionItem[] = [
  {
    id: 'men-coll-executive',
    title: 'The Executive Edit',
    subtitle: 'Sharp Oxford shirts, tailored trousers & slim-cut blazers for boardroom presence.',
    badge: 'FORMAL EXCELLENCE',
    discountText: 'UP TO 50% OFF',
    itemCount: '48+ Styles',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
    link: '/category/men-fashion/clothing/shirts',
    accentColor: '#1E40AF',
  },
  {
    id: 'men-coll-streetwear',
    title: 'Urban Streetwear',
    subtitle: 'Oversized graphic tees, heavyweight cargos & retro low-top sneakers.',
    badge: 'STREET DROP',
    discountText: 'FLAT 40% OFF',
    itemCount: '62+ Styles',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=700&q=80',
    link: '/category/men-fashion/clothing/t-shirts',
    accentColor: '#2962FF',
  },
  {
    id: 'men-coll-festive',
    title: 'Royal Festive Atelier',
    subtitle: 'Pure Banarasi silk kurtas, handcrafted Nehru jackets & metallic embroidered sets.',
    badge: 'HERITAGE LUXE',
    discountText: 'MIN. 30% OFF',
    itemCount: '34+ Styles',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80',
    link: '/category/men-fashion/clothing/kurtas',
    accentColor: '#B45309',
  },
  {
    id: 'men-coll-athleisure',
    title: 'High-Performance Athleisure',
    subtitle: 'Breathable dry-fit joggers, seamless compression tees & lightweight runners.',
    badge: 'ACTIVE EDIT',
    discountText: 'UP TO 60% OFF',
    itemCount: '40+ Styles',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=700&q=80',
    link: '/category/men-fashion/clothing/track-pants',
    accentColor: '#059669',
  },
];

const WOMENS_COLLECTIONS: CollectionItem[] = [
  {
    id: 'women-coll-festive',
    title: 'Festive Silk Atelier',
    subtitle: 'Pure Banarasi weaves, handcrafted Anarkalis & gold zari embroidery.',
    badge: 'FESTIVE EDIT',
    discountText: 'FLAT 50% OFF',
    itemCount: '55+ Styles',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80',
    link: '/category/women-fashion/ethnic-wear/sarees',
    accentColor: '#DB2777',
  },
  {
    id: 'women-coll-western',
    title: 'Modern Western Wardrobe',
    subtitle: 'High-rise tailored trousers, crisp poplin shirts & chic monochrome blazers.',
    badge: 'CONTEMPORARY',
    discountText: 'UP TO 45% OFF',
    itemCount: '42+ Styles',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
    link: '/category/women-fashion/western-wear',
    accentColor: '#2563EB',
  },
  {
    id: 'women-coll-party',
    title: 'Evening Glamour & Soiree',
    subtitle: 'Satin cocktail dresses, shimmering stilettos & luxury statement clutches.',
    badge: 'AFTER DARK',
    discountText: 'MIN. 35% OFF',
    itemCount: '28+ Styles',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80',
    link: '/category/women-fashion/dresses',
    accentColor: '#9333EA',
  },
  {
    id: 'women-coll-boho',
    title: 'Bohemian Sunset Chic',
    subtitle: 'Flowing tiered maxi dresses, artisan linen co-ords & oxidized jewelry.',
    badge: 'RESORT WEAR',
    discountText: 'UP TO 55% OFF',
    itemCount: '38+ Styles',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80',
    link: '/category/women-fashion/casual-wear',
    accentColor: '#D97706',
  },
];

const GENERAL_COLLECTIONS: CollectionItem[] = [
  {
    id: 'gen-coll-fashion',
    title: 'Haute Fashion Edit',
    subtitle: 'Runway-inspired looks, seasonal capsules & premium everyday luxury.',
    badge: 'TRENDING FASHION',
    discountText: 'UP TO 60% OFF',
    itemCount: '80+ Styles',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80',
    link: '/category/men-fashion',
    accentColor: '#2563EB',
  },
  {
    id: 'gen-coll-tech',
    title: 'Next-Gen Smart Tech',
    subtitle: 'Active noise-cancelling headphones, AMOLED wearables & wireless chargers.',
    badge: 'FLAGSHIP GADGETS',
    discountText: 'FLAT 40% OFF',
    itemCount: '50+ Items',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    link: '/category/electronics',
    accentColor: '#0284C7',
  },
  {
    id: 'gen-coll-home',
    title: 'Artisanal Home Living',
    subtitle: 'Pure Belgian linens, warm ambient lighting & handcrafted ceramic accents.',
    badge: 'HOME HARMONY',
    discountText: 'UP TO 50% OFF',
    itemCount: '65+ Pieces',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=80',
    link: '/category/home-living',
    accentColor: '#059669',
  },
  {
    id: 'gen-coll-beauty',
    title: 'Clinical Glow Routine',
    subtitle: 'Dermatologist-formulated serums, deep hydrators & luxury fragrance notes.',
    badge: 'BEAUTY DROPS',
    discountText: 'BUY 1 GET 1',
    itemCount: '30+ Formulas',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
    link: '/category/beauty',
    accentColor: '#E11D48',
  },
];

export const TrendingCollectionsWidget: React.FC<TrendingCollectionsWidgetProps> = ({
  categoryContext,
  title = 'Trending Collections',
  subtitle = 'Curated signature aesthetics, designer lookbooks, and handpicked styling capsules.',
  collections: overrideCollections,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeCollections = useMemo(() => {
    if (overrideCollections && overrideCollections.length > 0) {
      return overrideCollections;
    }
    if (categoryContext?.includes('women')) {
      return WOMENS_COLLECTIONS;
    }
    if (categoryContext?.includes('men')) {
      return MENS_COLLECTIONS;
    }
    return GENERAL_COLLECTIONS;
  }, [overrideCollections, categoryContext]);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  return (
    <section
      aria-label="Trending Collections"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      {/* Header with Centralized SectionHeading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <SectionHeading
          title={title}
        />

        {/* Scroll Controls (Hidden on mobile) */}
        <div className="hidden sm:flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer select-none active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            aria-label="Scroll right"
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-colors cursor-pointer select-none active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collections Track */}
      <div
        ref={scrollRef}
        className="flex flex-row flex-nowrap items-stretch gap-5 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 overscroll-x-contain"
      >
        {activeCollections.map((col) => {
          const optimized = optimizeImageUrl(col.image, { width: 600, quality: 80 });

          return (
            <Link
              key={col.id}
              to={col.link}
              className="group relative w-[280px] sm:w-[320px] md:w-[340px] shrink-0 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer select-none"
            >
              {/* Image Banner */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-slate-900">
                <img
                  src={optimized}
                  alt={col.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-zinc-900 text-[10px] font-black uppercase tracking-wider font-heading shadow-xs">
                    {col.badge}
                  </span>
                </div>

                {/* Discount Tag bottom-left on image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="px-2 py-0.5 rounded bg-[#2962FF] text-[11px] font-black tracking-wider uppercase font-heading">
                    {col.discountText}
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    {col.itemCount}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 bg-white">
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#2962FF] transition-colors font-heading tracking-tight leading-snug">
                    {col.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-body line-clamp-2 mt-1 leading-relaxed">
                    {col.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2962FF] font-heading group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TrendingCollectionsWidget;
