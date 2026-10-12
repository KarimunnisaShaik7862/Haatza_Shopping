import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import { ProductGrid } from '../../components/products/ProductGrid';
import { SortControl } from '../../components/products/SortControl';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Search } from 'lucide-react';

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
      
      // Sort
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-[#E53935]" />
            <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
              Search Results for "{query}"
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-medium">
            Found {products.length} products matching your query
          </p>
        </div>

        <SortControl sortBy={sortBy} onChange={setSortBy} />
      </div>

      <div className="pt-6">
        {loading ? (
          <LoadingSkeleton type="grid" count={4} />
        ) : (
          <ProductGrid
            products={products}
            columns={4}
            emptyTitle="No results found"
            emptyDescription={`We couldn't find any products matching "${query}". Try checking your spelling or search for "Linen", "Headphones", "Mangoes", or "Cookware".`}
          />
        )}
      </div>
    </div>
  );
};
