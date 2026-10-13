import React from 'react';
import { PromoBanner as BasePromoBanner } from '../home/PromoBanner';
import { PromoBannerData } from '../../types';

export interface PromotionalBannerProps {
  banner?: PromoBannerData;
  splitBanners?: PromoBannerData[];
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = (props) => {
  return <BasePromoBanner {...props} />;
};

export default PromotionalBanner;
