import React from 'react';
import { HaatzaNestHomeService } from '../../types/haatzaNest.types';
import { HaatzaNestServiceCard } from './HaatzaNestServiceCard';

interface HaatzaNestServiceGridProps {
  services: HaatzaNestHomeService[];
  title?: string;
  subtitle?: string;
}

export const HaatzaNestServiceGrid: React.FC<HaatzaNestServiceGridProps> = ({
  services,
  title,
  subtitle,
}) => {
  return (
    <section className="space-y-4">
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            {title && (
              <h2 className="text-xl sm:text-2xl font-black text-[#172033] font-heading">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-zinc-500 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((srv) => (
          <HaatzaNestServiceCard key={srv.id} service={srv} />
        ))}
      </div>
    </section>
  );
};
