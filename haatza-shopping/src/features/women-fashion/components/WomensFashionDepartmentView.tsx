import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { CompactCategoryCard } from '../../men-fashion/components/CompactCategoryCard';
import { WOMENS_FASHION_MAJOR_SECTIONS } from '../data/womensFashionNavigation.data';
const premiumWomensHeroBanner = '/images/womens-fashion/hero-banner.png';
import { DealsOfTheDayWidget } from '../../home/widgets/DealsOfTheDayWidget';
import { TrendingProductsWidget } from '../../home/widgets/TrendingProductsWidget';
import { SectionHeading } from '../../../components/common/SectionHeading';
import { Sparkles } from 'lucide-react';
import {
  MoreToExploreWidget,
  SuggestedForYouWidget,
  LikedByYouWidget,
  RecentlyViewedWidget,
  BestsellersWidget,
  NewArrivalsWidget,
  QuickViewModal,
} from '../../../shared/widgets';
import { productService } from '../../../services/productService';
import { Product } from '../../../types';

export const WomensFashionDepartmentView: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [dealsProducts, setDealsProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  useEffect(() => {
    async function loadData() {
      const [trending, deals] = await Promise.all([
        productService.getWomensTrending(10),
        productService.getWomensDeals(10),
      ]);
      setTrendingProducts(trending);
      setDealsProducts(deals);
    }
    loadData();
  }, []);

  const breadcrumbItems = [
    { label: "Women's Fashion" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 00. Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 01. Category Banner */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-2xs">
        <img
          src={premiumWomensHeroBanner}
          alt="Premium Women's Fashion Hero Banner"
          className="w-full h-auto block select-none mix-blend-multiply"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* 02. Subcategories */}
      <section aria-label="Shop by Department" className="space-y-4 sm:space-y-6">
        <SectionHeading
          title="Shop by Department"
        />

        {/* 7 Circular Department Cards */}
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4 no-scrollbar py-2 items-start justify-start sm:justify-between overscroll-x-contain">
          {WOMENS_FASHION_MAJOR_SECTIONS.map((section) => (
            <CompactCategoryCard
              key={section.id}
              id={section.id}
              name={section.title}
              image={section.image}
              link={`/category/women-fashion/${section.slug}`}
              accentColor={section.accentColor}
            />
          ))}
        </div>
      </section>

      {/* 03. Suggested for You */}
      <SuggestedForYouWidget
        categoryContext="women-fashion"
        onQuickView={handleQuickView}
      />

      {/* 04. Liked by You */}
      <LikedByYouWidget
        categoryContext="women-fashion"
        onQuickView={handleQuickView}
      />

      {/* 05. Recently Viewed by You */}
      <RecentlyViewedWidget
        categoryContext="women-fashion"
        title="Recently Viewed by You"
        subtitle="Styles you explored or trending across womenswear"
        onQuickView={handleQuickView}
      />

      {/* 06. Deals of the Day */}
      {dealsProducts.length > 0 && (
        <DealsOfTheDayWidget
          deals={dealsProducts}
          title="Women's Deals of the Day"
          subtitle="Unbeatable limited-time festive price drops on verified women's fashion."
          viewAllLink="/category/women-fashion/ethnic-wear"
          onQuickView={handleQuickView}
        />
      )}

      {/* 07. Fresh New Arrivals */}
      <NewArrivalsWidget
        categoryContext="women-fashion"
        title="Fresh New Arrivals"
        subtitle="Fresh seasonal couture, contemporary dresses & latest arrivals"
        onQuickView={handleQuickView}
      />

      {/* 08. Trending Products */}
      <TrendingProductsWidget
        products={trendingProducts}
        title="Trending Products"
        subtitle="Customer-favorite sarees, kurtis, dresses, and handcrafted accessories"
        viewAllLink="/category/women-fashion/ethnic-wear"
        onQuickView={handleQuickView}
      />

      {/* 09. More to Explore */}
      <MoreToExploreWidget
        title="More to Explore in Women's Fashion"
        subtitle="Curated new arrivals, footwear, and designer handbags handpicked for you."
        eyebrow="Women's Style Picks"
        viewAllLink="/category/women-fashion/ethnic-wear"
        layout="vertical-grid"
        enableInfiniteScroll={true}
        categoryContext="women-fashion"
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

export default WomensFashionDepartmentView;
