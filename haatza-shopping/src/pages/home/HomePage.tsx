import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { promotionService } from '../../services/promotionService';
import { DealEndingItem } from '../../services/mock/data/promotions';

// Independent Modular Homepage Widgets
import {
  AnnouncementTickerWidget,
  HeroMarketingCarouselWidget,
  SuperSavingsCrystalBannerWidget,
  ShopByCategoryWidget,
  TrendingProductsWidget,
  DealsOfTheDayWidget,
  HurryDealsWidget,
  Under49StoreWidget,
  RecentlyViewedWidget,
  MoreToExploreWidget,
  WhyShopWithHaatzaWidget,
  FixedDiscountSideTab,
  Fashion3DAnimatedBannerWidget,
} from '../../components/home/widgets';

import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { QuickViewModal } from '../../components/products/QuickViewModal';

export const HomePage: React.FC = () => {
  const [dealsOfDay, setDealsOfDay] = useState<Product[]>([]);
  const [dealsEnding, setDealsEnding] = useState<DealEndingItem[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  useEffect(() => {
    async function loadHomepageData() {
      try {
        const [dealsData, dealsEndingData, trendingData] = await Promise.all([
          productService.getDeals('haatza', 8),
          promotionService.getDealsEndingSoon(),
          productService.getTrendingProducts('haatza', 8),
        ]);

        setDealsOfDay(dealsData);
        setDealsEnding(dealsEndingData);
        setTrendingProducts(trendingData);
      } catch (err) {
        console.error('Failed to load HAATZA homepage data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHomepageData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 space-y-6">
        <LoadingSkeleton type="banner" />
        <LoadingSkeleton type="grid" count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12 pb-20 sm:pb-24">
      {/* 01. Promotional Announcement Ticker (Full-width marketing marquee) */}
      <AnnouncementTickerWidget />

      {/* 02. Hero Marketing Carousel & Seamlessly Attached UPI Offers Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="overflow-hidden rounded-md sm:rounded-lg border border-slate-200/80 bg-white">
          <HeroMarketingCarouselWidget className="rounded-b-none border-0 shadow-none" />
          <SuperSavingsCrystalBannerWidget className="rounded-t-none border-0 shadow-none -mt-[1px]" />
        </div>
      </div>

      {/* 04. Shop by Category Discovery Cards */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <ShopByCategoryWidget />
      </div>

      {/* 05. Premium 3D Animated Text Banner with Stationary Fashion Model (Flips Every 2s) */}
      <Fashion3DAnimatedBannerWidget intervalMs={2000} />

      {/* 08. Trending Collections */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <TrendingProductsWidget
          products={trendingProducts}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 09. Deals of the Day */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <DealsOfTheDayWidget
          deals={dealsOfDay}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 10. Hurry Deals Ending Soon */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <HurryDealsWidget
          deals={dealsEnding}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 11. ₹49 Store */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <Under49StoreWidget onQuickView={handleQuickView} />
      </div>


      {/* 13. Recently Viewed Products */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <RecentlyViewedWidget onQuickView={handleQuickView} />
      </div>

      {/* 14. More to Explore (Vertical Product Grid with Infinite Scroll) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <MoreToExploreWidget
          layout="vertical-grid"
          enableInfiniteScroll={true}
          categoryContext="all"
          onQuickView={handleQuickView}
        />
      </div>

      {/* 15. Why Shop with HAATZA */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <WhyShopWithHaatzaWidget />
      </div>


      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={handleCloseQuickView}
        />
      )}

      {/* Fixed Right Edge Promotional Discount Tab (Matching Reference Video) */}
      <FixedDiscountSideTab />
    </div>
  );
};

export default HomePage;
