import React from 'react';
import { SearchBar as BaseSearchBar } from '../forms/SearchBar';

export interface SearchBarProps {
  isScrolled?: boolean;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  isScrolled = true,
  className = '',
  onOpenChange,
}) => {
  return (
    <BaseSearchBar
      isScrolled={isScrolled}
      className={className}
      onOpenChange={onOpenChange}
    />
  );
};

export default SearchBar;

