import React from 'react';
import { DestinationSwitcher } from '../layout/DestinationSwitcher';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <DestinationSwitcher />
    </div>
  );
};

export default Logo;
