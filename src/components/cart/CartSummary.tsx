import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { Tag, ArrowRight, ShieldCheck, Check, X, Truck } from 'lucide-react';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const {
    subtotal,
    discount,
    deliveryCharge,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setCouponError('');
    setIsApplying(true);
    const result = await applyCoupon(couponCode);
    setIsApplying(false);

    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponCode('');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-6 shadow-2xs">
      <h3 className="font-bold text-base text-[#202124] pb-3 border-b border-zinc-100">
        Order Summary
      </h3>

      {/* Free Delivery Tracker */}
      <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-zinc-700">
            <Truck className="w-4 h-4 text-[#E53935]" />
            {amountNeededForFreeDelivery > 0
              ? `Add ${formatINR(amountNeededForFreeDelivery)} more for FREE Delivery`
              : 'You have unlocked FREE Standard Delivery!'}
          </span>
          <span className="text-[#E53935]">{freeDeliveryProgress}%</span>
        </div>
        <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#E53935] h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Coupon Application Box */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Apply Coupon Code
        </label>

        {appliedCoupon ? (
          <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>
                {appliedCoupon.code} applied (Saved {formatINR(discount)})
              </span>
            </div>
            <button
              type="button"
              onClick={removeCoupon}
              className="text-zinc-500 hover:text-rose-600 font-semibold p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                  setCouponError('');
                }}
                placeholder="HAATZA100 or WELCOME200"
                className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium rounded-xl border border-zinc-200 focus:outline-hidden focus:border-[#E53935]"
              />
            </div>
            <button
              type="submit"
              disabled={isApplying || !couponCode.trim()}
              className="px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-bold rounded-xl disabled:opacity-50 transition-colors"
            >
              {isApplying ? 'Applying...' : 'Apply'}
            </button>
          </form>
        )}

        {couponError && <p className="text-xs text-rose-600 font-medium">{couponError}</p>}

        {/* Quick voucher suggestion tags */}
        {!appliedCoupon && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['HAATZA100', 'WELCOME200', 'FESTIVE15'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCouponCode(code)}
                className="text-[10px] font-bold text-zinc-600 bg-zinc-100 hover:bg-[#FFEBEE] hover:text-[#E53935] px-2 py-0.5 rounded-md transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2.5 text-xs text-zinc-600 pt-3 border-t border-zinc-100">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900">{formatINR(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-semibold">
            <span>Coupon Discount</span>
            <span>-{formatINR(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="font-semibold text-zinc-900">
            {deliveryCharge === 0 ? (
              <span className="text-emerald-600 font-bold uppercase">Free</span>
            ) : (
              formatINR(deliveryCharge)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm font-extrabold text-[#202124] pt-3 border-t border-zinc-200">
          <span>Total Amount</span>
          <span className="text-lg text-[#E53935]">{formatINR(total)}</span>
        </div>
      </div>

      {/* Checkout Action Button */}
      {showCheckoutButton && (
        <div className="pt-2">
          <Link
            to="/checkout"
            className="w-full py-3.5 px-4 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Safe & Secure Checkout | 256-bit SSL</span>
      </div>
    </div>
  );
};
