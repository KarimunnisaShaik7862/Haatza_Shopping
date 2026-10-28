import React from 'react';
import { RatingDisplay } from '../../components/common/RatingDisplay';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductHeaderInfoProps {
  product: Product;
}

export const ProductHeaderInfo: React.FC<ProductHeaderInfoProps> = ({ product }) => {
  const scrollToRatings = (e: React.MouseEvent) => {
    e.preventDefault();
    const target =
      document.getElementById('ratings-customer-feedback') ||
      document.getElementById('ratings-and-reviews');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-3">
      {/* Main Product Name & Rating Badge Beside It (Clickable to jump to Ratings & Customer Feedback) */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight leading-snug font-heading">
          {product.name}
        </h1>
        <button
          type="button"
          onClick={scrollToRatings}
          title="Click to view Ratings & Customer Feedback"
          aria-label={`Rated ${product.rating.toFixed(1)} out of 5 stars. Click to jump to Ratings & Customer Feedback`}
          className="inline-flex items-center shrink-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all group focus:outline-none focus:ring-2 focus:ring-[#155EEF]/40 rounded-md"
        >
          <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="md" />
        </button>
      </div>

      {/* Authenticity & Stock Badges */}
      <div className="flex items-center gap-3 flex-wrap pt-0.5">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-heading">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Verified Authentic</span>
        </span>

        <span className="text-slate-300">|</span>

        {product.stock > 0 && product.stock <= 10 ? (
          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md font-heading animate-pulse">
            Only {product.stock} left in stock!
          </span>
        ) : product.inStock ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 font-heading">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> In Stock
          </span>
        ) : (
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-heading">
            Currently Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};
