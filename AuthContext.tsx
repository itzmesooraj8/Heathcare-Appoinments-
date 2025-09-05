import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  avatar?: string;
  specialization?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  medicalHistory?: string[];
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient';
  specialization?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string, specialization?: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('healthcare_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: string, specialization?: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on role
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: role === 'admin' ? 'Admin User' : role === 'doctor' ? 'Dr. Sarah Johnson' : 'John Patient',
        email,
        role: role as 'admin' | 'doctor' | 'patient',
        avatar: `https://images.unsplash.com/photo-${role === 'doctor' ? '1559839734-2b71ea197ec2' : '1472099645785-5658abf4ff4e'}?w=150&h=150&fit=crop&crop=face`,
        specialization: role === 'doctor' ? specialization : undefined,
        phone: role === 'patient' ? '+1-555-0123' : '+1-555-0456',
        address: role === 'patient' ? '123 Main St, City, State 12345' : undefined,
        dateOfBirth: role === 'patient' ? '1990-01-15' : undefined,
        medicalHistory: role === 'patient' ? ['Hypertension', 'Type 2 Diabetes'] : undefined
      };
      
      setUser(userData);
      localStorage.setItem('healthcare_user', JSON.stringify(userData));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        avatar: `https://images.unsplash.com/photo-${userData.role === 'doctor' ? '1559839734-2b71ea197ec2' : '1472099645785-5658abf4ff4e'}?w=150&h=150&fit=crop&crop=face`,
        specialization: userData.specialization,
        phone: userData.phone,
        address: userData.address,
        dateOfBirth: userData.dateOfBirth,
        medicalHistory: userData.role === 'patient' ? [] : undefined
      };
      
      setUser(newUser);
      localStorage.setItem('healthcare_user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcare_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('healthcare_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};