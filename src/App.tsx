import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo from '@/components/Logo';

function App() {
  return (
    <BrowserRouter>
      {/* Fixed logo at top-left of viewport - smaller on mobile */}
      <div className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50">
        <Logo showText={true} />
      </div>
      
      {/* Center the login/signup forms with mobile-optimized spacing */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6 sm:p-6">
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App