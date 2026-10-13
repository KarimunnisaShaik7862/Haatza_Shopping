import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { optimizeImageUrl } from '../../utils/imageOptimizer';

export const CampaignBannerSection: React.FC = React.memo(() => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F2042] via-[#1E40AF] to-[#2962FF] text-white shadow-xl border border-white/10">
      {/* Ambient background glow & image */}
      <div className="absolute inset-0 z-0">
        <img
          src={optimizeImageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=75", { width: 1000, quality: 75 })}
          alt="Festive Heritage Celebration Edit"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay scale-105"
          loading="lazy"
          decoding="async"
          width="1000"
          height="360"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#1E3A8A]/60 to-transparent sm:w-2/3" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Festive Heritage Edit</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-xs">
              Flat 55% Off
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight font-heading">
            Handcrafted Silk & Linen Celebration
          </h2>

          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-lg font-body">
            Immerse yourself in authentic Banarasi weaves, pure Chanderi silk anarkalis, and handcrafted Belgian linen essentials.
          </p>

          <div className="flex items-center gap-4 pt-1">
            <Link
              to="/category/fashion"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm transition-all duration-200 shadow-xl hover:scale-105 active:scale-95 group font-heading"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-[#2962FF] group-hover:translate-x-1 transition-transform" />
            </Link>

            <span className="text-xs font-bold text-white/80 hidden sm:inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              100% Certified Authentic Weaves
            </span>
          </div>
        </div>

        {/* Right side floating promotional pill badge */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center space-y-2 shrink-0">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#2962FF] flex items-center justify-center shadow-lg font-black text-xl">
            %
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Special Coupon
          </span>
          <span className="font-mono text-sm font-black bg-black/40 px-3 py-1 rounded-lg border border-white/20">
            FESTIVE55
          </span>
          <p className="text-[10px] text-zinc-300">
            Extra ₹300 off on orders above ₹2,499
          </p>
        </div>
      </div>
    </section>
  );
});

CampaignBannerSection.displayName = 'CampaignBannerSection';

