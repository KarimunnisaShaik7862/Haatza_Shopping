import { User } from '../types';

/**
 * Auth API Module
 * Prepared for future backend authentication & JWT management
 */
export const authApi = {
  async getCurrentUser(): Promise<User | null> {
    return null;
  },

  async login(email: string, password?: string): Promise<User> {
    return {
      id: 'mock-user-1',
      name: email.split('@')[0],
      email,
      phone: '+91 98765 43210',
    };
  },

  async logout(): Promise<void> {
    // Clears server session
  },
};

export default authApi;
