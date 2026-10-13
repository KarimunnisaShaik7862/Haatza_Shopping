import React from 'react';
import { BannerCarousel as BaseBannerCarousel } from '../home/BannerCarousel';
import { MainCarouselBanner } from '../../services/mock/data/promotions';

export interface BannerCarouselProps {
  banners: MainCarouselBanner[];
  autoplayInterval?: number;
}

export const BannerCarousel: React.FC<BannerCarouselProps> = (props) => {
  return <BaseBannerCarousel {...props} />;
};

export default BannerCarousel;
