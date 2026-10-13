import React from 'react';
import { HeroCampaign } from '../../../../components/home/HeroCampaign';
import { MainCarouselBanner } from '../../../../services/mock/data/promotions';
import { HERO_PROMOTIONS_DATA } from './heroPromotions.data';

export interface HeroPromotionsProps {
  banners?: MainCarouselBanner[];
  autoplayInterval?: number;
}

export const HeroPromotions: React.FC<HeroPromotionsProps> = ({
  banners = HERO_PROMOTIONS_DATA,
  autoplayInterval = 3000,
}) => {
  return <HeroCampaign banners={banners} autoplayInterval={autoplayInterval} />;
};

export default HeroPromotions;
