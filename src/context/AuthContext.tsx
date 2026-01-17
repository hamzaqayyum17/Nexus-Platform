import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpRequired: boolean;
  tempUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (userId: string, updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otpRequired, setOtpRequired] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  // ✅ LOAD USER FROM LOCAL STORAGE ON MOUNT
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('nexus_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    const role: UserRole = email.includes('investor')
      ? 'investor'
      : 'entrepreneur';

    setTempUser({
      id: 'demo-' + Date.now(),
      name: 'Demo User',
      email,
      role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.random() * 70 | 0}`,
      bio: '',
      isOnline: true,
      createdAt: new Date().toISOString(),
    });

    setOtpRequired(true);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const newUser: User = {
      id: 'demo-' + Date.now(),
      name,
      email,
      role,
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.random() * 70 | 0}`,
      bio: '',
      isOnline: true,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
  };

  const forgotPassword = async (email: string) => {
    if (!email) {
      throw new Error('Email is required');
    }
    // Mock: In production, call API to send reset email
    console.log('Password reset email sent to:', email);
  };

  const resetPassword = async (token: string, newPassword: string) => {
    if (!token || !newPassword) {
      throw new Error('Token and password are required');
    }
    // Mock: In production, validate token and update password via API
    console.log('Password reset completed for token:', token);
  };

  const updateProfile = async (userId: string, updates: Partial<User>) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    // Update local state
    setUser(prev => prev ? { ...prev, ...updates } : null);
    // Also update localStorage
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      const currentUser = JSON.parse(storedUser);
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('nexus_user', JSON.stringify(updatedUser));
    }
  };

  const verifyOtp = async (otp: string) => {
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }

    if (!tempUser) {
      throw new Error('Session expired');
    }

    setUser(tempUser);
    localStorage.setItem('nexus_user', JSON.stringify(tempUser)); // ✅ SAVE USER
    setTempUser(null);
    setOtpRequired(false);
  };

  const logout = () => {
    setUser(null);
    setOtpRequired(false);
    setTempUser(null);
    localStorage.removeItem('nexus_user'); // ✅ CLEAR STORAGE
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        otpRequired,
        tempUser,
        login,
        verifyOtp,
        register,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
