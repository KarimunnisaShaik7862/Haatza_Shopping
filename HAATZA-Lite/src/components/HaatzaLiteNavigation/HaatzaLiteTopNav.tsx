import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Sprout, Zap, MapPin, ChevronDown } from 'lucide-react';
import { useHaatzaLiteLocation } from '../../hooks/useHaatzaLiteLocation';

export const HaatzaLiteTopNav: React.FC = () => {
  const { location, openLocationModal } = useHaatzaLiteLocation();
  const routeLocation = useLocation();
  const currentPath = routeLocation.pathname.toLowerCase();

  const isLiteActive = currentPath.startsWith('/lite') || currentPath.startsWith('/light');
  const isNestActive =
    currentPath.startsWith('/nest') ||
    currentPath.startsWith('/next') ||
    currentPath.startsWith('/services') ||
    currentPath.startsWith('/bookings');
  const isHaatzaActive = !isLiteActive && !isNestActive;

  return (
    <nav
      aria-label="HAATZA Global Experience Navigation"
      className="bg-white border-b border-[#E5EAF3] sticky top-0 z-50 shadow-soft-sm select-none"
    >
      <div className="max-w-[1440px] mx-auto px-2.5 sm:px-10 lg:px-14 xl:px-16 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Main Experience Navigation Cards */}
        <div className="flex items-center gap-1 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5 shrink min-w-0 pr-1">
          {/* HAATZA MARKETPLACE */}
          <Link
            to="/shopping"
            className={`group relative flex items-center gap-1.5 sm:gap-2 w-[100px] sm:w-[145px] h-8 sm:h-10 px-2 sm:px-3 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer shadow-2xs shrink-0 ${
              isHaatzaActive
                ? 'bg-[#2962FF] border-[#2962FF] text-white shadow-xs scale-[1.01]'
                : 'border-zinc-200/90 bg-white text-zinc-800 hover:border-[#2962FF]/40 hover:bg-[#EEF3FF]/40 hover:shadow-xs'
            }`}
          >
            <div
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isHaatzaActive ? 'bg-white/20 text-white' : 'bg-[#EEF3FF] text-[#2962FF]'
              }`}
            >
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span
                className={`font-black text-[10px] sm:text-xs tracking-tight leading-tight ${
                  isHaatzaActive ? 'text-white' : 'text-zinc-900'
                }`}
              >
                HAATZA
              </span>
              <span
                className={`text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate ${
                  isHaatzaActive ? 'text-white/80' : 'text-zinc-400 group-hover:text-zinc-600'
                }`}
              >
                Marketplace
              </span>
            </div>
          </Link>

          {/* LITE (10-15 MINS) - ACTIVE GREEN */}
          <Link
            to="/lite"
            className={`group relative flex items-center gap-1.5 sm:gap-2 w-[100px] sm:w-[145px] h-8 sm:h-10 px-2 sm:px-3 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer shadow-xs shrink-0 ${
              isLiteActive
                ? 'border-[#0C831F] bg-[#0C831F] text-white shadow-xs scale-[1.01]'
                : 'border-zinc-200/90 bg-white text-zinc-800 hover:border-[#0C831F]/40 hover:bg-emerald-50/40 hover:shadow-xs'
            }`}
          >
            <div
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isLiteActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#0C831F]'
              }`}
            >
              <Sprout className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span
                className={`font-black text-[10px] sm:text-xs tracking-tight leading-tight ${
                  isLiteActive ? 'text-white' : 'text-zinc-900'
                }`}
              >
                LITE
              </span>
              <span
                className={`text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate ${
                  isLiteActive ? 'text-white/90' : 'text-zinc-400 group-hover:text-zinc-600'
                }`}
              >
                10-15 Mins
              </span>
            </div>
          </Link>

          {/* NEST (HOME SERVICES) */}
          <Link
            to="/nest"
            className={`group relative flex items-center gap-1.5 sm:gap-2 w-[100px] sm:w-[145px] h-8 sm:h-10 px-2 sm:px-3 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer shadow-2xs shrink-0 ${
              isNestActive
                ? 'bg-[#6C3FC5] border-[#6C3FC5] text-white shadow-xs scale-[1.01]'
                : 'border-zinc-200/90 bg-white text-zinc-800 hover:border-[#6C3FC5]/40 hover:bg-purple-50/40 hover:shadow-xs'
            }`}
          >
            <div
              className={`w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                isNestActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-[#6C3FC5]'
              }`}
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span
                className={`font-black text-[10px] sm:text-xs tracking-tight leading-tight ${
                  isNestActive ? 'text-white' : 'text-zinc-900'
                }`}
              >
                NEST
              </span>
              <span
                className={`text-[7.5px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate ${
                  isNestActive ? 'text-white/80' : 'text-zinc-400 group-hover:text-zinc-600'
                }`}
              >
                Home Services
              </span>
            </div>
          </Link>
        </div>

        {/* Deliver to Location Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={openLocationModal}
            className="flex items-center gap-1 sm:gap-1.5 py-1 px-2 sm:px-2.5 rounded-full sm:rounded-lg border border-zinc-200/80 hover:border-zinc-400 hover:bg-[#F5F5F0] transition-colors text-left max-w-[160px] sm:max-w-[280px] cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C831F] shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] sm:text-[10px] font-bold text-zinc-500 uppercase tracking-wider leading-none hidden sm:inline">
                Deliver in 10-15 Mins
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-[#202124] truncate leading-tight">
                {location.locality || location.pincode}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400 shrink-0 ml-0.5" />
          </button>
        </div>
      </div>
    </nav>
  );
};
