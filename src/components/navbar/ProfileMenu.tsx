import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Package, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDestination } from '../../context/DestinationContext';

export const ProfileMenu: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useDestination();
  const navigate = useNavigate();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const brandPrimary = theme?.primary || '#2962FF';

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
      className="relative"
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
              navigate('/account');
              setIsAccountMenuOpen(false);
            }}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-zinc-100 text-zinc-800 transition-colors cursor-pointer"
            title="View My Profile & Account"
            aria-label="View My Profile and Account"
          >
            <div 
              className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-2xs font-heading"
              style={{ backgroundColor: brandPrimary }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="hidden md:inline text-xs font-bold text-[#202124] max-w-[90px] truncate">
              {user.name.split(' ')[0]}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-zinc-400 hidden sm:block transition-transform duration-200 ${
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
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer font-heading"
          aria-label="Login or Sign Up"
        >
          <User className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
          <span className="hidden sm:inline">Login / Sign Up</span>
        </Link>
      )}

      {/* Account Menu Flyout */}
      {isAccountMenuOpen && isAuthenticated && user && (
        <div
          className="absolute right-0 top-full pt-1.5 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="bg-white rounded-2xl shadow-soft-lg border border-[#E5EAF3] py-2">
            <div className="px-4 py-2 border-b border-zinc-100">
              <p className="text-xs font-bold text-[#202124] truncate">{user.name}</p>
              <p className="text-[11px] text-[#5F6368] truncate">{user.email}</p>
            </div>
            <Link
              to="/account"
              onClick={() => setIsAccountMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 font-medium"
            >
              <User className="w-4 h-4 text-zinc-400" /> My Profile
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsAccountMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 font-medium"
            >
              <Package className="w-4 h-4 text-zinc-400" /> My Orders & Returns
            </Link>
            <Link
              to="/account/addresses"
              onClick={() => setIsAccountMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-xs text-zinc-700 hover:bg-zinc-50 font-medium"
            >
              <MapPin className="w-4 h-4 text-zinc-400" /> Saved Addresses
            </Link>
            <div className="my-1 border-t border-zinc-100" />
            <button
              type="button"
              onClick={() => {
                setIsAccountMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-semibold cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
