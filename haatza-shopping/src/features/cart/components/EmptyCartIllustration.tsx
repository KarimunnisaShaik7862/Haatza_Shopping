import React from 'react';

/**
 * EmptyCartIllustration
 * Blue-themed Mart Basket with Face Expression Animation:
 * 1. Royal Blue theme (#2962FF / #155EEF).
 * 2. Basket has the iconic Flipkart-style trolley structure (slanted handle, wheels, curved trapezoid).
 * 3. Face Expression:
 *    - Before item drops: Neutral face (2 vertical eyes + 1 straight mouth).
 *    - Product falls from upside into the basket with gravity & acceleration!
 *    - On landing (impact): The mouth smoothly turns into a broad, joyful SMILE!
 *    - Cheeks light up with cute rosy blush, eyes twinkle with happy arcs, and sparkles burst!
 * 4. Repeating seamless loop.
 */
export const EmptyCartIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`w-[180px] h-[125px] mx-auto flex items-center justify-center relative select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Blue soft glow & shadow */}
          <filter id="cart-blue-shadow" x="-15%" y="-15%" width="130%" height="135%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2962FF" floodOpacity="0.12" />
          </filter>
          <filter id="pkg-shadow-3d" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.15" />
          </filter>
        </defs>

        <style>{`
          /* Trolley Bounce & squash on landing */
          .anim-blue-trolley {
            animation: trolleyImpactAndSmile 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            transform-origin: 110px 105px;
          }

          /* Falling yellow parcel */
          .anim-falling-box {
            animation: dropBoxFromUpside 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: center;
          }

          /* Falling secondary blue gift / mart item */
          .anim-falling-item2 {
            animation: dropItem2FromUpside 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: center;
          }

          /* Mouth: Transitions from neutral slot into a wide happy SMILE */
          .anim-mouth-neutral {
            animation: neutralMouthFade 4.5s ease-in-out infinite;
            transform-origin: 110px 86px;
          }
          .anim-mouth-smile {
            animation: smilingMouthBloom 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            transform-origin: 110px 85px;
          }

          /* Eyes: Transition from normal pills to happy squinting/twinkling arcs */
          .anim-eyes-normal {
            animation: eyesNormalFade 4.5s ease-in-out infinite;
          }
          .anim-eyes-smile {
            animation: eyesHappyBloom 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
            transform-origin: 110px 72px;
          }

          /* Rosy Cheek Blush */
          .anim-cheeks {
            animation: blushFade 4.5s ease-in-out infinite;
          }

          /* Sparkles */
          .anim-sparkles-burst {
            animation: sparkleBlast 4.5s ease-out infinite;
            transform-origin: 110px 45px;
          }

          /* Red motion accent line above parcel */
          .anim-red-tick {
            animation: redTickDrop 4.5s ease-out infinite;
          }

          /* ---------------- Keyframes ---------------- */
          
          /* 1. Yellow parcel drops down from upside */
          @keyframes dropBoxFromUpside {
            0% {
              opacity: 0;
              transform: translate(110px, -28px) scale(0.6) rotate(-8deg);
            }
            4% {
              opacity: 1;
            }
            16% {
              transform: translate(110px, 44px) scale(1.1, 0.9) rotate(2deg);
            }
            19% {
              transform: translate(110px, 40px) scale(0.96, 1.04) rotate(-1deg);
            }
            23%, 82% {
              opacity: 1;
              transform: translate(110px, 43px) scale(1) rotate(0deg);
            }
            90%, 100% {
              opacity: 0;
              transform: translate(110px, 43px) scale(0.7);
            }
          }

          /* 2. Secondary royal blue package drops next */
          @keyframes dropItem2FromUpside {
            0%, 20% {
              opacity: 0;
              transform: translate(92px, -28px) scale(0.55) rotate(14deg);
            }
            24% {
              opacity: 1;
            }
            34% {
              transform: translate(92px, 48px) scale(1.08, 0.92) rotate(-6deg);
            }
            37% {
              transform: translate(92px, 45px) scale(0.97, 1.03) rotate(-3deg);
            }
            41%, 82% {
              opacity: 1;
              transform: translate(92px, 47px) scale(1) rotate(-4deg);
            }
            90%, 100% {
              opacity: 0;
              transform: translate(92px, 47px) scale(0.7);
            }
          }

          /* 3. Red speed tick above yellow parcel */
          @keyframes redTickDrop {
            0%, 10% { opacity: 0; transform: translateY(-8px); }
            15% { opacity: 1; transform: translateY(0); }
            22%, 82% { opacity: 0.9; transform: translateY(0); }
            90%, 100% { opacity: 0; }
          }

          /* 4. Trolley bounce on landing */
          @keyframes trolleyImpactAndSmile {
            0%, 14% {
              transform: translateY(0) scale(1);
            }
            /* First drop landing */
            16% {
              transform: translateY(3.5px) scale(1.03, 0.95);
            }
            19% {
              transform: translateY(-2px) scale(0.98, 1.02);
            }
            23%, 32% {
              transform: translateY(0) scale(1);
            }
            /* Second drop landing */
            34% {
              transform: translateY(2.5px) scale(1.02, 0.97);
            }
            37% {
              transform: translateY(-1px) scale(0.99, 1.01);
            }
            41%, 68% {
              transform: translateY(0) scale(1);
            }
            /* Joyful celebration wiggle while smiling */
            70% {
              transform: translateX(2px) rotate(1.2deg);
            }
            73% {
              transform: translateX(-2px) rotate(-1.2deg);
            }
            76%, 100% {
              transform: translateX(0) rotate(0deg);
            }
          }

          /* 5. MOUTH: Neutral to SMILE transformation */
          /* Neutral mouth visible initially, then disappears on impact */
          @keyframes neutralMouthFade {
            0%, 14% {
              opacity: 1;
              transform: scaleY(1);
            }
            18%, 86% {
              opacity: 0;
              transform: scaleY(0.2);
            }
            92%, 100% {
              opacity: 1;
              transform: scaleY(1);
            }
          }

          /* Happy SMILE blooms right as the product hits the basket! */
          @keyframes smilingMouthBloom {
            0%, 15% {
              opacity: 0;
              transform: scale(0.3);
            }
            19% {
              opacity: 1;
              transform: scale(1.2);
            }
            24%, 84% {
              opacity: 1;
              transform: scale(1);
            }
            90%, 100% {
              opacity: 0;
              transform: scale(0.5);
            }
          }

          /* 6. EYES: Normal pills fade out, Happy smiling eyes fade in */
          @keyframes eyesNormalFade {
            0%, 14% {
              opacity: 1;
            }
            18%, 86% {
              opacity: 0;
            }
            92%, 100% {
              opacity: 1;
            }
          }

          @keyframes eyesHappyBloom {
            0%, 15% {
              opacity: 0;
              transform: scale(0.4);
            }
            19% {
              opacity: 1;
              transform: scale(1.15);
            }
            24%, 84% {
              opacity: 1;
              transform: scale(1);
            }
            90%, 100% {
              opacity: 0;
              transform: scale(0.5);
            }
          }

          /* 7. Rosy Cheeks Blush */
          @keyframes blushFade {
            0%, 16% {
              opacity: 0;
              transform: scale(0.3);
            }
            22%, 84% {
              opacity: 0.85;
              transform: scale(1);
            }
            90%, 100% {
              opacity: 0;
              transform: scale(0.3);
            }
          }

          /* 8. Sparkles Burst */
          @keyframes sparkleBlast {
            0%, 16% { opacity: 0; transform: scale(0.2); }
            20% { opacity: 1; transform: scale(1.3); }
            28% { opacity: 0; transform: scale(1.8); }
            100% { opacity: 0; }
          }

          @media (prefers-reduced-motion: reduce) {
            .anim-blue-trolley,
            .anim-falling-box,
            .anim-falling-item2,
            .anim-mouth-neutral,
            .anim-mouth-smile,
            .anim-eyes-normal,
            .anim-eyes-smile,
            .anim-cheeks,
            .anim-sparkles-burst,
            .anim-red-tick {
              animation: none !important;
            }
            .anim-falling-box {
              transform: translate(110px, 43px) scale(1) !important;
              opacity: 1 !important;
            }
            .anim-falling-item2 {
              transform: translate(92px, 47px) scale(1) !important;
              opacity: 1 !important;
            }
            .anim-mouth-neutral {
              opacity: 0 !important;
            }
            .anim-mouth-smile {
              opacity: 1 !important;
              transform: scale(1) !important;
            }
            .anim-eyes-normal {
              opacity: 0 !important;
            }
            .anim-eyes-smile {
              opacity: 1 !important;
              transform: scale(1) !important;
            }
            .anim-cheeks {
              opacity: 0.85 !important;
            }
          }
        `}</style>

        {/* ------------------------------------------------------------------ */}
        {/* Floor Speed Lines & Ground Contact Shadows                         */}
        {/* ------------------------------------------------------------------ */}
        <line x1="20" y1="96" x2="62" y2="96" stroke="#DBEAFE" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="36" y1="104" x2="68" y2="104" stroke="#EFF6FF" strokeWidth="2" strokeLinecap="round" />
        <line x1="152" y1="96" x2="184" y2="96" stroke="#EFF6FF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Wheel contact shadows in soft sky blue */}
        <ellipse cx="86" cy="113" rx="10" ry="2.5" fill="#BFDBFE" opacity="0.6" />
        <ellipse cx="134" cy="113" rx="10" ry="2.5" fill="#BFDBFE" opacity="0.6" />

        {/* ------------------------------------------------------------------ */}
        {/* Falling Delivery Items (From Upside)                               */}
        {/* ------------------------------------------------------------------ */}
        {/* Red accent motion tick above parcel */}
        <g className="anim-red-tick">
          <line x1="105" y1="23" x2="117" y2="23" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 1. Yellow Delivery Parcel (With Red Tape & Blue Mark) */}
        <g className="anim-falling-box" filter="url(#pkg-shadow-3d)">
          {/* Main yellow box */}
          <rect x="-12" y="-11" width="24" height="22" rx="3" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
          {/* Vertical Red Sealing Tape */}
          <rect x="-8" y="-11" width="5.5" height="22" fill="#EF4444" rx="0.5" />
          <line x1="-8" y1="-11" x2="-2.5" y2="-11" stroke="#DC2626" strokeWidth="1" />
          {/* Royal Blue Logo Emblem */}
          <path
            d="M 1,-3 L 7,-3 M 1,2 L 5.5,2 M 1,-6.5 L 1,6"
            stroke="#2962FF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* 2. Royal Blue Haatza Shopping Gift Box */}
        <g className="anim-falling-item2" filter="url(#pkg-shadow-3d)">
          <rect x="-9" y="-8.5" width="18" height="17" rx="2.5" fill="#2962FF" stroke="#1E40AF" strokeWidth="1" />
          <path d="M -9,0 L 9,0 M 0,-8.5 L 0,8.5" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.9" />
          <circle cx="0" cy="0" r="1.6" fill="#FFFFFF" />
        </g>

        {/* Sparkles on landing */}
        <g className="anim-sparkles-burst">
          <circle cx="98" cy="38" r="1.5" fill="#F59E0B" />
          <circle cx="114" cy="34" r="1.3" fill="#2962FF" />
          <circle cx="132" cy="40" r="1.5" fill="#60A5FA" />
          <circle cx="86" cy="42" r="1.2" fill="#FBBF24" />
        </g>

        {/* ------------------------------------------------------------------ */}
        {/* Blue Shopping Cart Trolley with Animated Smiling Face              */}
        {/* ------------------------------------------------------------------ */}
        <g className="anim-blue-trolley" filter="url(#cart-blue-shadow)">
          
          {/* Handle Slanted Arm (Royal Blue) */}
          <path
            d="M 74,56 L 62,42 L 48,42"
            stroke="#2962FF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Handle Grip (Darker Royal Blue Pill) */}
          <rect
            x="40"
            y="39"
            width="13"
            height="6"
            rx="3"
            fill="#1E40AF"
          />

          {/* Trolley Basket Body (Royal Blue Border, Crisp White/Soft-Blue interior) */}
          <path
            d="M 73,56 L 82.5,90.5 C 83.2,93 85.5,95 88.5,95 L 131.5,95 C 134.5,95 136.8,93 137.5,90.5 L 147,56 C 147.6,53.8 145.8,52 143.5,52 L 76.5,52 C 74.2,52 72.4,53.8 73,56 Z"
            fill="#FFFFFF"
            stroke="#2962FF"
            strokeWidth="3.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Soft inner blue highlight tint */}
          <path
            d="M 76,55 L 84,89 C 84.5,91 86,92.5 88.5,92.5 L 131.5,92.5 C 134,92.5 135.5,91 136,89 L 144,55 Z"
            fill="#F0F7FF"
            opacity="0.7"
          />

          {/* ---------------- Face Expressions ---------------- */}
          
          {/* [STATE A: Neutral Face (Before item drops)] */}
          {/* Normal Eyes (2 Vertical Pills in Royal Blue) */}
          <g className="anim-eyes-normal">
            <rect x="99" y="65" width="5.5" height="15" rx="2.75" fill="#2962FF" />
            <rect x="115.5" y="65" width="5.5" height="15" rx="2.75" fill="#2962FF" />
          </g>
          {/* Neutral Straight Mouth Slot */}
          <g className="anim-mouth-neutral">
            <rect x="100.5" y="85" width="19" height="5" rx="2.5" fill="#2962FF" />
          </g>

          {/* [STATE B: Happy Smiling Face (After item lands into cart!)] */}
          {/* Happy Squinting Smiling Eyes (^ ^ in Royal Blue) */}
          <g className="anim-eyes-smile">
            {/* Left Happy Curved Eye */}
            <path
              d="M 98,72 Q 102,64 106,72"
              stroke="#2962FF"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Happy Curved Eye */}
            <path
              d="M 114,72 Q 118,64 122,72"
              stroke="#2962FF"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Cute Rosy Cheeks Blush (Appears when smiling) */}
          <g className="anim-cheeks">
            <circle cx="92.5" cy="77" r="3.5" fill="#FDA4AF" />
            <circle cx="127.5" cy="77" r="3.5" fill="#FDA4AF" />
          </g>

          {/* Broad, Cheerful Upward Curved SMILE (‿) */}
          <g className="anim-mouth-smile">
            <path
              d="M 98,82.5 Q 110,95.5 122,82.5"
              stroke="#2962FF"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ---------------- Wheels (Royal Blue Rims + White Hubs) ---------------- */}
          {/* Left Wheel */}
          <circle cx="86" cy="106" r="7.5" fill="#2962FF" />
          <circle cx="86" cy="106" r="3.5" fill="#FFFFFF" />

          {/* Right Wheel */}
          <circle cx="134" cy="106" r="7.5" fill="#2962FF" />
          <circle cx="134" cy="106" r="3.5" fill="#FFFFFF" />

        </g>
      </svg>
    </div>
  );
};

export default EmptyCartIllustration;
