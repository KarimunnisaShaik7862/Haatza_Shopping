import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PromiseColumn {
  id: number;
  title: string;
  subtext: string;
  image: string;
  imageClass?: string;
}

const PROMISE_COLUMNS: PromiseColumn[] = [
  {
    id: 1,
    title: 'Hyper-Fast Delivery',
    subtext: 'From dark store to kitchen counter in minutes',
    image: '/images/trust/trust_speed.png',
    imageClass: 'hover:rotate-12 transition-transform duration-500',
  },
  {
    id: 2,
    title: 'Zero-Question Returns',
    subtext: "Instant, hassle-free replacement if it's not perfect",
    image: '/images/trust/trust_guarantee.png',
    imageClass: 'hover:scale-108 transition-transform duration-500',
  },
  {
    id: 3,
    title: 'Directly Sourced',
    subtext: 'Handpicked daily from trusted local orchards & farms',
    image: '/images/trust/trust_source.png',
    imageClass: 'hover:-rotate-6 hover:scale-108 transition-transform duration-500',
  },
];

export const HaatzaLiteQualityPromise: React.FC = () => {
  const [activeCol, setActiveCol] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-2 sm:py-4 select-none">
      <style>{`
        /* 8. HAATZA Quality Promise Glass Sheen Keyframes */
        @keyframes glassSheenPan {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }

        .glass-sheen-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%);
          pointer-events: none;
          z-index: 20;
          animation: glassSheenPan 1.4s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .glass-sheen-sweep {
            animation: none !important;
          }
        }
      `}</style>

      {/* Ultra-Premium White Glassmorphic Quality Promise Banner */}
      <div 
        className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Subtle Ambient Backlight */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0C831F]/05 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0C831F]/05 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-center mb-4 sm:mb-5">
          <span className="text-[11px] font-black tracking-widest uppercase text-[#0C831F] bg-[#EAF8ED] px-4 py-1.5 rounded-full border border-[#0C831F]/20 shadow-2xs">
            HAATZA QUALITY PROMISE
          </span>
        </div>

        {/* 3 Wide Columns with 3D Entrance Unfold along X-axis & Glass Sheen on Hover */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-5">
          {PROMISE_COLUMNS.map((col, index) => {
            const isHovered = activeCol === col.id;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, rotateX: 15, y: 25 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.12,
                }}
                onMouseEnter={() => setActiveCol(col.id)}
                onMouseLeave={() => setActiveCol(null)}
                className={`relative overflow-hidden rounded-2xl p-4 sm:p-4.5 flex items-center gap-3.5 sm:gap-4 border transition-all duration-300 ease-out cursor-default ${
                  isHovered
                    ? 'bg-[#F4FAF5] border-[#0C831F]/60 shadow-[0_0_30px_rgba(12,131,31,0.22),0_8px_24px_rgba(12,131,31,0.1)] ring-1 ring-[#0C831F]/30 -translate-y-1'
                    : 'bg-white/70 border-slate-100 hover:border-slate-200 shadow-2xs'
                }`}
              >
                {/* Soft glass sheen reflection panning across the white surface on hover */}
                {isHovered && (
                  <div className="glass-sheen-sweep" aria-hidden="true" />
                )}

                {/* 3D Visual Asset */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none pointer-events-none z-10">
                  <img
                    src={col.image}
                    alt={col.title}
                    className={`w-full h-full object-contain mix-blend-multiply filter drop-shadow-[0_8px_18px_rgba(12,131,31,0.18)] ${col.imageClass}`}
                    loading="lazy"
                  />
                </div>

                {/* Typography */}
                <div className="space-y-1 z-10">
                  <h4
                    className={`text-base sm:text-lg font-black tracking-tight transition-colors duration-200 ${
                      isHovered ? 'text-[#0C831F]' : 'text-[#111D15]'
                    }`}
                  >
                    {col.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                    {col.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HaatzaLiteQualityPromise;
