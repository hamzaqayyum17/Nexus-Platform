import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  otpRequired: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [otpRequired, setOtpRequired] = useState(false);
  const [tempUser, setTempUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    const role: UserRole = email.includes('investor')
      ? 'investor'
      : 'entrepreneur';

    // OTP REQUIRED
    setTempUser({
      name: 'Demo User',
      email,
      role,
    });

    setOtpRequired(true);
  };

  const verifyOtp = async (otp: string) => {
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }

    setUser(tempUser);
    setTempUser(null);
    setOtpRequired(false);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setUser({ name, email, role });
  };

  const logout = () => {
    setUser(null);
    setOtpRequired(false);
    setTempUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        otpRequired,
        login,
        verifyOtp,
        register,
        logout,
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
