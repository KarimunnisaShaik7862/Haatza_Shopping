import React from 'react';
import ReactDOM from 'react-dom/client';
import { HaatzaLiteApp } from './app/HaatzaLiteApp';
import './styles/HaatzaLiteGlobal.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HaatzaLiteApp />
  </React.StrictMode>
);
