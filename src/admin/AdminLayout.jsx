import React from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../auth/AuthContext";

const AdminLayout = ({ children }) => {
  const { role } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              role === "ADMIN"
                ? "bg-red-100 text-red-800"
                : role === "USER"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {role} Access
          </span>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
