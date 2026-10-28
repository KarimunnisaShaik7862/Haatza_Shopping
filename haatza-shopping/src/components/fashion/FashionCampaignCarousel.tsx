import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface CampaignBannerSlide {
  id: string;
  tag: string;
  offer: string;
  headline: string;
  subtitle: string;
  primaryImage: string;
  splitImage?: string;
  link: string;
  ctaText: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  gradientTheme: string;
}

const DEFAULT_SLIDES: CampaignBannerSlide[] = [
  {
    id: 'slide-festive',
    tag: 'ROYAL FESTIVE COUTURE',
    offer: 'FLAT 50% - 70% OFF',
    headline: 'The Heritage Handloom & Silk Edit',
    subtitle: 'Pure Banarasi Katan weaves, celebratory Chikankari kurtas, and handcrafted Kundan motifs.',
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    splitImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
    link: '/category/women-fashion/ethnic-wear/sarees',
    ctaText: 'Shop Festive Couture',
    secondaryCtaText: 'Explore Sarees',
    secondaryCtaLink: '/category/women-fashion/ethnic-wear/sarees',
    gradientTheme: 'from-[#1A0B2E] via-[#2E0854] to-[#4A0E4E]',
  },
  {
    id: 'slide-casual-office',
    tag: 'EXECUTIVE & CASUAL CAPSULE',
    offer: 'UP TO 60% OFF',
    headline: 'Modern Tailoring & Everyday Coordinates',
    subtitle: 'Crisp Belgian poplin, fluid wide-leg silhouettes, and effortless morning-to-evening dressing.',
    primaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    splitImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
    link: '/category/women-fashion/western-wear',
    ctaText: 'Discover Contemporary',
    secondaryCtaText: 'View Workwear',
    secondaryCtaLink: '/category/women-fashion/western-wear/shirts',
    gradientTheme: 'from-[#0B132B] via-[#1C2541] to-[#1E3A8A]',
  },
  {
    id: 'slide-evening',
    tag: 'STUDIO GLAMOUR',
    offer: 'EXCLUSIVE STYLES FROM ₹1,499',
    headline: 'Midnight Satin & Evening Elegance',
    subtitle: 'Draped jewel-toned slip dresses, architectural cocktail cuts, and celebratory accessories.',
    primaryImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
    splitImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    link: '/category/women-fashion/dresses',
    ctaText: 'Explore Party Edits',
    secondaryCtaText: 'Cocktail Footwear',
    secondaryCtaLink: '/category/women-fashion/footwear',
    gradientTheme: 'from-[#030712] via-[#111827] to-[#1F2937]',
  },
];

interface FashionCampaignCarouselProps {
  slides?: CampaignBannerSlide[];
  autoplayInterval?: number;
  className?: string;
}

export const FashionCampaignCarousel: React.FC<FashionCampaignCarouselProps> = ({
  slides = DEFAULT_SLIDES,
  autoplayInterval = 5500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const timer = setInterval(nextSlide, autoplayInterval);
    return () => clearInterval(timer);
  }, [isPaused, autoplayInterval, nextSlide, totalSlides]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      aria-label="Fashion Promotional Campaign"
      className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 bg-slate-900 group ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding Carousel Track */}
      <div
        className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const optimizedPrimary = optimizeImageUrl(slide.primaryImage, { width: 1000, quality: 85 });
          const optimizedSplit = slide.splitImage
            ? optimizeImageUrl(slide.splitImage, { width: 600, quality: 85 })
            : null;

          return (
            <div
              key={slide.id}
              className="w-full shrink-0 relative min-h-[360px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[480px] flex items-center overflow-hidden"
            >
              {/* Split-Image Editorial Background Layout */}
              <div className="absolute inset-0 z-0 grid grid-cols-1 md:grid-cols-12 overflow-hidden pointer-events-none">
                {/* Left/Main Column: Dramatic dark backdrop with brand gradient */}
                <div
                  className={`relative md:col-span-6 lg:col-span-5 bg-gradient-to-br ${slide.gradientTheme} h-full z-10 flex flex-col justify-center`}
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                </div>

                {/* Right Editorial Split Images (Side-by-Side Fashion Look) */}
                <div className="relative md:col-span-6 lg:col-span-7 h-full grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
                  {/* Primary Editorial Image */}
                  <div className="relative h-full overflow-hidden bg-slate-800">
                    <img
                      src={optimizedPrimary}
                      alt={slide.headline}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className={`w-full h-full object-cover object-top transition-transform duration-1000 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    {/* Shadow overlay gradient blending into text panel */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent md:block hidden" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:hidden" />
                  </div>

                  {/* Secondary Split Image (Detail/Lookbook) */}
                  {optimizedSplit && (
                    <div className="relative h-full overflow-hidden bg-slate-800 hidden sm:block border-l border-white/10">
                      <img
                        src={optimizedSplit}
                        alt={`${slide.headline} detail`}
                        loading="lazy"
                        className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      {/* Editorial Detail Badge */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 font-heading">
                          LOOKBOOK EDIT
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Editorial Typography & CTA Panel (Left Overlay) */}
              <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 pointer-events-auto">
                <div className="max-w-xl space-y-3.5 sm:space-y-4">
                  {/* Badge Pills */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] sm:text-xs font-black tracking-widest uppercase text-white shadow-xs border border-white/20 font-heading">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      <span>{slide.tag}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xs bg-amber-400 text-stone-950 font-heading">
                      {slide.offer}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-heading">
                    {slide.headline}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-zinc-200 leading-relaxed font-body max-w-md sm:max-w-lg">
                    {slide.subtitle}
                  </p>

                  {/* Action CTAs */}
                  <div className="pt-2 sm:pt-3 flex items-center gap-3 flex-wrap">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group/btn font-heading"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>

                    {slide.secondaryCtaText && slide.secondaryCtaLink && (
                      <Link
                        to={slide.secondaryCtaLink}
                        className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 border border-white/25 font-heading"
                      >
                        <span>{slide.secondaryCtaText}</span>
                        <ArrowUpRight className="w-4 h-4 text-white shrink-0" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev / Next Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Campaign Slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-hidden"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Campaign Slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-hidden"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Indicator Pills */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-white shadow-sm'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FashionCampaignCarousel;
