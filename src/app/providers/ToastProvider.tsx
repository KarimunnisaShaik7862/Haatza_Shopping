import React from 'react';
import { ToastProvider as BaseToastProvider } from '../../context/ToastContext';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseToastProvider>{children}</BaseToastProvider>;
};

export default ToastProvider;
