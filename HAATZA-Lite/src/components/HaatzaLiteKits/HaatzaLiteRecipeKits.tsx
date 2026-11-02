import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Radio } from 'lucide-react';

interface LiveAisle {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  badge: string;
  categoryLabel: string;
  itemCount: string;
  itemsPreview: string[];
  videoUrl: string;
  poster: string;
}

const LIVE_AISLES: LiveAisle[] = [
  {
    id: 'aisle-harvest',
    title: 'The Fresh Harvest Aisle',
    slug: 'fruits-vegetables',
    tagline: 'Sourced daily from regional orchards, delivered in 10-15 minutes.',
    badge: '10-15 MINS',
    categoryLabel: 'FARM DIRECT',
    itemCount: '120+ Items',
    itemsPreview: ['Alphonso Mangoes', 'Hass Avocados', 'Royal Apples', 'Crisp Greens'],
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5e/Aerogarden_Time_Lapse_Video_-_4_weeks_-_Tomatoes_and_Basil.webm/Aerogarden_Time_Lapse_Video_-_4_weeks_-_Tomatoes_and_Basil.webm.480p.vp9.webm',
    poster: '/images/kits/kit_3d_salad.jpg',
  },
  {
    id: 'aisle-dairy',
    title: 'The Dairy & Farmhouse Aisle',
    slug: 'dairy-breakfast',
    tagline: 'Cold-chain dispatched, vacuum sealed for pure morning freshness.',
    badge: 'CHILLED DISPATCH',
    categoryLabel: '100% PURE',
    itemCount: '95+ Items',
    itemsPreview: ['Fresh Farm Milk', 'Soft Malai Paneer', 'Table Butter', 'Country Eggs'],
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Shallow_water_equations_-_one_splash.webm',
    poster: '/images/kits/kit_3d_breakfast.jpg',
  },
  {
    id: 'aisle-cravings',
    title: 'The Midnight Cravings Lounge',
    slug: 'snacks-beverages',
    tagline: 'Late-night gourmet munchies, ice-cold fizz & artisan dark chocolates.',
    badge: 'INSTANT CHILL',
    categoryLabel: 'SNACKS & SIPS',
    itemCount: '140+ Items',
    itemsPreview: ['Gourmet Crisps', 'Sparkling Lime', 'Dark Cocoa', 'Roasted Nuts'],
    videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/5/5e/Aerogarden_Time_Lapse_Video_-_4_weeks_-_Tomatoes_and_Basil.webm/Aerogarden_Time_Lapse_Video_-_4_weeks_-_Tomatoes_and_Basil.webm.480p.vp9.webm',
    poster: '/images/banners/promo_3d_snacks.jpg',
  },
];

export const HaatzaLiteRecipeKits: React.FC = () => {
  return (
    <section
      aria-label="Live Aisle Showcase"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5EBE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#0C831F]" />
              <span>LIVE AISLE SHOWCASE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
              Explore Live Neighborhood Aisles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Live dark-store inventory dispatched straight to your door in 10-15 minutes.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-[#0C831F] bg-[#F2FBF4] px-3.5 py-1.5 rounded-full border border-[#CBEAD2]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated Live Every 60s</span>
          </div>
        </div>

        {/* 3 Premium Wide Rectangular Live Aisle Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {LIVE_AISLES.map((aisle) => (
            <Link
              key={aisle.id}
              to={`/lite/categories/${aisle.slug}`}
              className="group relative flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 p-4 rounded-2xl sm:rounded-3xl bg-white border border-[#E2E8F0]/90 text-[#111D15] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:bg-[#EAF8ED]/40 hover:border-[#0C831F] hover:shadow-[0_0_28px_rgba(12,131,31,0.28),0_8px_20px_rgba(12,131,31,0.14)] hover:ring-1 hover:ring-[#0C831F]/40 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer select-none"
            >
              {/* Left Side: Cinematic Looping Micro-Video Container */}
              <div className="w-full sm:w-44 lg:w-full xl:w-44 h-44 sm:h-auto lg:h-44 xl:h-auto aspect-4/3 sm:aspect-square lg:aspect-4/3 xl:aspect-square rounded-2xl overflow-hidden bg-black shrink-0 relative border border-emerald-50">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={aisle.poster}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                >
                  <source src={aisle.videoUrl} type="video/webm" />
                </video>

                {/* Ambient Video Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Live Pill Over Video */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="inline-flex items-center gap-1 bg-[#0C831F]/90 backdrop-blur-md text-white text-[9.5px] font-black px-2 py-0.5 rounded-md shadow-xs border border-white/20">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                    {aisle.badge}
                  </span>
                </div>

                {/* Stock Count Pill */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <span className="text-[10px] font-extrabold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/15">
                    {aisle.itemCount}
                  </span>
                </div>
              </div>

              {/* Right Side: Frosted-Glass Text Panel */}
              <div className="flex flex-col justify-between flex-1 min-w-0 space-y-3 bg-white/85 backdrop-blur-md rounded-2xl p-2 sm:p-2.5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0C831F]">
                      {aisle.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] animate-ping" />
                      In Stock
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-[#111D15] group-hover:text-[#0C831F] transition-colors duration-200 line-clamp-1 leading-snug font-heading">
                    {aisle.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mt-1">
                    {aisle.tagline}
                  </p>

                  {/* Highlights preview chips */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {aisle.itemsPreview.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[9.5px] font-semibold text-slate-600 bg-[#F4F8F5] px-2 py-0.5 rounded-md border border-[#E5EBE6]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="pt-2 border-t border-[#F0F4F1] flex items-center justify-between">
                  <span className="text-xs font-black text-[#0C831F] group-hover:translate-x-0.5 transition-transform">
                    Live Dark Store
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0C831F] group-hover:bg-[#09711A] text-white text-xs font-black transition-all duration-200 shadow-[0_2px_8px_rgba(12,131,31,0.25)] group-hover:shadow-[0_4px_14px_rgba(12,131,31,0.4)] group-hover:scale-102">
                    <span>Explore Live Aisle</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
