import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HaatzaLiteLayout } from './HaatzaLiteLayout';
import { HaatzaLiteHomePage } from '../pages/HaatzaLiteHome/HaatzaLiteHomePage';
import { HaatzaLiteCategoriesPage } from '../pages/categories/HaatzaLiteCategoriesPage';
import { HaatzaLiteSearchPage } from '../pages/search/HaatzaLiteSearchPage';

export const HaatzaLiteRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<HaatzaLiteLayout />}>
        <Route path="/" element={<HaatzaLiteHomePage />} />
        <Route path="/lite" element={<Navigate to="/" replace />} />
        <Route path="/categories" element={<HaatzaLiteCategoriesPage />} />
        <Route path="/categories/:slug" element={<HaatzaLiteCategoriesPage />} />
        <Route path="/search" element={<HaatzaLiteSearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default HaatzaLiteRouter;
