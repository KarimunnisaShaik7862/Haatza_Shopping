import React from 'react';
import { Product } from '../../types';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export interface ProductInformationProps {
  product: Product;
  activeTab: 'specs' | 'reviews' | 'seller';
  onTabChange: (tab: 'specs' | 'reviews' | 'seller') => void;
}

export const ProductInformation: React.FC<ProductInformationProps> = ({
  product,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="pt-6">
      {/* Guarantees Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F5F7FF] rounded-2xl border border-[#DBEAFE] mb-6">
        <div className="flex items-center gap-2.5 text-xs text-[#172033]">
          <Truck className="w-4 h-4 text-[#2962FF] shrink-0" />
          <span>{product.deliveryDays}-day marketplace delivery</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#172033]">
          <RotateCcw className="w-4 h-4 text-[#2962FF] shrink-0" />
          <span>7-day doorstep replacement</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#172033]">
          <ShieldCheck className="w-4 h-4 text-[#2962FF] shrink-0" />
          <span>100% genuine product sourced</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-[#E5EAF3] text-xs font-bold font-heading">
        <button
          type="button"
          onClick={() => onTabChange('specs')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'specs'
              ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
              : 'text-[#64748B] hover:text-[#172033]'
          }`}
        >
          Specifications & Overview
        </button>
        <button
          type="button"
          onClick={() => onTabChange('reviews')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'reviews'
              ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
              : 'text-[#64748B] hover:text-[#172033]'
          }`}
        >
          Customer Reviews ({product.reviewCount})
        </button>
        <button
          type="button"
          onClick={() => onTabChange('seller')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'seller'
              ? 'text-[#2962FF] border-b-2 border-[#2962FF]'
              : 'text-[#64748B] hover:text-[#172033]'
          }`}
        >
          Seller Information
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-4 text-xs text-[#172033]">
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <p className="leading-relaxed text-[#64748B] font-body">{product.fullDescription}</p>
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2.5 rounded-xl bg-white border border-[#E5EAF3]">
                    <span className="text-[#64748B] font-medium">{key}</span>
                    <span className="font-bold text-[#172033] font-heading">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-2xl border border-[#E5EAF3] flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-[#172033] font-heading">{product.rating} / 5</p>
                <p className="text-xs text-[#64748B] mt-0.5 font-body">Based on {product.reviewCount} verified ratings</p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-[#EEF3FF] text-[#2962FF] font-bold rounded-xl text-xs hover:bg-[#DBEAFE] font-heading"
              >
                Write a Review
              </button>
            </div>
          </div>
        )}

        {activeTab === 'seller' && (
          <div className="p-4 bg-white rounded-2xl border border-[#E5EAF3] space-y-2">
            <p className="font-bold text-sm text-[#172033] font-heading">{product.sellerName}</p>
            <p className="text-xs text-[#64748B] font-body">
              Verified authorized retail merchant on the HAATZA platform with {product.sellerRating} ★ merchant rating.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInformation;
