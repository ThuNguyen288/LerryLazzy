// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('/api/verify-token', { token })
        .then(response => {
          setIsAuthenticated(true);
          setUser(response.data.user);
        })
        .catch(error => {
          console.error('Token verification failed:', error);
          logout(); 
        });
    }
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const register = async (userData) => {
    try {
      setIsAuthenticated(true);
      const response = await axios.post('/api/register', userData);
      const { token, user } = response.data;
      login(token, user);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
