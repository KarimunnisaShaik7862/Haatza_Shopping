import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Radio } from 'lucide-react';

interface LiveAisle {
  id: string;
  title: string;
  slug: string;
  image: string;
}

const LIVE_AISLES: LiveAisle[] = [
  {
    id: 'aisle-harvest',
    title: 'Fresh Harvest',
    slug: 'fruits-vegetables',
    image: '/images/categories/3d_fruits.jpg',
  },
  {
    id: 'aisle-dairy',
    title: 'Dairy & Farmhouse',
    slug: 'dairy-breakfast',
    image: '/images/categories/3d_dairy.jpg',
  },
  {
    id: 'aisle-snacks',
    title: 'Snacks & Munchies',
    slug: 'snacks-beverages',
    image: '/images/categories/3d_snacks.jpg',
  },
  {
    id: 'aisle-cleaning',
    title: 'Cleaning & Hygiene',
    slug: 'household-cleaning',
    image: '/images/categories/3d_cleaning.jpg',
  },
  {
    id: 'aisle-personal',
    title: 'Personal Care',
    slug: 'personal-care',
    image: '/images/categories/3d_personal.jpg',
  },
];

export const HaatzaLiteLiveAisleShowcase: React.FC = () => {
  return (
    <section
      aria-label="Explore Live Neighborhood Aisles"
      className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full select-none"
    >
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#E5EBE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#0C831F]" />
              <span>LIVE AISLE SHOWCASE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
              Explore Live Neighborhood Aisles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Real-time dark store stock ready for 10-15 min express doorstep delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-bold text-[#0C831F] bg-[#F2FBF4] px-3.5 py-1.5 rounded-full border border-[#CBEAD2]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Updated Live Every 60s</span>
          </div>
        </div>

        {/* 5 Clean, Borderless Rectangular Image-Only Cards (12px Radius) with Blur-to-Glow Reveal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 w-full">
          {LIVE_AISLES.map((aisle) => (
            <Link
              key={aisle.id}
              to={`/lite/categories/${aisle.slug}`}
              aria-label={aisle.title}
              className="group relative h-[160px] sm:h-[185px] lg:h-[205px] rounded-[12px] overflow-hidden bg-slate-100 transition-all duration-200 ease-out cursor-pointer hover:shadow-[0_0_26px_rgba(12,131,31,0.55),0_0_12px_rgba(12,131,31,0.35)] hover:ring-2 hover:ring-[#0C831F] block"
            >
              {/* Product Image Graphic: Default blur(8px) -> Clears to blur(0px) on Hover */}
              <img
                src={aisle.image}
                alt={aisle.title}
                className="w-full h-full object-cover scale-105 group-hover:scale-100 blur-[8px] group-hover:blur-none transition-all duration-200 ease-out pointer-events-none"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
