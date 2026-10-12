import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, RefreshCw, Truck, Headphones, 
  Mail, Phone, MapPin, Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#202124] text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#A60000] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Authentic</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Sourced directly from certified Indian brands</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#A60000] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-zinc-400 mt-0.5">15-min groceries & 2-day marketplace shipping</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#A60000] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hassle-Free Returns</h4>
              <p className="text-xs text-zinc-400 mt-0.5">7-day doorstep pick-up & instant refunds</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#A60000] shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
              <p className="text-xs text-zinc-400 mt-0.5">24/7 customer care via chat & phone</p>
            </div>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-zinc-800 text-xs">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#A60000] flex items-center justify-center text-white font-black text-lg shadow-sm">
                H
              </div>
              <span className="text-2xl font-black text-white tracking-tight">HAATZA</span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              HAATZA is India’s modern unified e-commerce ecosystem. Shop fashion & electronics on <strong>HAATZA</strong>, tranquil home goods on <strong>LITE</strong>, and on-demand home services on <strong>NEST</strong>.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#A60000]" />
                <span>BKC One, Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Phone className="w-4 h-4 text-[#A60000]" />
                <span>1800-419-8282 (Toll Free 24/7)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4 text-[#A60000]" />
                <span>care@haatza.in</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Destinations</h5>
            <ul className="space-y-2">
              <li><Link to="/haatza" className="hover:text-white transition-colors">HAATZA Marketplace</Link></li>
              <li><Link to="/lite" className="hover:text-white transition-colors">LITE Quick Commerce ⚡</Link></li>
              <li><Link to="/nest" className="hover:text-white transition-colors">NEST Home Services</Link></li>
              <li><Link to="/products?filter=trending" className="hover:text-white transition-colors">Trending Products</Link></li>
              <li><Link to="/products?filter=deals" className="hover:text-white transition-colors">Daily Deals & Offers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Customer Service</h5>
            <ul className="space-y-2">
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Return Request</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About HAATZA</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Policies & Legal</h5>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund & Cancellation</Link></li>
              <li><Link to="/account/addresses" className="hover:text-white transition-colors">Saved Addresses</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Payment Methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} HAATZA Technologies India Pvt. Ltd. Crafted with <Heart className="w-3.5 h-3.5 inline text-[#A60000] fill-current" /> for Indian shoppers.</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">UPI Accepted</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">RuPay</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">Visa</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">Mastercard</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">Net Banking</span>
            <span className="px-2 py-1 rounded bg-zinc-800 text-[10px] font-semibold text-zinc-300">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
