import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_NAVIGATION_CATEGORIES } from '../../data/navigation.mock';

export const FooterCategories: React.FC = () => {
  return (
    <div className="py-4 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-white font-bold text-[11px] uppercase tracking-wider mr-2 font-heading">
        Popular Categories:
      </span>
      {MAIN_NAVIGATION_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.slug}`}
          className="text-blue-100/80 hover:text-white transition-colors px-2 py-0.5 rounded-md hover:bg-white/10 font-body"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterCategories;
