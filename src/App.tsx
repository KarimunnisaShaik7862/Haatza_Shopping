import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@shopping/app/providers/ToastProvider';
import { DestinationProvider } from '@shopping/app/providers/DestinationProvider';
import { LocationProvider } from '@shopping/app/providers/LocationProvider';
import { AuthProvider } from '@shopping/app/providers/AuthProvider';
import { CartProvider } from '@shopping/app/providers/CartProvider';
import { WishlistProvider } from '@shopping/app/providers/WishlistProvider';
import { RecentlyViewedProvider } from '@shopping/app/providers/RecentlyViewedProvider';
import { ActivityProvider } from '@shopping/app/providers/ActivityProvider';
import { UnifiedMainNavigation } from './components/navigation/UnifiedMainNavigation';
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
                      <div className="min-h-screen flex flex-col font-sans">
                        {/* Main Unified HAATZA Navigation */}
                        <UnifiedMainNavigation />

                        {/* Experience Content Router */}
                        <div className="flex-1">
                          <AppRouter />
                        </div>
                      </div>
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
