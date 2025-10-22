import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MentorDashboard from '../features/mentor/MentorDashboard';
import MentorMonitorDashboard from '../features/monitor/MentorMonitorDashboard';
import TutorAdminDashboard from '../features/tutor/TutorAdminDashboard';
import SuperTutorDashboard from '../features/super-tutor/SuperTutorDashboard';
import SuperAdminDashboard from '../features/super-admin/SuperAdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderDashboardByRole = () => {
    switch (user?.role) {
      case Role.MENTOR:
        return <MentorDashboard />;
      case Role.MENTOR_MONITOR:
        return <MentorMonitorDashboard />;
      case Role.TUTOR_ADMIN:
        return <TutorAdminDashboard />;
      case Role.SUPER_TUTOR:
        return <SuperTutorDashboard />;
      case Role.SUPER_ADMIN:
        return <SuperAdminDashboard />;
      default:
        return <div className="p-6">Invalid Role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 w-full">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="h-full overflow-y-auto bg-white">
          <div className="app-container grid">
            {renderDashboardByRole()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;