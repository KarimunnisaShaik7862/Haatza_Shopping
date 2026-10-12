import { Coupon } from '../../../types';

export const mockCoupons: Coupon[] = [
  {
    code: 'HAATZA100',
    description: 'Flat ₹100 discount on your order above ₹999',
    discountType: 'flat',
    discountValue: 100,
    minOrderValue: 999,
  },
  {
    code: 'WELCOME200',
    description: 'Flat ₹200 off for first-time shoppers on ₹1,499+',
    discountType: 'flat',
    discountValue: 200,
    minOrderValue: 1499,
  },
  {
    code: 'FESTIVE15',
    description: '15% instant discount up to ₹750 on orders above ₹1,999',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1999,
    maxDiscount: 750,
  },
  {
    code: 'NEXTSUPER',
    description: '10% instant discount up to ₹100 on Next grocery orders above ₹499',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 499,
    maxDiscount: 100,
  },
];
