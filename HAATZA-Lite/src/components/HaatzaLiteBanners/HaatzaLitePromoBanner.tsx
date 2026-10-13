import React from 'react';
import { Link } from 'react-router-dom';
import { HaatzaLitePromoBanner as PromoBannerType } from '../../types/haatzaLite.types';
import { ArrowRight, Zap } from 'lucide-react';

interface HaatzaLitePromoBannerProps {
  banners: PromoBannerType[];
}

export const HaatzaLitePromoBanner: React.FC<HaatzaLitePromoBannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className={`rounded-2xl overflow-hidden p-6 sm:p-8 flex items-center justify-between shadow-md ${b.bgClass} relative`}
          >
            <div className="space-y-2 z-10 max-w-[65%]">
              {b.badge && (
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white border border-white/20">
                  <Zap className="w-2.5 h-2.5 fill-yellow-300 text-yellow-300" />
                  {b.badge}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-black leading-tight text-white font-heading">
                {b.title}
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {b.subtitle}
              </p>
              <div className="pt-2">
                <Link
                  to={b.ctaLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#238636] font-bold text-xs hover:bg-emerald-50 transition-colors shadow"
                >
                  <span>{b.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-lg shrink-0">
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
