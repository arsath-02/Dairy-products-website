import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      // You might want to decode the token and set user data from it
      // For example, if using jwt-decode library:
      // const decodedToken = jwt_decode(token);
      // setUser(decodedToken.user);
    }
  }, [token]);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  const getCurrentUser = () => {
    return user;
  };

  const getCurrentToken = () => {
    return token;
  };

  const contextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    getCurrentToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
