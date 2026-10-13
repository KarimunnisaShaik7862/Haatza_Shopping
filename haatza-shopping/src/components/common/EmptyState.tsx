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
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-3xl border border-[#E5EAF3] shadow-soft ${className}`}>
      <div className="w-16 h-16 rounded-full bg-[#EEF3FF] border border-[#DBEAFE] flex items-center justify-center text-[#2962FF] mb-4 shadow-soft-sm">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#172033] mb-2">{title}</h3>
      <p className="text-sm text-[#64748B] max-w-md mb-6">{description}</p>
      
      {actionText && (
        actionLink ? (
          <Link
            to={actionLink}
            className="px-6 py-2.5 rounded-xl bg-[#2962FF] text-white font-semibold hover:bg-[#1E4ED8] transition-all shadow-soft hover:shadow-soft-lg inline-flex items-center gap-2"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="px-6 py-2.5 rounded-xl bg-[#2962FF] text-white font-semibold hover:bg-[#1E4ED8] transition-all shadow-soft hover:shadow-soft-lg inline-flex items-center gap-2"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
