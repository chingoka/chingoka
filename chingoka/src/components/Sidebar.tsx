import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag, FiBox, FiUser, FiUsers, FiInbox, FiBook,FiBookOpen } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
  userRole: string;  // Add userRole as a prop
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, userRole }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-white text-white shadow-lg transition-all ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <nav className="p-4">
        <ul className="space-y-4">
          {/* Common Sidebar Items */}
          

          {/* Employee Sidebar Items */}
          {userRole === "employee" && (
            <>
              <SidebarItem to="/employee" icon={<FiShoppingBag />} label="Dashboard" isCollapsed={isCollapsed} />
              <SidebarItem to="/employee/product-to-store" icon={<FiBox />} label="Product to Store" isCollapsed={isCollapsed} />
              <SidebarItem to="/employee/document" icon={<FiBook />} label="Document of Product" isCollapsed={isCollapsed} />
            </>
          )}

          {/* Organizer Sidebar Items */}
          {userRole === "organizer" && (
            <>
              <SidebarItem to="/dashboard" icon={<FiShoppingBag />} label="Dashboard" isCollapsed={isCollapsed} />
              <SidebarItem to="/dashboard/uploaded-product" icon={<FiInbox />} label="Product Uploaded" isCollapsed={isCollapsed} />
              <SidebarItem to="/dashboard/uploaded-product-detail" icon={<FiBookOpen />} label="Product Uploaded detail" isCollapsed={isCollapsed} />
              <SidebarItem to="/dashboard/register" icon={<FiUser />} label="Register" isCollapsed={isCollapsed} />
              <SidebarItem to="/dashboard/users" icon={<FiUsers />} label="Available Users" isCollapsed={isCollapsed} />
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, isCollapsed }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          isActive ? "text-white" : "text-gray-400 hover:bg-gray-100"
        }`
      }
    >
      <span className={`${isCollapsed ? "text-blue-500" : "text-gray-400"}`}>
        {icon}
      </span>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </NavLink>
  </li>
);

export default Sidebar;
