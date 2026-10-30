import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronDown, X } from 'lucide-react';

export interface HaatzaNestReferralFaqModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose: () => void;
}

interface ReferralFaq {
  id: number;
  question: string;
  answer: string | React.ReactNode;
}

const REFERRAL_FAQS: ReferralFaq[] = [
  {
    id: 1,
    question: 'What is the Haatza Referral Program?',
    answer:
      'The Haatza Referral Program allows existing Haatza users (Referrers) to invite their friends or family (Referees) to join the Haatza platform. Both users can earn rewards when the Referee makes their first successful purchase.',
  },
  {
    id: 2,
    question: 'Who can participate in the referral program?',
    answer:
      'All registered Haatza buyers with an active account are eligible to participate as Referrers. New users who have never placed an order on Haatza can join using a referral code.',
  },
  {
    id: 3,
    question: 'How do I refer someone?',
    answer:
      'You can find your unique referral code in the “Refer & Earn” section of the Haatza app or website. Simply share the code with your friends or family — they must use this code during signup or checkout.',
  },
  {
    id: 4,
    question: 'What are the conditions to get the referral reward?',
    answer:
      'The Referee must place an order worth ₹999 or more using the Referrer’s code. Once the order is successfully delivered, the referral is considered valid.',
  },
  {
    id: 5,
    question: 'Who receives the referral reward?',
    answer:
      'The Referee (new buyer) receives a reward or cashback once their first order of ₹999 or more is confirmed. The Referrer (existing buyer) will receive the referral reward 7–15 days after the Referee’s order is successfully delivered.',
  },
  {
    id: 6,
    question: 'Where will I receive my referral reward?',
    answer:
      'Referral rewards will be credited directly to your Haatza wallet. You can use this balance for future purchases on Haatza.',
  },
  {
    id: 7,
    question: 'Can I withdraw my referral reward as cash?',
    answer:
      'Once the Referrer successfully refers 50 buyers, they will become eligible to withdraw their referral amount directly to their registered bank account. Until then, referral rewards can only be used for purchases within the Haatza platform unless otherwise stated in an official offer.',
  },
  {
    id: 8,
    question: 'What happens if my friend cancels or returns their order?',
    answer:
      'If the Referee’s order is cancelled, returned, or refunded, the referral reward will not be issued to either party.',
  },
  {
    id: 9,
    question: 'How long does it take to receive my referral reward?',
    answer:
      'The Referrer’s reward will be credited within 7–15 business days after the Referee’s order is delivered successfully.',
  },
  {
    id: 10,
    question: 'Can I refer myself using a different account?',
    answer:
      'No. Self-referrals or fake account referrals are strictly prohibited and will result in disqualification from the referral program.',
  },
  {
    id: 11,
    question: 'What if I didn’t receive my referral reward?',
    answer:
      'If your reward hasn’t been credited even after 15 days of successful delivery, please contact Haatza Buyer Support with your referral details.',
  },
  {
    id: 12,
    question: 'Can Haatza change or stop the referral program?',
    answer:
      'Yes. Haatza reserves the right to modify, suspend, or discontinue the referral program or its rewards at any time without prior notice.',
  },
  {
    id: 13,
    question: 'How can I contact support for referral-related issues?',
    answer: (
      <span>
        For any questions or issues, please contact:{' '}
        <a
          href="mailto:support@haatza.com"
          className="text-[#7027C9] underline font-semibold hover:text-[#5a1ea8] transition-colors"
        >
          support@haatza.com
        </a>{' '}
        or Haatza Buyer Support.
      </span>
    ),
  },
];

export const HaatzaNestReferralFaqModal: React.FC<HaatzaNestReferralFaqModalProps> = ({
  isOpen,
  onBack,
  onClose,
}) => {
  // First item open by default for clear affordance
  const [openFaqIds, setOpenFaqIds] = useState<Record<number, boolean>>({ 1: true });

  const toggleFaq = (id: number) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllOpen = REFERRAL_FAQS.every((f) => !!openFaqIds[f.id]);

  const toggleAll = () => {
    if (areAllOpen) {
      setOpenFaqIds({});
    } else {
      const all: Record<number, boolean> = {};
      REFERRAL_FAQS.forEach((f) => (all[f.id] = true));
      setOpenFaqIds(all);
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
      aria-label="Haatza Referral Program - FAQs"
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
            id="referral-faqs-title"
            className="text-base sm:text-lg font-bold text-white tracking-tight truncate font-heading"
          >
            Haatza Referral Program – FAQs
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

      {/* Top Helper Bar: Total count & Expand/Collapse All */}
      <div className="px-4 py-2.5 bg-purple-50/60 border-b border-purple-100/80 flex items-center justify-between text-xs font-semibold shrink-0">
        <span className="text-[#625D6E]">
          {REFERRAL_FAQS.length} Frequently Asked Questions
        </span>
        <button
          type="button"
          onClick={toggleAll}
          className="text-[#7027C9] hover:underline cursor-pointer transition-colors"
        >
          {areAllOpen ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* Scrollable FAQs Accordion with Staggered Entrance Animations */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-2.5 text-zinc-800 text-xs sm:text-sm leading-relaxed overscroll-contain select-text">
        {REFERRAL_FAQS.map((faq, index) => {
          const isOpenFaq = !!openFaqIds[faq.id];
          return (
            <div
              key={faq.id}
              style={{ animationDelay: `${index * 30}ms` }}
              className={`rounded-xl border transition-all duration-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2 fill-mode-both ${
                isOpenFaq
                  ? 'bg-purple-50/30 border-purple-200 shadow-2xs'
                  : 'bg-white border-zinc-200/80 hover:border-purple-200 hover:bg-purple-50/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left font-bold text-xs sm:text-sm text-[#24152F] hover:text-[#7027C9] transition-colors cursor-pointer group"
                aria-expanded={isOpenFaq}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 transition-colors font-heading ${
                      isOpenFaq
                        ? 'bg-[#7027C9] text-white shadow-2xs'
                        : 'bg-purple-100 text-[#7027C9] group-hover:bg-purple-200'
                    }`}
                  >
                    {String(faq.id).padStart(2, '0')}
                  </span>
                  <span className="font-heading leading-snug pt-0.5">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpenFaq
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
                  isOpenFaq ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 text-xs sm:text-[13px] text-[#625D6E] leading-relaxed border-t border-purple-100/60 ml-8.5">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Copyright */}
        <div className="pt-6 pb-3 text-center">
          <p className="text-xs text-zinc-400">
            &copy; 2025 Haatza &ndash; All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default HaatzaNestReferralFaqModal;
