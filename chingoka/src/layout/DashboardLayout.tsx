import React, { useState, } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Retrieve user role (from sessionStorage, API, or context)
  const userRole = sessionStorage.getItem("role") || "employee"; // Default to 'employee'

  return (
    <div className="flex h-screen w-screen">
      {/* Pass userRole to Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} userRole={userRole} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Navbar with the toggle functionality for sidebar */}
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleEsidebar={() => {
            // If you want to implement the Esidebar toggle here, you can
            throw new Error("Function not implemented.");
          }}
          isEsidebarCollapsed={false}
        />
        <main className="p-5 pt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
