import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HaatzaNestLocationProvider } from '../context/HaatzaNestLocationContext';
import { HaatzaNestBookingProvider } from '../context/HaatzaNestBookingContext';
import { HaatzaNestRouter } from './HaatzaNestRouter';
import { AppInstallModal } from '../components/common/AppInstallModal';

export const HaatzaNestApp: React.FC = () => {
  return (
    <BrowserRouter>
      <HaatzaNestLocationProvider>
        <HaatzaNestBookingProvider>
          <HaatzaNestRouter />
          <AppInstallModal />
        </HaatzaNestBookingProvider>
      </HaatzaNestLocationProvider>
    </BrowserRouter>
  );
};

export default HaatzaNestApp;
