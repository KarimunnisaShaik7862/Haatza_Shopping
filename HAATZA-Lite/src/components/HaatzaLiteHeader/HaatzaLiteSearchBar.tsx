import React from 'react';
import { SearchBar as CommonSearchBar } from '@shopping/components/forms/SearchBar';

export const HaatzaLiteSearchBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <CommonSearchBar className={className} />;
};

export default HaatzaLiteSearchBar;
