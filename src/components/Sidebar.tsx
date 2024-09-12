import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); //maintaining the state to open or close the sidebar
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="md:hidden flex items-center p-4 bg-white text-black">
        <button onClick={toggleSidebar}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <span className="ml-2 text-lg font-semibold">Contact Management</span>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black border border-r-2 transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-8">Menu</h2>
          <ul>
            <li className="mb-4">
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className={`block py-2 px-4 rounded hover:bg-blue-100 ${
                  location.pathname === "/contact" ? "bg-blue-100" : ""
                }`}
              >
                Contact
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/dashboard"
                onClick={handleLinkClick}
                className={`block py-2 px-4 rounded hover:bg-blue-100 ${
                  location.pathname === "/dashboard" ? "bg-blue-100" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
