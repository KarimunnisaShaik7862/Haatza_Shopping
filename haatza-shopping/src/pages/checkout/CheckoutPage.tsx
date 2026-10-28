import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLocationContext } from '../../context/LocationContext';
import { orderService } from '../../services/orderService';
import { couponService } from '../../services/couponService';
import { formatINR } from '../../utils/formatters';
import { Product, ProductVariant, OrderItem } from '../../types';
import { optimizeImageUrl } from '../../utils/imageOptimizer';
import { PaymentSection, PaymentMethodType } from '../../components/checkout/PaymentSection';
import {
  ShieldCheck, MapPin, Plus, CheckCircle2,
  CreditCard, Smartphone, Building, Banknote,
  ArrowRight, ArrowLeft, Trash2, Tag, Percent,
  AlertCircle, Check, ChevronDown, ChevronUp,
  Sparkles, Wallet, RefreshCw
} from 'lucide-react';

interface BuyNowItemState {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

interface EmiSelection {
  bankId: string;
  bankName: string;
  months: number;
  monthlyAmount: number;
  interestRate: string;
  processingFee: string;
  totalPayable: number;
  isNoCost?: boolean;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const { user, addresses, addAddress, savedCards, addSavedCard, deductWalletBalance } = useAuth();
  const { selectedAddress: locationSelectedAddress, openLocationModal } = useLocationContext();

  // Checkout step: 'summary' (Step 1) | 'payment' (Step 2)
  const [currentStep, setCurrentStep] = useState<'summary' | 'payment'>('summary');

  // Check for Buy Now item in location state or sessionStorage
  const [buyNowItem, setBuyNowItem] = useState<BuyNowItemState | null>(() => {
    const locItem = (location.state as any)?.buyNowItem as BuyNowItemState | undefined;
    if (locItem && locItem.product) return locItem;
    try {
      const stored = sessionStorage.getItem('haatza_buynow_item');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.product) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse buyNowItem from storage', e);
    }
    return null;
  });

  const isBuyNowMode = Boolean(buyNowItem);

  // Address selection
  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    return addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || '';
  });

  // EMI selection state (carried forward between steps)
  const [isEmiExpandedInSummary, setIsEmiExpandedInSummary] = useState(false);
  const [selectedEmiBank, setSelectedEmiBank] = useState<string>('hdfc');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiSelection | null>(null);

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  // Payment method selection (Step 2) - initially null (user-controlled)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(null);
  
  // Payment detailed form fields
  const [upiOption, setUpiOption] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'custom' | 'qr'>('gpay');
  const [customUpiId, setCustomUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    saveCard: true,
  });

  const [selectedSavedCardId, setSelectedSavedCardId] = useState<string | null>(() => {
    return savedCards.length > 0 ? savedCards[0].id : null;
  });
  const [cardCvvs, setCardCvvs] = useState<Record<string, string>>({});
  const [useWalletBalance, setUseWalletBalance] = useState(true);

  const [selectedNetBank, setSelectedNetBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');
  
  // COD security captcha
  const [codCaptcha, setCodCaptcha] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [codCaptchaInput, setCodCaptchaInput] = useState('');

  // Submission state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync selected address if address list updates
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || '');
    }
  }, [addresses, selectedAddressId]);

  // Determine current active checkout items
  const activeItems: OrderItem[] = isBuyNowMode && buyNowItem
    ? [
        {
          product: buyNowItem.product,
          selectedVariant: buyNowItem.selectedVariant,
          quantity: buyNowItem.quantity,
          price: buyNowItem.product.price + (buyNowItem.selectedVariant?.priceDelta || 0),
        },
      ]
    : cart.map((c) => ({
        product: c.product,
        selectedVariant: c.selectedVariant,
        quantity: c.quantity,
        price: c.product.price + (c.selectedVariant?.priceDelta || 0),
      }));

  // Calculations
  const totalMrp = activeItems.reduce((sum, item) => {
    const itemMrp = item.product.mrp || item.product.price * 1.35;
    return sum + itemMrp * item.quantity;
  }, 0);

  const subtotal = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const productDiscount = Math.max(0, totalMrp - subtotal);
  const deliveryCharge = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryCharge);
  const gstAmount = Math.round(subtotal * 0.18); // 18% included GST

  // EMI eligibility threshold: orders >= ₹2,000
  const isEmiEligible = finalTotal >= 2000;

  // Selected address object (prioritizing LocationContext, then user's selected/default address)
  const selectedAddress =
    locationSelectedAddress ||
    addresses.find((a) => a.id === selectedAddressId) ||
    addresses.find((a) => a.isDefault) ||
    addresses[0] ||
    null;

  // Quantity controls
  const handleUpdateQuantity = (itemIndex: number, newQty: number) => {
    if (newQty < 1) return;
    if (isBuyNowMode && buyNowItem) {
      const updated = { ...buyNowItem, quantity: newQty };
      setBuyNowItem(updated);
      try {
        sessionStorage.setItem('haatza_buynow_item', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    } else {
      const cartItem = cart[itemIndex];
      if (cartItem) {
        updateQuantity(cartItem.id, newQty);
      }
    }
  };

  const handleRemoveItem = (itemIndex: number) => {
    if (isBuyNowMode) {
      setBuyNowItem(null);
      sessionStorage.removeItem('haatza_buynow_item');
    } else {
      const cartItem = cart[itemIndex];
      if (cartItem) {
        removeFromCart(cartItem.id);
      }
    }
  };

  // Coupon handling
  const handleApplyCoupon = async (codeToApply: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;

    setCouponError('');
    setIsApplyingCoupon(true);

    const res = await couponService.validateCoupon(code, subtotal);
    setIsApplyingCoupon(false);

    if (res.isValid && res.coupon) {
      setAppliedCouponCode(res.coupon.code);
      setCouponDiscount(res.discount);
      setCouponCode('');
    } else {
      setCouponError(res.error || 'Invalid coupon code for this order.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCouponCode(null);
    setCouponDiscount(0);
    setCouponError('');
  };

  // Continue from Step 1 to Step 2
  const handleContinueToPayment = () => {
    setErrorMessage('');
    if (!selectedAddress) {
      setErrorMessage('Please select or add a delivery address to continue.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validate required address fields
    if (
      !selectedAddress.fullName ||
      !selectedAddress.phone ||
      (!selectedAddress.addressLine1 && !selectedAddress.houseNumber) ||
      !selectedAddress.city ||
      !selectedAddress.pincode
    ) {
      setErrorMessage('Please complete all mandatory address fields (Name, Phone, Street/House, City, PIN code).');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (activeItems.length === 0) {
      setErrorMessage('Your order summary has no items.');
      return;
    }

    // If an EMI plan was chosen in step 1, pre-set paymentMethod to 'emi'
    if (selectedEmiPlan && isEmiEligible) {
      setPaymentMethod('card');
    }

    setCurrentStep('payment');
    if (window.scrollY > 80) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Place Order handler (Step 2)
  const handlePlaceOrder = async () => {
    setErrorMessage('');

    if (!selectedAddress) {
      setErrorMessage('Delivery address is missing. Please review Step 1.');
      setCurrentStep('summary');
      return;
    }

    // Payment validation
    if (!paymentMethod) {
      setErrorMessage('Please select a payment method (Pay Online or Cash on Delivery) to proceed.');
      return;
    }

    if (paymentMethod === 'upi') {
      if (upiOption === 'custom') {
        const upiRegex = /^[a-zA-Z0-9.\-_]{2,49}@[a-zA-Z]{2,49}$/;
        if (!customUpiId.trim() || !upiRegex.test(customUpiId.trim())) {
          setErrorMessage('Please enter a valid UPI ID (e.g., yourname@okhdfcbank or 9876543210@upi).');
          return;
        }
      }
    } else if (paymentMethod === 'card') {
      if (selectedSavedCardId) {
        // Authorize with CVV
        const cvv = cardCvvs[selectedSavedCardId];
        if (!cvv || cvv.length < 3) {
          setErrorMessage('Please enter the 3-digit CVV on the back of your selected saved card.');
          return;
        }
      } else {
        const cleanNum = cardDetails.number.replace(/\s+/g, '');
        if (cleanNum.length < 15 || cleanNum.length > 19) {
          setErrorMessage('Please enter a valid 16-digit card number.');
          return;
        }
        if (!cardDetails.name.trim()) {
          setErrorMessage('Please enter the name on your card.');
          return;
        }
        if (!cardDetails.expiry || !cardDetails.expiry.includes('/')) {
          setErrorMessage('Please enter card expiry in MM/YY format.');
          return;
        }
        if (cardDetails.cvv.length < 3) {
          setErrorMessage('Please enter a valid 3-digit CVV.');
          return;
        }
        // Save card if checked
        if (cardDetails.saveCard) {
          const parts = cardDetails.expiry.split('/');
          const net = /^4/.test(cleanNum) ? 'visa' : /^(5[1-5]|2[2-7])/.test(cleanNum) ? 'mastercard' : /^6/.test(cleanNum) ? 'rupay' : 'visa';
          addSavedCard({
            cardHolder: cardDetails.name,
            last4: cleanNum.slice(-4),
            network: net,
            expiryMonth: parts[0] || '12',
            expiryYear: parts[1] || '28',
          });
        }
      }
    } else if (paymentMethod === 'wallet') {
      const currentWalletBal = typeof user?.walletBalance === 'number' ? user.walletBalance : 2500;
      if (currentWalletBal < finalTotal) {
        setErrorMessage(`Your Haatza Wallet balance (${formatINR(currentWalletBal)}) is insufficient for this order of ${formatINR(finalTotal)}. Please add funds or choose another payment method.`);
        return;
      }
      deductWalletBalance(finalTotal);
    } else if (paymentMethod === 'cod') {
      if (finalTotal > 15000) {
        setErrorMessage('Cash on Delivery is only available for orders up to ₹15,000.');
        return;
      }
    }

    setIsPlacingOrder(true);

    try {
      const newOrder = await orderService.placeOrder({
        items: activeItems,
        subtotal,
        discount: productDiscount + couponDiscount,
        deliveryCharge,
        total: finalTotal,
        paymentMethod: paymentMethod as any,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        shippingAddress: selectedAddress,
      });

      // Clear buy now or cart
      if (isBuyNowMode) {
        sessionStorage.removeItem('haatza_buynow_item');
      } else {
        clearCart();
      }

      const returnUrl = (location.state as any)?.returnUrl;
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${newOrder.orderNumber}`, { state: { order: newOrder, returnUrl } });
    } catch (e) {
      console.error(e);
      setErrorMessage('Failed to place order. Please verify your details and try again.');
      setIsPlacingOrder(false);
    }
  };

  // Empty checkout guard
  if (activeItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] text-[#2962FF] flex items-center justify-center mx-auto shadow-sm">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#172033] tracking-tight">Your Checkout is Empty</h2>
        <p className="text-sm text-[#64748B]">
          There are no items currently selected for checkout. Discover trending items across fashion, electronics, and home essentials.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-8 py-3 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          Explore Haatza Marketplace
        </Link>
      </div>
    );
  }

  // Calculate estimated delivery string (3 business days ahead)
  const deliveryEstDate = new Date();
  deliveryEstDate.setDate(deliveryEstDate.getDate() + 3);
  const estimatedDeliveryText = deliveryEstDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 pb-28">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & 3-Step Wizard Indicator */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <div>
              {isBuyNowMode && (
                <div className="mb-1.5">
                  <span className="text-xs font-bold text-[#2962FF] bg-[#EEF3FF] px-2.5 py-0.5 rounded-full border border-[#DBEAFE]">
                    ⚡ Buy Now Mode
                  </span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
                {currentStep === 'summary' ? 'Review Your Order' : 'Select Payment Method'}
              </h1>
            </div>

            {/* Step Wizard Progress Bar */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
              {/* Step 1 Box */}
              <button
                type="button"
                onClick={() => setCurrentStep('summary')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currentStep === 'summary'
                    ? 'bg-[#2962FF] text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {currentStep === 'payment' ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-white text-[#2962FF] text-[10px] flex items-center justify-center font-bold">
                    1
                  </span>
                )}
                <span>1. Order Summary</span>
              </button>

              <div className={`w-6 sm:w-10 h-0.5 ${currentStep === 'payment' ? 'bg-[#2962FF]' : 'bg-slate-200'}`} />

              {/* Step 2 Box */}
              <button
                type="button"
                disabled={currentStep === 'summary'}
                onClick={() => handleContinueToPayment()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  currentStep === 'payment'
                    ? 'bg-[#2962FF] text-white shadow-sm cursor-default'
                    : 'bg-slate-100 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  currentStep === 'payment' ? 'bg-white text-[#2962FF]' : 'bg-slate-300 text-slate-700'
                }`}>
                  2
                </span>
                <span>2. Payment</span>
              </button>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200 hidden md:block" />

              {/* Step 3 Box Preview */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400">
                <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
                <span>3. Confirmation</span>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3 text-rose-800 text-xs sm:text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}
        </div>

        {/* Checkout Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT COLUMN: STEP 1 (ORDER SUMMARY) OR STEP 2 (PAYMENT METHODS) */}
          <div className="lg:col-span-8 space-y-6 min-h-[680px] transition-all duration-300">

            {/* STEP 1: ORDER SUMMARY (DELIVERY ADDRESS + PRODUCTS + EMI) */}
            <div className={`space-y-6 transition-all duration-300 ease-out ${
              currentStep === 'summary' ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}>

                {/* 1. Delivery Address Card */}
                <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 sm:p-6 shadow-xs hover:shadow-soft transition-all">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] text-[#2962FF] flex items-center justify-center font-bold text-sm">
                        <MapPin className="w-4 h-4 text-[#2962FF]" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-extrabold text-[#172033] font-heading uppercase tracking-wider">
                          Delivery Address
                        </h2>
                        <p className="text-xs text-[#64748B]">Items will be shipped to this location</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openLocationModal('select')}
                        className="px-3.5 py-1.5 rounded-lg border border-[#2962FF] text-[#2962FF] bg-[#EEF3FF] hover:bg-[#DBEAFE] font-bold text-xs transition-colors cursor-pointer"
                      >
                        Change Address
                      </button>
                      <button
                        type="button"
                        onClick={() => openLocationModal('add')}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:border-[#2962FF] hover:text-[#2962FF] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Add New</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Selected Address Details */}
                  {selectedAddress ? (
                    <div className="pt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#172033] font-heading">
                          {selectedAddress.fullName}
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                          {selectedAddress.addressType || 'Home'}
                        </span>
                        {selectedAddress.isDefault && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                        {[
                          selectedAddress.houseNumber,
                          selectedAddress.buildingName,
                          selectedAddress.addressLine1,
                          selectedAddress.street,
                          selectedAddress.area,
                          selectedAddress.landmark ? `Near ${selectedAddress.landmark}` : null,
                          selectedAddress.city,
                          selectedAddress.state,
                        ]
                          .filter(Boolean)
                          .join(', ')}
                        {' — '}
                        <span className="font-bold text-[#172033]">{selectedAddress.pincode}</span>
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Contact Phone: <span className="text-[#172033] font-bold">{selectedAddress.phone}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="pt-4 text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                      <p className="text-xs font-semibold text-slate-600 mb-2">No delivery address found</p>
                      <button
                        type="button"
                        onClick={() => openLocationModal('add')}
                        className="px-4 py-2 bg-[#2962FF] text-white rounded-lg text-xs font-bold hover:bg-[#1E4ED8] transition-colors"
                      >
                        + Add Delivery Address
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Order Items Review List */}
                <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#172033] font-heading uppercase tracking-wider">
                      Order Items ({activeItems.length})
                    </h2>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Delivery by {estimatedDeliveryText}</span>
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {activeItems.map((item, idx) => {
                      const itemMrp = item.product.mrp || item.price * 1.35;
                      const hasDiscount = itemMrp > item.price;
                      const discountPct = hasDiscount ? Math.round(((itemMrp - item.price) / itemMrp) * 100) : 0;

                      return (
                        <div key={`${item.product.id}-${idx}`} className="py-4 first:pt-1 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                          <div className="flex gap-3 sm:gap-4 items-start min-w-0">
                            {/* Product Thumbnail */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 relative">
                              <img
                                src={optimizeImageUrl(item.product.mainImage, { width: 180, quality: 75 }) || item.product.mainImage}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>

                            {/* Details */}
                            <div className="min-w-0 space-y-1">
                              <h3 className="font-extrabold text-sm sm:text-base text-[#172033] font-heading line-clamp-1 hover:text-[#2962FF] transition-colors">
                                <Link to={`/product/${item.product.slug || item.product.id}`}>
                                  {item.product.name}
                                </Link>
                              </h3>
                              
                              <p className="text-[11px] text-slate-500 font-body">
                                Sold by: <span className="font-semibold text-slate-700">{item.product.sellerName || 'Haatza Official Store'}</span>
                              </p>

                              {/* Variant Badge */}
                              {item.selectedVariant && (
                                <div className="inline-flex items-center gap-1 bg-[#EEF3FF] border border-[#DBEAFE] text-[#2962FF] px-2 py-0.5 rounded-md text-[11px] font-bold">
                                  <span>{item.selectedVariant.name || 'Option'}:</span>
                                  <span>{item.selectedVariant.value}</span>
                                </div>
                              )}

                              {/* Pricing Row */}
                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-base font-black text-[#172033] font-heading">
                                  {formatINR(item.price)}
                                </span>
                                {hasDiscount && (
                                  <>
                                    <span className="text-xs text-slate-400 line-through">
                                      {formatINR(itemMrp)}
                                    </span>
                                    <span className="text-xs font-black text-emerald-600">
                                      {discountPct}% OFF
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right Controls: Quantity & Remove */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                            {/* Quantity Selector with Plus and Minus */}
                            <div className="flex items-center border border-slate-300 rounded-lg bg-white shadow-2xs overflow-hidden">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(idx, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-base font-bold cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-10 text-center font-bold text-xs sm:text-sm text-[#172033]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors text-base font-bold cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            {/* Remove Item */}
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 hover:underline cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. EMI Options Section (Expandable for eligible products) */}
                <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] text-[#2962FF] flex items-center justify-center font-bold">
                        <Percent className="w-4 h-4 text-[#2962FF]" />
                      </div>
                      <div>
                        <h2 className="text-sm sm:text-base font-extrabold text-[#172033] font-heading uppercase tracking-wider">
                          Easy EMI Options
                        </h2>
                        <p className="text-xs text-[#64748B]">
                          {isEmiEligible
                            ? `Flexible monthly instalments starting from ₹${Math.round(finalTotal / 12)}/month`
                            : 'Available on orders of ₹2,000 and above'}
                        </p>
                      </div>
                    </div>

                    {isEmiEligible && (
                      <button
                        type="button"
                        onClick={() => setIsEmiExpandedInSummary(!isEmiExpandedInSummary)}
                        className="text-xs font-bold text-[#2962FF] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isEmiExpandedInSummary ? 'Hide Plans' : 'View Plans'}</span>
                        {isEmiExpandedInSummary ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expandable EMI Bank Plans Table */}
                  {isEmiEligible && isEmiExpandedInSummary && (
                    <div className="pt-3 border-t border-slate-100 space-y-4 animate-fadeIn">
                      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {[
                          { id: 'hdfc', name: 'HDFC Bank', tag: 'No-Cost EMI' },
                          { id: 'icici', name: 'ICICI Bank', tag: 'No-Cost EMI' },
                          { id: 'sbi', name: 'SBI Card', tag: 'Low Interest' },
                          { id: 'axis', name: 'Axis Bank', tag: 'Special Reward' },
                          { id: 'debit', name: 'Debit Card', tag: 'Zero Card Fee' },
                        ].map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedEmiBank(b.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold shrink-0 border transition-all cursor-pointer ${
                              selectedEmiBank === b.id
                                ? 'bg-[#EEF3FF] border-[#2962FF] text-[#2962FF] shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div>{b.name}</div>
                            <span className="text-[10px] font-normal text-slate-500">{b.tag}</span>
                          </button>
                        ))}
                      </div>

                      {/* Tenure Options for the Selected Bank */}
                      <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                        <div className="grid grid-cols-12 bg-slate-50 p-2.5 font-extrabold text-slate-600 font-heading">
                          <div className="col-span-3">Tenure</div>
                          <div className="col-span-3 text-center">Monthly EMI</div>
                          <div className="col-span-3 text-center">Interest</div>
                          <div className="col-span-3 text-right">Action</div>
                        </div>

                        {[
                          {
                            months: 3,
                            monthly: Math.round(finalTotal / 3),
                            interest: '0% (No-Cost)',
                            fee: '₹199 Bank Processing Fee',
                            total: finalTotal,
                            isNoCost: true,
                          },
                          {
                            months: 6,
                            monthly: Math.round((finalTotal * 1.04) / 6),
                            interest: '13.5% p.a.',
                            fee: '₹199 Bank Processing Fee',
                            total: Math.round(finalTotal * 1.04),
                            isNoCost: false,
                          },
                          {
                            months: 9,
                            monthly: Math.round((finalTotal * 1.065) / 9),
                            interest: '14.5% p.a.',
                            fee: '₹199 Bank Processing Fee',
                            total: Math.round(finalTotal * 1.065),
                            isNoCost: false,
                          },
                          {
                            months: 12,
                            monthly: Math.round((finalTotal * 1.09) / 12),
                            interest: '15.5% p.a.',
                            fee: '₹199 Bank Processing Fee',
                            total: Math.round(finalTotal * 1.09),
                            isNoCost: false,
                          },
                        ].map((plan) => {
                          const isChosen =
                            selectedEmiPlan?.bankId === selectedEmiBank &&
                            selectedEmiPlan?.months === plan.months;

                          return (
                            <div
                              key={plan.months}
                              className={`grid grid-cols-12 p-3 items-center transition-colors ${
                                isChosen ? 'bg-[#EEF3FF]' : 'hover:bg-slate-50/70'
                              }`}
                            >
                              <div className="col-span-3 font-extrabold text-slate-800">
                                {plan.months} Months
                              </div>
                              <div className="col-span-3 text-center font-black text-[#2962FF]">
                                {formatINR(plan.monthly)}/mo
                              </div>
                              <div className="col-span-3 text-center">
                                <span className={plan.isNoCost ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                                  {plan.interest}
                                </span>
                              </div>
                              <div className="col-span-3 text-right">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedEmiPlan({
                                      bankId: selectedEmiBank,
                                      bankName: selectedEmiBank.toUpperCase() + ' Bank',
                                      months: plan.months,
                                      monthlyAmount: plan.monthly,
                                      interestRate: plan.interest,
                                      processingFee: plan.fee,
                                      totalPayable: plan.total,
                                      isNoCost: plan.isNoCost,
                                    })
                                  }
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    isChosen
                                      ? 'bg-[#2962FF] text-white shadow-xs'
                                      : 'border border-slate-300 text-slate-700 hover:border-[#2962FF] hover:text-[#2962FF]'
                                  }`}
                                >
                                  {isChosen ? 'Selected' : 'Select Plan'}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {selectedEmiPlan && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
                          <span className="font-bold">
                            Selected {selectedEmiPlan.bankName} • {selectedEmiPlan.months}m @ {formatINR(selectedEmiPlan.monthlyAmount)}/mo
                          </span>
                          <span className="text-[11px] text-emerald-700">Carries to payment step</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

            {/* STEP 2: PAYMENT METHOD (SELECTABLE PAYMENT OPTIONS) */}
            <div className={`space-y-6 transition-all duration-300 ease-out ${
              currentStep === 'payment' ? 'opacity-100 block' : 'opacity-0 hidden'
            }`}>

                {/* Back to Step 1 Order Summary Header */}
                <div className="bg-white rounded-lg border border-[#E5E7EB] p-5 sm:p-6 shadow-xs flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-[#1F1F1F] font-heading">
                      Select Payment Mode
                    </h2>
                    <p className="text-xs text-[#555555]">
                      Delivering to {selectedAddress?.fullName || 'Selected Address'} ({selectedAddress?.pincode || ''})
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep('summary');
                      if (window.scrollY > 80) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-xs font-bold text-[#2962FF] hover:text-[#1747CC] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change Address / Order</span>
                  </button>
                </div>

                {/* Unique Haatza Payment Section */}
                <PaymentSection
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  finalTotal={finalTotal}
                  upiOption={upiOption}
                  setUpiOption={setUpiOption}
                  customUpiId={customUpiId}
                  setCustomUpiId={setCustomUpiId}
                  isUpiVerified={isUpiVerified}
                  setIsUpiVerified={setIsUpiVerified}
                  cardDetails={cardDetails}
                  setCardDetails={setCardDetails}
                  selectedSavedCardId={selectedSavedCardId}
                  setSelectedSavedCardId={setSelectedSavedCardId}
                  selectedNetBank={selectedNetBank}
                  setSelectedNetBank={setSelectedNetBank}
                  selectedWallet={selectedWallet}
                  setSelectedWallet={setSelectedWallet}
                  codCaptcha={codCaptcha}
                  setCodCaptcha={setCodCaptcha}
                  codCaptchaInput={codCaptchaInput}
                  setCodCaptchaInput={setCodCaptchaInput}
                  useWalletBalance={useWalletBalance}
                  setUseWalletBalance={setUseWalletBalance}
                  cardCvvs={cardCvvs}
                  setCardCvvs={setCardCvvs}
                />

              </div>
            </div>

          {/* RIGHT COLUMN: STICKY PRICE SUMMARY & PRIMARY ACTION BUTTON */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-sm sm:text-base text-[#172033] font-heading uppercase tracking-wider">
                  Price Details
                </h3>
                <span className="text-xs font-bold text-slate-500 font-body">
                  ({activeItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
                </span>
              </div>

              {/* Coupon Application Box */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Apply Discount Coupon
                </label>

                {appliedCouponCode ? (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{appliedCouponCode} applied! Saved {formatINR(couponDiscount)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-slate-500 hover:text-rose-600 font-bold p-1 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            setCouponError('');
                          }}
                          placeholder="e.g. HAATZA100"
                          className="w-full pl-8 pr-3 py-2 text-xs uppercase font-medium rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#2962FF]"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={isApplyingCoupon || !couponCode.trim()}
                        onClick={() => handleApplyCoupon(couponCode)}
                        className="px-4 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white text-xs font-bold rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {isApplyingCoupon ? '...' : 'Apply'}
                      </button>
                    </div>

                    {couponError && (
                      <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                    )}

                    {/* Quick suggestion vouchers */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['HAATZA100', 'WELCOME200', 'FESTIVE15'].map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleApplyCoupon(code)}
                          className="text-[10px] font-bold text-[#2962FF] bg-[#EEF3FF] hover:bg-[#DBEAFE] border border-[#DBEAFE] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                        >
                          +{code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="font-semibold text-slate-800">{formatINR(totalMrp)}</span>
                </div>

                {productDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Product Discount</span>
                    <span>-{formatINR(productDiscount)}</span>
                  </div>
                )}

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#2962FF] font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(couponDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-black uppercase">FREE</span>
                    ) : (
                      formatINR(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Applicable GST (18%)</span>
                  <span>Included in price ({formatINR(gstAmount)})</span>
                </div>

                <div className="flex justify-between items-baseline text-sm sm:text-base font-black text-[#172033] pt-3 border-t border-slate-200">
                  <span className="font-heading">Total Payable</span>
                  <span className="text-xl sm:text-2xl text-[#2962FF] font-black font-heading">
                    {formatINR(finalTotal)}
                  </span>
                </div>

                {productDiscount + couponDiscount > 0 && (
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 text-center text-xs font-bold text-emerald-800">
                    🎉 You will save {formatINR(productDiscount + couponDiscount)} on this order
                  </div>
                )}
              </div>

              {/* Step Action Buttons */}
              <div className="pt-2">
                {currentStep === 'summary' ? (
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full py-4 px-6 rounded-lg bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-black text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isPlacingOrder}
                    onClick={handlePlaceOrder}
                    className="w-full py-4 px-6 rounded-lg bg-[#2962FF] hover:bg-[#1747CC] disabled:bg-slate-300 text-white font-black text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {isPlacingOrder ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying & Processing Payment...</span>
                      </span>
                    ) : (
                      <span>Place Order {formatINR(finalTotal)}</span>
                    )}
                  </button>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure Checkout | Verified by Haatza</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutPage;
