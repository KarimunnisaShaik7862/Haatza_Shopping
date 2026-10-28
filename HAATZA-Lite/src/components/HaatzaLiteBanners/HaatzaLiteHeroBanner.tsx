import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLiteHeroSlide } from '../../types/haatzaLite.types';
import { ChevronLeft, ChevronRight, ArrowRight, Zap, Sparkles } from 'lucide-react';

interface HaatzaLiteHeroBannerProps {
  slides: HaatzaLiteHeroSlide[];
}

export const HaatzaLiteHeroBanner: React.FC<HaatzaLiteHeroBannerProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-3 pb-2 select-none">
      <div className="relative rounded-3xl overflow-hidden text-white shadow-[0_12px_35px_rgba(12,131,31,0.18)] min-h-[380px] sm:min-h-[440px] flex items-center border border-[#0C831F]/30 group/hero">
        
        {/* Full-Bleed Background Image stretching seamlessly across entire banner */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center transition-transform duration-1000 ease-out group-hover/hero:scale-105"
          />
          {/* Seamless Dark-Green Gradient Scrim for crystal clear left-side text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031B08]/95 via-[#05290D]/85 to-transparent sm:w-[68%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031B08]/70 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle green atmospheric aura */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#15A830]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Left-Side Content - Sitting elegantly on top of the full-bleed canvas */}
        <div className="relative z-10 w-full max-w-2xl px-8 sm:px-14 lg:px-16 py-10 sm:py-14">
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 border border-white/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                {slide.tag}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#0C831F] text-white border border-[#2EE24B]/40 shadow-[0_0_12px_rgba(12,131,31,0.4)]">
                <Zap className="w-3 h-3 fill-current text-white" />
                {slide.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white font-heading drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-base sm:text-xl font-extrabold text-[#75F58A] drop-shadow-sm">
              {slide.highlightText}
            </p>

            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed drop-shadow-xs font-medium">
              {slide.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={slide.ctaLink}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F2FBF4] text-[#0C831F] font-black text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-2 group active:scale-95 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#0C831F] group-hover:translate-x-1.5 transition-transform duration-200" />
              </Link>

              <span className="text-[11px] font-semibold text-emerald-200/90 flex items-center gap-1.5 pl-2">
                <span className="w-2 h-2 rounded-full bg-[#2EE24B] animate-ping" />
                Neighborhood Dark Store Active
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0C831F] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110 cursor-pointer z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0C831F] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110 cursor-pointer z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx ? 'w-7 bg-white shadow-xs' : 'w-2 bg-white/40 hover:bg-white/70'
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
