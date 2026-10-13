import React from 'react';
import { LocationProvider as BaseLocationProvider } from '../../context/LocationContext';

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BaseLocationProvider>{children}</BaseLocationProvider>;
};

export default LocationProvider;
