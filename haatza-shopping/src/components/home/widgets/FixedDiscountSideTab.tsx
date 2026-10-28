import React, { useState, useEffect } from 'react';
import {
  Tag,
  X,
  Copy,
  Check,
  Percent,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface DiscountCoupon {
  code: string;
  discount: string;
  title: string;
  description: string;
  minSpend: string;
  validity: string;
  tag: string;
}

const mockDiscountCoupons: DiscountCoupon[] = [
  {
    code: 'HAATZA500',
    discount: 'FLAT ₹500 OFF',
    title: 'Festive Grand Discount',
    description: 'Flat ₹500 off on fashion, electronics, beauty & home essentials.',
    minSpend: 'Min. order ₹2,499',
    validity: 'Valid till 31st Oct',
    tag: 'BEST VALUE',
  },
  {
    code: 'UPI20',
    discount: 'FLAT ₹20 OFF',
    title: 'Instant UPI Checkout Savings',
    description: 'Instant ₹20 price reduction via Google Pay, PhonePe, Paytm or BHIM.',
    minSpend: 'Min. order ₹499',
    validity: 'Auto-applied or apply code',
    tag: 'UPI SPECIAL',
  },
  {
    code: 'VIP5',
    discount: 'EXTRA 5% OFF',
    title: 'HAATZA Club VIP Privilege',
    description: 'Extra 5% instant discount for verified members across all collections.',
    minSpend: 'Min. order ₹999',
    validity: 'Exclusive for members',
    tag: 'VIP ONLY',
  },
  {
    code: 'BANK75',
    discount: '7.5% CASHBACK',
    title: 'Bank Credit Card Partnership',
    description: 'Instant cashback with Axis Bank, ICICI & SBI Credit Cards & EMI.',
    minSpend: 'Min. order ₹1,499',
    validity: 'Every Weekend',
    tag: 'BANK OFFER',
  },
];

export const FixedDiscountSideTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopy = (code: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <>
      {/* =========================================================================
          01. FIXED VERTICAL DISCOUNT TAB ON RIGHT VIEWPORT EDGE (Matching Reference)
          ========================================================================= */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Promotional Discounts panel"
        aria-expanded={isOpen}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#1E293B] hover:bg-[#0F172A] text-white py-3.5 px-2 rounded-l-md shadow-xl border-l-2 border-y border-slate-700/80 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-300 hover:pr-3 group select-none focus:outline-hidden focus:ring-2 focus:ring-[#2962FF]"
      >
        {/* Leftward-pointing triangle arrow */}
        <span className="w-0 h-0 border-y-4 border-y-transparent border-r-6 border-r-white group-hover:-translate-x-0.5 transition-transform" />

        {/* Vertical Text */}
        <span
          className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase text-white whitespace-nowrap"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          UPTO ₹500 OFF
        </span>
      </button>

      {/* =========================================================================
          02. SLIDE-OUT COUPONS & DISCOUNTS DRAWER
          ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Available Promotional Discounts"
        className={`fixed top-0 right-0 bottom-0 w-[90vw] max-w-sm sm:max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2962FF] text-white flex items-center justify-center shadow-xs">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#172033] tracking-tight font-heading">
                Promotional Offers
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Apply codes at checkout for instant savings
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close discounts panel"
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {mockDiscountCoupons.map((coupon) => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className="relative rounded-xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-slate-50/60 p-3.5 sm:p-4 hover:border-[#2962FF] transition-colors"
              >
                {/* Coupon Tag */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-blue-100/80 text-[#2962FF]">
                    {coupon.tag}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {coupon.discount}
                  </span>
                </div>

                {/* Title & Description */}
                <h4 className="text-sm font-bold text-[#172033] tracking-tight">
                  {coupon.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {coupon.description}
                </p>

                {/* Bottom Strip: Code & Copy */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <span>{coupon.minSpend}</span>
                    <span>•</span>
                    <span>{coupon.validity}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopy(coupon.code)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#2962FF] text-[#172033] hover:text-[#2962FF] text-xs font-mono font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    <span>{coupon.code}</span>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2962FF] shrink-0 mt-0.5" />
            <p>
              Coupons are verified and auto-checked during checkout for maximum eligible savings.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
};
