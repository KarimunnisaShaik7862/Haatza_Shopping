import React from 'react';

export type SectionHighlightVariant =
  | 'limited-deals'
  | 'trending-fashion'
  | 'new-arrivals'
  | 'bestsellers'
  | 'suggested'
  | 'liked'
  | 'recently-viewed';

interface SectionHighlightArtworkProps {
  variant: SectionHighlightVariant;
  isVisible?: boolean;
  className?: string;
}

/**
 * SectionHighlightArtwork
 * 
 * Reusable, premium background artwork system for HAATZA Shopping discovery & promotional sections.
 * 
 * Design Principles:
 * - NO large background cards, bordered containers, or rectangular boxes.
 * - Tasteful SVG vector artwork, subtle gradients, and abstract shapes that blend naturally into #FFFFFF.
 * - Sits strictly behind or beside the heading area (pointer-events-none, -z-10).
 * - Pure Haatza blue-and-white theme (#2962FF, #1747CC, #F5F7FF, #FFFFFF).
 * - Full prefers-reduced-motion support.
 */
export const SectionHighlightArtwork: React.FC<SectionHighlightArtworkProps> = React.memo(({
  variant,
  isVisible = true,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {/* ---------------------------------------------------------------------
          1. LIMITED-TIME DEALS / HURRY DEALS (Rank 1: Strongest promotional highlight)
          - Wide blue-to-light-blue gradient sweep fading smoothly into pure white
          - Subtle diagonal light streaks
          - Abstract flowing vector ribbon curves
          - Optional one-time graceful light sweep
         --------------------------------------------------------------------- */}
      {variant === 'limited-deals' && (
        <div className="absolute inset-0">
          {/* Radial ambient glow focused along top-center */}
          <div
            className="absolute inset-x-0 top-0 h-[380px]"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 50% -10%, rgba(41, 98, 255, 0.085) 0%, rgba(245, 247, 255, 0.45) 45%, rgba(255, 255, 255, 0) 75%)',
            }}
          />

          {/* Diagonal laser light streaks fading into transparent */}
          <div
            className="absolute inset-x-0 top-0 h-[280px] opacity-70"
            style={{
              background:
                'linear-gradient(115deg, transparent 35%, rgba(41, 98, 255, 0.035) 45%, rgba(255, 255, 255, 0.6) 50%, rgba(41, 98, 255, 0.035) 55%, transparent 65%)',
            }}
          />

          {/* Flowing abstract wave curves behind heading and right header zone */}
          <svg
            className="absolute top-0 right-0 w-[560px] h-[220px] max-w-[85vw] text-[#2962FF]"
            viewBox="0 0 560 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="dealsGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2962FF" stopOpacity="0.08" />
                <stop offset="60%" stopColor="#2962FF" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#2962FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="dealsGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2962FF" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#2962FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M120 0C240 80 380 40 560 140V0H120Z"
              fill="url(#dealsGrad1)"
            />
            <path
              d="M0 0C180 110 360 70 560 190V0H0Z"
              fill="url(#dealsGrad2)"
            />
            {/* Subtle dynamic contour line */}
            <path
              d="M20 20C190 120 370 85 560 200"
              stroke="#2962FF"
              strokeWidth="1.5"
              strokeOpacity="0.12"
              strokeDasharray="4 4"
            />
          </svg>

          {/* One-time elegant light sweep across top section */}
          {isVisible && (
            <div className="absolute top-0 left-0 w-1/3 h-[180px] haatza-deals-sweep pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(41, 98, 255, 0.06) 50%, transparent 100%)',
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------
          2. TRENDING FASHION (Rank 2: Strong visual highlight)
          - Fashion-editorial background curves & subtle drape paths
          - Soft directional blue wash behind heading
          - Clean open white space preserving fashion magazine elegance
         --------------------------------------------------------------------- */}
      {variant === 'trending-fashion' && (
        <div className="absolute inset-0">
          {/* Directional wash behind heading */}
          <div
            className="absolute left-0 top-0 w-[520px] h-[300px] max-w-[80vw]"
            style={{
              background:
                'radial-gradient(ellipse 65% 50% at 20% 25%, rgba(41, 98, 255, 0.065) 0%, rgba(245, 247, 255, 0.3) 45%, transparent 70%)',
            }}
          />

          {/* Fashion-editorial flowing bezier curves */}
          <svg
            className="absolute top-0 left-0 w-[640px] h-[240px] max-w-[90vw]"
            viewBox="0 0 640 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fashionCurveGrad" x1="0%" y1="0%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#2962FF" stopOpacity="0.14" />
                <stop offset="50%" stopColor="#2962FF" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#2962FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M-40 40C120 180 280 60 480 180C540 215 590 230 640 240"
              stroke="url(#fashionCurveGrad)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M-20 80C140 210 300 90 510 210"
              stroke="url(#fashionCurveGrad)"
              strokeWidth="1.25"
              strokeDasharray="6 6"
              fill="none"
            />
            <path
              d="M0 0C100 120 220 50 380 120C480 165 560 170 640 160V0H0Z"
              fill="url(#fashionCurveGrad)"
              fillOpacity="0.25"
            />
          </svg>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          3. FRESH NEW ARRIVALS (Rank 3: Elegant, fresh highlight)
          - Delicate fresh ripple arcs and dawn horizon paths
          - Soft horizontal ambient glow behind the heading
          - Light, clean, modern
         --------------------------------------------------------------------- */}
      {variant === 'new-arrivals' && (
        <div className="absolute inset-0">
          {/* Soft ambient glow behind heading */}
          <div
            className="absolute left-0 top-0 w-[480px] h-[260px] max-w-[75vw]"
            style={{
              background:
                'radial-gradient(ellipse 55% 45% at 25% 25%, rgba(41, 98, 255, 0.05) 0%, transparent 70%)',
            }}
          />

          {/* Fresh ripple arcs in SVG */}
          <svg
            className="absolute top-0 left-0 w-[500px] h-[200px] max-w-[85vw]"
            viewBox="0 0 500 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="120"
              cy="40"
              r="100"
              stroke="#2962FF"
              strokeWidth="1"
              strokeOpacity="0.05"
              fill="none"
            />
            <circle
              cx="120"
              cy="40"
              r="160"
              stroke="#2962FF"
              strokeWidth="1"
              strokeOpacity="0.035"
              strokeDasharray="4 6"
              fill="none"
            />
            <path
              d="M20 120C140 60 280 160 460 100"
              stroke="#2962FF"
              strokeWidth="1.5"
              strokeOpacity="0.07"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          4. BESTSELLER FAVORITES (Rank 4: Medium visual highlight)
          - Subtle abstract spotlight radiating from top behind heading
          - Minimal concentric circular laurel arcs
          - Trustworthy and dignified
         --------------------------------------------------------------------- */}
      {variant === 'bestsellers' && (
        <div className="absolute inset-0">
          {/* Spotlight beam from top-left */}
          <div
            className="absolute left-0 top-0 w-[500px] h-[280px] max-w-[80vw]"
            style={{
              background:
                'radial-gradient(ellipse 50% 60% at 28% 0%, rgba(41, 98, 255, 0.06) 0%, rgba(41, 98, 255, 0.015) 50%, transparent 80%)',
            }}
          />

          {/* Minimal arch rays in SVG */}
          <svg
            className="absolute top-0 left-0 w-[460px] h-[200px] max-w-[80vw]"
            viewBox="0 0 460 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-20 0C60 90 180 140 340 140C390 140 430 135 460 125"
              stroke="#2962FF"
              strokeWidth="1.5"
              strokeOpacity="0.06"
              fill="none"
            />
            <path
              d="M0 0C80 70 190 110 320 110"
              stroke="#2962FF"
              strokeWidth="1"
              strokeOpacity="0.04"
              strokeDasharray="5 5"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          5. SUGGESTED FOR YOU (Rank 5: Subtle personalized highlight)
          - Intersecting elliptical wave orbits in faint blue
          - Soft blurred ambient orb behind title
          - Understated so products remain the clear hero
         --------------------------------------------------------------------- */}
      {variant === 'suggested' && (
        <div className="absolute inset-0">
          {/* Soft ambient orb */}
          <div
            className="absolute left-[5%] top-[10%] w-[380px] h-[200px] max-w-[65vw]"
            style={{
              background:
                'radial-gradient(circle at 30% 40%, rgba(41, 98, 255, 0.045) 0%, transparent 65%)',
            }}
          />

          {/* Smart recommendation elliptical orbital paths */}
          <svg
            className="absolute top-0 left-0 w-[480px] h-[190px] max-w-[80vw]"
            viewBox="0 0 480 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="140"
              cy="50"
              rx="180"
              ry="70"
              transform="rotate(-8 140 50)"
              stroke="#2962FF"
              strokeWidth="1.25"
              strokeOpacity="0.045"
              fill="none"
            />
            <ellipse
              cx="160"
              cy="65"
              rx="220"
              ry="85"
              transform="rotate(6 160 65)"
              stroke="#2962FF"
              strokeWidth="1"
              strokeOpacity="0.03"
              strokeDasharray="4 6"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          6. LIKED BY YOU (Rank 6: Subtle personal highlight)
          - Continuous single-line heart vector contour gently woven behind heading
          - Softest ambient warmth fading out seamlessly
          - Never boxed
         --------------------------------------------------------------------- */}
      {variant === 'liked' && (
        <div className="absolute inset-0">
          {/* Subtle warmth */}
          <div
            className="absolute left-[3%] top-0 w-[400px] h-[220px] max-w-[70vw]"
            style={{
              background:
                'radial-gradient(circle at 25% 35%, rgba(41, 98, 255, 0.04) 0%, transparent 65%)',
            }}
          />

          {/* Faint heart-inspired continuous-line vector art contour */}
          <svg
            className="absolute top-0 left-0 w-[420px] h-[190px] max-w-[80vw]"
            viewBox="0 0 420 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-20 70C20 40 60 20 100 20C135 20 160 40 175 60C190 40 215 20 250 20C295 20 330 55 315 105C300 145 220 180 175 190C140 180 80 150 40 110"
              stroke="#2962FF"
              strokeWidth="1.5"
              strokeOpacity="0.065"
              fill="none"
            />
            <path
              d="M175 60C175 120 220 160 270 175"
              stroke="#2962FF"
              strokeWidth="1"
              strokeOpacity="0.035"
              strokeDasharray="3 5"
              fill="none"
            />
          </svg>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          7. RECENTLY VIEWED BY YOU (Rank 7: Minimal highlight)
          - Most minimal treatment
          - Very faint linear gradient line & delicate browsing/time arc
          - Preserves open, airy, ultra-clean white layout
         --------------------------------------------------------------------- */}
      {variant === 'recently-viewed' && (
        <div className="absolute inset-0">
          {/* Faint horizontal gradient strip */}
          <div
            className="absolute left-0 top-0 w-[420px] h-[160px] max-w-[70vw]"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(41, 98, 255, 0.03) 0%, transparent 70%)',
            }}
          />

          {/* Minimal circular history arc */}
          <svg
            className="absolute top-0 left-0 w-[380px] h-[160px] max-w-[75vw]"
            viewBox="0 0 380 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 110A75 75 0 0 1 180 35A75 75 0 0 1 255 110"
              stroke="#2962FF"
              strokeWidth="1.25"
              strokeOpacity="0.035"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle
              cx="180"
              cy="35"
              r="2.5"
              fill="#2962FF"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      )}
    </div>
  );
});

SectionHighlightArtwork.displayName = 'SectionHighlightArtwork';

export default SectionHighlightArtwork;

