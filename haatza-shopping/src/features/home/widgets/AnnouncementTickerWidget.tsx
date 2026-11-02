import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AnnouncementItem } from '../../../types/homepageWidgets.types';
import { mockAnnouncements } from '../../../services/mock/data/homepageWidgets.data';

interface AnnouncementTickerWidgetProps {
  announcements?: AnnouncementItem[];
  className?: string;
}

export const AnnouncementTickerWidget: React.FC<AnnouncementTickerWidgetProps> = ({
  announcements = mockAnnouncements,
  className = '',
}) => {
  if (!announcements || announcements.length === 0) return null;

  return (
    <section
      aria-label="Promotional Announcements"
      className={`relative w-full overflow-hidden bg-[#0F172A] text-white border-y border-slate-800 py-2.5 select-none ${className}`}
    >
      <div className="flex w-full items-center">
        {/* Left Badge */}
        <div className="relative z-10 shrink-0 hidden sm:flex items-center gap-1.5 pl-4 pr-3 py-0.5 bg-[#2962FF] text-white text-[11px] font-bold tracking-wider uppercase rounded-r-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Updates</span>
        </div>

        {/* Marquee Outer Container */}
        <div className="relative flex-1 overflow-hidden">
          {/* Edge Gradients for Smooth In/Out Fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-1 bg-gradient-to-r from-[#0F172A] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-1 bg-gradient-to-l from-[#0F172A] to-transparent" />

          {/* Marquee Track with CSS Animation */}
          <div className="haatza-marquee-track flex items-center gap-8 py-0.5">
            {/* Primary Track (Accessible) */}
            <div className="flex items-center gap-8 shrink-0">
              {announcements.map((item) => (
                <div key={item.id} className="flex items-center gap-3 shrink-0">
                  {item.tag && (
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-blue-300 border border-white/10">
                      {item.tag}
                    </span>
                  )}
                  {item.link ? (
                    <Link
                      to={item.link}
                      className="group flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors"
                    >
                      {item.highlight && (
                        <span className="font-bold text-[#60A5FA] group-hover:underline">
                          {item.highlight}:
                        </span>
                      )}
                      <span>{item.text}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ) : (
                    <span className="text-xs sm:text-sm font-medium text-slate-200">
                      {item.highlight && (
                        <span className="font-bold text-[#60A5FA] mr-1.5">
                          {item.highlight}:
                        </span>
                      )}
                      {item.text}
                    </span>
                  )}
                  <span className="text-slate-600 select-none">✦</span>
                </div>
              ))}
            </div>

            {/* Duplicate Track (Hidden from screen readers to prevent duplicate reading) */}
            <div aria-hidden="true" className="flex items-center gap-8 shrink-0">
              {announcements.map((item) => (
                <div key={`dup-${item.id}`} className="flex items-center gap-3 shrink-0">
                  {item.tag && (
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-blue-300 border border-white/10">
                      {item.tag}
                    </span>
                  )}
                  {item.link ? (
                    <Link
                      to={item.link}
                      tabIndex={-1}
                      className="group flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-colors"
                    >
                      {item.highlight && (
                        <span className="font-bold text-[#60A5FA] group-hover:underline">
                          {item.highlight}:
                        </span>
                      )}
                      <span>{item.text}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ) : (
                    <span className="text-xs sm:text-sm font-medium text-slate-200">
                      {item.highlight && (
                        <span className="font-bold text-[#60A5FA] mr-1.5">
                          {item.highlight}:
                        </span>
                      )}
                      {item.text}
                    </span>
                  )}
                  <span className="text-slate-600 select-none">✦</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
