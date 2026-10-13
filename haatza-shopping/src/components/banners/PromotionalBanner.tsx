import React from 'react';
import { PromoBanner } from '../home/PromoBanner';

export const PromotionalBanner: React.FC<React.ComponentProps<typeof PromoBanner>> = (props) => {
  return <PromoBanner {...props} />;
};

export default PromotionalBanner;
