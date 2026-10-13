import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLiteHeroSlide } from '../../types/haatzaLite.types';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HaatzaLiteHeroBannerProps {
  slides: HaatzaLiteHeroSlide[];
}

export const HaatzaLiteHeroBanner: React.FC<HaatzaLiteHeroBannerProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-4 pb-2">
      <div
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white shadow-xl min-h-[340px] sm:min-h-[400px] flex items-center transition-all duration-700`}
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-12 w-full">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                {slide.tag}
              </span>
              <span className="text-[11px] font-black text-yellow-300">
                {slide.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight sm:leading-none text-white font-heading">
              {slide.title}
            </h1>

            <p className="text-base sm:text-xl font-bold text-emerald-200">
              {slide.highlightText}
            </p>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              {slide.description}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to={slide.ctaLink}
                className="px-6 py-3 rounded-xl bg-white text-[#238636] hover:bg-emerald-50 font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <img
                src={slide.image}
                alt={slide.title}
                width="320"
                height="320"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-xs font-black text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  ⚡ 10-15 Min Express Dark Store
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
                    currentSlide === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
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
};
