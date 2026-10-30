import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  X, 
  Receipt, 
  Wallet, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Ticket, 
  Copy, 
  ShieldCheck,
  User,
  Phone,
  Mail
} from 'lucide-react';
import haatzaNestPassCard from '../../assets/haatza_nest_pass_card.png';
import { NestPassItem } from '../../types/haatzaNest.types';
import { useHaatzaNestUser } from '../../hooks/useHaatzaNestUser';
import { useHaatzaNestDashboard } from '../../hooks/useHaatzaNestDashboard';
import { 
  createNestPassBooking, 
  confirmNestPassWithRetry, 
  savePendingPassConfirmation, 
  getPendingPassConfirmation, 
  clearPendingPassConfirmation 
} from '../../services/haatzaNestPassApi';
import { createRazorpayOrder, HaatzaApiException } from '../../services/haatzaNestBookingApi';
import { openRazorpayCheckout } from '../../services/haatzaNestPaymentService';

interface HaatzaNestCouponDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  passData?: NestPassItem | null;
  couponImage?: string | null;
  isCouponOnly?: boolean;
}

interface ActivatedPassDetails {
  bookingId: string;
  status: string;
  remainingVisits?: number;
  expiryDate?: string;
  packId: string;
}

export const HaatzaNestCouponDrawer: React.FC<HaatzaNestCouponDrawerProps> = ({
  isOpen,
  onClose,
  passData,
  couponImage,
  isCouponOnly = false,
}) => {
  const { user, customerId } = useHaatzaNestUser();
  const { refetch, nestuserpass, nestuserpassData } = useHaatzaNestDashboard();

  // Customer contact state
  const [customerEmail, setCustomerEmail] = useState<string>(() => customerId || user?.email || '');
  const [customerName, setCustomerName] = useState<string>(() => user?.name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(() => user?.phone || '');

  // Payment configuration state
  const [redeemOnepay, setRedeemOnepay] = useState(false);
  const [customWalletAmount, setCustomWalletAmount] = useState<number>(0);
  const [isFullWallet, setIsFullWallet] = useState<boolean>(true);

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef<boolean>(false);
  const createdPassRef = useRef<{
    tableId: string;
    bookingId: string;
    razorpayAmount?: number;
    status: string;
  } | null>(null);

  const [stepText, setStepText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingNotice, setPendingNotice] = useState<string | null>(null);
  const [copyNotice, setCopyNotice] = useState<string | null>(null);
  const [activatedPass, setActivatedPass] = useState<ActivatedPassDetails | null>(null);

  // Sync user details when user state changes
  useEffect(() => {
    if (customerId) setCustomerEmail(customerId);
    else if (user?.email) setCustomerEmail(user.email);
    if (user?.name) setCustomerName(user.name);
    if (user?.phone) setCustomerPhone(user.phone);
  }, [user, customerId]);

  // Derived pricing & pack variables
  const packagePrice = passData?.price && passData.price > 0 ? passData.price : 1999;
  const packId = passData?.packId || 'NP001';

  // Calculate wallet usage based on options
  const onepayUsed = redeemOnepay
    ? isFullWallet
      ? packagePrice
      : Math.min(customWalletAmount, packagePrice)
    : 0;

  const orderTotal = Math.max(0, packagePrice - onepayUsed);

  // Check and recover pending confirmation from previous reload or crash
  const checkPendingConfirmation = useCallback(async () => {
    const pending = getPendingPassConfirmation();
    if (pending && pending.tableId && pending.paymentId && pending.signature && pending.orderId) {
      setStepText('Resuming confirmation for your pass payment...');
      setIsSubmitting(true);
      isSubmittingRef.current = true;
      try {
        const confirmRes = await confirmNestPassWithRetry({
          _id: pending.tableId,
          razorpay_order_id: pending.orderId,
          razorpay_payment_id: pending.paymentId,
          razorpay_signature: pending.signature,
        });

        clearPendingPassConfirmation();
        setActivatedPass({
          bookingId: confirmRes.data?.bookingId || pending.bookingId,
          status: confirmRes.data?.status || 'Active',
          remainingVisits: confirmRes.data?.remainingVisits,
          expiryDate: confirmRes.data?.expiryDate,
          packId: pending.packId,
        });
        await refetch();
      } catch (err: any) {
        console.error('Pending pass confirmation recovery error:', err);
        setPendingNotice(
          `Payment received (ID: ${pending.paymentId}). Your pass activation is in progress. Please do not pay again.`
        );
      } finally {
        setIsSubmitting(false);
        isSubmittingRef.current = false;
        setStepText('');
      }
    }
  }, [refetch]);

  // Reset drawer states on opening
  useEffect(() => {
    if (isOpen) {
      setRedeemOnepay(false);
      setIsFullWallet(true);
      setCustomWalletAmount(200); // sensible default for partial payment testing
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      createdPassRef.current = null;
      setErrorMessage(null);
      setPendingNotice(null);
      setStepText('');
      setActivatedPass(null);

      // Check if user already has an active pass in dashboard
      if (nestuserpass && nestuserpassData && nestuserpassData.length > 0) {
        const existing = nestuserpassData[0];
        setActivatedPass({
          bookingId: existing.bookingId || existing._id || 'ACTIVE-PASS',
          status: existing.status || 'Active',
          remainingVisits: existing.remainingVisits ?? existing.visits,
          expiryDate: existing.expiryDate,
          packId: existing.packId || packId,
        });
      } else {
        checkPendingConfirmation();
      }
    }
  }, [isOpen, checkPendingConfirmation, nestuserpass, nestuserpassData, packId]);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose, isSubmitting]);

  // Copy helper
  const handleCopyText = (text: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopyNotice(`${label} copied!`);
      setTimeout(() => setCopyNotice(null), 2500);
    }
  };

  // Main purchase action: implements Wallet-only, Online-only, and Part-payment
  const handlePayNow = async () => {
    // 1. Strict duplicate click prevention
    if (isSubmittingRef.current || isSubmitting || activatedPass) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrorMessage(null);
    setPendingNotice(null);

    const resolvedUserId = (customerEmail || customerId || '').trim();
    if (!resolvedUserId || !resolvedUserId.includes('@')) {
      setErrorMessage('Please provide a valid email address for pass activation.');
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      return;
    }

    // Determine payload fields based on payment scenario (PDF Section 1.1 & 2.1)
    const walletuseage = onepayUsed;
    const paidAmount = onepayUsed;

    try {
      // Step 1: Create Nest Pass booking record
      let passBooking = createdPassRef.current;
      if (!passBooking) {
        setStepText('Creating Nest Pass booking...');
        const createRes = await createNestPassBooking({
          userId: resolvedUserId,
          packId,
          baseprice: packagePrice,
          paidAmount,
          walletuseage,
        });

        passBooking = {
          tableId: createRes.tableId || '',
          bookingId: createRes.bookingId || '',
          razorpayAmount: createRes.razorpayAmount,
          status: createRes.status || '',
        };
        createdPassRef.current = passBooking;

        // SCENARIO A: Wallet-only (walletuseage = baseprice)
        // Per PDF Section 1.1: Result is status = Active. Wallet deducted.
        // "Done. Do NOT open Razorpay and do NOT call Confirm."
        if (createRes.status === 'Active') {
          setActivatedPass({
            bookingId: createRes.bookingId || '',
            status: 'Active',
            remainingVisits: createRes.remainingVisits || createRes.totalvisit || passData?.visits,
            expiryDate: createRes.expiryDate,
            packId: createRes.packId || packId,
          });
          await refetch();
          setIsSubmitting(false);
          isSubmittingRef.current = false;
          setStepText('');
          return;
        }
      }

      // SCENARIOS B & C: Online-only (walletuseage = 0) OR Part-payment (0 < walletuseage < baseprice)
      // Both return status = paymentpending and razorpayAmount.
      const razorpayAmount = passBooking.razorpayAmount !== undefined ? passBooking.razorpayAmount : orderTotal;

      if (!passBooking.tableId) {
        throw new Error('Server did not return a valid booking tableId for payment verification.');
      }

      // Step 2: Create Razorpay Order via secure backend integration (PDF Section 4)
      setStepText('Preparing secure Razorpay order...');
      const orderRes = await createRazorpayOrder(razorpayAmount, {
        receipt: passBooking.bookingId,
        notes: {
          tableId: passBooking.tableId,
        },
      });

      // Step 3: Open Razorpay Checkout modal
      setStepText('Opening Razorpay checkout...');
      await openRazorpayCheckout({
        keyId: orderRes.keyId,
        orderId: orderRes.orderId,
        amountPaise: orderRes.amountPaise,
        bookingId: passBooking.bookingId,
        customerName: customerName.trim() || 'Valued Customer',
        customerPhone: customerPhone.trim(),
        customerEmail: resolvedUserId,
        onSuccess: async (rzpSuccess) => {
          setStepText('Payment received! Verifying and activating pass...');

          // Persist pending confirmation to survive network drops / crashes
          savePendingPassConfirmation({
            tableId: passBooking!.tableId,
            bookingId: passBooking!.bookingId,
            packId,
            orderId: rzpSuccess.razorpay_order_id,
            paymentId: rzpSuccess.razorpay_payment_id,
            signature: rzpSuccess.razorpay_signature,
            amount: razorpayAmount,
            createdAt: Date.now(),
          });

          // Step 4: Confirm Pass booking with retry handling (PDF Section 3)
          try {
            const confirmRes = await confirmNestPassWithRetry({
              _id: passBooking!.tableId,
              razorpay_order_id: rzpSuccess.razorpay_order_id,
              razorpay_payment_id: rzpSuccess.razorpay_payment_id,
              razorpay_signature: rzpSuccess.razorpay_signature,
            });

            // On genuine confirmation, clear local pending store
            clearPendingPassConfirmation();
            setActivatedPass({
              bookingId: confirmRes.data?.bookingId || passBooking!.bookingId,
              status: confirmRes.data?.status || 'Active',
              remainingVisits: confirmRes.data?.remainingVisits,
              expiryDate: confirmRes.data?.expiryDate,
              packId,
            });
            await refetch();
          } catch (confirmErr: any) {
            console.error('Pass confirmation failed after retries:', confirmErr);
            // Critical rule: Never ask the customer to pay again if payment succeeded!
            setPendingNotice(
              `Payment received (ID: ${rzpSuccess.razorpay_payment_id}). Your pass is being activated by our system webhook. Please do not pay again.`
            );
          } finally {
            setIsSubmitting(false);
            isSubmittingRef.current = false;
            setStepText('');
          }
        },
        onDismiss: () => {
          setIsSubmitting(false);
          isSubmittingRef.current = false;
          setStepText('');
          setErrorMessage('Payment was not completed. You can tap Pay Now when you are ready to continue.');
        },
        onError: (err) => {
          setIsSubmitting(false);
          isSubmittingRef.current = false;
          setStepText('');
          setErrorMessage(err?.description || 'Payment gateway reported an error. Please try again.');
        },
      });
    } catch (err: any) {
      console.error('Nest Pass Purchase Error:', err);
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setStepText('');
      const message = err instanceof HaatzaApiException ? err.message : (err?.message || 'Failed to complete Nest Pass booking.');
      setErrorMessage(message);
    }
  };

  if (!isOpen) return null;

  const bannerImage = isCouponOnly
    ? (couponImage || passData?.popupBanner || haatzaNestPassCard)
    : (passData?.popupBanner || couponImage || haatzaNestPassCard);

  const formatExpiryDisplay = (isoStr?: string) => {
    if (!isoStr) return 'Valid for 30 Days';
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={isCouponOnly ? "Coupon Details" : "Nest Pass Details"}
    >
      {/* Scoped Animations */}
      <style>{`
        @keyframes nestCouponSlideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes nestCouponFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .nest-coupon-drawer-slide {
          animation: nestCouponSlideIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .nest-coupon-drawer-backdrop {
          animation: nestCouponFadeIn 0.25s ease-out forwards;
        }
      `}</style>

      {/* Dimmed Backdrop - Click to Close */}
      <div 
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] nest-coupon-drawer-backdrop cursor-pointer"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        aria-hidden="true"
      />

      {/* Right Slide-in Panel Matching Reference Screenshot */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full sm:w-[420px] md:w-[460px] max-w-full h-full bg-[#ECE8F8] flex flex-col shadow-[-12px_0_36px_rgba(40,15,80,0.18)] overflow-y-auto overscroll-contain nest-coupon-drawer-slide"
      >
        {/* Floating Top-Left Back Button */}
        <button
          type="button"
          onClick={() => {
            if (!isSubmitting) onClose();
          }}
          disabled={isSubmitting}
          aria-label="Back"
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Floating Top-Right Close Button */}
        <button
          type="button"
          onClick={() => {
            if (!isSubmitting) onClose();
          }}
          disabled={isSubmitting}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Complete Coupon Banner Image - Edge-to-Edge */}
        <div className="w-full shrink-0">
          <img
            src={bannerImage}
            alt={passData ? `HAATZA Nest Pass ${passData.packId}` : "HAATZA Nest Offer"}
            className="w-full h-auto block select-none object-contain"
          />
        </div>

        {/* Copy Toast Notice */}
        {copyNotice && (
          <div className="mx-4 mt-2 py-1.5 px-3 bg-zinc-900 text-white text-xs rounded-lg text-center shadow-lg animate-fade-in font-medium">
            {copyNotice}
          </div>
        )}

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="mx-4 mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{errorMessage}</div>
            <button 
              type="button" 
              onClick={() => setErrorMessage(null)} 
              className="text-red-400 hover:text-red-600 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Pending Recovery Notice Banner */}
        {pendingNotice && (
          <div className="mx-4 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{pendingNotice}</div>
          </div>
        )}

        {/* Details & Billing Cards Container */}
        <div className="px-4 pt-3 pb-6 space-y-3.5 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5">

            {/* ACTIVATED PASS VIEW (Shown when pass is active) */}
            {activatedPass ? (
              <div className="bg-white rounded-2xl sm:rounded-[20px] p-5 shadow-[0_4px_20px_rgba(40,15,80,0.06)] border border-purple-100 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-purple-50">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-zinc-900 text-base">HAATZA Nest Pass</h3>
                      <p className="text-xs text-zinc-500">Pack ID: {activatedPass.packId}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-purple-50/50 rounded-xl">
                    <span className="text-zinc-500 block mb-1">Pass Status</span>
                    <span className="font-bold text-zinc-900 capitalize text-sm">
                      {activatedPass.status}
                    </span>
                  </div>
                  <div className="p-3 bg-purple-50/50 rounded-xl">
                    <span className="text-zinc-500 block mb-1">Visits Available</span>
                    <span className="font-bold text-[#7027C9] text-sm">
                      {activatedPass.remainingVisits !== undefined ? `${activatedPass.remainingVisits} Visits` : '17 Visits'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-zinc-600">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span>Valid Until:</span>
                  </div>
                  <span className="font-semibold text-zinc-900">
                    {formatExpiryDisplay(activatedPass.expiryDate)}
                  </span>
                </div>

                <div className="p-3 bg-zinc-50 rounded-xl">
                  <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                    <span>Pass Booking ID</span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(activatedPass.bookingId, 'Booking ID')}
                      className="text-[#7027C9] hover:underline flex items-center gap-1 font-medium"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <span className="font-mono text-xs font-bold text-zinc-900 break-all">
                    {activatedPass.bookingId}
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Card 1: Price Details Card */}
                <div className="bg-white rounded-2xl sm:rounded-[20px] p-5 shadow-[0_2px_12px_rgba(40,15,80,0.04)] border border-purple-50/60">
                  <div className="flex items-center gap-2.5 mb-5 text-zinc-900 font-bold text-[16px] sm:text-[17px] tracking-tight">
                    <Receipt className="w-5 h-5 text-zinc-700 stroke-[1.8]" />
                    <span>Price Details</span>
                  </div>
                  <div className="flex items-center justify-between text-[14.5px] sm:text-[15px]">
                    <span className="text-zinc-700 font-medium">Package Price ({packId})</span>
                    <span className="font-semibold text-zinc-900 tracking-tight">
                      ₹{packagePrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Card 2: Onepay Balance & Payment Choice */}
                <div className="bg-white rounded-2xl sm:rounded-[20px] p-4.5 sm:p-5 shadow-[0_2px_12px_rgba(40,15,80,0.04)] border border-purple-50/60 space-y-3">
                  <div 
                    onClick={() => {
                      if (!isSubmitting) setRedeemOnepay((prev) => !prev);
                    }}
                    className="flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-[#F2ECFC] flex items-center justify-center text-[#7027C9] shrink-0">
                        <Wallet className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[15px] sm:text-[15.5px] font-bold text-zinc-900 leading-tight">
                          Haatza Onepay Wallet
                        </div>
                        <div className="text-xs text-zinc-500 mt-1 font-normal line-clamp-1">
                          Redeem wallet balance to purchase pass
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={redeemOnepay}
                        disabled={isSubmitting}
                        onClick={() => setRedeemOnepay((prev) => !prev)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 cursor-pointer ${
                          redeemOnepay
                            ? 'bg-[#7027C9] text-white shadow-xs'
                            : 'bg-white border-2 border-zinc-300 hover:border-[#7027C9]'
                        }`}
                        aria-label="Redeem onepay balance"
                      >
                        {redeemOnepay && <Check className="w-4 h-4 stroke-[3]" />}
                      </button>
                    </div>
                  </div>

                  {/* Wallet Redemption Options (Scenario A: Full Wallet vs Scenario C: Partial Wallet) */}
                  {redeemOnepay && (
                    <div className="pt-2 border-t border-purple-50 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsFullWallet(true)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                            isFullWallet
                              ? 'bg-[#7027C9] text-white shadow-xs'
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          }`}
                        >
                          Full Wallet (₹{packagePrice})
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFullWallet(false)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                            !isFullWallet
                              ? 'bg-[#7027C9] text-white shadow-xs'
                              : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                          }`}
                        >
                          Part Wallet (₹200 + Online)
                        </button>
                      </div>

                      {!isFullWallet && (
                        <div className="flex items-center gap-2 pt-1">
                          <span className="text-xs text-zinc-600 font-medium">Wallet Amount (₹):</span>
                          <input
                            type="number"
                            min="1"
                            max={packagePrice - 1}
                            value={customWalletAmount}
                            onChange={(e) => setCustomWalletAmount(Math.max(1, Math.min(packagePrice - 1, Number(e.target.value) || 0)))}
                            className="w-24 px-2 py-1 text-xs border border-zinc-200 rounded-lg text-zinc-900 font-semibold focus:outline-none focus:border-[#7027C9]"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card 3: Wallet Deduction Breakdown (When wallet is used) */}
                {redeemOnepay && (
                  <div className="bg-white rounded-2xl sm:rounded-[20px] p-5 shadow-[0_2px_12px_rgba(40,15,80,0.04)] border border-purple-50/60 transition-all duration-300">
                    <h4 className="text-[16px] sm:text-[17px] font-bold text-zinc-900 mb-4 tracking-tight">
                      Payment Breakdown
                    </h4>
                    <div className="space-y-3 text-[14.5px] sm:text-[15px]">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-700 font-medium">Haatza Onepay Used</span>
                        <span className="font-semibold text-[#16A34A] tracking-tight">
                          -₹{onepayUsed.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-700 font-medium">Online Payment Required</span>
                        <span className="font-semibold text-zinc-900 tracking-tight">
                          ₹{orderTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card 4: Customer Email / User ID (Per PDF Section 2.1) */}
                <div className="bg-white rounded-2xl sm:rounded-[20px] p-4 shadow-[0_2px_12px_rgba(40,15,80,0.04)] border border-purple-50/60 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-zinc-800">
                    <User className="w-4 h-4 text-[#7027C9]" />
                    <span>Pass Registered To</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-600 bg-zinc-50 p-2.5 rounded-xl">
                    <span className="font-medium truncate max-w-[240px]">{customerEmail}</span>
                    <span className="text-[11px] text-zinc-400 font-mono">{customerPhone}</span>
                  </div>
                </div>

                {/* Card 5: Order Total Card */}
                <div className="bg-white rounded-2xl sm:rounded-[20px] p-5 shadow-[0_2px_12px_rgba(40,15,80,0.04)] border border-purple-50/60 flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-[16px] sm:text-[17px] tracking-tight">
                    Order Total
                  </span>
                  <span className="font-extrabold text-zinc-900 text-[17px] sm:text-[18px] tracking-tight">
                    ₹{orderTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Action Button Section */}
          <div className="pt-3 pb-2 space-y-2">
            {activatedPass ? (
              <button
                type="button"
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-bold text-base bg-[#7027C9] hover:bg-[#5C1EAA] text-white flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(112,39,201,0.25)] cursor-pointer active:scale-[0.99] transition-all"
              >
                <Check className="w-5 h-5 stroke-[2.5]" />
                <span>Done / View Dashboard</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(112,39,201,0.25)] ${
                  isSubmitting
                    ? 'bg-[#8F55D8] text-white cursor-not-allowed opacity-90'
                    : 'bg-[#7027C9] hover:bg-[#5C1EAA] active:bg-[#4C1790] text-white hover:shadow-[0_6px_20px_rgba(112,39,201,0.35)] active:scale-[0.99]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{stepText || 'Processing...'}</span>
                  </>
                ) : orderTotal === 0 ? (
                  <>
                    <Wallet className="w-5 h-5" />
                    <span>Activate with Onepay Wallet (₹{packagePrice})</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-5 h-5" />
                    <span>Pay ₹{orderTotal.toLocaleString('en-IN')} Now</span>
                  </>
                )}
              </button>
            )}

            {!activatedPass && (
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Secure Checkout with Razorpay & Haatza Protection</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaatzaNestCouponDrawer;
