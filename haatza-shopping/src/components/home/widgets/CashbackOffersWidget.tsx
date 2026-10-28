import React, { useState } from 'react';
import { CreditCard, Copy, Check, ShieldCheck, ArrowRight, Wallet } from 'lucide-react';
import { CashbackBanner, mockCashbackBanners } from '../../../services/mock/data/promotions';

interface CashbackOffersWidgetProps {
  offers?: CashbackBanner[];
  className?: string;
}

export const CashbackOffersWidget: React.FC<CashbackOffersWidgetProps> = ({
  offers = mockCashbackBanners,
  className = '',
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  if (!offers || offers.length === 0) return null;

  return (
    <section
      aria-label="Payment Offers and Cashback"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1">
            <CreditCard className="w-3.5 h-3.5 text-[#2962FF]" />
            <span>Bank & Wallet Privileges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            Cashback & Payment Offers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Save extra at checkout with authorized UPI, credit card, and No-Cost EMI partnerships.
          </p>
        </div>
      </div>

      {/* 4 Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {offers.map((offer) => {
          const isCopied = offer.code && copiedCode === offer.code;

          return (
            <div
              key={offer.id}
              className="relative rounded-2xl p-5 bg-gradient-to-br from-slate-900 to-[#0F172A] text-white border border-slate-800 shadow-md flex flex-col justify-between overflow-hidden group hover:border-slate-700 transition-all duration-300"
            >
              {/* Subtle top accent bar */}
              <div
                className="absolute top-0 inset-x-0 h-1"
                style={{ backgroundColor: offer.accentColor || '#2962FF' }}
              />

              {/* Offer Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/15">
                    {offer.iconType === 'card' && <CreditCard className="w-4 h-4" />}
                    {offer.iconType === 'neopay' && <Wallet className="w-4 h-4 text-amber-400" />}
                    {offer.iconType === 'paytm' && <ShieldCheck className="w-4 h-4 text-sky-400" />}
                    {offer.iconType === 'emi' && <CreditCard className="w-4 h-4 text-purple-400" />}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400">
                    {offer.validity}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                  {offer.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  {offer.subtitle}
                </p>
              </div>

              {/* Coupon Code / CTA Bottom Strip */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                {offer.code ? (
                  <button
                    type="button"
                    onClick={() => handleCopyCode(offer.code!)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>{offer.code}</span>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-sky-400">
                    Auto-applied
                  </span>
                )}

                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors flex items-center gap-1">
                  {offer.ctaText}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
