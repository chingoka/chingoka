import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Esidebar from "../components/Esidebar";
import Navbar from "../components/Navbar";




const EmployeeLayout: React.FC = () => {
  const [isEsidebarCollapsed, setIsEsidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen">
      <Esidebar isCollapsed={isEsidebarCollapsed} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isEsidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Navbar
                  toggleEsidebar={() => setIsEsidebarCollapsed(!isEsidebarCollapsed)}
                  isEsidebarCollapsed={isEsidebarCollapsed} toggleSidebar={function (): void {
                      throw new Error("Function not implemented.");
                  } } isSidebarCollapsed={false}        />
        <main className="p-5 pt-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default EmployeeLayout;
