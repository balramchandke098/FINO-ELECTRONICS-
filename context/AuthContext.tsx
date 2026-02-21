
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<User | null>;
  adminLogin: (email: string, pass: string) => Promise<User | null>;
  signUp: (name: string, email: string, pass: string) => Promise<User | string>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('finoUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === pass);
        if (user) {
          const userToStore = { id: user.id, email: user.email, role: user.role, name: user.name };
          setCurrentUser(userToStore);
          localStorage.setItem('finoUser', JSON.stringify(userToStore));
          resolve(userToStore);
        } else {
          resolve(null);
        }
      }, 500);
    });
  };

  const adminLogin = async (email: string, pass: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const masterAdmin = users.find(u => u.role === 'admin');
        
        if (masterAdmin && masterAdmin.password === pass) {
          // Password is correct, grant admin access with the provided email.
          const adminSessionUser: User = {
            id: masterAdmin.id,
            email: email, // Use the email from the login form
            name: `Admin (${email.split('@')[0]})`, // Create a dynamic name
            role: 'admin',
          };
          setCurrentUser(adminSessionUser);
          localStorage.setItem('finoUser', JSON.stringify(adminSessionUser));
          resolve(adminSessionUser);
        } else {
          // Incorrect admin password
          resolve(null);
        }
      }, 500);
    });
  };

  const signUp = async (name: string, email: string, pass: string): Promise<User | string> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const existingUser = users.find(u => u.email === email);
              if (existingUser) {
                  resolve("An account with this email already exists.");
                  return;
              }

              const newUser: User = {
                  id: users.length + 1,
                  name,
                  email,
                  password: pass,
                  role: 'user',
              };

              setUsers(prevUsers => [...prevUsers, newUser]);
              
              const userToStore = { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name };
              setCurrentUser(userToStore);
              localStorage.setItem('finoUser', JSON.stringify(userToStore));
              resolve(newUser);
          }, 500);
      });
  };


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('finoUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, adminLogin, signUp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
