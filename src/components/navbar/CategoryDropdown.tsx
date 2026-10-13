import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_NAVIGATION_CATEGORIES } from '../../data/navigation.mock';

export interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-soft-lg border border-[#E5EAF3] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <p className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#64748B] font-heading">
        Shop By Department
      </p>
      {MAIN_NAVIGATION_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.slug}`}
          onClick={onClose}
          className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-[#172033] hover:bg-[#F5F7FF] hover:text-[#2962FF] transition-colors"
        >
          <span>{cat.name}</span>
          {cat.badge && (
            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#DBEAFE] text-[#2962FF]">
              {cat.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoryDropdown;
