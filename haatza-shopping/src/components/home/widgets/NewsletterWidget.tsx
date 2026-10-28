import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewsletterWidgetProps {
  className?: string;
}

export const NewsletterWidget: React.FC<NewsletterWidgetProps> = ({
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitted(true);
  };

  return (
    <section
      aria-label="Newsletter Subscription"
      className={`w-full rounded-3xl p-6 sm:p-10 bg-white border border-[#E5EAF3] shadow-xs ${className}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] text-[#2962FF] flex items-center justify-center mx-auto mb-4 border border-[#DBEAFE]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight font-heading">
          Unlock ₹200 Off Your First Order
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Subscribe to the HAATZA Insider newsletter for exclusive seasonal drop alerts, flash sales, and tailored styling edits.
        </p>

        {isSubmitted ? (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              You’re in! Use coupon code <strong className="font-mono text-emerald-950 font-bold">HAATZA200</strong> at checkout for ₹200 off your first cart.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#2962FF] focus:bg-white focus:outline-hidden text-sm text-[#172033] placeholder-slate-400 transition-colors"
                aria-label="Email Address"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#2962FF] hover:bg-[#1E40AF] text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-95 cursor-pointer shrink-0 inline-flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {error && (
              <p className="text-xs text-rose-500 mt-2 text-left font-medium">
                {error}
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-2.5">
              Zero spam. Unsubscribe with 1 click at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
