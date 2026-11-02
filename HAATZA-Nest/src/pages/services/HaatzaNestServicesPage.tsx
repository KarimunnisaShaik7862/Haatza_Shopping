import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HaatzaNestHomeService } from '../../types/haatzaNest.types';
import { haatzaNestService } from '../../services/haatzaNestService';
import { HaatzaNestServiceGrid } from '../../components/HaatzaNestServices/HaatzaNestServiceGrid';
import { HaatzaNestLoading } from '../../components/common/HaatzaNestLoading';
import { HaatzaNestEmptyState } from '../../components/common/HaatzaNestEmptyState';

export const HaatzaNestServicesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';

  const [services, setServices] = useState<HaatzaNestHomeService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const allSrv = await haatzaNestService.getAllServices();

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
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 space-y-6">
      {loading ? (
        <HaatzaNestLoading type="skeleton" count={6} />
      ) : services.length === 0 ? (
        <HaatzaNestEmptyState
          title="No services match your criteria"
          description="Try selecting another category or clearing your search keywords."
          actionText="Show All Services"
          actionLink="/nest/services"
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
