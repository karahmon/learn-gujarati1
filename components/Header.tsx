import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full text-gray-800">
        {/* Mobile hamburger */}
        <button
          className="p-2 mr-5 -ml-2 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none transition-colors"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            ></path>
          </svg>
        </button>
        
        <div className="flex-1" />
        
        {/* User Profile */}
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
              aria-label="Account"
              aria-haspopup="true"
            >
              <img
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                src={`https://i.pravatar.cc/40?u=${user?.uid}`}
                alt={user?.fullName}
                aria-hidden="true"
              />
              <span className="text-sm font-medium hidden sm:inline text-gray-700">{user?.fullName}</span>
            </button>
            
            {isProfileMenuOpen && (
              <ul
                className="absolute right-0 w-56 p-2 mt-2 space-y-1 text-gray-600 bg-white border border-gray-200 rounded-lg shadow-lg"
                aria-label="submenu"
              >
                <li className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-semibold text-gray-900">{user?.fullName}</div>
                  <div className="text-xs text-gray-500 mt-1">{user?.role}</div>
                </li>
                <li className="mt-2">
                  <button
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      logout(); 
                      setProfileMenuOpen(false);
                    }}
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
                  </button>
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