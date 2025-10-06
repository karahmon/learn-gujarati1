import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/utils/ui/card";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Star
} from "lucide-react";

const DashboardPage: React.FC = () => {
  // Mock data - replace with real data from your API
  const stats = {
    totalStudents: 245,
    activeStudents: 198,
    alumni: 47,
    totalMentors: 15,
    activeMentors: 12,
    totalTutors: 18,
    activeTutors: 16,
    totalBatches: 8,
    activeBatches: 6,
    completionRate: 85,
    averageRating: 4.6,
    newEnrollments: 23
  };

  const StatCard = ({ 
    title, 
    value, 
    description, 
    icon: Icon, 
    trend, 
    color, 
    linkTo 
  }: {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    trend?: string;
    color: string;
    linkTo?: string;
  }) => {
    const cardContent = (
      <Card className={`transition-all duration-200 ${linkTo ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : ''} border-0 bg-gradient-to-br ${color}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
          <Icon className="h-5 w-5 text-white" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{value}</div>
          <p className="text-xs text-white/80 mt-1">
            {description}
            {trend && (
              <span className="ml-1 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    );

    return linkTo ? (
      <Link to={linkTo} className="block">
        {cardContent}
      </Link>
    ) : (
      <div>{cardContent}</div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard Overview 📊
        </h1>
        <p className="text-gray-600">
          Welcome to Learn Gujarati Admin Portal. Here's what's happening today.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          description={`${stats.activeStudents} active students`}
          icon={GraduationCap}
          trend="+12% from last month"
          color="from-blue-500 to-blue-600"
          linkTo="/dashboard/students"
        />
        
        <StatCard
          title="Alumni"
          value={stats.alumni}
          description="Graduated students"
          icon={Award}
          trend="+5 this month"
          color="from-green-500 to-green-600"
          linkTo="/dashboard/alumni"
        />
        
        <StatCard
          title="Active Mentors"
          value={`${stats.activeMentors}/${stats.totalMentors}`}
          description="Currently teaching"
          icon={Users}
          color="from-blue-500 to-indigo-500"
          linkTo="/dashboard/mentors"
        />
        
        <StatCard
          title="Active Tutors"
          value={`${stats.activeTutors}/${stats.totalTutors}`}
          description="Available for sessions"
          icon={Users}
          color="from-purple-500 to-purple-600"
          linkTo="/dashboard/tutors"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Batches"
          value={`${stats.activeBatches}/${stats.totalBatches}`}
          description="Running programs"
          icon={BookOpen}
          color="from-indigo-500 to-indigo-600"
          linkTo="/dashboard/batches"
        />
        
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          description="Course completion"
          icon={TrendingUp}
          trend="+3% improvement"
          color="from-emerald-500 to-emerald-600"
        />
        
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          description="Student satisfaction"
          icon={Star}
          trend="Excellent"
          color="from-yellow-500 to-yellow-600"
        />
        
        <StatCard
          title="New Enrollments"
          value={stats.newEnrollments}
          description="This month"
          icon={Calendar}
          trend="+8% from last month"
          color="from-pink-500 to-pink-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New batch "Advanced Gujarati" started</p>
                <p className="text-xs text-gray-500">2 hours ago • 15 students enrolled</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">5 students completed beginner course</p>
                <p className="text-xs text-gray-500">5 hours ago • Certificates issued</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New mentor "Dr. Patel" joined</p>
                <p className="text-xs text-gray-500">1 day ago • Linguistics specialist</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Performance Overview
            </CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Student Engagement</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Course Completion</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mentor Availability</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-medium">99.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{width: '99.8%'}}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;