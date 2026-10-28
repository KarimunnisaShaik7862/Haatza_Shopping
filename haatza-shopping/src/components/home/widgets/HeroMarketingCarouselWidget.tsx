import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { HeroCampaignSlide } from '../../../types/homepageWidgets.types';
import { mockHeroCampaignSlides } from '../../../services/mock/data/homepageWidgets.data';

interface HeroMarketingCarouselWidgetProps {
  slides?: HeroCampaignSlide[];
  autoplayInterval?: number;
  className?: string;
}

export const HeroMarketingCarouselWidget: React.FC<HeroMarketingCarouselWidgetProps> = ({
  slides = mockHeroCampaignSlides,
  autoplayInterval = 4500,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay management with pause-on-hover & reduced motion respect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || prefersReducedMotion || totalSlides <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides, autoplayInterval, nextSlide]);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[currentIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Fashion Campaigns"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`relative w-full rounded-md sm:rounded-lg overflow-hidden border border-slate-200/60 bg-[#0B132B] ${className}`}
    >
      {/* Slides Container */}
      <div className="relative min-h-[410px] sm:min-h-[450px] lg:min-h-[485px] w-full flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${totalSlides}: ${slide.headline}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-700 ease-out flex items-center ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Visual with Subtle Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.headline}
                  className={`w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out ${
                    isActive ? 'scale-100' : 'scale-105'
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                {/* Soft Editorial Contrast Overlay (Ensures text legibility without harsh black shadow) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              </div>

              {/* Text & Content Overlay */}
              <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-12 flex flex-col justify-center max-w-2xl text-white">
                {/* Category Badge & Offer Pill */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#2962FF] text-white shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    {slide.badge}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/20 text-blue-200 backdrop-blur-xs border border-white/20">
                    {slide.offerText}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-[1.15] text-white font-heading drop-shadow-xs">
                  {slide.headline}
                </h2>

                {/* Subtitle */}
                <p className="mt-2 text-base sm:text-lg font-medium text-blue-100/95 tracking-wide font-sans drop-shadow-xs">
                  {slide.subtitle}
                </p>

                {/* Editorial Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-200 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {slide.description}
                </p>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0B132B] hover:bg-[#EEF3FF] hover:text-[#2962FF] font-bold text-sm tracking-wide shadow-md transition-all duration-200 active:scale-95 group"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  {slide.secondaryCtaText && slide.secondaryCtaLink && (
                    <Link
                      to={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-xs font-semibold text-sm tracking-wide transition-all duration-200"
                    >
                      <span>{slide.secondaryCtaText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Controls (Left & Right Arrows) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Campaign"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-hidden cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Campaign"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-hidden cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Status Bar: Pagination Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center px-6 sm:px-12 pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={`dot-${slide.id}`}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-hidden ${
                  isActive
                    ? 'w-7 sm:w-8 h-2.5 bg-[#2962FF] shadow-xs'
                    : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
