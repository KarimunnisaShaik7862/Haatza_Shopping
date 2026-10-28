import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export const OrdersButton: React.FC = () => {
  return (
    <Link
      to="/orders"
      className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-colors group cursor-pointer"
      aria-label="My Orders"
    >
      <Package className="w-4 h-4 text-zinc-600 group-hover:text-zinc-950 transition-colors" />
      <span className="hidden sm:inline">Orders</span>
    </Link>
  );
};

export default OrdersButton;
