import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HaatzaNestLogo } from './HaatzaNestLogo';
import { HaatzaNestLocationSelector } from './HaatzaNestLocationSelector';
import { HaatzaNestSearchBar } from './HaatzaNestSearchBar';
import { HaatzaNestProfileMenu } from './HaatzaNestProfileMenu';
import { Sparkles, Menu, X, ArrowRight, Calendar, User as UserIcon } from 'lucide-react';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
export const HaatzaNestHeader: React.FC = () => {
  const { bookings } = useHaatzaNestBooking();
  const { user, isAuthenticated, logout } = useHaatzaNestUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookClick = () => {
    const scopeElement = document.getElementById('service-scope') || document.getElementById('expert-service-heading');
    if (scopeElement) {
      scopeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-[44px] sm:top-[55px] z-40 bg-white/95 backdrop-blur-md border-b border-[#E8DEF8] shadow-xs select-none">
      {/* Main Header Container */}
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-2 sm:py-2.5 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
        
        {/* Left: HAATZA NEST Logo & Service Location Selector */}
        <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-5 shrink-0">
          <HaatzaNestLogo />
          <div className="hidden sm:block shrink-0">
            <HaatzaNestLocationSelector />
          </div>
        </div>

        {/* Center: Wide Rounded Search Bar */}
        <div className="flex-1 max-w-xl mx-2 lg:mx-4 hidden md:block">
          <HaatzaNestSearchBar />
        </div>

        {/* Right: User Profile and Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Authenticated User Profile Avatar & Dropdown / Login Button */}
          <HaatzaNestProfileMenu />

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-full border border-[#E5D7F7] text-[#7024C7] hover:bg-[#F5ECFF] md:hidden cursor-pointer transition-colors shrink-0"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Row (visible below md breakpoint) */}
      <div className="px-3.5 sm:px-6 pb-2.5 md:hidden">
        <HaatzaNestSearchBar />
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F0E6FC] bg-white px-4 py-3 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-1">
            <HaatzaNestLocationSelector />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              to="/nest/services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[#F5ECFF] text-[#7024C7] flex items-center justify-between font-heading"
            >
              <span>All Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/nest/bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-zinc-50 hover:bg-[#F5ECFF] text-[#24152F] hover:text-[#7024C7] flex items-center justify-between font-heading"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7024C7]" />
                <span>My Bookings</span>
              </div>
              {bookings.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#7024C7] text-white text-[10px] font-black">
                  {bookings.length}
                </span>
              )}
            </Link>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleBookClick();
            }}
            className="w-full py-2.5 rounded-full bg-[#7024C7] hover:bg-[#4B148C] text-white font-extrabold text-xs text-center shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 fill-[#FFE34D] text-[#FFE34D]" />
            <span>Book a Verified Specialist</span>
          </button>
        </div>
      )}
    </header>
  );
};

