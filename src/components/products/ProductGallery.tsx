import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { Zap } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discountPercentage?: number;
  instantDeliveryMinutes?: number;
}

export const ProductGallery: React.FC<ProductGalleryProps> = React.memo(({
  images,
  productName,
  discountPercentage,
  instantDeliveryMinutes,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80'];
  const activeImage = displayImages[selectedIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails (vertical on desktop, horizontal on mobile) */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0 md:w-20">
          {displayImages.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all bg-white shrink-0 ${
                  isSelected
                    ? 'border-[#2962FF] shadow-xs scale-102 ring-2 ring-[#2962FF]/20'
                    : 'border-[#E5EAF3] hover:border-[#DBEAFE] opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={optimizeImageUrl(img, { width: 120, quality: 70 })}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  width="80"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5EAF3] shadow-soft-sm">
        <img
          src={optimizeImageUrl(activeImage, { width: 700, quality: 80 })}
          alt={productName}
          width="600"
          height="600"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center transition-all duration-300"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {discountPercentage !== undefined && discountPercentage > 0 && (
            <Badge variant="discount" size="md">
              {discountPercentage}% OFF
            </Badge>
          )}
          {instantDeliveryMinutes && (
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" /> 15 MIN EXPRESS
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductGallery.displayName = 'ProductGallery';
