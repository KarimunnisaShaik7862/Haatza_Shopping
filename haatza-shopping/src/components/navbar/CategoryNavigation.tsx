import React from 'react';
import { CategoryNavigation as BaseCategoryNavigation } from '../navigation/CategoryNavigation';

export interface CategoryNavigationProps {
  isScrolled?: boolean;
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ isScrolled = false }) => {
  return <BaseCategoryNavigation isScrolled={isScrolled} />;
};

export default CategoryNavigation;

