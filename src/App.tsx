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
      
      {/* Center the login/signup forms inside a responsive container */}
      <div className="flex min-h-screen flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl px-4">
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