import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HomeSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  children: React.ReactNode;
  className?: string;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  children,
  className = '',
}) => {
  return (
    <section className={`py-6 sm:py-10 ${className}`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-5 sm:mb-7 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-[#5F6368] mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {ctaText && ctaLink && (
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#A60000] hover:text-[#880000] group shrink-0 transition-colors"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Section Content */}
        {children}
      </div>
    </section>
  );
};
