import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HaatzaNestLayout } from './HaatzaNestLayout';
import { HaatzaNestHomePage } from '../pages/HaatzaNestHome/HaatzaNestHomePage';
import { HaatzaNestServicesPage } from '../pages/services/HaatzaNestServicesPage';
import { HaatzaNestBookingsPage } from '../pages/bookings/HaatzaNestBookingsPage';
import { HaatzaNestProfilePage } from '../pages/profile/HaatzaNestProfilePage';

export const HaatzaNestRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<HaatzaNestLayout />}>
        <Route path="/" element={<HaatzaNestHomePage />} />
        <Route path="/nest" element={<HaatzaNestHomePage />} />
        <Route path="/services" element={<HaatzaNestServicesPage />} />
        <Route path="/nest/services" element={<HaatzaNestServicesPage />} />
        <Route path="/bookings" element={<HaatzaNestBookingsPage />} />
        <Route path="/nest/bookings" element={<HaatzaNestBookingsPage />} />
        <Route path="/profile" element={<HaatzaNestProfilePage />} />
        <Route path="/nest/profile" element={<HaatzaNestProfilePage />} />
        <Route path="/account" element={<HaatzaNestProfilePage />} />
        <Route path="/nest/account" element={<HaatzaNestProfilePage />} />
        <Route path="*" element={<Navigate to="/nest" replace />} />
      </Route>
    </Routes>
  );
};

export default HaatzaNestRouter;
