import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { to: "/admin", icon: "📊", label: "Dashboard" },
    { to: "/admin/users", icon: "👥", label: "Users" },
    { to: "/admin/payments", icon: "💳", label: "Payments" },
    { to: "/admin/invoices", icon: "🧾", label: "Invoices" },
    { to: "/admin/reports", icon: "📈", label: "Reports" },
    { to: "/admin/notifications", icon: "🔔", label: "Notifications" },
    { to: "/admin/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors mt-4"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
