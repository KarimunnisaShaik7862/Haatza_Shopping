import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';

export const HaatzaNestLocationSelector: React.FC = () => {
  const { location, openLocationModal } = useHaatzaNestLocation();

  return (
    <button
      type="button"
      onClick={openLocationModal}
      className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg border border-zinc-200/80 hover:border-purple-300 hover:bg-purple-50/50 transition-colors text-left max-w-[220px] sm:max-w-[280px] cursor-pointer"
    >
      <MapPin className="w-4 h-4 text-[#6C3FC5] shrink-0" />
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider leading-none">
          Service Location
        </span>
        <span className="text-xs font-bold text-zinc-800 truncate leading-tight">
          {location.locality}, {location.pincode}
        </span>
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-0.5" />
    </button>
  );
};
