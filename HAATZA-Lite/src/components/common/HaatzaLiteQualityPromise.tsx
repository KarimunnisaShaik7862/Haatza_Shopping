import React, { useState } from 'react';

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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-1 pb-1 select-none w-full">
      {/* Ultra-Premium White Glassmorphic Quality Promise Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/95 backdrop-blur-2xl border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Subtle Ambient Backlight */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#0C831F]/05 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#0C831F]/05 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <span className="text-[11px] font-black tracking-widest uppercase text-[#0C831F] bg-[#EAF8ED] px-4 py-1.5 rounded-full border border-[#0C831F]/20 shadow-2xs">
            HAATZA QUALITY PROMISE
          </span>
        </div>

        {/* 3 Wide Columns with Neon Glow Mouse Reflection */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
          {PROMISE_COLUMNS.map((col) => {
            const isHovered = activeCol === col.id;

            return (
              <div
                key={col.id}
                onMouseEnter={() => setActiveCol(col.id)}
                onMouseLeave={() => setActiveCol(null)}
                className={`relative rounded-2xl p-5 sm:p-6 flex items-center gap-4 sm:gap-5 border transition-all duration-200 ease-out cursor-default ${
                  isHovered
                    ? 'bg-[#F4FAF5] border-[#0C831F]/60 shadow-[0_0_30px_rgba(12,131,31,0.22),0_8px_24px_rgba(12,131,31,0.1)] ring-1 ring-[#0C831F]/30 -translate-y-0.5'
                    : 'bg-white/70 border-slate-100 hover:border-slate-200 shadow-2xs'
                }`}
              >
                {/* 3D Visual Asset */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center select-none pointer-events-none">
                  <img
                    src={col.image}
                    alt={col.title}
                    className={`w-full h-full object-contain mix-blend-multiply filter drop-shadow-[0_8px_18px_rgba(12,131,31,0.18)] ${col.imageClass}`}
                    loading="lazy"
                  />
                </div>

                {/* Typography */}
                <div className="space-y-1">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
