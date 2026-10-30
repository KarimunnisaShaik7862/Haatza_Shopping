import React from 'react';
import { HaatzaLiteProduct } from '../../types/haatzaLite.types';
import { HaatzaLiteProductCard } from './HaatzaLiteProductCard';
import { HaatzaLiteCategoryShowcase } from './HaatzaLiteCategoryShowcase';

interface HaatzaLiteProductGridProps {
  products: HaatzaLiteProduct[];
  title?: string;
  subtitle?: string;
}

export const HaatzaLiteProductGrid: React.FC<HaatzaLiteProductGridProps> = ({
  products,
  title,
}) => {
  return (
    <HaatzaLiteCategoryShowcase title={title || 'Featured Aisles'}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4.5">
        {products.map((p) => (
          <HaatzaLiteProductCard key={p.id} product={p} />
        ))}
      </div>
    </HaatzaLiteCategoryShowcase>
  );
};
