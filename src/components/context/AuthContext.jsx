import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (newToken) => {
    try {
      const decodedToken = JSON.parse(atob(newToken.split('.')[1]));
      setToken(newToken);
      setUserRole(decodedToken.roles[0]);
      setUserId(decodedToken.id);
      setIsAuthenticated(true);
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Error decoding token during login:', error);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded Token:', decodedToken);
        console.log('User ID:', decodedToken.id);
        if (decodedToken.exp < Date.now() / 1000) {
          throw new Error('Token has expired');
        }
        setIsAuthenticated(true);
        setUserRole(decodedToken.roles[0]);
        setUserId(decodedToken.id);
        setToken(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    }
  }, []);
  
 
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
