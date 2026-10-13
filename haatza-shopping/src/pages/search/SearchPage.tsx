import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Search } from 'lucide-react';
import { SearchSort } from './SearchSort';
import { SearchResults } from './SearchResults';
import { SearchFilters } from './SearchFilters';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'newest'>('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function doSearch() {
      setLoading(true);
      const results = await productService.searchProducts(query);
      
      if (sortBy === 'price_low') results.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price_high') results.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating') results.sort((a, b) => b.rating - a.rating);

      setProducts(results);
      setLoading(false);
    }
    doSearch();
  }, [query, sortBy]);

  const breadcrumbs = [
    { label: 'Search', link: '/search' },
    { label: query ? `"${query}"` : 'All' },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5EAF3] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-[#2962FF]" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
              Search Results for "{query}"
            </h1>
          </div>
          <div className="mt-1">
            <SearchFilters totalResults={products.length} query={query} />
          </div>
        </div>

        <SearchSort sortBy={sortBy} onChange={setSortBy} />
      </div>

      <div className="pt-6">
        <SearchResults products={products} loading={loading} query={query} />
      </div>
    </div>
  );
};

export default SearchPage;
