import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useCart } from '@shopping/context/CartContext';
import { HaatzaLiteCartItem, HaatzaLiteProduct } from '../types/haatzaLite.types';
import { Product } from '@shopping/types';

interface HaatzaLiteCartContextType {
  cart: HaatzaLiteCartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: HaatzaLiteProduct, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const HaatzaLiteCartContext = createContext<HaatzaLiteCartContextType | undefined>(undefined);

export const HaatzaLiteCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const rootCart = useCart();

  const cart: HaatzaLiteCartItem[] = useMemo(() => {
    if (!rootCart || !rootCart.cart) return [];
    return rootCart.cart.map((item) => {
      const prod = item.product || (item as any) || {};
      return {
        id: item.id || `cart-${prod.id}`,
        productId: item.productId || prod.id,
        product: {
          id: prod.id || item.productId,
          slug: prod.slug || prod.id || item.productId,
          name: prod.name || 'Product',
          brand: prod.brand || 'HAATZA',
          categoryId: prod.categoryId || 'cat-lite',
          subcategoryId: prod.subcategoryId,
          categoryName: prod.categoryName || 'General',
          subcategoryName: prod.subcategoryName,
          description: prod.description || '',
          fullDescription: prod.fullDescription || '',
          price: prod.price || 0,
          mrp: prod.mrp || prod.price || 0,
          discountPercentage: prod.discountPercentage || 0,
          rating: prod.rating || 4.8,
          reviewCount: prod.reviewCount || 100,
          stock: prod.stock || 50,
          inStock: prod.inStock ?? true,
          unit: prod.unit || '1 unit',
          instantDeliveryMinutes: prod.instantDeliveryMinutes || 10,
          mainImage: prod.mainImage || '',
          images: prod.images || [prod.mainImage || ''],
          tags: prod.tags || [],
          sellerName: prod.sellerName || 'Haatza Lite DarkStore #14',
          sellerRating: prod.sellerRating || 4.9,
          deliveryDays: prod.deliveryDays || 0,
        },
        quantity: item.quantity || 1,
      };
    });
  }, [rootCart?.cart]);

  const addToCart = (product: HaatzaLiteProduct, quantity: number = 1) => {
    if (!rootCart) return;
    const commonProduct: Product = {
      id: product.id,
      slug: product.slug || product.id,
      name: product.name,
      brand: product.brand || 'HAATZA LITE',
      destination: 'lite',
      categoryId: product.categoryId || 'cat-lite',
      subcategoryId: product.subcategoryId,
      categoryName: product.categoryName || 'Lite Groceries',
      subcategoryName: product.subcategoryName,
      description: product.description || '',
      fullDescription: product.fullDescription || '',
      price: product.price,
      mrp: product.mrp || product.price,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating || 4.8,
      reviewCount: product.reviewCount || 100,
      stock: product.stock || 50,
      inStock: product.inStock ?? true,
      images: product.images || [product.mainImage],
      mainImage: product.mainImage,
      tags: product.tags || [],
      instantDeliveryMinutes: product.instantDeliveryMinutes || 10,
      unit: product.unit,
      sellerName: product.sellerName || 'Haatza Lite DarkStore #14',
      sellerRating: product.sellerRating || 4.9,
      deliveryDays: product.deliveryDays || 0,
    };
    rootCart.addToCart(commonProduct, quantity);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    rootCart?.updateQuantity(itemId, quantity);
  };

  const removeFromCart = (itemId: string) => {
    rootCart?.removeFromCart(itemId);
  };

  const clearCart = () => {
    rootCart?.clearCart();
  };

  return (
    <HaatzaLiteCartContext.Provider
      value={{
        cart,
        itemCount: rootCart?.itemCount || 0,
        total: rootCart?.total || 0,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </HaatzaLiteCartContext.Provider>
  );
};

export function useHaatzaLiteCart(): HaatzaLiteCartContextType {
  const context = useContext(HaatzaLiteCartContext);
  if (!context) {
    return {
      cart: [],
      itemCount: 0,
      total: 0,
      addToCart: () => {},
      updateQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    };
  }
  return context;
}
