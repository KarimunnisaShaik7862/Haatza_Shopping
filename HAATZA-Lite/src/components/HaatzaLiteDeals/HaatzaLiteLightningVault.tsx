import React, { useState, useEffect } from 'react';
import { useHaatzaLiteCart } from '../../hooks/useHaatzaLiteCart';
import { haatzaLiteProducts } from '../../data/liteData';
import { Zap, Check, ArrowRight, Clock, Star } from 'lucide-react';

export const HaatzaLiteLightningVault: React.FC = () => {
  const { addToCart } = useHaatzaLiteCart();
  const [isClaimed, setIsClaimed] = useState(false);
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

  return (
    <section
      aria-label="Haatza Lightning Drop Vault"
      className="relative w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 select-none my-2 sm:my-3"
    >
      <style>{`
        @keyframes vaultGlowPulse {
          0%, 100% {
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.25);
          }
          50% {
            box-shadow: 0 0 70px rgba(34, 197, 94, 0.55);
          }
        }

        .vault-breathing-banner {
          box-shadow: 0 0 40px rgba(34, 197, 94, 0.25) !important;
          animation: vaultGlowPulse 3s infinite ease-in-out !important;
        }

        @keyframes vaultBob {
          0%, 100% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>

      {/* Main Container: box-shadow: 0 0 40px rgba(34, 197, 94, 0.25); animation: pulse 3s infinite ease-in-out; */}
      <div
        className="vault-breathing-banner relative z-10 rounded-[24px] p-4 sm:p-7 lg:p-8 bg-[#FBFDFB] border border-[#0C831F]/30 transition-all duration-300 overflow-hidden"
      >
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Floating 3D Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-2">
            <div
              className="relative w-40 h-40 sm:w-64 sm:h-64 lg:w-72 lg:h-72 flex items-center justify-center select-none pointer-events-none"
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

            {/* Soft Ambient Shadow */}
            <div
              className="w-32 sm:w-56 h-3 sm:h-5 rounded-[50%] bg-[#0C831F]/20 blur-md -mt-3 sm:-mt-4 pointer-events-none"
            />
          </div>

          {/* RIGHT SIDE: Typography & Urgency Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 lg:pl-4">
            
            {/* Live Flash Timer & Rating badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#0C831F] uppercase px-3 py-1 rounded-full bg-[#EAF8ED] border border-[#0C831F]/20 w-fit">
                <Clock className="w-3.5 h-3.5 text-[#0C831F]" />
                <span>FLASH WINDOW: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50/90 border border-amber-200/80 text-xs font-black text-amber-800 shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 (1.2k+ reviews)</span>
              </div>
            </div>

            {/* Primary Header */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111D15] tracking-wide font-heading uppercase leading-tight">
              THE 9-MINUTE FLASH DROP
            </h2>

            {/* Sub-Header */}
            <p className="text-sm sm:text-base text-slate-500 font-medium tracking-normal leading-relaxed">
              Curated premium seasonal picks, dispatched instantly.
            </p>

            {/* Price Layout */}
            <div className="flex items-baseline gap-3.5 pt-1">
              <span className="text-4xl sm:text-5xl font-black text-[#0C831F] tracking-tight font-heading">
                ₹599
              </span>
              <span className="text-xl sm:text-2xl text-slate-400 font-light line-through">
                ₹999
              </span>
            </div>

            {/* Main Action Button */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleClaim}
                disabled={isClaimed}
                className={`relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_6px_22px_rgba(12,131,31,0.25)] hover:shadow-[0_10px_30px_rgba(12,131,31,0.38)] hover:-translate-y-0.5 ${
                  isClaimed
                    ? 'bg-[#09711A] text-white shadow-[0_0_20px_rgba(12,131,31,0.4)]'
                    : 'bg-[#0C831F] text-white hover:bg-[#09711A]'
                }`}
                aria-label="Claim offer and add to cart"
              >
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

export default HaatzaLiteLightningVault;
