import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { FeaturedCampaign } from '../../../types/homepageWidgets.types';
import { mockFeaturedCampaigns } from '../../../services/mock/data/homepageWidgets.data';

interface FeaturedCampaignBannersWidgetProps {
  campaigns?: FeaturedCampaign[];
  className?: string;
}

export const FeaturedCampaignBannersWidget: React.FC<FeaturedCampaignBannersWidgetProps> = ({
  campaigns = mockFeaturedCampaigns,
  className = '',
}) => {
  if (!campaigns || campaigns.length === 0) return null;

  const heroCampaign = campaigns[0];
  const secondaryCampaigns = campaigns.slice(1, 3);

  return (
    <section
      aria-label="Featured Seasonal Campaigns"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#2962FF]" />
            <span>Curated Seasonal Edits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            Featured Campaigns
          </h2>
        </div>
      </div>

      {/* Asymmetric Editorial Grid: 1 Large Hero + 2 Stacked/Grid Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Large Primary Hero Campaign Banner (7 cols on lg) */}
        {heroCampaign && (
          <div className="lg:col-span-7 relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 border border-slate-800 shadow-lg bg-[#0F172A]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={heroCampaign.image}
                alt={heroCampaign.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 max-w-lg text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-[#2962FF] text-white">
                  {heroCampaign.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide bg-white/20 text-blue-200 backdrop-blur-xs">
                  {heroCampaign.discount}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-heading">
                {heroCampaign.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-blue-100/90 mt-1">
                {heroCampaign.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {heroCampaign.description}
              </p>

              <div className="mt-5">
                <Link
                  to={heroCampaign.ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#172033] hover:bg-[#EEF3FF] hover:text-[#2962FF] font-bold text-sm tracking-wide shadow-md transition-all active:scale-95"
                >
                  <span>{heroCampaign.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Campaigns (5 cols on lg, 2 stacked cards) */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          {secondaryCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="relative group rounded-2xl sm:rounded-3xl overflow-hidden min-h-[200px] sm:min-h-[210px] flex-1 flex flex-col justify-end p-5 sm:p-7 border border-slate-800 shadow-md bg-[#0F172A]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={camp.image}
                  alt={camp.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#2962FF] text-white">
                    {camp.tag}
                  </span>
                  <span className="text-xs font-bold text-blue-300">
                    {camp.discount}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-black tracking-tight text-white font-heading">
                  {camp.title}
                </h4>
                <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
                  {camp.subtitle}
                </p>

                <div className="mt-3">
                  <Link
                    to={camp.ctaLink}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white hover:text-blue-300 transition-colors"
                  >
                    <span>{camp.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
