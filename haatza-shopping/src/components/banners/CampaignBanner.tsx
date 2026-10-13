import React from 'react';
import { CampaignBannerSection } from '../home/CampaignBannerSection';

export const CampaignBanner: React.FC<React.ComponentProps<typeof CampaignBannerSection>> = (props) => {
  return <CampaignBannerSection {...props} />;
};

export default CampaignBanner;
