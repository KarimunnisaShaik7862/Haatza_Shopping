import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ChevronLeft, Heart, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface FashionBudgetStoreWidgetProps {
  products: Product[];
  priceThreshold?: number;
  title?: string;
  priceLabel?: string;
  storeLabel?: string;
  description?: string;
  exploreLink?: string;
  className?: string;
}

export const FashionBudgetStoreWidget: React.FC<FashionBudgetStoreWidgetProps> = ({
  products,
  priceLabel = 'UNDER ₹499',
  storeLabel = 'BUDGET FINDS',
  description = 'High style, smart prices. Everyday fashion essentials without stretching your wallet.',
  exploreLink = '/products',
  className = '',
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // 5 products per group
  const PRODUCTS_PER_GROUP = 5;
  const totalGroups = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_GROUP));
  const [currentGroup, setCurrentGroup] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups);
      setIsTransitioning(false);
    }, 160);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroup((prev) => (prev - 1 + totalGroups) % totalGroups);
      setIsTransitioning(false);
    }, 160);
  };

  const displayedProducts = products.slice(
    currentGroup * PRODUCTS_PER_GROUP,
    currentGroup * PRODUCTS_PER_GROUP + PRODUCTS_PER_GROUP
  );

  if (!products || products.length === 0) return null;

  return (
    <section
      aria-label={`${priceLabel} ${storeLabel}`}
      className={`w-full py-6 sm:py-8 bg-white ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 sm:gap-6 pt-2">
        {/* Left Side: 3D Typography Header */}
        <div className="w-full md:w-[220px] lg:w-[250px] xl:w-[270px] shrink-0 flex flex-col items-center text-center justify-start select-none pt-2 md:pt-6">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2962FF] text-[10px] font-bold uppercase tracking-wider mb-2 font-heading">
            <Tag className="w-3 h-3" />
            <span>Value Picks</span>
          </div>

          <h2 className="font-heading font-black tracking-tight leading-[0.95] text-center flex flex-col items-center">
            <span className="block text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tighter text-[#2962FF] drop-shadow-xs">
              {priceLabel}
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight mt-1 text-[#0A192F]">
              {storeLabel}
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal font-sans mt-2.5 leading-snug text-center max-w-[210px] mx-auto">
            {description}
          </p>

          <div className="mt-3 flex justify-center">
            <Link
              to={exploreLink}
              aria-label={`Explore ${priceLabel} ${storeLabel}`}
              title={`Explore ${priceLabel} ${storeLabel}`}
              className="group inline-flex items-center justify-center text-[#2962FF] hover:text-[#1E4ED8] transition-colors p-1"
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>

        {/* Right Side: Prev/Next Controls + 5 Product Cards */}
        <div className="flex-1 w-full flex flex-col">
          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-1.5 mb-2.5 select-none">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous 5 products"
              className="w-7 h-7 rounded-full border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/80 flex items-center justify-center text-[#2962FF] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next 5 products"
              className="w-7 h-7 rounded-full border border-slate-200 hover:border-blue-300 bg-white hover:bg-blue-50/80 flex items-center justify-center text-[#2962FF] shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Single Row of 5 Products */}
          <div className="w-full overflow-x-auto no-scrollbar pb-1">
            <div
              className={`grid grid-cols-5 min-w-[540px] sm:min-w-0 gap-3 sm:gap-4 lg:gap-5 w-full transition-all duration-300 ease-out ${
                isTransitioning
                  ? 'opacity-0 scale-98 -translate-x-2'
                  : 'opacity-100 scale-100 translate-x-0'
              }`}
            >
              {displayedProducts.map((product) => {
                const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

                return (
                  <div
                    key={product.id}
                    className="flex flex-col group cursor-pointer text-left select-none"
                  >
                    {/* Square Image Box */}
                    <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 transition-all duration-300 group-hover:scale-[1.02]">
                      <Link to={`/product/${product.slug}`} className="block w-full h-full">
                        <img
                          src={optimizedImage}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-350 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Wishlist Heart Toggle */}
                      <button
                        type="button"
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className={`absolute top-2 right-2 w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-full flex items-center justify-center transition-all z-10 cursor-pointer ${
                          isInWishlist(product.id)
                            ? 'bg-[#2962FF] text-white shadow-xs'
                            : 'bg-white/90 text-zinc-600 hover:text-[#2962FF] hover:bg-white border border-[#E5EAF3]'
                        }`}
                        aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Details: Name and Price */}
                    <div className="mt-2 px-0.5 flex flex-col">
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-xs sm:text-[13px] font-semibold text-[#172033] hover:text-[#2962FF] line-clamp-1 leading-snug transition-colors font-heading"
                        title={product.name}
                      >
                        {product.name}
                      </Link>

                      <div className="flex items-baseline gap-1.5 mt-0.5 font-sans">
                        <span className="text-xs sm:text-[13.5px] font-bold text-[#0F2042] font-heading">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ₹{product.mrp.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
