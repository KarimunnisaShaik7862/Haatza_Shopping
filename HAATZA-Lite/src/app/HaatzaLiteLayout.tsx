import React from 'react';
import { Outlet } from 'react-router-dom';
import { HaatzaLiteHeader } from '../components/HaatzaLiteHeader/HaatzaLiteHeader';
import { HaatzaLiteCategoryNav } from '../components/HaatzaLiteNavigation/HaatzaLiteCategoryNav';
import { HaatzaLiteFooter } from '../components/HaatzaLiteFooter/HaatzaLiteFooter';

export const HaatzaLiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#111D15]">
      <HaatzaLiteHeader />
      <HaatzaLiteCategoryNav />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* HAATZA Lite Blinkit-Styled Multi-Column Directory Footer */}
      <HaatzaLiteFooter />
    </div>
  );
};
