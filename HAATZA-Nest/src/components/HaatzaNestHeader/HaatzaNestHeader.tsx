import React from 'react';
import { Link } from 'react-router-dom';
import { HaatzaNestLogo } from './HaatzaNestLogo';
import { HaatzaNestLocationSelector } from './HaatzaNestLocationSelector';
import { HaatzaNestSearchBar } from './HaatzaNestSearchBar';
import { Calendar, ShieldCheck, Star } from 'lucide-react';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';

export const HaatzaNestHeader: React.FC = () => {
  const { bookings } = useHaatzaNestBooking();

  return (
    <header className="sticky top-[49px] sm:top-[53px] z-40 bg-white border-b border-zinc-200/80 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-[#6C3FC5] text-white py-1.5 text-xs font-semibold">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-black uppercase text-[10px] tracking-wider bg-purple-900/60 px-2 py-0.5 rounded text-purple-200">
              <ShieldCheck className="w-3 h-3 text-yellow-300" />
              VERIFIED PROS
            </span>
            <span className="text-xs text-purple-100 hidden sm:inline">
              Background-checked specialists with hospital-grade sanitization.
            </span>
          </div>
          <span className="text-[11px] font-bold text-yellow-300 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-300" /> 4.9 Rated On-Demand Services
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <HaatzaNestLogo />
          <div className="hidden md:block">
            <HaatzaNestLocationSelector />
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <HaatzaNestSearchBar />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="md:hidden">
            <HaatzaNestLocationSelector />
          </div>
          <Link
            to="/nest/bookings"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F2ECFC] hover:bg-[#e4d7f9] text-[#6C3FC5] font-bold text-xs transition-colors shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">My Bookings</span>
            {bookings.length > 0 && (
              <span className="bg-[#6C3FC5] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {bookings.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
