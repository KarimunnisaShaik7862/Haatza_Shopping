import React from 'react';

interface HaatzaAILogoProps {
  className?: string;
  size?: number;
  color?: string;
  sparkleColor?: string;
  showBadge?: boolean;
}

/**
 * HaatzaAILogo - Custom AI assistant logo inspired by the official Haatza typography.
 * Combines the signature bold geometric "H" letterform with an intelligent AI sparkle emblem.
 */
export const HaatzaAILogo: React.FC<HaatzaAILogoProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  sparkleColor = '#00E676',
  showBadge = false,
}) => {
  if (showBadge) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="haatzaBadgeGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#00C853" />
          </linearGradient>
        </defs>

        {/* Squircle Badge Background inspired by official Haatza blue icon */}
        <rect width="48" height="48" rx="13" fill="url(#haatzaBadgeGrad)" />

        {/* Haatza "H" - Left pillar */}
        <rect x="11" y="13" width="7" height="23" rx="3.5" fill="#FFFFFF" />

        {/* Haatza "H" - Right pillar */}
        <rect x="25" y="13" width="7" height="23" rx="3.5" fill="#FFFFFF" />

        {/* Haatza "H" - Crossbar */}
        <rect x="13" y="21.5" width="17" height="6" rx="2" fill="#FFFFFF" />

        {/* AI Sparkle Star on top-right */}
        <path
          d="M36 4C36 7.5 38.2 9.5 41.5 9.5C38.2 9.5 36 11.5 36 15C36 11.5 33.8 9.5 30.5 9.5C33.8 9.5 36 7.5 36 4Z"
          fill={sparkleColor}
        />
        <circle cx="43" cy="16" r="1.5" fill="#FFFFFF" opacity="0.9" />
      </svg>
    );
  }

  // Pure Vector Glyph (for circular launcher, header, tooltips)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Signature Haatza "H" */}
      {/* Left pillar */}
      <rect x="4" y="8" width="5.5" height="17" rx="2.75" fill={color} />

      {/* Right pillar */}
      <rect x="16" y="8" width="5.5" height="17" rx="2.75" fill={color} />

      {/* Crossbar */}
      <rect x="6.5" y="14" width="12.5" height="4.5" rx="1.5" fill={color} />

      {/* AI Sparkle Star on top-right */}
      <path
        d="M24 2C24 4.8 25.8 6.5 28.5 6.5C25.8 6.5 24 8.2 24 11C24 8.2 22.2 6.5 19.5 6.5C22.2 6.5 24 4.8 24 2Z"
        fill={sparkleColor}
      />
      <circle cx="29.5" cy="11.5" r="1" fill={sparkleColor} opacity="0.9" />
    </svg>
  );
};

export default HaatzaAILogo;
