/**
 * ============================================================================
 * HAATZA SHOPPING - CENTRALIZED TYPOGRAPHY CONFIGURATION
 * File: src/theme/typography.ts
 * 
 * Central Source of Truth for Font Families, Font Weights, Line Heights,
 * Hierarchy Styles, Named Scale (pageTitle, sectionHeading, productPrice, etc.),
 * Bicolor Blue-and-Black Heading System, and Decorative Heading Effects.
 * ============================================================================
 */

import React from 'react';

export interface TypographyStyleDefinition {
  fontFamily: string;
  fontSize: string;
  fontWeight: number | string;
  lineHeight: string | number;
  letterSpacing?: string;
  color?: string;
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase';
  className: string;
}

export interface TypographySystem {
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  weights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  };
  styles: {
    pageTitle: TypographyStyleDefinition;
    sectionHeading: TypographyStyleDefinition;
    subheading: TypographyStyleDefinition;
    description: TypographyStyleDefinition;
    body: TypographyStyleDefinition;
    bodyBold: TypographyStyleDefinition;
    navigation: TypographyStyleDefinition;
    button: TypographyStyleDefinition;
    input: TypographyStyleDefinition;
    placeholder: TypographyStyleDefinition;
    productTitle: TypographyStyleDefinition;
    productPrice: TypographyStyleDefinition;
    productMrp: TypographyStyleDefinition;
    categoryTitle: TypographyStyleDefinition;
    caption: TypographyStyleDefinition;
    badge: TypographyStyleDefinition;
  };
}

/**
 * Baseline Typography System matching the existing HAATZA design specifications
 */
export const defaultTypography: TypographySystem = {
  fonts: {
    heading: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  styles: {
    // 01. Page Title (Top-level hero & department titles: standard 28px)
    pageTitle: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '1.75rem', // 28px
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.025em',
      color: '#1F1F1F',
      className: 'font-heading font-extrabold text-[28px] tracking-tight text-[#1F1F1F] leading-tight',
    },

    // 02. Section Heading (Canonical standard section heading across all pages: standard 22px)
    sectionHeading: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '1.375rem', // 22px
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#1F1F1F',
      className: 'font-heading font-extrabold text-[22px] tracking-tight text-[#1F1F1F] leading-tight',
    },

    // 03. Subheading (Block-level headers & subcategory titles: standard 18px)
    subheading: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '1.125rem', // 18px
      fontWeight: 700,
      lineHeight: 1.25,
      color: '#1F1F1F',
      className: 'font-heading font-bold text-[18px] text-[#1F1F1F] leading-snug',
    },

    // 04. Section Description / Subtitle: standard 14px
    description: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#555555',
      className: 'font-body font-normal text-sm text-[#555555] leading-relaxed',
    },

    // 05. General Body Content: standard 16px
    body: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#1F1F1F',
      className: 'font-body font-normal text-base text-[#1F1F1F] leading-normal',
    },

    // 06. Emphasized Body Text: standard 16px
    bodyBold: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.45,
      color: '#1F1F1F',
      className: 'font-body font-semibold text-base text-[#1F1F1F] leading-normal',
    },

    // 07. Navigation Item Labels (Navbar, category tabs)
    navigation: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '0.8125rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.01em',
      className: 'font-heading font-semibold text-xs sm:text-[13px] tracking-normal leading-tight text-[#1F1F1F]',
    },

    // 08. Buttons & Interactive Action Text
    button: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '0.8125rem',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.015em',
      className: 'font-heading font-bold text-xs sm:text-[13px] tracking-wide select-none',
    },

    // 09. Form Input Text
    input: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.25,
      color: '#1F1F1F',
      className: 'font-body font-medium text-xs sm:text-sm text-[#1F1F1F]',
    },

    // 10. Form Placeholder Text
    placeholder: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.25,
      color: '#555555',
      className: 'placeholder:font-body placeholder:text-xs sm:placeholder:text-sm placeholder:text-[#555555] placeholder:font-normal',
    },

    // 11. Product Card Title (Standard 14px with 2-line clamp)
    productTitle: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.25,
      color: '#1F1F1F',
      className: 'font-heading font-semibold text-sm text-[#1F1F1F] line-clamp-2 leading-snug',
    },

    // 12. Product Price (Standard 16px bold currency value)
    productPrice: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '1rem', // 16px
      fontWeight: 800,
      lineHeight: 1,
      color: '#1F1F1F',
      className: 'font-heading font-extrabold text-base text-[#1F1F1F]',
    },

    // 13. Product Strikethrough MRP
    productMrp: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1,
      color: '#555555',
      className: 'font-body font-normal text-xs text-[#555555] line-through',
    },

    // 14. Category Card & Circle Navigation Label
    categoryTitle: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '0.8125rem', // 13px
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1F1F1F',
      className: 'font-heading font-bold text-[13px] text-[#1F1F1F] line-clamp-1 leading-tight',
    },

    // 15. Helper / Caption / Legal text / Supporting text: standard 12px
    caption: {
      fontFamily: 'var(--haatza-font-body, "Inter")',
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#555555',
      className: 'font-body font-medium text-xs text-[#555555] leading-normal',
    },

    // 16. Badge / Pill Tag Typography
    badge: {
      fontFamily: 'var(--haatza-font-heading, "Plus Jakarta Sans")',
      fontSize: '0.6875rem', // 11px
      fontWeight: 800,
      lineHeight: 1,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      className: 'font-heading font-black text-[11px] tracking-wider uppercase leading-none',
    },
  },
};

/**
 * ============================================================================
 * HEADING COLOR SYSTEM: BLUE AND BLACK ARCHITECTURE
 * 
 * Supports:
 * 1. Entire heading in Black
 * 2. Entire heading in Blue
 * 3. Bicolor heading: Highlighted words in Blue, remaining words in Black
 * 4. Subtle Underline effect
 * 5. Animated Reveal / Shimmer effect for promotional headers
 * ============================================================================
 */

export interface BicolorHeadingOptions {
  highlightWords?: string[];
  colorMode?: 'default' | 'all-black' | 'all-blue' | 'highlight' | 'bicolor';
  accentEffect?: 'none' | 'subtle-underline' | 'shimmer' | 'hover-lift';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span';
}

/**
 * Formats a heading string into styled JSX parts according to the Blue-and-Black heading system.
 * By default, renders the entire heading in standard solid dark text (#1F1F1F).
 * Bicolor splitting is only applied if explicitly opted in with colorMode='bicolor'.
 */
export function formatBicolorHeading(
  text: string,
  options: BicolorHeadingOptions = {}
): React.ReactNode {
  const {
    highlightWords = [],
    colorMode = 'default',
    accentEffect = 'none',
    className = '',
  } = options;

  if (colorMode === 'all-black' || colorMode === 'default') {
    return React.createElement('span', { className: `text-[#1F1F1F] ${className}` }, text);
  }

  if (colorMode === 'all-blue') {
    return React.createElement('span', { className: `text-[#2962FF] ${className}` }, text);
  }

  // If colorMode is 'bicolor' or 'highlight', and highlightWords are provided:
  if ((colorMode === 'bicolor' || colorMode === 'highlight') && highlightWords && highlightWords.length > 0) {
    const words = text.split(/(\s+)/);
    const normalizedHighlights = new Set(highlightWords.map((w) => w.toLowerCase()));

    const elements = words.map((part, index) => {
      const cleanWord = part.replace(/[^\w]/g, '').toLowerCase();
      const isHighlighted = normalizedHighlights.has(cleanWord);

      if (isHighlighted) {
        let effectClass = 'text-[#2962FF] font-black';

        if (accentEffect === 'subtle-underline') {
          effectClass +=
            ' relative inline-block after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#2962FF]/60 after:rounded-full';
        } else if (accentEffect === 'shimmer') {
          effectClass +=
            ' bg-gradient-to-r from-[#1E40AF] via-[#2962FF] to-[#3B82F6] bg-clip-text text-transparent';
        }

        return React.createElement('span', { key: index, className: effectClass }, part);
      }

      return React.createElement('span', { key: index, className: 'text-[#1F1F1F]' }, part);
    });

    return React.createElement('span', { className }, elements);
  }

  return React.createElement('span', { className: `text-[#1F1F1F] ${className}` }, text);
}

/**
 * Injects typography CSS custom properties into :root for dynamic API adaptation
 */
export function applyTypography(typographyConfig: TypographySystem = defaultTypography): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const { fonts } = typographyConfig;

  root.style.setProperty('--haatza-font-heading', fonts.heading);
  root.style.setProperty('--haatza-font-body', fonts.body);
  root.style.setProperty('--haatza-font-mono', fonts.mono);
}

export default defaultTypography;

