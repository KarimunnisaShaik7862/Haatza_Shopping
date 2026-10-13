import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24 sm:pb-16">
      <div className="max-w-xl mx-auto text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center font-black text-3xl mx-auto shadow-soft-sm">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#172033] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
          The destination you requested might have been moved, renamed, or is temporarily unavailable.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs transition-all shadow-soft flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 rounded-xl border border-[#E5EAF3] bg-white hover:bg-[#EEF3FF] hover:text-[#2962FF] text-[#172033] font-bold text-xs transition-colors shadow-2xs"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  </div>
  );
};
