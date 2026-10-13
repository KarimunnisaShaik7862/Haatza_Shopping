import React from 'react';
import { Under49StoreSection } from '../../../../components/home/Under49StoreSection';
import { Product } from '../../../../types';
import { STORE_BUDGET_PRODUCTS } from './store.data';

export interface Rupees14StoreProps {
  products?: Product[];
}

export const Rupees14Store: React.FC<Rupees14StoreProps> = ({ products = STORE_BUDGET_PRODUCTS }) => {
  return <Under49StoreSection products={products} />;
};

export default Rupees14Store;
