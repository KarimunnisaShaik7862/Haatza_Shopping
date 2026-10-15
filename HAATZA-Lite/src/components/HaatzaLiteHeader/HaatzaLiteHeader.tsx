import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HaatzaLiteSearchBar } from './HaatzaLiteSearchBar';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { ChevronDown, Heart, ShoppingCart, User, Package, MapPin } from 'lucide-react';

export const HaatzaLiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const { itemCount: liteCartCount } = useHaatzaLiteCart();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Optional sync with global demo user if present in localStorage
  const [user] = useState<{ name: string; email: string }>(() => {
    try {
      const stored = localStorage.getItem('haatza_demo_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.name) return parsed;
      }
    } catch {
      // fallback
    }
    return { name: 'Rahul Sharma', email: 'rahul.sharma@example.in' };
  });

  const [wishlistCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('haatza_wishlist_items');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed.length;
      }
    } catch {
      // fallback
    }
    return 0;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-[49px] sm:top-[53px] z-40 bg-white border-b border-[#E5EAF3] shadow-soft-sm">
      {/* ROW: Search Bar | User Actions (Profile, Wishlist, Cart) */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4 lg:gap-8">
          
          {/* Search Bar */}
          <div className="flex-1 max-w-4xl flex items-center gap-2">
            <HaatzaLiteSearchBar />
          </div>

          {/* Actions: Profile, Wishlist, Cart */}
          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* User Profile */}
            <div
              ref={accountMenuRef}
              className="relative"
              onMouseEnter={() => setIsAccountMenuOpen(true)}
              onMouseLeave={() => setIsAccountMenuOpen(false)}
            >
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
                <div className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-2xs font-heading bg-[#0C831F]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline text-xs font-bold text-[#202124] max-w-[90px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-400 hidden sm:block transition-transform duration-200 ${
                    isAccountMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Account Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white rounded-2xl shadow-lg border border-[#E5EAF3] py-2">
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
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-[#E5EAF3]" />

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
              aria-label={`My List with ${wishlistCount} items`}
            >
              <div className="relative">
                <Heart className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs bg-[#0C831F]">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">My List</span>
            </Link>

            {/* Divider */}
            <div className="h-5 w-px bg-[#E5EAF3]" />

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
              aria-label={`Cart with ${liteCartCount} items`}
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
                {liteCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs bg-[#0C831F]">
                    {liteCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};
