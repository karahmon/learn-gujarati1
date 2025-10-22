import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COUNTRIES, ROLES } from '../constants';
import Logo from '../components/Logo';
import { Role } from '../types';

const commonInputClasses = "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm bg-white";

// Props interfaces for the form components
interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}

interface SignupFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  mobile: string;
  setMobile: (value: string) => void;
  subcenter: string;
  setSubcenter: (value: string) => void;
  mhtId: string;
  setMhtId: (value: string) => void;
  role: Role | '';
  setRole: (value: Role) => void;
  country: string;
  setCountry: (value: string) => void;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  loading: boolean;
}


// --- LoginForm Component ---
const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, handleLogin, loading }) => (
  <>
    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="login-email" className="sr-only">Email address</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm bg-white"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="login-password" className="sr-only">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm bg-white"
            placeholder="Password"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  </>
);

// --- SignupForm Component ---
const SignupForm: React.FC<SignupFormProps> = ({
  email, setEmail, password, setPassword, fullName, setFullName, mobile, setMobile,
  subcenter, setSubcenter, mhtId, setMhtId, role, setRole, country, setCountry,
  handleSignup, loading
}) => (
  <>
    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
      Create a new account
    </h2>
    <form className="mt-8 space-y-4" onSubmit={handleSignup}>
      <input name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Full Name" className={commonInputClasses} />
      <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email ID" className={commonInputClasses} />
      <input name="mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required placeholder="Mobile No." className={commonInputClasses} />
      <input name="subcenter" type="text" value={subcenter} onChange={(e) => setSubcenter(e.target.value)} required placeholder="Subcenter" className={commonInputClasses} />
      <input name="mhtId" type="text" value={mhtId} onChange={(e) => setMhtId(e.target.value)} required placeholder="MHT ID" className={commonInputClasses} />
      <select name="role" required value={role} onChange={(e) => setRole(e.target.value as Role)} className={commonInputClasses} >
        <option value="" disabled>Select Role</option>
        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select name="country" required value={country} onChange={(e) => setCountry(e.target.value)} className={commonInputClasses}>
        <option value="" disabled>Select Country</option>
        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className={commonInputClasses} />
      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  </>
);


// --- Main LoginPage Component ---
const LoginPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login, signup } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state for both forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [subcenter, setSubcenter] = useState('');
  const [mhtId, setMhtId] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [country, setCountry] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await signup({
        email,
        password_redacted: password,
        fullName,
        mobile,
        subcenter,
        mhtId,
        country,
        role,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="app-container w-full flex justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
        <Logo />
        <div className="mt-8">
            {isLoginView ? (
              <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                loading={loading}
              />
            ) : (
              <SignupForm
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                fullName={fullName} setFullName={setFullName}
                mobile={mobile} setMobile={setMobile}
                subcenter={subcenter} setSubcenter={setSubcenter}
                mhtId={mhtId} setMhtId={setMhtId}
                role={role} setRole={setRole as (r: Role) => void}
                country={country} setCountry={setCountry}
                handleSignup={handleSignup}
                loading={loading}
              />
            )}
        </div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div className="text-sm text-center">
            <button
                onClick={() => { setIsLoginView(!isLoginView); setError(null); }}
                className="font-medium text-gray-800 hover:text-gray-600"
            >
                {isLoginView ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;