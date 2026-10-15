import React, { useState, useEffect } from 'react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { haatzaLiteProducts } from '../../data/liteData';
import { Zap, Check, ArrowRight, Clock } from 'lucide-react';

export const HaatzaLiteLightningVault: React.FC = () => {
  const { addToCart } = useHaatzaLiteCart();
  const [isClaimed, setIsClaimed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 9-minute urgency countdown timer
  const [secondsRemaining, setSecondsRemaining] = useState(9 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 9 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const dropProduct = haatzaLiteProducts.find((p) => p.id === 'prod-lite-mango') || haatzaLiteProducts[0];

  const handleClaim = (e: React.MouseEvent) => {
    e.preventDefault();
    if (dropProduct) {
      addToCart(dropProduct, 1);
      setIsClaimed(true);
      setTimeout(() => setIsClaimed(false), 2400);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    setMousePos({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      aria-label="Haatza Lightning Drop Vault"
      className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 select-none"
    >
      <style>{`
        @keyframes vaultBob {
          0%, 100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(8px);
          }
        }
        @keyframes vaultShadowPulse {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.4;
            filter: blur(8px);
          }
          50% {
            transform: scale(1.12);
            opacity: 0.7;
            filter: blur(5px);
          }
        }
        @keyframes lightSweep {
          0% {
            transform: translateX(-150%) skewX(-25deg);
          }
          100% {
            transform: translateX(250%) skewX(-25deg);
          }
        }
      `}</style>

      {/* Main Container: Ultra-smooth off-white canvas with 24px rounded corners and interactive green aura */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative rounded-[24px] p-8 sm:p-10 lg:p-12 bg-[#FBFDFB] border transition-all duration-500 ease-out overflow-hidden ${
          isHovered
            ? 'border-[#0C831F]/60 shadow-[0_0_45px_rgba(12,131,31,0.22),0_14px_40px_rgba(12,131,31,0.12)] ring-1 ring-[#0C831F]/30'
            : 'border-[#E2EBE4] shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
        }`}
      >
        {/* Dynamic Mouse-Tracking Spotlight Glow Aura */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(650px circle at ${(mousePos.x + 1) * 50}% ${(mousePos.y + 1) * 50}%, rgba(12, 131, 31, 0.09), transparent 70%)`,
          }}
        />

        {/* Ambient Subtle Corner Lighting */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0C831F]/05 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0C831F]/06 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: Free-Form Floating 3D Showcase with Dynamic Drop-Shadow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-2">
            
            {/* 3D Product Arrangement Floating Free-Form in Mid-Air */}
            <div
              className="relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center select-none pointer-events-none"
              style={{ perspective: '1200px' }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: isHovered
                    ? `perspective(1200px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) scale3d(1.06, 1.06, 1.06)`
                    : 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ animation: 'vaultBob 4.5s ease-in-out infinite' }}
                >
                  <img
                    src="/images/categories/3d_fruits.jpg"
                    alt="Floating 3D Farm Harvest"
                    className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.06]"
                  />
                </div>
              </div>
            </div>

            {/* Soft Ambient Dynamic Drop-Shadow Responding to Float Motion & Hover */}
            <div
              className="w-44 sm:w-56 h-4 sm:h-5 rounded-[50%] bg-[#0C831F]/20 blur-md -mt-4 pointer-events-none transition-all duration-300"
              style={{
                animation: 'vaultShadowPulse 4.5s ease-in-out infinite',
                transform: isHovered
                  ? `scale(${1.15 + mousePos.y * 0.08})`
                  : 'scale(1)',
                opacity: isHovered ? 0.75 : 0.5,
              }}
            />
          </div>

          {/* RIGHT SIDE: Unique, Modern Corporate Typography & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:pl-4">
            
            {/* Minimalist Digital Urgency Window */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0C831F] uppercase">
              <Clock className="w-3.5 h-3.5 text-[#0C831F]" />
              <span>FLASH WINDOW: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C831F] animate-pulse" />
            </div>

            {/* Primary Header in Modern Semi-Expanded Sans-Serif */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111D15] tracking-wide font-heading uppercase leading-tight">
              THE 9-MINUTE FLASH DROP
            </h2>

            {/* Sub-Header */}
            <p className="text-sm sm:text-base text-slate-500 font-medium tracking-normal leading-relaxed">
              Curated premium seasonal picks, dispatched instantly.
            </p>

            {/* Re-architected Clean Single-Line Price Layout */}
            <div className="flex items-baseline gap-3.5 pt-1">
              <span className="text-4xl sm:text-5xl font-black text-[#0C831F] tracking-tight font-heading">
                ₹599
              </span>
              <span className="text-xl sm:text-2xl text-slate-400 font-light line-through">
                ₹999
              </span>
            </div>

            {/* Main Action Button with Reflective Glossy Light-Sweep Sheen */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleClaim}
                disabled={isClaimed}
                className={`relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_22px_rgba(12,131,31,0.25)] hover:shadow-[0_10px_30px_rgba(12,131,31,0.38)] hover:-translate-y-0.5 ${
                  isClaimed
                    ? 'bg-[#09711A] text-white shadow-[0_0_20px_rgba(12,131,31,0.4)]'
                    : 'bg-[#0C831F] text-white'
                }`}
                aria-label="Claim offer and add to cart"
              >
                {/* Reflective Glossy Light-Sweep Sheen */}
                <span
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none"
                  style={{
                    animation: isHovered ? 'lightSweep 1.8s infinite ease-in-out' : 'none',
                    transform: isHovered ? undefined : 'translateX(-200%)',
                  }}
                />

                {isClaimed ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>CLAIMED & ADDED TO BASKET! ✓</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current text-white" />
                    <span>CLAIM OFFER & ADD TO CART</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
