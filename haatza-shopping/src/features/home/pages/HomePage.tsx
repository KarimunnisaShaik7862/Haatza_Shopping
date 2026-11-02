import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../../../types';
import { productService } from '../../../services/productService';
import { promotionService } from '../../../services/promotionService';
import { DealEndingItem } from '../../../services/mock/data/promotions';

// Exclusive Homepage Widgets
import {
  AnnouncementTickerWidget,
  HeroMarketingCarouselWidget,
  SuperSavingsCrystalBannerWidget,
  ShopByCategoryWidget,
  TrendingProductsWidget,
  DealsOfTheDayWidget,
  HurryDealsWidget,
  Under49StoreWidget,
  WhyShopWithHaatzaWidget,
  FixedDiscountSideTab,
  Fashion3DAnimatedBannerWidget,
} from '../widgets';

// Canonical Shared Widgets
import {
  BestsellersWidget,
  NewArrivalsWidget,
  LikedByYouWidget,
  SuggestedForYouWidget,
  RecentlyViewedWidget,
  MoreToExploreWidget,
  QuickViewModal,
} from '../../../shared/widgets';
import { LoadingSkeleton } from '../../../components/common/LoadingSkeleton';

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
    <div className="space-y-5 sm:space-y-7 pb-16 sm:pb-20">
      {/* 01. Promotional Announcement Ticker (Full-width marketing marquee) */}
      <AnnouncementTickerWidget />

      {/* 02. Hero Marketing Carousel & Seamlessly Attached UPI Offers Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="overflow-hidden rounded-md sm:rounded-lg border border-slate-200/80 bg-white">
          <HeroMarketingCarouselWidget className="rounded-b-none border-0 shadow-none" />
          <SuperSavingsCrystalBannerWidget className="rounded-t-none border-0 shadow-none -mt-[1px]" />
        </div>
      </div>

      {/* 03. Top Categories Discovery Section */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <ShopByCategoryWidget />
      </div>

      {/* 04. Suggested for You (Tailored discovery with Classic Lift & Glow - Top Discovery Zone) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <SuggestedForYouWidget onQuickView={handleQuickView} />
      </div>

      {/* 05. Liked by You (Personalized / Popular Favorites - Top Discovery Zone) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <LikedByYouWidget onQuickView={handleQuickView} />
      </div>

      {/* 06. Recently Viewed by You (Session browsing history with smart fallback - Top Discovery Zone) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <RecentlyViewedWidget onQuickView={handleQuickView} />
      </div>

      {/* 07. Main Promotional Banner women image (Stationary Fashion Model & 3D Typography Flips Every 2s) */}
      <Fashion3DAnimatedBannerWidget intervalMs={2000} />

      {/* 08. Deals of the Day */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <DealsOfTheDayWidget
          deals={dealsOfDay}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 09. Banner + ₹49 Store (3D Podium Stage Banner & Curated Budget Finds) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <Under49StoreWidget onQuickView={handleQuickView} />
      </div>

      {/* 10. Trending Fashion */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <TrendingProductsWidget
          products={trendingProducts}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 11. Hurry! Deals Ending Soon */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <HurryDealsWidget
          deals={dealsEnding}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 12. Bestsellers (Verified customer demand) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <BestsellersWidget onQuickView={handleQuickView} />
      </div>

      {/* 13. New Arrivals (Fresh season additions) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <NewArrivalsWidget onQuickView={handleQuickView} />
      </div>

      {/* 14. More to Explore (Vertical Product Grid with Infinite Scroll - Shared Widget) */}
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

      {/* Fixed Right Edge Promotional Discount Tab */}
      <FixedDiscountSideTab />
    </div>
  );
};

export default HomePage;
