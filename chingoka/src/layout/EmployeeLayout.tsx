import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import the unified sidebar
import Navbar from "../components/Navbar";

const EmployeeLayout: React.FC = () => {
  // const [isSidebarCollapsed, setIsEsidebarCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Assuming role is stored in sessionStorage
  const userRole = sessionStorage.getItem("role") || "employee"; // Default to 'employee'

  // const toggleEsidebar = () => {
  //   setIsEsidebarCollapsed((prev) => !prev);
  // };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar with role-based access */}
      <Sidebar isCollapsed={isSidebarCollapsed} userRole={userRole} />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed} toggleEsidebar={function (): void {
            throw new Error("Function not implemented.");
          } } isEsidebarCollapsed={false}          // toggleSidebar={toggleSidebar}
          // isSidebarCollapsed={isSidebarCollapsed}
        />
        <main className="p-5 pt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
