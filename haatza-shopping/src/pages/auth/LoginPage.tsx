import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('rahul.sharma@example.in');
  const [password, setPassword] = useState('demo123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await login(email);
    setLoading(false);
    navigate('/account');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 pb-24 sm:pb-16">
      <div className="max-w-md mx-auto bg-white rounded-3xl border border-[#E5EAF3] p-8 shadow-soft space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF3FF] text-[#2962FF] font-black text-2xl flex items-center justify-center mx-auto mb-3 shadow-soft-sm">
            H
          </div>
          <h1 className="text-2xl font-black text-[#172033] tracking-tight">
            Sign In to HAATZA
          </h1>
          <p className="text-xs text-[#64748B]">
            Access your orders, saved wishlist, and addresses
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">
              Email or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="name@example.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF3] bg-white text-xs text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#2962FF] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5EAF3] bg-white text-xs text-[#172033] focus:outline-hidden focus:border-[#2962FF] focus-ring-blue transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#2962FF] hover:bg-[#1E4ED8] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-[#64748B] space-y-3">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#2962FF] hover:underline">
              Create an Account
            </Link>
          </p>

          <div className="p-3 bg-[#F5F7FF] rounded-xl border border-[#E5EAF3] text-[11px] text-[#64748B] leading-tight">
            🛡️ Frontend Demo Environment: You can sign in directly using the pre-filled demo account.
          </div>
        </div>
      </div>
    </div>
  );
};
