import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HaatzaLiteCartItem, HaatzaLiteProduct } from '../types/haatzaLite.types';

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
  const [cart, setCart] = useState<HaatzaLiteCartItem[]>(() => {
    try {
      const saved = localStorage.getItem('haatza_lite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveCart = (items: HaatzaLiteCartItem[]) => {
    setCart(items);
    try {
      localStorage.setItem('haatza_lite_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (product: HaatzaLiteProduct, quantity: number = 1) => {
    const existingIndex = cart.findIndex((item) => item.productId === product.id);
    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([
        ...cart,
        {
          id: `cart-lite-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          productId: product.id,
          product,
          quantity,
        },
      ]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      saveCart(
        cart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (itemId: string) => {
    saveCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <HaatzaLiteCartContext.Provider
      value={{
        cart,
        itemCount,
        total,
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
    throw new Error('useHaatzaLiteCart must be used within a HaatzaLiteCartProvider');
  }
  return context;
}
