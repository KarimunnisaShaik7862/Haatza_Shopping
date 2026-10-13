import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Gift, Flame, PartyPopper } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface FestivalCampaign {
  id: string;
  festivalTag: string;
  badge: string;
  title: string;
  subtitle: string;
  offerText: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  accentBadgeColor: string;
  image: string;
  tagline: string;
}

const FESTIVAL_CAMPAIGNS: FestivalCampaign[] = [
  {
    id: 'fest-dussehra',
    festivalTag: 'DUSSEHRA MAHA SALE',
    badge: 'GRAND VICTORY OFFERS',
    title: 'Grand Dussehra Festive Carnival',
    subtitle: 'Pure Banarasi silks, handcrafted ethnic kurtas & artisanal gift boxes.',
    offerText: 'FLAT 50% - 70% OFF',
    ctaText: 'Explore Dussehra Deals',
    ctaLink: '/category/fashion',
    bgGradient: 'from-[#0F2042] via-[#1E40AF] to-[#2962FF]',
    accentBadgeColor: 'bg-amber-400 text-stone-950',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=75', { width: 900, quality: 75 }),
    tagline: '✨ Special Festive Perks: Extra ₹300 Bank Discount + Assured Gold Coin on ₹2999+',
  },
  {
    id: 'fest-pongal',
    festivalTag: 'PONGAL & SANKRANTI CELEBRATION',
    badge: 'HARVEST SPECIAL',
    title: 'Pongal & Sankranti Mega Utsav',
    subtitle: 'Authentic Kanjivaram silks, traditional cookware & brass home decor.',
    offerText: 'UP TO 65% OFF + GIFT HAMPERS',
    ctaText: 'Shop Harvest Collection',
    ctaLink: '/category/home-living',
    bgGradient: 'from-[#1E3A8A] via-[#2962FF] to-[#0284C7]',
    accentBadgeColor: 'bg-emerald-400 text-stone-950',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=75', { width: 900, quality: 75 }),
    tagline: '🌾 Celebrate the Harvest with Free Express Delivery Across India',
  },
  {
    id: 'fest-diwali',
    festivalTag: 'DIWALI DHAMAKA SALE',
    badge: 'FESTIVAL OF LIGHTS',
    title: 'Grand Diwali Sparkle & Tech Festival',
    subtitle: '5G smartphones, wireless ANC audio, smart lighting & premium dry fruit boxes.',
    offerText: 'UP TO 75% OFF + NO-COST EMI',
    ctaText: 'Grab Diwali Offers',
    ctaLink: '/category/electronics',
    bgGradient: 'from-[#0B1A3A] via-[#1E4ED8] to-[#1D4ED8]',
    accentBadgeColor: 'bg-amber-300 text-stone-950',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=75', { width: 900, quality: 75 }),
    tagline: '🪔 Instant 10% Off with HDFC & ICICI Cards • Zero Cost EMI up to 12 Months',
  },
  {
    id: 'fest-eoss',
    festivalTag: 'END OF SEASON MEGA CLEARANCE',
    badge: 'FINAL CALL',
    title: 'Annual Lifestyle & Wardrobe Refresh',
    subtitle: 'Over 10,000+ top styles across designer brands at lowest prices of the year.',
    offerText: 'BUY 1 GET 1 FREE',
    ctaText: 'Shop Clearance',
    ctaLink: '/category/all',
    bgGradient: 'from-[#0A1931] via-[#1E3A8A] to-[#2962FF]',
    accentBadgeColor: 'bg-rose-400 text-stone-950',
    image: optimizeImageUrl('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=75', { width: 900, quality: 75 }),
    tagline: '⚡ Last 48 Hours • Stocks Refreshing Rapidly',
  },
];

export const FestivalBanner: React.FC = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const total = FESTIVAL_CAMPAIGNS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Smooth 5-second automatic rotation with pause on hover & tab background pause
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (!document.hidden) {
          nextSlide();
        }
      }, 5000);
    };

    startTimer();

    const handleVisibility = () => {
      if (document.hidden) {
        if (interval) clearInterval(interval);
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isPaused, nextSlide, total]);

  const current = FESTIVAL_CAMPAIGNS[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    touchStartXRef.current = null;
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-xl group select-none transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Festival Promotional Banners"
    >
      {/* Background slide container with exact Lite Header Banner padding (p-6 sm:p-12) */}
      <div
        className={`relative w-full bg-gradient-to-r ${current.bgGradient} text-white p-6 sm:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-500 overflow-hidden`}
      >
        {/* Decorative background image overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-center opacity-20 mix-blend-overlay scale-105"
            loading="eager"
            decoding="async"
            width="900"
            height="320"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent sm:w-3/4" />
        </div>

        {/* Content Details */}
        <div className="relative z-10 space-y-1.5 max-w-3xl">
          {/* Top Tag & Discount Pill */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-2xs font-heading">
              <PartyPopper className="w-3 h-3 text-amber-300" />
              {current.festivalTag}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-2xs ${current.accentBadgeColor} font-heading`}>
              {current.offerText}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight font-heading">
            {current.title}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-zinc-200 line-clamp-1 max-w-2xl font-body">
            {current.subtitle}
          </p>

          {/* Tagline */}
          <p className="text-[11px] sm:text-xs text-amber-200 font-medium pt-0.5 hidden sm:block font-body">
            {current.tagline}
          </p>
        </div>

        {/* Action Button & Carousel Controls */}
        <div className="relative z-10 flex items-center gap-3 shrink-0 self-start sm:self-center">
          <Link
            to={current.ctaLink}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group/btn font-heading"
          >
            <span>{current.ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#2962FF] group-hover/btn:translate-x-1 transition-transform" />
          </Link>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1 bg-black/30 backdrop-blur-xs p-1 rounded-full border border-white/10">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous festival offer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next festival offer"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide indicators at bottom center */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {FESTIVAL_CAMPAIGNS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to festival slide ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

FestivalBanner.displayName = 'FestivalBanner';
