import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones, Award } from 'lucide-react';
import { WhyShopBenefit } from '../../../types/homepageWidgets.types';
import { mockWhyShopBenefits } from '../../../services/mock/data/homepageWidgets.data';

interface WhyShopWithHaatzaWidgetProps {
  benefits?: WhyShopBenefit[];
  className?: string;
}

export const WhyShopWithHaatzaWidget: React.FC<WhyShopWithHaatzaWidgetProps> = ({
  benefits = mockWhyShopBenefits,
  className = '',
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#2962FF]" />;
      case 'Truck':
        return <Truck className="w-6 h-6 text-[#2962FF]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-[#2962FF]" />;
      case 'Headphones':
        return <Headphones className="w-6 h-6 text-[#2962FF]" />;
      default:
        return <Award className="w-6 h-6 text-[#2962FF]" />;
    }
  };

  return (
    <section
      aria-label="Why Shop with HAATZA"
      className={`w-full py-8 sm:py-10 px-6 sm:px-10 rounded-3xl bg-white border border-[#E5EAF3] shadow-xs ${className}`}
    >
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-[#2962FF] border border-blue-200 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>The HAATZA Standard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
          Why Shop with HAATZA?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Designed from the ground up for Indian shoppers with authentic products and verified care.
        </p>
      </div>

      {/* 4 Benefits Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="group rounded-2xl p-5 sm:p-6 bg-[#F8FAFC] hover:bg-[#EEF3FF]/70 border border-slate-200/80 hover:border-[#DBEAFE] transition-all duration-300 flex flex-col items-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              {getIcon(benefit.iconName)}
            </div>

            {benefit.tag && (
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2962FF] mb-1">
                {benefit.tag}
              </span>
            )}

            <h3 className="text-base font-bold text-[#172033] tracking-tight group-hover:text-[#2962FF] transition-colors">
              {benefit.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
