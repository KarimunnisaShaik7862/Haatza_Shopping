import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DestinationType } from '../types';

export interface DestinationTheme {
  primary: string;
  primaryHover: string;
  accent: string;
  lightBg: string;
  text: string;
  tagline: string;
  name: string;
}

interface DestinationContextType {
  destination: DestinationType;
  setDestination: (dest: DestinationType) => void;
  theme: DestinationTheme;
  brandColor: string;
  brandTagline: string;
}

const THEMES: Record<DestinationType, DestinationTheme> = {
  haatza: {
    primary: '#2962FF',
    primaryHover: '#1E4ED8',
    accent: '#DBEAFE',
    lightBg: '#EEF3FF',
    text: '#172033',
    tagline: 'General E-Commerce Marketplace',
    name: 'HAATZA',
  },
  lite: {
    primary: '#238636',
    primaryHover: '#1c6d2c',
    accent: '#2ea043',
    lightBg: '#EAF6EC',
    text: '#202124',
    tagline: 'Quick Commerce & Daily Essentials in 10-15 Mins',
    name: 'LITE',
  },
  nest: {
    primary: '#6C3FC5',
    primaryHover: '#572fa8',
    accent: '#FFD54F',
    lightBg: '#F2ECFC',
    text: '#202124',
    tagline: 'On-Demand Home Services Made Simple',
    name: 'NEST',
  },
};

const DestinationContext = createContext<DestinationContextType | undefined>(undefined);

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destination, setDestinationState] = useState<DestinationType>('haatza');

  // Sync state with path
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith('/lite') || path.startsWith('/light')) {
      setDestinationState('lite');
    } else if (path.startsWith('/nest') || path.startsWith('/next') || path.startsWith('/services') || path.startsWith('/bookings')) {
      setDestinationState('nest');
    } else {
      setDestinationState('haatza');
    }
  }, [location.pathname]);

  const setDestination = (dest: DestinationType) => {
    setDestinationState(dest);
    const targetPath = dest === 'haatza' ? '/' : `/${dest}`;
    if (dest === 'haatza') {
      if (location.pathname.startsWith('/lite') || location.pathname.startsWith('/nest') || location.pathname.startsWith('/haatza')) {
        navigate('/');
      }
    } else if (!location.pathname.toLowerCase().startsWith(targetPath)) {
      navigate(targetPath);
    }
  };

  const theme = THEMES[destination] || THEMES.haatza;

  return (
    <DestinationContext.Provider
      value={{
        destination,
        setDestination,
        theme,
        brandColor: theme.primary,
        brandTagline: theme.tagline,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context) {
    throw new Error('useDestination must be used within a DestinationProvider');
  }
  return context;
};
