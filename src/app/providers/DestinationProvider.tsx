import React from 'react';
import { DestinationProvider as BaseDestinationProvider } from '../../context/DestinationContext';

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseDestinationProvider>{children}</BaseDestinationProvider>;
};

export default DestinationProvider;
