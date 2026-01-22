import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>
      <nav className="space-y-4">
        <NavLink to="/admin" className="block hover:text-yellow-400">
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/users" className="block hover:text-yellow-400">
          👥 Users
        </NavLink>
      </nav>
    </aside>
  );
}
