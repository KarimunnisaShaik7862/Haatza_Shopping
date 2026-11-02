import React from 'react';

/**
 * EmptyWishlistIllustration
 * Compact animated illustration of two miniature smartphones:
 * 1. Phone 1: Product details screen with heart button tap.
 * 2. Heart bounces and fills with #155EEF blue.
 * 3. Dots travel across the curved arc between the phones.
 * 4. Miniature product floats gracefully across.
 * 5. Product pops into Phone 2's Wishlist screen.
 * 6. Smooth reset and loop.
 *
 * Dimensions: 116px × 70px (ultra-compact to fit naturally above the empty state title).
 */
export const EmptyWishlistIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-[116px] h-[70px] mx-auto flex items-center justify-center relative select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 116 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Subtle drop shadow for miniature phones and floating badge */}
          <filter id="phone-shadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0F172A" floodOpacity="0.06" />
          </filter>
          <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#155EEF" floodOpacity="0.25" />
          </filter>

          {/* Gradients */}
          <linearGradient id="phone-border" x1="0" y1="0" x2="34" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#155EEF" />
          </linearGradient>
          <linearGradient id="arc-grad" x1="29" y1="18" x2="87" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="0.5" stopColor="#155EEF" />
            <stop offset="1" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        <style>{`
          .anim-tap {
            animation: tapPulse 3.8s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
            transform-origin: 29px 18px;
          }
          .anim-heart {
            animation: heartClickBounce 3.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            transform-origin: 29px 18px;
          }
          .anim-sparkle {
            animation: sparkleFlash 3.8s ease-out infinite;
            transform-origin: 29px 18px;
          }
          .anim-arc-dots {
            animation: arcTravel 3.8s ease-in-out infinite;
          }
          .anim-flying-product {
            animation: flyingProductMove 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .anim-dest-card {
            animation: destinationCardPop 3.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            transform-origin: 93px 29px;
          }
          .anim-dest-sparkle {
            animation: destSparkle 3.8s ease-out infinite;
            transform-origin: 93px 24px;
          }

          @keyframes tapPulse {
            0%, 6% { opacity: 0; transform: scale(0.3); }
            8% { opacity: 0.85; transform: scale(0.7); }
            16% { opacity: 0; transform: scale(2.2); }
            100% { opacity: 0; transform: scale(2.2); }
          }

          @keyframes heartClickBounce {
            0%, 8% {
              fill: #FFFFFF;
              stroke: #155EEF;
              transform: scale(1);
            }
            12% {
              fill: #155EEF;
              stroke: #155EEF;
              transform: scale(1.45);
            }
            16% {
              fill: #155EEF;
              stroke: #155EEF;
              transform: scale(0.9);
            }
            20% {
              fill: #155EEF;
              stroke: #155EEF;
              transform: scale(1.18);
            }
            24%, 86% {
              fill: #155EEF;
              stroke: #155EEF;
              transform: scale(1);
            }
            92%, 100% {
              fill: #FFFFFF;
              stroke: #155EEF;
              transform: scale(1);
            }
          }

          @keyframes sparkleFlash {
            0%, 10% { opacity: 0; transform: scale(0.2); }
            14% { opacity: 1; transform: scale(1.25); }
            22% { opacity: 0; transform: scale(1.7); }
            100% { opacity: 0; }
          }

          @keyframes arcTravel {
            0%, 18% {
              opacity: 0;
              stroke-dashoffset: 75;
            }
            24% {
              opacity: 0.9;
            }
            48% {
              opacity: 0.9;
              stroke-dashoffset: 0;
            }
            56%, 100% {
              opacity: 0;
              stroke-dashoffset: -75;
            }
          }

          @keyframes flyingProductMove {
            0%, 18% {
              opacity: 0;
              transform: translate(25px, 16px) scale(0.35);
            }
            22% {
              opacity: 1;
              transform: translate(25px, 15px) scale(0.95) rotate(-5deg);
            }
            34% {
              opacity: 1;
              transform: translate(45px, 4px) scale(1.1) rotate(0deg);
            }
            46% {
              opacity: 1;
              transform: translate(66px, 10px) scale(1.0) rotate(5deg);
            }
            54% {
              opacity: 1;
              transform: translate(81px, 20px) scale(0.88) rotate(0deg);
            }
            58% {
              opacity: 0;
              transform: translate(81px, 20px) scale(0.4);
            }
            100% {
              opacity: 0;
              transform: translate(81px, 20px) scale(0.4);
            }
          }

          @keyframes destinationCardPop {
            0%, 52% {
              opacity: 0;
              transform: scale(0.4);
            }
            58% {
              opacity: 1;
              transform: scale(1.15);
            }
            64% {
              opacity: 1;
              transform: scale(0.95);
            }
            70%, 86% {
              opacity: 1;
              transform: scale(1);
            }
            92%, 100% {
              opacity: 0;
              transform: scale(0.8);
            }
          }

          @keyframes destSparkle {
            0%, 56% { opacity: 0; transform: scale(0.2); }
            62% { opacity: 1; transform: scale(1.3); }
            70% { opacity: 0; transform: scale(1.7); }
            100% { opacity: 0; }
          }

          @media (prefers-reduced-motion: reduce) {
            .anim-tap,
            .anim-sparkle,
            .anim-arc-dots,
            .anim-flying-product,
            .anim-dest-sparkle {
              display: none !important;
            }
            .anim-heart {
              animation: none !important;
              fill: #155EEF !important;
            }
            .anim-dest-card {
              animation: none !important;
              opacity: 1 !important;
              transform: scale(1) !important;
            }
          }
        `}</style>

        {/* ------------------------------------------------------------------ */}
        {/* 1. Curved dotted trajectory between the two phones               */}
        {/* ------------------------------------------------------------------ */}
        {/* Static faint guide line */}
        <path
          d="M 29,18 Q 58,5 87,28"
          fill="none"
          stroke="#DBEAFE"
          strokeWidth="1.25"
          strokeDasharray="2.5 2"
          opacity="0.8"
        />

        {/* Animated glowing dots traveling across */}
        <path
          className="anim-arc-dots"
          d="M 29,18 Q 58,5 87,28"
          fill="none"
          stroke="url(#arc-grad)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />

        {/* ------------------------------------------------------------------ */}
        {/* 2. Left Phone: Product Details Screen                              */}
        {/* ------------------------------------------------------------------ */}
        <g filter="url(#phone-shadow)">
          {/* Phone body */}
          <rect
            x="6"
            y="5"
            width="34"
            height="60"
            rx="6.5"
            fill="#FFFFFF"
            stroke="url(#phone-border)"
            strokeWidth="1.5"
          />
          {/* Speaker notch */}
          <rect x="18" y="7" width="10" height="1.75" rx="0.87" fill="#93C5FD" />
          {/* Screen background */}
          <rect x="8.5" y="10.5" width="29" height="52" rx="4" fill="#F8FAFC" />

          {/* Mini header bar */}
          <rect x="11" y="13" width="12" height="1.5" rx="0.75" fill="#CBD5E1" />

          {/* Product Image Box */}
          <rect
            x="10.5"
            y="16.5"
            width="25"
            height="21"
            rx="3"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="0.75"
          />

          {/* Miniature cute product artwork (apparel jacket / shirt) */}
          <path
            d="M 18,21 L 22,21 L 24,22.5 L 27.5,21.5 L 26.5,24 L 25,24 L 25,33 L 16,33 L 16,24 L 14.5,24 L 13.5,21.5 L 17,22.5 Z"
            fill="#2563EB"
            opacity="0.85"
          />
          <path d="M 19,21 Q 20,23.5 21,21" stroke="#FFFFFF" strokeWidth="0.75" fill="none" />

          {/* Heart Container (Circle button on top right of product) */}
          <circle cx="29" cy="18" r="4.25" fill="#FFFFFF" stroke="#DBEAFE" strokeWidth="0.6" />

          {/* Interactive Click Ripple */}
          <circle className="anim-tap" cx="29" cy="18" r="3" stroke="#2563EB" strokeWidth="1" fill="#EFF6FF" />

          {/* Heart Icon (Outline -> Fills with #155EEF and bounces) */}
          <path
            className="anim-heart"
            d="M 29,20 C 29,20 26.8,18.4 26.8,17 C 26.8,16 27.6,15.3 28.3,15.3 C 28.7,15.3 29,15.6 29,15.6 C 29,15.6 29.3,15.3 29.7,15.3 C 30.4,15.3 31.2,16 31.2,17 C 31.2,18.4 29,20 29,20 Z"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Sparkles around heart on click */}
          <g className="anim-sparkle">
            <circle cx="26" cy="14" r="0.75" fill="#60A5FA" />
            <circle cx="32.5" cy="14.5" r="0.85" fill="#2563EB" />
            <circle cx="33" cy="21" r="0.65" fill="#93C5FD" />
          </g>

          {/* Mini title text line */}
          <rect x="11" y="40.5" width="16" height="1.75" rx="0.85" fill="#1E293B" />
          {/* Mini brand text line */}
          <rect x="11" y="44" width="10" height="1.25" rx="0.6" fill="#94A3B8" />
          {/* Mini price tag */}
          <rect x="11" y="47.5" width="9" height="1.75" rx="0.85" fill="#155EEF" />
          {/* Mini Add to Cart button */}
          <rect x="10.5" y="52" width="25" height="4.5" rx="2.25" fill="#155EEF" />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 3. Right Phone: My Wishlist Screen                                */}
        {/* ------------------------------------------------------------------ */}
        <g filter="url(#phone-shadow)">
          {/* Phone body */}
          <rect
            x="76"
            y="5"
            width="34"
            height="60"
            rx="6.5"
            fill="#FFFFFF"
            stroke="url(#phone-border)"
            strokeWidth="1.5"
          />
          {/* Speaker notch */}
          <rect x="88" y="7" width="10" height="1.75" rx="0.87" fill="#93C5FD" />
          {/* Screen background */}
          <rect x="78.5" y="10.5" width="29" height="52" rx="4" fill="#F8FAFC" />

          {/* Wishlist Header in Phone 2 */}
          <path
            d="M 82,14 C 82,14 80.5,12.8 80.5,11.8 C 80.5,11.1 81,10.6 81.5,10.6 C 81.8,10.6 82,10.8 82,10.8 C 82,10.8 82.2,10.6 82.5,10.6 C 83,10.6 83.5,11.1 83.5,11.8 C 83.5,12.8 82,14 82,14 Z"
            fill="#155EEF"
          />
          <rect x="85.5" y="11.5" width="12" height="1.75" rx="0.85" fill="#155EEF" />

          {/* Wishlist Slot 1: Empty dashed placeholder box */}
          <rect
            x="80.5"
            y="17"
            width="25"
            height="21"
            rx="3"
            fill="#EFF6FF"
            stroke="#BFDBFE"
            strokeWidth="0.75"
            strokeDasharray="2 1.5"
            opacity="0.7"
          />

          {/* Wishlist Slot 2: Ghost saved item already existing */}
          <g opacity="0.65">
            <rect
              x="80.5"
              y="41"
              width="25"
              height="16"
              rx="2.5"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.6"
            />
            <rect x="83" y="44" width="8" height="10" rx="1.5" fill="#F1F5F9" />
            <rect x="93" y="45" width="10" height="1.5" rx="0.75" fill="#CBD5E1" />
            <rect x="93" y="48" width="7" height="1.25" rx="0.6" fill="#E2E8F0" />
            <circle cx="102" cy="44.5" r="1.5" fill="#155EEF" opacity="0.6" />
          </g>

          {/* Arrived Product Card inside Wishlist Slot 1 */}
          <g className="anim-dest-card">
            <rect
              x="80.5"
              y="17"
              width="25"
              height="21"
              rx="3"
              fill="#FFFFFF"
              stroke="#155EEF"
              strokeWidth="0.85"
            />
            {/* Arrived mini jacket/product visual */}
            <path
              d="M 86,21 L 90,21 L 92,22.5 L 95.5,21.5 L 94.5,24 L 93,24 L 93,33 L 84,33 L 84,24 L 82.5,24 L 81.5,21.5 L 85,22.5 Z"
              fill="#155EEF"
              opacity="0.9"
            />
            {/* Filled heart badge on arrived item */}
            <circle cx="101.5" cy="19.5" r="2.5" fill="#EFF6FF" />
            <path
              d="M 101.5,21 C 101.5,21 99.8,19.6 99.8,18.5 C 99.8,17.7 100.4,17.2 101,17.2 C 101.3,17.2 101.5,17.4 101.5,17.4 C 101.5,17.4 101.7,17.2 102,17.2 C 102.6,17.2 103.2,17.7 103.2,18.5 C 103.2,19.6 101.5,21 101.5,21 Z"
              fill="#155EEF"
            />
            {/* Tiny mini title */}
            <rect x="83" y="34.5" width="14" height="1.25" rx="0.6" fill="#1E293B" />
          </g>

          {/* Celebratory sparkles when product lands */}
          <g className="anim-dest-sparkle">
            <circle cx="78" cy="18" r="0.9" fill="#2563EB" />
            <circle cx="106" cy="16" r="1" fill="#60A5FA" />
            <circle cx="93" cy="13" r="0.8" fill="#155EEF" />
            <circle cx="107" cy="27" r="0.75" fill="#93C5FD" />
          </g>
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* 4. Flying miniature product traveling from Phone 1 to Phone 2     */}
        {/* ------------------------------------------------------------------ */}
        <g className="anim-flying-product" filter="url(#badge-shadow)">
          <rect
            x="0"
            y="0"
            width="13"
            height="13"
            rx="2.5"
            fill="#FFFFFF"
            stroke="#155EEF"
            strokeWidth="0.85"
          />
          {/* Miniature jacket on traveling badge */}
          <path
            d="M 4,3 L 7,3 L 8,4.2 L 10.5,3.5 L 9.8,5.5 L 8.8,5.5 L 8.8,10.5 L 3.5,10.5 L 3.5,5.5 L 2.5,5.5 L 1.8,3.5 L 4.5,4.2 Z"
            fill="#155EEF"
          />
          {/* Micro active heart indicator */}
          <circle cx="10" cy="3" r="1.75" fill="#EFF6FF" stroke="#155EEF" strokeWidth="0.5" />
          <path
            d="M 10,4.2 C 10,4.2 8.7,3.3 8.7,2.5 C 8.7,1.9 9.1,1.5 9.6,1.5 C 9.8,1.5 10,1.7 10,1.7 C 10,1.7 10.2,1.5 10.4,1.5 C 10.9,1.5 11.3,1.9 11.3,2.5 C 11.3,3.3 10,4.2 10,4.2 Z"
            fill="#155EEF"
          />
        </g>
      </svg>
    </div>
  );
};

export default EmptyWishlistIllustration;
