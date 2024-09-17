import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext with default values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// AuthProvider component that wraps the app and provides auth-related functionality
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const login = (userData, token) => {
    localStorage.setItem("token", token); // Save token in localStorage
    setUser(userData); // Set user data
    setIsAuthenticated(true); // Set authentication status
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user data
    setIsAuthenticated(false); // Set authentication status to false
  };

  // Check if the user is already authenticated when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user data using token (dummy example function)
      const userData = fetchUserDataFromToken(token); 
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const contextValue = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Dummy function to fetch user data using token
const fetchUserDataFromToken = (token) => {
  return { firstname: "John", lastname: "Doe", email: "john.doe@example.com" }; // Example data
};

export default AuthContext;
