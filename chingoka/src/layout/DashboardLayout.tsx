import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";



const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar
          toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed} toggleEsidebar={function (): void {
            throw new Error("Function not implemented.");
          } } isEsidebarCollapsed={false}        />
        <main className="p-5 pt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
