import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Palette,
  Scissors,
  Layers,
  Sliders,
  Shirt,
  Calendar,
  Ruler,
  Award,
  ShieldCheck,
  Zap,
  Cpu,
  Droplets,
  Globe,
  Package,
} from 'lucide-react';
import { Product } from '../../types';
import { getProductHighlights } from './productDetailHelper';

interface ProductHighlightsProps {
  product: Product;
  defaultExpanded?: boolean;
}

export const ProductHighlights: React.FC<ProductHighlightsProps> = ({
  product,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Keep open by default on initial load, product navigation, and hot reloads
  useEffect(() => {
    setIsExpanded(defaultExpanded);
  }, [product?.id, defaultExpanded]);

  const highlights = getProductHighlights(product);

  const getHighlightIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('colour') || l.includes('color')) return Palette;
    if (l.includes('fabric') || l.includes('material')) return Scissors;
    if (l.includes('pattern') || l.includes('weave')) return Layers;
    if (l.includes('fit')) return Sliders;
    if (l.includes('sleeve')) return Shirt;
    if (l.includes('neck') || l.includes('collar')) return Sparkles;
    if (l.includes('occasion')) return Calendar;
    if (l.includes('size')) return Ruler;
    if (l.includes('brand')) return Award;
    if (l.includes('warranty')) return ShieldCheck;
    if (l.includes('battery') || l.includes('power')) return Zap;
    if (l.includes('connect') || l.includes('driver') || l.includes('processor')) return Cpu;
    if (l.includes('care') || l.includes('wash')) return Droplets;
    if (l.includes('origin') || l.includes('country')) return Globe;
    if (l.includes('toe') || l.includes('closure') || l.includes('sole') || l.includes('insole')) return Package;
    return Sparkles;
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
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#2962FF] transition-colors">
                Product Highlights
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-heading border border-emerald-100/60 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Specs
              </span>
            </div>
            <p className="text-xs text-slate-600 font-body mt-0.5">
              Key characteristics & attributes at a glance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 font-heading">
            {isExpanded ? 'Hide Highlights' : 'View Highlights'}
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

      {/* Expandable Content Area (closed by default) */}
      {isExpanded && (
        <div className="pt-3.5 pb-1 space-y-4 animate-in fade-in duration-200">
          {/* Product Description */}
          {(product.fullDescription || product.description) && (
            <div className="border-l-2 border-[#2962FF] bg-gradient-to-r from-blue-50/40 via-blue-50/10 to-transparent pl-3.5 pr-3 py-2.5 rounded-r-xl">
              <p className="text-xs sm:text-sm text-black leading-relaxed font-body">
                {product.fullDescription || product.description}
              </p>
            </div>
          )}

          {/* Highlights Grid (4–8 items) */}
          {highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((item, idx) => {
                const IconComponent = getHighlightIcon(item.label);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-200/80 bg-white hover:border-[#2962FF]/40 hover:bg-[#F8FAFF] transition-all duration-200 group shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2962FF] group-hover:text-white transition-all duration-200 shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 font-heading">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-black font-heading mt-0.5 break-words leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductHighlights;
export { ProductDetails } from './ProductDetails';
