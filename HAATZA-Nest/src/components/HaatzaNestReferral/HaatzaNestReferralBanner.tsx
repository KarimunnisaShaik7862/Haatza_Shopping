import React, { useState } from 'react';
import joinEarnBannerImageWide from '../../assets/haatza_nest_join_earn_banner_wide.png';
import { HaatzaNestReferralDrawer } from './HaatzaNestReferralDrawer';

export interface HaatzaNestReferralBannerProps {
  headline?: string;
  rewardAmount?: string;
  supportingText?: string;
  buttonText?: string;
  referralCode?: string;
  className?: string;
  onReferClick?: () => void;

  // Legacy props preserved for backwards compatibility
  banner1Headline?: string;
  banner1Amount?: string;
  banner1SupportingText?: string;
  banner1ButtonText?: string;
  banner1Code?: string;
  banner2Headline?: string;
  banner2SecondLine?: string;
  banner2Amount?: string;
  banner2SupportingText?: string;
  banner2ButtonText?: string;
  banner2Code?: string;
  secondLine?: string;
}

export const HaatzaNestReferralBanner: React.FC<HaatzaNestReferralBannerProps> = ({
  referralCode = '1CTCSS30',
  className = '',
  onReferClick,
  banner1Code,
}) => {
  const finalCode = referralCode || banner1Code || '1CTCSS30';
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAction = () => {
    setIsDrawerOpen(true);
    if (onReferClick) {
      onReferClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAction();
    }
  };

  return (
    <section 
      id="referral-banner" 
      aria-label="Referral Rewards - Join & Earn ₹100"
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 scroll-mt-28 ${className}`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleAction}
        onKeyDown={handleKeyDown}
        aria-label="Join & Earn ₹100 banner - Click to open referral popup"
        className="w-full rounded-2xl sm:rounded-[22px] border border-[#E4D7F5] p-0 flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(112,39,201,0.08)] hover:shadow-[0_10px_28px_-4px_rgba(112,39,201,0.14)] transition-all duration-300 cursor-pointer group relative overflow-hidden select-none bg-gradient-to-r from-[#FAF8FD] via-white to-[#F5EEFB] aspect-[1024/364] focus:outline-hidden focus:ring-2 focus:ring-[#7027C9] focus:ring-offset-2"
        style={{ aspectRatio: '1024 / 364' }}
      >
        <div className="w-full h-full relative overflow-hidden rounded-2xl sm:rounded-[22px] flex items-center justify-center">
          <img
            src={joinEarnBannerImageWide}
            alt="Join & Earn ₹100 - Share the joy with everyone! Refer and Gift"
            loading="eager"
            decoding="async"
            width={2048}
            height={728}
            className="w-full h-full object-cover object-center select-none transition-transform duration-300 group-hover:scale-[1.008]"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </div>
      </div>

      {/* Side Popup Drawer Matching Reference Design in Purple & Yellow Theme */}
      <HaatzaNestReferralDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        referralCode={finalCode}
      />
    </section>
  );
};

export default HaatzaNestReferralBanner;

