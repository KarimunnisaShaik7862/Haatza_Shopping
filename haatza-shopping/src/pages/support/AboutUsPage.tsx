import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ShieldCheck, Heart, Truck } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const breadcrumbs = [{ label: 'About HAATZA' }];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2962FF] bg-[#EEF3FF] border border-[#DBEAFE] px-3 py-1 rounded-full">
          The HAATZA Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#172033] tracking-tight leading-tight">
          Redefining Everyday Commerce Across India
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
          Born out of Mumbai, HAATZA unifies three vibrant shopping destinations into one seamless digital experience: everyday general marketplace goods on <strong>HAATZA</strong>, tranquil comfort on <strong>LIGHT</strong>, and ultra-fast 15-minute groceries on <strong>NEXT</strong>.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-[#E5EAF3] shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center shadow-soft-sm">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#172033]">Direct From Indian Artisans & Brands</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            From handblock Chanderi silks in Madhya Pradesh to Ratnagiri Alphonso orchards in Maharashtra, we connect customers directly with certified Indian suppliers.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-[#E5EAF3] shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#172033]">Unified Speed & Reliability</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Whether you need a heavy tri-ply kadhai delivered safely in 2 days or farm fresh milk on your counter in 12 minutes, our logistics network delivers without compromise.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-[#E5EAF3] shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#172033]">Unconditional Trust Shield</h3>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Every product is 100% genuine with verifiable GST invoices, transparent pricing in INR, and a zero-friction 7-day doorstep return policy.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-[#0F2042] via-[#1E40AF] to-[#2962FF] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-soft">
        <div>
          <p className="text-3xl sm:text-4xl font-black text-white">28,000+</p>
          <p className="text-xs text-[#DBEAFE] mt-1 uppercase font-semibold">Indian PIN Codes Served</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-white">50,000+</p>
          <p className="text-xs text-[#DBEAFE] mt-1 uppercase font-semibold">Curated Products</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-white">12 Mins</p>
          <p className="text-xs text-[#DBEAFE] mt-1 uppercase font-semibold">Avg Next Delivery</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-white">99.8%</p>
          <p className="text-xs text-[#DBEAFE] mt-1 uppercase font-semibold">Customer Satisfaction</p>
        </div>
      </div>
    </div>
  );
};
