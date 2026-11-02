import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/HaatzaShoppingGlobal.css';
import { initializeTheme } from './theme/theme';
import { applyTypography } from './theme/typography';
import App from './App';

// Initialize centralized theme and typography tokens into DOM :root
initializeTheme();
applyTypography();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
