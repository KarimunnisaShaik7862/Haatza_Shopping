import React from 'react';
import { formatINR } from '../../utils/formatters';
import { PriceInfoButton } from './PriceInfoModal';

interface PriceDisplayProps {
  price: number;
  mrp?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  unit?: string;
  className?: string;
  productName?: string;
  showInfo?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  mrp,
  discountPercentage,
  size = 'md',
  unit,
  className = '',
  productName,
  showInfo = true,
}) => {
  const sizeConfig = {
    sm: {
      price: 'text-sm font-bold text-[#202124]',
      mrp: 'text-xs text-[#5F6368] line-through',
      discount: 'text-xs font-semibold text-emerald-600',
    },
    md: {
      price: 'text-base font-bold text-[#202124]',
      mrp: 'text-xs text-[#5F6368] line-through',
      discount: 'text-xs font-semibold text-emerald-600',
    },
    lg: {
      price: 'text-xl font-extrabold text-[#202124]',
      mrp: 'text-sm text-[#5F6368] line-through',
      discount: 'text-sm font-bold text-emerald-600',
    },
    xl: {
      price: 'text-3xl font-extrabold text-[#202124]',
      mrp: 'text-base text-[#5F6368] line-through',
      discount: 'text-base font-bold text-emerald-600',
    },
  };

  const current = sizeConfig[size];
  const hasDiscount = mrp && mrp > price;

  return (
    <div className={`flex items-center flex-wrap gap-x-1.5 gap-y-0.5 ${className}`}>
      <span className={current.price}>
        {formatINR(price)}
        {unit && <span className="text-xs font-normal text-[#5F6368] ml-1">/{unit}</span>}
      </span>

      {hasDiscount && (
        <>
          <span className={current.mrp}>{formatINR(mrp)}</span>
          {discountPercentage !== undefined && discountPercentage > 0 && (
            <span className={current.discount}>{discountPercentage}% OFF</span>
          )}
        </>
      )}

      {showInfo && (
        <PriceInfoButton
          productName={productName || 'Product'}
          price={price}
          mrp={mrp || price}
          discountPercentage={discountPercentage}
          unit={unit}
          size={size === 'xl' ? 'md' : size === 'lg' ? 'sm' : 'xs'}
          theme="blue"
        />
      )}
    </div>
  );
};
