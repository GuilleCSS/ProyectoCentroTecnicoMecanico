import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/auth/validate-token', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          logout();
        }
      }
    };
    checkAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('auth_token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
