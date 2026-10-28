import React from 'react';
import { Star, MessageSquare, Check } from 'lucide-react';
import { Product } from '../../types';
import { getRatingBreakdown } from './productDetailHelper';

interface ProductRatingSummaryProps {
  product: Product;
  onWriteReviewClick?: () => void;
  selectedRatingFilter?: number | null;
  onSelectRatingFilter?: (rating: number | null) => void;
}

export const ProductRatingSummary: React.FC<ProductRatingSummaryProps> = ({
  product,
  onWriteReviewClick,
  selectedRatingFilter = null,
  onSelectRatingFilter,
}) => {
  const breakdown = getRatingBreakdown(product.rating, product.reviewCount);

  return (
    <div id="ratings-customer-feedback" className="space-y-4 h-full flex flex-col justify-between scroll-mt-24">
      {/* Header with Title & Write Review Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Ratings & Customer Feedback
          </h3>
          <p className="text-xs text-slate-500 font-body">
            Based on {product.reviewCount.toLocaleString('en-IN')} verified customer reviews
          </p>
        </div>

        {onWriteReviewClick && (
          <button
            type="button"
            onClick={onWriteReviewClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EEF3FF] hover:bg-[#DBEAFE] text-[#2962FF] font-bold text-xs transition-colors shadow-2xs font-heading cursor-pointer self-start sm:self-auto"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </button>
        )}
      </div>

      {/* Rating Overview Card */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex-1">
        {/* Left: Overall Star Rating & Recommendation */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
          <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading flex items-center gap-1.5">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
          </div>

          <div className="flex items-center gap-1 text-amber-400 mt-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current text-amber-400'
                    : i < product.rating
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-slate-200 fill-slate-200'
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] text-slate-600 mt-1 font-body">
            {product.reviewCount.toLocaleString('en-IN')} Ratings & Reviews
          </p>

          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md mt-2 font-heading">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>96% Recommended</span>
          </span>
        </div>

        {/* Right: Horizontal Proportional Breakdown Bars */}
        <div className="sm:col-span-7 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-heading mb-0.5">
            <span>Rating Breakdown</span>
            {selectedRatingFilter && onSelectRatingFilter && (
              <button
                type="button"
                onClick={() => onSelectRatingFilter(null)}
                className="text-[11px] text-[#2962FF] font-bold hover:underline cursor-pointer"
              >
                Clear ({selectedRatingFilter}★)
              </button>
            )}
          </div>

          {breakdown.map((item) => {
            const isSelected = selectedRatingFilter === item.stars;
            return (
              <button
                key={item.stars}
                type="button"
                onClick={() => onSelectRatingFilter && onSelectRatingFilter(isSelected ? null : item.stars)}
                className={`w-full flex items-center gap-2 text-xs p-1 rounded-lg transition-colors cursor-pointer group text-left ${
                  isSelected ? 'bg-[#EEF3FF]' : 'hover:bg-slate-50'
                }`}
                title={`Filter reviews by ${item.stars} stars (${item.count} reviews)`}
              >
                {/* Star Label */}
                <span className="w-8 font-bold text-slate-800 flex items-center gap-0.5 font-heading group-hover:text-[#2962FF] text-[11px]">
                  <span>{item.stars}</span>
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                </span>

                {/* Progress Track with Proportional Bar */}
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.stars >= 4
                        ? 'bg-[#2962FF]'
                        : item.stars === 3
                        ? 'bg-amber-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                {/* Percentage */}
                <span className="w-8 text-right text-slate-600 font-semibold font-mono text-[11px]">
                  {item.percentage}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
