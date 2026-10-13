import React from 'react';
import { CartProvider as BaseCartProvider } from '../../context/CartContext';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseCartProvider>{children}</BaseCartProvider>;
};

export { BaseCartProvider };
export default CartProvider;
