import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useDestination } from '../../context/DestinationContext';

export const WishlistButton: React.FC = () => {
  const { itemCount: wishlistCount } = useWishlist();
  const { theme } = useDestination();
  const brandPrimary = theme?.primary || '#2962FF';

  return (
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
  );
};

export default WishlistButton;
