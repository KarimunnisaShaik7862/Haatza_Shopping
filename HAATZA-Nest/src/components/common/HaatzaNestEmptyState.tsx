import React from 'react';
import { Sparkles } from 'lucide-react';
import { HaatzaNestButton } from './HaatzaNestButton';
import { Link } from 'react-router-dom';

interface HaatzaNestEmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionLink?: string;
}

export const HaatzaNestEmptyState: React.FC<HaatzaNestEmptyStateProps> = ({
  title = 'No home services found',
  description = 'We could not find any service matching your query or selected category.',
  actionText = 'View All Services',
  actionLink = '/nest/services',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-zinc-100 max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#6C3FC5] flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-zinc-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-zinc-500 mb-6">{description}</p>
      {actionLink && actionText && (
        <Link to={actionLink}>
          <HaatzaNestButton variant="primary" size="md">
            {actionText}
          </HaatzaNestButton>
        </Link>
      )}
    </div>
  );
};
