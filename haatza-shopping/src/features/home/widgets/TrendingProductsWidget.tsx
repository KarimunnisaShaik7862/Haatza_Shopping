import React from 'react';
import { Product } from '../../../types';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import {
  TrendingFashionBanner,
  TrendingFashionCardItem,
} from '../components/TrendingFashionBanner';
import {
  SeasonalBannerThemeConfig,
  DEFAULT_TRENDING_FASHION_CONFIG,
} from '../data/trendingFashionConfig';

export interface TrendingProductsWidgetProps {
  products: Product[];
  items?: TrendingFashionCardItem[];
  themeConfig?: Partial<SeasonalBannerThemeConfig>;
  onQuickView?: (product: Product) => void;
  className?: string;
  title?: string;
  viewAllLink?: string;
  subtitle?: string;
}

/**
 * TrendingProductsWidget
 * 
 * Redesigned Horizontal Trending Fashion Showcase:
 * - Left Side: Premium blue promotional banner with subtle geometric overlays.
 * - Right Side: Existing category / product cards in an interactive carousel track.
 * - Architecture: Theme configuration is completely separated from card data,
 *   making future seasonal API integration seamless.
 */
export const TrendingProductsWidget: React.FC<TrendingProductsWidgetProps> = ({
  products,
  items,
  themeConfig,
  className = '',
  title,
  viewAllLink,
  subtitle,
  onQuickView,
}) => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });

  if ((!products || products.length === 0) && (!items || items.length === 0)) {
    return null;
  }

  // Derive title parts if a custom title is passed (e.g. from Category pages)
  let derivedTitlePrimary: string | undefined;
  let derivedTitleHighlight: string | undefined;

  if (title) {
    const parts = title.trim().split(' ');
    if (parts.length >= 2) {
      derivedTitlePrimary = parts.slice(0, parts.length - 1).join(' ');
      derivedTitleHighlight = parts[parts.length - 1];
    } else {
      derivedTitlePrimary = parts[0];
      derivedTitleHighlight = '';
    }
  }

  const effectiveConfig: Partial<SeasonalBannerThemeConfig> = {
    ...DEFAULT_TRENDING_FASHION_CONFIG,
    ...(derivedTitlePrimary ? { titlePrimary: derivedTitlePrimary } : {}),
    ...(derivedTitleHighlight ? { titleHighlight: derivedTitleHighlight } : {}),
    ...(subtitle ? { subtitle } : {}),
    ...(viewAllLink ? { viewAllLink } : {}),
    ...themeConfig,
  };

  return (
    <div
      ref={sectionRef}
      className={`w-full py-2.5 sm:py-3.5 transition-all duration-700 ease-out will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      } ${className}`}
    >
      <TrendingFashionBanner
        products={products}
        items={items}
        themeConfig={effectiveConfig}
        onQuickView={onQuickView}
      />
    </div>
  );
};

export default TrendingProductsWidget;
