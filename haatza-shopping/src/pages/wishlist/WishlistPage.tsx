import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Heart, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { WishlistItem } from './WishlistItem';
import { EmptyWishlistIllustration } from './EmptyWishlistIllustration';
import { Product } from '../../types';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const breadcrumbs = [{ label: 'My List' }];

  // Adding item to cart with 30-item capacity enforcement and moving to cart page
  const handleMoveToCart = (product: Product) => {
    const success = addToCart(product, 1);
    if (success) {
      navigate('/cart');
    }
  };

  // Empty State
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[75vh] bg-[#F8FAFC] flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-12 text-center space-y-5 shadow-xs">
          {/* Miniature Two-Phone Animated Wishlist Illustration */}
          <EmptyWishlistIllustration />

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#1F1F1F] font-heading tracking-tight">
              Your list is waiting for your favourites.
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] max-w-sm mx-auto leading-relaxed">
              Save styles, gadgets, and products you love by tapping the heart icon on any product across our marketplace.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2962FF] hover:bg-[#1747CC] text-white font-extrabold rounded-xl text-sm transition-all shadow-md hover:shadow-lg font-heading cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-8 pb-24 sm:pb-16 font-body">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 space-y-6">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} className="text-xs" />

        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] tracking-tight font-heading">
              My List
            </h1>
          </div>

          {/* Continue Shopping Action */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#2962FF] text-[#1F1F1F] hover:text-[#2962FF] text-xs font-bold transition-all shadow-2xs shrink-0 self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue shopping</span>
          </Link>
        </div>

        {/* Wishlist Products Grid (Matching More to Explore & Deals of the Day Layout) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(185px,1fr))] gap-3.5 sm:gap-4 md:gap-[18px] pt-2">
          {wishlist.map((item, idx) => {
            const product = item?.product || (item as any);
            if (!product || !product.id) return null;
            return (
              <WishlistItem
                key={product.id || idx}
                product={product}
                onMoveToCart={handleMoveToCart}
                onRemove={removeFromWishlist}
              />
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WishlistPage;
