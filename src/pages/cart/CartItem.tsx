import React from 'react';
import { CartItemRow } from '../../components/cart/CartItemRow';
import { CartItem as CartItemType } from '../../types';

export interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = (props) => {
  return <CartItemRow {...props} />;
};

export { CartItemRow };
export default CartItem;
