import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    category: 'Orders & Deliveries',
    items: [
      {
        q: 'What is the difference between HAATZA, LIGHT, and NEXT?',
        a: 'HAATZA is our premier marketplace for fashion, smartphones, noise-cancelling audio, beauty, and accessories. LIGHT is curated for serene home living, Egyptian cotton bedsheets, and tri-ply cookware. NEXT is our quick-commerce dark-store network delivering fresh fruits, dairy, and groceries in 10-15 minutes.',
      },
      {
        q: 'How do I track my order?',
        a: 'Click on "Track Orders" in the header or visit your My Orders dashboard. Each package features live milestone tracking with real-time status updates and carrier AWB docket numbers.',
      },
      {
        q: 'What are the delivery charges?',
        a: 'Standard marketplace delivery on HAATZA and LIGHT is 100% FREE on all orders of ₹499 or more. For orders below ₹499, a nominal delivery charge of ₹49 applies. For NEXT quick-commerce, free delivery starts at ₹199.',
      },
    ],
  },
  {
    category: 'Payments & Refunds',
    items: [
      {
        q: 'Which payment methods are supported?',
        a: 'We support all major Indian payment channels including UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, Mastercard, Net Banking across 50+ Indian banks, and Cash on Delivery (COD).',
      },
      {
        q: 'How fast are refunds processed?',
        a: 'Once a returned item is picked up by our courier executive, instant refunds are processed via UPI or original card method within 2 to 4 business hours.',
      },
    ],
  },
  {
    category: 'Returns & Replacements',
    items: [
      {
        q: 'What is HAATZA’s return window?',
        a: 'We offer an easy 7-day doorstep return and replacement window across all lifestyle, apparel, and electronics categories. For fresh grocery items on NEXT, we provide immediate instant replacements or credits if you are unsatisfied with produce quality.',
      },
      {
        q: 'How do I request a size replacement for clothing?',
        a: 'Navigate to "Returns & Replacements" in your account, pick the item, select "Size Replacement", choose your desired replacement size, and submit.',
      },
    ],
  },
];

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<string>('0-0');

  const toggle = (id: string) => {
    setOpenIdx(openIdx === id ? '' : id);
  };

  const breadcrumbs = [{ label: 'Help', link: '/help' }, { label: 'FAQ' }];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-[#5F6368] mt-1">
          Quick answers to common questions about orders, payments, destinations, and returns
        </p>
      </div>

      <div className="space-y-8">
        {FAQS.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-3">
            <h3 className="font-bold text-sm text-[#E53935] uppercase tracking-wider">
              {group.category}
            </h3>

            <div className="space-y-2">
              {group.items.map((item, itemIdx) => {
                const id = `${groupIdx}-${itemIdx}`;
                const isOpen = openIdx === id;
                return (
                  <div
                    key={itemIdx}
                    className="border border-zinc-200 rounded-2xl bg-white overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-900 hover:text-[#E53935] transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#E53935]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100 pt-3 bg-zinc-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
