import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { Heart } from 'lucide-react';
import { WishlistItem } from './WishlistItem';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const breadcrumbs = [{ label: 'Wishlist' }];

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12">
        <EmptyState
          icon={Heart}
          title="Your Wishlist is Empty"
          description="Save styles, gadgets, and products you love by tapping the heart icon on any product."
          actionText="Discover Products"
          actionLink="/"
        />
      </div>
    );
  }

  const handleMoveToCart = (prod: any) => {
    addToCart(prod, 1);
    removeFromWishlist(prod.id);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-[#E5EAF3]">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
          My Saved Wishlist ({wishlist.length})
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
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
  );
};

export default WishlistPage;
