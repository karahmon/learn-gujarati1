
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavLink {
    name: string;
    // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    icon: React.ReactElement;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  const Icons = {
    Dashboard: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
    Mentees: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-3-5.197m0 0A4 4 0 0112 6.5a4 4 0 013 2.646"></path></svg>,
    Syllabus: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6.253v11.494m-9-5.494h18"></path></svg>,
    Reports: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
    Seva: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>,
    Attendance: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
    Homework: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>,
    Tutors: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 4a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
    Database: <svg className="w-5 h-5" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 7v10m16-10v10M4 7a2 2 0 012-2h12a2 2 0 012 2M4 17a2 2 0 002 2h12a2 2 0 002-2M4 12h16"></path></svg>,
  };

  let navLinks: NavLink[] = [];

  switch (user?.role) {
    case Role.MENTOR:
      navLinks = [
        { name: 'My Mentees', icon: Icons.Mentees },
        { name: 'Syllabus', icon: Icons.Syllabus },
        { name: 'Previous Reports', icon: Icons.Reports },
        { name: 'Seva Summary', icon: Icons.Seva },
      ];
      break;
    case Role.MENTOR_MONITOR:
      navLinks = [
        { name: 'Batch Mentees', icon: Icons.Mentees },
        { name: 'Batch Reports', icon: Icons.Reports },
        { name: 'Seva Summary', icon: Icons.Seva },
      ];
      break;
    case Role.TUTOR_ADMIN:
       navLinks = [
        { name: 'Batch Details', icon: Icons.Mentees },
        { name: 'Class Syllabus', icon: Icons.Syllabus },
        { name: 'Batch Reports', icon: Icons.Reports },
        { name: 'Attendance Submission', icon: Icons.Attendance },
        { name: 'HW Submissions', icon: Icons.Homework },
        { name: 'Seva Summary', icon: Icons.Seva },
      ];
      break;
    case Role.SUPER_TUTOR:
       navLinks = [
        { name: 'Batch Details', icon: Icons.Mentees },
        { name: 'Class Syllabus', icon: Icons.Syllabus },
        { name: 'Batch Reports', icon: Icons.Reports },
        { name: 'Attendance Tracker', icon: Icons.Attendance },
        { name: 'HW Submissions', icon: Icons.Homework },
        { name: 'Tutor List', icon: Icons.Tutors },
      ];
      break;
    case Role.SUPER_ADMIN:
        navLinks = [
        { name: 'Dashboard', icon: Icons.Dashboard },
        { name: 'Student DB', icon: Icons.Database },
        { name: 'Tutor DB', icon: Icons.Database },
        { name: 'Mentor DB', icon: Icons.Database },
        { name: 'All Reports', icon: Icons.Reports },
        { name: 'Role Management', icon: Icons.Tutors },
      ];
      break;
  }
  
  const baseClasses = "fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white md:block";
  const transitionClasses = "transition-transform duration-200 ease-in-out";
  const closedClasses = "-translate-x-full";
  const openClasses = "translate-x-0";

  return (
    <>
      <aside className={`${baseClasses} ${transitionClasses} ${isOpen ? openClasses : closedClasses}`}>
        <div className="py-4 text-gray-500">
          <a className="ml-6 text-lg font-bold text-gray-800 truncate" href="#">
            <span className="logo-learn text-blue-600">Learn</span> <span className="logo-gujarati">ગુજરાતી</span>
          </a>
          <ul className="mt-6">
            {navLinks.map(link => (
              <li className="relative px-6 py-3" key={link.name}>
                <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                <a className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800" href="#">
                  {link.icon}
                  <span className="ml-4">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
