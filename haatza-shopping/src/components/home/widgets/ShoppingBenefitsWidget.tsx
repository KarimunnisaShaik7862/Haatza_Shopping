import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ShoppingBenefitApp } from '../../../types/homepageWidgets.types';
import { mockShoppingBenefitApp } from '../../../services/mock/data/homepageWidgets.data';

interface ShoppingBenefitsWidgetProps {
  benefitData?: ShoppingBenefitApp;
  className?: string;
}

export const ShoppingBenefitsWidget: React.FC<ShoppingBenefitsWidgetProps> = ({
  benefitData = mockShoppingBenefitApp,
  className = '',
}) => {
  return (
    <section
      aria-label="Shopping Benefits & Perks"
      className={`w-full relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2962FF] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-blue-900/60 ${className}`}
    >
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading, Perks, CTA (7 cols on lg) */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/15 text-blue-200 border border-white/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{benefitData.badgeText}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-heading">
            {benefitData.headline}
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 mt-2 max-w-xl leading-relaxed">
            {benefitData.description}
          </p>

          {/* Perks Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {benefitData.perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to={benefitData.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#0F172A] hover:bg-[#EEF3FF] hover:text-[#2962FF] font-bold text-sm tracking-wide shadow-md transition-all active:scale-95 group"
            >
              <span>{benefitData.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Lifestyle Graphic Card (5 cols on lg) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/30 backdrop-blur-md p-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                alt="Modern Lifestyle Shopping"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 p-2 flex items-center justify-between text-xs text-blue-100">
              <div>
                <span className="font-bold text-white block">HAATZA Ecosystem</span>
                <span className="text-[11px] text-blue-200">Shopping • Lite • Nest</span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-[#2962FF] text-white">
                ALL-IN-ONE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
