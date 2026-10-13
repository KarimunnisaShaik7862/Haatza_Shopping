import React from 'react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width = 360,
  height = 360,
  className = '',
}) => {
  const optimized = optimizeImageUrl(src, { width, quality: 75 });

  return (
    <img
      src={optimized}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`w-full h-full object-contain object-center transition-transform duration-500 ease-out ${className}`}
    />
  );
};

export default ProductImage;
