import React from 'react';
import { AuthProvider as BaseAuthProvider } from '../../context/AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseAuthProvider>{children}</BaseAuthProvider>;
};

export { BaseAuthProvider };
export default AuthProvider;
