import React from 'react';
import { Navigate } from 'react-router-dom';

export const LightHomePage: React.FC = () => {
  return <Navigate to="/lite" replace />;
};
