import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDestination } from '../../context/DestinationContext';
import { useLocationContext } from '../../context/LocationContext';
import { useWishlist } from '../../context/WishlistContext';
import { SearchBar } from './SearchBar';
import { ProfileMenu } from './ProfileMenu';
import { WishlistButton } from './WishlistButton';
import { CartButton } from './CartButton';
import { OrdersButton } from './OrdersButton';
import { CategoryNavigation } from './CategoryNavigation';
import { LocationSelectorModal } from '../layout/LocationSelectorModal';
import { Menu, X, Package, Heart, MapPin, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { destination, setDestination, theme } = useDestination();
  const { location, openLocationModal } = useLocationContext();
  const { itemCount: wishlistCount } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      // Flipkart-style smooth threshold with wide hysteresis deadband:
      // When scrolled down into the page (> 60px): transition to compact text mode
      // When returned back up near top (<= 25px): restore full icon-based navbar
      // Between 25px and 60px: deadband prevents any toggling, flickering, or layout oscillation
      if (currentScrollY > 60) {
        setIsScrolled((prev) => (!prev ? true : prev));
      } else if (currentScrollY <= 25) {
        setIsScrolled((prev) => (prev ? false : prev));
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const brandPrimary = theme?.primary || '#2962FF';

  return (
    <>
      <header
        className={`sticky top-[49px] sm:top-[53px] ${isSearchOpen ? 'z-50' : 'z-40'} bg-white transition-shadow duration-200`}
      >
        {/* ROW: Search Bar | User Actions (Profile, Wishlist, Cart) */}
        <div className="bg-white">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-1.5 sm:py-2 flex items-center justify-between gap-3 sm:gap-4 lg:gap-6">
            {/* Left side: Mobile Drawer Trigger + Search Bar */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 -ml-1 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors shrink-0"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl lg:max-w-2xl">
                <SearchBar isScrolled={isScrolled} onOpenChange={setIsSearchOpen} />
              </div>
            </div>

            {/* Right side in exact order: 1. My List, 2. My Cart, 3. Orders, 4. Profile icon */}
            <div className="flex items-center space-x-1 sm:space-x-2.5 lg:space-x-3 shrink-0">
              {/* 1. My List */}
              <WishlistButton />

              <div className="h-5 w-px bg-[#E5EAF3] hidden sm:block" />

              {/* 2. My Cart */}
              <CartButton />

              <div className="h-5 w-px bg-[#E5EAF3] hidden sm:block" />

              {/* 3. Orders */}
              <OrdersButton />

              <div className="h-5 w-px bg-[#E5EAF3]" />

              {/* 4. Profile icon (Last item on the right) */}
              <ProfileMenu />
            </div>
          </div>
        </div>

        {/* ROW 3: Category Navigation */}
        <CategoryNavigation isScrolled={isScrolled} />
      </header>

      {/* Location Modal */}
      <LocationSelectorModal />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <span className="text-xl font-black font-heading" style={{ color: brandPrimary }}>HAATZA</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Destination Experiences */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 font-heading">
                Select Platform Experience
              </p>
              <div className="space-y-1.5">
                <Link
                  to="/haatza"
                  onClick={() => {
                    setDestination('haatza');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between font-heading ${
                    destination === 'haatza' ? 'bg-[#EEF3FF] text-[#2962FF]' : 'bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>HAATZA Marketplace</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-zinc-200">Shop</span>
                </Link>
                <Link
                  to="/lite"
                  onClick={() => {
                    setDestination('lite');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between font-heading ${
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
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm flex items-center justify-between font-heading ${
                    destination === 'nest' ? 'bg-[#F2ECFC] text-[#6C3FC5]' : 'bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span>NEST Home Services</span>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-zinc-200">Services</span>
                </Link>
              </div>
            </div>

            {/* Pincode selector */}
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

            {/* Links */}
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

export default Navbar;
