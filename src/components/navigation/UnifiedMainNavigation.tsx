import React from 'react';
import { DestinationSwitcher } from '@shopping/components/layout/DestinationSwitcher';
import { LocationSelector } from '@shopping/components/navbar/LocationSelector';
import { LocationSelectorModal } from '@shopping/components/layout/LocationSelectorModal';

export const UnifiedMainNavigation: React.FC = () => {
  return (
    <>
      <nav
        aria-label="HAATZA Global Experience Navigation"
        className="bg-white sticky top-0 z-50"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-1.5 sm:py-2 flex items-center justify-between gap-4">
          {/* Main Experience Navigation Cards (Screenshot 2) */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-0.5">
            <DestinationSwitcher />
          </div>

          {/* Deliver to Location Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <LocationSelector />
          </div>
        </div>
      </nav>
      <LocationSelectorModal />
    </>
  );
};

export default UnifiedMainNavigation;
