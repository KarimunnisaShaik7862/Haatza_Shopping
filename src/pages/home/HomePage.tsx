import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../../types';
import { promotionService } from '../../services/promotionService';
import { productService } from '../../services/productService';
import {
  MainCarouselBanner,
  DealEndingItem,
  TrendingItemWithAnalytics,
} from '../../services/mock/data/promotions';

// Modular Sections
import { FestivalPromotions } from './sections/FestivalPromotions/FestivalPromotions';
import { HeroPromotions } from './sections/HeroPromotions/HeroPromotions';
import { CashbackOffers } from './sections/CashbackOffers/CashbackOffers';
import { HurryDeals } from './sections/HurryDeals/HurryDeals';
import { DealsOfTheDay } from './sections/DealsOfTheDay/DealsOfTheDay';
import { RecommendedProducts } from './sections/RecommendedProducts/RecommendedProducts';
import { TrendingProducts } from './sections/TrendingProducts/TrendingProducts';
import { NewArrivals } from './sections/NewArrivals/NewArrivals';
import { ShoppingOffers } from './sections/ShoppingOffers/ShoppingOffers';
import { RecentlyViewed } from './sections/RecentlyViewed/RecentlyViewed';
import { MoreToExplore } from './sections/MoreToExplore/MoreToExplore';
import { BenefitsSection } from '../../components/home/BenefitsSection';
import { NewsletterSection } from '../../components/home/NewsletterSection';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { QuickViewModal } from '../../components/products/QuickViewModal';

export const HomePage: React.FC = () => {
  const [carouselBanners, setCarouselBanners] = useState<MainCarouselBanner[]>([]);
  const [dealsEnding, setDealsEnding] = useState<DealEndingItem[]>([]);
  const [dealsOfDay, setDealsOfDay] = useState<Product[]>([]);
  const [trendingAnalytics, setTrendingAnalytics] = useState<TrendingItemWithAnalytics[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomepageData() {
      try {
        const [
          carouselData,
          dealsEndingData,
          dealsData,
          trendingData,
          newArrivalsData,
        ] = await Promise.all([
          promotionService.getMainCarouselBanners(),
          promotionService.getDealsEndingSoon(),
          productService.getDeals('haatza', 8),
          promotionService.getTrendingItemsWithAnalytics(),
          productService.getNewArrivals('haatza', 8),
        ]);

        setCarouselBanners(carouselData);
        setDealsEnding(dealsEndingData);
        setDealsOfDay(dealsData);
        setTrendingAnalytics(trendingData);
        setNewArrivals(newArrivalsData);
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <LoadingSkeleton type="banner" />
        <LoadingSkeleton type="grid" count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 sm:pb-16 pt-2 sm:pt-4">
      {/* 01. Festival Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FestivalPromotions />
      </div>

      {/* 02. Hero Campaign */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroPromotions banners={carouselBanners} autoplayInterval={3000} />
      </div>

      {/* 03. Cashback & Offers */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CashbackOffers />
      </div>

      {/* 04. Hurry! Deals Ending Soon */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <HurryDeals deals={dealsEnding} onQuickView={handleQuickView} />
      </div>

      {/* 05. Deals of the Day */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <DealsOfTheDay deals={dealsOfDay} onQuickView={handleQuickView} />
      </div>

      {/* 06. Recommended Products (Perfect Picks) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendedProducts onQuickView={handleQuickView} />
      </div>

      {/* 07. Trending Products */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingProducts items={trendingAnalytics} onQuickView={handleQuickView} />
      </div>

      {/* 08. Just Landed (New Arrivals) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <NewArrivals products={newArrivals} onQuickView={handleQuickView} />
      </div>

      {/* 09. Campaign Banner */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <ShoppingOffers />
      </div>

      {/* 10. Recently Viewed */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewed onQuickView={handleQuickView} />
      </div>

      {/* 11. More to Explore */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <MoreToExplore onQuickView={handleQuickView} />
      </div>

      {/* 12. Benefits & Newsletter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <BenefitsSection />
        <NewsletterSection />
      </div>

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

export default HomePage;
