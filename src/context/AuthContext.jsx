import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = {
    name: "Admin User",
    email: "admin@rssb.rw",
    role: "admin", // admin | hospital | user
    avatar: "https://i.pravatar.cc/150?img=3"
  };

  const menus = {
    admin: [
      { to: "/admin-dashboard", icon: "📊", label: "Dashboard" },
      { to: "/admin/users", icon: "👥", label: "Users" },
      { to: "/admin/payments", icon: "💳", label: "Payments" },
      { to: "/admin/claims", icon: "📄", label: "Claims" },
      { to: "/admin/fraud", icon: "🛡️", label: "Fraud AI" },
      { to: "/admin/hospitals", icon: "🏥", label: "Hospitals" },
      { to: "/admin/reports", icon: "📈", label: "Reports" }
    ],
    hospital: [
      { to: "/hospital/claims", icon: "📄", label: "Claims" },
      { to: "/hospital/payments", icon: "💳", label: "Payments" },
      { to: "/hospital/patients", icon: "👤", label: "Patients" }
    ],
    user: [
      { to: "/user/pay", icon: "💰", label: "Make Payment" },
      { to: "/user/history", icon: "📋", label: "History" },
      { to: "/user/profile", icon: "👤", label: "Profile" }
    ]
  };

  return (
    <AuthContext.Provider value={{ user, menus: menus[user.role] }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);