import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/formatters';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  viewAllLink,
  viewAllText = 'View All',
  className,
  children,
}) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5', className)}>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight font-heading">
            {title}
          </h2>
          {badge && (
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#DBEAFE] text-[#2962FF] px-2 py-0.5 rounded-full font-heading">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-body">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="group inline-flex items-center gap-1 text-xs font-bold text-[#2962FF] hover:text-[#1E4ED8] hover:underline font-heading transition-colors"
          >
            <span>{viewAllText}</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};
