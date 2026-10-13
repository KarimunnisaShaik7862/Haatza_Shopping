import React from 'react';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { HaatzaLiteProductCard } from './HaatzaLiteProductCard';

interface HaatzaLiteProductGridProps {
  products: HaatzaLiteProduct[];
  title?: string;
  subtitle?: string;
}

export const HaatzaLiteProductGrid: React.FC<HaatzaLiteProductGridProps> = ({
  products,
  title,
  subtitle,
}) => {
  return (
    <section className="space-y-4">
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
          <div>
            {title && (
              <h2 className="text-lg sm:text-xl font-black text-[#172033] font-heading">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {products.map((p) => (
          <HaatzaLiteProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};
