import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-medium',
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-700 text-white font-semibold text-xs leading-none">
        <span>{rating.toFixed(1)}</span>
        <Star className={`${starSizes[size]} fill-white stroke-none`} />
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`text-[#5F6368] ${textSizes[size]}`}>
          ({reviewCount.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
};
