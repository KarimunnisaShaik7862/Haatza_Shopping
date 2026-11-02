import React from 'react';
import { Users, Calendar } from 'lucide-react';

export interface HaatzaNestBusyBannerProps {
  onScheduleClick?: () => void;
  className?: string;
}

export const HaatzaNestBusyBanner: React.FC<HaatzaNestBusyBannerProps> = ({
  onScheduleClick,
  className = '',
}) => {
  return (
    <section 
      aria-label="Service Professional Notice"
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-4 ${className}`}
    >
      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FAF7FD] to-[#F5EEFB] border border-[#E4D7F5] py-6 sm:py-7 px-5 sm:px-8 text-center shadow-[0_4px_20px_-4px_rgba(112,37,199,0.05)] overflow-hidden">
        
        {/* Subtle Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7025C7]/30 to-transparent" />

        <div className="max-w-xl mx-auto flex flex-col items-center space-y-2">
          
          {/* Small Tasteful Purple Line Icon Chip */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 border border-purple-200/60 text-[#7025C7] text-[11px] sm:text-xs font-bold shadow-2xs">
            <Users className="w-3.5 h-3.5 text-[#7025C7]" />
            <span>Dedicated Service Helpers</span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl md:text-[25px] font-black text-[#7025C7] font-heading tracking-tight leading-tight pt-0.5">
            Our Team Is Taking a Short Break
          </h2>

          {/* Muted Purple Accent Line */}
          <div 
            className="w-10 h-1 rounded-full bg-[#7025C7]/30" 
            aria-hidden="true" 
          />

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-[14.5px] text-[#5A5266] font-medium leading-relaxed max-w-lg mx-auto pt-0.5">
            Our home service professionals are currently unavailable. Please try again shortly or choose a scheduled visit if available.
          </p>

          {/* Calendar-Related Supporting Label or Button */}
          {onScheduleClick && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onScheduleClick}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F5ECFF] border border-purple-200/80 hover:border-[#7025C7] text-[#7025C7] text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 text-[#7025C7]" />
                <span>Choose Scheduled Visit</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HaatzaNestBusyBanner;
