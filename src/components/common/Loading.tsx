import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';

export interface LoadingProps {
  type?: 'card' | 'grid' | 'text' | 'banner';
  count?: number;
}

export const Loading: React.FC<LoadingProps> = (props) => {
  return <LoadingSkeleton {...props} />;
};

export { LoadingSkeleton };
export default Loading;
