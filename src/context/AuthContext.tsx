import React, { createContext, useContext, useState, useEffect } from 'react';
import { Address, User } from '../types';
import { mockDefaultAddresses } from '../services/mock/data/mockOrders';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
  login: (email: string, name?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
  addAddress: (newAddr: Omit<Address, 'id'>) => Address;
  updateAddress: (updated: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const USER_STORAGE_KEY = 'haatza_demo_user';
const ADDRESSES_STORAGE_KEY = 'haatza_demo_addresses';

const defaultDemoUser: User = {
  id: 'usr-101',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.in',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return defaultDemoUser; // Pre-authenticated for rich instant demo experience
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return mockDefaultAddresses;
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
  }, [addresses]);

  const login = async (email: string, name?: string): Promise<boolean> => {
    const demoUser: User = {
      id: `usr-${Date.now()}`,
      name: name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Shopper'),
      email,
      phone: '+91 98765 43210',
      avatar: defaultDemoUser.avatar,
    };
    setUser(demoUser);
    showToast(`Welcome back, ${demoUser.name}!`, 'success');
    return true;
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      avatar: defaultDemoUser.avatar,
    };
    setUser(newUser);
    showToast(`Account created! Welcome to HAATZA, ${name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out safely.', 'info');
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!user) return;
    const next = { ...user, ...updated };
    setUser(next);
    showToast('Profile updated successfully!', 'success');
  };

  const addAddress = (newAddr: Omit<Address, 'id'>): Address => {
    const created: Address = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };

    setAddresses((prev) => {
      let list = [...prev];
      if (created.isDefault) {
        list = list.map((a) => ({ ...a, isDefault: false }));
      }
      return [created, ...list];
    });

    showToast('Delivery address saved!', 'success');
    return created;
  };

  const updateAddress = (updated: Address) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updated.id) return updated;
        if (updated.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
    showToast('Address updated successfully', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address removed', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    showToast('Default delivery address changed', 'success');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        addresses,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
