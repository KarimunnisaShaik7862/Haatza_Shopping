import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlide } from '../../types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface HeroBannerProps {
  slides: HeroSlide[];
}

export const HeroBanner: React.FC<HeroBannerProps> = React.memo(({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        if (!document.hidden) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
      }, 6000);
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
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;

  const slide = slides[currentSlide];

  return (
    <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white shadow-xl min-h-[360px] sm:min-h-[440px] flex items-center transition-all duration-700`}
      >
        {/* Background accent glow */}
        <div
          className="absolute -right-20 -top-20 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ backgroundColor: slide.accentColor || '#E53935' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 w-full">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                {slide.tag}
              </span>
              <span className="text-[11px] font-bold text-amber-300">
                ★ {slide.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-none text-white">
              {slide.title}
            </h1>

            <p className="text-base sm:text-xl font-bold text-rose-300">
              {slide.highlightText}
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to={slide.ctaLink}
                className="px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
              <img
                src={optimizeImageUrl(slide.image, { width: 640, quality: 75 })}
                alt={slide.title}
                width="320"
                height="320"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  Featured Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx ? 'w-6 bg-[#E53935]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
});

HeroBanner.displayName = 'HeroBanner';
