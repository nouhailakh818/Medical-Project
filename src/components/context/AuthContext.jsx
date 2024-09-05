import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAuthenticated(true);
      setUserRole(decodedToken.roles[0]);
      setToken(token);
    }
  }, []);

  const login = (newToken, newUserRole) => {
    setToken(newToken);
    setUserRole(newUserRole);
    setIsAuthenticated(true);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
