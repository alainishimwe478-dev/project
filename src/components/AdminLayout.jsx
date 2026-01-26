import React from 'react';
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        } lg:ml-64 lg:${collapsed ? "ml-20" : "ml-64"} p-6 lg:p-8`}
      >
        {children}
      </main>
    </div>
  );
}