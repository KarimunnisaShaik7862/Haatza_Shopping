import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6 text-[#2962FF]" />,
      title: 'Free & Fast Delivery',
      description: 'Free shipping on orders above ₹499 across 28,000+ Indian pincodes.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#2962FF]" />,
      title: '100% Genuine Brands',
      description: 'Direct manufacturer partnerships with verified warranty cards.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#2962FF]" />,
      title: '7 Days Easy Returns',
      description: 'Doorstep pickup with instant refunds to your original source account.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#2962FF]" />,
      title: '24/7 Dedicated Care',
      description: 'Call, chat, or WhatsApp our customer happiness team anytime.',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 bg-white rounded-3xl border border-[#E5EAF3] shadow-soft-sm">
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center shrink-0 shadow-2xs">
              {b.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172033]">{b.title}</h3>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
