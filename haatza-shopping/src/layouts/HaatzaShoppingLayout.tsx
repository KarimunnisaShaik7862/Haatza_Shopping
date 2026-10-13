import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

export const HaatzaShoppingLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F7F9FC] via-[#F5F7FF] to-[#FFFFFF] text-[#172033] haatza-shopping-root">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <ErrorBoundary>
          <React.Suspense
            fallback={
              <div className="haatza-shopping-container py-8 space-y-8">
                <LoadingSkeleton type="grid" count={4} />
              </div>
            }
          >
            <Outlet />
          </React.Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default HaatzaShoppingLayout;
