import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sprout, Zap } from 'lucide-react';

export const HaatzaNestTopMarketplaceBar: React.FC = () => {
  const isDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('172.16.') ||
      window.location.hostname.startsWith('10.'));

  // Main website for HAATZA Shopping (as defined across the project in referral drawer, vite.config.ts, and services)
  const shoppingUrl = 'https://www.haatza.com';

  // In local development where HAATZA-Nest runs standalone on port 5173, HAATZA Lite is served
  // by the unified dev server on port 5174. In unified/same-origin setups, /lite is used.
  const liteUrl =
    isDev && typeof window !== 'undefined' && window.location.port === '5173'
      ? `${window.location.protocol}//${window.location.hostname}:5174/lite`
      : '/lite';

  return (
    <nav
      aria-label="HAATZA Global Experience Navigation"
      className="bg-white border-b border-[#E5EAF3] sticky top-0 z-50 shadow-soft-sm select-none"
    >
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-1.5 sm:py-2 flex items-center justify-between gap-4">
        {/* Marketplace Experience Navigation Cards */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none py-0.5">
          {/* HAATZA Marketplace */}
          <a
            href={shoppingUrl}
            className="group relative flex items-center gap-2 min-w-[128px] sm:min-w-[146px] px-3 sm:px-3.5 h-9 sm:h-10 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer select-none text-left shadow-2xs shrink-0 bg-white border-zinc-200/90 text-zinc-800 hover:border-[#2962FF]/40 hover:bg-[#EEF3FF]/40 hover:shadow-xs"
          >
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 bg-[#EEF3FF] text-[#2962FF]">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span className="font-black text-[11px] sm:text-xs tracking-tight leading-tight text-zinc-900">
                HAATZA
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate text-zinc-400 group-hover:text-zinc-600">
                Marketplace
              </span>
            </div>
          </a>

          {/* LITE 10-15 Mins */}
          <a
            href={liteUrl}
            className="group relative flex items-center gap-2 min-w-[128px] sm:min-w-[146px] px-3 sm:px-3.5 h-9 sm:h-10 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer select-none text-left shadow-2xs shrink-0 bg-white border-zinc-200/90 text-zinc-800 hover:border-[#238636]/40 hover:bg-emerald-50/40 hover:shadow-xs"
          >
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 bg-emerald-100 text-[#238636]">
              <Sprout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span className="font-black text-[11px] sm:text-xs tracking-tight leading-tight text-zinc-900">
                LITE
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate text-zinc-400 group-hover:text-zinc-600">
                10-15 Mins
              </span>
            </div>
          </a>

          {/* NEST Home Services (Active Tab) */}
          <Link
            to="/nest"
            className="group relative flex items-center gap-2 min-w-[128px] sm:min-w-[146px] px-3 sm:px-3.5 h-9 sm:h-10 rounded-md sm:rounded-lg border transition-all duration-200 cursor-pointer select-none text-left shadow-2xs shrink-0 bg-[#6C3FC5] border-[#6C3FC5] text-white shadow-xs scale-[1.01]"
          >
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 bg-white/20 text-white">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="flex flex-col min-w-0 pr-0.5">
              <span className="font-black text-[11px] sm:text-xs tracking-tight leading-tight text-white">
                NEST
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider leading-none mt-0.5 truncate text-white/80">
                Home Services
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HaatzaNestTopMarketplaceBar;
