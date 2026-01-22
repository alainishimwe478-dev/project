import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Admin credentials
const ADMIN_CREDENTIALS = {
  id: "1199980076099093",
  password: "admin123",
};

// Role permissions
const ROLE_PERMISSIONS = {
  ADMIN: ["dashboard", "users", "analytics", "settings"],
  USER: ["dashboard"],
  GUEST: [],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setRole(userData.role);
    }
  }, []);

  const login = (id, password) => {
    if (
      id === ADMIN_CREDENTIALS.id &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const userData = { id, role: "ADMIN" };
      setUser(userData);
      setRole("ADMIN");
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
  };

  const hasPermission = (permission) => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role]?.includes(permission) || false;
  };

  const isAdmin = role === "ADMIN";
  const isUser = role === "USER";
  const isGuest = role === "GUEST";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        login,
        logout,
        hasPermission,
        isAdmin,
        isUser,
        isGuest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
