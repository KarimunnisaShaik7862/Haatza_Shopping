import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { HaatzaLiteHeader } from '../components/HaatzaLiteHeader/HaatzaLiteHeader';
import { HaatzaLiteCategoryNav } from '../components/HaatzaLiteNavigation/HaatzaLiteCategoryNav';
import { Sprout, Zap, ShieldCheck, Heart } from 'lucide-react';

export const HaatzaLiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FCF9] text-[#172033]">
      <HaatzaLiteHeader />
      <HaatzaLiteCategoryNav />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* HAATZA Lite Dedicated Footer */}
      <footer className="bg-white border-t border-zinc-200 mt-12 py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#238636] text-white flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-black text-lg text-zinc-900 font-heading">HAATZA LITE</span>
              <span className="text-xs bg-[#EAF6EC] text-[#238636] font-bold px-2 py-0.5 rounded-full">
                10-15 Min Express Groceries
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold text-zinc-600">
              <Link to="/categories" className="hover:text-[#238636]">Categories</Link>
              <Link to="/search" className="hover:text-[#238636]">Search Aisles</Link>
              <a href="#" className="hover:text-[#238636]">Terms & Hygiene Standards</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <p>© 2026 HAATZA Lite Quick-Commerce Private Limited. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Freshly dispatched with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> in 10-15 minutes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
