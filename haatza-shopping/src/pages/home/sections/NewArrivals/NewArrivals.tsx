import React from 'react';
import { NewArrivalsSection } from '../../../../components/home/NewArrivalsSection';
import { Product } from '../../../../types';

export interface NewArrivalsProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products = [],
  onQuickView,
}) => {
  return <NewArrivalsSection products={products} onQuickView={onQuickView} />;
};

export default NewArrivals;
