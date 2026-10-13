import React from 'react';
import ReactDOM from 'react-dom/client';
import { HaatzaNestApp } from './app/HaatzaNestApp';
import './styles/HaatzaNestGlobal.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HaatzaNestApp />
  </React.StrictMode>
);
