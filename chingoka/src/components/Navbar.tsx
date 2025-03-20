import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

interface NavbarProps {
 
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  
  toggleEsidebar:() => void;
  isEsidebarCollapsed: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isSidebarCollapsed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch username from sessionStorage (assuming it's stored there after login)
    const storedUserName = sessionStorage.getItem("username");

    if (storedUserName) {
      setUserName(storedUserName); // Set the username if it's found
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear sessionStorage (remove all session data)
    sessionStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-gray-800 hover:text-gray-100 transition-all md:hidden"
        >
          {isSidebarCollapsed ? <FiMenu size={24} className="text-black" /> : <FiX size={24} className=""/>}
        </button>

        {/* Logo */}
        <Link to="/dashboard" className=" text-center text-2xl font-semibold text-gray-800">
          Chingoka Store
        </Link>

        {/* Profile Dropdown */}
        <li className="px-4 py-2 text-gray-700">
          {/* Display username if it exists */}
          {userName ? (
            <>Welcome, <span className="font-semibold">{userName}</span></>
          ) : (
            <>Welcome, Guest of honour</>
          )}
        </li>

        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="text-white hover:text-blue transition-all"
          >
            <FiUser size={24} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg transition-opacity">
              <ul className="py-2 ">
                {/* Logout Button */}
                <li>
                  <button
                    className="w-full text-left  px-4 py-2 text-white-700 hover:bg-gray-200 transition-all"
                    onClick={handleLogout} // Logout functionality
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
