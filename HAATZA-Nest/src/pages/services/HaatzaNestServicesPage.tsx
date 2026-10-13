import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HaatzaNestHomeService, HaatzaNestServiceCategory } from '../../types/haatzaNest.types';
import { haatzaNestService } from '../../services/haatzaNestService';
import { HaatzaNestServiceGrid } from '../../components/HaatzaNestServices/HaatzaNestServiceGrid';
import { HaatzaNestLoading } from '../../components/common/HaatzaNestLoading';
import { HaatzaNestEmptyState } from '../../components/common/HaatzaNestEmptyState';

export const HaatzaNestServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [services, setServices] = useState<HaatzaNestHomeService[]>([]);
  const [categories, setCategories] = useState<HaatzaNestServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, allSrv] = await Promise.all([
          haatzaNestService.getCategories(),
          haatzaNestService.getAllServices(),
        ]);
        setCategories(cats);

        let filtered = allSrv;
        if (categoryParam !== 'all') {
          filtered = filtered.filter((s) => s.categorySlug === categoryParam);
        }
        if (queryParam) {
          const q = queryParam.toLowerCase();
          filtered = filtered.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.category.toLowerCase().includes(q) ||
              s.shortDescription.toLowerCase().includes(q)
          );
        }
        setServices(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categoryParam, queryParam]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSearchParams({ category: 'all' })}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            categoryParam === 'all'
              ? 'bg-[#6C3FC5] text-white shadow-sm'
              : 'bg-white border border-zinc-200 text-zinc-700 hover:border-purple-300'
          }`}
        >
          All Services
        </button>
        {categories
          .filter((c) => c.slug !== 'all')
          .map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSearchParams({ category: cat.slug })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                categoryParam === cat.slug
                  ? 'bg-[#6C3FC5] text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-zinc-700 hover:border-purple-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {loading ? (
        <HaatzaNestLoading type="skeleton" count={6} />
      ) : services.length === 0 ? (
        <HaatzaNestEmptyState
          title="No services match your criteria"
          description="Try selecting another category or clearing your search keywords."
          actionText="Show All Services"
          actionLink="/services"
        />
      ) : (
        <HaatzaNestServiceGrid
          services={services}
          title={queryParam ? `Services matching "${queryParam}"` : undefined}
        />
      )}
    </div>
  );
};
