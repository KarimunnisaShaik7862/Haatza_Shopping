import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronDown, Share2, 
  Mail, RefreshCw, ShoppingCart, Briefcase, MessageCircle
} from 'lucide-react';
import referralGiftBox from '../../assets/referral_gift_box.jpg';
import { HaatzaNestReferralTermsModal } from './HaatzaNestReferralTermsModal';
import { HaatzaNestReferralFaqModal } from './HaatzaNestReferralFaqModal';

export interface HaatzaNestReferralDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Is there a limit to how many people I can refer?',
    answer: 'No! You can refer as many people as you want. Each successful referral adds ₹100 to your wallet.',
  },
  {
    id: 'faq-2',
    question: 'When do I receive my reward?',
    answer: 'You’ll receive your wallet credit within 24–48 hours of your friend’s first order being delivered.',
  },
  {
    id: 'faq-3',
    question: 'What can I buy with Wallet Cash?',
    answer: 'You can use it to pay for any product on Haatza, except during some flash sales and sponsored campaigns.',
  },
  {
    id: 'faq-4',
    question: 'Can I refer someone who has already signed up on Haatza?',
    answer: 'No, referral rewards are valid only for new users who have never created a Haatza account before.',
  },
  {
    id: 'faq-5',
    question: 'Can I track my referrals?',
    answer: 'Yes, login to your account → “Refer & Earn” → Track your referral history and rewards.',
  },
];

export const HaatzaNestReferralDrawer: React.FC<HaatzaNestReferralDrawerProps> = ({
  isOpen,
  onClose,
  referralCode = '1CTCSS30',
}) => {
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({});
  const [showFallbackModal, setShowFallbackModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) {
      setShowTermsModal(false);
      setShowFaqModal(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showTermsModal) {
          setShowTermsModal(false);
        } else if (showFaqModal) {
          setShowFaqModal(false);
        } else if (showFallbackModal) {
          setShowFallbackModal(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, showFallbackModal, showTermsModal, showFaqModal]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const codeToUse = referralCode || '1CTCSS30';
  const referralMessage = `🎁 Invite your friends to try Haatza! 🎉
They’ll get ₹50 off instantly on their first order,
and you’ll earn ₹100 once they complete their first purchase. 💰
Use my Referral Code: ${codeToUse} 🏷️
👉 Shop now at: www.haatza.com
Start sharing — more friends, more rewards! 💞`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(referralMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent('Invite your friends to Haatza');
    const body = encodeURIComponent(referralMessage);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Invite your friends to Haatza',
      text: referralMessage,
    };

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        if (typeof navigator.canShare === 'function') {
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        } else {
          await navigator.share(shareData);
          return;
        }
      } catch (err: any) {
        // User cancelled/aborted share sheet - do not trigger fallback
        if (err && (err.name === 'AbortError' || err.code === 20)) {
          return;
        }
      }
    }

    // Fallback if Web Share API is unavailable on this device/browser
    setShowFallbackModal(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end select-none">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Popup Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Refer & Earn Popup"
        className="relative z-50 w-full max-w-[420px] sm:max-w-[440px] h-full bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Top Header Bar (Purple Theme matching Reference blue header) */}
        <header className="bg-gradient-to-r from-[#7027C9] to-[#8E38F5] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back"
              className="p-1 rounded-full hover:bg-white/15 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-bold font-heading tracking-tight text-white">
              Refer &amp; Earn
            </h2>
          </div>

          {/* Visible Close (×) Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Refer & Earn popup"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 overscroll-contain">
          
          {/* SECTION 1: Top Hero Box with Staggered Entrance & Animations */}
          <section className="p-5 sm:p-6 bg-white space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg sm:text-xl font-black text-[#24152F] font-heading tracking-tight leading-snug">
                  Refer and get{' '}
                  <span className="animate-text-shimmer inline-block font-black">
                    ₹100
                  </span>
                </h3>
                <p className="text-xs sm:text-[13px] text-[#625D6E] leading-relaxed">
                  Invite your friends to try Haatza! They get instant ₹100 off. You win ₹100 once they place their first order.
                </p>
              </div>

              {/* 3D Gift Box with floating animation */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl flex flex-col items-center justify-center bg-purple-50/60 p-1 relative group">
                <img
                  src={referralGiftBox}
                  alt="Open gift box bursting with confetti"
                  className="w-full h-full object-contain animate-referral-gift drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Refer via Divider */}
            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-zinc-200" />
              </div>
              <span className="relative bg-white px-3 text-xs font-semibold text-zinc-500 font-heading">
                Refer via
              </span>
            </div>

            {/* 3 Circular Share Action Buttons with Hover Lift & Glow */}
            <div className="grid grid-cols-3 gap-3 text-center pt-1">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center gap-2 group cursor-pointer transition-transform duration-200 active:scale-95"
              >
                <div className="w-13 h-13 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_20px_-4px_rgba(37,211,102,0.45)]">
                  {/* WhatsApp SVG Icon */}
                  <svg 
                    className="w-6 h-6 fill-current transition-transform duration-200 group-hover:scale-110" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-zinc-700 group-hover:text-[#25D366] transition-colors">
                  Whatsapp
                </span>
              </button>

              {/* Email Button */}
              <button
                type="button"
                onClick={handleShareEmail}
                className="flex flex-col items-center gap-2 group cursor-pointer transition-transform duration-200 active:scale-95"
              >
                <div className="w-13 h-13 rounded-full bg-[#7027C9]/10 hover:bg-[#7027C9] text-[#7027C9] hover:text-white flex items-center justify-center shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_20px_-4px_rgba(112,39,201,0.4)]">
                  <Mail className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="text-xs font-semibold text-zinc-700 group-hover:text-[#7027C9] transition-colors">
                  Email
                </span>
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share"
                className="flex flex-col items-center gap-2 group cursor-pointer relative transition-transform duration-200 active:scale-95"
              >
                <div className="w-13 h-13 rounded-full flex items-center justify-center shadow-xs transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_8px_20px_-4px_rgba(245,158,11,0.45)] bg-amber-100/70 hover:bg-[#FFB800] text-amber-800 hover:text-amber-950">
                  <Share2 className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                </div>
                <span className="text-xs font-semibold text-zinc-700 group-hover:text-amber-700 transition-colors">
                  Share
                </span>
              </button>
            </div>
          </section>

          {/* SECTION 2: How it works? (Soft Lavender Tinted Container with Flowing Stepper) */}
          <section className="p-5 sm:p-6 bg-[#FAF5FF] border-y border-[#E9D8FD] space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both">
            <h4 className="text-base font-bold text-[#24152F] font-heading">
              How it works?
            </h4>

            {/* Stepper with Flowing Connector Line */}
            <div className="space-y-4 relative">
              {/* Vertical connector line with flowing animated gradient */}
              <div 
                className="absolute left-3.5 top-3.5 bottom-3.5 w-0.5 animate-stepper-flow rounded-full" 
                aria-hidden="true" 
              />

              {/* Step 1 */}
              <div className="flex items-start gap-3.5 relative z-10 group cursor-default">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-purple-400 text-[#7027C9] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs font-heading animate-step-badge-pulse group-hover:scale-110 transition-transform">
                  1
                </div>
                <p className="text-xs sm:text-sm text-[#24152F] font-medium pt-1 leading-snug group-hover:text-[#7027C9] transition-colors">
                  Invite your friends &amp; get rewarded
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5 relative z-10 group cursor-default">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-purple-300 text-[#7027C9] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs font-heading group-hover:scale-110 transition-transform">
                  2
                </div>
                <p className="text-xs sm:text-sm text-[#24152F] font-medium pt-1 leading-snug group-hover:text-[#7027C9] transition-colors">
                  They get ₹100 on their first order
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3.5 relative z-10 group cursor-default">
                <div className="w-7 h-7 rounded-full bg-white border-2 border-purple-300 text-[#7027C9] font-black text-xs flex items-center justify-center shrink-0 shadow-2xs font-heading group-hover:scale-110 transition-transform">
                  3
                </div>
                <p className="text-xs sm:text-sm text-[#24152F] font-medium pt-1 leading-snug group-hover:text-[#7027C9] transition-colors">
                  You get ₹100 once their completed the first order
                </p>
              </div>
            </div>

            {/* Terms & Conditions / FAQs Sub-links as Interactive Pills */}
            <div className="flex items-center justify-center gap-3 pt-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#7027C9] text-[#7027C9] hover:text-white border border-purple-200/80 shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 group"
              >
                <span>Terms &amp; Conditions</span>
                <span className="text-purple-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform text-[11px]">→</span>
              </button>
              <button
                type="button"
                onClick={() => setShowFaqModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#7027C9] text-[#7027C9] hover:text-white border border-purple-200/80 shadow-2xs hover:shadow-xs hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5 group"
              >
                <span>FAQs</span>
                <span className="text-purple-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform text-[11px]">→</span>
              </button>
            </div>
          </section>

          {/* SECTION 3: More Referrals, More Rewards! */}
          <section className="p-5 sm:p-6 bg-white space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both">
            <h4 className="text-base font-bold text-[#24152F] font-heading">
              More Referrals, More Rewards!
            </h4>
            <p className="text-xs sm:text-[13px] text-[#625D6E] leading-relaxed">
              There’s no limit to how much you can earn! Invite as many friends as you like and keep earning every time they shop.
            </p>
          </section>

          {/* SECTION 4: Why Join the Haatza Referral Program? */}
          <section className="p-5 sm:p-6 bg-white space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200 fill-mode-both">
            <h4 className="text-base font-bold text-[#24152F] font-heading">
              Why Join the Haatza Referral Program?
            </h4>

            {/* List with subtle connecting line */}
            <div className="space-y-4 relative">
              <div 
                className="absolute left-4 top-3 bottom-3 w-0.5 bg-purple-100" 
                aria-hidden="true" 
              />

              {/* Benefit 1 */}
              <div className="flex items-center gap-3.5 relative z-10 group">
                <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#24152F] group-hover:text-cyan-700 transition-colors">
                  Zero investment, real rewards
                </span>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-center gap-3.5 relative z-10 group">
                <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 text-[#7027C9] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#24152F] group-hover:text-[#7027C9] transition-colors">
                  Help friends discover amazing deals
                </span>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-center gap-3.5 relative z-10 group">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#24152F] group-hover:text-amber-800 transition-colors">
                  Earn like an influencer – without being one
                </span>
              </div>

              {/* Benefit 4 */}
              <div className="flex items-center gap-3.5 relative z-10 group">
                <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 text-[#7027C9] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-[13px] font-medium text-[#24152F] group-hover:text-[#7027C9] transition-colors">
                  100% transparent – track every referral in real time
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 5: FAQs (Accordion Matching Reference Screenshots 2 & 3) */}
          <section className="p-5 sm:p-6 bg-white space-y-3 pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-250 fill-mode-both">
            <h4 id="drawer-faqs-heading" className="text-base sm:text-lg font-bold text-[#24152F] font-heading mb-3">
              FAQs
            </h4>

            <div className="divide-y divide-zinc-100">
              {FAQS.map((faq) => {
                const isOpenFaq = !!openFaqIds[faq.id];
                return (
                  <div key={faq.id} className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-[#24152F] hover:text-[#7027C9] transition-colors cursor-pointer group"
                      aria-expanded={isOpenFaq}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 group-hover:text-[#7027C9] shrink-0 transition-transform duration-200 ${
                          isOpenFaq ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpenFaq && (
                      <p className="mt-2 text-xs text-[#625D6E] leading-relaxed animate-in fade-in slide-in-from-top-1 duration-150">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Terms & Conditions Slide View inside the same side popup */}
        <HaatzaNestReferralTermsModal
          isOpen={showTermsModal}
          onBack={() => setShowTermsModal(false)}
          onClose={onClose}
        />

        {/* FAQs Slide View inside the same side popup */}
        <HaatzaNestReferralFaqModal
          isOpen={showFaqModal}
          onBack={() => setShowFaqModal(false)}
          onClose={onClose}
        />
      </aside>

      {/* Fallback Dialog for devices where Web Share API is unavailable */}
      {showFallbackModal && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowFallbackModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-5 max-w-[340px] w-full shadow-2xl border border-purple-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-sm sm:text-base text-[#24152F] font-heading">
                Share Referral
              </h5>
              <button 
                type="button"
                onClick={() => setShowFallbackModal(false)}
                aria-label="Close"
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#625D6E] leading-relaxed">
              Select your preferred app to share your referral message:
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowFallbackModal(false);
                  handleShareWhatsApp();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-900 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span>Share via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowFallbackModal(false);
                  handleShareEmail();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100/80 text-purple-900 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#7027C9] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Share via Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HaatzaNestReferralDrawer;
