import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastProvider } from '@shopping/app/providers/ToastProvider';
import { DestinationProvider } from '@shopping/app/providers/DestinationProvider';
import { LocationProvider } from '@shopping/app/providers/LocationProvider';
import { AuthProvider } from '@shopping/app/providers/AuthProvider';
import { CartProvider } from '@shopping/app/providers/CartProvider';
import { WishlistProvider } from '@shopping/app/providers/WishlistProvider';
import { RecentlyViewedProvider } from '@shopping/app/providers/RecentlyViewedProvider';
import { ActivityProvider } from '@shopping/app/providers/ActivityProvider';
import { UnifiedMainNavigation } from './components/navigation/UnifiedMainNavigation';
import { HaatzaAIAssistant } from './components/ai/HaatzaAIAssistant';
import { AppInstallModal } from './components/common/AppInstallModal';
import { AppRouter } from './router';

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  return null;
};

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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

                        {/* Global Haatza AI Assistant across all sections */}
                        <HaatzaAIAssistant />

                        {/* App Install Prompt Modal (Auto 3s popup) */}
                        <AppInstallModal />
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
