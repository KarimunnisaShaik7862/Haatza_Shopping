import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../../types';
import { promotionService } from '../../services/promotionService';
import { productService } from '../../services/productService';
import {
  MainCarouselBanner,
  DealEndingItem,
  TrendingItemWithAnalytics,
} from '../../services/mock/data/promotions';

// Homepage Components
import { FestivalBanner } from '../../components/home/FestivalBanner';
import { HeroCampaign } from '../../components/home/HeroCampaign';
import { OfferStrip } from '../../components/home/OfferStrip';
import { DealsEndingSoonSection } from '../../components/home/DealsEndingSoonSection';
import { DealsOfTheDaySection } from '../../components/home/DealsOfTheDaySection';
import { PerfectPicksSection } from '../../components/home/PerfectPicksSection';
import { TrendingSection } from '../../components/home/TrendingSection';
import { NewArrivalsSection } from '../../components/home/NewArrivalsSection';
import { CampaignBannerSection } from '../../components/home/CampaignBannerSection';
import { RecentlyViewedSection } from '../../components/home/RecentlyViewedSection';
import { MoreToExploreSection } from '../../components/home/MoreToExploreSection';
import { BenefitsSection } from '../../components/home/BenefitsSection';
import { NewsletterSection } from '../../components/home/NewsletterSection';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { QuickViewModal } from '../../components/products/QuickViewModal';

export const HaatzaHomePage: React.FC = () => {
  // Data states
  const [carouselBanners, setCarouselBanners] = useState<MainCarouselBanner[]>([]);
  const [dealsEnding, setDealsEnding] = useState<DealEndingItem[]>([]);
  const [dealsOfDay, setDealsOfDay] = useState<Product[]>([]);
  const [trendingAnalytics, setTrendingAnalytics] = useState<TrendingItemWithAnalytics[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  // Quick view modal
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <LoadingSkeleton type="banner" />
        <LoadingSkeleton type="grid" count={4} />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-12 pb-16 pt-2">
      {/* 
        ========================================================================
        HAATZA HOMEPAGE SECTION ORDER (PREMIUM E-COMMERCE EXPERIENCE):
        ========================================================================
        01. Top Festival Promotional Banner (Dussehra, Pongal, Diwali, Sankranti with 3s rotation)
        02. Hero Campaign: 30% Major Promotion + 70% Coordinated Smaller Banners (3s rotation)
        03. Cashback & Offers Strip (PhonePe, Navi, Bank Card savings with subtle dividers)
        04. Hurry! Deals Ending Soon (Matching Deals of Day dimensions & far-edge arrows)
        05. Deals of the Day (24-hour remaining countdown & far-edge arrows)
        06. Perfect Picks Just for You (Personalized recommendations & far-edge arrows)
        07. Trending: Steal the Spotlight (Analytics, views, rankings & far-edge arrows)
        08. Just Landed (New arrivals with clean product photography & far-edge arrows)
        09. Campaign Banner (Full-width grand festive / luxury promotion)
        10. Recently Viewed by You (Unified: Viewed + Cart + Wishlist items under one heading)
        11. More to Explore (Progressive endless product discovery with clear end state)
        12. Customer Benefits & Luxury Newsletter
      */}

      {/* 01. Top Festival Promotional Banner (Dussehra, Pongal, Diwali, Sankranti Sales) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FestivalBanner />
      </div>

      {/* 02. Hero Campaign (30% Left Major Promotion + 70% Right Smaller Banners) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroCampaign banners={carouselBanners} autoplayInterval={3000} />
      </div>

      {/* 03. Cashback & Offers Strip */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <OfferStrip />
      </div>

      {/* 04. Hurry! Deals Ending Soon (Standardized matching Deals of Day dimensions) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <DealsEndingSoonSection
          deals={dealsEnding}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 05. Deals of the Day */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <DealsOfTheDaySection
          deals={dealsOfDay}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 06. Perfect Picks Just for You (Personalized Recommendations) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <PerfectPicksSection onQuickView={handleQuickView} />
      </div>

      {/* 07. Trending: Steal the Spotlight */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <TrendingSection
          items={trendingAnalytics}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 08. Just Landed (New Arrivals) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <NewArrivalsSection
          products={newArrivals}
          onQuickView={handleQuickView}
        />
      </div>

      {/* 09. Campaign Banner (Full-Width Grand Festive Promotion) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CampaignBannerSection />
      </div>

      {/* 10. Recently Viewed by You (Unified: Viewed + Cart + Wishlist items under single heading) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewedSection onQuickView={handleQuickView} />
      </div>

      {/* 11. More to Explore (Progressive Endless Product Discovery) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <MoreToExploreSection onQuickView={handleQuickView} />
      </div>

      {/* 12. Customer Benefits & Luxury Newsletter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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
