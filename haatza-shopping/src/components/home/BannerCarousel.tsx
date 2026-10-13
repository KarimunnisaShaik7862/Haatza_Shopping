import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { MainCarouselBanner } from '../../services/mock/data/promotions';

interface BannerCarouselProps {
  banners: MainCarouselBanner[];
  autoplayInterval?: number;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  autoplayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const total = banners.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isPaused, autoplayInterval, nextSlide, total]);

  // Mobile Touch / Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 50; // min swipe distance in px

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl group shadow-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Promotional Banners"
    >
      {/* Banner Slides Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`min-w-full relative shrink-0 overflow-hidden bg-gradient-to-r ${banner.bgGradient} text-white`}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={banner.image}
                alt={banner.headline}
                className="w-full h-full object-cover object-center opacity-35 mix-blend-overlay scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:w-3/4" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-col justify-center min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] max-w-2xl">
              {/* Category & Offer Badges */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 fill-amber-300 text-amber-300" />
                  {banner.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xs">
                  {banner.offerText}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm mb-2 sm:mb-3">
                {banner.headline}
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg font-medium text-zinc-200 mb-2 sm:mb-3 line-clamp-1">
                {banner.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 mb-5 sm:mb-7 max-w-lg hidden sm:block leading-relaxed">
                {banner.description}
              </p>

              {/* Call to Action Button */}
              <div>
                <Link
                  to={banner.ctaLink}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group/btn"
                >
                  <span>{banner.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous / Next Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous promotional slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 focus:opacity-100 focus:outline-hidden"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next promotional slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 focus:opacity-100 focus:outline-hidden"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {banners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to promotional slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-white shadow-xs' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
