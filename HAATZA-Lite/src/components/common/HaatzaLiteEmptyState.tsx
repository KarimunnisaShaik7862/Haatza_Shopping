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
  actionLink = '/categories',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-zinc-100 max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#238636] flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-zinc-500 mb-6">{description}</p>
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
