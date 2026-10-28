import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { History, ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useRecentlyViewed } from '../../../context/RecentlyViewedContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { ProductCarouselTrack } from '../ProductCarouselTrack';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';

interface RecentlyViewedWidgetProps {
  onQuickView?: (product: Product) => void;
  className?: string;
}

export const RecentlyViewedWidget: React.FC<RecentlyViewedWidgetProps> = ({
  onQuickView,
  className = '',
}) => {
  const { recentlyViewed } = useRecentlyViewed();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null; // Gracefully collapses when user has zero browsing history
  }

  return (
    <section
      aria-label="Recently Viewed Products"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2962FF] mb-1 font-heading">
            <History className="w-3.5 h-3.5 text-[#2962FF]" />
            <span>Browsing History</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
            Recently Viewed
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pick up right where you left off.
          </p>
        </div>
      </div>

      {/* Carousel Track with Identical Width and Height Cards Matching Deals of the Day */}
      <ProductCarouselTrack scrollDistance={280}>
        {recentlyViewed.map((product) => {
          const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

          return (
            <div
              key={product.id}
              className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0 flex flex-col"
            >
              {/* Scalable Inner Content with Guaranteed Identical Height */}
              <div className="origin-center flex flex-col justify-between w-full h-full text-center group cursor-pointer">
                {/* 1. Proportional Square Image Box */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-colors group-hover:bg-slate-200/80">
                  <Link to={`/product/${product.slug}`} className="block w-full h-full">
                    <img
                      src={optimizedImage}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center select-none transition-transform duration-350 ease-out group-hover:scale-[1.04]"
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

                {/* 2. Structured Content Wrapper (Exact same height slots as Deals of the Day) */}
                <div className="flex flex-col flex-1 justify-between w-full">
                  {/* Product Name (Fixed height slot with 2-line clamp) */}
                  <div className="h-8.5 sm:h-9 flex items-center justify-center">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-xs sm:text-[13px] font-bold text-[#172033] hover:text-[#2962FF] line-clamp-2 leading-snug transition-colors px-1 font-heading text-center"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Product Price & MRP */}
                  <div className="h-5.5 sm:h-6 flex items-baseline justify-center gap-1.5 mt-0.5 font-sans shrink-0">
                    <span className="text-xs sm:text-[15px] font-black text-slate-950 font-heading">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-[11px] text-slate-400 line-through">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Unified Button: "Add to Cart" pinned at bottom */}
                  <button
                    type="button"
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full mt-2 h-8 sm:h-8.5 px-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 font-heading cursor-pointer select-none active:scale-95 bg-[#2962FF] hover:bg-[#1E4ED8] text-white shadow-2xs hover:shadow-xs shrink-0"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </ProductCarouselTrack>
    </section>
  );
};
