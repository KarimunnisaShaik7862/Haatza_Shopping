import React from 'react';
import { HaatzaLiteEverydayEssentials } from '../HaatzaLiteProducts/HaatzaLiteEverydayEssentials';

export interface TrayProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  mrp: number;
  image: string;
  badge?: string;
}

/**
 * @deprecated The Live Aisle Showcase has been replaced by HaatzaLiteEverydayEssentials.
 */
export const HaatzaLiteLiveAisleShowcase: React.FC = () => {
  return <HaatzaLiteEverydayEssentials />;
};

export default HaatzaLiteLiveAisleShowcase;
