import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HaatzaLiteHeader } from '../components/HaatzaLiteHeader/HaatzaLiteHeader';
import { HaatzaLiteCategoryNav } from '../components/HaatzaLiteNavigation/HaatzaLiteCategoryNav';
import { HaatzaLiteFooter } from '../components/HaatzaLiteFooter/HaatzaLiteFooter';

export const HaatzaLiteLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#111D15] haatza-lite-scope">
      {/* Unified Sticky Header Unit: Attaches Category Nav directly to Search Header with 0 gap */}
      <div className="sticky top-[49px] sm:top-[53px] z-[100] bg-white shadow-soft-sm">
        <HaatzaLiteHeader />
        <HaatzaLiteCategoryNav />
      </div>
      <main className="flex-1 flex flex-col">
        <React.Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-sm font-semibold text-emerald-600">Loading...</div>}>
          <Outlet />
        </React.Suspense>
      </main>

      {/* HAATZA Lite Blinkit-Styled Multi-Column Directory Footer */}
      <HaatzaLiteFooter />
    </div>
  );
};
