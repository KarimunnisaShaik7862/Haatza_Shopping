import React from 'react';
import { DealsOfTheDaySection } from '../../../../components/home/DealsOfTheDaySection';
import { Product } from '../../../../types';
import { DEALS_OF_THE_DAY_DATA } from './deals.data';

export interface DealsOfTheDayProps {
  deals?: Product[];
  onQuickView?: (product: Product) => void;
}

export const DealsOfTheDay: React.FC<DealsOfTheDayProps> = ({
  deals = DEALS_OF_THE_DAY_DATA,
  onQuickView,
}) => {
  return <DealsOfTheDaySection deals={deals} onQuickView={onQuickView} />;
};

export default DealsOfTheDay;
