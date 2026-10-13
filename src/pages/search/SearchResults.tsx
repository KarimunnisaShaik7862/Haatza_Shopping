import React from 'react';
import { Product } from '../../types';
import { ProductGrid } from '../../components/products/ProductGrid';
import { Loading } from '../../components/common/Loading';

export interface SearchResultsProps {
  products: Product[];
  loading: boolean;
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ products, loading, query }) => {
  if (loading) {
    return <Loading type="grid" count={4} />;
  }

  return (
    <ProductGrid
      products={products}
      columns={4}
      emptyTitle="No results found"
      emptyDescription={`We couldn't find any products matching "${query}". Try checking your spelling or search for "Linen", "Headphones", "Mangoes", or "Cookware".`}
    />
  );
};

export default SearchResults;
