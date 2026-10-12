import React from 'react';
import { Navigate } from 'react-router-dom';

export const NextHomePage: React.FC = () => {
  return <Navigate to="/nest" replace />;
};
