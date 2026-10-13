import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import { useDestination } from '../../context/DestinationContext';

export const LocationSelector: React.FC = () => {
  const { location, openLocationModal } = useLocationContext();
  const { theme } = useDestination();
  const brandPrimary = theme?.primary || '#2962FF';

  return (
    <button
      type="button"
      onClick={openLocationModal}
      className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all text-left cursor-pointer"
      aria-label="Change delivery location"
    >
      <MapPin className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" style={{ color: brandPrimary }} />
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-zinc-500 font-medium hidden sm:inline">Deliver to</span>
        <span className="font-extrabold text-[#202124] tracking-tight">{location.pincode}</span>
        <span 
          className="font-bold inline-flex items-center gap-0.5 hover:underline"
          style={{ color: brandPrimary }}
        >
          Change
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </button>
  );
};

export default LocationSelector;
