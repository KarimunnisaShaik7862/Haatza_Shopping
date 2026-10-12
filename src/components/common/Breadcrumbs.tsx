import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center text-xs text-[#5F6368] overflow-x-auto no-scrollbar py-2 ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-[#E53935] transition-colors shrink-0"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 mx-1.5 text-zinc-400 shrink-0" />
            {isLast || !item.link ? (
              <span className="font-semibold text-[#202124] shrink-0 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.link}
                className="hover:text-[#E53935] transition-colors shrink-0 truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
