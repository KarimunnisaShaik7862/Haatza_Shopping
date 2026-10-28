import React, { useEffect, useState, useMemo } from 'react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { CompactCategoryCard } from '../fashion/CompactCategoryCard';
import { CategoryConfig, CategoryMajorSection } from '../../data/categoriesNavigation.data';
import { Sparkles, Flame, ArrowRight, TrendingUp } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { ProductCarouselTrack } from '../home/ProductCarouselTrack';
import { CountdownClock } from '../home/CountdownClock';
import { MoreToExploreWidget } from '../home/widgets/MoreToExploreWidget';
import { QuickViewModal } from '../products/QuickViewModal';
import { productService } from '../../services/productService';
import { Product } from '../../types';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface UniversalCategoryLandingViewProps {
  config: CategoryConfig;
}

export const UniversalCategoryLandingView: React.FC<UniversalCategoryLandingViewProps> = ({ config }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

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

  // Top category deals with high discount or deal flag
  const categoryDeals = useMemo(() => {
    return products
      .filter((p) => (p.discountPercentage && p.discountPercentage >= 30) || p.isDealOfTheDay || p.rating >= 4.5)
      .slice(0, 10);
  }, [products]);

  // Trending in this category
  const categoryTrending = useMemo(() => {
    return products
      .filter((p) => p.isTrending || p.isBestseller || p.rating >= 4.6)
      .slice(0, 10);
  }, [products]);

  const breadcrumbItems = [{ label: config.name }];

  // Collect all subcategories from sections for the compact exploration grid
  const allSubcategories = useMemo(() => {
    return config.sections.flatMap((s) =>
      s.subcategories.map((sub) => ({
        ...sub,
        parentSectionSlug: s.slug,
        parentSectionTitle: s.title,
      }))
    );
  }, [config.sections]);

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 01. Breadcrumb Hierarchy */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 02. Promotional Hero Banner */}
      <section
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-r ${config.heroBanner.bgGradient} text-white shadow-xl min-h-[260px] sm:min-h-[320px] flex items-center border border-white/10`}
        aria-label={`${config.name} Promotional Banner`}
      >
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={optimizeImageUrl(config.heroBanner.image, { width: 1200, quality: 75 })}
            alt={config.heroBanner.title}
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay scale-105"
            loading="eager"
            decoding="async"
            width="1200"
            height="360"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:w-3/4" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 w-full">
          <div className="max-w-2xl space-y-3">
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

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight font-heading">
              {config.heroBanner.title}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-body max-w-xl">
              {config.heroBanner.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="#department-sections"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:scale-105 active:scale-95 group font-heading"
              >
                <span>Explore Departments</span>
                <ArrowRight className="w-4 h-4 text-[#2962FF] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Compact Circular Department Navigation */}
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

      {/* 04. Deals of the Day Carousel */}
      {categoryDeals.length > 0 && (
        <section
          className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4"
          aria-label={`${config.name} Deals`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-soft-sm"
                style={{ backgroundColor: config.accentColor }}
              >
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
                    {config.name} Deals of the Day
                  </h2>
                  <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#2962FF] border border-[#DBEAFE] text-[10px] font-black uppercase tracking-wider font-heading">
                    Limited Time Offers
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 font-body">
                  Top verified price drops on premium {config.shortName.toLowerCase()} essentials.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <CountdownClock initialHours={4} initialMinutes={35} initialSeconds={12} variant="pill" label="Ends In:" />
            </div>
          </div>

          <ProductCarouselTrack scrollDistance={320}>
            {categoryDeals.map((prod) => (
              <div key={prod.id} className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px]">
                <ProductCard
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  dealBadge={prod.discountPercentage ? `FLAT ${prod.discountPercentage}% OFF` : undefined}
                />
              </div>
            ))}
          </ProductCarouselTrack>
        </section>
      )}

      {/* 05. All Subcategories Showcase (Compact 8-Col Grid) */}
      <section id="department-sections" className="space-y-4 sm:space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 sm:pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2962FF] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 font-heading">
              <Sparkles className="w-3 h-3 text-[#2962FF] fill-[#2962FF]" />
              <span>{allSubcategories.length} Handpicked Categories</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight uppercase font-heading">
              Browse All {config.name} Departments
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-body">
              Select any subcategory below to explore curated products and specifications
            </p>
          </div>
        </div>

        {/* 8-col grid on large desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3">
          {allSubcategories.map((sub) => {
            const optimized = optimizeImageUrl(sub.image, { width: 300, quality: 80 });

            return (
              <a
                key={sub.id}
                href={`/category/${config.slug}/${sub.parentSectionSlug}/${sub.slug}`}
                className="group relative flex flex-col items-center rounded-xl p-2 sm:p-2.5 transition-all duration-200 text-center select-none cursor-pointer border bg-[#F8FAFC] hover:bg-white border-slate-200/80 hover:border-[#2962FF]/50 shadow-2xs hover:shadow-xs"
                title={`Browse ${sub.name}`}
              >
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-lg bg-white mb-2 shadow-2xs relative">
                  <img
                    src={optimized}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  {sub.badge && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-white/95 text-zinc-900 shadow-2xs backdrop-blur-xs">
                      {sub.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#172033] group-hover:text-[#2962FF] transition-colors line-clamp-1 font-heading leading-tight">
                  {sub.shortTitle || sub.name}
                </span>
                {sub.itemCount && (
                  <span className="text-[10px] text-slate-400 font-sans mt-0.5 leading-none">
                    {sub.itemCount}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </section>

      {/* 06. Trending in Category Carousel */}
      {categoryTrending.length > 0 && (
        <section
          className="bg-white rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-2xs space-y-4"
          aria-label={`Trending in ${config.name}`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-soft-sm"
              style={{ backgroundColor: config.accentColor }}
            >
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
                Trending in {config.name}
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5 font-body">
                Top-rated & bestselling items selected by customers this week
              </p>
            </div>
          </div>

          <ProductCarouselTrack scrollDistance={320}>
            {categoryTrending.map((prod) => (
              <div key={prod.id} className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px]">
                <ProductCard
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  statusBadge="TRENDING"
                />
              </div>
            ))}
          </ProductCarouselTrack>
        </section>
      )}

      {/* 07. More to Explore in this category */}
      {products.length > 0 && (
        <MoreToExploreWidget
          products={products}
          title={`More to Explore in ${config.name}`}
          subtitle={`Curated ${config.shortName.toLowerCase()} selections and verified bestsellers.`}
          eyebrow={`${config.shortName} Picks`}
          viewAllLink={`/category/${config.slug}/${config.sections[0]?.slug || ''}`}
          layout="vertical-grid"
          enableInfiniteScroll={true}
          categoryContext={config.slug}
        />
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default UniversalCategoryLandingView;
