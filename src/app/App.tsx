import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './providers/ToastProvider';
import { DestinationProvider } from './providers/DestinationProvider';
import { LocationProvider } from './providers/LocationProvider';
import { AuthProvider } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { WishlistProvider } from './providers/WishlistProvider';
import { RecentlyViewedProvider } from './providers/RecentlyViewedProvider';
import { ActivityProvider } from './providers/ActivityProvider';
import { AppRouter } from './router';

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
                      <AppRouter />
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
