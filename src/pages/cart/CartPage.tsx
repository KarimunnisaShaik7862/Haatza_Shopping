import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartSummary } from '../../components/cart/CartSummary';
import { EmptyState } from '../../components/common/EmptyState';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ShoppingBag, ArrowLeft, Bookmark, Trash2 } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export const CartPage: React.FC = () => {
  const { cart, savedForLater, clearCart, moveToCartFromSaved, removeFromSaved } = useCart();

  const breadcrumbs = [{ label: 'Cart' }];

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added anything to your cart yet. Discover trending products, fashion, and instant groceries."
          actionText="Start Shopping"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 sm:pb-16">
      <Breadcrumbs items={breadcrumbs} className="mb-4" />

      <div className="flex items-center justify-between pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
        </h1>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-zinc-500 hover:text-rose-600 transition-colors"
          >
            Clear Cart
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.length > 0 ? (
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}

              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#2962FF] hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-[#E5EAF3] shadow-soft-sm">
              <p className="text-sm font-semibold text-zinc-600">Your cart is currently empty.</p>
              <Link to="/" className="mt-3 inline-block text-xs font-bold text-[#2962FF] hover:underline">
                Explore Products →
              </Link>
            </div>
          )}

          {/* Saved For Later Section */}
          {savedForLater.length > 0 && (
            <div className="pt-8 border-t border-[#E5EAF3] mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#2962FF]" />
                <h3 className="font-bold text-base text-[#172033]">
                  Saved for Later ({savedForLater.length})
                </h3>
              </div>

              <div className="space-y-3">
                {savedForLater.map((saved) => {
                  const product = saved?.product || (saved as any) || {};
                  return (
                    <div
                      key={saved.id}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E5EAF3] shadow-soft-sm gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={optimizeImageUrl(product.mainImage, { width: 112, quality: 70 }) || ''}
                          alt={product.name || 'Product'}
                          width="56"
                          height="56"
                          loading="lazy"
                          decoding="async"
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">
                            {product.name || 'Product'}
                          </h4>
                          <p className="text-xs text-zinc-500 font-semibold mt-0.5">
                            ₹{product.price || 0}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveToCartFromSaved(saved.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#2962FF] text-white text-xs font-bold hover:bg-[#1E4ED8] transition-colors cursor-pointer"
                        >
                          Move to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromSaved(saved.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 cursor-pointer"
                          aria-label="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Cart Summary */}
        <div className="lg:col-span-4">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};
