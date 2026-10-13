import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 pb-24 sm:pb-16">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E5EAF3] p-8 shadow-soft space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[#172033] tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-[#64748B]">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-sm text-emerald-900">Reset Link Dispatched</h3>
            <p className="text-xs text-emerald-700">
              We have sent a demonstration reset token to <strong>{email}</strong>.
            </p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-[#2962FF] hover:bg-[#1E4ED8] text-white rounded-xl text-xs font-bold mt-2 shadow-soft-sm transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF3] bg-white text-xs text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-soft hover:shadow-soft-lg"
            >
              Send Password Reset Instructions
            </button>
          </form>
        )}

        <div className="pt-2 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#2962FF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
