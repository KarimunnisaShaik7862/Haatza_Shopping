import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { defaultTypography } from '../../theme/typography';

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
  subtitle,
  viewAllLink,
  viewAllText = 'View All',
  badge,
  className = '',
}) => {
  return (
    <div className={`w-full flex flex-col mb-4 sm:mb-6 ${className}`}>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          <h2 className={`${defaultTypography.styles.sectionHeading.className}`}>
            {title}
          </h2>
        </div>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2962FF] hover:text-[#1747CC] transition-colors shrink-0 group pb-1 font-heading cursor-pointer"
          >
            <span>{viewAllText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
