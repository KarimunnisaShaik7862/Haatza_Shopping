import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { haatzaLiteService } from '../../services/haatzaLiteService';
import { HaatzaLiteProductGrid } from '../../components/HaatzaLiteProducts/HaatzaLiteProductGrid';
import { HaatzaLiteLoading } from '../../components/common/HaatzaLiteLoading';
import { HaatzaLiteEmptyState } from '../../components/common/HaatzaLiteEmptyState';
import { Sparkles, Search } from 'lucide-react';

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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 sm:py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5EBE6] shadow-[0_4px_18px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8ED] text-[#0C831F] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#0C831F]/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPRESS SEARCH AISLE</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#111D15] font-heading">
            {query ? `Search results for "${query}"` : 'All Quick Groceries'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Found {products.length} {products.length === 1 ? 'item' : 'items'} ready for immediate 10-15 min dispatch
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#0C831F] bg-[#EAF8ED] px-4 py-2 rounded-2xl border border-[#CBEAD2]">
          <Search className="w-4 h-4" />
          <span>Instant Dark Store Stock</span>
        </div>
      </div>

      {loading ? (
        <HaatzaLiteLoading type="grid" count={6} />
      ) : products.length === 0 ? (
        <HaatzaLiteEmptyState
          title={`No results found for "${query}"`}
          description="Try searching for everyday items like 'mango', 'milk', 'bread', 'paneer', or 'chips'."
          actionText="Browse Categories"
          actionLink="/lite/categories"
        />
      ) : (
        <HaatzaLiteProductGrid products={products} />
      )}
    </div>
  );
};
