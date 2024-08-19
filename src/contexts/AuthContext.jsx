import React, { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;