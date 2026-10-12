import React from 'react';
import { Link } from 'react-router-dom';
import { PromoBannerData } from '../../types';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  banner?: PromoBannerData;
  splitBanners?: PromoBannerData[];
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ banner, splitBanners }) => {
  if (splitBanners && splitBanners.length >= 2) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {splitBanners.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className={`relative rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-md ${item.bgClass}`}
            >
              <div className="relative z-10 space-y-2 max-w-xs">
                {item.badge && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
                    {item.badge}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium">{item.subtitle}</p>
                <p className="text-lg font-bold text-amber-300 pt-1">{item.discountText}</p>
              </div>

              <div className="relative z-10 pt-4">
                <Link
                  to={item.ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-900 font-bold text-xs hover:bg-zinc-100 transition-all shadow-md group"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Graphic background image */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-80 pointer-events-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!banner) return null;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div
        className={`relative rounded-3xl overflow-hidden p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between shadow-lg ${banner.bgClass}`}
      >
        <div className="relative z-10 space-y-3 max-w-md">
          {banner.badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-md">
              {banner.badge}
            </span>
          )}
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{banner.title}</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">{banner.subtitle}</p>
          <p className="text-xl font-black text-rose-400">{banner.discountText}</p>

          <div className="pt-2">
            <Link
              to={banner.ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm transition-all shadow-md group"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="relative mt-6 md:mt-0 w-full md:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
