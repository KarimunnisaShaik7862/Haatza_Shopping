import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useDestination } from '../../context/DestinationContext';

export const MobileBottomNav: React.FC = () => {
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { theme } = useDestination();
  const brandPrimary = theme?.primary || '#2962FF';

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-zinc-200 z-40 md:hidden py-1.5 px-2 shadow-lg">
      <div className="grid grid-cols-5 items-center text-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 transition-colors ${
              isActive ? 'font-black' : 'text-zinc-500 hover:text-zinc-900'
            }`
          }
          style={({ isActive }) => ({ color: isActive ? brandPrimary : undefined })}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 transition-colors ${
              isActive ? 'font-black' : 'text-zinc-500 hover:text-zinc-900'
            }`
          }
          style={({ isActive }) => ({ color: isActive ? brandPrimary : undefined })}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Categories</span>
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `relative flex flex-col items-center py-1 transition-colors ${
              isActive ? 'font-black' : 'text-zinc-500 hover:text-zinc-900'
            }`
          }
          style={({ isActive }) => ({ color: isActive ? brandPrimary : undefined })}
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-1 -right-2 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-2xs"
                style={{ backgroundColor: brandPrimary }}
              >
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Wishlist</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `relative flex flex-col items-center py-1 transition-colors ${
              isActive ? 'font-black' : 'text-zinc-500 hover:text-zinc-900'
            }`
          }
          style={({ isActive }) => ({ color: isActive ? brandPrimary : undefined })}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-2 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-2xs"
                style={{ backgroundColor: brandPrimary }}
              >
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center py-1 transition-colors ${
              isActive ? 'font-black' : 'text-zinc-500 hover:text-zinc-900'
            }`
          }
          style={({ isActive }) => ({ color: isActive ? brandPrimary : undefined })}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
