import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  link: string;
}

interface FashionOccasionGridProps {
  title?: string;
  subtitle?: string;
  items: OccasionItem[];
  className?: string;
  variant?: 'overlay' | 'clean';
}

export const FashionOccasionGrid: React.FC<FashionOccasionGridProps> = ({
  title = 'Shop by Style & Occasion',
  subtitle = 'Curated edits designed for your workweek, celebrations, and off-duty comfort.',
  items,
  className = '',
  variant = 'overlay',
}) => {
  if (!items || items.length === 0) return null;

  const isClean = variant === 'clean';

  // Refs for scroll-driven parallax and scale animation
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftCardRef = useRef<HTMLAnchorElement | null>(null);
  const centerCardRef = useRef<HTMLAnchorElement | null>(null);
  const rightCardRef = useRef<HTMLAnchorElement | null>(null);
  const centerImgRef = useRef<HTMLImageElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll-driven animation loop (binds to scroll up and down in real-time)
  useEffect(() => {
    if (!isClean || items.length !== 3 || prefersReducedMotion || typeof window === 'undefined') return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = sectionRef.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight;

          // Normalized progress (0: enters bottom, 0.5: centered, 1: exits top)
          const totalDistance = vh + rect.height;
          const currentDistance = vh - rect.top;
          const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));

          // Easing curve for reveal
          const revealProgress = Math.max(0, Math.min(1, (progress - 0.12) / 0.42));
          // Cubic ease-out
          const easeOut = 1 - Math.pow(1 - revealProgress, 3);

          // Center Card: smooth scale from 0.92 to 1.0 + subtle anchor parallax
          if (centerCardRef.current) {
            const centerScale = 0.92 + easeOut * 0.08;
            const centerTranslateY = (progress - 0.5) * -12;
            centerCardRef.current.style.transform = `translate3d(0, ${centerTranslateY.toFixed(2)}px, 0) scale(${centerScale.toFixed(4)})`;
          }

          // Center Image: subtle inner zoom effect as it enters view
          if (centerImgRef.current) {
            const innerZoom = 1.04 - easeOut * 0.04;
            centerImgRef.current.style.transform = `scale(${innerZoom.toFixed(4)})`;
          }

          // Left Card: moves at distinct parallax speed (-30px) + smooth scale
          if (leftCardRef.current) {
            const leftScale = 0.94 + easeOut * 0.06;
            const leftTranslateY = (progress - 0.5) * -28;
            leftCardRef.current.style.transform = `translate3d(0, ${leftTranslateY.toFixed(2)}px, 0) scale(${leftScale.toFixed(4)})`;
          }

          // Right Card: differential parallax speed (-42px) + smooth scale
          if (rightCardRef.current) {
            const rightScale = 0.94 + easeOut * 0.06;
            const rightTranslateY = (progress - 0.5) * -40;
            rightCardRef.current.style.transform = `translate3d(0, ${rightTranslateY.toFixed(2)}px, 0) scale(${rightScale.toFixed(4)})`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll(); // initial trigger

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isClean, items.length, prefersReducedMotion]);

  const renderTitle = (text: string) => {
    if (text.includes('Style')) {
      const parts = text.split('Style');
      return (
        <>
          {parts[0]}
          <span
            className="text-white drop-shadow-[0_2px_4px_rgba(23,37,84,0.45)] px-1"
            style={{
              WebkitTextStroke: '1.4px #172554',
              paintOrder: 'stroke fill',
            }}
          >
            Style
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section ref={sectionRef} aria-label={title} className={`w-full ${isClean ? 'py-3 sm:py-5' : 'py-6 sm:py-8'} ${className}`}>
      {/* Section Header */}
      <div className={`${isClean ? 'mb-3 sm:mb-4 text-left' : 'mb-5 sm:mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3'}`}>
        <div>
          {!isClean && (
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1 font-heading">
              <Sparkles className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>Curated Style Edits</span>
            </div>
          )}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-heading ${isClean ? 'text-[#172554]' : 'text-[#172033]'}`}>
            {isClean ? renderTitle(title) : title}
          </h2>
          {subtitle && (
            <p className={`text-xs sm:text-sm md:text-base mt-0.5 sm:mt-1 font-body ${isClean ? 'text-[#64748B]' : 'text-slate-500 max-w-2xl'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* When clean variant with 3 items: Exact match to reference screenshot layout with reduced gap & scroll animation */}
      {isClean && items.length === 3 ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-4 lg:gap-5 w-full max-w-[1280px] mx-auto">
          {/* Card 1 (Left): Festive Celebrations */}
          <Link
            ref={leftCardRef}
            to={items[0].link}
            className="group w-full md:w-[30%] flex flex-col focus:outline-hidden self-center will-change-transform transition-transform duration-150 ease-out"
          >
            <div className="w-full aspect-[4/5] max-h-[420px] overflow-hidden bg-slate-100 shadow-2xs group-hover:shadow-md transition-all duration-300 relative">
              <img
                src={optimizeImageUrl(items[0].image, { width: 650, quality: 85 })}
                alt={items[0].title}
                loading="eager"
                className="w-full h-full object-cover object-top transform transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="mt-2 sm:mt-2.5 flex items-center">
              <span className="text-sm sm:text-base font-bold text-[#172554] group-hover:text-[#2563EB] transition-colors font-heading inline-flex items-center gap-1.5">
                <span>{items[0].title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#172554] group-hover:text-[#2563EB] transition-colors shrink-0" />
              </span>
            </div>
          </Link>

          {/* Card 2 (Center - Hero / Larger): Everyday Casual & Office Wear (Increased Height, Sleeker Width) */}
          <Link
            ref={centerCardRef}
            to={items[1].link}
            className="group w-full md:w-[40%] flex flex-col focus:outline-hidden self-stretch md:self-center will-change-transform transition-transform duration-150 ease-out"
          >
            <div className="w-full aspect-[3/4] max-h-[580px] overflow-hidden bg-slate-100 shadow-xs group-hover:shadow-lg transition-all duration-300 relative">
              <img
                ref={centerImgRef}
                src={optimizeImageUrl(items[1].image, { width: 1000, quality: 90 })}
                alt={items[1].title}
                loading="eager"
                className="w-full h-full object-cover object-[center_10%] transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="mt-2 sm:mt-2.5 flex items-center">
              <span className="text-sm sm:text-base md:text-lg font-bold text-[#172554] group-hover:text-[#2563EB] transition-colors font-heading inline-flex items-center gap-1.5">
                <span>{items[1].title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#172554] group-hover:text-[#2563EB] transition-colors shrink-0" />
              </span>
            </div>
          </Link>

          {/* Card 3 (Right): Party & Evening Glamour */}
          <Link
            ref={rightCardRef}
            to={items[2].link}
            className="group w-full md:w-[30%] flex flex-col focus:outline-hidden self-center will-change-transform transition-transform duration-150 ease-out"
          >
            <div className="w-full aspect-[4/5] max-h-[420px] overflow-hidden bg-slate-100 shadow-2xs group-hover:shadow-md transition-all duration-300 relative">
              <img
                src={optimizeImageUrl(items[2].image, { width: 650, quality: 85 })}
                alt={items[2].title}
                loading="lazy"
                className="w-full h-full object-cover object-top transform transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <div className="mt-2 sm:mt-2.5 flex items-center">
              <span className="text-sm sm:text-base font-bold text-[#172554] group-hover:text-[#2563EB] transition-colors font-heading inline-flex items-center gap-1.5">
                <span>{items[2].title}</span>
                <ArrowUpRight className="w-4 h-4 text-[#172554] group-hover:text-[#2563EB] transition-colors shrink-0" />
              </span>
            </div>
          </Link>
        </div>
      ) : (
        /* Fallback Responsive Grid: used for overlay variant and non-3 item lists */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {items.map((item, index) => {
            const optimized = optimizeImageUrl(item.image, { width: 500, quality: 80 });

            if (isClean) {
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className="group flex flex-col focus:outline-hidden"
                >
                  <div className="w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-slate-100 shadow-2xs group-hover:shadow-md transition-all duration-300 relative">
                    <img
                      src={optimized}
                      alt={item.title}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2.5 sm:mt-3 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-bold text-[#172554] group-hover:text-[#2563EB] transition-colors font-heading inline-flex items-center gap-1.5">
                      <span>{item.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#172554] group-hover:text-[#2563EB] transition-colors shrink-0" />
                    </span>
                  </div>
                </Link>
              );
            }

          return (
            <Link
              key={item.id}
              to={item.link}
              className="group relative flex flex-col justify-end aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 shadow-xs hover:shadow-lg transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#2962FF]"
            >
              {/* Background Artwork with Zoom */}
              <img
                src={optimized}
                alt={item.title}
                loading={index < 2 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Depth Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Badge Pill */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-white/95 text-[#172033] shadow-xs backdrop-blur-xs font-heading">
                  {item.badge}
                </span>
              </div>

              {/* Content Card Body */}
              <div className="relative z-10 p-3.5 sm:p-5 flex flex-col gap-1 text-white">
                <h3 className="text-base sm:text-lg md:text-xl font-black tracking-tight leading-snug font-heading group-hover:text-blue-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-200 line-clamp-2 leading-relaxed font-sans">
                  {item.subtitle}
                </p>

                <div className="pt-2 sm:pt-3 flex items-center justify-between border-t border-white/20 mt-1">
                  <span className="text-[11px] sm:text-xs font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1">
                    <span>Explore Edit</span>
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-[#2962FF] flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      )}
    </section>
  );
};

export default FashionOccasionGrid;
