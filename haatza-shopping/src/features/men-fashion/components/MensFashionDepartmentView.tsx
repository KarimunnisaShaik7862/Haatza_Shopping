import React, { useEffect, useState, useCallback } from 'react';
import { Breadcrumbs } from '../../../components/common/Breadcrumbs';
import { CompactCategoryCard } from './CompactCategoryCard';
import { MENS_FASHION_MAJOR_SECTIONS } from '../data/mensFashionNavigation.data';
const premiumMensStyleBanner = '/images/mens-fashion/premium-mens-fashion-style-banner.png';
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

export const MensFashionDepartmentView: React.FC = () => {
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
        productService.getMensTrending(10),
        productService.getMensDeals(10),
      ]);
      setTrendingProducts(trending);
      setDealsProducts(deals);
    }
    loadData();
  }, []);

  const breadcrumbItems = [
    { label: 'Men Fashion' },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* 00. Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 01. Category Banner */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-2xs">
        <img
          src={premiumMensStyleBanner}
          alt="Premium Men's Fashion Style Banner"
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
          {MENS_FASHION_MAJOR_SECTIONS.map((section) => (
            <CompactCategoryCard
              key={section.id}
              id={section.id}
              name={section.title}
              image={section.image}
              link={`/category/men-fashion/${section.slug}`}
              accentColor={section.accentColor}
            />
          ))}
        </div>
      </section>

      {/* 03. Suggested for You */}
      <SuggestedForYouWidget
        categoryContext="men-fashion"
        onQuickView={handleQuickView}
      />

      {/* 04. Liked by You */}
      <LikedByYouWidget
        categoryContext="men-fashion"
        onQuickView={handleQuickView}
      />

      {/* 05. Recently Viewed by You */}
      <RecentlyViewedWidget
        categoryContext="men-fashion"
        title="Recently Viewed by You"
        subtitle="Styles you explored or trending across menswear"
        onQuickView={handleQuickView}
      />

      {/* 06. Deals of the Day */}
      {dealsProducts.length > 0 && (
        <DealsOfTheDayWidget
          deals={dealsProducts}
          title="Men's Deals of the Day"
          subtitle="Unbeatable limited-time price drops on top menswear essentials."
          viewAllLink="/category/men-fashion/clothing"
          onQuickView={handleQuickView}
        />
      )}

      {/* 07. Fresh New Arrivals */}
      <NewArrivalsWidget
        categoryContext="men-fashion"
        title="Fresh New Arrivals"
        subtitle="Latest seasonal drops and contemporary streetwear cuts"
        onQuickView={handleQuickView}
      />

      {/* 08. Trending Products */}
      <TrendingProductsWidget
        products={trendingProducts}
        title="Trending Products"
        subtitle="Most popular styles, trending cuts & top-rated apparel in Men's Fashion"
        viewAllLink="/category/men-fashion/clothing"
        onQuickView={handleQuickView}
      />

      {/* 09. More to Explore */}
      <MoreToExploreWidget
        title="More to Explore in Men's Fashion"
        subtitle="Curated new drops, footwear, and accessories handpicked for you."
        eyebrow="Men's Style Picks"
        viewAllLink="/category/men-fashion/clothing"
        layout="vertical-grid"
        enableInfiniteScroll={true}
        categoryContext="men-fashion"
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

export default MensFashionDepartmentView;
