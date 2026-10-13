import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="py-6 border-b border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h4 className="text-base font-black text-white font-heading">
          Get Exclusive Deals & Festival Offers
        </h4>
        <p className="text-xs text-blue-100/80 mt-0.5 font-body">
          Subscribe to the HAATZA newsletter for weekly price drops and cashback alerts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-md w-full">
        {subscribed ? (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-200 bg-white/10 px-4 py-2.5 rounded-xl border border-white/20 w-full font-heading">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Thank you for subscribing to HAATZA!</span>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-blue-200/60 text-xs px-3.5 py-2.5 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-white/40 font-body"
            />
            <button
              type="submit"
              className="bg-white hover:bg-blue-50 text-[#2962FF] font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 font-heading"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Newsletter;
