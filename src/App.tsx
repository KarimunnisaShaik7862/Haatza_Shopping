import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { DestinationProvider } from './context/DestinationContext';
import { LocationProvider } from './context/LocationContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';
import { ActivityProvider } from './context/ActivityContext';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <DestinationProvider>
          <LocationProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <RecentlyViewedProvider>
                    <ActivityProvider>
                      <AppRoutes />
                    </ActivityProvider>
                  </RecentlyViewedProvider>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </LocationProvider>
        </DestinationProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
