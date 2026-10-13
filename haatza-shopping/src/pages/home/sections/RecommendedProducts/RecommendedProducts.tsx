import React from 'react';
import { PerfectPicksSection } from '../../../../components/home/PerfectPicksSection';
import { Product } from '../../../../types';

export interface RecommendedProductsProps {
  onQuickView?: (product: Product) => void;
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ onQuickView }) => {
  return <PerfectPicksSection onQuickView={onQuickView} />;
};

export default RecommendedProducts;
