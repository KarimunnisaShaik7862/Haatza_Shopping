import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await register(name, email, phone);
    setLoading(false);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-zinc-200 p-8 shadow-md space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black text-[#202124] tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-[#5F6368]">
            Join HAATZA for express delivery & exclusive festive savings
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Priya Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-[#E53935]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="name@example.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-[#E53935]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              10-Digit Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-[#E53935]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:outline-hidden focus:border-[#E53935]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Agree & Register'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-zinc-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-[#E53935] hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};
