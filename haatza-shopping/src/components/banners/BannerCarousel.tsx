import React from 'react';
import { BannerCarousel as HomeBannerCarousel } from '../home/BannerCarousel';

export const BannerCarousel: React.FC<React.ComponentProps<typeof HomeBannerCarousel>> = (props) => {
  return <HomeBannerCarousel {...props} />;
};

export default BannerCarousel;
