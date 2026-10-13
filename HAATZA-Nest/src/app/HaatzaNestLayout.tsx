import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { HaatzaNestHeader } from '../components/HaatzaNestHeader/HaatzaNestHeader';
import { HaatzaNestCategoryNav } from '../components/HaatzaNestNavigation/HaatzaNestCategoryNav';
import { HaatzaNestBookingModal } from '../components/HaatzaNestBooking/HaatzaNestBookingModal';
import { Zap, Heart, ShieldCheck } from 'lucide-react';

export const HaatzaNestLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FD] text-[#172033]">
      <HaatzaNestHeader />
      <HaatzaNestCategoryNav />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Booking Modal */}
      <HaatzaNestBookingModal />

      {/* HAATZA Nest Footer */}
      <footer className="bg-white border-t border-zinc-200 mt-12 py-8">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-100 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6C3FC5] text-white flex items-center justify-center">
                <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              </div>
              <span className="font-black text-lg text-zinc-900 font-heading">HAATZA NEST</span>
              <span className="text-xs bg-[#F2ECFC] text-[#6C3FC5] font-bold px-2 py-0.5 rounded-full">
                On-Demand Home Help & Deep Cleaning
              </span>
            </div>

            <div className="flex items-center gap-6 text-xs font-semibold text-zinc-600">
              <Link to="/nest/services" className="hover:text-[#6C3FC5]">All Services</Link>
              <Link to="/nest/bookings" className="hover:text-[#6C3FC5]">My Bookings</Link>
              <a href="#" className="hover:text-[#6C3FC5]">Safety & Background Checks</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <p>© 2026 HAATZA Nest Services Private Limited. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Serving homes with trust and care <Heart className="w-3.5 h-3.5 text-purple-500 fill-current" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
