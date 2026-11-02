import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, X } from 'lucide-react';

export interface HaatzaNestReferralTermsModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
}

interface TermsSection {
  id: number;
  title: string;
  content: React.ReactNode;
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    id: 1,
    title: 'Introduction',
    content: (
      <p className="text-zinc-700 leading-relaxed">
        These Terms and Conditions (&quot;Terms&quot;) govern the Buyer-to-Buyer Referral Program (&quot;Program&quot;) offered by Haatza India Private Limited (&quot;Haatza&quot;). By participating in this Program, both the referring buyer (&quot;Referrer&quot;) and the referred buyer (&quot;Referee&quot;) agree to abide by these Terms.
      </p>
    ),
  },
  {
    id: 2,
    title: 'Eligibility',
    content: (
      <ul className="space-y-1.5 text-zinc-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>The Program is open only to registered Haatza buyers with active accounts.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>The Referee must be a new buyer who has never made a purchase on Haatza before.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Each Referrer must have a valid Haatza Buyer ID and referral code.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    title: 'How the Referral Works',
    content: (
      <div className="space-y-2">
        <ul className="space-y-1.5 text-zinc-700 list-none">
          <li className="flex items-start gap-2">
            <span className="text-[#7027C9] font-bold">•</span>
            <span>The Referrer shares their unique referral code with a new buyer (Referee).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7027C9] font-bold">•</span>
            <span>The Referee must use the referral code at the time of signup or checkout.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#7027C9] font-bold">•</span>
            <span>The referral is counted as valid only when:</span>
          </li>
        </ul>
        <div className="pl-5 space-y-1 text-zinc-700 border-l-2 border-purple-200 ml-2">
          <div className="flex items-start gap-2">
            <span className="text-purple-400">–</span>
            <span>The Referee places a first order worth ₹999 or more, and</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-400">–</span>
            <span>The order is successfully delivered (not cancelled or refunded).</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Reward Conditions',
    content: (
      <div className="space-y-2 text-zinc-700">
        <div className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Once the Referee’s order of ₹999 or above is confirmed:</span>
        </div>
        <div className="pl-5 space-y-1 border-l-2 border-purple-200 ml-2">
          <div className="flex items-start gap-2">
            <span className="text-purple-400">–</span>
            <span>The Referee will receive the referral reward or cashback as per the ongoing offer.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-purple-400">–</span>
            <span>The Referrer will receive their referral reward 7–15 days after the Referee’s order is successfully delivered.</span>
          </div>
        </div>
        <div className="flex items-start gap-2 pt-1">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Both parties must maintain active Haatza accounts to receive rewards.</span>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Reward Disbursement',
    content: (
      <ul className="space-y-1.5 text-zinc-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Referral rewards will be credited to the Haatza wallet of the respective users.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Rewards cannot be exchanged for cash unless stated otherwise by Haatza.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Haatza reserves the right to verify all transactions before releasing any referral reward.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 6,
    title: 'Restrictions',
    content: (
      <ul className="space-y-1.5 text-zinc-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Self-referrals or multiple accounts created by the same person are not allowed.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Referrals from fake or fraudulent accounts will be cancelled.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Haatza reserves the right to withhold or revoke referral rewards in case of misuse or policy violation.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 7,
    title: 'Program Changes',
    content: (
      <ul className="space-y-1.5 text-zinc-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Haatza may modify, suspend, or discontinue the Program at any time without prior notice.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Changes will be effective immediately upon update on the Haatza app or website.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 8,
    title: 'General Terms',
    content: (
      <ul className="space-y-1.5 text-zinc-700 list-none">
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Participation in this Program constitutes full acceptance of these Terms.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>Haatza’s decision regarding eligibility, rewards, or disputes shall be final and binding.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#7027C9] font-bold">•</span>
          <span>All disputes are subject to the jurisdiction of Chennai, India.</span>
        </li>
      </ul>
    ),
  },
  {
    id: 9,
    title: 'Support',
    content: (
      <div className="space-y-3">
        <p className="text-zinc-700">
          For any queries or clarifications, please contact:
        </p>
        <div className="space-y-2 pt-1">
          <a
            href="mailto:support@haatza.com"
            className="flex items-center gap-2.5 text-zinc-800 hover:text-[#7027C9] transition-colors cursor-pointer w-fit group"
          >
            <span className="text-base">📧</span>
            <span>
              Email: <span className="text-[#7027C9] font-semibold underline">support@haatza.com</span>
            </span>
          </a>
          <a
            href="tel:9148079015"
            className="flex items-center gap-2.5 text-zinc-800 hover:text-[#7027C9] transition-colors cursor-pointer w-fit group"
          >
            <span className="text-base">📞</span>
            <span>
              Phone: <span className="text-[#7027C9] font-semibold underline">914 807 9015</span>
            </span>
          </a>
        </div>
      </div>
    ),
  },
];

export const HaatzaNestReferralTermsModal: React.FC<HaatzaNestReferralTermsModalProps> = ({
  isOpen,
  onBack,
  onClose,
}) => {
  // First item open by default
  const [openSectionIds, setOpenSectionIds] = useState<Record<number, boolean>>({ 1: true });

  const toggleSection = (id: number) => {
    setOpenSectionIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllOpen = TERMS_SECTIONS.every((s) => !!openSectionIds[s.id]);

  const toggleAll = () => {
    if (areAllOpen) {
      setOpenSectionIds({});
    } else {
      const all: Record<number, boolean> = {};
      TERMS_SECTIONS.forEach((s) => (all[s.id] = true));
      setOpenSectionIds(all);
    }
  };

  // Handle ESC key to go back to Referral view
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onBack();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onBack]);

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Haatza Referral – Terms & Conditions"
      className="absolute inset-0 z-30 bg-white flex flex-col animate-in slide-in-from-right duration-250 select-none"
    >
      {/* Header Bar in Purple matching Refer & Earn theme */}
      <header className="bg-gradient-to-r from-[#7027C9] to-[#8E38F5] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Refer & Earn popup"
            className="p-1 rounded-full hover:bg-white/20 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h2
            id="referral-terms-title"
            className="text-base sm:text-lg font-bold text-white tracking-tight truncate font-heading"
          >
            Haatza Referral – Terms &amp; Conditions
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close popup"
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 ml-2"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Top Helper Bar: Total sections & Expand/Collapse All */}
      <div className="px-4 py-2.5 bg-purple-50/60 border-b border-purple-100/80 flex items-center justify-between text-xs font-semibold shrink-0">
        <span className="text-[#625D6E]">
          {TERMS_SECTIONS.length} Terms Sections
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-[#7027C9] hover:underline cursor-pointer transition-colors"
        >
          {areAllOpen ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Scrollable Terms & Conditions Accordion with Staggered Entrance Animations */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-2.5 text-zinc-800 text-xs sm:text-sm leading-relaxed overscroll-contain select-text">
        {TERMS_SECTIONS.map((section, index) => {
          const isOpenSection = !!openSectionIds[section.id];
          return (
            <div
              key={section.id}
              style={{ animationDelay: `${index * 30}ms` }}
              className={`rounded-xl border transition-all duration-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
                isOpenSection
                  ? 'bg-purple-50/30 border-purple-200 shadow-2xs'
                  : 'bg-white border-zinc-200/80 hover:border-purple-200 hover:bg-purple-50/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-[#24152F] hover:text-[#7027C9] transition-colors cursor-pointer group"
                aria-expanded={isOpenSection}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors font-heading ${
                      isOpenSection
                        ? 'bg-[#7027C9] text-white shadow-2xs'
                        : 'bg-purple-100 text-[#7027C9] group-hover:bg-purple-200'
                    }`}
                  >
                    {String(section.id).padStart(2, '0')}
                  </span>
                  <span className="font-heading leading-snug pt-0.5">
                    {section.title}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpenSection
                      ? 'rotate-180 bg-purple-100 text-[#7027C9]'
                      : 'text-zinc-400 group-hover:text-zinc-600'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Smooth Grid-Height Expand / Collapse Transition */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpenSection ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 text-xs sm:text-[13px] text-[#625D6E] leading-relaxed border-t border-purple-100/60 ml-8.5">
                    {section.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Copyright */}
        <div className="pt-6 pb-3 text-center">
          <p className="text-xs text-zinc-400">
            &copy; 2025 Haatza India Pvt. Ltd. &ndash; All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default HaatzaNestReferralTermsModal;
