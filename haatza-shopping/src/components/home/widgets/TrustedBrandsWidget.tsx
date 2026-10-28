import React from 'react';
import { SuperSavingsCrystalBannerWidget } from './SuperSavingsCrystalBannerWidget';

interface TrustedBrandsWidgetProps {
  className?: string;
  [key: string]: any;
}

export const TrustedBrandsWidget: React.FC<TrustedBrandsWidgetProps> = ({
  className = '',
  ...rest
}) => {
  return <SuperSavingsCrystalBannerWidget className={className} {...rest} />;
};
