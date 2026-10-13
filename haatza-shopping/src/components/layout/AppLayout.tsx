import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBottomNav } from './MobileBottomNav';
import { useDestination } from '../../context/DestinationContext';
import { ErrorBoundary } from '../common/ErrorBoundary';

import { LoadingSkeleton } from '../common/LoadingSkeleton';

export const AppLayout: React.FC = () => {
  const { pathname } = useLocation();
  const { destination } = useDestination();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  // Destination-specific smooth ambient background gradient
  const bgGradient =
    destination === 'lite'
      ? 'bg-gradient-to-b from-[#F2FAF4] via-[#F8FCF9] to-white'
      : destination === 'nest'
      ? 'bg-gradient-to-b from-[#F6F2FC] via-[#FAF8FD] to-white'
      : 'bg-gradient-to-b from-[#F7F9FC] via-[#F5F7FF] to-[#FFFFFF]';

  return (
    <div className={`min-h-screen flex flex-col ${bgGradient} text-[#172033] transition-colors duration-300`}>
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <ErrorBoundary>
          <React.Suspense
            fallback={
              <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 space-y-8">
                <LoadingSkeleton type="grid" count={4} />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};
