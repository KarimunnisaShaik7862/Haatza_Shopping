import React from 'react';
import { SortControl } from '../../components/products/SortControl';

export interface SearchSortProps {
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
  onChange: (sort: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest') => void;
}

export const SearchSort: React.FC<SearchSortProps> = ({ sortBy, onChange }) => {
  return <SortControl sortBy={sortBy} onChange={onChange} />;
};

export default SearchSort;
