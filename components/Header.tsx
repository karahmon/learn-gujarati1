import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="z-10 py-4 bg-white shadow-md">
      <div className="app-container flex items-center justify-between h-full text-gray-800">
        {/* Mobile hamburger */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-gray"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* Search input - can be implemented later */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="align-middle rounded-full focus:shadow-outline-gray focus:outline-none"
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="Account"
              aria-haspopup="true"
            >
              <img
                className="object-cover w-8 h-8 rounded-full"
                src={`https://i.pravatar.cc/40?u=${user?.uid}`}
                alt=""
                aria-hidden="true"
              />
            </button>
            {isProfileMenuOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md"
                aria-label="submenu"
              >
                <li className="flex">
                  <span className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md">
                    {user?.fullName} ({user?.role})
                  </span>
                </li>
                <li className="flex">
                  <a
                    className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800"
                    href="#"
                    onClick={(e) => { e.preventDefault(); logout(); }}
                  >
                    <svg
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Log out</span>
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;