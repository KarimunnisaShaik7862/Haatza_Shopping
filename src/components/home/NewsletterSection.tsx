import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Use code WELCOME200 for ₹200 off your first order.', 'success');
  };

  return (
    <div className="w-full">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4A0000] via-[#750000] to-[#A60000] text-white p-8 sm:p-12 shadow-xl border border-[#D99A9A]/30">
        {/* Background ambient glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D99A9A]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F5DCDC]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5DCDC]/20 text-[#F5DCDC] flex items-center justify-center mx-auto shadow-inner">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-xs">
            Unlock Instant ₹200 Off Your First Order
          </h2>

          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-lg mx-auto">
            Subscribe to our weekly curated newsletter for flash sale access, secret voucher codes, and newly dropped collections.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-2 text-white font-bold text-sm p-4 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>You're in! Check your inbox for your ₹200 welcome voucher code.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white text-zinc-900 placeholder:text-zinc-400 text-xs sm:text-sm border border-white/20 focus:outline-hidden focus:ring-2 focus:ring-white shadow-xs"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
              >
                Claim Voucher
              </button>
            </form>
          )}

          <p className="text-[11px] text-zinc-300">
            We value your privacy. No spam ever, unsubscribe in one click anytime.
          </p>
        </div>
      </div>
    </div>
  );
};
