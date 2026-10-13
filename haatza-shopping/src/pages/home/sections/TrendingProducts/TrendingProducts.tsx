import React from 'react';
import { TrendingSection } from '../../../../components/home/TrendingSection';
import { TrendingItemWithAnalytics, mockTrendingWithAnalytics } from '../../../../services/mock/data/promotions';
import { Product } from '../../../../types';

export interface TrendingProductsProps {
  items?: TrendingItemWithAnalytics[];
  onQuickView?: (product: Product) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  items = mockTrendingWithAnalytics,
  onQuickView,
}) => {
  return <TrendingSection items={items} onQuickView={onQuickView} />;
};

export default TrendingProducts;
