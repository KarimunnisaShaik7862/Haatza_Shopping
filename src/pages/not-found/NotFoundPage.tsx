import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#FFEBEE] text-[#E53935] flex items-center justify-center font-black text-3xl mx-auto shadow-xs">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#202124] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] max-w-sm mx-auto">
          The destination you requested might have been moved, renamed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 font-bold text-xs transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
};
