import React from 'react';
import { PriceDisplay } from '../../components/common/PriceDisplay';

interface ProductPricingOffersProps {
  price: number;
  mrp?: number;
  discountPercentage?: number;
  unit?: string;
}

export const ProductPricingOffers: React.FC<ProductPricingOffersProps> = ({
  price,
  mrp,
  discountPercentage,
  unit,
}) => {
  return (
    <div className="space-y-1">
      <PriceDisplay
        price={price}
        mrp={mrp}
        discountPercentage={discountPercentage}
        unit={unit}
        size="xl"
      />
    </div>
  );
};
