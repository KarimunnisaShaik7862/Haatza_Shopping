import React from 'react';
import { formatCurrency } from '../../utils/currency';

export interface ProductPriceProps {
  price: number;
  mrp?: number;
  discountPercentage?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  mrp,
  discountPercentage,
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-lg sm:text-2xl',
  };

  return (
    <div className={`flex items-baseline gap-1.5 flex-wrap ${className}`}>
      <span className={`font-black text-[#172033] tracking-tight font-heading ${sizeStyles[size]}`}>
        {formatCurrency(price)}
      </span>

      {mrp && mrp > price && (
        <span className="text-[11px] sm:text-xs text-[#64748B] line-through font-body">
          {formatCurrency(mrp)}
        </span>
      )}

      {discountPercentage && discountPercentage > 0 ? (
        <span className="text-[10px] sm:text-xs font-black text-[#16A34A] font-heading">
          {discountPercentage}% off
        </span>
      ) : null}
    </div>
  );
};

export default ProductPrice;
