import React from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ShieldCheck, Heart, Truck } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const breadcrumbs = [{ label: 'About HAATZA' }];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E53935] bg-[#FFEBEE] px-3 py-1 rounded-full">
          The HAATZA Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#202124] tracking-tight leading-tight">
          Redefining Everyday Commerce Across India
        </h1>
        <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
          Born out of Mumbai, HAATZA unifies three vibrant shopping destinations into one seamless digital experience: everyday general marketplace goods on <strong>HAATZA</strong>, tranquil comfort on <strong>LIGHT</strong>, and ultra-fast 15-minute groceries on <strong>NEXT</strong>.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFEBEE] text-[#E53935] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-zinc-900">Direct From Indian Artisans & Brands</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            From handblock Chanderi silks in Madhya Pradesh to Ratnagiri Alphonso orchards in Maharashtra, we connect customers directly with certified Indian suppliers.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-zinc-900">Unified Speed & Reliability</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Whether you need a heavy tri-ply kadhai delivered safely in 2 days or farm fresh milk on your counter in 12 minutes, our logistics network delivers without compromise.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-zinc-200 shadow-2xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-zinc-900">Unconditional Trust Shield</h3>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Every product is 100% genuine with verifiable GST invoices, transparent pricing in INR, and a zero-friction 7-day doorstep return policy.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#202124] text-white rounded-3xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-3xl sm:text-4xl font-black text-rose-400">28,000+</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold">Indian PIN Codes Served</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-rose-400">50,000+</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold">Curated Products</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-rose-400">12 Mins</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold">Avg Next Delivery</p>
        </div>
        <div>
          <p className="text-3xl sm:text-4xl font-black text-rose-400">99.8%</p>
          <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold">Customer Satisfaction</p>
        </div>
      </div>
    </div>
  );
};
