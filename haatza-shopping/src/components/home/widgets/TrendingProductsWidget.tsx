import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { useSequentialScrollScale } from '../../../hooks';
import { optimizeImageUrl } from '../../../utils/imageOptimizer';
import { SectionHeader } from '../../common/SectionHeader';

interface TrendingProductsWidgetProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  className?: string;
  title?: string;
  viewAllLink?: string;
  subtitle?: string;
}

export const TrendingProductsWidget: React.FC<TrendingProductsWidgetProps> = ({
  products,
  className = '',
  title = 'Trending Collections',
  viewAllLink = '/products',
  subtitle,
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

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

  // Hook managing sequential small-to-large entrance animation and horizontal scroll scaling
  const {
    sectionRef,
    scrollContainerRef,
    itemRefs,
    hasEntered,
    prefersReducedMotion,
    getItemStyle,
  } = useSequentialScrollScale({
    itemCount: products.length,
    staggerMs: 130, // 130ms stagger
    entranceDurationMs: 600, // 600ms duration
    initialScale: 0.85, // Starts at 85% medium size
    offscreenScale: 0.85, // Off-screen horizontal items hold at 85% medium size
    initialOpacity: 0.6, // Subtle opacity from 0.6 to 1.0
    initialTranslateY: 10, // Upward reveal from 10px to 0px
  });

  const handleSelectOptions = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  if (!products || products.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-label="Trending Collections"
      className={`w-full py-6 sm:py-8 ${className}`}
    >
      {/* Scoped CSS for hidden scrollbar without disabling native horizontal scrolling */}
      <style>{`
        .haatza-hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .haatza-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* =========================================================================
          01. SECTION HEADER
          - Heading with View All link
          - Subtle fade-up reveal when section enters viewport
          ========================================================================= */}
      <div
        style={{
          opacity: hasEntered || prefersReducedMotion ? 1 : 0.6,
          transform: hasEntered || prefersReducedMotion ? 'translateY(0)' : 'translateY(10px)',
          transition: prefersReducedMotion ? 'none' : 'opacity 500ms ease-out, transform 500ms ease-out',
        }}
      >
        <SectionHeader
          title={title}
          subtitle={subtitle}
          viewAllLink={viewAllLink}
          className="mb-4 sm:mb-6"
        />
      </div>

      {/* =========================================================================
          02. SINGLE-ROW PRODUCT GALLERY WITH UNIFORM WIDTH & HEIGHT ACROSS ALL CARDS
          - Single horizontal row (flex-nowrap items-stretch)
          - All product cards have identical width and identical height
          - Perfectly aligned image boxes, titles, prices, and buttons
          - Sequential small-to-large scale reveal
          - Compact 14-18px gaps between items
          ========================================================================= */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        aria-label="Scrollable horizontal trending collections"
        className="haatza-hide-scrollbar flex flex-row flex-nowrap items-stretch gap-3.5 sm:gap-4 md:gap-[18px] overflow-x-auto overflow-y-hidden py-3 px-1 focus:outline-hidden"
      >
        {products.map((product, index) => {
          const optimizedImage = optimizeImageUrl(product.mainImage, { width: 340, quality: 80 });

          return (
            <div
              key={product.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="w-[168px] sm:w-[185px] md:w-[200px] lg:w-[212px] shrink-0 flex flex-col"
            >
              {/* Scalable Inner Content (Origin-center with guaranteed identical width and height matching Deals of the Day) */}
              <div
                style={getItemStyle(index)}
                className="origin-center flex flex-col justify-between w-full h-full text-center will-change-transform group cursor-pointer"
              >
                {/* 1. Product Image Container (Identical aspect-square box with edge-to-edge coverage across all products) */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-2.5 shrink-0 transition-colors group-hover:bg-slate-200/80">
                  <Link
                    to={`/product/${product.slug}`}
                    className="block w-full h-full"
                  >
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

                {/* 2. Structured Content Wrapper (Guarantees identical height across all cards) */}
                <div className="flex flex-col flex-1 justify-between w-full">
                  {/* Product Name (Fixed height slot with 2-line clamp matching Deals of the Day) */}
                  <div className="h-8.5 sm:h-9 flex items-center justify-center">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-xs sm:text-[13px] font-bold text-[#172033] hover:text-[#2962FF] line-clamp-2 leading-snug transition-colors px-1 font-heading text-center"
                      title={product.name}
                    >
                      {product.name}
                    </Link>
                  </div>

                  {/* Product Price & Optional MRP (Fixed height slot so prices align horizontally) */}
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

                  {/* Unified Button: "Add to Cart" pinned consistently at bottom of every card */}
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
      </div>
    </section>
  );
};
