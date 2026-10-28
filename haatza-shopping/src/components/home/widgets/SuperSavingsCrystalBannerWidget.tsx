import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import glossyBannerImg from '../../../assets/images/banners/glossy-blue-super-savings-banner.png';

export interface PromotionalOffer {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const mockPromotionalOffers: PromotionalOffer[] = [
  {
    id: 'promo-upi-flat20',
    title: 'UPI — Flat ₹20 Off',
    description: 'On orders above ₹499 via Google Pay, PhonePe, Paytm & BHIM',
    icon: (
      <div className="flex items-center gap-1">
        {/* Sleek dual cards SVG with official UPI / Card accents */}
        <svg
          className="w-10 h-6 sm:w-12 sm:h-7.5 md:w-14 md:h-8.5 drop-shadow-2xs"
          viewBox="0 0 44 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back card */}
          <rect x="1" y="1" width="30" height="20" rx="3.5" fill="#0C2340" />
          <rect x="4" y="5" width="8" height="3" rx="1" fill="#FBBF24" />
          <path d="M18 13L24 8L22 17L18 13Z" fill="#ED752F" />
          <path d="M16 13L10 18L12 9L16 13Z" fill="#097939" />
          {/* Front card */}
          <rect x="12" y="6" width="30" height="20" rx="3.5" fill="#2563EB" />
          <rect x="15" y="10" width="8" height="3" rx="1" fill="#FBBF24" />
          <circle cx="32" cy="18" r="3.2" fill="#EF4444" />
          <circle cx="36" cy="18" r="3.2" fill="#F59E0B" fillOpacity="0.85" />
        </svg>
      </div>
    ),
  },
  {
    id: 'promo-cashback-cards',
    title: 'Get 7.5% Cashback *',
    description: 'With Flipkart Axis Bank, ICICI & SBI Credit Cards',
    icon: (
      <div className="flex items-center gap-1">
        {/* Bank Cards Graphic matching reference image */}
        <svg
          className="w-10 h-6 sm:w-12 sm:h-7.5 md:w-14 md:h-8.5 drop-shadow-2xs"
          viewBox="0 0 44 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="2" width="28" height="19" rx="3" fill="#831843" />
          <path d="M4 6H12V9H4V6Z" fill="#FCD34D" />
          <rect x="13" y="6" width="28" height="19" rx="3" fill="#0284C7" />
          <path d="M16 10H24V13H16V10Z" fill="#FCD34D" />
          <path d="M33 19C33 17.3431 34.3431 16 36 16C37.6569 16 39 17.3431 39 19Z" fill="#FBBF24" />
        </svg>
      </div>
    ),
  },
  {
    id: 'promo-vip-special',
    title: 'VIP Special — Extra 5% Off',
    description: 'Exclusive member privilege on fashion, beauty & home essentials',
    icon: (
      <div className="flex items-center justify-center w-8 h-7 sm:w-9 sm:h-8 md:w-10 md:h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-2xs">
        {/* Crown VIP Icon */}
        <svg
          className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 19h20v2H2v-2zm1.5-12.5L8 12l4-8 4 8 4.5-5.5L22 17H2l1.5-10.5z" />
        </svg>
      </div>
    ),
  },
  {
    id: 'promo-gpay-upi',
    title: 'Flat ₹50 Instant Cashback with GPay',
    description: 'Assured cashback directly credited to bank account on orders above ₹499',
    icon: (
      <div className="flex items-center">
        {/* Clean Google Pay G Logo */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      </div>
    ),
  },
  {
    id: 'promo-paytm-savings',
    title: 'Paytm UPI — Flat 20% Savings',
    description: 'Instant price reduction up to ₹75 on checkout with Paytm UPI',
    icon: (
      <div className="flex items-center justify-center w-8 h-6 sm:w-9 sm:h-7 md:w-11 md:h-8 rounded-md bg-[#002E6E] text-white font-black text-[10px] sm:text-xs md:text-sm tracking-tighter px-1.5">
        <span className="text-[#00BAF2]">pay</span>
        <span className="text-white">tm</span>
      </div>
    ),
  },
];

interface SuperSavingsCrystalBannerWidgetProps {
  offers?: PromotionalOffer[];
  className?: string;
}

export const SuperSavingsCrystalBannerWidget: React.FC<SuperSavingsCrystalBannerWidgetProps> = ({
  offers = mockPromotionalOffers,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotating promotional offer: switches every 3.8s smoothly
  useEffect(() => {
    if (isPaused || offers.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, offers.length]);

  const activeOffer = offers[currentIndex] || offers[0];

  return (
    <div
      aria-label="Super Savings Promotional Banner with Auto-Rotating Offers"
      className={`relative w-full overflow-hidden bg-white ${className}`}
    >
      {/* =========================================================================
          01. PROPORTIONATE HORIZONTAL BANNER (BALANCED HEIGHT AT TOP & BOTTOM)
          ========================================================================= */}
      <div className="relative w-full aspect-[1600/415] sm:aspect-[1600/395] min-h-[180px] sm:min-h-[205px] md:min-h-[225px] lg:min-h-[245px] overflow-hidden bg-gradient-to-b from-white via-sky-50 to-[#0270e0]">
        <img
          src={glossyBannerImg || '/images/banners/glossy-blue-super-savings-banner.png'}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              '/images/banners/glossy-blue-super-savings-banner.png';
          }}
          alt="Glossy Blue Super Savings — Big Savings All Day"
          className="w-full h-full object-cover object-[center_10%] select-none pointer-events-none"
          loading="eager"
        />

        {/* Interactive Clickable Bottom Area (Navigates to Deals) */}
        <Link
          to="/category/deals"
          aria-label="Explore Super Savings Deals"
          className="absolute bottom-0 inset-x-0 h-1/2 z-10 cursor-pointer"
        />

        {/* =========================================================================
            02. BORDERLESS AUTO-ROTATING PROMOTIONAL OFFER STRIP
            Positioned in the upper white space above the 3D text
            ========================================================================= */}
        <div className="absolute top-2.5 sm:top-3.5 md:top-4.5 lg:top-5 inset-x-4 sm:inset-x-8 z-20 flex justify-center items-center pointer-events-auto">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex items-center justify-center cursor-pointer select-none"
          >
            {/* Synchronized Animated Group: Logo + Divider + Large Title + Description */}
            <div
              key={activeOffer.id}
              className="flex items-center gap-3 sm:gap-4 md:gap-5 animate-offer-vertical transition-all"
            >
              {/* Brand Logo / Transparent Icon */}
              <div className="shrink-0 flex items-center">
                {activeOffer.icon}
              </div>

              {/* Prominent Vertical Divider Line matching reference */}
              <div className="h-8 sm:h-9 md:h-11 w-[2px] bg-slate-400/80 shrink-0" />

              {/* Large, Prominent Title & Description */}
              <div className="flex flex-col justify-center text-left">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#172033] tracking-tight leading-tight drop-shadow-2xs">
                  {activeOffer.title}
                </span>
                <span className="text-xs sm:text-sm md:text-base text-slate-700 font-semibold leading-normal mt-0.5 sm:mt-1 truncate max-w-xs sm:max-w-lg md:max-w-2xl">
                  {activeOffer.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
