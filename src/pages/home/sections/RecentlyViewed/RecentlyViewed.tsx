import React from 'react';
import { RecentlyViewedSection } from '../../../../components/home/RecentlyViewedSection';
import { Product } from '../../../../types';

export interface RecentlyViewedProps {
  onQuickView?: (product: Product) => void;
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ onQuickView }) => {
  return <RecentlyViewedSection onQuickView={onQuickView} />;
};

export default RecentlyViewed;
