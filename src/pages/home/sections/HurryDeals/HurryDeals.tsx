import React from 'react';
import { DealsEndingSoonSection } from '../../../../components/home/DealsEndingSoonSection';
import { DealEndingItem } from '../../../../services/mock/data/promotions';
import { Product } from '../../../../types';
import { HURRY_DEALS_DATA } from './hurryDeals.data';

export interface HurryDealsProps {
  deals?: DealEndingItem[];
  onQuickView?: (product: Product) => void;
}

export const HurryDeals: React.FC<HurryDealsProps> = ({
  deals = HURRY_DEALS_DATA,
  onQuickView,
}) => {
  return <DealsEndingSoonSection deals={deals} onQuickView={onQuickView} />;
};

export default HurryDeals;
