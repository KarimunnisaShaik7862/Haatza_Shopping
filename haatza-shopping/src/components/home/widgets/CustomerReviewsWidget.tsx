import React from 'react';
import { Star, ShieldCheck, MessageSquareQuote } from 'lucide-react';
import { CustomerReviewItem } from '../../../types/homepageWidgets.types';
import { mockCustomerReviews } from '../../../services/mock/data/homepageWidgets.data';

interface CustomerReviewsWidgetProps {
  reviews?: CustomerReviewItem[];
  className?: string;
}

export const CustomerReviewsWidget: React.FC<CustomerReviewsWidgetProps> = ({
  reviews = mockCustomerReviews,
  className = '',
}) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section
      aria-label="Customer Reviews and Ratings"
      className={`w-full py-8 sm:py-10 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#2962FF]" />
            <span>Verified Shopper Voices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real feedback from verified purchasers across India.
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl p-5 bg-white border border-[#E5EAF3] hover:border-[#DBEAFE] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Rating Stars & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'fill-current text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {rev.date}
                </span>
              </div>

              {/* Review Title & Body */}
              <h4 className="text-sm font-bold text-[#172033] tracking-tight line-clamp-1">
                {rev.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-4">
                "{rev.comment}"
              </p>
            </div>

            {/* Author & Product Info */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#172033]">
                    {rev.author}
                  </span>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-sm border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {rev.location}
                </span>
              </div>

              {/* Product Thumbnail */}
              {rev.productImage && (
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img
                    src={rev.productImage}
                    alt={rev.productName || 'Product'}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
