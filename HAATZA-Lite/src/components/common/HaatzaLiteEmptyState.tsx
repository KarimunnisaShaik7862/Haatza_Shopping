import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { HaatzaLiteButton } from './HaatzaLiteButton';
import { Link } from 'react-router-dom';

interface HaatzaLiteEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
}

export const HaatzaLiteEmptyState: React.FC<HaatzaLiteEmptyStateProps> = ({
  title = 'No items found',
  description = 'We could not find any grocery items matching your criteria.',
  actionText = 'Browse Categories',
  actionLink = '/lite/categories',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 sm:p-14 text-center bg-white rounded-3xl border border-[#E5EBE6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-lg mx-auto my-10">
      <div className="w-16 h-16 rounded-3xl bg-[#EAF8ED] text-[#0C831F] flex items-center justify-center mb-5 border border-[#CBEAD2] shadow-xs">
        <ShoppingBag className="w-8 h-8 stroke-[2.2]" />
      </div>
      <h3 className="text-xl font-black text-[#111D15] mb-1.5 font-heading">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-sm">{description}</p>
      {actionLink && actionText && (
        <Link to={actionLink}>
          <HaatzaLiteButton variant="primary" size="md">
            {actionText}
          </HaatzaLiteButton>
        </Link>
      )}
    </div>
  );
};
