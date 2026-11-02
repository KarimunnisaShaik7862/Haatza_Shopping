import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

interface CategoryHeroBannerConfig {
  slug: string;
  name: string;
  image: string;
  objectPosition?: string;
  imageFit?: 'cover' | 'contain';
  bannerBg?: string;
  scrimGradient: string;
  borderColor: string;
  shadowColor: string;
  auraColor: string;
  tag: string;
  tagColor: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  title: string;
  highlightText: string;
  highlightColor: string;
  description: string;
  descColor: string;
  ctaText: string;
  ctaTextColor: string;
  statusText: string;
  statusColor: string;
  statusDotColor: string;
}

const CATEGORY_HERO_CONFIGS: Record<string, CategoryHeroBannerConfig> = {
  all: {
    slug: 'all',
    name: 'All / For You',
    image: '/images/banners/banner_all_for_you.jpg',
    scrimGradient: 'from-[#031B08]/98 via-[#05290D]/85 to-transparent',
    borderColor: 'border-[#0C831F]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(12,131,31,0.22)]',
    auraColor: 'rgba(21, 168, 48, 0.22)',
    tag: 'LIGHTNING FAST',
    tagColor: '#A7F3D0',
    badge: '10–15 MINS',
    badgeBg: '#0C831F',
    badgeText: '#FFFFFF',
    badgeBorder: '#2EE24B/40',
    title: 'Everyday Essentials at Superfast Speed',
    highlightText: 'Delivered in 10–15 Minutes',
    highlightColor: '#75F58A',
    description: 'Crisp organic produce, morning milk, bread, eggs, and cleaning essentials delivered straight from our dark store to your kitchen counter.',
    descColor: '#D1FAE5',
    ctaText: 'Order Daily Groceries',
    ctaTextColor: '#0C831F',
    statusText: 'Neighborhood Dark Store Active',
    statusColor: '#A7F3D0',
    statusDotColor: '#2EE24B',
  },
  'fruits-vegetables': {
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    image: '/images/banners/banner_3d_fruits_veg.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#041d14]/75 via-[#041d14]/35 to-transparent',
    borderColor: 'border-[#22c55e]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(34,197,94,0.22)]',
    auraColor: 'rgba(34, 197, 94, 0.22)',
    tag: 'FARM HARVEST',
    tagColor: '#BBF7D0',
    badge: '100% ORGANIC',
    badgeBg: '#16a34a',
    badgeText: '#FFFFFF',
    badgeBorder: '#4ade80/40',
    title: 'Orchard Fresh Seasonal Fruits & Greens',
    highlightText: '100% Farm Inspected • Zero Chemicals',
    highlightColor: '#86efac',
    description: 'Sun-kissed Ratnagiri Alphonso mangoes, mountain apples, creamy avocados, and crisp hydroponic salad greens hydro-cooled for peak nutrition.',
    descColor: '#dcfce7',
    ctaText: 'Shop Fresh Harvest',
    ctaTextColor: '#15803d',
    statusText: 'Direct Sourced from Regional Farmers',
    statusColor: '#bbf7d0',
    statusDotColor: '#4ade80',
  },
  'dairy-breakfast': {
    slug: 'dairy-breakfast',
    name: 'Dairy & Breakfast',
    image: '/images/banners/promo_3d_dairy.jpg',
    scrimGradient: 'from-[#031d2e]/98 via-[#063c5c]/88 to-transparent',
    borderColor: 'border-[#0284c7]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(2,132,199,0.22)]',
    auraColor: 'rgba(2, 132, 199, 0.22)',
    tag: 'PURE DAIRY',
    tagColor: '#BAE6FD',
    badge: '4°C CHILLED',
    badgeBg: '#0284c7',
    badgeText: '#FFFFFF',
    badgeBorder: '#38bdf8/40',
    title: 'Pure Farmhouse Milk, Butter & Breakfast',
    highlightText: 'Guaranteed Fresh Daily Morning Supply',
    highlightColor: '#7dd3fc',
    description: 'Pasteurized whole milk, artisan cultured butter, rich Malai paneer, pasture-raised country eggs, and crusty whole wheat breakfast breads.',
    descColor: '#e0f2fe',
    ctaText: 'Order Morning Dairy',
    ctaTextColor: '#0369a1',
    statusText: 'Maintained at constant 3.8°C cold chain',
    statusColor: '#bae6fd',
    statusDotColor: '#38bdf8',
  },
  'snacks-beverages': {
    slug: 'snacks-beverages',
    name: 'Snacks & Beverages',
    image: '/images/banners/promo_3d_snacks.jpg',
    scrimGradient: 'from-[#1c0802]/98 via-[#5c1d06]/88 to-transparent',
    borderColor: 'border-[#ea580c]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(234,88,12,0.22)]',
    auraColor: 'rgba(234, 88, 12, 0.22)',
    tag: 'INSTANT CHILL',
    tagColor: '#FED7AA',
    badge: 'MIDNIGHT CRUNCH',
    badgeBg: '#ea580c',
    badgeText: '#FFFFFF',
    badgeBorder: '#fb923c/40',
    title: 'Crunchy Munchies & Chilled Fizzy Sips',
    highlightText: 'Party Combos & Quick Cravings Ready',
    highlightColor: '#fdba74',
    description: 'Golden kettle crisps, iced energy cold brews, refreshing fruit sodas, roasted nuts, and imported dark chocolates delivered chilled.',
    descColor: '#ffedd5',
    ctaText: 'Grab Munchies Now',
    ctaTextColor: '#c2410c',
    statusText: 'Chilled on arrival guarantee',
    statusColor: '#fed7aa',
    statusDotColor: '#fb923c',
  },
  'household-cleaning': {
    slug: 'household-cleaning',
    name: 'Household Cleaning',
    image: '/images/banners/banner_3d_cleaning.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#032029]/65 via-[#032029]/30 to-transparent',
    borderColor: 'border-[#06b6d4]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(6,182,212,0.22)]',
    auraColor: 'rgba(6, 182, 212, 0.22)',
    tag: 'HOME HYGIENE',
    tagColor: '#A5F3FC',
    badge: '99.9% GERM-FREE',
    badgeBg: '#0891b2',
    badgeText: '#FFFFFF',
    badgeBorder: '#22d3ee/40',
    title: 'Sparkling Clean Living & Natural Care',
    highlightText: 'Tough on Grease • Gentle on Surfaces',
    highlightColor: '#67e8f9',
    description: 'Hospital-grade surface sanitizers, active oxygen laundry pods, enzyme dishwash liquids, and aromatherapy room fresheners.',
    descColor: '#cffafe',
    ctaText: 'Shop Home Cleaners',
    ctaTextColor: '#0e7490',
    statusText: 'Antibacterial botanical formula verified',
    statusColor: '#a5f3fc',
    statusDotColor: '#22d3ee',
  },
  'personal-care': {
    slug: 'personal-care',
    name: 'Personal Care',
    image: '/images/banners/banner_3d_personal_care.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#260515]/65 via-[#260515]/30 to-transparent',
    borderColor: 'border-[#e11d48]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(225,29,72,0.22)]',
    auraColor: 'rgba(225, 29, 72, 0.22)',
    tag: 'DERMA APPROVED',
    tagColor: '#FECDD3',
    badge: 'CLEAN BEAUTY',
    badgeBg: '#e11d48',
    badgeText: '#FFFFFF',
    badgeBorder: '#fb7185/40',
    title: 'Radiant Skin & Luxury Daily Self-Care',
    highlightText: 'Pure Botanicals • Dermatologist Tested',
    highlightColor: '#fda4af',
    description: 'Niacinamide glow serums, sulfate-free keratin shampoos, refreshing botanical body washes, and deep hydration luxury care.',
    descColor: '#ffe4e6',
    ctaText: 'Explore Self-Care',
    ctaTextColor: '#be123c',
    statusText: '100% cruelty-free & gentle on skin',
    statusColor: '#fecdd3',
    statusDotColor: '#fb7185',
  },
  'kitchen-essentials': {
    slug: 'kitchen-essentials',
    name: 'Kitchen Essentials',
    image: '/images/banners/banner_3d_kitchen_essentials.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#1c130b]/75 via-[#1c130b]/35 to-transparent',
    borderColor: 'border-[#d97706]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(217,119,6,0.22)]',
    auraColor: 'rgba(217, 119, 6, 0.22)',
    tag: 'CHEF GRADE',
    tagColor: '#FDE68A',
    badge: 'NON-STICK GEAR',
    badgeBg: '#d97706',
    badgeText: '#FFFFFF',
    badgeBorder: '#fbbf24/40',
    title: 'Precision Cookware & Modern Kitchen Gear',
    highlightText: 'Built for Everyday Culinary Magic',
    highlightColor: '#fcd34d',
    description: 'Hard-anodized frying pans, Japanese high-carbon chef knives, airtight borosilicate storage jars, and durable silicone cooking tools.',
    descColor: '#fef3c7',
    ctaText: 'Upgrade Kitchen',
    ctaTextColor: '#b45309',
    statusText: 'Food-grade certified & dishwasher safe',
    statusColor: '#fde68a',
    statusDotColor: '#fbbf24',
  },
  'bakery-breads': {
    slug: 'bakery-breads',
    name: 'Bakery & Breads',
    image: '/images/banners/banner_3d_bakery_breads.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#291303]/70 via-[#291303]/30 to-transparent',
    borderColor: 'border-[#f59e0b]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(245,158,11,0.22)]',
    auraColor: 'rgba(245, 158, 11, 0.22)',
    tag: 'ARTISAN BAKERY',
    tagColor: '#FEF08A',
    badge: 'OVEN FRESH',
    badgeBg: '#d97706',
    badgeText: '#FFFFFF',
    badgeBorder: '#f59e0b/40',
    title: 'Warm Artisan Breads & Flaky Croissants',
    highlightText: 'Baked Fresh Every Morning at 4:00 AM',
    highlightColor: '#fde68a',
    description: 'Crusty wild-yeast sourdough boules, flaky French butter croissants, soft whole wheat sandwich breads, and decadent tea cakes.',
    descColor: '#fef9c3',
    ctaText: 'Order Fresh Breads',
    ctaTextColor: '#b45309',
    statusText: 'Baked within hours of delivery',
    statusColor: '#fef08a',
    statusDotColor: '#f59e0b',
  },
  'staples-cooking-essentials': {
    slug: 'staples-cooking-essentials',
    name: 'Staples & Cooking',
    image: '/images/banners/banner_3d_staples_cooking.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#241702]/70 via-[#241702]/30 to-transparent',
    borderColor: 'border-[#eab308]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(234,179,8,0.22)]',
    auraColor: 'rgba(234, 179, 8, 0.22)',
    tag: 'HERITAGE PANTRY',
    tagColor: '#FEF08A',
    badge: '100% UNPOLISHED',
    badgeBg: '#ca8a04',
    badgeText: '#FFFFFF',
    badgeBorder: '#eab308/40',
    title: 'Stoneground Atta, Aged Rice & Pure Oils',
    highlightText: '100% Unpolished Dals & Wood-Pressed Oils',
    highlightColor: '#fef08a',
    description: 'Chakki-fresh stoneground wheat flour, fragrant aged long-grain basmati, organic protein dals, and cold-pressed mustard & sesame oils.',
    descColor: '#fef9c3',
    ctaText: 'Restock Pantry',
    ctaTextColor: '#a16207',
    statusText: 'Zero adulteration farm test certified',
    statusColor: '#fef08a',
    statusDotColor: '#eab308',
  },
  'frozen-foods': {
    slug: 'frozen-foods',
    name: 'Frozen Foods',
    image: '/images/banners/banner_3d_frozen_foods.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#041624]/70 via-[#041624]/30 to-transparent',
    borderColor: 'border-[#38bdf8]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(56,189,248,0.22)]',
    auraColor: 'rgba(56, 189, 248, 0.22)',
    tag: 'INSTANT EATS',
    tagColor: '#BAE6FD',
    badge: '-18°C LOCKED',
    badgeBg: '#0284c7',
    badgeText: '#FFFFFF',
    badgeBorder: '#38bdf8/40',
    title: 'Crispy Golden Fries & Sweet Ice Delights',
    highlightText: 'Flash-Frozen to Seal Taste & Vitamins',
    highlightColor: '#a5f3fc',
    description: 'Crispy crinkle golden fries, tender sweet green peas, gourmet steamed dimsums, and creamy frozen dessert gelato tubs ready in 5 mins.',
    descColor: '#e0f2fe',
    ctaText: 'Shop Frozen Treats',
    ctaTextColor: '#0369a1',
    statusText: 'Dry ice thermal insulated transit pack',
    statusColor: '#bae6fd',
    statusDotColor: '#38bdf8',
  },
  'baby-care-essentials': {
    slug: 'baby-care-essentials',
    name: 'Baby Care',
    image: '/images/banners/banner_3d_baby_care.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#260e18]/70 via-[#260e18]/30 to-transparent',
    borderColor: 'border-[#f43f5e]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(244,63,94,0.22)]',
    auraColor: 'rgba(244, 63, 94, 0.22)',
    tag: 'PEDIATRICIAN APPROVED',
    tagColor: '#FECDD3',
    badge: 'TEAR-FREE',
    badgeBg: '#e11d48',
    badgeText: '#FFFFFF',
    badgeBorder: '#fb7185/40',
    title: 'Gentle Care & Protection for Little Ones',
    highlightText: '100% Hypoallergenic Cotton & Pure Water',
    highlightColor: '#fecdd3',
    description: 'Feather-soft breathable cotton diapers, 99% pure water aloe wipes, soothing tear-free botanical baby washes, and sterile feeding gear.',
    descColor: '#ffe4e6',
    ctaText: 'Shop Baby Essentials',
    ctaTextColor: '#be123c',
    statusText: 'Dermatologist tested for newborn skin',
    statusColor: '#fecdd3',
    statusDotColor: '#fb7185',
  },
  'pet-supplies': {
    slug: 'pet-supplies',
    name: 'Pet Supplies',
    image: '/images/banners/banner_3d_pet_supplies.jpg',
    objectPosition: 'object-right',
    scrimGradient: 'from-[#120a05]/80 via-[#120a05]/40 to-transparent',
    borderColor: 'border-[#ea580c]/30',
    shadowColor: 'shadow-[0_12px_35px_rgba(234,88,12,0.22)]',
    auraColor: 'rgba(234, 88, 12, 0.22)',
    tag: 'VET RECOMMENDED',
    tagColor: '#FED7AA',
    badge: 'ZERO FILLERS',
    badgeBg: '#c2410c',
    badgeText: '#FFFFFF',
    badgeBorder: '#ea580c/40',
    title: 'Wholesome Feasts & Treats for Happy Pets',
    highlightText: 'High-Protein Nutrition for Dogs & Cats',
    highlightColor: '#fed7aa',
    description: 'High-protein wholesome dog kibble, gourmet salmon cat gravies, natural dental chew bones, and engaging play toys for your furry family.',
    descColor: '#ffedd5',
    ctaText: 'Pamper Your Pets',
    ctaTextColor: '#9a3412',
    statusText: 'Approved by certified animal nutritionists',
    statusColor: '#fed7aa',
    statusDotColor: '#ea580c',
  },
};

interface HaatzaLiteCategoryCinematicBannerProps {
  title?: string;
  categorySlug?: string;
}

export const HaatzaLiteCategoryCinematicBanner: React.FC<HaatzaLiteCategoryCinematicBannerProps> = ({
  title,
  categorySlug,
}) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Derive active category configuration
  const currentCategory = useMemo<CategoryHeroBannerConfig>(() => {
    if (categorySlug && CATEGORY_HERO_CONFIGS[categorySlug]) {
      return CATEGORY_HERO_CONFIGS[categorySlug];
    }

    const path = decodeURIComponent(location.pathname).toLowerCase();
    if (path.includes('fruits') || path.includes('veg')) return CATEGORY_HERO_CONFIGS['fruits-vegetables'];
    if (path.includes('dairy') || path.includes('breakfast')) return CATEGORY_HERO_CONFIGS['dairy-breakfast'];
    if (path.includes('snack') || path.includes('beverage')) return CATEGORY_HERO_CONFIGS['snacks-beverages'];
    if (path.includes('clean') || path.includes('household')) return CATEGORY_HERO_CONFIGS['household-cleaning'];
    if (path.includes('personal') || (path.includes('care') && !path.includes('baby'))) return CATEGORY_HERO_CONFIGS['personal-care'];
    if (path.includes('kitchen')) return CATEGORY_HERO_CONFIGS['kitchen-essentials'];
    if (path.includes('bakery') || path.includes('bread')) return CATEGORY_HERO_CONFIGS['bakery-breads'];
    if (path.includes('staple') || path.includes('cooking')) return CATEGORY_HERO_CONFIGS['staples-cooking-essentials'];
    if (path.includes('frozen')) return CATEGORY_HERO_CONFIGS['frozen-foods'];
    if (path.includes('baby')) return CATEGORY_HERO_CONFIGS['baby-care-essentials'];
    if (path.includes('pet')) return CATEGORY_HERO_CONFIGS['pet-supplies'];
    if (path.includes('all-for-you') || path.includes('/all')) return CATEGORY_HERO_CONFIGS['all'];

    if (title) {
      const lower = title.toLowerCase();
      if (lower.includes('fruit') || lower.includes('veg')) return CATEGORY_HERO_CONFIGS['fruits-vegetables'];
      if (lower.includes('dairy') || lower.includes('breakfast')) return CATEGORY_HERO_CONFIGS['dairy-breakfast'];
      if (lower.includes('snack') || lower.includes('beverage')) return CATEGORY_HERO_CONFIGS['snacks-beverages'];
      if (lower.includes('clean') || lower.includes('household')) return CATEGORY_HERO_CONFIGS['household-cleaning'];
      if (lower.includes('personal')) return CATEGORY_HERO_CONFIGS['personal-care'];
      if (lower.includes('kitchen')) return CATEGORY_HERO_CONFIGS['kitchen-essentials'];
      if (lower.includes('bakery') || lower.includes('bread')) return CATEGORY_HERO_CONFIGS['bakery-breads'];
      if (lower.includes('staple') || lower.includes('cooking')) return CATEGORY_HERO_CONFIGS['staples-cooking-essentials'];
      if (lower.includes('frozen')) return CATEGORY_HERO_CONFIGS['frozen-foods'];
      if (lower.includes('baby')) return CATEGORY_HERO_CONFIGS['baby-care-essentials'];
      if (lower.includes('pet')) return CATEGORY_HERO_CONFIGS['pet-supplies'];
    }

    return CATEGORY_HERO_CONFIGS['all'];
  }, [categorySlug, location.pathname, title]);

  // Smooth entrance trigger upon category change
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 40);
    return () => clearTimeout(timer);
  }, [currentCategory.slug]);

  const scrollToGrid = () => {
    window.scrollBy({ top: 380, behavior: 'smooth' });
  };

  const isBabyCare = currentCategory.slug === 'baby-care-essentials';

  return (
    <div className="relative w-full mb-3 sm:mb-4 select-none">
      <style>{`
        /* Cinematic Ken Burns zoom matching home hero banner */
        @keyframes categoryKenBurnsZoom {
          0% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.045) translate3d(0, 0, 0);
          }
        }

        .category-ken-burns {
          animation: categoryKenBurnsZoom 10s ease-in-out infinite alternate;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        @keyframes ctaSheenSweep {
          0%, 65% {
            transform: translate3d(-150%, 0, 0) skewX(-20deg);
            opacity: 0;
          }
          70% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translate3d(250%, 0, 0) skewX(-20deg);
            opacity: 0;
          }
        }

        .cta-breathing-sheen {
          animation: ctaSheenSweep 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-ken-burns,
          .cta-breathing-sheen {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Main Category Banner Container - Matched to other category banners */}
      <div
        className={`relative rounded-3xl overflow-hidden text-white ${currentCategory.shadowColor} ${
          isBabyCare
            ? 'h-[280px] sm:h-[340px] md:h-[380px] max-h-[380px]'
            : 'min-h-[300px] sm:min-h-[350px] md:min-h-[380px]'
        } flex items-center ${currentCategory.borderColor} border group/hero transition-all duration-700 ease-out`}
      >
        {/* Full-Bleed Background Image with Ultra-slow cinematic Ken Burns zoom */}
        <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${currentCategory.bannerBg || ''}`}>
          <img
            key={currentCategory.image}
            src={currentCategory.image}
            alt={currentCategory.title}
            className={`w-full h-full ${
              currentCategory.imageFit === 'contain'
                ? 'object-contain object-right p-3 sm:p-5 sm:pr-8 md:pr-14'
                : `object-cover ${currentCategory.objectPosition || 'object-right sm:object-center'} category-ken-burns`
            } select-none`}
            loading="eager"
          />

          {/* Seamless Category-Toned Dark Gradient Scrim on Left Side */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentCategory.scrimGradient} sm:w-[68%] pointer-events-none`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />

          {/* Subtle category atmospheric aura */}
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none"
            style={{ background: currentCategory.auraColor }}
          />
        </div>

        {/* Left-Side Content: Masked vertical slide-up on entry matching Home Banner */}
        <div
          className={`relative z-10 w-full max-w-2xl px-5 sm:px-14 lg:px-16 ${
            isBabyCare ? 'py-4 sm:py-5 lg:py-6' : 'py-6 sm:py-8 lg:py-10'
          }`}
        >
          <div
            className={`${
              isBabyCare ? 'space-y-2 sm:space-y-2.5' : 'space-y-4 sm:space-y-5'
            } transition-all duration-500 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-xs"
                style={{ color: currentCategory.tagColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {currentCategory.tag}
              </span>

              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shadow-md"
                style={{
                  backgroundColor: currentCategory.badgeBg,
                  color: currentCategory.badgeText,
                  borderColor: currentCategory.badgeBorder,
                }}
              >
                <Zap className="w-3 h-3 fill-current" />
                {currentCategory.badge}
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`${
                isBabyCare ? 'text-xl sm:text-3xl lg:text-4xl' : 'text-2xl sm:text-4xl lg:text-5xl'
              } font-black tracking-tight leading-[1.1] text-white font-heading drop-shadow-md`}
            >
              {currentCategory.title}
            </h1>

            {/* Sub-Highlight line in category vibrant accent color */}
            <p
              className={`${
                isBabyCare ? 'text-sm sm:text-base' : 'text-base sm:text-xl'
              } font-extrabold drop-shadow-sm`}
              style={{ color: currentCategory.highlightColor }}
            >
              {currentCategory.highlightText}
            </p>

            {/* Description */}
            <p
              className={`text-xs sm:text-sm max-w-xl leading-relaxed drop-shadow-xs font-medium ${
                isBabyCare ? 'line-clamp-2' : ''
              }`}
              style={{ color: currentCategory.descColor }}
            >
              {currentCategory.description}
            </p>

            {/* CTA & Delivery Reassurance Row */}
            <div className={`${isBabyCare ? 'pt-1' : 'pt-2'} flex flex-wrap items-center gap-3`}>
              <button
                type="button"
                onClick={scrollToGrid}
                className={`relative overflow-hidden ${
                  isBabyCare ? 'px-5 py-2.5 sm:py-3 text-xs' : 'px-6 py-3.5 text-xs sm:text-sm'
                } rounded-2xl bg-white hover:bg-slate-50 font-black transition-all duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-2 group active:scale-95 cursor-pointer`}
                style={{ color: currentCategory.ctaTextColor }}
              >
                <span className="relative z-10">{currentCategory.ctaText}</span>
                <ArrowRight
                  className="relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200"
                  style={{ color: currentCategory.ctaTextColor }}
                />

                {/* Periodic Sheen Reflection sweeping across button every 4s */}
                <div
                  className="cta-breathing-sheen absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </button>

              <span
                className="text-[11px] font-semibold flex items-center gap-1.5 pl-2"
                style={{ color: currentCategory.statusColor }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: currentCategory.statusDotColor }}
                />
                {currentCategory.statusText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaatzaLiteCategoryCinematicBanner;
