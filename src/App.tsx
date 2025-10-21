import { LoginForm } from "@/components/login-form";
import { SignupForm } from "@/components/signup-form";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logo from '@/components/Logo';

function App() {
  return (
    <BrowserRouter>
      {/* Fixed logo at top-left of viewport */}
      <div className="fixed top-4 left-4 z-50">
        <Logo showText={true} />
      </div>
      
      {/* Center the login/signup forms */}
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App