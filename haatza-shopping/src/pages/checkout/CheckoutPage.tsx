import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { formatINR } from '../../utils/formatters';
import { Address, Order } from '../../types';
import { AddressForm } from '../../components/forms/AddressForm';
import { Modal } from '../../components/common/Modal';
import { 
  ShieldCheck, MapPin, Plus, CheckCircle2, 
  CreditCard, Smartphone, Building, Banknote, ArrowRight
} from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discount, deliveryCharge, total, clearCart } = useCart();
  const { user, addresses, addAddress } = useAuth();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ''
  );
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('demo-user@okhdfcbank');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-[#172033] mb-2">No Items to Checkout</h2>
        <p className="text-xs text-[#64748B] mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link to="/" className="px-6 py-2.5 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl text-xs transition-colors shadow-soft-sm">
          Browse Products
        </Link>
      </div>
    );
  }

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setErrorMessage('Please select or add a delivery address.');
      return;
    }

    setErrorMessage('');
    setIsPlacingOrder(true);

    try {
      const orderItems = cart.map((c) => ({
        product: c.product,
        selectedVariant: c.selectedVariant,
        quantity: c.quantity,
        price: c.product.price + (c.selectedVariant?.priceDelta || 0),
      }));

      const newOrder = await orderService.placeOrder({
        items: orderItems,
        subtotal,
        discount,
        deliveryCharge: deliverySpeed === 'express' ? deliveryCharge + 49 : deliveryCharge,
        total: deliverySpeed === 'express' ? total + 49 : total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        shippingAddress: selectedAddress,
      });

      clearCart();
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${newOrder.orderNumber}`);
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to place order. Please try again.');
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8">
      <div className="pb-6 border-b border-[#E5EAF3] mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Review your delivery address, shipping preference, and payment method
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Steps */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Delivery Address */}
          <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 space-y-4 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF3]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2962FF] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-bold text-sm text-[#172033] uppercase tracking-wider">
                  Select Delivery Address
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddAddressModalOpen(true)}
                className="text-xs font-bold text-[#2962FF] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-[#2962FF] bg-[#EEF3FF] shadow-soft-sm'
                        : 'border-[#E5EAF3] hover:border-[#DBEAFE] bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#172033]">{addr.fullName}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F7FF] text-[#64748B] border border-[#E5EAF3]">
                        {addr.addressType}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-snug">
                      {addr.addressLine1}, {addr.addressLine2 ? `${addr.addressLine2}, ` : ''}
                      {addr.city}, {addr.state} - <strong className="text-[#172033]">{addr.pincode}</strong>
                    </p>
                    <p className="text-xs text-[#64748B] mt-2 font-medium">📞 {addr.phone}</p>

                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#2962FF] absolute top-3 right-3" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 space-y-4 shadow-soft">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E5EAF3]">
              <span className="w-6 h-6 rounded-full bg-[#2962FF] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-sm text-[#172033] uppercase tracking-wider">
                Choose Delivery Option
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliverySpeed === 'standard'
                    ? 'border-[#2962FF] bg-[#EEF3FF]'
                    : 'border-[#E5EAF3] bg-white hover:border-[#DBEAFE]'
                }`}
              >
                <input
                  type="radio"
                  name="deliverySpeed"
                  checked={deliverySpeed === 'standard'}
                  onChange={() => setDeliverySpeed('standard')}
                  className="mt-0.5 text-[#2962FF] focus:ring-[#2962FF]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#172033]">Standard Delivery</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      FREE (Orders &gt; ₹499)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Estimated in 2-3 business days</p>
                </div>
              </label>

              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  deliverySpeed === 'express'
                    ? 'border-[#2962FF] bg-[#EEF3FF]'
                    : 'border-[#E5EAF3] bg-white hover:border-[#DBEAFE]'
                }`}
              >
                <input
                  type="radio"
                  name="deliverySpeed"
                  checked={deliverySpeed === 'express'}
                  onChange={() => setDeliverySpeed('express')}
                  className="mt-0.5 text-[#2962FF] focus:ring-[#2962FF]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#172033]">Priority Express</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      +₹49
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-0.5">Next-day guaranteed delivery slot</p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method (Demonstration UI Only) */}
          <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 space-y-4 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF3]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2962FF] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-bold text-sm text-[#172033] uppercase tracking-wider">
                  Payment Method (Demo Mode)
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Simulated Gateway
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'card', label: 'Credit / Debit Cards (Demo)', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'netbanking', label: 'Net Banking (Top Indian Banks)', icon: <Building className="w-4 h-4" /> },
                { id: 'cod', label: 'Cash on Delivery', icon: <Banknote className="w-4 h-4" /> },
              ].map((m) => {
                const isSelected = paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#2962FF] bg-[#EEF3FF] font-bold text-[#2962FF]'
                        : 'border-[#E5EAF3] bg-white hover:border-[#DBEAFE] text-[#64748B]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={isSelected}
                      onChange={() => setPaymentMethod(m.id as any)}
                      className="text-[#2962FF] focus:ring-[#2962FF]"
                    />
                    <div className="flex items-center gap-2 text-xs">
                      {m.icon}
                      <span>{m.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-4 bg-[#F5F7FF] rounded-2xl border border-[#E5EAF3] space-y-2">
                <label className="block text-xs font-semibold text-[#172033]">
                  Demo UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full max-w-sm px-3 py-2 text-xs rounded-xl border border-[#E5EAF3] bg-white focus:outline-hidden focus:border-[#2962FF] focus-ring-blue text-[#172033]"
                />
                <p className="text-[11px] text-[#64748B]">
                  * Note: This is an architectural simulation for frontend demonstration. No actual charges will occur.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E5EAF3] p-6 space-y-5 shadow-soft">
            <h3 className="font-bold text-base text-[#172033] pb-3 border-b border-[#E5EAF3]">
              Review Items ({cart.length})
            </h3>

            {/* Items miniature list */}
            <div className="max-h-56 overflow-y-auto space-y-3 no-scrollbar pr-1">
              {cart.map((c) => (
                <div key={c.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={optimizeImageUrl(c.product.mainImage, { width: 96, quality: 70 })}
                    alt={c.product.name}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-lg object-cover border border-[#E5EAF3] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#172033] truncate">{c.product.name}</p>
                    <p className="text-[#64748B]">
                      Qty: {c.quantity} {c.selectedVariant ? `• ${c.selectedVariant.value}` : ''}
                    </p>
                  </div>
                  <span className="font-bold text-[#172033] shrink-0">
                    {formatINR((c.product.price + (c.selectedVariant?.priceDelta || 0)) * c.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-[#E5EAF3] text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#172033] font-medium">{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-[#172033] font-medium">
                  {deliverySpeed === 'express'
                    ? formatINR(deliveryCharge + 49)
                    : deliveryCharge === 0
                    ? 'FREE'
                    : formatINR(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#172033] pt-2 border-t border-[#E5EAF3]">
                <span>Total Payable</span>
                <span className="text-[#2962FF] text-lg">
                  {formatINR(deliverySpeed === 'express' ? total + 49 : total)}
                </span>
              </div>
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full py-4 px-4 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-sm rounded-xl transition-all shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isPlacingOrder ? 'Confirming Order...' : 'Place Demo Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure Bank Grade Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        title="Add Delivery Address"
        maxWidth="lg"
      >
        <AddressForm
          onSubmit={(newAddr) => {
            const created = addAddress(newAddr);
            setSelectedAddressId(created.id);
            setIsAddAddressModalOpen(false);
          }}
          onCancel={() => setIsAddAddressModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
