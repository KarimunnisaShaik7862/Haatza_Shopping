import React from 'react';
import { Store, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductSellerInfoProps {
  product: Product;
}

export const ProductSellerInfo: React.FC<ProductSellerInfoProps> = ({ product }) => {
  const sellerName = product.sellerName || 'HAATZA Official Store';
  const sellerRating = product.sellerRating || 4.8;
  const sellerShopLink = `/category/${product.categoryId || 'all'}?seller=${encodeURIComponent(sellerName)}`;

  return (
    <div className="border-t border-slate-200 pt-5 sm:pt-6 space-y-3.5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2962FF] flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Sold By
              </h3>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-heading">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Merchant
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 font-heading">
              {sellerName}
            </p>
          </div>
        </div>

        {/* View Shop Button */}
        <Link
          to={sellerShopLink}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-[#EEF3FF] text-[#172033] hover:text-[#2962FF] font-bold text-xs transition-colors font-heading"
        >
          <span>View Shop</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-600 pt-1 font-body">
        <div className="flex items-center gap-1">
          <div className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold text-[11px]">
            <span>{sellerRating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-slate-500 text-[11px]">Merchant Rating</span>
        </div>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600">98% Positive Feedback</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600">Fast Dispatch Track Record</span>
      </div>
    </div>
  );
};
