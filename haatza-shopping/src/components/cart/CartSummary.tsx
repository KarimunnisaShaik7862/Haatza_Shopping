import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import {
  Tag, ArrowRight, ShieldCheck,
  Truck, Package, CreditCard, Sparkles
} from 'lucide-react';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    discount,
    deliveryCharge,
    total,
    appliedCoupon,
  } = useCart();

  const totalUnits = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const totalMrp = cart.reduce((sum, item) => {
    const prod = item?.product || (item as any);
    const itemMrp = prod?.mrp || Math.round(((prod?.price || 0) + (item?.selectedVariant?.priceDelta || 0)) * 1.35);
    return sum + itemMrp * (item?.quantity || 1);
  }, 0);

  const totalSavings = Math.max(0, totalMrp - subtotal) + discount;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    // Clear any transient Buy Now session item so cart items are checked out
    sessionStorage.removeItem('haatza_buynow_item');
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg border border-[#E5E7EB] p-5 sm:p-6 space-y-5 shadow-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E7EB]">
        <h3 className="font-extrabold text-base text-[#1F1F1F] font-heading">
          Order Summary
        </h3>
        <span className="text-xs font-bold text-[#2962FF] bg-[#F5F7FF] border border-[#DBEAFE] px-2.5 py-1 rounded-full font-mono">
          {totalUnits} items
        </span>
      </div>

      {/* Free Delivery Tracker */}
      <div className="p-3 bg-[#F5F7FF] rounded-lg border border-[#DBEAFE] space-y-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#1F1F1F]">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-[#2962FF]" />
            {amountNeededForFreeDelivery > 0
              ? `Add ${formatINR(amountNeededForFreeDelivery)} more for FREE Delivery`
              : 'You have unlocked FREE Standard Delivery!'}
          </span>
          <span className="text-[#2962FF] font-bold">{freeDeliveryProgress}%</span>
        </div>
        <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#2962FF] h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Price Rows (Clean itemized breakdown) */}
      <div className="space-y-2.5 text-xs text-[#555555]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-[#555555]" />
            <span>Subtotal</span>
          </span>
          <span className="font-bold text-[#1F1F1F]">{formatINR(subtotal)}</span>
        </div>

        {totalMrp > subtotal && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#555555]" />
              <span>Total MRP</span>
            </span>
            <span className="line-through text-[#555555]">{formatINR(totalMrp)}</span>
          </div>
        )}

        {totalSavings > 0 && (
          <div className="flex items-center justify-between text-[#2962FF] font-bold">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2962FF]" />
              <span>Total Savings</span>
            </span>
            <span>-{formatINR(totalSavings)}</span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#555555]" />
            <span>Shipping</span>
          </span>
          <span className="font-bold">
            {deliveryCharge === 0 ? (
              <span className="text-emerald-700 font-extrabold uppercase">Free</span>
            ) : (
              formatINR(deliveryCharge)
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-[#555555]" />
            <span>Tax (18% GST)</span>
          </span>
          <span className="font-medium text-[#555555]">Included in price</span>
        </div>

        {discount > 0 && appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-lg">
            <span>Coupon ({appliedCoupon.code})</span>
            <span>-{formatINR(discount)}</span>
          </div>
        )}
      </div>

      {/* Total Amount Row */}
      <div className="pt-3 border-t border-[#E5E7EB] flex items-baseline justify-between text-base font-extrabold text-[#1F1F1F]">
        <span className="font-heading text-lg">Total</span>
        <span className="text-2xl font-black text-[#2962FF] font-heading">
          {formatINR(total)}
        </span>
      </div>

      {/* Primary Action Button: "Place Order" */}
      {showCheckoutButton && (
        <div className="pt-2 space-y-2">
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={handlePlaceOrder}
            className="w-full py-4 px-6 rounded-lg bg-[#2962FF] hover:bg-[#1747CC] disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed font-heading"
          >
            <span>Place Order</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <Link
              to="/"
              className="text-xs font-bold text-[#555555] hover:text-[#2962FF] hover:underline transition-colors"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#555555] pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Safe & Secure Checkout | 256-bit SSL</span>
      </div>

    </div>
  );
};

export default CartSummary;
