import React from "react";
import { NavLink } from "react-router-dom";
import { FiShoppingBag, FiBox, FiUser, FiUsers ,FiInbox, FiBook } from "react-icons/fi";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <aside
      className={`fixed top-16 left-0 h-full bg-white text-white shadow-lg transition-all ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <nav className="p-4">
        <ul className="space-y-4">
          <SidebarItem to="/dashboard" icon={<FiShoppingBag />} label="Dashboard" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/uploaded-product" icon={<FiInbox />} label="product uploaded" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/product-to-store" icon={<FiBox />} label="Product to Store" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/document" icon={< FiBook  />} label="document of product" isCollapsed={isCollapsed} />   
          <SidebarItem to="/dashboard/register" icon={<FiUser />} label="register" isCollapsed={isCollapsed} />
          <SidebarItem to="/dashboard/users" icon={<FiUsers />} label="available user" isCollapsed={isCollapsed} />
          {/* <SidebarItem to="/dashboard/today-sales" icon={<FiTrendingUp />} label="Today Sales" isCollapsed={isCollapsed} /> */}
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
