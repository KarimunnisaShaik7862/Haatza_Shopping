import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Info, X, Sparkles, TrendingDown, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export interface PriceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  unit?: string;
  brand?: string;
  theme?: 'emerald' | 'blue';
}

export const PriceInfoModal: React.FC<PriceInfoModalProps> = ({
  isOpen,
  onClose,
  productName,
  price,
  mrp,
  discountPercentage,
  unit,
  brand = 'HAATZA LITE',
  theme = 'emerald',
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const effectiveMrp = mrp && mrp > price ? mrp : Math.round(price * 1.2);
  const savings = Math.max(0, effectiveMrp - price);
  const discount = discountPercentage !== undefined && discountPercentage > 0
    ? discountPercentage
    : Math.round(((effectiveMrp - price) / effectiveMrp) * 100);

  const isEmerald = theme === 'emerald';

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="price-breakdown-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs select-none animate-in fade-in duration-150"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      {/* Compact, Responsive White & Leaf Green Shaded Modal Card */}
      <div
        className={`relative w-full max-w-[310px] sm:max-w-[325px] rounded-2xl p-3.5 sm:p-4.5 border shadow-[0_20px_50px_-10px_rgba(16,185,129,0.22),0_6px_20px_rgba(0,0,0,0.06)] overflow-hidden max-h-[92dvh] overflow-y-auto transform transition-all animate-in zoom-in-95 duration-150 ${
          isEmerald
            ? 'bg-gradient-to-b from-white via-[#F7FCF8] to-[#EEF9F1] border-emerald-200/90'
            : 'bg-gradient-to-b from-white via-[#F8FAFC] to-[#EFF6FF] border-blue-200/90'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative leaf-green background ambient glow */}
        <div
          className={`pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl ${
            isEmerald ? 'bg-emerald-300/25' : 'bg-blue-300/20'
          }`}
          aria-hidden="true"
        />

        {/* Clean Header: Icon, Title & Responsive Close button */}
        <div className="relative z-10 flex items-center justify-between pb-2 border-b border-emerald-100/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isEmerald ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(41,98,255,0.6)]'
              }`}
            />
            <h3
              id="price-breakdown-title"
              className="text-xs font-black uppercase tracking-wider text-slate-800 font-heading truncate"
            >
              Price Details
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 touch-manipulation"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Responsive Product Summary */}
        <div className="relative z-10 pt-2 pb-2.5 border-b border-emerald-100/70">
          <p className="text-xs font-bold text-slate-800 line-clamp-2 sm:line-clamp-1 leading-snug break-words" title={productName}>
            {productName}
          </p>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-0.5 text-[11px] text-slate-500">
            {brand && <span className="font-semibold text-slate-600">{brand}</span>}
            {unit && (
              <>
                <span className="hidden sm:inline">•</span>
                <span>{unit}</span>
              </>
            )}
          </div>
        </div>

        {/* Essential Financial Breakdown Table (Mobile-Optimized) */}
        <div className="relative z-10 py-2.5 sm:py-3 space-y-2 text-xs">
          {/* MRP */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-slate-500 text-[11px] font-medium">Maximum Retail Price</span>
            <span className="text-slate-400 line-through font-semibold text-[11px] shrink-0">
              {formatCurrency(effectiveMrp)}
            </span>
          </div>

          {/* Discount */}
          {savings > 0 && (
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[11px] font-bold flex items-center gap-1 min-w-0 ${
                isEmerald ? 'text-emerald-700' : 'text-blue-700'
              }`}>
                <TrendingDown className="w-3 h-3 shrink-0" />
                <span className="truncate">Special Discount ({discount}% OFF)</span>
              </span>
              <span className={`text-[11px] font-bold shrink-0 ${
                isEmerald ? 'text-emerald-600' : 'text-blue-600'
              }`}>
                -{formatCurrency(savings)}
              </span>
            </div>
          )}

          {/* Taxes */}
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
              Taxes (GST & Cess)
            </span>
            <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100/60 px-1.5 py-0.5 rounded shrink-0">
              Included
            </span>
          </div>

          {/* Divider & Final Price */}
          <div className="pt-1.5 border-t border-emerald-100/80 flex items-center justify-between gap-2">
            <div>
              <span className="text-xs font-black text-slate-900 uppercase tracking-wide block">
                Final Price
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Inclusive of all taxes
              </span>
            </div>
            <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight shrink-0">
              {formatCurrency(price)}
            </span>
          </div>
        </div>

        {/* Total Savings Pill (Mobile-Optimized) */}
        {savings > 0 && (
          <div className={`relative z-10 p-2 rounded-xl flex items-center justify-between gap-2 text-xs font-bold border mb-2.5 sm:mb-3 ${
            isEmerald
              ? 'bg-emerald-100/70 border-emerald-200/90 text-emerald-900'
              : 'bg-blue-100/70 border-blue-200/90 text-blue-900'
          }`}>
            <span className="flex items-center gap-1 text-[11px] min-w-0">
              <Sparkles className={`w-3 h-3 shrink-0 ${isEmerald ? 'text-emerald-600 fill-emerald-600' : 'text-blue-600 fill-blue-600'}`} />
              <span className="truncate">Total Savings:</span>
            </span>
            <span className={`text-xs font-black shrink-0 ${isEmerald ? 'text-emerald-800' : 'text-blue-800'}`}>
              {formatCurrency(savings)} ({discount}% OFF)
            </span>
          </div>
        )}

        {/* Responsive "Got It" Button */}
        <button
          type="button"
          onClick={onClose}
          className={`relative z-10 w-full py-2.5 sm:py-2 min-h-[38px] rounded-xl font-extrabold text-xs uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:scale-[1.01] active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center ${
            isEmerald
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/20'
          }`}
        >
          Got It
        </button>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export interface PriceInfoButtonProps {
  productName: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  unit?: string;
  brand?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  theme?: 'emerald' | 'blue';
  className?: string;
}

export const PriceInfoButton: React.FC<PriceInfoButtonProps> = ({
  productName,
  price,
  mrp,
  discountPercentage,
  unit,
  brand,
  size = 'sm',
  theme = 'emerald',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const sizeClasses = {
    xs: 'w-3.5 h-3.5 text-[9px]',
    sm: 'w-4 h-4 text-[10px]',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm',
  }[size];

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  const isEmerald = theme === 'emerald';

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title="View price breakdown & tax details"
        aria-label="Price information"
        className={`inline-flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shrink-0 touch-manipulation ${sizeClasses} ${
          isEmerald
            ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-900 border border-emerald-200/90 shadow-2xs'
            : 'bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-900 border border-blue-200/90 shadow-2xs'
        } ${className}`}
      >
        <Info className={`${iconSizes} stroke-[2.5]`} />
      </button>

      <PriceInfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productName={productName}
        price={price}
        mrp={mrp}
        discountPercentage={discountPercentage}
        unit={unit}
        brand={brand}
        theme={theme}
      />
    </>
  );
};
