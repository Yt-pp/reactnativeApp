import { useNavigation } from '@react-navigation/core';
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Perform authentication logic
    setIsAuthenticated(true);
    
  };

  const logout = () => {
    // Perform logout logic
    setIsAuthenticated(false);

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
