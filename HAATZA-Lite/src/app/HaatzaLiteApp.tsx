import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HaatzaLiteLocationProvider } from '../context/HaatzaLiteLocationContext';
import { HaatzaLiteCartProvider } from '../context/HaatzaLiteCartContext';
import { HaatzaLiteRouter } from './HaatzaLiteRouter';

export const HaatzaLiteApp: React.FC = () => {
  return (
    <BrowserRouter>
      <HaatzaLiteLocationProvider>
        <HaatzaLiteCartProvider>
          <HaatzaLiteRouter />
        </HaatzaLiteCartProvider>
      </HaatzaLiteLocationProvider>
    </BrowserRouter>
  );
};

export default HaatzaLiteApp;
