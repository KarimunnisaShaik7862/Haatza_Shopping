import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides || slides.length === 0) return null;
  const slide = slides[currentSlide];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-2 select-none">
      <style>{`
        /* 2. Main Hero Banner: Ken Burns & Sheen Keyframes */
        @keyframes kenBurnsZoom {
          0% {
            transform: scale(1.0) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.04) translate3d(0, 0, 0);
          }
        }

        .hero-ken-burns {
          animation: kenBurnsZoom 10s ease-in-out infinite alternate;
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
          .hero-ken-burns,
          .cta-breathing-sheen {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden text-white shadow-[0_12px_35px_rgba(12,131,31,0.18)] min-h-[260px] sm:min-h-[350px] md:min-h-[380px] flex items-center border border-[#0C831F]/30 group/hero">
        
        {/* Full-Bleed Background Image with Ultra-slow cinematic Ken Burns zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={slide.id + '-bg'}
            src={slide.image}
            alt=""
            className="w-full h-full object-cover object-right sm:object-center hero-ken-burns"
          />
          {/* Seamless Dark-Green Gradient Scrim for crystal clear left-side text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#031B08]/95 via-[#05290D]/85 to-transparent sm:w-[68%] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031B08]/70 via-transparent to-transparent pointer-events-none" />
          
          {/* Subtle green atmospheric aura */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#15A830]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Left-Side Content - Masked vertical slide-up on entry */}
        <div className="relative z-10 w-full max-w-2xl px-4 sm:px-14 lg:px-16 py-5 sm:py-8 lg:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24, clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0% 0%)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 sm:space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 border border-white/20 shadow-xs">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300" />
                  {slide.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#0C831F] text-white border border-[#2EE24B]/40 shadow-[0_0_12px_rgba(12,131,31,0.4)]">
                  <Zap className="w-3 h-3 fill-current text-white" />
                  {slide.badge}
                </span>
              </div>

              <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] text-white font-heading drop-shadow-md">
                {slide.title}
              </h1>

              <p className="text-sm sm:text-xl font-extrabold text-[#75F58A] drop-shadow-sm">
                {slide.highlightText}
              </p>

              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed drop-shadow-xs font-medium line-clamp-2 sm:line-clamp-none">
                {slide.description}
              </p>

              <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
                {/* "Explore Fresh Produce" CTA with subtle breathing sheen passing across every 4s */}
                <Link
                  to={slide.ctaLink}
                  className="relative overflow-hidden px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white hover:bg-[#F2FBF4] text-[#0C831F] font-black text-xs sm:text-sm transition-all duration-200 shadow-[0_4px_18px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 inline-flex items-center gap-1.5 sm:gap-2 group active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10">{slide.ctaText}</span>
                  <ArrowRight className="relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C831F] group-hover:translate-x-1.5 transition-transform duration-200" />

                  {/* Periodic Sheen Reflection sweeping across button */}
                  <div
                    className="cta-breathing-sheen absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </Link>

                <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-200/90 flex items-center gap-1.5 pl-1 sm:pl-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2EE24B] animate-ping" />
                  Neighborhood Dark Store Active
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Arrows - hidden on mobile for clean touch experience, shown on tablet/desktop */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0C831F] text-white items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110 cursor-pointer z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0C831F] text-white items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md hover:scale-110 cursor-pointer z-20"
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

export default HaatzaLiteHeroBanner;
