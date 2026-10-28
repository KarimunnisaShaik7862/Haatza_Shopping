import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CinematicAisleCard {
  id: string;
  slug: string;
  name: string;
  image: string;
}

const CINEMATIC_AISLES: CinematicAisleCard[] = [
  {
    id: 'aisle-fruits',
    slug: 'fruits-vegetables',
    name: 'Fresh Fruits & Vegetables',
    image: '/images/aisles/aisle_fruits_exotic.jpg',
  },
  {
    id: 'aisle-dairy',
    slug: 'dairy-breakfast',
    name: 'Milk, Butter & Breakfast Items',
    image: '/images/aisles/aisle_dairy_breakfast.jpg',
  },
  {
    id: 'aisle-snacks',
    slug: 'snacks-beverages',
    name: 'Snacks & Munchies Packaging',
    image: '/images/aisles/aisle_snacks_beverages.jpg',
  },
  {
    id: 'aisle-household',
    slug: 'household-cleaning',
    name: 'Cleaning & Detergent Bottles',
    image: '/images/aisles/aisle_household_cleaning.jpg',
  },
  {
    id: 'aisle-personal',
    slug: 'personal-care',
    name: 'Personal Care & Beauty Items',
    image: '/images/aisles/aisle_personal_care.jpg',
  },
];

export const HaatzaLiteCinematicShowcase: React.FC = () => {
  return (
    <section
      aria-label="Explore Live Neighborhood Aisles"
      className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 w-full select-none"
    >
      <style>{`
        .cinematic-compact-card {
          background-color: #FFFFFF;
          border: 1px solid rgba(12, 131, 31, 0.12);
          border-radius: 20px;
          box-shadow: 0 4px 20px -2px rgba(12, 131, 31, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.2s ease-out, 
                      box-shadow 0.2s ease-out;
          will-change: transform, box-shadow;
        }

        /* Hover: Instantly emit signature neon-green outer border aura glow spotlight */
        .cinematic-compact-card:hover {
          transform: translateY(-5px);
          border-color: #0C831F !important;
          box-shadow: 0 0 0 2px #0C831F, 
                      0 18px 42px rgba(12, 131, 31, 0.38), 
                      0 0 26px rgba(12, 131, 31, 0.28), 
                      0 0 10px rgba(12, 131, 31, 0.5) !important;
        }

        /* Default Resting State: Soft, direct lightweight blur with zero white mask overlay */
        .cinematic-compact-media {
          filter: blur(4px) brightness(1.0);
          transform: scale(1.02);
          transition: filter 0.18s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: filter, transform;
        }

        /* Mouse-Arrow Touch: Instantly drop blur to zero and boost brightness for 100% sharp reveal */
        .cinematic-compact-card:hover .cinematic-compact-media {
          filter: blur(0px) brightness(1.15) !important;
          transform: scale(1.06) !important;
        }
      `}</style>

      {/* Clean Minimalist Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-1.5 border border-[#0C831F]/25 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#0C831F]" />
            <span>HAATZA LITE • LIVE AISLE SHOWCASE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#111D15] tracking-tight font-heading">
            Explore Live Neighborhood Aisles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Curated daily grocery aisles with instant 10-15 minute doorstep delivery
          </p>
        </div>

        <Link
          to="/lite/categories"
          className="text-xs sm:text-sm font-bold text-[#0C831F] hover:text-[#09711A] flex items-center gap-1.5 transition-colors self-start sm:self-auto bg-[#F2FBF4] hover:bg-[#E5F7E9] px-4 py-2 rounded-full border border-[#CBEAD2]"
        >
          <span>All Aisles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 5 Distinct Clean Uniform Rectangular Image Cards (No duplicate plants, blur(4px) resting, blur(0px) hover) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5 w-full">
        {CINEMATIC_AISLES.map((aisle) => (
          <Link
            key={aisle.id}
            to={`/lite/categories/${aisle.slug}`}
            className="cinematic-compact-card group relative rounded-[20px] overflow-hidden h-[195px] sm:h-[215px] lg:h-[235px] cursor-pointer block"
          >
            {/* Underlying Distinct Product Visuals (100% visible, zero duplicate videos/masks) */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={aisle.image}
                alt={aisle.name}
                className="cinematic-compact-media w-full h-full object-cover object-center pointer-events-none"
                loading="eager"
              />
            </div>

            {/* Single Minimal Beautifully Centered "Explore" Button at Absolute Bottom */}
            <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-center z-20 pointer-events-none">
              <span className="inline-flex items-center justify-center px-4 sm:px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200 border bg-white/95 text-[#0C831F] border-[#0C831F]/50 shadow-xs group-hover:bg-[#0C831F] group-hover:text-white group-hover:border-[#0C831F] group-hover:shadow-[0_4px_16px_rgba(12,131,31,0.45)] group-hover:scale-105">
                Explore
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
