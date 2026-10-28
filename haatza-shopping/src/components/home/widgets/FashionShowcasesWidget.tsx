import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shirt } from 'lucide-react';
import { FashionShowcaseData } from '../../../types/homepageWidgets.types';
import {
  mockMenFashionShowcase,
  mockWomenFashionShowcase,
} from '../../../services/mock/data/homepageWidgets.data';

interface FashionShowcasesWidgetProps {
  menData?: FashionShowcaseData;
  womenData?: FashionShowcaseData;
  className?: string;
}

export const FashionShowcasesWidget: React.FC<FashionShowcasesWidgetProps> = ({
  menData = mockMenFashionShowcase,
  womenData = mockWomenFashionShowcase,
  className = '',
}) => {
  return (
    <section
      aria-label="Men and Women Fashion Editorial Showcases"
      className={`w-full space-y-12 sm:space-y-16 py-6 sm:py-8 ${className}`}
    >
      {/* ---------------------------------------------------- */}
      {/* 1. MEN'S FASHION SHOWCASE (Editorial Left Hero + Right Grid) */}
      {/* ---------------------------------------------------- */}
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1">
              <Shirt className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>{menData.eyebrow}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
              {menData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {menData.subtitle}
            </p>
          </div>

          <Link
            to={menData.ctaLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E40AF] transition-colors"
          >
            <span>{menData.ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Large Hero Card (5 cols on lg) */}
          <div className="lg:col-span-5 relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 border border-slate-800 shadow-md bg-[#0F172A]">
            <div className="absolute inset-0 z-0">
              <img
                src={menData.bannerImage}
                alt={menData.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#2962FF] text-white">
                NEW SEASON
              </span>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
                Tailored Classics & Casual Linens
              </h4>
              <p className="text-xs text-slate-200 mt-1 max-w-sm">
                Explore handloom shirts, denim, and refined workwear essentials.
              </p>
              <div className="mt-4">
                <Link
                  to={menData.ctaLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#172033] hover:bg-[#EEF3FF] hover:text-[#2962FF] text-xs font-bold transition-all shadow-xs"
                >
                  <span>Shop Men’s Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right 4 Category Cards (7 cols on lg, 2x2 grid) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
            {menData.categories.map((sub, idx) => (
              <Link
                key={idx}
                to={`/category/men-fashion/${sub.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <h5 className="text-sm sm:text-base font-bold tracking-tight">
                      {sub.name}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] text-slate-200 mt-0.5">
                      <span>{sub.itemCount}+ Styles</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ */}
      {/* 2. WOMEN'S FASHION SHOWCASE (Editorial Right Hero + Left Grid) */}
      {/* ------------------------------------------------------ */}
      <div className="w-full pt-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>{womenData.eyebrow}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
              {womenData.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {womenData.subtitle}
            </p>
          </div>

          <Link
            to={womenData.ctaLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1E40AF] transition-colors"
          >
            <span>{womenData.ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Content Layout (Inverted: Grid on Left, Hero on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left 4 Category Cards (7 cols on lg, 2x2 grid) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5 order-2 lg:order-1">
            {womenData.categories.map((sub, idx) => (
              <Link
                key={idx}
                to={`/category/women-fashion/${sub.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 inset-x-3 text-white">
                    <h5 className="text-sm sm:text-base font-bold tracking-tight">
                      {sub.name}
                    </h5>
                    <div className="flex items-center justify-between text-[11px] text-slate-200 mt-0.5">
                      <span>{sub.itemCount}+ Styles</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Large Hero Card (5 cols on lg) */}
          <div className="lg:col-span-5 relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 border border-slate-800 shadow-md bg-[#0F172A] order-1 lg:order-2">
            <div className="absolute inset-0 z-0">
              <img
                src={womenData.bannerImage}
                alt={womenData.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#2962FF] text-white">
                FESTIVE ATELIER
              </span>
              <h4 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-2">
                Handcrafted Zari & Contemporary Drapes
              </h4>
              <p className="text-xs text-slate-200 mt-1 max-w-sm">
                Authentic silk sets, artisan jewelry, and festive anarkalis.
              </p>
              <div className="mt-4">
                <Link
                  to={womenData.ctaLink}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#172033] hover:bg-[#EEF3FF] hover:text-[#2962FF] text-xs font-bold transition-all shadow-xs"
                >
                  <span>Shop Women’s Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
