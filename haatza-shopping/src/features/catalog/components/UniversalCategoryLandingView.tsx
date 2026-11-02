import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { CompactCategoryCard } from '../../men-fashion/components/CompactCategoryCard';
import { CategoryConfig, CategoryMajorSection } from '../data/categoriesNavigation.data';
import { Sparkles } from 'lucide-react';
import {
  MoreToExploreWidget,
  QuickViewModal,
  SuggestedForYouWidget,
  LikedByYouWidget,
  RecentlyViewedWidget,
  BestsellersWidget,
  NewArrivalsWidget,
  TrendingProductsWidget,
  DealsOfTheDayWidget,
} from '../../../shared/widgets';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { productService } from '../../../services/productService';
import { Product } from '../../../types';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';

interface UniversalCategoryLandingViewProps {
  config: CategoryConfig;
}

export const UniversalCategoryLandingView: React.FC<UniversalCategoryLandingViewProps> = ({ config }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      setLoading(true);
      try {
        const list = await productService.getProducts({ category: config.slug }, 'haatza');
        if (!isCancelled) {
          setProducts(list);
        }
      } catch (err) {
        console.error('Failed to load category products:', err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCancelled = true;
    };
  }, [config.slug]);

  // Top category deals with genuine offer info
  const categoryDeals = useMemo(() => {
    const deals = products.filter(
      (p) => (p.discountPercentage && p.discountPercentage >= 20) || p.isDealOfTheDay
    );
    if (deals.length >= 4) return deals.slice(0, 10);
    return [...products].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)).slice(0, 10);
  }, [products]);

  // Trending in this category
  const categoryTrending = useMemo(() => {
    const trending = products.filter(
      (p) => p.isTrending || p.isBestseller || p.rating >= 4.5
    );
    if (trending.length >= 4) return trending.slice(0, 10);
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [products]);

  const breadcrumbItems = [{ label: config.name }];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 00. Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 01. Category Banner */}
      <div
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r ${config.heroBanner.bgGradient} text-white shadow-xl min-h-[220px] sm:min-h-[280px] flex items-center border border-white/10`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={optimizeImageUrl(config.heroBanner.image, { width: 1200, quality: 75 })}
            alt={config.heroBanner.title}
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:w-3/4" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="max-w-2xl space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-black tracking-wider uppercase text-white shadow-2xs font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>{config.heroBanner.tag}</span>
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-2xs ${config.heroBanner.badgeColor} font-heading`}
              >
                {config.heroBanner.discount}
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight font-heading">
              {config.heroBanner.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-body max-w-xl">
              {config.heroBanner.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 02. Subcategories */}
      <section id="department-sections" aria-label={`Shop by ${config.name} Department`} className="space-y-4 sm:space-y-6">
        <SectionHeading
          title="Shop by Department"
        />

        {/* Compact Circular Department Navigation */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5 lg:gap-4 no-scrollbar py-2 items-start justify-start sm:justify-between overscroll-x-contain">
          {config.sections.map((section: CategoryMajorSection) => (
            <CompactCategoryCard
              key={section.id}
              id={section.id}
              name={section.title}
              image={section.image}
              link={`/category/${config.slug}/${section.slug}`}
              accentColor={section.accentColor || config.accentColor}
            />
          ))}
        </div>
      </section>

      {/* 03. Suggested for You */}
      <SuggestedForYouWidget
        categoryContext={config.slug}
        onQuickView={handleQuickView}
      />

      {/* 04. Liked by You */}
      <LikedByYouWidget
        categoryContext={config.slug}
        onQuickView={handleQuickView}
      />

      {/* 05. Recently Viewed by You */}
      <RecentlyViewedWidget
        categoryContext={config.slug}
        title="Recently Viewed by You"
        subtitle={`Styles and items you explored in ${config.shortName.toLowerCase()}`}
        onQuickView={handleQuickView}
      />

      {/* 06. Deals of the Day */}
      {categoryDeals.length > 0 && (
        <DealsOfTheDayWidget
          deals={categoryDeals}
          title={`${config.name} Deals of the Day`}
          subtitle={`Unbeatable limited-time price drops on verified ${config.shortName.toLowerCase()} essentials.`}
          viewAllLink={`/category/${config.slug}/${config.sections[0]?.slug || ''}`}
          onQuickView={handleQuickView}
        />
      )}

      {/* 07. Fresh New Arrivals */}
      <NewArrivalsWidget
        categoryContext={config.slug}
        title="Fresh New Arrivals"
        subtitle={`Latest seasonal drops and new additions in ${config.name}`}
        onQuickView={handleQuickView}
      />

      {/* 08. Trending Products */}
      <TrendingProductsWidget
        products={categoryTrending}
        title="Trending Products"
        subtitle={`Top-rated & bestselling items selected by customers this week in ${config.shortName.toLowerCase()}`}
        viewAllLink={`/category/${config.slug}/${config.sections[0]?.slug || ''}`}
        onQuickView={handleQuickView}
      />

      {/* 09. More to Explore */}
      <MoreToExploreWidget
        title={`More to Explore in ${config.name}`}
        subtitle={`Curated ${config.shortName.toLowerCase()} selections and verified bestsellers.`}
        eyebrow={`${config.shortName} Picks`}
        viewAllLink={`/category/${config.slug}/${config.sections[0]?.slug || ''}`}
        layout="vertical-grid"
        enableInfiniteScroll={true}
        categoryContext={config.slug}
        onQuickView={handleQuickView}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}
    </div>
  );
};

export default UniversalCategoryLandingView;
