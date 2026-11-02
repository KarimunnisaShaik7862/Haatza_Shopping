import React from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLitePromoBanner as PromoBannerType } from '../../types/haatzaLite.types';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';

interface HaatzaLitePromoBannerProps {
  banners: PromoBannerType[];
}

export const HaatzaLitePromoBanner: React.FC<HaatzaLitePromoBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="group relative rounded-3xl overflow-hidden p-6 sm:p-8 flex items-center justify-between shadow-[0_6px_20px_rgba(12,131,31,0.08)] bg-gradient-to-br from-[#063811] via-[#0C831F] to-[#042409] text-white border border-[#0C831F]/30 hover:border-[#2EE24B]/50 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(12,131,31,0.25)] hover:-translate-y-1"
          >
            {/* Ambient Lighting Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#2EE24B]/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="space-y-3 z-10 max-w-[62%]">
              {b.badge && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/25 shadow-2xs">
                  <Zap className="w-2.5 h-2.5 fill-[#75F58A] text-[#75F58A]" />
                  {b.badge}
                </span>
              )}

              <h3 className="text-xl sm:text-2xl font-black leading-tight text-white font-heading">
                {b.title}
              </h3>

              <p className="text-xs text-emerald-100/90 font-medium leading-relaxed">
                {b.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  to={b.ctaLink}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0C831F] font-black text-xs hover:bg-[#F2FBF4] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group/btn"
                >
                  <span>{b.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0C831F] group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                {b.discountText && (
                  <span className="text-[11px] font-extrabold text-[#75F58A] bg-black/25 px-2.5 py-1 rounded-lg border border-white/10 backdrop-blur-xs">
                    {b.discountText}
                  </span>
                )}
              </div>
            </div>

            {/* 3D Render Image Container */}
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 backdrop-blur-md shrink-0 group-hover:scale-105 transition-transform duration-500">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
