import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Calendar, MapPin, LogOut } from 'lucide-react';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { useHaatzaNestBooking } from '../../hooks/useHaatzaNestBooking';

export const HaatzaNestProfileMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useHaatzaNestUser();
  const { bookings } = useHaatzaNestBooking();
  const navigate = useNavigate();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={accountMenuRef}
      className="relative select-none shrink-0"
      onMouseEnter={() => {
        if (isAuthenticated && user) setIsAccountMenuOpen(true);
      }}
      onMouseLeave={() => {
        if (isAuthenticated && user) setIsAccountMenuOpen(false);
      }}
    >
      {isAuthenticated && user ? (
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              navigate('/nest/profile');
              setIsAccountMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#F5ECFF]/70 text-[#24152F] transition-colors cursor-pointer"
            title="View My Profile & Account"
            aria-label="View My Profile and Account"
          >
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-2xs font-heading bg-[#7027C9]"
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-[#24152F] max-w-[90px] truncate font-heading">
              {user.name.split(' ')[0]}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-500 hidden sm:block transition-transform duration-200 ${
                isAccountMenuOpen ? 'rotate-180' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsAccountMenuOpen(!isAccountMenuOpen);
              }}
            />
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-[#24152F] hover:text-[#7027C9] hover:bg-[#F5ECFF] transition-colors group cursor-pointer font-heading"
          aria-label="Login or Sign Up"
        >
          <User className="w-4 h-4 text-[#7027C9] group-hover:scale-105 transition-transform" />
          <span className="hidden sm:inline">Login / Sign Up</span>
        </Link>
      )}

      {/* Account Menu Flyout (matching Marketplace dropdown exactly, in Nest purple theme) */}
      {isAccountMenuOpen && isAuthenticated && user && (
        <div
          className="absolute right-0 top-full pt-1.5 w-60 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-[#E5D7F7] py-2">
            <div className="px-4 py-2 border-b border-[#F0E6FC]">
              <p className="text-xs font-bold text-[#24152F] truncate font-heading">{user.name}</p>
              <p className="text-[11px] text-[#7D6F8D] truncate mt-0.5">{user.email}</p>
            </div>

            <div className="py-1">
              <Link
                to="/nest/profile?tab=profile"
                onClick={() => setIsAccountMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#24152F] hover:bg-[#F5ECFF] hover:text-[#7027C9] font-medium transition-colors"
              >
                <User className="w-4 h-4 text-zinc-400 group-hover:text-[#7027C9]" />
                <span>My Profile</span>
              </Link>

              <Link
                to="/nest/profile?tab=bookings"
                onClick={() => setIsAccountMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2 text-xs text-[#24152F] hover:bg-[#F5ECFF] hover:text-[#7027C9] font-medium transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span>My Bookings</span>
                </div>
                {bookings.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#7027C9] text-white text-[10px] font-black">
                    {bookings.length}
                  </span>
                )}
              </Link>

              <Link
                to="/nest/profile?tab=addresses"
                onClick={() => setIsAccountMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#24152F] hover:bg-[#F5ECFF] hover:text-[#7027C9] font-medium transition-colors"
              >
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>Saved Addresses</span>
              </Link>
            </div>

            <div className="my-1 border-t border-[#F0E6FC]" />

            <button
              type="button"
              onClick={() => {
                setIsAccountMenuOpen(false);
                logout();
                navigate('/nest');
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-semibold cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HaatzaNestProfileMenu;
