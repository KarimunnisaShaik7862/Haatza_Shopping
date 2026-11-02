import React from 'react';
import { AlertCircle, RefreshCw, MapPin } from 'lucide-react';

export interface HaatzaNestAvailabilityErrorSectionProps {
  errorMessage?: string | null;
  onRetry?: () => void;
  onOpenLocationModal?: () => void;
  className?: string;
}

export const HaatzaNestAvailabilityErrorSection: React.FC<HaatzaNestAvailabilityErrorSectionProps> = ({
  errorMessage,
  onRetry,
  onOpenLocationModal,
  className = '',
}) => {
  return (
    <section 
      aria-label="Service Availability Notice"
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-5 ${className}`}
    >
      {/* Scoped CSS animations for ambient aura pulse, floating emblem, and light sweep */}
      <style>{`
        @keyframes nestErrorAuraPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.65;
          }
        }
        @keyframes nestErrorEmblemFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes nestErrorLightSweep {
          0% {
            transform: translateX(-100%);
          }
          50%, 100% {
            transform: translateX(100%);
          }
        }
        .nest-error-aura {
          animation: nestErrorAuraPulse 3.8s ease-in-out infinite;
        }
        .nest-error-emblem {
          animation: nestErrorEmblemFloat 4s ease-in-out infinite;
        }
        .nest-error-light-sweep {
          animation: nestErrorLightSweep 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .nest-error-aura,
          .nest-error-emblem,
          .nest-error-light-sweep {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FAF7FD] via-white to-[#FBF8FE] border border-[#E4D7F5] py-9 sm:py-12 px-5 sm:px-8 text-center shadow-[0_8px_32px_-6px_rgba(112,39,201,0.06),0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Soft Ambient Corner Glows (Purple/Lilac) */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#7024C7]/6 blur-2xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#8E3DE0]/5 blur-2xl pointer-events-none" aria-hidden="true" />

        {/* Top Animated Purple Border Beam / Light Sweep */}
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#8E3DE0]/30 to-transparent overflow-hidden" aria-hidden="true">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#8E3DE0] to-transparent nest-error-light-sweep opacity-90" />
        </div>

        <div className="max-w-md mx-auto flex flex-col items-center relative z-10">
          
          {/* Animated Hero Status Emblem with Multi-layer Glow */}
          <div className="relative mb-3 flex items-center justify-center">
            {/* Outer Breathing Aura */}
            <div className="absolute w-16 h-16 rounded-2xl bg-purple-400/20 blur-md nest-error-aura pointer-events-none" aria-hidden="true" />
            
            {/* Main Emblem Box */}
            <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#F5ECFF] via-[#EFE2FA] to-[#E7D3F7] border border-[#DBC2F5] text-[#7024C7] flex items-center justify-center shadow-[0_4px_16px_rgba(112,36,199,0.12)] nest-error-emblem">
              <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[#7024C7] stroke-[2.2]" />
              
              {/* Subtle Status Beacon Dot (Top Right) */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8E3DE0] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7024C7] border-2 border-white shadow-2xs" />
              </span>
            </div>
          </div>

          {/* Status Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F3ECFB] border border-[#E4D5F7] text-[#7027C9] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] shadow-[0_1px_2px_rgba(112,39,201,0.04)] mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7027C9] animate-pulse" />
            <span>Coverage Verification</span>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-black text-[#1F1238] font-heading tracking-tight leading-tight">
            Unable to Check Service Availability
          </h2>

          {/* Sleek Gradient Purple Accent Line (No Yellow) */}
          <div 
            className="w-11 h-1 rounded-full bg-gradient-to-r from-[#7024C7] via-[#8E3DE0] to-[#C084FC] my-2.5 shadow-[0_2px_6px_rgba(112,36,199,0.25)]" 
            aria-hidden="true" 
          />

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#5C536B] font-medium leading-relaxed max-w-sm mt-0.5 mb-6">
            {errorMessage 
              ? 'We were unable to retrieve service availability for this location. Please retry or choose a different address.'
              : 'Real-time coverage could not be verified at this moment. Please check your connection or choose another address.'}
          </p>

          {/* Action Buttons: Retry & Change Location */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#7024C7] via-[#7F2CD6] to-[#8E3DE0] hover:from-[#5C1A9E] hover:via-[#7024C7] hover:to-[#8E3DE0] text-white text-xs sm:text-sm font-bold shadow-[0_4px_16px_rgba(112,36,199,0.24)] hover:shadow-[0_6px_22px_rgba(112,36,199,0.36)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-4 h-4 text-white shrink-0 group-hover:rotate-180 transition-transform duration-500 ease-out" />
                <span>Retry Verification</span>
              </button>
            )}

            {onOpenLocationModal && (
              <button
                type="button"
                onClick={onOpenLocationModal}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#D5C2ED] hover:border-[#7024C7] hover:bg-[#F9F5FD] text-[#7024C7] text-xs sm:text-sm font-bold shadow-[0_2px_8px_rgba(112,36,199,0.04)] hover:shadow-[0_4px_14px_rgba(112,36,199,0.12)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <MapPin className="w-4 h-4 text-[#7024C7] shrink-0 group-hover:-translate-y-0.5 transition-transform duration-200" />
                <span>Change Location</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HaatzaNestAvailabilityErrorSection;
