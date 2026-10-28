import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  highlightWord?: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  badge?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightWord,
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  badge,
  className = '',
}) => {
  // If highlightWord is specified, colorize that word with primary blue (#2166F3)
  const renderTitle = () => {
    if (!highlightWord) {
      return <span className="text-[#111827]">{title}</span>;
    }

    const regex = new RegExp(`(${highlightWord})`, 'i');
    const parts = title.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={index} className="text-[#2166F3]">
              {part}
            </span>
          ) : (
            <span key={index} className="text-[#111827]">
              {part}
            </span>
          )
        )}
      </>
    );
  };

  return (
    <div className={`w-full flex flex-col mb-4 sm:mb-6 ${className}`}>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          {badge && (
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#2166F3] border border-blue-200 mb-2">
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-extrabold text-[#111827] tracking-tight leading-[1.15] font-heading">
            {renderTitle()}
          </h2>
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2166F3] hover:text-[#1A56DB] transition-colors shrink-0 group pb-1 font-heading cursor-pointer"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>

      {subtitle && (
        <p className="text-sm sm:text-base lg:text-[17px] text-[#7B879B] font-normal leading-relaxed mt-1.5 max-w-3xl font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
