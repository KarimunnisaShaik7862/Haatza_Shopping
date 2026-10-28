import React, { useState, useEffect, useRef } from 'react';
import { formatINR } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { SavedCard } from '../../types';
import {
  Smartphone, Wallet, CreditCard, Landmark,
  Banknote, ShieldCheck, Check, QrCode,
  RefreshCw, Plus, Search, Lock, AlertCircle,
  HelpCircle, ChevronDown, ChevronUp, Zap, X
} from 'lucide-react';

export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod' | null;

interface PaymentSectionProps {
  paymentMethod: PaymentMethodType;
  setPaymentMethod: (method: PaymentMethodType) => void;
  finalTotal: number;
  upiOption: 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'custom' | 'qr';
  setUpiOption: (opt: 'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'custom' | 'qr') => void;
  customUpiId: string;
  setCustomUpiId: (id: string) => void;
  isUpiVerified: boolean;
  setIsUpiVerified: (v: boolean) => void;
  cardDetails: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    saveCard: boolean;
  };
  setCardDetails: React.Dispatch<React.SetStateAction<{
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    saveCard: boolean;
  }>>;
  selectedSavedCardId: string | null;
  setSelectedSavedCardId: (id: string | null) => void;
  selectedNetBank: string;
  setSelectedNetBank: (bank: string) => void;
  selectedWallet: string;
  setSelectedWallet: (wallet: string) => void;
  codCaptcha: string;
  setCodCaptcha: (captcha: string) => void;
  codCaptchaInput: string;
  setCodCaptchaInput: (val: string) => void;
  useWalletBalance: boolean;
  setUseWalletBalance: (use: boolean) => void;
  cardCvvs: Record<string, string>;
  setCardCvvs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

// Popular Banks Data
interface BankInfo {
  id: string;
  name: string;
  shortName: string;
  color: string;
  popular?: boolean;
}

const ALL_BANKS: BankInfo[] = [
  { id: 'hdfc', name: 'HDFC Bank', shortName: 'HDFC', color: '#004C8F', popular: true },
  { id: 'sbi', name: 'State Bank of India', shortName: 'SBI', color: '#1B365D', popular: true },
  { id: 'icici', name: 'ICICI Bank', shortName: 'ICICI', color: '#F58220', popular: true },
  { id: 'axis', name: 'Axis Bank', shortName: 'AXIS', color: '#97144D', popular: true },
  { id: 'kotak', name: 'Kotak Mahindra Bank', shortName: 'KOTAK', color: '#ED1C24', popular: true },
  { id: 'bob', name: 'Bank of Baroda', shortName: 'BOB', color: '#F26522', popular: true },
  { id: 'pnb', name: 'Punjab National Bank', shortName: 'PNB', color: '#A20000' },
  { id: 'canara', name: 'Canara Bank', shortName: 'CANARA', color: '#0091DA' },
  { id: 'indusind', name: 'IndusInd Bank', shortName: 'INDUS', color: '#84142D' },
  { id: 'yes', name: 'Yes Bank', shortName: 'YES', color: '#005A9C' },
  { id: 'union', name: 'Union Bank of India', shortName: 'UNION', color: '#D81A28' },
  { id: 'federal', name: 'Federal Bank', shortName: 'FED', color: '#004A97' },
  { id: 'idfc', name: 'IDFC FIRST Bank', shortName: 'IDFC', color: '#9D1D27' },
  { id: 'boi', name: 'Bank of India', shortName: 'BOI', color: '#D64000' },
  { id: 'rbl', name: 'RBL Bank', shortName: 'RBL', color: '#002E6E' },
];

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  paymentMethod,
  setPaymentMethod,
  finalTotal,
  upiOption,
  setUpiOption,
  customUpiId,
  setCustomUpiId,
  isUpiVerified,
  setIsUpiVerified,
  cardDetails,
  setCardDetails,
  selectedSavedCardId,
  setSelectedSavedCardId,
  selectedNetBank,
  setSelectedNetBank,
  selectedWallet,
  setSelectedWallet,
  codCaptcha,
  setCodCaptcha,
  codCaptchaInput,
  setCodCaptchaInput,
  useWalletBalance,
  setUseWalletBalance,
  cardCvvs,
  setCardCvvs,
}) => {
  const { user, savedCards, addWalletFunds, addSavedCard } = useAuth();

  const [isAddingNewCard, setIsAddingNewCard] = useState(savedCards.length === 0);
  const [showAllBanks, setShowAllBanks] = useState(false);
  const [bankSearchQuery, setBankSearchQuery] = useState('');
  const [qrTimerSeconds, setQrTimerSeconds] = useState(600); // 10 minutes timer
  const [isQrRevealed, setIsQrRevealed] = useState(false);
  const [showUpiIdForm, setShowUpiIdForm] = useState(false);
  const [isToppingUp, setIsToppingUp] = useState(false);
  const [saveCardError, setSaveCardError] = useState<string>('');

  // Pay Online collapsible open state (initially false)
  const [isPayOnlineOpen, setIsPayOnlineOpen] = useState<boolean>(() => {
    return Boolean(paymentMethod && ['upi', 'card', 'netbanking', 'wallet'].includes(paymentMethod));
  });

  const codCardRef = useRef<HTMLDivElement>(null);

  // Sync isPayOnlineOpen if paymentMethod changes from parent (e.g. EMI pre-selection)
  useEffect(() => {
    if (paymentMethod && ['upi', 'card', 'netbanking', 'wallet'].includes(paymentMethod)) {
      setIsPayOnlineOpen(true);
    }
  }, [paymentMethod]);

  const handleTogglePayOnline = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsPayOnlineOpen((prev) => {
      const next = !prev;
      if (next) {
        if (paymentMethod === 'cod') {
          setPaymentMethod(null);
        }
      } else {
        if (paymentMethod && paymentMethod !== 'cod') {
          setPaymentMethod(null);
        }
      }
      return next;
    });
  };

  const isPayOnlineActive = isPayOnlineOpen || Boolean(paymentMethod && paymentMethod !== 'cod');

  const handleSelectOnlineMethod = (method: 'upi' | 'card' | 'netbanking' | 'wallet', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (paymentMethod === method) {
      setPaymentMethod(null);
    } else {
      setPaymentMethod(method);
    }
  };

  const handleSelectCod = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rectBefore = codCardRef.current?.getBoundingClientRect();

    setPaymentMethod('cod');
    setIsPayOnlineOpen(false);

    requestAnimationFrame(() => {
      if (codCardRef.current && rectBefore) {
        const rectAfter = codCardRef.current.getBoundingClientRect();
        const delta = rectAfter.top - rectBefore.top;
        if (Math.abs(delta) > 2) {
          window.scrollBy({ top: delta, behavior: 'instant' as any });
        }
      }
    });
  };

  const handleSaveNewCard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaveCardError('');

    const cleanNum = cardDetails.number.replace(/\s+/g, '');
    if (cleanNum.length < 15 || cleanNum.length > 19) {
      setSaveCardError('Please enter a valid 16-digit card number.');
      return;
    }
    if (!cardDetails.name.trim()) {
      setSaveCardError('Please enter the cardholder name.');
      return;
    }
    if (!cardDetails.expiry || !cardDetails.expiry.includes('/') || cardDetails.expiry.length < 5) {
      setSaveCardError('Please enter valid expiry in MM/YY format.');
      return;
    }
    if (cardDetails.cvv.length < 3) {
      setSaveCardError('Please enter a valid 3 or 4-digit CVV.');
      return;
    }

    const parts = cardDetails.expiry.split('/');
    const net = detectCardNetwork(cleanNum);
    const saved = addSavedCard({
      cardHolder: cardDetails.name,
      last4: cleanNum.slice(-4),
      network: net === 'generic' ? 'visa' : net,
      expiryMonth: parts[0] || '12',
      expiryYear: parts[1] || '28',
    });

    if (saved && saved.id) {
      setSelectedSavedCardId(saved.id);
      setIsAddingNewCard(false);
      if (cardDetails.cvv) {
        setCardCvvs((prev) => ({ ...prev, [saved.id]: cardDetails.cvv }));
      }
    }
  };

  useEffect(() => {
    if (!isQrRevealed) return;
    const timer = setInterval(() => {
      setQrTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isQrRevealed]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const walletBalance = typeof user?.walletBalance === 'number' ? user.walletBalance : 2500;
  const isWalletSufficient = walletBalance >= finalTotal;
  const walletShortfall = Math.max(0, finalTotal - walletBalance);

  // Card network detection helper
  const detectCardNetwork = (num: string): 'visa' | 'mastercard' | 'rupay' | 'amex' | 'generic' => {
    const clean = num.replace(/\s+/g, '');
    if (/^4/.test(clean)) return 'visa';
    if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
    if (/^6(0|5|8)/.test(clean) || /^508/.test(clean)) return 'rupay';
    if (/^3[47]/.test(clean)) return 'amex';
    return 'generic';
  };

  const currentNetwork = detectCardNetwork(cardDetails.number);

  // Format MM/YY
  const handleExpiryChange = (val: string) => {
    let clean = val.replace(/\D/g, '');
    if (clean.length > 4) clean = clean.slice(0, 4);
    if (clean.length >= 2) {
      clean = `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    setCardDetails({ ...cardDetails, expiry: clean });
  };

  // Format Card Number into 4-4-4-4
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardDetails({ ...cardDetails, number: formatted });
  };

  // Filter banks
  const filteredBanks = ALL_BANKS.filter((b) =>
    b.name.toLowerCase().includes(bankSearchQuery.toLowerCase()) ||
    b.shortName.toLowerCase().includes(bankSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 min-h-[420px]">
      
      {/* ------------------------------------------------------------------ */}
      {/* Main Section Header                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1F1F1F] font-heading tracking-tight">
            Choose Payment Method
          </h2>
          <p className="text-xs text-[#555555] mt-0.5">
            Select a payment method to complete your purchase. All transactions are 100% secure.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CATEGORY 1: PAY ONLINE (Selectable Card & Smooth Accordion)    */}
      {/* ============================================================== */}
      <div className={`rounded-lg border transition-all duration-200 bg-white overflow-hidden shadow-2xs ${
        isPayOnlineActive
          ? 'border-[#2962FF] ring-2 ring-[#2962FF]/20'
          : 'border-[#E5E7EB]'
      }`}>
        
        {/* Main Pay Online Header / Toggle Card */}
        <button
          type="button"
          onClick={handleTogglePayOnline}
          className={`w-full p-4 sm:p-5 text-left transition-colors cursor-pointer flex items-center justify-between gap-4 ${
            isPayOnlineActive
              ? 'bg-[#F5F7FF] border-b border-[#DBEAFE]'
              : 'hover:bg-slate-50/70'
          }`}
          aria-expanded={isPayOnlineOpen}
          aria-label="Pay Online with UPI, Cards, Wallet, or Net Banking"
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              isPayOnlineActive
                ? 'bg-[#2962FF] text-white shadow-xs'
                : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
            }`}>
              <Smartphone className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-sm sm:text-base text-[#1F1F1F] font-heading">
                  Pay Online
                </h3>
                <span className="text-[10px] font-bold text-[#2962FF] bg-white px-2 py-0.5 rounded-md border border-[#DBEAFE]">
                  Recommended • Faster Refund
                </span>
              </div>
              <p className="text-xs text-[#555555] mt-0.5">
                UPI, Debit/Credit Card, Net Banking, Haatza Wallet
              </p>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            {/* Pay Online Radio Selection Circle */}
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
              isPayOnlineActive
                ? 'border-[#2962FF] bg-[#2962FF]'
                : 'border-slate-300 bg-white'
            }`}>
              {isPayOnlineActive && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
          </div>
        </button>

        {/* Smooth Accordion Body for Pay Online (Grid-rows transition) */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: isPayOnlineOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
            opacity: isPayOnlineOpen ? 1 : 0,
          }}
          className="motion-reduce:transition-none"
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <div className="p-4 sm:p-5 space-y-4 bg-[#FCFDFF]">
              
              <p className="text-xs text-[#555555] font-medium">
                Select an online payment method below:
              </p>

              {/* 4 Interactive Online Payment Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          
          {/* Card 1: UPI */}
          <button
            type="button"
            onClick={(e) => handleSelectOnlineMethod('upi', e)}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px] ${
              paymentMethod === 'upi'
                ? 'bg-[#F5F7FF] border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                : 'bg-white border-[#E5E7EB] hover:border-[#2962FF]/50 hover:bg-slate-50/70 shadow-2xs'
            }`}
            aria-label="Pay via UPI"
          >
            <div className="flex items-start justify-between w-full">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentMethod === 'upi' ? 'bg-[#2962FF] text-white' : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
              }`}>
                <Smartphone className="w-5 h-5" />
              </div>

              {/* Selection Radio Dot */}
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                paymentMethod === 'upi' ? 'border-[#2962FF] bg-[#2962FF]' : 'border-slate-300 bg-white'
              }`}>
                {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#1F1F1F] font-heading leading-tight">
                UPI
              </h3>
              <p className="text-[11px] text-[#555555] font-medium truncate mt-0.5">
                GPay, PhonePe, QR
              </p>
            </div>
          </button>

          {/* Card 2: Wallet */}
          <button
            type="button"
            onClick={(e) => handleSelectOnlineMethod('wallet', e)}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px] ${
              paymentMethod === 'wallet'
                ? 'bg-[#F5F7FF] border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                : 'bg-white border-[#E5E7EB] hover:border-[#2962FF]/50 hover:bg-slate-50/70 shadow-2xs'
            }`}
            aria-label="Pay via Wallet"
          >
            <div className="flex items-start justify-between w-full">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentMethod === 'wallet' ? 'bg-[#2962FF] text-white' : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
              }`}>
                <Wallet className="w-5 h-5" />
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                paymentMethod === 'wallet' ? 'border-[#2962FF] bg-[#2962FF]' : 'border-slate-300 bg-white'
              }`}>
                {paymentMethod === 'wallet' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-xs sm:text-sm text-[#1F1F1F] font-heading leading-tight">
                  Wallet
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-100">
                  {formatINR(walletBalance)}
                </span>
              </div>
              <p className="text-[11px] text-[#555555] font-medium truncate mt-0.5">
                Haatza Wallet Balance
              </p>
            </div>
          </button>

          {/* Card 3: Debit/Credit Card */}
          <button
            type="button"
            onClick={(e) => handleSelectOnlineMethod('card', e)}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px] ${
              paymentMethod === 'card'
                ? 'bg-[#F5F7FF] border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                : 'bg-white border-[#E5E7EB] hover:border-[#2962FF]/50 hover:bg-slate-50/70 shadow-2xs'
            }`}
            aria-label="Pay via Credit or Debit Card"
          >
            <div className="flex items-start justify-between w-full">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentMethod === 'card' ? 'bg-[#2962FF] text-white' : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
              }`}>
                <CreditCard className="w-5 h-5" />
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                paymentMethod === 'card' ? 'border-[#2962FF] bg-[#2962FF]' : 'border-slate-300 bg-white'
              }`}>
                {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#1F1F1F] font-heading leading-tight">
                Cards
              </h3>
              <p className="text-[11px] text-[#555555] font-medium truncate mt-0.5">
                Credit & Debit Cards
              </p>
            </div>
          </button>

          {/* Card 4: Net Banking */}
          <button
            type="button"
            onClick={(e) => handleSelectOnlineMethod('netbanking', e)}
            className={`p-4 rounded-lg border text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[110px] ${
              paymentMethod === 'netbanking'
                ? 'bg-[#F5F7FF] border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                : 'bg-white border-[#E5E7EB] hover:border-[#2962FF]/50 hover:bg-slate-50/70 shadow-2xs'
            }`}
            aria-label="Pay via Net Banking"
          >
            <div className="flex items-start justify-between w-full">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                paymentMethod === 'netbanking' ? 'bg-[#2962FF] text-white' : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
              }`}>
                <Landmark className="w-5 h-5" />
              </div>

              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                paymentMethod === 'netbanking' ? 'border-[#2962FF] bg-[#2962FF]' : 'border-slate-300 bg-white'
              }`}>
                {paymentMethod === 'netbanking' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>

            <div className="mt-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-[#1F1F1F] font-heading leading-tight">
                Net Banking
              </h3>
              <p className="text-[11px] text-[#555555] font-medium truncate mt-0.5">
                50+ Indian Banks
              </p>
            </div>
          </button>

        </div>

        {/* ------------------------------------------------------------------ */}
        {/* EXPANDED INLINE PANEL FOR SELECTED ONLINE METHOD                   */}
        {/* ------------------------------------------------------------------ */}

        {/* 1. UPI Expanded Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: paymentMethod === 'upi' ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
            opacity: paymentMethod === 'upi' ? 1 : 0,
            pointerEvents: paymentMethod === 'upi' ? 'auto' : 'none',
          }}
          className="motion-reduce:transition-none"
          aria-hidden={paymentMethod !== 'upi'}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <div className="pt-2">
              <div className="p-4 sm:p-5 bg-[#F5F7FF] rounded-lg border border-[#DBEAFE] space-y-3.5">
            
            {/* Top Heading: Scan QR and Pay */}
            <div className="text-center space-y-0.5">
              <h3 className="text-base sm:text-lg font-extrabold text-[#1F1F1F] font-heading tracking-tight">
                Scan QR and Pay
              </h3>
              <p className="text-[11px] text-[#555555]">
                Pay directly from any UPI app on your phone
              </p>
            </div>

            {/* The Main QR Card - compact & balanced layout */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 sm:p-5 max-w-[270px] mx-auto text-center shadow-2xs space-y-3">
              
              {/* AMOUNT HEADER */}
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">
                  AMOUNT
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#1F1F1F] font-heading">
                  {formatINR(finalTotal)}
                </div>
              </div>

              {/* QR Code Container (compact ~150px) */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto bg-white rounded-xl border border-[#E5E7EB] p-2 flex items-center justify-center overflow-hidden shadow-2xs">
                
                {/* SVG QR Code (blurred when !isQrRevealed, sharp when isQrRevealed) */}
                <div className={`w-full h-full transition-all duration-300 flex items-center justify-center ${
                  !isQrRevealed ? 'filter blur-[5px] opacity-40 select-none pointer-events-none' : 'filter-none opacity-100'
                }`}>
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill="#1F1F1F">
                    {/* Corner Position Detection Squares */}
                    <rect x="5" y="5" width="28" height="28" rx="4" fill="#2962FF" />
                    <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                    <rect x="13" y="13" width="12" height="12" rx="1.5" fill="#2962FF" />

                    <rect x="67" y="5" width="28" height="28" rx="4" fill="#2962FF" />
                    <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
                    <rect x="75" y="13" width="12" height="12" rx="1.5" fill="#2962FF" />

                    <rect x="5" y="67" width="28" height="28" rx="4" fill="#2962FF" />
                    <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
                    <rect x="13" y="75" width="12" height="12" rx="1.5" fill="#2962FF" />

                    {/* QR Code Pixel Matrix */}
                    <rect x="38" y="8" width="6" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="48" y="8" width="8" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="38" y="18" width="8" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="50" y="18" width="10" height="6" rx="1" fill="#1F1F1F" />
                    
                    <rect x="8" y="38" width="6" height="8" rx="1" fill="#1F1F1F" />
                    <rect x="18" y="38" width="8" height="8" rx="1" fill="#1F1F1F" />
                    <rect x="30" y="38" width="12" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="46" y="36" width="8" height="14" rx="1" fill="#2962FF" />
                    <rect x="58" y="38" width="14" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="76" y="38" width="14" height="8" rx="1" fill="#1F1F1F" />

                    <rect x="8" y="50" width="10" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="22" y="48" width="8" height="12" rx="1" fill="#1F1F1F" />
                    <rect x="34" y="50" width="8" height="8" rx="1" fill="#1F1F1F" />
                    <rect x="58" y="48" width="8" height="10" rx="1" fill="#1F1F1F" />
                    <rect x="70" y="50" width="20" height="6" rx="1" fill="#1F1F1F" />

                    <rect x="38" y="66" width="14" height="8" rx="1" fill="#1F1F1F" />
                    <rect x="56" y="64" width="8" height="14" rx="1" fill="#1F1F1F" />
                    <rect x="68" y="66" width="8" height="8" rx="1" fill="#2962FF" />
                    <rect x="80" y="66" width="12" height="8" rx="1" fill="#1F1F1F" />

                    <rect x="38" y="78" width="8" height="14" rx="1" fill="#1F1F1F" />
                    <rect x="50" y="82" width="12" height="6" rx="1" fill="#1F1F1F" />
                    <rect x="66" y="78" width="14" height="14" rx="1" fill="#1F1F1F" />
                    <rect x="84" y="78" width="8" height="14" rx="1" fill="#1F1F1F" />

                    {/* Center Haatza Logo Badge */}
                    <circle cx="50" cy="50" r="11" fill="#2962FF" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">H</text>
                  </svg>
                </div>

                {/* Overlaid Button when NOT revealed */}
                {!isQrRevealed && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsQrRevealed(true);
                      setQrTimerSeconds(600);
                    }}
                    className="absolute inset-auto px-3.5 py-1.5 bg-white text-[#2962FF] font-bold text-xs rounded-lg border border-[#2962FF] shadow-xs hover:bg-[#F5F7FF] hover:border-[#1747CC] hover:text-[#1747CC] transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 z-10"
                  >
                    <span>Show QR code</span>
                  </button>
                )}

                {/* Live timer overlay badge when revealed */}
                {isQrRevealed && (
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-[#1F1F1F]/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Expires {formatTimer(qrTimerSeconds)}</span>
                  </div>
                )}
              </div>

              {/* Action when revealed: Hide or Refresh */}
              {isQrRevealed && (
                <div className="flex items-center justify-center gap-3 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setIsQrRevealed(false)}
                    className="text-[#555555] hover:text-[#1F1F1F] font-semibold underline cursor-pointer"
                  >
                    Hide QR code
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    type="button"
                    onClick={() => setQrTimerSeconds(600)}
                    className="text-[#2962FF] hover:text-[#1747CC] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh QR</span>
                  </button>
                </div>
              )}

              {/* Supported UPI Apps Icons (Google Pay, PhonePe, Paytm, BHIM/UPI) */}
              <div className="space-y-1 pt-0.5">
                <div className="flex items-center justify-center gap-2">
                  {/* 1. Google Pay */}
                  <div className="w-6 h-6 rounded-full bg-white shadow-2xs border border-[#E5E7EB] flex items-center justify-center p-0.5" title="Google Pay">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path d="M17.5 8.2c-.8-1.4-2.6-1.9-4-1.1L8.2 10.2c-1.4.8-1.9 2.6-1.1 4 .8 1.4 2.6 1.9 4 1.1l5.3-3.1c1.4-.8 1.9-2.6 1.1-4z" fill="#4285F4"/>
                      <path d="M15.5 14.8l-3.3 1.9c-1.4.8-3.2.3-4-1.1l-.8-1.4 5.3-3.1.8 1.4c.8 1.4 2 2.3 2 2.3z" fill="#34A853"/>
                      <path d="M6.5 15.8c-.8-1.4-.3-3.2 1.1-4l3.3-1.9 1.6 2.8-3.3 1.9c-.8.5-1.9.5-2.7.2z" fill="#FBBC05"/>
                      <path d="M13.8 6.5l3.3 1.9c1.4.8 1.9 2.6 1.1 4l-.8 1.4-5.3-3.1.8-1.4c.5-.9 1.4-1.5 2.4-1.5z" fill="#EA4335"/>
                    </svg>
                  </div>

                  {/* 2. PhonePe */}
                  <div className="w-6 h-6 rounded-full bg-[#5F259F] flex items-center justify-center text-white shadow-2xs font-bold text-xs" title="PhonePe">
                    पे
                  </div>

                  {/* 3. Paytm */}
                  <div className="h-6 px-1.5 rounded-md bg-[#002E6E] flex items-center justify-center shadow-2xs" title="Paytm">
                    <span className="text-[10px] font-black text-white tracking-tighter">pay</span>
                    <span className="text-[10px] font-black text-[#00BAF2] tracking-tighter">tm</span>
                  </div>

                  {/* 4. BHIM / UPI */}
                  <div className="w-6 h-6 rounded-md bg-[#1D4ED8] flex items-center justify-center shadow-2xs p-0.5" title="BHIM UPI">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M12 3L4 16h6l2-4 2 4h6L12 3z" fill="#00BAF2" />
                      <path d="M10 16l2 4 2-4h-4z" fill="#00E676" />
                    </svg>
                  </div>
                </div>

                <p className="text-[10px] text-[#555555] font-medium">
                  or any other UPI app
                </p>
              </div>

            </div>

            {/* Instruction Footer below Card */}
            <p className="text-[11px] text-[#555555] text-center max-w-xs mx-auto leading-normal">
              Do not hit back or close this screen until the transaction is complete.
            </p>

            {/* Collapsible / Expandable UPI ID Input */}
            <div className="max-w-[270px] mx-auto pt-0.5">
              <button
                type="button"
                onClick={() => setShowUpiIdForm(!showUpiIdForm)}
                className="w-full text-center text-[11px] font-bold text-[#2962FF] hover:text-[#1747CC] hover:underline flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>{showUpiIdForm ? 'Hide UPI ID option' : 'Prefer entering your UPI ID / VPA?'}</span>
                {showUpiIdForm ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showUpiIdForm && (
                <div className="mt-3 bg-white p-4 rounded-lg border border-[#E5E7EB] space-y-3 shadow-2xs animate-fadeIn">
                  <label className="block text-xs font-bold text-[#1F1F1F]">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customUpiId}
                      onChange={(e) => {
                        setCustomUpiId(e.target.value);
                        setIsUpiVerified(false);
                      }}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      className="flex-1 px-3.5 py-2 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#DBEAFE]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customUpiId.includes('@')) {
                          setIsUpiVerified(true);
                        }
                      }}
                      className="px-4 py-2 bg-[#2962FF] hover:bg-[#1747CC] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                    >
                      {isUpiVerified ? 'Verified ✓' : 'Verify'}
                    </button>
                  </div>

                  {isUpiVerified ? (
                    <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified VPA account ({customUpiId}). Ready to pay.</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-[#555555]">
                      A payment request will be sent to your registered UPI app upon clicking Pay Now.
                    </p>
                  )}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* 2. Wallet Expanded Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: paymentMethod === 'wallet' ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
            opacity: paymentMethod === 'wallet' ? 1 : 0,
            pointerEvents: paymentMethod === 'wallet' ? 'auto' : 'none',
          }}
          className="motion-reduce:transition-none"
          aria-hidden={paymentMethod !== 'wallet'}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <div className="pt-2">
              <div className="p-5 sm:p-6 bg-[#F5F7FF] rounded-lg border border-[#DBEAFE] space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1F1F1F] font-heading">
                  Haatza Digital Wallet
                </h4>
                <p className="text-xs text-[#555555]">
                  Instant 1-click checkout with your available Haatza wallet balance
                </p>
              </div>
              <span className="text-xs font-extrabold text-[#2962FF] bg-white px-3 py-1 rounded-full border border-[#DBEAFE] self-start sm:self-auto">
                Balance: {formatINR(walletBalance)}
              </span>
            </div>

            {/* Haatza Wallet Balance Card */}
            <div className="p-4 bg-white rounded-lg border border-[#E5E7EB] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE] flex items-center justify-center font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-[#1F1F1F] block">
                      Haatza Primary Wallet
                    </span>
                    <span className="text-xs text-[#555555]">
                      Available Balance: <strong className="text-[#1F1F1F]">{formatINR(walletBalance)}</strong>
                    </span>
                  </div>
                </div>

                {isWalletSufficient ? (
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Covers Full Order</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Shortfall: {formatINR(walletShortfall)}
                  </span>
                )}
              </div>

              {/* Balance Usage Status */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#555555]">Applicable toward current order:</span>
                <span className="font-bold text-[#1F1F1F]">
                  {formatINR(Math.min(walletBalance, finalTotal))}
                </span>
              </div>

              {/* Shortfall Alert & Quick Top-Up */}
              {!isWalletSufficient && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <p className="text-xs text-amber-800 font-medium">
                    Your balance is insufficient by <strong>{formatINR(walletShortfall)}</strong>. Add funds instantly to pay with your wallet:
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[500, 1000, 2000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => addWalletFunds(amt)}
                        className="px-3 py-1.5 rounded-lg border border-[#DBEAFE] bg-[#F5F7FF] hover:bg-[#DBEAFE] text-[#2962FF] font-bold text-xs transition-colors cursor-pointer"
                      >
                        + Add {formatINR(amt)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

        {/* 3. Debit / Credit Card Expanded Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: paymentMethod === 'card' ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
            opacity: paymentMethod === 'card' ? 1 : 0,
            pointerEvents: paymentMethod === 'card' ? 'auto' : 'none',
          }}
          className="motion-reduce:transition-none"
          aria-hidden={paymentMethod !== 'card'}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <div className="pt-2">
              <div className="p-5 sm:p-6 bg-[#F5F7FF] rounded-lg border border-[#DBEAFE] space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1F1F1F] font-heading">
                  Credit & Debit Cards
                </h4>
                <p className="text-xs text-[#555555]">
                  Supports Visa, Mastercard, RuPay, and American Express
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1F1F1F] border border-[#E5E7EB]">
                  Visa
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1F1F1F] border border-[#E5E7EB]">
                  Mastercard
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#1F1F1F] border border-[#E5E7EB]">
                  RuPay
                </span>
              </div>
            </div>

            {/* Saved Cards List */}
            {savedCards.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">
                    Saved Cards ({savedCards.length})
                  </span>
                  {!isAddingNewCard && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewCard(true);
                        setSelectedSavedCardId(null);
                      }}
                      className="text-xs font-bold text-[#2962FF] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Card</span>
                    </button>
                  )}
                </div>

                {!isAddingNewCard && (
                  <div className="space-y-2.5">
                    {savedCards.map((sc) => {
                      const isSelected = selectedSavedCardId === sc.id || (!selectedSavedCardId && sc.isDefault);
                      return (
                        <div
                          key={sc.id}
                          onClick={() => {
                            setSelectedSavedCardId(sc.id);
                            setIsAddingNewCard(false);
                          }}
                          className={`p-4 rounded-lg border transition-all cursor-pointer bg-white ${
                            isSelected
                              ? 'border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                              : 'border-[#E5E7EB] hover:border-[#2962FF]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-7 rounded-md bg-[#1F1F1F] text-white flex items-center justify-center text-[10px] font-black uppercase tracking-wider">
                                {sc.network}
                              </div>
                              <div>
                                <p className="font-extrabold text-xs sm:text-sm text-[#1F1F1F]">
                                  •••• •••• •••• {sc.last4}
                                </p>
                                <p className="text-[11px] text-[#555555]">
                                  {sc.cardHolder} • Expires {sc.expiryMonth}/{sc.expiryYear}
                                </p>
                              </div>
                            </div>

                            {/* CVV input for selected saved card */}
                            {isSelected ? (
                              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="password"
                                  maxLength={4}
                                  value={cardCvvs[sc.id] || ''}
                                  onChange={(e) => setCardCvvs({ ...cardCvvs, [sc.id]: e.target.value.replace(/\D/g, '') })}
                                  placeholder="CVV"
                                  className="w-16 px-2.5 py-1.5 text-xs text-center font-bold rounded-lg border border-[#2962FF] bg-white text-[#1F1F1F] focus:outline-hidden"
                                />
                                <span className="text-[10px] text-[#555555] hidden sm:inline">3 digits</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-transparent" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Add New Card Form */}
            {(isAddingNewCard || savedCards.length === 0) && (
              <div className="bg-white p-5 rounded-lg border border-[#E5E7EB] space-y-4 shadow-2xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider">
                    Enter New Card Details
                  </span>
                  {savedCards.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNewCard(false);
                        if (!selectedSavedCardId && savedCards.length > 0) {
                          setSelectedSavedCardId(savedCards[0].id);
                        }
                      }}
                      className="w-7 h-7 rounded-lg text-slate-400 hover:text-[#1F1F1F] hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close and show saved cards"
                      title="Show saved credit cards"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-[#1F1F1F]">
                      Card Number
                    </label>
                    <span className="text-[10px] font-bold uppercase text-[#2962FF]">
                      {currentNetwork !== 'generic' ? currentNetwork.toUpperCase() : ''}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={19}
                      value={cardDetails.number}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="Enter card number"
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#DBEAFE]"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1F1F1F] mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    placeholder="Enter cardholder name"
                    className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#DBEAFE]"
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1F1F1F] mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardDetails.expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#DBEAFE]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#1F1F1F]">
                        CVV / CVC
                      </label>
                      <span className="text-[10px] text-[#555555]">3 or 4 digits</span>
                    </div>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                      placeholder="Enter CVV"
                      className="w-full px-3.5 py-2.5 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF] focus:ring-2 focus:ring-[#DBEAFE]"
                    />
                  </div>
                </div>

                {/* Save Card Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-[#555555]">
                  <input
                    type="checkbox"
                    checked={cardDetails.saveCard}
                    onChange={(e) => setCardDetails({ ...cardDetails, saveCard: e.target.checked })}
                    className="w-4 h-4 rounded text-[#2962FF] focus:ring-[#2962FF] cursor-pointer"
                  />
                  <span>Save this card securely for faster checkout in future</span>
                </label>

                {/* Validation Error inside Card Form */}
                {saveCardError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{saveCardError}</span>
                  </div>
                )}

                {/* Save Card Button and Note */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleSaveNewCard}
                    className="px-5 py-2.5 bg-[#2962FF] hover:bg-[#1747CC] text-white font-bold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Card Details</span>
                  </button>
                  <p className="text-[11px] text-[#555555]">
                    Or click <strong className="text-[#1F1F1F]">Pay Now</strong> in summary to pay & save together.
                  </p>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Net Banking Expanded Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: paymentMethod === 'netbanking' ? '1fr' : '0fr',
            transition: 'grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms ease',
            opacity: paymentMethod === 'netbanking' ? 1 : 0,
            pointerEvents: paymentMethod === 'netbanking' ? 'auto' : 'none',
          }}
          className="motion-reduce:transition-none"
          aria-hidden={paymentMethod !== 'netbanking'}
        >
          <div style={{ overflow: 'hidden', minHeight: 0 }}>
            <div className="pt-2">
              <div className="p-5 sm:p-6 bg-[#F5F7FF] rounded-lg border border-[#DBEAFE] space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E7EB]">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-[#1F1F1F] font-heading">
                  Net Banking
                </h4>
                <p className="text-xs text-[#555555]">
                  Select your bank to authenticate securely through your bank's portal
                </p>
              </div>
              <span className="text-xs font-bold text-[#2962FF] bg-white px-2.5 py-1 rounded-full border border-[#DBEAFE] self-start sm:self-auto">
                Selected: {selectedNetBank}
              </span>
            </div>

            {/* Popular Banks Grid (6 Popular Bank Tiles) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1F1F1F] uppercase tracking-wider block">
                Popular Banks
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {ALL_BANKS.filter((b) => b.popular).map((bank) => {
                  const isSelected = selectedNetBank === bank.name;
                  return (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedNetBank(bank.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 bg-white ${
                        isSelected
                          ? 'border-[#2962FF] bg-[#F5F7FF] ring-2 ring-[#2962FF]/20 shadow-xs'
                          : 'border-[#E5E7EB] hover:border-[#2962FF]/40'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-[10px] shrink-0 shadow-2xs"
                        style={{ backgroundColor: bank.color }}
                      >
                        {bank.shortName}
                      </div>
                      <span className="font-bold text-xs text-[#1F1F1F] truncate">
                        {bank.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View All Banks Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowAllBanks(!showAllBanks)}
                className="text-xs font-bold text-[#2962FF] hover:underline flex items-center gap-1.5 cursor-pointer py-1"
              >
                <span>{showAllBanks ? 'Hide Other Banks' : 'View All 15+ Supported Indian Banks'}</span>
                {showAllBanks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Expandable Searchable Bank Grid */}
              {showAllBanks && (
                <div className="mt-3 p-4 bg-white rounded-lg border border-[#E5E7EB] space-y-3 animate-fadeIn">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={bankSearchQuery}
                      onChange={(e) => setBankSearchQuery(e.target.value)}
                      placeholder="Search bank name (e.g. Punjab, Canara, IndusInd)..."
                      className="w-full pl-9 pr-3.5 py-2 text-xs font-medium rounded-xl border border-[#E5E7EB] bg-white text-[#1F1F1F] focus:outline-hidden focus:border-[#2962FF]"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                    {filteredBanks.map((bank) => {
                      const isSelected = selectedNetBank === bank.name;
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => {
                            setSelectedNetBank(bank.name);
                            setShowAllBanks(false);
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 text-xs ${
                            isSelected
                              ? 'border-[#2962FF] bg-[#F5F7FF] text-[#2962FF] font-bold'
                              : 'border-slate-100 hover:border-slate-200 text-[#1F1F1F] hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-white text-[8px] shrink-0"
                            style={{ backgroundColor: bank.color }}
                          >
                            {bank.shortName.slice(0, 3)}
                          </div>
                          <span className="truncate">{bank.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

              </div>
            </div>
          </div>
        </div>

            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CATEGORY 2: CASH ON DELIVERY (Separate Card Below Pay Online)      */}
      {/* ------------------------------------------------------------------ */}
      <div ref={codCardRef} className="space-y-4 pt-2">
        
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-xs font-black uppercase tracking-wider text-[#1F1F1F] font-heading">
            Pay on Delivery
          </span>
        </div>

        {/* COD Selectable Card */}
        <button
          type="button"
          onClick={handleSelectCod}
          className={`w-full p-4 sm:p-5 rounded-lg border text-left transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            paymentMethod === 'cod'
              ? 'bg-[#F5F7FF] border-[#2962FF] ring-2 ring-[#2962FF]/20 shadow-xs'
              : 'bg-white border-[#E5E7EB] hover:border-[#2962FF]/50 hover:bg-slate-50/70 shadow-2xs'
          }`}
          aria-label="Pay with Cash on Delivery"
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              paymentMethod === 'cod' ? 'bg-[#2962FF] text-white' : 'bg-[#F5F7FF] text-[#2962FF] border border-[#DBEAFE]'
            }`}>
              <Banknote className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-[#1F1F1F] font-heading">
                  Cash on Delivery (COD)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-[#1F1F1F] border border-slate-200">
                  Cash / UPI QR at Doorstep
                </span>
              </div>
              <p className="text-xs text-[#555555] mt-0.5">
                Pay with cash or UPI QR code at your doorstep when your order is delivered.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
              paymentMethod === 'cod' ? 'border-[#2962FF] bg-[#2962FF]' : 'border-slate-300 bg-white'
            }`}>
              {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>
        </button>

      </div>

    </div>
  );
};

export default PaymentSection;
