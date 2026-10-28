import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useDestination } from '../../context/DestinationContext';

export const CartButton: React.FC = () => {
  const { itemCount: cartCount } = useCart();
  const { theme } = useDestination();
  const brandPrimary = theme?.primary || '#2962FF';

  return (
    <Link
      to="/cart"
      className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
      aria-label={`My Cart with ${cartCount} items`}
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
      <span className="hidden sm:inline">My Cart</span>
    </Link>
  );
};

export default CartButton;
