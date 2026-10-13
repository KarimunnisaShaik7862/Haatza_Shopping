import React from 'react';
import { CreditCard, Wallet, Smartphone, ShieldCheck, ArrowRight, Copy } from 'lucide-react';
import { CashbackBanner } from '../../services/mock/data/promotions';
import { useToast } from '../../context/ToastContext';

interface CashbackBannersProps {
  banners: CashbackBanner[];
}

export const CashbackBannersSection: React.FC<CashbackBannersProps> = ({ banners }) => {
  const { showToast } = useToast();

  const handleCopyCode = (code?: string) => {
    if (!code) {
      showToast('Offer terms: Automatically applied at checkout on eligible payment methods.', 'info');
      return;
    }
    navigator.clipboard?.writeText(code);
    showToast(`Code "${code}" copied to clipboard! Apply during checkout.`, 'success');
  };

  const getIcon = (type: CashbackBanner['iconType']) => {
    switch (type) {
      case 'neopay':
        return <Wallet className="w-5 h-5" />;
      case 'paytm':
        return <Smartphone className="w-5 h-5" />;
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'emi':
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-zinc-950 flex items-center gap-2">
            <span>Payment Offers & Cashback Rewards</span>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Partner Benefits
            </span>
          </h3>
          <p className="text-xs text-zinc-500">
            Save extra with verified bank credit cards, UPI cashback, and no-cost EMI partners.
          </p>
        </div>
      </div>

      {/* Horizontally arranged promotional payment cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {banners.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-2xl p-4 bg-gradient-to-br ${item.bgGradient} text-white shadow-xs border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
          >
            {/* Background ambient glow circle */}
            <div
              className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none"
              style={{ backgroundColor: item.accentColor }}
            />

            <div>
              {/* Top icon and tag */}
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-md shadow-xs"
                  style={{ color: item.accentColor }}
                >
                  {getIcon(item.iconType)}
                </div>
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-md">
                  {item.validity}
                </span>
              </div>

              {/* Title & subtitle */}
              <h4 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-300 mt-1 line-clamp-2 leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              {item.code ? (
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-black bg-black/40 px-2 py-0.5 rounded-md border border-white/10 text-amber-300">
                  <span>{item.code}</span>
                  <Copy className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100" />
                </div>
              ) : (
                <span className="text-[11px] text-zinc-400 font-medium">Auto Applied</span>
              )}

              <button
                type="button"
                onClick={() => handleCopyCode(item.code)}
                className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-amber-300 transition-colors"
              >
                <span>{item.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
