import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Hourglass, 
  Banknote, 
  Wallet, 
  Percent, 
  ChevronRight, 
  ReceiptText, 
  Check, 
  CheckCircle2, 
  X,
  AlertCircle,
  Copy,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  Ticket
} from 'lucide-react';
import { NestBookingSelection } from './nestBookingData';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { useHaatzaNestLocation } from '../../hooks/useHaatzaNestLocation';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { 
  createHaatzaNestBooking, 
  confirmWithRetry, 
  createRazorpayOrder,
  HaatzaApiException 
} from '../../services/haatzaNestBookingApi';
import { 
  openRazorpayCheckout, 
  savePendingConfirmation, 
  clearPendingConfirmation,
  getPendingConfirmation 
} from '../../services/haatzaNestPaymentService';
import { 
  HaatzaNestBookingResult, 
  CreateHaatzaNestBookingPayload,
  HaatzaNestServiceBooking 
} from '../../types/haatzaNest.types';

export interface HaatzaNestBookingSummaryProps {
  selection: NestBookingSelection;
  onBack: () => void;
  onComplete: () => void;
}

export const HaatzaNestBookingSummary: React.FC<HaatzaNestBookingSummaryProps> = ({
  selection,
  onBack,
  onComplete,
}) => {
  const { 
    availability, 
    nestuserpass, 
    nestuserpassData 
  } = useHaatzaNestDashboard();
  const { location } = useHaatzaNestLocation();
  const { user } = useHaatzaNestUser();

  // Customer Contact State (prefilled from authenticated user)
  const [customerName, setCustomerName] = useState<string>(() => user?.name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState<string>(() => user?.email || '');
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false);

  // Sync when authenticated user becomes available
  useEffect(() => {
    if (user?.name) setCustomerName(user.name);
    if (user?.phone) setCustomerPhone(user.phone);
    if (user?.email) setCustomerEmail(user.email);
  }, [user]);

  // Payment Options State
  // Scenario 3: Nest Pass
  const hasActivePass = Boolean(nestuserpass && nestuserpassData && nestuserpassData.length > 0);
  const userPassItem = hasActivePass ? nestuserpassData[0] : null;
  const [usePass, setUsePass] = useState<boolean>(false);

  // Scenario 2: Wallet
  const [redeemWallet, setRedeemWallet] = useState<boolean>(false);
  const [walletAmount, setWalletAmount] = useState<number>(0);

  // Coupon State
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [showCouponInput, setShowCouponInput] = useState<boolean>(false);

  // Request & Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isSubmittingRef = useRef<boolean>(false);
  const activeRazorpayOrderRef = useRef<{ orderId: string; amount: number; keyId: string } | null>(null);
  const [submissionStepText, setSubmissionStepText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);

  // Completed Booking State
  const [confirmedBooking, setConfirmedBooking] = useState<HaatzaNestBookingResult | null>(null);

  // Prevent background scrolling while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Check for any pending confirmation from a previous reload/crash
  useEffect(() => {
    const pending = getPendingConfirmation();
    if (pending && pending.tableId && pending.paymentId && pending.signature && pending.orderId) {
      // Resume confirmation with retry
      setSubmissionStepText('Resuming confirmation of your successful payment...');
      confirmWithRetry({
        tableId: pending.tableId,
        orderId: pending.orderId,
        paymentId: pending.paymentId,
        signature: pending.signature,
      })
        .then((res) => {
          clearPendingConfirmation();
          setConfirmedBooking(res.booking);
          saveToBookingHistory(res.booking);
        })
        .catch((err) => {
          console.error('Pending confirmation recovery failed:', err);
          // Don't ask them to pay again
          setErrorMessage(
            `Payment received (ID: ${pending.paymentId}). Your booking is being confirmed by our team. Please keep this ID for reference.`
          );
        });
    }
  }, []);

  // Price Calculations
  const basePrice = selection.duration.price;
  const couponDiscount = couponApplied ? 20 : 0;
  
  // Wallet deduction cannot exceed basePrice and must be 0 for pass bookings
  const effectiveWalletUsage = usePass ? 0 : (redeemWallet ? Math.min(walletAmount > 0 ? walletAmount : basePrice, basePrice) : 0);
  
  // amountToPay based on PDF Section 2 formula:
  // final amountToPay = passbooking ? 0 : basePrice - walletUsage;
  const calculatedAmountToPay = usePass ? 0 : Math.max(0, basePrice - effectiveWalletUsage - couponDiscount);

  const handleApplyCoupon = () => {
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'HAATZA20' || clean === 'NEST20' || clean.length > 0) {
      setCouponApplied(true);
      setShowCouponInput(false);
      setErrorMessage(null);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyNotice(`${label} copied!`);
      setTimeout(() => setCopyNotice(null), 2500);
    }
  };

  // Helper to store in local history for "My Service Bookings" screen
  const saveToBookingHistory = (result: HaatzaNestBookingResult) => {
    try {
      const stored = localStorage.getItem('haatza_nest_bookings');
      const existingList = stored ? JSON.parse(stored) : [];
      const historyItem: HaatzaNestServiceBooking = {
        id: result.tableId || `bok-${Date.now()}`,
        bookingNumber: result.bookingId || `HN-${Date.now()}`,
        serviceId: selection.mode === 'instant' ? 'srv-mopping-daily' : 'srv-clean-deep',
        serviceName: selection.mode === 'instant' 
          ? `Instant 6-Min House Help (${selection.duration.durationLabel})`
          : `Scheduled Home Service (${selection.duration.durationLabel})`,
        serviceImage: 'https://static.wixstatic.com/media/73d0ef_0b2f688068434e46a538a629de0a6e17~mv2.png',
        categoryName: selection.mode === 'instant' ? 'Instant Help' : 'Scheduled Services',
        price: result.finalPrice || selection.duration.price,
        status: (result.paymentStatus === 'Paid' ? 'confirmed' : 'pending'),
        scheduledDate: result.bookingDate || selection.formattedDate,
        scheduledTimeSlot: result.bookingTime || selection.formattedTime,
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: selection.fullAddress,
        professionalName: result.vendorName || (result.assignmentStatus === 'Assigned' ? 'Assigned Expert' : 'Pending Assignment'),
        professionalRating: 4.9,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('haatza_nest_bookings', JSON.stringify([historyItem, ...existingList]));
    } catch (e) {
      console.error('Failed saving to booking history', e);
    }
  };

  // Master Booking Submission Handler covering all 3 Scenarios
  const handleProceedBooking = async () => {
    if (isSubmitting || isSubmittingRef.current) return;

    // Validate customer contact
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      setIsEditingContact(true);
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your phone number.');
      setIsEditingContact(true);
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('A valid email address is required (it serves as your wallet/pass owner ID).');
      setIsEditingContact(true);
      return;
    }

    // Validate coordinates
    const lat = Number(location.latitude) || 12.822071581483739;
    const lng = Number(location.longitude) || 77.65975411981344;
    const serviceArea = availability?.areaName || location.nestAreaName || location.locality || 'Haatza_corp';

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);

    // =========================================================================
    // SCENARIO 3: Pass booking (passbooking: true)
    // =========================================================================
    if (usePass) {
      setSubmissionStepText('Verifying Nest Pass and reserving expert...');
      try {
        const passId = userPassItem?.passId || userPassItem?.packId || 'NP004';
        const passbookingId = userPassItem?.passbookingId || userPassItem?.packBookingId || `NESTPASS-${Date.now()}`;

        const payload: CreateHaatzaNestBookingPayload = {
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          bookingType: selection.mode === 'instant' ? 'instant' : 'scheduled',
          basePrice: basePrice,
          latitude: lat,
          longitude: lng,
          address: selection.fullAddress,
          areaName: serviceArea,
          duration: selection.duration.durationMinutes,
          bookingDate: selection.apiBookingDate || selection.formattedDate,
          bookingTime: selection.apiBookingTime,
          totalAmount: 0,
          walletUsage: 0,
          coupon: couponApplied ? couponCode.trim() : '',
          passbooking: true,
          passId: passId,
          passbookingId: passbookingId,
          razorpayOrderId: '',
          paymentMethod: 'Pass',
          paymentStatus: 'Paid',
          paymentId: '',
        };

        const res = await createHaatzaNestBooking(payload);
        if (res.booking) {
          setConfirmedBooking(res.booking);
          saveToBookingHistory(res.booking);
        } else {
          throw new Error('Unexpected response format from booking service');
        }
      } catch (err: any) {
        console.error('Scenario 3 Pass Booking Error:', err);
        setErrorMessage(err.message || 'Pass booking failed. Please verify your pass status.');
      } finally {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
        setSubmissionStepText('');
      }
      return;
    }

    // =========================================================================
    // SCENARIO 2: Wallet covers everything (walletUsage === basePrice)
    // =========================================================================
    if (redeemWallet && effectiveWalletUsage === basePrice && calculatedAmountToPay === 0) {
      setSubmissionStepText('Deducting wallet balance and reserving expert...');
      try {
        const payload: CreateHaatzaNestBookingPayload = {
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          bookingType: selection.mode === 'instant' ? 'instant' : 'scheduled',
          basePrice: basePrice,
          latitude: lat,
          longitude: lng,
          address: selection.fullAddress,
          areaName: serviceArea,
          duration: selection.duration.durationMinutes,
          bookingDate: selection.apiBookingDate || selection.formattedDate,
          bookingTime: selection.apiBookingTime,
          totalAmount: basePrice,
          walletUsage: basePrice,
          coupon: couponApplied ? couponCode.trim() : '',
          passbooking: false,
          razorpayOrderId: '',
          paymentMethod: 'wallet',
          paymentStatus: 'Paid',
          paymentId: '',
        };

        const res = await createHaatzaNestBooking(payload);
        if (res.booking) {
          setConfirmedBooking(res.booking);
          saveToBookingHistory(res.booking);
        } else {
          throw new Error('Unexpected response format from booking service');
        }
      } catch (err: any) {
        console.error('Scenario 2 Wallet Booking Error:', err);
        setErrorMessage(err.message || 'Wallet booking failed. Please verify your wallet balance.');
      } finally {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
        setSubmissionStepText('');
      }
      return;
    }

    // =========================================================================
    // SCENARIO 1: Partial or no wallet (payment pending via Razorpay)
    // =========================================================================
    setSubmissionStepText('Preparing payment order...');
    let createdRazorpayOrderId = '';
    let razorpayPublicKey = 'rzp_live_R8ib0QZopkaicy';

    try {
      // 1. Create or reuse active Razorpay order for amountToPay
      if (
        activeRazorpayOrderRef.current &&
        activeRazorpayOrderRef.current.amount === calculatedAmountToPay
      ) {
        createdRazorpayOrderId = activeRazorpayOrderRef.current.orderId;
        razorpayPublicKey = activeRazorpayOrderRef.current.keyId;
      } else {
        setSubmissionStepText('Creating payment order...');
        const orderRes = await createRazorpayOrder(calculatedAmountToPay);
        createdRazorpayOrderId = orderRes.orderId;
        if (orderRes.keyId) {
          razorpayPublicKey = orderRes.keyId;
        }
        activeRazorpayOrderRef.current = {
          orderId: createdRazorpayOrderId,
          amount: calculatedAmountToPay,
          keyId: razorpayPublicKey,
        };
      }

      setSubmissionStepText('Creating pending booking record...');
      
      // 2. Call createHaatzaNestBooking with razorpayOrderId
      const payload: CreateHaatzaNestBookingPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        bookingType: selection.mode === 'instant' ? 'instant' : 'scheduled',
        basePrice: basePrice,
        latitude: lat,
        longitude: lng,
        address: selection.fullAddress,
        areaName: serviceArea,
        duration: selection.duration.durationMinutes,
        bookingDate: selection.apiBookingDate || selection.formattedDate,
        bookingTime: selection.apiBookingTime,
        totalAmount: basePrice,
        walletUsage: effectiveWalletUsage,
        coupon: couponApplied ? couponCode.trim() : '',
        passbooking: false,
        razorpayOrderId: createdRazorpayOrderId,
        paymentMethod: 'Razorpay',
        paymentStatus: 'Pending',
        paymentId: '',
      };

      const bookingRes = await createHaatzaNestBooking(payload);
      const booking = bookingRes.booking;

      if (!booking || !booking.tableId) {
        throw new Error('Booking creation did not return a valid record id.');
      }

      // Check server returned amountToPay matches
      if (booking.requiresPayment && booking.amountToPay !== undefined) {
        if (booking.amountToPay !== calculatedAmountToPay) {
          throw new Error(`Price mismatch: Server requested ₹${booking.amountToPay}, but order was ₹${calculatedAmountToPay}.`);
        }
      }

      // 3. Save pending confirmation data on device before opening checkout
      savePendingConfirmation({
        tableId: booking.tableId,
        bookingId: booking.bookingId,
        orderId: createdRazorpayOrderId,
        amount: calculatedAmountToPay,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        createdAt: Date.now(),
      });

      setSubmissionStepText('Opening secure payment gateway...');

      // 4. Open Razorpay Checkout Modal
      await openRazorpayCheckout({
        keyId: razorpayPublicKey,
        orderId: createdRazorpayOrderId,
        amountPaise: calculatedAmountToPay * 100,
        bookingId: booking.bookingId || 'HAATZA-NEST',
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        onSuccess: async (rzpSuccess) => {
          setSubmissionStepText('Payment received! Confirming with server...');
          // Save callback signature first so confirmation can resume if browser crashes
          savePendingConfirmation({
            tableId: booking.tableId,
            bookingId: booking.bookingId,
            orderId: rzpSuccess.razorpay_order_id,
            paymentId: rzpSuccess.razorpay_payment_id,
            signature: rzpSuccess.razorpay_signature,
            amount: calculatedAmountToPay,
            customerPhone: customerPhone,
            customerEmail: customerEmail,
            createdAt: Date.now(),
          });

          // Confirm with retries
          try {
            const confirmRes = await confirmWithRetry({
              tableId: booking.tableId,
              orderId: rzpSuccess.razorpay_order_id,
              paymentId: rzpSuccess.razorpay_payment_id,
              signature: rzpSuccess.razorpay_signature,
            });

            // Clear pending store on genuine success
            clearPendingConfirmation();
            setConfirmedBooking(confirmRes.booking);
            saveToBookingHistory(confirmRes.booking);
          } catch (confirmErr: any) {
            console.error('Order confirmation failed after retries:', confirmErr);
            // Critical rule: never ask the customer to pay again if payment succeeded!
            setErrorMessage(
              `Payment received (ID: ${rzpSuccess.razorpay_payment_id}). Your booking is being confirmed by our team. Please do not pay again.`
            );
          } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            setSubmissionStepText('');
          }
        },
        onDismiss: () => {
          // Payment cancelled / modal dismissed
          isSubmittingRef.current = false;
          setIsSubmitting(false);
          setSubmissionStepText('');
          setErrorMessage('Payment was not completed. You can retry paying when you are ready.');
        },
        onError: (err) => {
          isSubmittingRef.current = false;
          setIsSubmitting(false);
          setSubmissionStepText('');
          setErrorMessage(err?.description || 'Payment could not be completed. Please try again.');
        },
      });

    } catch (err: any) {
      console.error('Scenario 1 Payment Error:', err);
      isSubmittingRef.current = false;
      setIsSubmitting(false);
      setSubmissionStepText('');
      setErrorMessage(err.message || 'Payment initiation failed. Please try again.');
    } finally {
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 select-none">
      {/* Dark Transparent Overlay Backdrop */}
      <div 
        onClick={() => {
          if (!isSubmitting) onComplete();
        }}
        className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Side Pop Up Drawer (Slides from Right) */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Booking Summary"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-[#F8F6FC] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Top Header Bar matching Purple HAATZA Nest Theme */}
        <div className="bg-[#7027C9] text-white px-4 py-3.5 sm:px-6 sticky top-0 z-20 shadow-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white disabled:opacity-50"
                aria-label="Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="font-extrabold text-lg sm:text-xl text-white tracking-tight font-heading">
                Booking Summary
              </h1>
            </div>

            <button
              type="button"
              onClick={onComplete}
              disabled={isSubmitting}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {confirmedBooking ? (
          /* =========================================================================
             CONFIRMED BOOKING RESULT UI
             ========================================================================= */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200">
            {/* Top Success Icon & Heading */}
            <div className="text-center pt-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 mb-1 font-heading">
                Booking Placed!
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600">
                Your {selection.mode === 'instant' ? 'Instant 6-Min Dispatch' : 'Scheduled'} booking is confirmed.
              </p>
            </div>

            {/* Prominent OTP & Booking ID Card */}
            <div className="bg-gradient-to-br from-[#7027C9] to-[#551AA3] rounded-2xl p-4 sm:p-5 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between border-b border-white/20 pb-2.5">
                <span className="text-xs text-white/80 font-medium">Booking ID</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm tracking-wide text-white">
                    {confirmedBooking.bookingId || confirmedBooking.tableId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(confirmedBooking.bookingId || confirmedBooking.tableId, 'Booking ID')}
                    className="p-1 hover:bg-white/10 rounded cursor-pointer text-white/80"
                    title="Copy Booking ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-white/70 block">
                    Service Start OTP
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-[#FFE34D]">
                    {confirmedBooking.otp || '----'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full text-white font-semibold">
                    {confirmedBooking.paymentStatus === 'Paid' ? 'Paid' : 'Payment Pending'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-white/70">
                Share this 4-digit OTP with your HAATZA Nest expert upon arrival to begin the service.
              </p>
            </div>

            {/* Expert Assignment Status Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E0F3] shadow-2xs">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#7027C9]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
                  Expert Assignment
                </h3>
              </div>

              {confirmedBooking.vendorId ? (
                /* Expert Assigned */
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-extrabold text-base text-zinc-900">
                      {confirmedBooking.vendorName || 'Background Verified Pro'}
                    </div>
                    <div className="text-xs text-zinc-500 font-medium">
                      Partner ID: {confirmedBooking.vendorId}
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                    Assigned
                  </span>
                </div>
              ) : (
                /* Assignment Pending - Exact copy required by PDF Section 6 & 12 */
                <div className="flex items-start gap-3 bg-amber-50/80 border border-amber-200/60 rounded-xl p-3 text-amber-900">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold">
                      We are assigning an expert and will notify you shortly.
                    </p>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Our dispatch team is matching the nearest verified specialist for your address.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Details Summary Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E0F3] shadow-2xs space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Service Mode:</span>
                <span className="font-semibold text-zinc-900 capitalize">
                  {confirmedBooking.bookingType || selection.mode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Time:</span>
                <span className="font-semibold text-zinc-900">
                  {confirmedBooking.bookingDate} at {confirmedBooking.bookingTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Duration:</span>
                <span className="font-semibold text-zinc-900">
                  {selection.duration.durationMinutes} Minutes ({selection.duration.durationLabel})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Address:</span>
                <span className="font-semibold text-zinc-900 max-w-[60%] text-right truncate">
                  {selection.fullAddress}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-100 font-bold">
                <span className="text-zinc-800">Final Price:</span>
                <span className="text-[#7027C9] font-black text-base">
                  ₹{confirmedBooking.finalPrice ?? basePrice}
                </span>
              </div>
            </div>

            {/* Copy Notification Toast */}
            {copyNotice && (
              <div className="text-center text-xs font-semibold text-emerald-600 animate-in fade-in">
                {copyNotice}
              </div>
            )}

            {/* Done Action Button */}
            <button
              type="button"
              onClick={onComplete}
              className="w-full py-3.5 rounded-2xl bg-[#7027C9] hover:bg-[#5C1EAA] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              Done & Return to Home
            </button>
          </div>
        ) : (
          /* =========================================================================
             PRE-BOOKING SUMMARY & PAYMENT OPTIONS UI
             ========================================================================= */
          <>
            {/* Scrollable Summary Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              
              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 flex items-start gap-3 text-red-800 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setErrorMessage(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 1. Address Section */}
              <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-2xs">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="font-bold text-sm sm:text-base text-zinc-900">
                    Service Address
                  </h2>
                  <span className="text-[11px] font-bold text-[#7027C9] bg-purple-50 px-2 py-0.5 rounded-md">
                    {selection.addressLabel}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100/90 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 fill-orange-500 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                    {selection.fullAddress || 'Selected Address'}
                  </p>
                </div>
              </div>

              {/* 2. Customer Contact Details Section */}
              <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-sm sm:text-base text-zinc-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" /> Customer Details
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsEditingContact(!isEditingContact)}
                    className="text-xs font-bold text-[#7027C9] hover:underline cursor-pointer"
                  >
                    {isEditingContact ? 'Save' : 'Edit'}
                  </button>
                </div>

                {isEditingContact ? (
                  <div className="space-y-2.5 pt-1 text-xs">
                    <div>
                      <label className="text-zinc-500 font-medium block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-900 focus:outline-none focus:border-[#7027C9]"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 font-medium block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-900 focus:outline-none focus:border-[#7027C9]"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-500 font-medium block mb-1">Email ID (Wallet & Pass ID)</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-zinc-900 focus:outline-none focus:border-[#7027C9]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5 text-xs text-zinc-600 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-zinc-900">{customerName}</span>
                      <span>•</span>
                      <span>{customerPhone}</span>
                    </div>
                    <div className="text-zinc-500 text-[11px] truncate">
                      {customerEmail}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Booking Details Section */}
              <div className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-2xs">
                <h2 className="font-bold text-sm sm:text-base text-zinc-900 mb-3.5">
                  Booking Details
                </h2>

                <div className="space-y-3">
                  {/* Date Row */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="w-8 h-8 rounded-full bg-[#F2ECFC] text-[#7027C9] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-zinc-600">Date:</span>
                      <span className="text-zinc-900 font-semibold">{selection.formattedDate}</span>
                    </div>
                  </div>

                  {/* Time Row */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="w-8 h-8 rounded-full bg-[#EDFDF3] text-[#16A34A] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-zinc-600">Time:</span>
                      <span className="text-zinc-900 font-semibold">{selection.formattedTime}</span>
                    </div>
                  </div>

                  {/* Duration Row */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FEF9E7] text-[#D97706] flex items-center justify-center shrink-0">
                      <Hourglass className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-zinc-600">Duration:</span>
                      <span className="text-zinc-900 font-semibold">
                        {selection.duration.durationMinutes} Minutes ({selection.duration.durationLabel})
                      </span>
                    </div>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="w-8 h-8 rounded-full bg-[#FDF1F2] text-[#DC2626] flex items-center justify-center shrink-0">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="text-zinc-600">Base Price:</span>
                      <span className="text-zinc-900 font-semibold">₹{selection.duration.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. SCENARIO 3: Nest Pass Option (Active when customer owns a valid pass) */}
              {hasActivePass && (
                <div 
                  onClick={() => {
                    const next = !usePass;
                    setUsePass(next);
                    if (next) setRedeemWallet(false); // Pass bookings do not use wallet
                  }}
                  className={`rounded-2xl p-3.5 sm:p-4 border transition-all cursor-pointer ${
                    usePass 
                      ? 'bg-purple-50/80 border-[#7027C9] shadow-xs' 
                      : 'bg-white border-zinc-100 hover:border-purple-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FFE34D] text-[#24152F] flex items-center justify-center shrink-0 shadow-2xs font-bold">
                        <Ticket className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                          Use Nest Pass
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          {userPassItem?.visits !== undefined ? `${userPassItem.visits} visits available` : 'Valid pass detected'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600">₹0 online</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        usePass ? 'bg-[#7027C9] text-white' : 'border-2 border-zinc-300 bg-white'
                      }`}>
                        {usePass && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SCENARIO 2 & 1: Redeem Wallet Option */}
              {!usePass && (
                <div 
                  onClick={() => setRedeemWallet(!redeemWallet)}
                  className={`bg-white rounded-2xl p-3.5 sm:p-4 border border-zinc-100 shadow-2xs transition-colors cursor-pointer hover:border-purple-200 ${
                    redeemWallet ? 'border-purple-300 bg-purple-50/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#7027C9] text-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Wallet className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-zinc-900 block leading-tight">
                          Redeem Onepay Wallet
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          Use wallet balance toward booking
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={redeemWallet}
                        onClick={() => setRedeemWallet(!redeemWallet)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          redeemWallet
                            ? 'bg-[#7027C9] text-white shadow-xs'
                            : 'border-2 border-zinc-300 bg-white hover:border-[#7027C9]'
                        }`}
                        aria-label="Redeem Onepay Balance"
                      >
                        {redeemWallet && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  </div>

                  {redeemWallet && (
                    <div className="mt-3 pt-3 border-t border-purple-100 text-xs flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                      <span className="text-zinc-600 font-medium">Wallet Amount to Use:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">₹</span>
                        <input
                          type="number"
                          min="0"
                          max={basePrice}
                          value={walletAmount || basePrice}
                          onChange={(e) => setWalletAmount(Math.min(basePrice, Math.max(0, Number(e.target.value))))}
                          className="w-20 bg-white border border-purple-200 rounded-lg px-2 py-1 font-bold text-zinc-900 text-right focus:outline-none focus:border-[#7027C9]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 6. Got a coupon? Section (hidden if pass booking) */}
              {!usePass && (
                <div className="bg-[#7027C9] rounded-2xl p-3.5 sm:p-4 text-white shadow-2xs">
                  <p className="text-xs sm:text-[13px] font-medium mb-2.5">
                    Got a coupon? Apply it to save on your order!
                  </p>

                  <div 
                    onClick={() => setShowCouponInput(!showCouponInput)}
                    className="bg-white rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors text-zinc-900"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-[#7027C9] text-white flex items-center justify-center shrink-0">
                        <Percent className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-sm font-bold text-zinc-900">
                        {couponApplied ? 'Coupon Applied (₹20 OFF)' : 'Apply Coupons'}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </div>

                  {showCouponInput && !couponApplied && (
                    <div className="mt-2.5 flex gap-2 pt-2 border-t border-purple-300/30">
                      <input
                        type="text"
                        placeholder="Enter promo code (e.g. NEST20)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-white text-zinc-900 px-3 py-1.5 rounded-lg text-xs placeholder:text-zinc-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-3 py-1.5 rounded-lg bg-[#FFE34D] text-[#24152F] text-xs font-bold hover:bg-yellow-300 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 7. Price Details Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-zinc-100 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-4">
                  <ReceiptText className="w-5 h-5 text-zinc-700 stroke-[1.8]" />
                  <h2 className="font-bold text-base text-zinc-900">
                    Price Details
                  </h2>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-700">
                    <span>Base Duration Price</span>
                    <span className="font-medium text-zinc-900">₹{basePrice}</span>
                  </div>

                  {usePass && (
                    <div className="flex justify-between text-emerald-600 font-semibold animate-in fade-in duration-200">
                      <span>Nest Pass Coverage (1 visit)</span>
                      <span>-₹{basePrice}</span>
                    </div>
                  )}

                  {!usePass && redeemWallet && effectiveWalletUsage > 0 && (
                    <div className="flex justify-between text-[#16A34A] font-semibold animate-in fade-in duration-200">
                      <span>Wallet Deduction</span>
                      <span>-₹{effectiveWalletUsage}</span>
                    </div>
                  )}

                  {!usePass && couponApplied && (
                    <div className="flex justify-between text-emerald-600 font-semibold animate-in fade-in duration-200">
                      <span>Coupon Discount</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-zinc-100 flex justify-between font-extrabold text-[15px] sm:text-base text-zinc-900">
                    <span>Amount to Pay</span>
                    <span className="text-[#7027C9] text-lg font-black">
                      ₹{calculatedAmountToPay}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* 8. Sticky Bottom Booking Bar inside the Drawer */}
            <div className="bg-white border-t border-zinc-200 px-4 py-3.5 sm:px-6 z-20 shadow-lg">
              <div className="flex items-center justify-between gap-4">
                
                {/* Payment Gateway badge / Scenario label */}
                <div className="flex flex-col shrink-0">
                  <span className="text-[11px] text-zinc-500 font-medium mb-1">
                    {usePass 
                      ? 'Payment Method' 
                      : calculatedAmountToPay === 0 
                        ? 'Payment Method' 
                        : 'Pay online using'}
                  </span>

                  {usePass ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700">
                      <Sparkles className="w-4 h-4 text-[#FFE34D]" />
                      Nest Pass
                    </div>
                  ) : calculatedAmountToPay === 0 ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A]">
                      <Wallet className="w-4 h-4" />
                      Wallet (Full)
                    </div>
                  ) : (
                    /* Online Payment UPI Icons */
                    <div className="flex items-center -space-x-1.5">
                      {/* Google Pay (GPay) */}
                      <div className="w-7 h-7 rounded-full bg-white border border-[#0288D1] shadow-2xs flex items-center justify-center overflow-hidden shrink-0 z-30 p-1">
                        <svg viewBox="8 8 268 228" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="gpay_red" gradientUnits="userSpaceOnUse" x1="166.32" y1="132.13" x2="270.06" y2="94.37" gradientTransform="matrix(1 0 0 -1 0 228.34)">
                              <stop offset="0.2" stopColor="#D93025" />
                              <stop offset="0.6" stopColor="#EA4335" />
                            </linearGradient>
                            <linearGradient id="gpay_blue" gradientUnits="userSpaceOnUse" x1="8.84" y1="119.91" x2="124.40" y2="77.85" gradientTransform="matrix(1 0 0 -1 0 228.34)">
                              <stop offset="0.2" stopColor="#4285F4" />
                              <stop offset="0.8" stopColor="#1B74E8" />
                            </linearGradient>
                          </defs>
                          <path fill="url(#gpay_red)" d="M148.8 145.3l69.9-121.1 38.1 22c24.6 14.2 33 45.6 18.8 70.2l-39.4 68.2c-8.9 15.4-28.5 20.6-43.9 11.8l-35.3-20.4c-9.2-5.3-12.9-19-6.7-29.7z" />
                          <path fill="#FDBD00" d="M141.4 61.2L54.5 211.8l38.1 22c24.6 14.2 56 5.8 70.2-18.8l56.4-97.7c8.9-15.4 3.6-35-11.8-43.9L172 53c-10.7-6.2-24.4-2.5-30.6 8.2z" />
                          <path fill="#2DA94F" d="M218.7 24.2L191.8 8.6c-30.7-17.7-70-7.2-87.8 23.5l-50 86.6c-8.9 15.4-3.6 35 11.8 43.9l26.9 15.6c15.4 8.9 35 3.6 43.9-11.8L196.3 63c12.4-21.5 39.8-28.8 61.3-16.4" />
                          <path fill="url(#gpay_blue)" d="M111.8 57.5L82.1 40.4c-13.3-7.6-30.2-3.1-37.8 10.1L8.5 112.1c-17.6 30.3-7.1 69.1 23.3 86.7l22.6 13 27.5 15.8 11.9 6.9c-21.1-14.2-27.8-42.5-14.9-64.8l9.2-15.9 33.8-58.4c7.7-13.4 3.1-30.3-10.1-37.9z" />
                        </svg>
                      </div>

                      {/* PhonePe */}
                      <div className="w-7 h-7 rounded-full bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0 z-20 border border-[#0288D1]">
                        <span className="font-black text-xs tracking-tighter leading-none select-none">पे</span>
                      </div>

                      {/* BHIM UPI */}
                      <div className="w-7 h-7 rounded-full bg-white border border-[#0288D1] shadow-2xs flex items-center justify-center shrink-0 z-10 p-1">
                        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                          <path d="M14.5 4L7 12h6l-3.5 8 9.5-10h-6.5L14.5 4z" fill="#00A347" />
                          <path d="M10.5 4L3 12h6l-3.5 8 9.5-10H8.5L10.5 4z" fill="#FF6E00" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Book / Pay Button (Immediately disabled on click to prevent duplicate submissions) */}
                <button
                  type="button"
                  onClick={handleProceedBooking}
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-[#7027C9] hover:bg-[#5C1EAA] active:bg-[#4C1790] text-white font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99] text-center disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs sm:text-sm font-semibold truncate">
                        {submissionStepText || 'Processing...'}
                      </span>
                    </div>
                  ) : (
                    <span>
                      {usePass 
                        ? 'Confirm Pass Booking (₹0)' 
                        : calculatedAmountToPay === 0 
                          ? 'Confirm Wallet Booking (₹0)' 
                          : `Pay ₹${calculatedAmountToPay} & Confirm`}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
