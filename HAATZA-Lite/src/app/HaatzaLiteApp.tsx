import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Providers from Shopping
import { ToastProvider } from '@shopping/app/providers/ToastProvider';
import { DestinationProvider } from '@shopping/app/providers/DestinationProvider';
import { LocationProvider } from '@shopping/app/providers/LocationProvider';
import { AuthProvider } from '@shopping/app/providers/AuthProvider';
import { CartProvider } from '@shopping/app/providers/CartProvider';
import { WishlistProvider } from '@shopping/app/providers/WishlistProvider';
import { RecentlyViewedProvider } from '@shopping/app/providers/RecentlyViewedProvider';
import { ActivityProvider } from '@shopping/app/providers/ActivityProvider';

// Providers from Lite & Nest
import { HaatzaLiteLocationProvider } from '../context/HaatzaLiteLocationContext';
import { HaatzaLiteCartProvider } from '../context/HaatzaLiteCartContext';
import { HaatzaNestLocationProvider } from '@nest/context/HaatzaNestLocationContext';
import { HaatzaNestBookingProvider } from '@nest/context/HaatzaNestBookingContext';

import { HaatzaLiteTopNav } from '../components/HaatzaLiteNavigation/HaatzaLiteTopNav';
import { HaatzaLiteRouter } from './HaatzaLiteRouter';
import { AppInstallModal } from '../components/common/AppInstallModal';

export const HaatzaLiteApp: React.FC = () => {
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
                      <HaatzaLiteLocationProvider>
                        <HaatzaLiteCartProvider>
                          <HaatzaNestLocationProvider>
                            <HaatzaNestBookingProvider>
                              <div className="min-h-screen flex flex-col font-sans">
                                <HaatzaLiteTopNav />
                                <div className="flex-1">
                                  <HaatzaLiteRouter />
                                </div>
                                <AppInstallModal />
                              </div>
                            </HaatzaNestBookingProvider>
                          </HaatzaNestLocationProvider>
                        </HaatzaLiteCartProvider>
                      </HaatzaLiteLocationProvider>
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
};

export default HaatzaLiteApp;
