import React from 'react';
import { Wallet, Smartphone, CreditCard, ShieldCheck, Truck, Sparkles, Copy, Check } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface OfferItem {
  id: string;
  icon: React.ReactNode;
  brand: string;
  title: string;
  badge?: string;
  code?: string;
  details: string;
  accentBg: string;
  accentText: string;
}

const OFFERS: OfferItem[] = [
  {
    id: 'offer-phonepe',
    icon: <Smartphone className="w-4 h-4" />,
    brand: 'PhonePe',
    title: 'Flat ₹25 Cashback',
    details: 'On 1st UPI order above ₹500',
    code: 'PHONEPE25',
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentText: 'text-indigo-600',
  },
  {
    id: 'offer-navi',
    icon: <Wallet className="w-4 h-4" />,
    brand: 'Navi UPI',
    title: 'Up to ₹100 Cashback',
    details: 'Scratch card on checkout > ₹299',
    badge: 'AUTO APPLIED',
    accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentText: 'text-emerald-600',
  },
  {
    id: 'offer-cards',
    icon: <CreditCard className="w-4 h-4" />,
    brand: 'Bank Cards',
    title: 'Extra 10% Instant Off',
    details: 'HDFC & ICICI Cards up to ₹500',
    code: 'BANK10',
    accentBg: 'bg-[#EEF3FF] text-[#2962FF] border-[#DBEAFE]',
    accentText: 'text-[#2962FF]',
  },
  {
    id: 'offer-emi',
    icon: <ShieldCheck className="w-4 h-4" />,
    brand: 'Easy Finance',
    title: 'No-Cost EMI up to 12M',
    details: 'Zero interest on all major banks',
    badge: 'ZERO FEES',
    accentBg: 'bg-purple-50 text-purple-700 border-purple-200',
    accentText: 'text-purple-600',
  },
  {
    id: 'offer-shipping',
    icon: <Truck className="w-4 h-4" />,
    brand: 'HAATZA Direct',
    title: 'Free Express Delivery',
    details: 'On all orders above ₹499',
    badge: 'FAST DISPATCH',
    accentBg: 'bg-amber-50 text-amber-800 border-amber-200',
    accentText: 'text-amber-700',
  },
];

export const OfferStrip: React.FC = () => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleOfferClick = (offer: OfferItem) => {
    if (offer.code) {
      navigator.clipboard?.writeText(offer.code);
      setCopiedId(offer.id);
      showToast(`Coupon "${offer.code}" copied! Paste at checkout.`, 'success');
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      showToast(`${offer.brand} offer: ${offer.details}. Automatically applied at payment.`, 'info');
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#EEF3FF] via-white to-[#F5F7FF] rounded-2xl border border-[#E5EAF3] py-2.5 px-3 sm:px-5 shadow-2xs">
      <div className="flex items-center overflow-x-auto no-scrollbar divide-x divide-zinc-200/80 gap-3 sm:gap-4 scroll-smooth">
        {/* Strip Header Tag */}
        <div className="flex items-center gap-2 shrink-0 pr-3 sm:pr-4">
          <div className="w-7 h-7 rounded-lg bg-[#2962FF] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="leading-tight">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#2962FF] block">
              Verified Offers
            </span>
            <span className="text-xs font-extrabold text-zinc-900">
              Save More
            </span>
          </div>
        </div>

        {/* Offer Items */}
        {OFFERS.map((offer) => {
          const isCopied = copiedId === offer.id;

          return (
            <div
              key={offer.id}
              onClick={() => handleOfferClick(offer)}
              className="flex items-center gap-3 shrink-0 pl-3 sm:pl-4 cursor-pointer group hover:bg-white/80 py-1 px-2 rounded-xl transition-all"
              role="button"
              tabIndex={0}
              aria-label={`${offer.brand}: ${offer.title}`}
            >
              {/* Brand Icon */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-2xs ${offer.accentBg} group-hover:scale-105 transition-transform`}
              >
                {offer.icon}
              </div>

              {/* Offer Text */}
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-900 group-hover:text-[#2962FF] transition-colors">
                    {offer.title}
                  </span>
                  {offer.badge && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm bg-zinc-100 text-zinc-600">
                      {offer.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500 font-medium truncate max-w-[150px] sm:max-w-none">
                    {offer.details}
                  </span>
                  {offer.code && (
                    <span
                      className={`font-mono text-[10px] font-black px-1.5 py-0.2 rounded-md border flex items-center gap-0.5 transition-colors ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-zinc-100 border-zinc-200 text-[#2962FF] group-hover:bg-[#EEF3FF]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-2.5 h-2.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <span>{offer.code}</span>
                          <Copy className="w-2.5 h-2.5 opacity-60" />
                        </>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
