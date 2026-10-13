import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SecondaryPromoBanner } from '../../services/mock/data/promotions';

interface SecondaryPromoBannersProps {
  banners: SecondaryPromoBanner[];
}

export const SecondaryPromoBanners: React.FC<SecondaryPromoBannersProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banners.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-3xl overflow-hidden p-6 sm:p-7 ${item.bgClass} flex flex-col justify-between group shadow-md min-h-[220px]`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            {/* Top Tag & Discount */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                {item.tag}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
                {item.discount}
              </span>
            </div>

            {/* Content & CTA */}
            <div className="relative z-10 mt-6">
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-xs">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                {item.subtitle}
              </p>

              <div className="mt-4">
                <Link
                  to={item.ctaLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-black transition-all shadow-md group-hover:scale-105 active:scale-95"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
