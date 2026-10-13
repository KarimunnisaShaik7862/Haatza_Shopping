import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { HaatzaLiteProductGrid } from '../../components/HaatzaLiteProducts/HaatzaLiteProductGrid';
import { HaatzaLiteLoading } from '../../components/common/HaatzaLiteLoading';
import { HaatzaLiteEmptyState } from '../../components/common/HaatzaLiteEmptyState';

export const HaatzaLiteSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<HaatzaLiteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      try {
        const results = await haatzaLiteService.searchProducts(query);
        setProducts(results);
      } catch (e) {
        console.error('Search failed', e);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#172033] font-heading">
            {query ? `Search results for "${query}"` : 'All Quick Groceries'}
          </h1>
          <p className="text-xs text-zinc-500 font-medium">
            Found {products.length} {products.length === 1 ? 'item' : 'items'} ready for 10-15 min dispatch
          </p>
        </div>
      </div>

      {loading ? (
        <HaatzaLiteLoading type="grid" count={6} />
      ) : products.length === 0 ? (
        <HaatzaLiteEmptyState
          title={`No results found for "${query}"`}
          description="Try searching for everyday terms like 'milk', 'mango', 'paneer', or 'bread'."
          actionText="Browse Categories"
          actionLink="/lite/categories"
        />
      ) : (
        <HaatzaLiteProductGrid products={products} />
      )}
    </div>
  );
};
