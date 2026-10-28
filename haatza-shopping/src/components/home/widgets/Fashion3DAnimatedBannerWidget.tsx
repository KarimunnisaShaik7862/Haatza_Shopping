import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import homePageGirlImg from '../../../assets/images/banners/home-page-girl.png';

export interface Fashion3DPromoSlide {
  id: string;
  headline: string;
  secondLine: string;
  description: string;
  supportingText: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
}

export const defaultFashion3DSlides: Fashion3DPromoSlide[] = [
  {
    id: 'fashion-slide-1',
    headline: 'TRENDING FASHION',
    secondLine: 'STARTS BELOW — CHECK IT OUT',
    description: 'Your favourite styles, exciting finds, and everyday essentials at prices you’ll love.',
    supportingText: 'Discover your next favourite. Shop the trends today.',
    ctaText: 'Shop Trending Fashion',
    ctaLink: '/category/all',
    badge: 'NEW SEASON DROP',
  },
  {
    id: 'fashion-slide-2',
    headline: '₹49 TRENDING STORE',
    secondLine: 'GREAT FINDS. SMALL PRICES.',
    description: 'Explore trending picks and give your everyday style a fresh upgrade.',
    supportingText: 'Your next favourite is waiting below.',
    ctaText: 'Explore ₹49 Store',
    ctaLink: '/category/under-49',
    badge: 'BUDGET FINDS',
  },
  {
    id: 'fashion-slide-3',
    headline: 'BIG DEALS',
    secondLine: 'BIGGER STYLE',
    description: 'Find fresh looks, exciting offers, and must-have essentials all in one place.',
    supportingText: 'Scroll down. Discover more. Shop your favourites.',
    ctaText: 'Discover Big Deals',
    ctaLink: '/category/deals',
    badge: 'LIMITED TIME',
  },
  {
    id: 'fashion-slide-4',
    headline: 'YOUR NEXT FAVOURITE',
    secondLine: 'IS JUST BELOW',
    description: 'From everyday essentials to trending styles, discover something you’ll love.',
    supportingText: 'Explore HAATZA Shopping now.',
    ctaText: 'Browse All Collections',
    ctaLink: '/category/all',
    badge: 'CURATED PICKS',
  },
];

type TransitionPhase = 'idle' | 'exiting' | 'entering';

interface Fashion3DAnimatedBannerWidgetProps {
  slides?: Fashion3DPromoSlide[];
  intervalMs?: number;
  className?: string;
}

export const Fashion3DAnimatedBannerWidget: React.FC<Fashion3DAnimatedBannerWidgetProps> = ({
  slides = defaultFashion3DSlides,
  intervalMs = 2000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<TransitionPhase>('idle');
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 3D Flip transition orchestrator (Snappy 2-second cycle with infinite loop from last back to first)
  const nextSlide = useCallback(() => {
    if (prefersReducedMotion) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      return;
    }

    // Phase 1: Fast outgoing 3D rotation away (220ms)
    setPhase('exiting');

    setTimeout(() => {
      // Phase 2: Switch slide (infinite loop: last -> first) & start 3D entrance (280ms)
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setPhase('entering');

      setTimeout(() => {
        // Phase 3: Settle into resting state
        setPhase('idle');
      }, 280);
    }, 220);
  }, [slides.length, prefersReducedMotion]);

  // Autoplay management: triggers continuously every 2 seconds in an infinite loop
  useEffect(() => {
    if (isPaused || slides.length <= 1 || phase !== 'idle') return;

    // Remaining visible idle time within the 2-second cycle: ~1500ms
    const idleDuration = Math.max(800, intervalMs - 500);
    const timer = setTimeout(() => {
      nextSlide();
    }, idleDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, intervalMs, slides.length, nextSlide, phase]);

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <section
      aria-label="Trending Fashion 3D Promotional Spotlight"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`relative w-full overflow-hidden py-4 sm:py-6 lg:py-8 ${className}`}
    >
      {/* Scoped CSS for realistic 3D Extrusion & 3D Flip Keyframes */}
      <style>{`
        /* 3D Extruded Layered Shadows */
        .haatza-3d-headline {
          color: #0F172A;
          text-shadow:
            1px 1px 0px #cbd5e1,
            2px 2px 0px #94a3b8,
            3px 3px 0px #64748b,
            4px 4px 0px #334155,
            5px 7px 18px rgba(15, 23, 42, 0.22);
        }

        .haatza-3d-secondline {
          color: #2563EB;
          text-shadow:
            1px 1px 0px #93c5fd,
            2px 2px 0px #3b82f6,
            3px 3px 0px #1d4ed8,
            4px 6px 16px rgba(37, 99, 235, 0.32);
        }

        /* 3D Perspective Rotation Stages */
        .haatza-flip-stage {
          perspective: 1200px;
          perspective-origin: 50% 50%;
          transform-style: preserve-3d;
        }

        /* Keyframes for Outgoing 3D Flip Away */
        @keyframes haatza3dFlipOutTop {
          0% {
            transform: perspective(1200px) rotateX(0deg) translateY(0px) translateZ(0px);
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            transform: perspective(1200px) rotateX(75deg) translateY(-26px) translateZ(40px);
            opacity: 0;
            filter: blur(2px);
          }
        }

        @keyframes haatza3dFlipOutBottom {
          0% {
            transform: perspective(1200px) rotateX(0deg) translateY(0px) translateZ(0px);
            opacity: 1;
          }
          100% {
            transform: perspective(1200px) rotateX(60deg) translateY(-18px) translateZ(25px);
            opacity: 0;
          }
        }

        @keyframes haatzaFadeOutDesc {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(-12px);
            opacity: 0;
          }
        }

        /* Keyframes for Incoming 3D Flip In (With Staggered Timing) */
        @keyframes haatza3dFlipInHeadline {
          0% {
            transform: perspective(1200px) rotateX(-75deg) translateY(26px) translateZ(40px);
            opacity: 0;
            filter: blur(2px);
          }
          100% {
            transform: perspective(1200px) rotateX(0deg) translateY(0px) translateZ(0px);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes haatza3dFlipInSecondLine {
          0% {
            transform: perspective(1200px) rotateX(-65deg) translateY(20px) translateZ(30px);
            opacity: 0;
            filter: blur(1.5px);
          }
          100% {
            transform: perspective(1200px) rotateX(0deg) translateY(0px) translateZ(0px);
            opacity: 1;
            filter: blur(0px);
          }
        }

        @keyframes haatzaFadeInDesc {
          0% {
            transform: translateY(14px);
            opacity: 0;
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @keyframes haatzaFadeInSupport {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        /* Animation class triggers based on state (Tuned for snappy 2s cycle) */
        .anim-exit-headline {
          animation: haatza3dFlipOutTop 0.22s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .anim-exit-secondline {
          animation: haatza3dFlipOutBottom 0.22s cubic-bezier(0.4, 0, 0.2, 1) 0.02s forwards;
        }
        .anim-exit-desc {
          animation: haatzaFadeOutDesc 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.04s forwards;
        }
        .anim-exit-support {
          animation: haatzaFadeOutDesc 0.18s ease-in 0.05s forwards;
        }

        .anim-enter-headline {
          animation: haatza3dFlipInHeadline 0.28s cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards;
        }
        .anim-enter-secondline {
          animation: haatza3dFlipInSecondLine 0.28s cubic-bezier(0.16, 1, 0.3, 1) 40ms forwards;
        }
        .anim-enter-desc {
          animation: haatzaFadeInDesc 0.26s cubic-bezier(0.16, 1, 0.3, 1) 80ms forwards;
        }
        .anim-enter-support {
          animation: haatzaFadeInSupport 0.24s ease-out 120ms forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .anim-exit-headline,
          .anim-exit-secondline,
          .anim-exit-desc,
          .anim-exit-support,
          .anim-enter-headline,
          .anim-enter-secondline,
          .anim-enter-desc,
          .anim-enter-support {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Main Content Layout (Sitting directly on the page background with NO boxes or cards) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px]">
          {/* =========================================================================
              01. LEFT: STATIONARY GIRL IMAGE
              - Preserves exact original image proportions & appearance
              - No zoom, no movement, no parallax, no animation
              - No card, no frame, no border, no background box
              ========================================================================= */}
          <div className="w-full lg:w-[42%] xl:w-[40%] shrink-0 flex items-end justify-center lg:justify-start pointer-events-none select-none">
            <img
              src={homePageGirlImg}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/banners/home-page-girl.png';
              }}
              alt="HAATZA Fashion — Trending Collection"
              className="h-[360px] sm:h-[420px] md:h-[480px] lg:h-[530px] xl:h-[560px] w-auto max-w-none object-contain select-none pointer-events-none -ml-6 sm:-ml-10 lg:-ml-14"
              loading="eager"
            />
          </div>

          {/* =========================================================================
              02. RIGHT: LARGE 3D PROMOTIONAL TYPOGRAPHY (WITH 3D FLIP TRANSITION)
              - Sits directly on page background
              - 3D Extruded layered shadows on the text
              - Staggered entrance timing
              - Clean, spacious visual hierarchy
              ========================================================================= */}
          <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col justify-center py-4 lg:py-8 pl-0 lg:pl-2 text-left haatza-flip-stage">
            {/* Badge / Spotlight Tag */}
            <div
              className={`mb-3 sm:mb-4 flex items-center gap-2 ${
                phase === 'exiting' ? 'anim-exit-support' : phase === 'entering' ? 'anim-enter-support' : ''
              }`}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase bg-[#2962FF]/10 text-[#2962FF] border border-[#2962FF]/20">
                <Sparkles className="w-3.5 h-3.5" />
                {activeSlide.badge || 'EDITORIAL SPOTLIGHT'}
              </span>
            </div>

            {/* Line 1: Main Headline with 3D Depth */}
            <h2
              className={`haatza-3d-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black tracking-tight uppercase leading-[1.0] sm:leading-[0.95] font-heading ${
                phase === 'exiting' ? 'anim-exit-headline' : phase === 'entering' ? 'anim-enter-headline' : ''
              }`}
            >
              {activeSlide.headline}
            </h2>

            {/* Line 2: Second Line with Electric 3D Extrusion */}
            <h3
              className={`haatza-3d-secondline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide uppercase leading-tight sm:leading-snug mt-2 sm:mt-3 font-heading ${
                phase === 'exiting' ? 'anim-exit-secondline' : phase === 'entering' ? 'anim-enter-secondline' : ''
              }`}
            >
              {activeSlide.secondLine}
            </h3>

            {/* Short Description */}
            <p
              className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-slate-700 font-medium leading-relaxed max-w-xl font-sans ${
                phase === 'exiting' ? 'anim-exit-desc' : phase === 'entering' ? 'anim-enter-desc' : ''
              }`}
            >
              {activeSlide.description}
            </p>

            {/* Small Supporting Text & Interactive CTA */}
            <div
              className={`mt-4 sm:mt-6 flex flex-wrap items-center gap-4 ${
                phase === 'exiting' ? 'anim-exit-support' : phase === 'entering' ? 'anim-enter-support' : ''
              }`}
            >
              <Link
                to={activeSlide.ctaLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2962FF]" />
                {activeSlide.supportingText}
              </span>
            </div>

            {/* Subtle Slide Indicators */}
            <div className="mt-8 flex items-center gap-2 pointer-events-auto">
              {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={`indicator-${slide.id}`}
                    type="button"
                    onClick={() => {
                      if (idx !== currentIndex && phase === 'idle') {
                        setPhase('exiting');
                        setTimeout(() => {
                          setCurrentIndex(idx);
                          setPhase('entering');
                          setTimeout(() => setPhase('idle'), 280);
                        }, 220);
                      }
                    }}
                    aria-label={`Go to promotional message ${idx + 1}: ${slide.headline}`}
                    aria-current={isActive}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive ? 'w-8 bg-[#2962FF]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
