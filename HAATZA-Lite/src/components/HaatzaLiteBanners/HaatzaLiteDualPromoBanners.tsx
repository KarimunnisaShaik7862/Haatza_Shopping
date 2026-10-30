import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface MouseState {
  x: number; // 0 to 1
  y: number; // 0 to 1
  isHovered: boolean;
}

export const HaatzaLiteDualPromoBanners: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Banner 1 Mouse State (Freshness, Reimagined)
  const [b1Mouse, setB1Mouse] = useState<MouseState>({ x: 0.5, y: 0.5, isHovered: false });
  // Banner 2 Mouse State (Curated Indulgence)
  const [b2Mouse, setB2Mouse] = useState<MouseState>({ x: 0.5, y: 0.5, isHovered: false });
  // Touch device detection
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    }
  }, []);

  // IntersectionObserver entrance trigger: triggers the exact millisecond the section enters the viewport fold
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMoveB1 = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setB1Mouse({ x, y, isHovered: true });
  }, [isTouchDevice]);

  const handleMouseLeaveB1 = useCallback(() => {
    setB1Mouse({ x: 0.5, y: 0.5, isHovered: false });
  }, []);

  const handleMouseMoveB2 = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setB2Mouse({ x, y, isHovered: true });
  }, [isTouchDevice]);

  const handleMouseLeaveB2 = useCallback(() => {
    setB2Mouse({ x: 0.5, y: 0.5, isHovered: false });
  }, []);

  // 3D Interactive Parallax Offsets: angles up to 6deg
  const b1TiltX = b1Mouse.isHovered ? (0.5 - b1Mouse.y) * 12 : 0;
  const b1TiltY = b1Mouse.isHovered ? (b1Mouse.x - 0.5) * 12 : 0;
  const b1ParallaxX = (b1Mouse.x - 0.5) * 2;
  const b1ParallaxY = (b1Mouse.y - 0.5) * 2;

  const b2TiltX = b2Mouse.isHovered ? (0.5 - b2Mouse.y) * 12 : 0;
  const b2TiltY = b2Mouse.isHovered ? (b2Mouse.x - 0.5) * 12 : 0;
  const b2ParallaxX = (b2Mouse.x - 0.5) * 2;
  const b2ParallaxY = (b2Mouse.y - 0.5) * 2;

  return (
    <section
      ref={sectionRef}
      aria-label="Cinematic 3D Brand Experiences"
      className="w-full max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 select-none py-2 sm:py-3"
    >
      <style>{`
        /* ============================================================
           BRIGHT GREEN & WHITE BRAND PALETTE WITH FLUID WAVES
           - Signature Brand Green: #0C831F (10-15 Mins Lite Green)
           - Highlight Green: #12A82C
           - Pure Crisp White: #FFFFFF
           ============================================================ */

        .cinematic-banner-stage {
          perspective: 1200px;
          perspective-origin: 50% 50%;
        }

        .cinematic-3d-card {
          transform-style: preserve-3d;
          border-radius: 24px;
          will-change: transform, box-shadow, border-color;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      box-shadow 0.3s ease-out,
                      border-color 0.25s ease-out;
        }

        /* Banner 1: Fresh Green & White Canvas */
        .banner-farm-fresh {
          background: linear-gradient(135deg, #0C831F 0%, #10A529 50%, #0B751C 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 16px 36px -10px rgba(12, 131, 31, 0.32),
                      0 4px 12px rgba(0, 0, 0, 0.05),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4);
        }

        .banner-farm-fresh:hover,
        .banner-farm-fresh.is-hovered {
          border-color: rgba(255, 255, 255, 0.85);
          box-shadow: 0 20px 48px -8px rgba(12, 131, 31, 0.45),
                      0 0 32px rgba(16, 185, 55, 0.4),
                      inset 0 1.5px 3px rgba(255, 255, 255, 0.6);
        }

        /* Banner 2: Crisp Snack Studio Green & White Canvas */
        .banner-snacks-studio {
          background: linear-gradient(135deg, #0A7A1B 0%, #0E9B24 50%, #086B17 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 16px 36px -10px rgba(12, 131, 31, 0.32),
                      0 4px 12px rgba(0, 0, 0, 0.05),
                      inset 0 1.5px 2px rgba(255, 255, 255, 0.4);
        }

        .banner-snacks-studio:hover,
        .banner-snacks-studio.is-hovered {
          border-color: rgba(255, 255, 255, 0.85);
          box-shadow: 0 20px 48px -8px rgba(12, 131, 31, 0.45),
                      0 0 32px rgba(16, 185, 55, 0.4),
                      inset 0 1.5px 3px rgba(255, 255, 255, 0.6);
        }

        /* CINEMATIC ENTRANCE TIMELINES */
        /* Left Card: Fly-in from Top (-80px) */
        @keyframes flyInFromTop {
          0% {
            opacity: 0;
            transform: translate3d(0, -80px, 35px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 35px);
            filter: blur(0px);
          }
        }

        /* Right Card: Fly-in from Right (+120px) */
        @keyframes flyInFromRight {
          0% {
            opacity: 0;
            transform: translate3d(120px, 0, 35px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 35px);
            filter: blur(0px);
          }
        }

        .entrance-top-active {
          animation: flyInFromTop 0.95s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          will-change: transform, opacity, filter;
        }

        .entrance-right-active {
          animation: flyInFromRight 0.95s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          will-change: transform, opacity, filter;
        }

        /* Settle Physics: Weightless floating idle motion after entrance */
        @keyframes gentleWeightlessFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -6px, 0) rotate(0.4deg);
          }
        }

        @keyframes gentleChipFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(2px, -6px, 0) rotate(2deg);
          }
        }

        .anim-idle-float {
          animation: gentleWeightlessFloat 5s ease-in-out infinite;
          will-change: transform;
        }

        .anim-chip-idle {
          animation: gentleChipFloat 4.6s ease-in-out infinite;
          will-change: transform;
        }

        /* Reduced motion compliance */
        @media (prefers-reduced-motion: reduce) {
          .entrance-top-active,
          .entrance-right-active,
          .anim-idle-float,
          .anim-chip-idle {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>

      {/* 50/50 Split Balanced Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
        {/* ========================================================
            BANNER ONE: “Nature’s Best. At Your Door.” (Freshness)
            ======================================================== */}
        <div
          className="cinematic-banner-stage group"
          onMouseMove={handleMouseMoveB1}
          onMouseLeave={handleMouseLeaveB1}
        >
          <div
            className={`cinematic-3d-card banner-farm-fresh relative p-4 sm:p-5 lg:p-6 min-h-[195px] sm:min-h-[225px] lg:min-h-[240px] flex items-center justify-between overflow-hidden cursor-pointer ${
              b1Mouse.isHovered ? 'is-hovered' : ''
            }`}
            style={{
              transform: `rotateX(${b1TiltX}deg) rotateY(${b1TiltY}deg)`,
            }}
          >
            {/* Clean White Fluid Abstract Wave Pattern Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,80 C160,180 340,10 600,110 L600,300 L0,300 Z"
                fill="url(#waveWhiteB1_1)"
              />
              <path
                d="M0,180 C180,70 380,240 600,150 L600,300 L0,300 Z"
                fill="url(#waveWhiteB1_2)"
              />
              <defs>
                <linearGradient id="waveWhiteB1_1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="waveWhiteB1_2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Dynamic mouse specular sheen reflection */}
            {b1Mouse.isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(550px circle at ${b1Mouse.x * 100}% ${b1Mouse.y * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`,
                }}
              />
            )}

            {/* Content & Typography Plate (Sharp Crisp White) */}
            <div
              className="space-y-2.5 sm:space-y-3.5 z-20 max-w-[55%] sm:max-w-[48%] flex flex-col justify-center relative pointer-events-none"
              style={{
                transform: `translate3d(${b1ParallaxX * 4}px, ${b1ParallaxY * 4}px, 30px)`,
                transition: b1Mouse.isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
              }}
            >
              {/* Eyebrow: FRESHNESS, REIMAGINED */}
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/20 border border-white/40 shadow-xs backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-white">
                  FRESHNESS, REIMAGINED
                </span>
              </div>

              {/* Headline: Sharp Crisp White */}
              <h3 className="text-xl sm:text-2xl lg:text-[27px] font-black leading-[1.18] text-white tracking-tight drop-shadow-sm">
                Nature’s Best. At Your Door.
              </h3>

              {/* Supporting Text: Sharp High-Contrast Crisp White */}
              <p className="text-xs sm:text-[13px] text-white font-medium leading-relaxed line-clamp-2">
                Farm-fresh essentials, delivered in minutes.
              </p>

              {/* CTA Button: Pure White Pill with Brand Green Text */}
              <div className="pt-1.5 pointer-events-auto">
                <Link
                  to="/lite/categories/fruits-vegetables"
                  aria-label="Explore Fresh Picks"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#0C831F] font-black text-xs sm:text-[13px] shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-[#F2FAF4] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group/btn"
                >
                  <span>Explore Fresh Picks</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0C831F] group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* 3D Art-Directed Farm Produce Scene with Fly-in Entrance Physics */}
            <div
              className="relative w-32 h-32 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center shrink-0 z-10 pointer-events-none select-none"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Product graphic container with Layer Separation in 3D space */}
              <div
                className={`relative z-30 w-full h-full flex items-center justify-center transition-transform duration-250 ease-out ${
                  hasEntered ? 'entrance-top-active' : ''
                }`}
                style={{
                  opacity: hasEntered ? 1 : 0,
                  transform: !hasEntered
                    ? 'translate3d(0, -80px, 40px)'
                    : b1Mouse.isHovered
                    ? `translate3d(${b1ParallaxX * 12}px, ${b1ParallaxY * 12}px, 60px) scale(1.08)`
                    : 'translate3d(0, 0, 40px) scale(1)',
                  filter: !hasEntered ? 'blur(8px)' : 'blur(0px)',
                  transition: hasEntered
                    ? 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                }}
              >
                {/* Weightless Floating Idle Wrapper */}
                <div className={`${hasEntered ? 'anim-idle-float' : ''} w-full h-full flex items-center justify-center`}>
                  <img
                    src="/images/banners/farm_groceries_hero.png"
                    alt="Farm-fresh dairy milk bottle, Honeycrisp apples, avocados, broccoli, and oranges"
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)] pointer-events-none"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('fruits_transparent.png')) {
                        target.src = '/images/banners/fruits_transparent.png';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            BANNER TWO: “Little Treats. Big Moments.” (Snacks & Beverages)
            ======================================================== */}
        <div
          className="cinematic-banner-stage group"
          onMouseMove={handleMouseMoveB2}
          onMouseLeave={handleMouseLeaveB2}
        >
          <div
            className={`cinematic-3d-card banner-snacks-studio relative p-4 sm:p-5 lg:p-6 min-h-[195px] sm:min-h-[225px] lg:min-h-[240px] flex items-center justify-between overflow-hidden cursor-pointer ${
              b2Mouse.isHovered ? 'is-hovered' : ''
            }`}
            style={{
              transform: `rotateX(${b2TiltX}deg) rotateY(${b2TiltY}deg)`,
            }}
          >
            {/* Clean White Fluid Abstract Wave Pattern Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0,70 C190,190 320,20 600,100 L600,300 L0,300 Z"
                fill="url(#waveWhiteB2_1)"
              />
              <path
                d="M0,170 C160,60 390,230 600,140 L600,300 L0,300 Z"
                fill="url(#waveWhiteB2_2)"
              />
              <defs>
                <linearGradient id="waveWhiteB2_1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="waveWhiteB2_2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Dynamic mouse specular sheen reflection */}
            {b2Mouse.isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={{
                  background: `radial-gradient(550px circle at ${b2Mouse.x * 100}% ${b2Mouse.y * 100}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`,
                }}
              />
            )}

            {/* Content & Typography Plate (Sharp Crisp White) */}
            <div
              className="space-y-2.5 sm:space-y-3.5 z-20 max-w-[55%] sm:max-w-[48%] flex flex-col justify-center relative pointer-events-none"
              style={{
                transform: `translate3d(${b2ParallaxX * 4}px, ${b2ParallaxY * 4}px, 30px)`,
                transition: b2Mouse.isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
              }}
            >
              {/* Eyebrow: CURATED INDULGENCE */}
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/20 border border-white/40 shadow-xs backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FFFFFF]" />
                <span className="text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-white">
                  CURATED INDULGENCE
                </span>
              </div>

              {/* Headline: Sharp Crisp White */}
              <h3 className="text-xl sm:text-2xl lg:text-[27px] font-black leading-[1.18] text-white tracking-tight drop-shadow-sm">
                Little Treats. Big Moments.
              </h3>

              {/* Supporting Text: Sharp High-Contrast Crisp White */}
              <p className="text-xs sm:text-[13px] text-white font-medium leading-relaxed line-clamp-2">
                Discover your favorite snacks and refreshing drinks.
              </p>

              {/* CTA Button: Pure White Pill with Brand Green Text */}
              <div className="pt-1.5 pointer-events-auto">
                <Link
                  to="/lite/categories/snacks-beverages"
                  aria-label="Explore Snacks"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#0C831F] font-black text-xs sm:text-[13px] shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-[#F2FAF4] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 group/btn"
                >
                  <span>Explore Snacks</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#0C831F] group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* 3D Art-Directed Snack Scene with Fly-in Entrance Physics from Right */}
            <div
              className="relative w-32 h-32 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center shrink-0 z-10 pointer-events-none select-none"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Product graphic container with Layer Separation in 3D space */}
              <div
                className={`relative z-30 w-full h-full flex items-center justify-center transition-transform duration-250 ease-out ${
                  hasEntered ? 'entrance-right-active' : ''
                }`}
                style={{
                  opacity: hasEntered ? 1 : 0,
                  transform: !hasEntered
                    ? 'translate3d(120px, 0, 40px)'
                    : b2Mouse.isHovered
                    ? `translate3d(${b2ParallaxX * 12}px, ${b2ParallaxY * 12}px, 60px) scale(1.08)`
                    : 'translate3d(0, 0, 40px) scale(1)',
                  filter: !hasEntered ? 'blur(8px)' : 'blur(0px)',
                  transition: hasEntered
                    ? 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)'
                    : 'none',
                }}
              >
                {/* Weightless Floating Idle Wrapper */}
                <div className={`${hasEntered ? 'anim-idle-float' : ''} w-full h-full flex items-center justify-center relative`}>
                  <img
                    src="/images/banners/snacks_beverage_hero.png"
                    alt="Chilled craft cola beverage with condensation droplets, golden kettle chips bag, and chocolate chip cookies"
                    className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)] pointer-events-none"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('banner_3d_snacks_munchies.png')) {
                        target.src = '/images/banners/banner_3d_snacks_munchies.png';
                      }
                    }}
                  />

                  {/* Foreground 3D Floating Golden Potato Chip */}
                  <div
                    className={`${hasEntered ? 'anim-chip-idle' : ''} absolute -bottom-2 -left-2 sm:-left-4 w-16 h-16 sm:w-20 sm:h-20 z-30 pointer-events-none`}
                    style={{
                      transform: b2Mouse.isHovered
                        ? `translate3d(${b2ParallaxX * 18}px, ${b2ParallaxY * 18}px, 60px) scale(1.06)`
                        : 'translate3d(0, 0, 50px)',
                      transition: b2Mouse.isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
                    }}
                  >
                    <img
                      src="/images/banners/golden_chip_3d.png"
                      alt="Gourmet ridged golden potato chip"
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] pointer-events-none"
                      loading="eager"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaatzaLiteDualPromoBanners;
