import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { StorytellingConfig } from '../../../types/homepageWidgets.types';
import { mockStorytellingConfig } from '../../../services/mock/data/homepageWidgets.data';

interface FashionStorytellingWidgetProps {
  config?: StorytellingConfig;
  className?: string;
}

export const FashionStorytellingWidget: React.FC<FashionStorytellingWidgetProps> = ({
  config = mockStorytellingConfig,
  className = '',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafId = null;
          return;
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Progress from 0 when section enters to 1 when it leaves
        const totalDistance = rect.height + windowHeight;
        const currentProgress = (windowHeight - rect.top) / totalDistance;
        const clamped = Math.max(0, Math.min(1, currentProgress));

        setScrollProgress(clamped);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Parallax offsets (subtle shift between -20px and +20px)
  const offsetTL = (scrollProgress - 0.5) * -35;
  const offsetTR = (scrollProgress - 0.5) * 30;
  const offsetBL = (scrollProgress - 0.5) * 35;
  const offsetBR = (scrollProgress - 0.5) * -30;

  return (
    <section
      ref={sectionRef}
      aria-label="Fashion Storytelling — Style That Moves With You"
      className={`relative w-full py-10 sm:py-16 bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] overflow-hidden ${className}`}
    >
      {/* Background Decorative Ambient Circles */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-100/50 blur-3xl" />

      {/* DESKTOP 4-ZONE LAYOUT (Hidden on mobile, visible on lg+) */}
      <div className="hidden lg:block relative max-w-[1360px] mx-auto px-6 sm:px-10 min-h-[580px]">
        {/* Upper Left Image Panel */}
        <div
          style={{ transform: `translate3d(0, ${offsetTL}px, 0)` }}
          className="absolute top-4 left-6 w-[260px] xl:w-[290px] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white transition-transform duration-150 ease-out z-10 group"
        >
          <div className="aspect-4/5 overflow-hidden">
            <img
              src={config.images.topLeft.url}
              alt={config.images.topLeft.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
            <span className="text-xs font-bold text-[#172033]">
              {config.images.topLeft.label}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#2962FF] tracking-wider">
              01
            </span>
          </div>
        </div>

        {/* Upper Right Image Panel */}
        <div
          style={{ transform: `translate3d(0, ${offsetTR}px, 0)` }}
          className="absolute top-4 right-6 w-[260px] xl:w-[290px] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white transition-transform duration-150 ease-out z-10 group"
        >
          <div className="aspect-4/5 overflow-hidden">
            <img
              src={config.images.topRight.url}
              alt={config.images.topRight.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
            <span className="text-xs font-bold text-[#172033]">
              {config.images.topRight.label}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#2962FF] tracking-wider">
              02
            </span>
          </div>
        </div>

        {/* Lower Left Image Panel */}
        <div
          style={{ transform: `translate3d(0, ${offsetBL}px, 0)` }}
          className="absolute bottom-4 left-10 w-[240px] xl:w-[270px] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white transition-transform duration-150 ease-out z-10 group"
        >
          <div className="aspect-4/5 overflow-hidden">
            <img
              src={config.images.bottomLeft.url}
              alt={config.images.bottomLeft.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
            <span className="text-xs font-bold text-[#172033]">
              {config.images.bottomLeft.label}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#2962FF] tracking-wider">
              03
            </span>
          </div>
        </div>

        {/* Lower Right Image Panel */}
        <div
          style={{ transform: `translate3d(0, ${offsetBR}px, 0)` }}
          className="absolute bottom-4 right-10 w-[240px] xl:w-[270px] rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-white transition-transform duration-150 ease-out z-10 group"
        >
          <div className="aspect-4/5 overflow-hidden">
            <img
              src={config.images.bottomRight.url}
              alt={config.images.bottomRight.alt}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs flex items-center justify-between">
            <span className="text-xs font-bold text-[#172033]">
              {config.images.bottomRight.label}
            </span>
            <span className="text-[10px] uppercase font-bold text-[#2962FF] tracking-wider">
              04
            </span>
          </div>
        </div>

        {/* CENTRAL FIXED/ANCHORED CONTENT CONTAINER */}
        <div className="relative z-20 mx-auto max-w-md xl:max-w-lg min-h-[520px] flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-50 text-[#2962FF] border border-blue-200 shadow-2xs mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{config.eyebrow}</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-black text-[#172033] tracking-tight leading-tight font-heading">
            {config.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-sm">
            {config.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to={config.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET EDITORIAL STACK (Clean, non-pinned layout) */}
      <div className="block lg:hidden max-w-[1440px] mx-auto px-6 sm:px-10">
        {/* Central Content Banner */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-blue-50 text-[#2962FF] border border-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{config.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            {config.title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {config.description}
          </p>
          <div className="mt-5">
            <Link
              to={config.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2962FF] text-white font-bold text-xs sm:text-sm shadow-md"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2x2 Image Grid on Mobile */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
          {[
            config.images.topLeft,
            config.images.topRight,
            config.images.bottomLeft,
            config.images.bottomRight,
          ].map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xs group"
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                />
              </div>
              <div className="p-2.5 bg-white text-center">
                <span className="text-xs font-bold text-[#172033]">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
