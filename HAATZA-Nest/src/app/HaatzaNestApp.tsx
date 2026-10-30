import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HaatzaNestLocationProvider } from '../context/HaatzaNestLocationContext';
import { HaatzaNestDashboardProvider } from '../context/HaatzaNestDashboardContext';
import { HaatzaNestBookingProvider } from '../context/HaatzaNestBookingContext';
import { HaatzaNestRouter } from './HaatzaNestRouter';

export const HaatzaNestApp: React.FC = () => {
  return (
    <BrowserRouter>
      <HaatzaNestLocationProvider>
        <HaatzaNestDashboardProvider>
          <HaatzaNestBookingProvider>
            <HaatzaNestRouter />
          </HaatzaNestBookingProvider>
        </HaatzaNestDashboardProvider>
      </HaatzaNestLocationProvider>
    </BrowserRouter>
  );
};

export default HaatzaNestApp;
