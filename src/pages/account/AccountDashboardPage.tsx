import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { 
  User, Package, MapPin, Heart, ShoppingBag, 
  RotateCcw, ShieldCheck, LogOut, ArrowRight
} from 'lucide-react';

export const AccountDashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const breadcrumbs = [{ label: 'My Account' }];

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Sign in to view your account</h2>
        <Link to="/login" className="inline-block px-6 py-2.5 bg-[#E53935] text-white rounded-xl font-bold text-xs">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#FFEBEE] text-[#E53935] font-black text-2xl flex items-center justify-center border-2 border-[#E53935]/20 shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#202124]">{user.name}</h1>
            <p className="text-xs text-[#5F6368] mt-0.5">{user.email} • {user.phone}</p>
            <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Verified Shopper Tier
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="px-4 py-2 rounded-xl border border-zinc-200 hover:border-rose-200 hover:bg-rose-50 text-xs font-bold text-zinc-600 hover:text-rose-600 transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Navigation Quick Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Link
          to="/orders"
          className="p-5 bg-white rounded-2xl border border-zinc-200 hover:border-[#E53935] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-[#FFEBEE] group-hover:text-[#E53935] flex items-center justify-center text-zinc-700 transition-colors mb-3">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#202124]">Orders & Tracking</h3>
            <p className="text-xs text-[#5F6368] mt-0.5">Check delivery progress & past purchases</p>
          </div>
          <span className="text-xs font-bold text-[#E53935] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Orders <ArrowRight className="w-3 h-3" />
          </span>
        </Link>

        <Link
          to="/account/addresses"
          className="p-5 bg-white rounded-2xl border border-zinc-200 hover:border-[#E53935] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-[#FFEBEE] group-hover:text-[#E53935] flex items-center justify-center text-zinc-700 transition-colors mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#202124]">Saved Addresses</h3>
            <p className="text-xs text-[#5F6368] mt-0.5">Manage home, office and family delivery spots</p>
          </div>
          <span className="text-xs font-bold text-[#E53935] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage <ArrowRight className="w-3 h-3" />
          </span>
        </Link>

        <Link
          to="/wishlist"
          className="p-5 bg-white rounded-2xl border border-zinc-200 hover:border-[#E53935] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-[#FFEBEE] group-hover:text-[#E53935] flex items-center justify-center text-zinc-700 transition-colors mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#202124]">Wishlist ({wishlistCount})</h3>
            <p className="text-xs text-[#5F6368] mt-0.5">Items you saved for future buying</p>
          </div>
          <span className="text-xs font-bold text-[#E53935] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Saved <ArrowRight className="w-3 h-3" />
          </span>
        </Link>

        <Link
          to="/returns"
          className="p-5 bg-white rounded-2xl border border-zinc-200 hover:border-[#E53935] hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 group-hover:bg-[#FFEBEE] group-hover:text-[#E53935] flex items-center justify-center text-zinc-700 transition-colors mb-3">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#202124]">Returns & Refunds</h3>
            <p className="text-xs text-[#5F6368] mt-0.5">Doorstep replacement requests</p>
          </div>
          <span className="text-xs font-bold text-[#E53935] mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Returns <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
    </div>
  );
};
