import React from 'react';
import { DestinationSwitcher } from '@shopping/components/layout/DestinationSwitcher';
import { LocationSelector } from '@shopping/components/navbar/LocationSelector';
import { LocationSelectorModal } from '@shopping/components/layout/LocationSelectorModal';

export const UnifiedMainNavigation: React.FC = () => {
  return (
    <>
      <nav
        aria-label="HAATZA Global Experience Navigation"
        className="bg-white border-b border-[#E5EAF3] sticky top-0 z-[110] shadow-soft-sm"
        style={{ zIndex: 110 }}
      >
        <div className="max-w-[1440px] mx-auto px-2.5 sm:px-6 lg:px-14 xl:px-16 pt-1.5 pb-1 sm:pt-2 sm:pb-1 flex items-center justify-between gap-1.5 sm:gap-4">
          {/* Main Experience Navigation Cards (Screenshot 2) */}
          <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto scrollbar-none py-0.5 shrink min-w-0 pr-1">
            <DestinationSwitcher />
          </div>

          {/* Deliver to Location Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LocationSelector />
          </div>
        </div>
      </nav>
      <LocationSelectorModal />
    </>
  );
};

export default UnifiedMainNavigation;
