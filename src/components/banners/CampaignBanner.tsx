import React from 'react';
import { HeroBanner as BaseHeroBanner } from '../home/HeroBanner';
import { HeroSlide } from '../../types';

export interface CampaignBannerProps {
  slides: HeroSlide[];
}

export const CampaignBanner: React.FC<CampaignBannerProps> = (props) => {
  return <BaseHeroBanner {...props} />;
};

export default CampaignBanner;
