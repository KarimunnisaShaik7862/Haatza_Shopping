import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../components/common/Badge';
import { Zap, ZoomIn, Heart } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface ProductGalleryProps {
  productIdOrSlug?: string;
  images?: string[];
  productName: string;
  discountPercentage?: number;
  instantDeliveryMinutes?: number;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

const DEFAULT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1610030469668-932d56a29774?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80',
];

const SAFE_FALLBACK =
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80';

export const ProductGallery: React.FC<ProductGalleryProps> = React.memo(({
  productIdOrSlug,
  images,
  productName,
  discountPercentage,
  instantDeliveryMinutes,
  isWishlisted,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Guarantee at least 4-5 images so vertical thumbnails always render rich multi-angle shots
  const displayImages: string[] = React.useMemo(() => {
    const list = images && images.length > 0 ? [...images] : [];
    if (list.length >= 4) {
      return list;
    }
    // Complement with high-resolution fallback view angles
    for (const fallback of DEFAULT_FALLBACK_IMAGES) {
      if (list.length >= 5) break;
      if (!list.includes(fallback)) {
        list.push(fallback);
      }
    }
    return list.length > 0 ? list : DEFAULT_FALLBACK_IMAGES;
  }, [images]);

  const activeImage = displayImages[selectedIndex] || displayImages[0] || SAFE_FALLBACK;

  const handleOpenFullscreen = () => {
    const target = productIdOrSlug || encodeURIComponent(productName);
    navigate(`/product/${target}/fullscreen?index=${selectedIndex}`);
  };

  return (
    <div className="w-full">
      {/* Product Gallery Layout: Vertical Thumbnails on the LEFT, Big Image on the RIGHT */}
      <div className="flex flex-row gap-2.5 sm:gap-3 lg:gap-3.5 items-start w-full">
        {/* Left Side: Vertical Thumbnails Strip - Height reduced slightly to fit smoothly without overflow */}
        <div className="flex flex-col gap-2 shrink-0 w-14 sm:w-16 lg:w-[72px] max-h-[440px] sm:max-h-[480px] lg:max-h-[510px] overflow-y-auto no-scrollbar py-0.5">
          {displayImages.map((img, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View ${productName} image ${idx + 1}`}
                className={`relative w-14 h-16 sm:w-16 sm:h-[72px] lg:w-[72px] lg:h-[80px] rounded-xl overflow-hidden border-2 transition-all bg-slate-50 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs scale-[1.02]'
                    : 'border-[#E5EAF3] hover:border-[#2962FF]/50 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={optimizeImageUrl(img, { width: 140, quality: 75 })}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  width="72"
                  height="80"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = SAFE_FALLBACK;
                  }}
                  className="w-full h-full object-cover object-top"
                />
                {isSelected && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#2962FF] shadow-2xs" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side: Main Big Image Box - Edge to edge cleanly fitted until border box width and height */}
        <div
          id="product-main-image-box"
          className="relative flex-1 rounded-2xl bg-white border border-[#E5EAF3] shadow-soft-sm overflow-hidden group h-[420px] sm:h-[460px] lg:h-[500px] max-h-[calc(100vh-220px)]"
        >
          <img
            src={optimizeImageUrl(activeImage, { width: 1000, quality: 85 })}
            alt={productName}
            width="800"
            height="800"
            loading="eager"
            decoding="async"
            onError={(e) => {
              (e.target as HTMLImageElement).src = SAFE_FALLBACK;
            }}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Floating Badges (Discount & Express Delivery) */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            {discountPercentage !== undefined && discountPercentage > 0 && (
              <Badge variant="discount" size="md">
                {discountPercentage}% OFF
              </Badge>
            )}
            {instantDeliveryMinutes && (
              <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
                <Zap className="w-3 h-3 fill-current" /> 15 MIN EXPRESS
              </span>
            )}
          </div>

          {/* Wishlist Heart Button - Floating at top-right corner of main image */}
          {onToggleWishlist && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
              }}
              aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              title={isWishlisted ? 'In your Wishlist' : 'Add to Wishlist'}
              className="absolute top-3.5 right-3.5 p-2.5 rounded-full bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200/80 transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 group"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted
                    ? 'fill-[#E11D48] text-[#E11D48]'
                    : 'text-slate-600 group-hover:text-[#E11D48]'
                }`}
              />
            </button>
          )}

          {/* Fullscreen / Dedicated View Trigger Button */}
          <button
            type="button"
            onClick={handleOpenFullscreen}
            aria-label="View fullscreen image"
            title="View full screen"
            className="absolute bottom-3.5 right-3.5 p-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200/80 transition-all opacity-85 group-hover:opacity-100 hover:scale-105 cursor-pointer z-10"
          >
            <ZoomIn className="w-4 h-4 text-[#2962FF]" />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductGallery.displayName = 'ProductGallery';
export default ProductGallery;
