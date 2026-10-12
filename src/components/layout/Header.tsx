import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDestination } from '../../context/DestinationContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useLocationContext } from '../../context/LocationContext';
import { DestinationSwitcher } from './DestinationSwitcher';
import { SearchBar } from '../forms/SearchBar';
import { LocationSelectorModal } from './LocationSelectorModal';
import { CategoryNavigation } from '../navigation/CategoryNavigation';
import { 
  Heart, ShoppingCart, User, MapPin, 
  Menu, X, ChevronDown, Package, LogOut, 
  HelpCircle, ChevronRight, ShoppingBag
} from 'lucide-react';

export const Header: React.FC = () => {
  const { destination, setDestination, theme } = useDestination();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const { location, openLocationModal } = useLocationContext();
  const navigate = useNavigate();

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account menu when clicking outside
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

  // Active theme color (default HAATZA deep red: #A60000)
  const brandPrimary = theme?.primary || '#A60000';

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/90 shadow-xs">
        
        {/* ========================================================
            ROW 1: Brand Logo + Destination Switcher | Deliver to Location
            ======================================================== */}
        <div className="border-b border-zinc-100 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu Trigger + Three Separate Rectangle Brand Cards */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 -ml-1 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Three Separate Rectangle Brand Cards (HAATZA | LITE | NEST) */}
              <DestinationSwitcher />
            </div>

            {/* Right: Deliver to Location Selector */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openLocationModal}
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all text-left"
                aria-label="Change delivery location"
              >
                <MapPin className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" style={{ color: brandPrimary }} />
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-zinc-500 font-medium hidden sm:inline">Deliver to</span>
                  <span className="font-extrabold text-[#202124] tracking-tight">{location.pincode}</span>
                  <span 
                    className="font-bold inline-flex items-center gap-0.5 hover:underline"
                    style={{ color: brandPrimary }}
                  >
                    Change
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            ROW 2: Wide Search Bar | User Actions (Login, Wishlist, Cart)
            ======================================================== */}
        <div className="bg-white">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Left: Wide Search Bar */}
            <div className="flex-1 max-w-4xl">
              <SearchBar />
            </div>

            {/* Right: Actions aligned horizontally with dividers */}
            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              
              {/* 1. Login / Sign Up or User Dropdown */}
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
                        className="w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-2xs"
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
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
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
                    <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 py-2">
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

              {/* Vertical divider */}
              <div className="h-5 w-px bg-zinc-200" />

              {/* 2. My List (Wishlist) with live count badge */}
              <Link
                to="/wishlist"
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
                aria-label={`My List with ${wishlistCount} items`}
              >
                <div className="relative">
                  <Heart className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
                  {wishlistCount > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: brandPrimary }}
                    >
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">My List</span>
              </Link>

              {/* Vertical divider */}
              <div className="h-5 w-px bg-zinc-200" />

              {/* 3. Cart with live count badge */}
              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
                aria-label={`Cart with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
                  {cartCount > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: brandPrimary }}
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </Link>

            </div>
          </div>
        </div>

        {/* ========================================================
            ROW 3: Horizontally Scrollable Category Navigation
            ======================================================== */}
        <CategoryNavigation />
      </header>

      {/* Location selector modal popup */}
      <LocationSelectorModal />

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xl font-black" style={{ color: brandPrimary }}>HAATZA</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Destinations Switcher in mobile drawer */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Select Platform Experience
              </p>
              <div className="space-y-1.5">
                <Link
                  to="/haatza"
                  onClick={() => {
                    setDestination('haatza');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between ${
                    destination === 'haatza' ? 'bg-[#F5DCDC] text-[#A60000]' : 'bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>HAATZA Marketplace</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-zinc-200">Flipkart/Amazon</span>
                </Link>
                <Link
                  to="/lite"
                  onClick={() => {
                    setDestination('lite');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between ${
                    destination === 'lite' ? 'bg-[#EAF6EC] text-[#238636]' : 'bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>LITE Quick Commerce</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-zinc-200">10-15 Mins</span>
                </Link>
                <Link
                  to="/nest"
                  onClick={() => {
                    setDestination('nest');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between ${
                    destination === 'nest' ? 'bg-[#F2ECFC] text-[#6C3FC5]' : 'bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>NEST Home Services</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-zinc-200">On-Demand</span>
                </Link>
              </div>
            </div>

            {/* Pincode selector in mobile drawer */}
            <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
              <p className="text-[11px] text-zinc-500 font-medium">Deliver to:</p>
              <p className="text-xs font-bold text-[#202124]">{location.formattedAddress}</p>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openLocationModal();
                }}
                className="mt-2 text-xs font-bold hover:underline"
                style={{ color: brandPrimary }}
              >
                Change PIN code
              </button>
            </div>

            {/* Quick account links */}
            <div className="space-y-1 border-t border-zinc-200 pt-4">
              <Link
                to="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <Package className="w-4 h-4" /> My Orders & Tracking
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <Heart className="w-4 h-4" /> My Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/account/addresses"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <MapPin className="w-4 h-4" /> Saved Addresses
              </Link>
              <Link
                to="/help"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                <HelpCircle className="w-4 h-4" /> Help Center & FAQs
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
