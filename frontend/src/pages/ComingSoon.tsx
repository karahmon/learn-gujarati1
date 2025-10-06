import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/utils/ui/card";
import { Button } from "@/lib/utils/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

interface ComingSoonProps {
  pageName?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName: propPageName }) => {
  const navigate = useNavigate();
  const { page } = useParams();
  const pageName = propPageName || page || "This Feature";

  const getPageEmoji = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('tutor')) return '👨‍🏫';
    if (lowerName.includes('batch')) return '📚';
    if (lowerName.includes('student')) return '🎓';
    if (lowerName.includes('mentor')) return '🧑‍🏫';
    return '🚀';
  };

  const getPageDescription = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('tutor')) return 'Manage tutors, their profiles, schedules, and teaching assignments.';
    if (lowerName.includes('batch')) return 'Organize students into batches, manage batch schedules and progress.';
    if (lowerName.includes('student')) return 'Complete student management system with profiles and progress tracking.';
    if (lowerName.includes('mentor')) return 'Advanced mentor management with performance analytics.';
    return 'This amazing feature is being crafted with care and attention to detail.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative w-full max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg">
                <span className="text-4xl">{getPageEmoji(pageName)}</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {pageName} Coming Soon!
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <Clock className="h-5 w-5" />
              <span className="text-lg font-medium">Under Development</span>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              {getPageDescription(pageName)}
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-gray-800">What's Coming</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Modern, intuitive user interface</li>
                <li>• Real-time data management</li>
                <li>• Advanced filtering and search</li>
                <li>• Mobile-responsive design</li>
                <li>• Comprehensive reporting tools</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                onClick={() => navigate('/dashboard/home')}
                variant="outline"
                className="flex items-center gap-2 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <Button
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            We're working hard to bring you the best experience. Stay tuned! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;