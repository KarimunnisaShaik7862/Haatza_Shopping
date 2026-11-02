import React from 'react';
import { Wallet, ShieldCheck } from 'lucide-react';

const PackageReturnIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16.5 9.4 7.55 4.24a2 2 0 0 0-1.95 0l-2.1 1.2A2 2 0 0 0 2.5 7.18v9.64a2 2 0 0 0 1 1.74l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.74V13" />
    <path d="m2.8 7.3 8.7 5 8.7-5" />
    <path d="M11.5 21.7v-9.4" />
    <path d="M21.5 6.5h-5.5a2 2 0 0 0-2 2v2" />
    <polyline points="18.5 3.5 21.5 6.5 18.5 9.5" />
  </svg>
);

export const ProductBenefits: React.FC = () => {
  const benefits = [
    {
      id: 'ben-1',
      icon: PackageReturnIcon,
      title: '10-Day Return',
      desc: 'Easy returns within 10 days',
    },
    {
      id: 'ben-2',
      icon: Wallet,
      title: 'Cash on Delivery',
      desc: 'Pay when your order arrives',
    },
    {
      id: 'ben-3',
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: 'Safe and secure checkout',
    },
  ];

  return (
    <div className="border-t border-slate-200 pt-5 sm:pt-6">
      <div className="grid grid-cols-3 divide-x divide-slate-100/90 py-1">
        {benefits.map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.id}
              className="flex flex-col items-center text-center px-1.5 sm:px-3 group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] text-[#2962FF] flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 group-hover:bg-[#2962FF] group-hover:text-white transition-all duration-200">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#111827] font-heading leading-tight">
                {b.title}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#4B5563] font-body mt-0.5 leading-snug">
                {b.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductBenefits;
