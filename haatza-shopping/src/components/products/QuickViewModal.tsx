import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Product, ProductVariant } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Modal } from '../common/Modal';
import { PriceDisplay } from '../common/PriceDisplay';
import { RatingDisplay } from '../common/RatingDisplay';
import { QuantitySelector } from '../common/QuantitySelector';
import { Heart, ShoppingBag, ArrowRight, Zap, Check } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isFavorited = isInWishlist(product.id);

  useEffect(() => {
    return () => {
      if (addTimeoutRef.current) clearTimeout(addTimeoutRef.current);
    };
  }, []);

  const handleAdd = () => {
    addToCart(product, quantity, selectedVariant);
    setIsAdded(true);
    if (addTimeoutRef.current) clearTimeout(addTimeoutRef.current);
    addTimeoutRef.current = setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Overview" maxWidth="xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200">
          <img
            src={optimizeImageUrl(product.mainImage, { width: 500, quality: 80 })}
            alt={product.name}
            width="400"
            height="400"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {product.brand}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#202124] leading-snug mt-1">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} />
              {product.instantDeliveryMinutes && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  <Zap className="w-3.5 h-3.5" /> 15m Delivery
                </span>
              )}
            </div>

            <PriceDisplay
              price={product.price + (selectedVariant?.priceDelta || 0)}
              mrp={product.mrp}
              discountPercentage={product.discountPercentage}
              unit={product.unit}
              size="lg"
            />

            <p className="text-xs text-[#5F6368] line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                  Select {product.variants[0].name}:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#2962FF] text-white border-[#2962FF] shadow-xs'
                            : 'bg-white text-zinc-700 border-zinc-200 hover:border-[#DBEAFE]'
                        }`}
                      >
                        {v.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-zinc-700">Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 space-y-2">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2962FF] hover:bg-[#1E4ED8] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition-colors ${
                  isFavorited
                    ? 'border-[#2962FF] bg-[#EEF3FF] text-[#2962FF]'
                    : 'border-zinc-200 hover:border-[#DBEAFE] text-zinc-600'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="w-full text-center text-xs font-semibold text-[#64748B] hover:text-[#2962FF] py-1.5 flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Full Details & Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
