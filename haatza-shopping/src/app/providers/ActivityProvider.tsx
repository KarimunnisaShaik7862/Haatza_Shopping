import React from 'react';
import { ActivityProvider as BaseActivityProvider } from '../../context/ActivityContext';

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseActivityProvider>{children}</BaseActivityProvider>;
};

export default ActivityProvider;
