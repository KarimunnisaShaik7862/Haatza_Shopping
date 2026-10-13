import React from 'react';
import { cn } from '../../utils/formatters';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  size = 'default',
}) => {
  const sizeMap = {
    default: 'max-w-[1440px]',
    narrow: 'max-w-4xl',
    wide: 'max-w-[1600px]',
    full: 'max-w-full',
  };

  return (
    <div className={cn(sizeMap[size], 'mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
};

export default PageContainer;
