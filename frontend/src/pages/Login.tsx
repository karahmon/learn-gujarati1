import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/utils/ui/card";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { Label } from "@/lib/utils/ui/label";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('learngujarati@dadabhagwan.org');
  const [password, setPassword] = useState<string>('Dada@123');
  const [error, setError] = useState<string | null>(null);

  function login(email: string, password: string) {
    // Hardcoded login validation
    const validEmail = 'learngujarati@dadabhagwan.org';
    const validPassword = 'Dada@123';
    
    if (email === validEmail && password === validPassword) {
      console.log("User logged in successfully");
      navigate('/dashboard/home');
    } else {
      console.error("Login failed");
      setError("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10 bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg">
              <img 
                src="https://learngujarati.dadabhagwan.org/assets/logo-DmS1rboG.svg"
                alt="Learn Gujarati Logo"
                className="w-10 h-10 filter brightness-0 invert"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Learn Gujarati
              </h1>
              <p className="text-sm text-gray-600">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="w-full shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back! 👋
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-300">
              Sign in to access your admin dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Email Address
              </Label>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="learngujarati@dadabhagwan.org"
                className="h-11 border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </Label>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Dada@123"
                className="h-11 border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:border-blue-400 focus:ring-blue-400 rounded-xl"
                required
              />
            </div>
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {error}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-6">
            <Button
              onClick={() => login(email, password)}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In to Dashboard 🚀
            </Button>
          </CardFooter>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 Learn Gujarati, a Dada Bhagwan Foundation Initiative.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
