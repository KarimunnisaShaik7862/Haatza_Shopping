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

  // Pure white background across all pages
  const bgGradient = 'bg-white';

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
