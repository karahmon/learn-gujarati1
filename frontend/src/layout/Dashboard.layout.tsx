import { Link, Outlet } from "react-router-dom";
import { Bell, Menu, Search, Settings, HelpCircle, LogOut, Home, GraduationCap, MoreHorizontal, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/lib/utils/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/utils/ui/dropdown-menu";
import { Input } from "@/lib/utils/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/lib/utils/ui/sheet";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testMentors } from "@/data/mentorsData"; 

const DashboardLayout = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ email: string } | null>({ email: 'learngujarati@dadabhagwan.org' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate(); 

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const results = testMentors.filter(mentor => 
        mentor.mentorName.toLowerCase().includes(term.toLowerCase()) ||
        mentor.mentorEmail.toLowerCase().includes(term.toLowerCase()) ||
        mentor.mhtId.toLowerCase().includes(term.toLowerCase()) ||
        mentor.activeMenteeName.toLowerCase().includes(term.toLowerCase()) ||
        mentor.center.toLowerCase().includes(term.toLowerCase()) ||
        mentor.activeMenteeCurrentBatch.toLowerCase().includes(term.toLowerCase()) ||
        mentor.lastBatch.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSearchResultClick = (mentor: any) => {
    // Navigate to mentors page and show the selected mentor details
    navigate('/dashboard/mentors', { state: { selectedMentor: mentor, showDetails: true } });
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    console.log("User logged out");
    navigate('/'); 
  };

  console.log("User logged in:", loggedInUser);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      {/* Enhanced Sidebar */}
      <div className="hidden border-r bg-gradient-to-b from-orange-50 to-red-50 md:block shadow-lg">
        <div className="flex h-full max-h-screen flex-col">
          {/* Logo Section */}
          <div className="flex h-20 items-center justify-center border-b border-orange-100 px-6 bg-white/80 backdrop-blur-sm">
            <Link to="/dashboard/home" className="flex items-center gap-3 font-bold text-xl">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                <img 
                  src="https://learngujarati.dadabhagwan.org/assets/logo-DmS1rboG.svg" 
                  alt="Learn Gujarati Logo" 
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Learn Gujarati
                </span>
                <span className="text-xs text-gray-500 font-normal">Admin Portal</span>
              </div>
            </Link>
          </div>
          
          {/* Navigation Menu */}
          <div className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              <div className="pb-2">
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Dashboard
                </h3>
              </div>
              
              <Link
                to="/dashboard/home"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 bg-white/60 shadow-sm text-orange-700 border border-orange-200"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-red-100">
                  <Home className="h-4 w-4 text-orange-600" />
                </div>
                <span className="font-semibold">Dashboard</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                    Active
                  </span>
                </div>
              </Link>
              
              <Link
                to="/dashboard/mentors"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm text-gray-700 hover:text-orange-700"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100">
                  <span className="text-lg">👨‍🏫</span>
                </div>
                <span>Mentors</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                    15
                  </span>
                </div>
              </Link>
              
              <Link
                to="/dashboard/students"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm text-gray-700 hover:text-orange-700"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100">
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
                <span>Students</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                    245
                  </span>
                </div>
              </Link>
              
              <Link
                to="/dashboard/alumni"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm text-gray-700 hover:text-orange-700"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100">
                  <Award className="h-4 w-4 text-yellow-600" />
                </div>
                <span>Alumni</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                    47
                  </span>
                </div>
              </Link>
              
              <Link
                to="/dashboard/tutors"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm text-gray-700 hover:text-orange-700"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
                <span>Tutors</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                    12
                  </span>
                </div>
              </Link>
              
              <Link
                to="/dashboard/batches"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-white/60 hover:shadow-sm text-gray-700 hover:text-orange-700"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100">
                  <BookOpen className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Batches</span>
                <div className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                    8
                  </span>
                </div>
              </Link>
            </nav>
          </div>
          
          {/* Bottom Section with Enhanced User Controls */}
          <div className="p-4 border-t border-orange-100 bg-white/50">
            <div className="space-y-3">
              {/* User Info Section */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500">
                  <span className="text-white text-sm font-bold">
                    {loggedInUser?.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">{loggedInUser?.email}</p>
                </div>
              </div>
              
              {/* Actions Section */}
              <div className="flex items-center justify-between gap-2">
                {/* Notifications */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-9 w-9 rounded-xl hover:bg-orange-100/80"
                >
                  <Bell className="h-4 w-4 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
                
                {/* 3-Dot Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-xl hover:bg-orange-100/80"
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start" 
                    side="top"
                    className="w-52 rounded-xl shadow-lg border-0 bg-white/95 backdrop-blur-sm mb-2"
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Quick Actions</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Manage your account
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer rounded-lg">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logoutUser}
                      className="cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div className="flex flex-col bg-gray-50/50">
        {/* Enhanced Header */}
        <header className="flex h-16 items-center gap-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 shadow-sm">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden hover:bg-orange-100"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-gradient-to-b from-orange-50 to-red-50">
              {/* Mobile menu content */}
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 font-bold text-xl mb-8">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg">
                    <img 
                      src="https://learngujarati.dadabhagwan.org/assets/logo-DmS1rboG.svg" 
                      alt="Learn Gujarati Logo" 
                      className="w-8 h-8 filter brightness-0 invert"
                    />
                  </div>
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Learn Gujarati
                  </span>
                </div>
                
                {/* Mobile Navigation */}
                <nav className="flex-1 space-y-2">
                  <Link
                    to="/dashboard/home"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium bg-white/60"
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/mentors"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    <span className="text-lg">👨‍🏫</span>
                    <span>Mentors</span>
                  </Link>
                  <Link
                    to="/dashboard/students"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Students</span>
                  </Link>
                  <Link
                    to="/dashboard/alumni"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    <Award className="h-4 w-4" />
                    <span>Alumni</span>
                  </Link>
                  <Link
                    to="/dashboard/tutors"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    <Users className="h-4 w-4" />
                    <span>Tutors</span>
                  </Link>
                  <Link
                    to="/dashboard/batches"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/60"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Batches</span>
                  </Link>
                </nav>
                
                {/* Mobile Bottom Section */}
                <div className="border-t border-orange-100 pt-4 mt-4">
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500">
                        <span className="text-white text-sm font-bold">
                          {loggedInUser?.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">Admin User</p>
                        <p className="text-xs text-gray-500 truncate">{loggedInUser?.email}</p>
                      </div>
                    </div>
                    
                    {/* Mobile Actions */}
                    <div className="flex items-center justify-between gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative h-9 w-9 rounded-xl hover:bg-orange-100/80"
                      >
                        <Bell className="h-4 w-4 text-gray-600" />
                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full"></span>
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-xl hover:bg-orange-100/80"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="top" className="w-52 rounded-xl shadow-lg border-0 bg-white/95 backdrop-blur-sm mb-2">
                          <DropdownMenuItem className="cursor-pointer rounded-lg">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer rounded-lg">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Support</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={logoutUser}
                            className="cursor-pointer rounded-lg text-red-600 focus:text-red-600 focus:bg-red-50"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search mentors, students, alumni, tutors, or batches..."
                  className="w-full bg-gray-100/50 border-0 pl-10 pr-4 py-2 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-transparent transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                
                {/* Search Results Dropdown */}
                {searchTerm && searchResults.length > 0 && showSearchResults && (
                  <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border max-h-80 overflow-y-auto z-50">
                    <div className="p-2 text-sm text-gray-500 border-b">Found {searchResults.length} mentors</div>
                    {searchResults.map((mentor) => (
                      <button
                        key={mentor.id}
                        onClick={() => handleSearchResultClick(mentor)}
                        className="w-full text-left p-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{mentor.mentorName}</div>
                        <div className="text-sm text-gray-500">{mentor.center} • MHT ID: {mentor.mhtId}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {mentor.activeMentee === 'Yes' ? (
                            <>
                              <div>Active Mentee: {mentor.activeMenteeName}</div>
                              {mentor.activeMenteeCurrentBatch && <div>Current Batch: {mentor.activeMenteeCurrentBatch}</div>}
                            </>
                          ) : 'No active mentee'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchTerm && searchResults.length === 0 && showSearchResults && (
                  <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border p-4 text-center text-gray-500 z-50">
                    No mentors found matching "{searchTerm}"
                  </div>
                )}
              </div>
            </form>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;