import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role, ApprovalStatus } from '../types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MentorDashboard from '../features/mentor/MentorDashboard';
import MentorMonitorDashboard from '../features/monitor/MentorMonitorDashboard';
import TutorAdminDashboard from '../features/tutor/TutorAdminDashboard';
import SuperTutorDashboard from '../features/super-tutor/SuperTutorDashboard';
import SuperAdminDashboard from '../features/super-admin/SuperAdminDashboard';
import WaitingApproval from './WaitingApproval';
import RoleManagement from './RoleManagement';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  // Check if user is waiting for approval
  if (user?.approvalStatus === ApprovalStatus.PENDING) {
    return <WaitingApproval />;
  }

  // Check if user was rejected
  if (user?.approvalStatus === ApprovalStatus.REJECTED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Account Rejected</h1>
          <p className="text-gray-600 mb-4">Your account registration has been rejected.</p>
          {user.rejectedReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Reason:</span>
                <br />
                {user.rejectedReason}
              </p>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full bg-red-600 text-white py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium mb-4"
          >
            Logout
          </button>
          <p className="text-sm text-gray-500">
            Please contact support at{' '}
            <a href="mailto:support@learngujarati.com" className="text-blue-600 hover:underline">
              support@learngujarati.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    // Super Admin Pages
    if (user?.role === Role.SUPER_ADMIN) {
      switch (currentPage) {
        case 'dashboard':
          return <SuperAdminDashboard />;
        case 'student-db':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Student Database</h2><p>Student database management interface</p></div>;
        case 'tutor-db':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Tutor Database</h2><p>Tutor database management interface</p></div>;
        case 'mentor-db':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Mentor Database</h2><p>Mentor database management interface</p></div>;
        case 'reports':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">All Reports</h2><p>View all reports across the system</p></div>;
        case 'role-management':
          return <RoleManagement />;
        default:
          return <SuperAdminDashboard />;
      }
    }

    // Mentor Pages
    if (user?.role === Role.MENTOR) {
      switch (currentPage) {
        case 'dashboard':
          return <MentorDashboard />;
        case 'mentees':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">My Mentees</h2><p>View and manage your mentees</p></div>;
        case 'syllabus':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Syllabus</h2><p>View course syllabus</p></div>;
        case 'reports':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Reports</h2><p>View your reports</p></div>;
        default:
          return <MentorDashboard />;
      }
    }

    // Tutor Admin Pages
    if (user?.role === Role.TUTOR_ADMIN) {
      switch (currentPage) {
        case 'dashboard':
          return <TutorAdminDashboard />;
        case 'batch-details':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Batch Details</h2><p>Manage batch information</p></div>;
        case 'syllabus':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Syllabus</h2><p>Manage course syllabus</p></div>;
        case 'reports':
          return <div className="p-6"><h2 className="text-2xl font-bold mb-4">Reports</h2><p>View batch reports</p></div>;
        default:
          return <TutorAdminDashboard />;
      }
    }

    // Default/other roles
    return (
      <div className="p-6">
        {user?.role === Role.MENTOR_MONITOR && <MentorMonitorDashboard />}
        {user?.role === Role.SUPER_TUTOR && <SuperTutorDashboard />}
        {!user && <div>Loading...</div>}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <div className="flex flex-col flex-1 w-full">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;