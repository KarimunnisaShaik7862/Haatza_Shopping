import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HaatzaNestLocationProvider } from '../context/HaatzaNestLocationContext';
import { HaatzaNestBookingProvider } from '../context/HaatzaNestBookingContext';
import { HaatzaNestRouter } from './HaatzaNestRouter';

export const HaatzaNestApp: React.FC = () => {
  return (
    <BrowserRouter>
      <HaatzaNestLocationProvider>
        <HaatzaNestBookingProvider>
          <HaatzaNestRouter />
        </HaatzaNestBookingProvider>
      </HaatzaNestLocationProvider>
    </BrowserRouter>
  );
};

export default HaatzaNestApp;
