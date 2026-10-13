import {
  MainCarouselBanner,
  CashbackBanner,
  SecondaryPromoBanner,
  DealEndingItem,
  TrendingItemWithAnalytics,
  mockMainCarouselBanners,
  mockCashbackBanners,
  mockSecondaryPromotions,
  mockDealsEndingSoon,
  mockUnder49Products,
  mockTrendingWithAnalytics,
} from './mock/data/promotions';
import { Product } from '../types';

export const promotionService = {
  async getMainCarouselBanners(): Promise<MainCarouselBanner[]> {
    return [...mockMainCarouselBanners];
  },

  async getDealsEndingSoon(): Promise<DealEndingItem[]> {
    return [...mockDealsEndingSoon];
  },

  async getCashbackBanners(): Promise<CashbackBanner[]> {
    return [...mockCashbackBanners];
  },

  async getUnder49Products(): Promise<Product[]> {
    return [...mockUnder49Products];
  },

  async getSecondaryPromoBanners(): Promise<SecondaryPromoBanner[]> {
    return [...mockSecondaryPromotions];
  },

  async getTrendingItemsWithAnalytics(): Promise<TrendingItemWithAnalytics[]> {
    return [...mockTrendingWithAnalytics];
  },
};
