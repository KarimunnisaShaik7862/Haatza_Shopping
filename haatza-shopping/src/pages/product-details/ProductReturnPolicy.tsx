import React from 'react';
import { RotateCcw, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getCategoryReturnPolicy } from './productDetailHelper';

interface ProductReturnPolicyProps {
  product: Product;
}

export const ProductReturnPolicy: React.FC<ProductReturnPolicyProps> = ({ product }) => {
  const policy = getCategoryReturnPolicy(product);

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2962FF] flex items-center justify-center">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
              Return & Replacement Policy
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {policy.title}
            </h4>
          </div>
        </div>

        <Link
          to="/returns"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2962FF] hover:underline font-heading"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Full Policy Terms</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-body">
        {policy.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600 font-body">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Doorstep courier pickup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Keep brand tags intact</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Instant source account refund</span>
        </div>
      </div>
    </div>
  );
};
