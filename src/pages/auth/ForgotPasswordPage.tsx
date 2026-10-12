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
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[#202124] tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-[#5F6368]">
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
              className="inline-block px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold mt-2"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-[#E53935]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md"
            >
              Send Password Reset Instructions
            </button>
          </form>
        )}

        <div className="pt-2 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-zinc-900"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
