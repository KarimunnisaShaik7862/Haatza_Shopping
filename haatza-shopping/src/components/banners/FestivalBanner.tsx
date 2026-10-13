import React from 'react';
import { FestivalBanner as HomeFestivalBanner } from '../home/FestivalBanner';

export const FestivalBanner: React.FC<React.ComponentProps<typeof HomeFestivalBanner>> = (props) => {
  return <HomeFestivalBanner {...props} />;
};

export default FestivalBanner;
