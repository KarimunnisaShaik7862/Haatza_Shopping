import React from 'react';
import { 
  ShieldCheck, RefreshCw, Truck, Headphones, 
  Mail, Phone, MapPin, Heart 
} from 'lucide-react';
import { FooterLinks } from './FooterLinks';
import { FooterCategories } from './FooterCategories';
import { Newsletter } from './Newsletter';
import { PaymentMethods } from './PaymentMethods';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1E40AF] via-[#1D4ED8] to-[#1E3A8A] text-blue-100 py-8 sm:py-10 border-t border-blue-400/30">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Value Propositions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-white/15">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 border border-white/20 backdrop-blur-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">100% Authentic</h4>
              <p className="text-xs text-blue-100/80 mt-0.5 font-body">Sourced directly from certified Indian brands</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 border border-white/20 backdrop-blur-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">Express Delivery</h4>
              <p className="text-xs text-blue-100/80 mt-0.5 font-body">15-min groceries & 2-day marketplace shipping</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 border border-white/20 backdrop-blur-xs">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">Hassle-Free Returns</h4>
              <p className="text-xs text-blue-100/80 mt-0.5 font-body">7-day doorstep pick-up & instant refunds</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 border border-white/20 backdrop-blur-xs">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-heading">Dedicated Support</h4>
              <p className="text-xs text-blue-100/80 mt-0.5 font-body">24/7 customer care via chat & phone</p>
            </div>
          </div>
        </div>

        {/* Newsletter Strip */}
        <Newsletter />

        {/* Category Pills Strip */}
        <FooterCategories />

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 py-6 sm:py-8 border-b border-white/15 text-xs">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#2962FF] font-black text-lg shadow-sm font-heading">
                H
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-heading">HAATZA</span>
            </div>
            <p className="text-blue-100/90 leading-relaxed max-w-sm text-xs font-body">
              HAATZA is India’s modern unified e-commerce ecosystem. Shop fashion & electronics on <strong className="text-white">HAATZA</strong>, tranquil home goods on <strong className="text-white">LITE</strong>, and on-demand home services on <strong className="text-white">NEST</strong>.
            </p>
            <div className="space-y-2 pt-1 text-xs text-blue-100/90 font-body">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-200 shrink-0" />
                <span>BKC One, Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-200 shrink-0" />
                <span>1800-419-8282 (Toll Free 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-200 shrink-0" />
                <span>care@haatza.in</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <FooterLinks />
        </div>

        {/* Bottom Bar & Payment Methods */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-200/90">
          <p className="font-body">© {new Date().getFullYear()} HAATZA Technologies India Pvt. Ltd. Crafted with <Heart className="w-3.5 h-3.5 inline text-rose-300 fill-current" /> for Indian shoppers.</p>
          <PaymentMethods />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
