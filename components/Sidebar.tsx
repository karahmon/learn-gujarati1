import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPage?: string | null;
  onNavigate?: (page: string) => void;
}

interface NavLink {
  label: string;
  id: string;
  icon: React.ReactElement;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentPage, onNavigate }) => {
  const { user } = useAuth();

  const DashboardIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );

  const DatabaseIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 7a2 2 0 012-2h12a2 2 0 012 2M4 17a2 2 0 002 2h12a2 2 0 002-2M4 12h16" />
    </svg>
  );

  const ReportIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const SettingsIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    </svg>
  );

  const navLinks: NavLink[] = [];

  if (user?.role === Role.SUPER_ADMIN) {
    navLinks.push(
      { label: 'Dashboard', id: 'dashboard', icon: DashboardIcon },
      { label: 'Student DB', id: 'student-db', icon: DatabaseIcon },
      { label: 'Tutor DB', id: 'tutor-db', icon: DatabaseIcon },
      { label: 'Mentor DB', id: 'mentor-db', icon: DatabaseIcon },
      { label: 'All Reports', id: 'reports', icon: ReportIcon },
      { label: 'Role Management', id: 'role-management', icon: SettingsIcon }
    );
  } else if (user?.role === Role.MENTOR) {
    navLinks.push(
      { label: 'Dashboard', id: 'dashboard', icon: DashboardIcon },
      { label: 'My Mentees', id: 'mentees', icon: DatabaseIcon },
      { label: 'Syllabus', id: 'syllabus', icon: ReportIcon },
      { label: 'Reports', id: 'reports', icon: ReportIcon }
    );
  } else if (user?.role === Role.TUTOR_ADMIN) {
    navLinks.push(
      { label: 'Dashboard', id: 'dashboard', icon: DashboardIcon },
      { label: 'Batch Details', id: 'batch-details', icon: DatabaseIcon },
      { label: 'Syllabus', id: 'syllabus', icon: ReportIcon },
      { label: 'Reports', id: 'reports', icon: ReportIcon }
    );
  } else {
    navLinks.push(
      { label: 'Dashboard', id: 'dashboard', icon: DashboardIcon }
    );
  }

  return (
    <>
      <aside
        className={`fixed md:relative inset-y-0 md:inset-auto z-20 flex-shrink-0 w-64 mt-16 md:mt-0 overflow-y-auto bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <nav className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-1">
              <span className="text-blue-600">Learn</span> 
              <span className="text-orange-500 font-extrabold">ગુજરાતી</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 px-3 py-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      onNavigate?.(link.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold shadow-sm border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>{link.icon}</span>
                    <span className="flex-1 text-left text-sm">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 py-4 bg-white">
            <p className="text-xs text-gray-500 text-center">Learn Gujarati v1.0</p>
          </div>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
