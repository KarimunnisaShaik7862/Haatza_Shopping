import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { MainCarouselBanner } from '../../services/mock/data/promotions';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface HeroCampaignProps {
  banners: MainCarouselBanner[];
  autoplayInterval?: number;
}

interface SpotlightCampaign {
  id: string;
  badge: string;
  headline: string;
  highlightText: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  floatingImage: string;
  floatingAlt: string;
  accentBg: string;
  tagline: string;
}

const SPOTLIGHT_CAMPAIGNS: SpotlightCampaign[] = [
  {
    id: 'spotlight-1',
    badge: 'GRAND FESTIVE EDIT',
    headline: 'Pure Linen & Artisan Silks',
    highlightText: 'FLAT 50% - 70% OFF',
    subtext: 'Bespoke Belgian linens, festive kurtas & luxury handloom weaves.',
    ctaText: 'Grab the Deal',
    ctaLink: '/category/fashion',
    floatingImage: optimizeImageUrl('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=480&q=75', { width: 480, quality: 75 }),
    floatingAlt: 'Pure Linen Artisan Shirt',
    accentBg: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
    tagline: 'Limited Stock • Free Express Shipping',
  },
  {
    id: 'spotlight-2',
    badge: 'NEXT-GEN TECH DROP',
    headline: 'Studio ANC & Smart Audio',
    highlightText: 'UP TO 65% OFF',
    subtext: '40dB Hybrid Active Noise Cancellation & 65-hour playback.',
    ctaText: 'Shop Electronics',
    ctaLink: '/category/electronics',
    floatingImage: optimizeImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=480&q=75', { width: 480, quality: 75 }),
    floatingAlt: 'AcousticPro Studio ANC Headphones',
    accentBg: 'from-[#0B1A3A] via-[#1E4ED8] to-[#1D4ED8]',
    tagline: 'Instant 10% Bank Discount Applied',
  },
  {
    id: 'spotlight-3',
    badge: 'CLINICAL DERMA CARE',
    headline: 'Pure Vitamin C & Serums',
    highlightText: 'BUY 1 GET 1 AT ₹1',
    subtext: 'Dermatologist-formulated skin glow serums with hyaluronic boost.',
    ctaText: 'Explore Skincare',
    ctaLink: '/category/beauty',
    floatingImage: optimizeImageUrl('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=480&q=75', { width: 480, quality: 75 }),
    floatingAlt: 'Radiance Glow Vitamin C Serum',
    accentBg: 'from-[#0A1931] via-[#1E3A8A] to-[#2962FF]',
    tagline: 'Clean & Cruelty-Free Formulations',
  },
];

interface CoordinatedBanner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
}

const RIGHT_BANNERS_DATA: CoordinatedBanner[] = [
  {
    id: 'right-banner-1',
    tag: 'FLAGSHIP DROP',
    title: '5G Smartphones & AMOLED Wearables',
    subtitle: 'Snapdragon power, 120Hz displays & fast charging',
    discount: 'UP TO ₹8,000 OFF',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=720&q=75', { width: 720, quality: 75 }),
    ctaText: 'Explore Tech',
    ctaLink: '/category/mobiles',
    bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
  },
  {
    id: 'right-banner-2',
    tag: 'HOME UPGRADE',
    title: '400 TC Egyptian Cotton Bedsheets',
    subtitle: 'Five-star hotel luxury sateen weave & comforters',
    discount: 'MIN 50% OFF',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=720&q=75', { width: 720, quality: 75 }),
    ctaText: 'Shop Home',
    ctaLink: '/category/home-living',
    bgGradient: 'from-[#0B1A3A] via-[#1E3A8A] to-[#2563EB]',
  },
  {
    id: 'right-banner-3',
    tag: 'TRENDING SNEAKERS',
    title: 'Retro Court Leather Footwear',
    subtitle: 'Full-grain tumbled leather with OrthoLite foam',
    discount: 'FLAT 56% OFF',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=720&q=75', { width: 720, quality: 75 }),
    ctaText: 'View Footwear',
    ctaLink: '/category/fashion',
    bgGradient: 'from-[#0A1931] via-[#1D4ED8] to-[#1E3A8A]',
  },
];

export const HeroCampaign: React.FC<HeroCampaignProps> = React.memo(({
  banners,
  autoplayInterval = 5000,
}) => {
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [rightSlideIndex, setRightSlideIndex] = useState(0);

  const nextSpotlight = useCallback(() => {
    setActiveSpotlightIndex((prev) => (prev + 1) % SPOTLIGHT_CAMPAIGNS.length);
    setRightSlideIndex((prev) => (prev + 1) % RIGHT_BANNERS_DATA.length);
  }, []);

  const prevSpotlight = useCallback(() => {
    setActiveSpotlightIndex((prev) => (prev - 1 + SPOTLIGHT_CAMPAIGNS.length) % SPOTLIGHT_CAMPAIGNS.length);
    setRightSlideIndex((prev) => (prev - 1 + RIGHT_BANNERS_DATA.length) % RIGHT_BANNERS_DATA.length);
  }, []);

  // 5-second automatic rotation with pause on hover and tab background pause
  useEffect(() => {
    if (isHovered) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!document.hidden) {
          nextSpotlight();
        }
      }, autoplayInterval);
    };

    startTimer();

    const handleVisibility = () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isHovered, autoplayInterval, nextSpotlight]);

  const currentSpotlight = SPOTLIGHT_CAMPAIGNS[activeSpotlightIndex];

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Promotional Hero Showcase"
    >
      {/* 30% / 70% Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4.5 items-stretch">
        
        {/* ========================================================= */}
        {/* LEFT 30%: MAJOR HIGH-PRIORITY PROMOTIONAL CAMPAIGN (~4/12 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-col">
          <div
            className={`relative flex-1 rounded-3xl bg-gradient-to-br ${currentSpotlight.accentBg} text-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm border border-white/10 transition-all duration-500 min-h-[380px] sm:min-h-[440px]`}
          >
            {/* Top Row: Badge & Progress Indicator */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-black tracking-wider uppercase text-white shadow-2xs font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{currentSpotlight.badge}</span>
              </div>
              <div className="flex items-center gap-1">
                {SPOTLIGHT_CAMPAIGNS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSpotlightIndex(idx);
                      setRightSlideIndex(idx);
                    }}
                    aria-label={`Go to spotlight slide ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeSpotlightIndex === idx
                        ? 'w-6 bg-white shadow-2xs'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Center: Clean, Bright Floating Product Image (NO heavy black shadow) */}
            <div className="relative z-10 my-3 sm:my-4 flex items-center justify-center">
              <div className="relative group/float cursor-pointer">
                <img
                  key={currentSpotlight.floatingImage}
                  src={currentSpotlight.floatingImage}
                  alt={currentSpotlight.floatingAlt}
                  width="192"
                  height="192"
                  decoding="async"
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-2xl bg-white/95 ring-1 ring-white/40 transition-all duration-500 animate-float"
                />
                
                {/* Floating Discount Tag Pill */}
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-stone-950 px-3 py-1 rounded-full text-xs font-black shadow-sm uppercase tracking-wide flex items-center gap-1 font-heading">
                  <Flame className="w-3 h-3 fill-stone-950" />
                  <span>{currentSpotlight.highlightText}</span>
                </div>
              </div>
            </div>

            {/* Bottom Content: Bold Headline, Subtext, CTA */}
            <div className="relative z-10 space-y-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight font-heading">
                  {currentSpotlight.headline}
                </h2>
                <p className="text-xs text-white/90 mt-1 line-clamp-2 leading-relaxed font-body">
                  {currentSpotlight.subtext}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link
                  to={currentSpotlight.ctaLink}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group/btn font-heading"
                >
                  <span>{currentSpotlight.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#2962FF] group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur-xs p-1 rounded-full border border-white/10">
                  <button
                    type="button"
                    onClick={prevSpotlight}
                    aria-label="Previous spotlight"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSpotlight}
                    aria-label="Next spotlight"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-white/75 font-medium text-center sm:text-left font-body">
                {currentSpotlight.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT 70%: COORDINATED EDITORIAL BANNER GRID (~8/12 cols) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between gap-3.5 sm:gap-4.5">
          
          {/* Top Large Featured Asymmetric Banner */}
          <div className="relative flex-1 rounded-3xl overflow-hidden group shadow-sm min-h-[220px] sm:min-h-[250px] border border-zinc-200/80">
            {/* Slide Track */}
            <div
              className="flex transition-transform duration-500 ease-in-out h-full w-full"
              style={{ transform: `translateX(-${rightSlideIndex * 100}%)` }}
            >
              {RIGHT_BANNERS_DATA.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`min-w-full h-full relative shrink-0 overflow-hidden bg-gradient-to-r ${banner.bgGradient} text-white flex items-center p-6 sm:p-12`}
                >
                  {/* Background Image without heavy black shadow/filter */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-[#700000]/40 to-transparent sm:w-4/5" />
                  </div>

                  {/* Banner Content */}
                  <div className="relative z-10 max-w-xl space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white font-heading">
                        {banner.tag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider font-heading">
                        {banner.discount}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-3xl font-black text-white leading-tight tracking-tight font-heading">
                      {banner.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-200 line-clamp-1 max-w-md font-body">
                      {banner.subtitle}
                    </p>

                    <div className="pt-2">
                      <Link
                        to={banner.ctaLink}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 group/rbtn font-heading"
                      >
                        <span>{banner.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2962FF] group-hover/rbtn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination indicator for top banner */}
            <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full">
              {RIGHT_BANNERS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRightSlideIndex(idx)}
                  aria-label={`Go to banner slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    rightSlideIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Dual Sub-Banners (Asymmetric Editorial Split) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4.5">
            
            {/* Sub-Banner 1: Luxury Beauty & Fragrances */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F2042] via-[#1E40AF] to-[#2962FF] text-white p-5 sm:p-6 flex flex-col justify-between shadow-sm border border-white/10 min-h-[170px]">
              <div className="absolute inset-0 z-0">
                <img
                  src={optimizeImageUrl("https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=75", { width: 500, quality: 75 })}
                  alt="Luxury Beauty"
                  className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="170"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200 bg-white/15 px-2 py-0.5 rounded-md font-heading">
                  Luxury Beauty
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1.5 leading-snug font-heading">
                  French Perfumes & Glow Serums
                </h4>
                <p className="text-xs text-zinc-200 mt-0.5 font-body">
                  Extra 15% off with code <strong className="text-amber-300 font-mono">GLOW15</strong>
                </p>
              </div>

              <div className="relative z-10 pt-3 flex items-center justify-between">
                <Link
                  to="/category/beauty"
                  className="text-xs font-bold text-white hover:text-amber-300 inline-flex items-center gap-1 group-hover:underline font-heading"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[10px] font-black text-amber-300 bg-black/40 px-2 py-0.5 rounded-full font-heading">
                  Up to 50% Off
                </span>
              </div>
            </div>

            {/* Sub-Banner 2: Smart Living & Kitchenware */}
            <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B1A3A] via-[#1E3A8A] to-[#2563EB] text-white p-5 sm:p-6 flex flex-col justify-between shadow-sm border border-white/10 min-h-[170px]">
              <div className="absolute inset-0 z-0">
                <img
                  src={optimizeImageUrl("https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=500&q=75", { width: 500, quality: 75 })}
                  alt="Air Fryers & Appliances"
                  className="w-full h-full object-cover opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="170"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-200 bg-white/15 px-2 py-0.5 rounded-md font-heading">
                  Kitchen & Appliances
                </span>
                <h4 className="text-base sm:text-lg font-black text-white mt-1.5 leading-snug font-heading">
                  Smart Digital Air Fryers & Cookware
                </h4>
                <p className="text-xs text-zinc-200 mt-0.5 font-body">
                  No-cost EMI from <strong className="text-white">₹599/month</strong>
                </p>
              </div>

              <div className="relative z-10 pt-3 flex items-center justify-between">
                <Link
                  to="/category/appliances"
                  className="text-xs font-bold text-white hover:text-amber-300 inline-flex items-center gap-1 group-hover:underline font-heading"
                >
                  <span>Discover Deals</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[10px] font-black text-emerald-300 bg-black/40 px-2 py-0.5 rounded-full font-heading">
                  Min 40% Off
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
});

HeroCampaign.displayName = 'HeroCampaign';
