import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionLink,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-zinc-200 shadow-2xs ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#FFEBEE] flex items-center justify-center text-[#E53935] mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#202124] mb-2">{title}</h3>
      <p className="text-sm text-[#5F6368] max-w-md mb-6">{description}</p>
      
      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="px-6 py-2.5 rounded-xl bg-[#E53935] text-white font-semibold hover:bg-[#D32F2F] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="px-6 py-2.5 rounded-xl bg-[#E53935] text-white font-semibold hover:bg-[#D32F2F] transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
