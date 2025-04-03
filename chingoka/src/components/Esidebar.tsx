// import React from "react";
// import { NavLink } from "react-router-dom";
// import { FiShoppingBag, FiBox, FiBook } from "react-icons/fi";

// interface EsidebarProps {
//   isCollapsed: boolean;
// }

// const Esidebar: React.FC<EsidebarProps> = ({ isCollapsed }) => {
//   return (
//     <aside
//       className={`fixed top-16 left-0 h-full bg-white text-white shadow-lg transition-all ${
//         isCollapsed ? "w-16" : "w-64"
//       }`}
//     >
//       <nav className="p-4">
//         <ul className="space-y-4">
//           <EsidebarItem to="/employee" icon={<FiShoppingBag />} label="Dashboard" isCollapsed={isCollapsed} />
//           {/* <EsidebarItem to="/dashboard/storetoshop" icon={<FiShoppingBag />} label="Store to Shop" isCollapsed={isCollapsed} /> */}
//           <EsidebarItem to="/employee/product-to-store" icon={<FiBox />} label="Product to Store" isCollapsed={isCollapsed} />
//           <EsidebarItem to="/employee/document" icon={< FiBook  />} label="document of product" isCollapsed={isCollapsed} />
//           {/* <EsidebarItem to="/dashboard/today-sales" icon={<FiTrendingUp />} label="Today Sales" isCollapsed={isCollapsed} /> */}
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// interface EsidebarItemProps {
//   to: string;
//   icon: React.ReactNode;
//   label: string;
//   isCollapsed: boolean;
// }

// const EsidebarItem: React.FC<EsidebarItemProps> = ({ to, icon, label, isCollapsed }) => (
//   <li>
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//           isActive ? " text-white" : "text-gray-400 hover:bg-gray-100"
//         }`
//       }
//     >
//       {icon}
//       {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
//     </NavLink>
//   </li>
// );

// export default Esidebar;
