import React from 'react';
import { MoreToExploreSection } from '../../../../components/home/MoreToExploreSection';
import { Product } from '../../../../types';

export interface MoreToExploreProps {
  onQuickView?: (product: Product) => void;
}

export const MoreToExplore: React.FC<MoreToExploreProps> = ({ onQuickView }) => {
  return <MoreToExploreSection onQuickView={onQuickView} />;
};

export default MoreToExplore;
