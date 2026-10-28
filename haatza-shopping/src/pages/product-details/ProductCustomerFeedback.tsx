import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { Product } from '../../types';
import { getCategoryFeedbackHighlights } from './productDetailHelper';

interface ProductCustomerFeedbackProps {
  product: Product;
}

export const ProductCustomerFeedback: React.FC<ProductCustomerFeedbackProps> = ({ product }) => {
  const highlights = getCategoryFeedbackHighlights(product);

  return (
    <div className="space-y-4 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-1">
        <div className="w-8 h-8 rounded-xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0 border border-[#DBEAFE]">
          <ThumbsUp className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 font-heading">
            What Customers Like
          </h4>
          <p className="text-xs text-slate-500 font-body">
            Verified customer sentiment based on recent purchases
          </p>
        </div>
      </div>

      {/* Clean responsive grid of small tags/cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 content-start">
        {highlights.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200/90 hover:border-[#2962FF]/40 transition-colors shadow-2xs"
          >
            <div className="flex items-center gap-2 min-w-0">
              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-800 font-heading truncate">
                {item.label}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono shrink-0">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
