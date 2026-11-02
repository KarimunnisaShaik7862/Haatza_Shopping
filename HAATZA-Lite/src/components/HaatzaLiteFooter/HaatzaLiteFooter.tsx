import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  RefreshCw,
  Truck,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
  CheckCircle2,
  Sparkles,
  Lock,
} from 'lucide-react';

/* =========================================================================
   AUTHENTIC PAYMENT LOGO SVGs (UPI, RuPay, VISA, Mastercard, Net Banking, COD)
   ========================================================================= */

// 1. UPI (Unified Payments Interface) Logo
const UpiLogo: React.FC = () => (
  <svg
    viewBox="0 0 58 18"
    className="h-3 sm:h-3.5 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="UPI"
  >
    {/* Dual Arrow Chevrons (Green & Orange) */}
    <path d="M6 1.5L14 9L6 16.5H1L9 9L1 1.5H6Z" fill="#097939" />
    <path d="M13 1.5L21 9L13 16.5H8L16 9L8 1.5H13Z" fill="#ED7524" />
    {/* UPI Text */}
    <text
      x="24"
      y="13.5"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      fontWeight="900"
      fontSize="12.5"
      fill="#1E293B"
      letterSpacing="-0.4"
    >
      UPI
    </text>
  </svg>
);

// 2. RuPay Official Logo
const RupayLogo: React.FC = () => (
  <svg
    viewBox="0 0 68 18"
    className="h-3 sm:h-3.5 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="RuPay"
  >
    <text
      x="1"
      y="13.5"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="13"
      fill="#003B73"
      letterSpacing="-0.2"
    >
      RuPay
    </text>
    {/* Orange & Cyan Chevrons */}
    <path d="M50 2L57 9L50 16H46L53 9L46 2H50Z" fill="#F37021" />
    <path d="M57 2L64 9L57 16H53L60 9L53 2H57Z" fill="#00A3E0" />
  </svg>
);

// 3. VISA Logo
const VisaLogo: React.FC = () => (
  <svg
    viewBox="0 0 46 16"
    className="h-3 sm:h-3.5 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Visa"
  >
    {/* Gold Accent on top of V */}
    <path d="M3.5 2L1.2 13.5H4.5L6.8 2H3.5Z" fill="#F7B600" />
    <text
      x="6.2"
      y="13.5"
      fontFamily="'Trebuchet MS', 'Segoe UI', Arial, sans-serif"
      fontWeight="900"
      fontStyle="italic"
      fontSize="14.5"
      fill="#1A1F71"
      letterSpacing="0.8"
    >
      VISA
    </text>
  </svg>
);

// 4. Mastercard Logo
const MastercardLogo: React.FC = () => (
  <svg
    viewBox="0 0 32 20"
    className="h-3.5 sm:h-4 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mastercard"
  >
    <circle cx="11" cy="10" r="7.5" fill="#EB001B" />
    <circle cx="21" cy="10" r="7.5" fill="#F79E1B" fillOpacity="0.95" />
    <path
      d="M16 4.8C17.6 6.2 18.5 8 18.5 10C18.5 12 17.6 13.8 16 15.2C14.4 13.8 13.5 12 13.5 10C13.5 8 14.4 6.2 16 4.8Z"
      fill="#FF5F00"
    />
  </svg>
);

// 5. Net Banking Logo
const NetBankingLogo: React.FC = () => (
  <svg
    viewBox="0 0 84 18"
    className="h-3 sm:h-3.5 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Net Banking"
  >
    {/* Classical Bank Pillars & Pediment */}
    <g fill="#0284C7">
      <path d="M7 1.5L1 5V6.5H13V5L7 1.5Z" />
      <rect x="2" y="7.5" width="1.6" height="5.5" />
      <rect x="4.8" y="7.5" width="1.6" height="5.5" />
      <rect x="7.6" y="7.5" width="1.6" height="5.5" />
      <rect x="10.4" y="7.5" width="1.6" height="5.5" />
      <rect x="1" y="14" width="12" height="1.8" rx="0.4" />
    </g>
    <text
      x="17"
      y="13"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      fontWeight="800"
      fontSize="9.5"
      fill="#0F172A"
      letterSpacing="-0.2"
    >
      NET BANKING
    </text>
  </svg>
);

// 6. Cash on Delivery (COD) Logo
const CashOnDeliveryLogo: React.FC = () => (
  <svg
    viewBox="0 0 48 18"
    className="h-3 sm:h-3.5 w-auto"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="COD"
  >
    {/* Rupee Cash Badge */}
    <rect x="1" y="1.5" width="15" height="15" rx="2.5" fill="#ECFDF5" stroke="#059669" strokeWidth="1.2" />
    <text
      x="4.8"
      y="13"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      fontWeight="900"
      fontSize="10.5"
      fill="#059669"
    >
      ₹
    </text>
    {/* COD Text */}
    <text
      x="19"
      y="13.5"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
      fontWeight="900"
      fontSize="11"
      fill="#0F172A"
      letterSpacing="-0.2"
    >
      COD
    </text>
  </svg>
);

export const HaatzaLiteFooter: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Smooth scroll-triggered reveal on entry (triggers once)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4500);
  };

  const categories = [
    { name: 'Fruits & Vegetables', href: '/lite/fruits-vegetables' },
    { name: 'Dairy & Breakfast', href: '/lite/dairy-breakfast' },
    { name: 'Snacks & Beverages', href: '/lite/snacks-beverages' },
    { name: 'Household & Cleaning', href: '/lite/household-cleaning' },
    { name: 'Personal Care', href: '/lite/personal-care' },
    { name: 'Kitchen Essentials', href: '/lite/kitchen-essentials' },
    { name: 'Bakery & Breads', href: '/lite/bakery-breads' },
    { name: 'Staples & Cooking', href: '/lite/staples-cooking-essentials' },
    { name: 'Frozen Foods', href: '/lite/frozen-foods' },
    { name: 'Baby Care', href: '/lite/baby-care-essentials' },
    { name: 'Pet Supplies', href: '/lite/pet-supplies' },
  ];

  // Official Payment Channel Badges with Logos
  const paymentLogos = [
    { id: 'upi', name: 'UPI Accepted', component: UpiLogo },
    { id: 'rupay', name: 'RuPay', component: RupayLogo },
    { id: 'visa', name: 'VISA', component: VisaLogo },
    { id: 'mastercard', name: 'Mastercard', component: MastercardLogo },
    { id: 'netbanking', name: 'Net Banking', component: NetBankingLogo },
    { id: 'cod', name: 'COD', component: CashOnDeliveryLogo },
  ];

  // Subtle floating micro-bubbles gently rising from bottom
  const footerBubbles = [
    { left: '7%', size: 7, duration: '9s', delay: '0s', animClass: 'anim-bubble-1' },
    { left: '16%', size: 10, duration: '12s', delay: '3.2s', animClass: 'anim-bubble-2' },
    { left: '26%', size: 5, duration: '8s', delay: '1.4s', animClass: 'anim-bubble-1' },
    { left: '38%', size: 9, duration: '11s', delay: '4.5s', animClass: 'anim-bubble-2' },
    { left: '52%', size: 6, duration: '10s', delay: '2.1s', animClass: 'anim-bubble-1' },
    { left: '67%', size: 11, duration: '13s', delay: '5.2s', animClass: 'anim-bubble-2' },
    { left: '78%', size: 5, duration: '8.5s', delay: '0.9s', animClass: 'anim-bubble-1' },
    { left: '89%', size: 8, duration: '11.5s', delay: '3.7s', animClass: 'anim-bubble-2' },
  ];

  // Soft micro-stars gently glowing & twinkling across the dark surface
  const footerStars = [
    { top: '22%', left: '11%', size: 8, duration: '3.6s', delay: '0s' },
    { top: '48%', left: '23%', size: 6, duration: '4.2s', delay: '1.3s' },
    { top: '28%', left: '37%', size: 8, duration: '3.2s', delay: '2.1s' },
    { top: '64%', left: '51%', size: 7, duration: '4.6s', delay: '0.6s' },
    { top: '34%', left: '63%', size: 8, duration: '3.9s', delay: '1.8s' },
    { top: '56%', left: '77%', size: 6, duration: '4.1s', delay: '2.6s' },
    { top: '24%', left: '88%', size: 9, duration: '3.5s', delay: '1.0s' },
  ];

  const getStageStyle = (delayMs: number): React.CSSProperties => ({
    opacity: hasRevealed ? 1 : 0,
    transform: hasRevealed ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
    transition: `opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    willChange: 'opacity, transform',
  });

  return (
    <footer
      ref={footerRef}
      className="relative w-full mt-14 select-none overflow-hidden"
    >
      {/* =========================================================================
          SCOPED STYLES: UNIFIED PRE-FOOTER & DEEP FOREST CINEMA FOOTER
          ========================================================================= */}
      <style>{`
        /* Chatbot signature vibrant green #00C451 */
        :root {
          --haatza-green: #00C451;
          --haatza-green-hover: #00AC47;
          --haatza-forest-start: #032517;
          --haatza-forest-mid: #011A10;
          --haatza-forest-end: #010F09;
        }

        /* Slowly floating dark green ribbon behind the footer */
        @keyframes ribbonSway {
          0%, 100% {
            transform: translate3d(0, 0, 0) scaleY(1);
          }
          50% {
            transform: translate3d(25px, -12px, 0) scaleY(1.06);
          }
        }
        .anim-ribbon-sway {
          animation: ribbonSway 16s ease-in-out infinite;
        }

        /* Subscribe button elegant light glint */
        @keyframes subscribeGlint {
          0%, 75% {
            transform: translateX(-120%) skewX(-20deg);
          }
          88%, 100% {
            transform: translateX(260%) skewX(-20deg);
          }
        }
        .anim-subscribe-glint {
          animation: subscribeGlint 5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        /* Brand emblem restrained sheen */
        @keyframes emblemShine {
          0%, 80% {
            transform: translateX(-120%) rotate(25deg);
          }
          90%, 100% {
            transform: translateX(250%) rotate(25deg);
          }
        }
        .anim-emblem-shine {
          animation: emblemShine 7s ease-in-out infinite;
        }

        /* Modern navigation link underline expander */
        .emerald-nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .emerald-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0%;
          height: 1.5px;
          background-color: #00C451;
          box-shadow: 0 0 6px rgba(0, 196, 81, 0.6);
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .emerald-nav-link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }
        .emerald-nav-link:hover::after {
          width: 100%;
        }

        /* Beating heart animation */
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.22); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
        }
        .anim-heart {
          animation: heartPulse 2.4s ease-in-out infinite;
        }

        /* Small translucent bubbles gently floating up from bottom */
        @keyframes floatBubble1 {
          0% {
            transform: translate3d(0, 20px, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.55;
          }
          50% {
            transform: translate3d(12px, -180px, 0) scale(1);
            opacity: 0.65;
          }
          85% {
            opacity: 0.35;
          }
          100% {
            transform: translate3d(-8px, -360px, 0) scale(0.8);
            opacity: 0;
          }
        }
        .anim-bubble-1 {
          animation: floatBubble1 ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes floatBubble2 {
          0% {
            transform: translate3d(0, 20px, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.5;
          }
          50% {
            transform: translate3d(-14px, -170px, 0) scale(1.05);
            opacity: 0.6;
          }
          85% {
            opacity: 0.3;
          }
          100% {
            transform: translate3d(10px, -360px, 0) scale(0.75);
            opacity: 0;
          }
        }
        .anim-bubble-2 {
          animation: floatBubble2 ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* Delicate glowing star twinkling */
        @keyframes starTwinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.75);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.2);
          }
        }
        .anim-star-twinkle {
          animation: starTwinkle ease-in-out infinite;
          will-change: transform, opacity;
        }

        /* Accessibility: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .anim-ribbon-sway,
          .anim-subscribe-glint,
          .anim-emblem-shine,
          .anim-heart,
          .anim-bubble-1,
          .anim-bubble-2,
          .anim-star-twinkle {
            animation: none !important;
            transform: none !important;
          }
          .emerald-nav-link:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. UPPER SECTION: HAATZA FRESH CLUB BENTO SHOWCASE (Soft Mint #F0F9F4)
          ========================================================================= */}
      <div className="relative w-full bg-[#F0F9F4] pt-12 sm:pt-16 pb-10 sm:pb-14 overflow-hidden border-t border-emerald-100/80">
        {/* Subtle Architectural Dot Matrix Texture (No Animation) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: 'radial-gradient(#00C451 0.75px, transparent 0.75px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            style={getStageStyle(0)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* -------------------------------------------------------------------
                LEFT COLUMN: Editorial Newsletter & Perks Intake (Span 6)
                ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-4 text-left">
              {/* "HAATZA FRESH CLUB" Member Privileges Tag */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#008A38] bg-white px-3.5 py-1.5 rounded-full border border-emerald-200/90 shadow-[0_2px_8px_rgba(0,196,81,0.08)]">
                  <span className="w-2 h-2 rounded-full bg-[#00C451] ring-3 ring-[#00C451]/25" />
                  <span>HAATZA FRESH CLUB</span>
                  <span className="text-slate-300 font-light">•</span>
                  <span className="text-slate-500 font-bold">MEMBER PRIVILEGES</span>
                </span>
              </div>

              {/* Primary Headline: "Good food." deep charcoal, "Better deals." brand green */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
                Good food.{' '}
                <span className="text-[#00C451]">
                  Better deals.
                </span>
              </h3>

              {/* Sub-description */}
              <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed font-normal">
                Subscribe to the <strong className="text-slate-900 font-semibold">HAATZA Lite</strong> newsletter for weekly price drops, seasonal farm harvests, and exclusive instant cashback alerts.
              </p>

              {/* Exclusive Club Perks Mini-Strip */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-white/85 border border-emerald-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                  <span className="text-[#00C451] font-bold">⚡</span> 10–15 Min Delivery
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-white/85 border border-emerald-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                  <span className="text-[#00C451] font-bold">🏷️</span> Member Cashback
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-white/85 border border-emerald-200/80 px-2.5 py-1 rounded-lg shadow-2xs">
                  <span className="text-[#00C451] font-bold">🌱</span> Farm Direct Quality
                </span>
              </div>

              {/* Email Intake Control */}
              <div className="pt-2 max-w-md">
                <form onSubmit={handleSubscribe} className="w-full">
                  {subscribed ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00702E] bg-white px-4 py-3.5 rounded-2xl border border-[#00C451] shadow-[0_4px_16px_rgba(0,196,81,0.12)]">
                      <CheckCircle2 className="w-4 h-4 text-[#00C451] shrink-0" />
                      <span>Welcome to the Club! You’ll receive our next festival alert.</span>
                    </div>
                  ) : (
                    <div className="relative flex items-center p-1.5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.03)] border-2 border-emerald-100 hover:border-emerald-300 focus-within:border-[#00C451] focus-within:ring-4 focus-within:ring-[#00C451]/15 transition-all duration-150">
                      <Mail className="w-4 h-4 text-emerald-600 ml-3 mr-1.5 shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                        className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden py-1.5"
                      />
                      <button
                        type="submit"
                        className="group bg-[#00C451] hover:bg-[#00AC47] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-[0_3px_12px_rgba(0,196,81,0.3)] hover:shadow-[0_4px_16px_rgba(0,196,81,0.4)] active:scale-95 transition-all duration-150 cursor-pointer shrink-0"
                      >
                        <span>Subscribe</span>
                        <Send className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  )}
                </form>

                {/* Sub-text Guarantee */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-2.5 pl-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Zero spam. Unsubscribe anytime with 1 click.</span>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: 4 Architectural Bento Guarantee Cards (Span 6)
                ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 self-center pt-4 lg:pt-0">
              {/* Bento Card 1 */}
              <div className="relative bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#00C451]/50 hover:shadow-[0_8px_24px_rgba(0,196,81,0.08)] hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00C451] flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#00C451] group-hover:text-white transition-colors duration-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                    01 / Verified
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-950 transition-colors">100% Authentic</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Sourced directly from certified Indian brands & farms
                </p>
              </div>

              {/* Bento Card 2 */}
              <div className="relative bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#00C451]/50 hover:shadow-[0_8px_24px_rgba(0,196,81,0.08)] hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00C451] flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#00C451] group-hover:text-white transition-colors duration-200">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                    02 / Speed
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-950 transition-colors">Express Delivery</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  10–15 min groceries & daily essentials at your doorstep
                </p>
              </div>

              {/* Bento Card 3 */}
              <div className="relative bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#00C451]/50 hover:shadow-[0_8px_24px_rgba(0,196,81,0.08)] hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00C451] flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#00C451] group-hover:text-white transition-colors duration-200">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                    03 / Policy
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-950 transition-colors">Hassle-Free Returns</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Instant doorstep replacement & refunds
                </p>
              </div>

              {/* Bento Card 4 */}
              <div className="relative bg-white/95 rounded-2xl p-4 sm:p-5 border border-emerald-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-[#00C451]/50 hover:shadow-[0_8px_24px_rgba(0,196,81,0.08)] hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00C451] flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#00C451] group-hover:text-white transition-colors duration-200">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 uppercase">
                    04 / Support
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-emerald-950 transition-colors">Dedicated Support</h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  24/7 customer care via chat & phone
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          2. SEAMLESS SECTION TRANSITION (Curved Wave)
          ========================================================================= */}
      <div className="relative w-full overflow-hidden leading-none -mb-px pointer-events-none bg-[#F0F9F4]">
        <svg
          className="relative block w-full h-10 sm:h-14 lg:h-18 text-[#032517]"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          {/* Subtle Base Horizon Edge */}
          <path
            d="M0,28 C360,70 720,10 1080,48 C1260,68 1380,36 1440,28"
            fill="none"
            stroke="#00C451"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          {/* Dark footer body fill */}
          <path d="M0,28 C360,70 720,10 1080,48 C1260,68 1380,36 1440,28 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* =========================================================================
          3. LOWER SECTION: DARK FOREST GREEN FOOTER (#032517)
          ========================================================================= */}
      <div className="relative w-full bg-gradient-to-b from-[#032517] via-[#011A10] to-[#010F09] text-white overflow-hidden">

        {/* Subtle Signature Bent Line Flowing Through Footer (Lite & Smooth, Without Heavy Glow) */}
        <div
          aria-hidden="true"
          className="anim-ribbon-sway absolute inset-0 pointer-events-none overflow-hidden z-0"
        >
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1440 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 180 C 320 80, 680 320, 1100 160 C 1320 80, 1500 240, 1600 210"
              stroke="#00C451"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Small Bubbles Gently Floating Up From Bottom */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {footerBubbles.map((bubble, idx) => (
            <div
              key={`bubble-${idx}`}
              className={`absolute rounded-full border border-emerald-400/40 bg-emerald-400/10 ${bubble.animClass}`}
              style={{
                left: bubble.left,
                bottom: '-14px',
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDuration: bubble.duration,
                animationDelay: bubble.delay,
              }}
            >
              {/* Internal micro-specular reflection */}
              <span className="absolute top-[18%] left-[22%] w-[28%] h-[28%] rounded-full bg-white/75" />
            </div>
          ))}
        </div>

        {/* Small Glowing & Twinkling Stars */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {footerStars.map((star, idx) => (
            <div
              key={`star-${idx}`}
              className="absolute anim-star-twinkle"
              style={{
                top: star.top,
                left: star.left,
                animationDuration: star.duration,
                animationDelay: star.delay,
              }}
            >
              <svg
                width={star.size}
                height={star.size}
                viewBox="0 0 16 16"
                fill="currentColor"
                className="text-[#52FF9F]"
              >
                <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" />
              </svg>
            </div>
          ))}
        </div>

        {/* Main Footer Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-8 sm:pb-10">

          {/* ---------------------------------------------------------------------
              DIRECTORY COLUMNS: Aligned Uniformly on the Same Horizontal Top Axis
              --------------------------------------------------------------------- */}
          <div
            style={getStageStyle(180)}
            className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-white/10 text-xs items-start"
          >
            {/* Column 1: Brand Info (Span 2) */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                {/* [H] Emblem with Haatza Signature #00C451 Accent & Radiant Glow */}
                <div className="relative w-9 h-9 rounded-xl bg-[#00C451] flex items-center justify-center text-white font-black text-xl shadow-[0_0_24px_rgba(0,196,81,0.65),0_2px_10px_rgba(0,196,81,0.4)] overflow-hidden shrink-0">
                  <span className="relative z-10 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">H</span>
                  <div
                    aria-hidden="true"
                    className="anim-emblem-shine absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-white tracking-tight drop-shadow-[0_0_12px_rgba(0,196,81,0.3)]">HAATZA</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#00C451]/20 text-[#52FF9F] font-black text-[10px] uppercase tracking-widest border border-[#00C451]/50 shadow-[0_0_12px_rgba(0,196,81,0.35)]">
                    LITE
                  </span>
                </div>
              </div>

              <p className="text-emerald-100/75 leading-relaxed max-w-sm text-xs">
                <strong className="text-white font-semibold">HAATZA Lite</strong> is India’s premier quick-commerce grocery destination. Shop farm-fresh fruits & vegetables, dairy, household essentials, and daily groceries delivered to your door in 10–15 minutes.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-emerald-100/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-emerald-500/25 shadow-[0_0_8px_rgba(0,196,81,0.2)]">
                    <MapPin className="w-3.5 h-3.5 text-[#00C451] drop-shadow-[0_0_4px_rgba(0,196,81,0.8)]" />
                  </div>
                  <span>BKC One, Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-emerald-500/25 shadow-[0_0_8px_rgba(0,196,81,0.2)]">
                    <Phone className="w-3.5 h-3.5 text-[#00C451] drop-shadow-[0_0_4px_rgba(0,196,81,0.8)]" />
                  </div>
                  <a
                    href="tel:18004198282"
                    className="hover:text-white transition-colors underline decoration-emerald-500/40 hover:decoration-white hover:drop-shadow-[0_0_8px_rgba(0,196,81,0.6)]"
                  >
                    1800-419-8282 (Toll Free 24/7)
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center shrink-0 border border-emerald-500/25 shadow-[0_0_8px_rgba(0,196,81,0.2)]">
                    <Mail className="w-3.5 h-3.5 text-[#00C451] drop-shadow-[0_0_4px_rgba(0,196,81,0.8)]" />
                  </div>
                  <a
                    href="mailto:care@haatza.in"
                    className="hover:text-white transition-colors underline decoration-emerald-500/40 hover:decoration-white hover:drop-shadow-[0_0_8px_rgba(0,196,81,0.6)]"
                  >
                    care@haatza.in
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Popular Categories (Clean vertical text links) */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C451] shadow-[0_0_8px_rgba(0,196,81,1)]" />
                POPULAR CATEGORIES
              </h5>
              <ul className="space-y-2 text-emerald-100/75">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link to={cat.href} className="emerald-nav-link">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Destinations */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C451] shadow-[0_0_8px_rgba(0,196,81,1)]" />
                DESTINATIONS
              </h5>
              <ul className="space-y-2 text-emerald-100/75">
                <li>
                  <Link to="/" className="emerald-nav-link">
                    HAATZA Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/lite" className="emerald-nav-link text-[#52FF9F] font-bold drop-shadow-[0_0_8px_rgba(0,196,81,0.6)]">
                    LITE Quick Commerce ⚡
                  </Link>
                </li>
                <li>
                  <Link to="/nest" className="emerald-nav-link">
                    NEST Home Services
                  </Link>
                </li>
                <li>
                  <Link to="/lite/fruits-vegetables" className="emerald-nav-link">
                    Fresh Produce & Fruits
                  </Link>
                </li>
                <li>
                  <Link to="/lite" className="emerald-nav-link">
                    Daily Deals & Offers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Customer Service */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C451] shadow-[0_0_8px_rgba(0,196,81,1)]" />
                CUSTOMER SERVICE
              </h5>
              <ul className="space-y-2 text-emerald-100/75">
                <li>
                  <Link to="/orders" className="emerald-nav-link">
                    Track Your Order
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="emerald-nav-link">
                    Return Request
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="emerald-nav-link">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="emerald-nav-link">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="emerald-nav-link">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="emerald-nav-link">
                    About HAATZA Lite
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Policies & Legal */}
            <div className="space-y-3">
              <h5 className="font-extrabold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5 h-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C451] shadow-[0_0_8px_rgba(0,196,81,1)]" />
                POLICIES & LEGAL
              </h5>
              <ul className="space-y-2 text-emerald-100/75">
                <li>
                  <Link to="/privacy" className="emerald-nav-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="emerald-nav-link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="emerald-nav-link">
                    Shipping & Delivery Policy
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="emerald-nav-link">
                    Refund & Cancellation
                  </Link>
                </li>
                <li>
                  <Link to="/account/addresses" className="emerald-nav-link">
                    Saved Addresses
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              BOTTOM ROW: Clean Copyright on Left & Authentic Payment Logos on Right
              --------------------------------------------------------------------- */}
          <div
            style={getStageStyle(240)}
            className="pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60"
          >
            {/* Copyright on Bottom Left */}
            <p className="flex items-center gap-1.5 text-center sm:text-left">
              <span>© {new Date().getFullYear()} HAATZA Technologies India Pvt. Ltd. Crafted with</span>
              <Heart className="w-3.5 h-3.5 inline text-[#00C451] fill-current anim-heart drop-shadow-[0_0_8px_rgba(0,196,81,0.9)]" />
              <span>for Indian shoppers.</span>
            </p>

            {/* Official Payment Badges with Authentic Vector Logos */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center sm:justify-end pr-0 sm:pr-12">
              {paymentLogos.map((payment) => {
                const LogoComponent = payment.component;
                return (
                  <div
                    key={payment.id}
                    title={payment.name}
                    aria-label={payment.name}
                    className="h-6 sm:h-6.5 px-2 bg-white hover:bg-slate-50 rounded-md shadow-2xs border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xs cursor-default shrink-0 select-none"
                  >
                    <LogoComponent />
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default HaatzaLiteFooter;
