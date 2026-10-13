import React from 'react';
import { HaatzaLiteLogo } from './HaatzaLiteLogo';
import { HaatzaLiteLocationSelector } from './HaatzaLiteLocationSelector';
import { HaatzaLiteSearchBar } from './HaatzaLiteSearchBar';
import { HaatzaLiteCartButton } from './HaatzaLiteCartButton';
import { Zap } from 'lucide-react';

export const HaatzaLiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/80 shadow-xs">
      {/* 10-15 Min Express Delivery Notification Top Bar */}
      <div className="bg-[#238636] text-white py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-black uppercase text-[10px] tracking-wider bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-200">
              <Zap className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              10-15 MINS
            </span>
            <span className="text-xs text-emerald-50 hidden sm:inline">
              Superfast dark-store grocery delivery across your neighborhood.
            </span>
          </div>
          <span className="text-[11px] font-bold text-yellow-300">
            ⚡ Free Delivery on orders over ₹199
          </span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <HaatzaLiteLogo />
          <div className="hidden md:block">
            <HaatzaLiteLocationSelector />
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <HaatzaLiteSearchBar />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="md:hidden">
            <HaatzaLiteLocationSelector />
          </div>
          <HaatzaLiteCartButton />
        </div>
      </div>
    </header>
  );
};
