import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  FileText,
  Package,
  Layers,
  Shirt,
  Ruler,
  Info,
  Check,
} from 'lucide-react';
import { Product } from '../../types';
import { getProductDetailsGroups, DetailGroup } from './productDetailHelper';

interface ProductDetailsProps {
  product: Product;
  defaultExpanded?: boolean;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Keep open by default on initial load, product navigation, and hot reloads
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [product?.id, defaultExpanded]);

  const groups: DetailGroup[] = getProductDetailsGroups(product);

  const getGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'product-info':
        return Layers;
      case 'fabric-fit':
      case 'footwear-material':
      case 'technical-specs':
      case 'beauty-specs':
      case 'home-specs':
        return Shirt;
      case 'size-measurements':
        return Ruler;
      case 'whats-in-the-box':
        return Package;
      case 'additional-info':
        return Info;
      default:
        return FileText;
    }
  };

  return (
    <div className="border-t border-slate-200 pt-5 sm:pt-6">
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between py-1 text-left bg-transparent hover:bg-slate-50/60 rounded-xl transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3FF] text-[#2962FF] border border-[#2962FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#2962FF] group-hover:text-white transition-all duration-200 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#2962FF] transition-colors">
              Product Details
            </h3>
            <p className="text-xs text-slate-600 font-body mt-0.5">
              View complete product specifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 font-heading">
            {isExpanded ? 'Hide Details' : 'Expand Details'}
          </span>
          <div
            className={`w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#EEF3FF] text-slate-600 group-hover:text-[#2962FF] flex items-center justify-center transition-all duration-300 ${
              isExpanded ? 'rotate-180 bg-[#EEF3FF] text-[#2962FF]' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4 transition-transform duration-300" />
          </div>
        </div>
      </button>

      {/* Expandable Content Area */}
      {isExpanded && (
        <div className="pt-3.5 pb-1 space-y-6 animate-in fade-in duration-200">
          {groups.map((group) => {
            const GroupIcon = getGroupIcon(group.id);

            return (
              <div key={group.id} className="space-y-3">
                {/* Group Header */}
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <span className="w-1.5 h-4 bg-[#2962FF] rounded-full inline-block"></span>
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-4 h-4 text-[#2962FF]" />
                    <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black font-heading">
                      {group.title}
                    </h4>
                  </div>
                </div>

                {/* Special Render: What's in the Box */}
                {group.id === 'whats-in-the-box' && group.boxItems && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                    {group.boxItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#2962FF]/40 hover:bg-[#F8FAFF] transition-all shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className="w-6 h-6 rounded-md bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#2962FF]" />
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-black font-heading truncate">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-black bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/90 font-heading shrink-0 shadow-2xs">
                          {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Standard Specification Table Rows */}
                {group.rows && group.rows.length > 0 && (
                  <div className="divide-y divide-slate-100 rounded-xl bg-slate-50/50 border border-slate-100/90 overflow-hidden">
                    {group.rows.map((row, rowIdx) => (
                      <div
                        key={rowIdx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:px-4 hover:bg-[#F8FAFF] transition-colors"
                      >
                        <span className="w-full sm:w-2/5 text-xs sm:text-sm font-semibold text-slate-600 font-heading">
                          {row.label}
                        </span>
                        <span className="w-full sm:w-3/5 text-xs sm:text-sm font-bold text-black font-body break-words mt-1 sm:mt-0">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
