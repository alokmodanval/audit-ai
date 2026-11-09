import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext();

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ----------------------------
  // Load user from localStorage
  // ----------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ----------------------------
  // Login
  // ----------------------------
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // ----------------------------
  // Logout
  // ----------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};