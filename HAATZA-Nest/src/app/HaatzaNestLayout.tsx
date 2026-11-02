import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HaatzaNestTopMarketplaceBar } from '../components/HaatzaNestHeader/HaatzaNestTopMarketplaceBar';
import { HaatzaNestHeader } from '../components/HaatzaNestHeader/HaatzaNestHeader';
import { HaatzaNestCategoryNav } from '../components/HaatzaNestNavigation/HaatzaNestCategoryNav';
import { HaatzaNestFooter } from '../components/HaatzaNestFooter/HaatzaNestFooter';
import { HaatzaNestBookingModal } from '../components/HaatzaNestBooking/HaatzaNestBookingModal';
import { HaatzaNestAddressSelectionModal } from '../components/HaatzaNestAddress/HaatzaNestAddressSelectionModal';

export const HaatzaNestLayout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/nest';
  const isUnified = typeof window !== 'undefined' && Boolean((window as any).__HAATZA_UNIFIED__);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1FF] text-[#25212D]">
      {/* Top Marketplace Navigation and Delivery Location Row (rendered when not inside unified navigation) */}
      {!isUnified && <HaatzaNestTopMarketplaceBar />}

      {/* Main HAATZA Nest Header */}
      <HaatzaNestHeader />

      {!isHomePage && <HaatzaNestCategoryNav />}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Booking Modal */}
      <HaatzaNestBookingModal />

      {/* Global Address Selection UI Modal */}
      <HaatzaNestAddressSelectionModal />

      {/* Premium Redesigned HAATZA Nest Footer */}
      <HaatzaNestFooter />
    </div>
  );
};
