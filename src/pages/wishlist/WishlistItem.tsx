import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { PriceDisplay } from '../../components/common/PriceDisplay';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export interface WishlistItemProps {
  product: Product;
  onMoveToCart: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({
  product,
  onMoveToCart,
  onRemove,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-[#E5EAF3] overflow-hidden flex flex-col justify-between shadow-soft-sm hover:shadow-soft hover:border-[#DBEAFE] transition-all">
      <div className="relative aspect-square bg-[#FAFAFA] overflow-hidden">
        <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full p-2">
          <img
            src={optimizeImageUrl(product.mainImage, { width: 320, quality: 75 }) || ''}
            alt={product.name || 'Product'}
            width="220"
            height="220"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 hover:bg-white text-zinc-400 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer"
          title="Remove from wishlist"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1 space-y-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] font-heading">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.slug || product.id}`}
            className="block text-xs sm:text-sm font-bold text-[#172033] hover:text-[#2962FF] line-clamp-2 transition-colors font-heading"
          >
            {product.name}
          </Link>
          <div className="mt-1">
            <PriceDisplay price={product.price} mrp={product.mrp} size="sm" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onMoveToCart(product)}
          className="w-full py-2 px-3 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-soft-sm font-heading cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Move to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
