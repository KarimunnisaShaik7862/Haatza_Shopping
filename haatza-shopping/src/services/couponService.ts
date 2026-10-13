import { Coupon } from '../types';
import { mockCoupons } from './mock/data/coupons';

export const couponService = {
  async getAvailableCoupons(): Promise<Coupon[]> {
    return [...mockCoupons];
  },

  async validateCoupon(
    code: string,
    orderTotal: number
  ): Promise<{ isValid: boolean; discount: number; coupon?: Coupon; error?: string }> {
    const cleanCode = code.trim().toUpperCase();
    const coupon = mockCoupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!coupon) {
      return {
        isValid: false,
        discount: 0,
        error: 'Invalid coupon code. Try HAATZA100, WELCOME200, or FESTIVE15',
      };
    }

    if (orderTotal < coupon.minOrderValue) {
      return {
        isValid: false,
        discount: 0,
        error: `Coupon applies on orders of ₹${coupon.minOrderValue} or more. Add ₹${coupon.minOrderValue - orderTotal} more to your cart.`,
      };
    }

    let discount = 0;
    if (coupon.discountType === 'flat') {
      discount = coupon.discountValue;
    } else if (coupon.discountType === 'percentage') {
      discount = Math.round((orderTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    }

    return {
      isValid: true,
      discount,
      coupon,
    };
  },
};
