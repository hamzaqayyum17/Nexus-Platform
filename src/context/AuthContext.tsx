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
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    const role: UserRole = email.includes('investor')
      ? 'investor'
      : 'entrepreneur';

    setUser({
      name: 'Demo User',
      email,
      role,
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    setUser({ name, email, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
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
