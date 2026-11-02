/**
 * ============================================================================
 * HAATZA SHOPPING - CENTRALIZED THEME CONFIGURATION
 * File: src/theme/theme.ts
 * 
 * Central Source of Truth for Visual Themes, Colors, Surfaces, Borders,
 * Shadows, Radii, Buttons, Inputs, Gradients, and Animations.
 * 
 * Designed for API-Driven Theme Adaptation:
 * API Response -> normalizeApiTheme() -> applyTheme() -> Live Website Styling
 * ============================================================================
 */

export interface ThemeColors {
  primary: {
    main: string;
    hover: string;
    light: string;
    surface: string;
    highlight: string;
    border: string;
  };
  secondary: {
    main: string;
    hover: string;
    light: string;
    surface: string;
  };
  brand: {
    red: string;
    redHover: string;
    redLight: string;
    dustyPink: string;
    blushPink: string;
    blushPinkLight: string;
  };
  status: {
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    info: string;
    infoLight: string;
  };
  surfaces: {
    page: string;
    surface: string;
    surfaceMuted: string;
    surfaceElevated: string;
    overlay: string;
    glassWhite: string;
    glassBlue: string;
  };
  text: {
    primary: string;
    heading: string;
    body: string;
    muted: string;
    subtle: string;
    inverted: string;
    accent: string;
  };
  borders: {
    default: string;
    subtle: string;
    highlight: string;
    dark: string;
    focus: string;
  };
  buttons: {
    primary: {
      bg: string;
      bgHover: string;
      text: string;
      border: string;
      shadow: string;
    };
    secondary: {
      bg: string;
      bgHover: string;
      text: string;
      border: string;
    };
    outline: {
      bg: string;
      bgHover: string;
      text: string;
      border: string;
    };
    danger: {
      bg: string;
      bgHover: string;
      text: string;
    };
  };
  inputs: {
    bg: string;
    text: string;
    placeholder: string;
    border: string;
    borderFocus: string;
    ringFocus: string;
  };
  cards: {
    bg: string;
    border: string;
    shadow: string;
    shadowHover: string;
  };
  accent: {
    blue: string;
    amber: string;
    emerald: string;
    rose: string;
    purple: string;
  };
  gradients: {
    primary: string;
    heroBlue: string;
    superSavings: string;
    crystalBadge: string;
    darkOverlay: string;
  };
}

export interface ThemeMetrics {
  radii: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  shadows: {
    none: string;
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    soft: string;
    softSm: string;
    softLg: string;
    cardLift: string;
    focusRing: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    timing: string;
    timingEase: string;
    cardHover: string;
  };
  layout: {
    containerMax: string;
    padMobile: string;
    padTablet: string;
    padDesktop: string;
    padXl: string;
  };
}

export interface WebsiteTheme {
  name: string;
  version: string;
  colors: ThemeColors;
  metrics: ThemeMetrics;
}

/**
 * Baseline Theme Specification matching existing HAATZA Shopping visual tokens
 */
export const defaultTheme: WebsiteTheme = {
  name: 'haatza-default-blue',
  version: '1.0.0',
  colors: {
    primary: {
      main: '#2962FF',
      hover: '#1747CC',
      light: '#F5F7FF',
      surface: '#EEF3FF',
      highlight: '#DBEAFE',
      border: '#E5E7EB',
    },
    secondary: {
      main: '#111827',
      hover: '#1F2937',
      light: '#F8FAFC',
      surface: '#F1F5F9',
    },
    brand: {
      red: '#A60000',
      redHover: '#880000',
      redLight: '#FFF5F5',
      dustyPink: '#D99A9A',
      blushPink: '#E8B8B8',
      blushPinkLight: '#FDF4F4',
    },
    status: {
      success: '#16A34A',
      successLight: '#DCFCE7',
      warning: '#F59E0B',
      warningLight: '#FEF3C7',
      error: '#DC2626',
      errorLight: '#FEE2E2',
      info: '#2563EB',
      infoLight: '#EFF6FF',
    },
    surfaces: {
      page: '#F7F9FC',
      surface: '#FFFFFF',
      surfaceMuted: '#F8FAFC',
      surfaceElevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.6)',
      glassWhite: 'rgba(255, 255, 255, 0.90)',
      glassBlue: 'rgba(238, 243, 255, 0.85)',
    },
    text: {
      primary: '#1F1F1F',
      heading: '#1F1F1F',
      body: '#334155',
      muted: '#555555',
      subtle: '#888888',
      inverted: '#FFFFFF',
      accent: '#2962FF',
    },
    borders: {
      default: '#E5E7EB',
      subtle: '#F1F5F9',
      highlight: '#DBEAFE',
      dark: '#CBD5E1',
      focus: '#2962FF',
    },
    buttons: {
      primary: {
        bg: '#2962FF',
        bgHover: '#1747CC',
        text: '#FFFFFF',
        border: 'transparent',
        shadow: '0 2px 4px rgba(41, 98, 255, 0.20)',
      },
      secondary: {
        bg: '#FFFFFF',
        bgHover: '#F8FAFC',
        text: '#172033',
        border: '#E5EAF3',
      },
      outline: {
        bg: 'transparent',
        bgHover: '#EEF3FF',
        text: '#2962FF',
        border: '#2962FF',
      },
      danger: {
        bg: '#DC2626',
        bgHover: '#B91C1C',
        text: '#FFFFFF',
      },
    },
    inputs: {
      bg: '#FFFFFF',
      text: '#172033',
      placeholder: '#94A3B8',
      border: '#E2E8F0',
      borderFocus: '#2962FF',
      ringFocus: '0 0 0 3px rgba(41, 98, 255, 0.14)',
    },
    cards: {
      bg: '#FFFFFF',
      border: '#E5EAF3',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      shadowHover: '0 20px 30px rgba(0, 0, 0, 0.12)',
    },
    accent: {
      blue: '#2962FF',
      amber: '#F59E0B',
      emerald: '#10B981',
      rose: '#F43F5E',
      purple: '#8B5CF6',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1E40AF 0%, #2962FF 100%)',
      heroBlue: 'linear-gradient(135deg, #0F2042 0%, #1E40AF 50%, #2962FF 100%)',
      superSavings: 'linear-gradient(to bottom, #FFFFFF 0%, #F0F9FF 50%, #0270E0 100%)',
      crystalBadge: 'linear-gradient(135deg, rgba(41, 98, 255, 0.10) 0%, rgba(30, 78, 216, 0.05) 100%)',
      darkOverlay: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
    },
  },
  metrics: {
    radii: {
      none: '0px',
      xs: '4px',
      sm: '6px',
      md: '8px',
      lg: '10px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    shadows: {
      none: 'none',
      '2xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
      xs: '0 1px 3px rgba(0, 0, 0, 0.08)',
      sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
      md: '0 4px 14px rgba(0, 0, 0, 0.08)',
      soft: '0 8px 30px rgba(37, 71, 140, 0.08)',
      softSm: '0 4px 16px rgba(37, 71, 140, 0.05)',
      softLg: '0 14px 40px rgba(37, 71, 140, 0.12)',
      cardLift: '0 20px 30px rgba(0, 0, 0, 0.12)',
      focusRing: '0 0 0 3px rgba(41, 98, 255, 0.14)',
    },
    transitions: {
      fast: '150ms ease-out',
      normal: '300ms ease-out',
      slow: '500ms ease-out',
      timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      timingEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
      cardHover: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
    },
    layout: {
      containerMax: '1440px',
      padMobile: '24px',
      padTablet: '40px',
      padDesktop: '56px',
      padXl: '64px',
    },
  },
};

/**
 * Global Active Theme Reference
 */
export let currentTheme: WebsiteTheme = { ...defaultTheme };

/**
 * Normalizes an API Theme Response into a strict WebsiteTheme structure.
 * Safely falls back to default values for any missing properties.
 */
export function normalizeApiTheme(apiTheme?: Partial<WebsiteTheme>): WebsiteTheme {
  if (!apiTheme) return defaultTheme;

  return {
    name: apiTheme.name || defaultTheme.name,
    version: apiTheme.version || defaultTheme.version,
    colors: {
      primary: { ...defaultTheme.colors.primary, ...(apiTheme.colors?.primary || {}) },
      secondary: { ...defaultTheme.colors.secondary, ...(apiTheme.colors?.secondary || {}) },
      brand: { ...defaultTheme.colors.brand, ...(apiTheme.colors?.brand || {}) },
      status: { ...defaultTheme.colors.status, ...(apiTheme.colors?.status || {}) },
      surfaces: { ...defaultTheme.colors.surfaces, ...(apiTheme.colors?.surfaces || {}) },
      text: { ...defaultTheme.colors.text, ...(apiTheme.colors?.text || {}) },
      borders: { ...defaultTheme.colors.borders, ...(apiTheme.colors?.borders || {}) },
      buttons: {
        primary: { ...defaultTheme.colors.buttons.primary, ...(apiTheme.colors?.buttons?.primary || {}) },
        secondary: { ...defaultTheme.colors.buttons.secondary, ...(apiTheme.colors?.buttons?.secondary || {}) },
        outline: { ...defaultTheme.colors.buttons.outline, ...(apiTheme.colors?.buttons?.outline || {}) },
        danger: { ...defaultTheme.colors.buttons.danger, ...(apiTheme.colors?.buttons?.danger || {}) },
      },
      inputs: { ...defaultTheme.colors.inputs, ...(apiTheme.colors?.inputs || {}) },
      cards: { ...defaultTheme.colors.cards, ...(apiTheme.colors?.cards || {}) },
      accent: { ...defaultTheme.colors.accent, ...(apiTheme.colors?.accent || {}) },
      gradients: { ...defaultTheme.colors.gradients, ...(apiTheme.colors?.gradients || {}) },
    },
    metrics: {
      radii: { ...defaultTheme.metrics.radii, ...(apiTheme.metrics?.radii || {}) },
      shadows: { ...defaultTheme.metrics.shadows, ...(apiTheme.metrics?.shadows || {}) },
      transitions: { ...defaultTheme.metrics.transitions, ...(apiTheme.metrics?.transitions || {}) },
      layout: { ...defaultTheme.metrics.layout, ...(apiTheme.metrics?.layout || {}) },
    },
  };
}

/**
 * Applies theme configuration values directly to DOM CSS custom properties (:root).
 * Enables seamless, instant, zero-reload runtime theme switching from API data.
 */
export function applyTheme(themeConfig: WebsiteTheme): void {
  currentTheme = themeConfig;

  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const { colors, metrics } = themeConfig;

  // Primary brand variables
  root.style.setProperty('--haatza-shopping-primary', colors.primary.main);
  root.style.setProperty('--haatza-shopping-primary-hover', colors.primary.hover);
  root.style.setProperty('--haatza-shopping-primary-light', colors.primary.light);
  root.style.setProperty('--haatza-shopping-primary-surface', colors.primary.surface);
  root.style.setProperty('--haatza-shopping-primary-highlight', colors.primary.highlight);

  // Surfaces & Backgrounds
  root.style.setProperty('--haatza-shopping-bg', colors.surfaces.page);
  root.style.setProperty('--haatza-shopping-surface', colors.surfaces.surface);
  root.style.setProperty('--haatza-shopping-text', colors.text.primary);
  root.style.setProperty('--haatza-shopping-text-muted', colors.text.muted);
  root.style.setProperty('--haatza-shopping-border', colors.borders.default);
  root.style.setProperty('--haatza-shopping-success', colors.status.success);
  root.style.setProperty('--haatza-shopping-error', colors.status.error);

  // Card & Elevation tokens
  root.style.setProperty('--haatza-card-radius', metrics.radii.xl);
  root.style.setProperty('--haatza-card-border', `1px solid ${colors.borders.default}`);
  root.style.setProperty('--haatza-card-bg', colors.cards.bg);

  // Button tokens
  root.style.setProperty('--haatza-btn-bg', colors.buttons.primary.bg);
  root.style.setProperty('--haatza-btn-bg-hover', colors.buttons.primary.bgHover);
  root.style.setProperty('--haatza-btn-text', colors.buttons.primary.text);
  root.style.setProperty('--haatza-btn-radius', metrics.radii.lg);

  // Shadows
  root.style.setProperty('--haatza-shadow-card-lift', metrics.shadows.cardLift);
  root.style.setProperty('--haatza-shadow-focus-ring', metrics.shadows.focusRing);
}

/**
 * Auto-initializes the default theme on first load
 */
export function initializeTheme(): WebsiteTheme {
  applyTheme(defaultTheme);
  return currentTheme;
}

// Export singleton default for immediate consumption
export default defaultTheme;

