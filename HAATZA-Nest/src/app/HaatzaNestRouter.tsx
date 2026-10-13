import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HaatzaNestLayout } from './HaatzaNestLayout';
import { HaatzaNestHomePage } from '../pages/HaatzaNestHome/HaatzaNestHomePage';
import { HaatzaNestServicesPage } from '../pages/services/HaatzaNestServicesPage';
import { HaatzaNestBookingsPage } from '../pages/bookings/HaatzaNestBookingsPage';

export const HaatzaNestRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<HaatzaNestLayout />}>
        <Route path="/" element={<HaatzaNestHomePage />} />
        <Route path="/nest" element={<Navigate to="/" replace />} />
        <Route path="/services" element={<HaatzaNestServicesPage />} />
        <Route path="/bookings" element={<HaatzaNestBookingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default HaatzaNestRouter;
