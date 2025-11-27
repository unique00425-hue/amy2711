import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { ROUTES } from '../constants';
import { supabase } from '../services/supabase';

const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // The onAuthStateChange listener in App.tsx will handle navigation
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background-dark p-4 text-white">
      <div className="w-full max-w-sm space-y-8">
        
        <Logo />

        {error && <p className="text-center text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email-address" className="sr-only">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input 
                id="email-address"
                className="form-input h-14 w-full rounded-lg border-none bg-surface-dark p-4 pl-12 text-base text-white placeholder:text-gray-500 focus:outline-0 focus:ring-2 focus:ring-primary/80" 
                placeholder="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password-input" className="sr-only">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input 
                id="password-input"
                className="form-input h-14 w-full rounded-lg border-none bg-surface-dark p-4 pl-12 pr-12 text-base text-white placeholder:text-gray-500 focus:outline-0 focus:ring-2 focus:ring-primary/80" 
                placeholder="Password" 
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)} 
                className="absolute right-0 flex h-full items-center px-4 text-gray-400"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined">{passwordVisible ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-lg font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="space-y-5 pt-4">
          <div className="text-center">
            <p className="text-sm text-gray-400">Don't have an account? <Link to={ROUTES.SIGNUP} className="font-semibold text-primary hover:underline">Sign Up</Link></p>
          </div>

          <div className="flex items-center gap-4">
            <hr className="w-full border-t border-surface-dark"/>
            <span className="text-xs text-gray-500">or continue with</span>
            <hr className="w-full border-t border-surface-dark"/>
          </div>
          
          <button onClick={() => handleSocialLogin('google')} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-surface-dark bg-background-dark px-5 text-base font-medium text-gray-200 transition-colors hover:bg-surface-dark">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.93H12.25V14.4H18.16C17.88 15.86 17.06 17.11 15.82 17.91V20.44H19.53C21.5 18.61 22.56 15.69 22.56 12.25Z" fill="#4285F4"></path>
              <path d="M12.25 23C15.22 23 17.72 22.01 19.53 20.44L15.82 17.91C14.82 18.57 13.62 18.99 12.25 18.99C9.72 18.99 7.57 17.33 6.74 15.01H2.92V17.54C4.7 20.9 8.12 23 12.25 23Z" fill="#34A853"></path>
              <path d="M6.74 15.01C6.49 14.28 6.35 13.49 6.35 12.67C6.35 11.85 6.49 11.06 6.74 10.33V7.8H2.92C2.04 9.56 1.5 11.53 1.5 13.67C1.5 15.81 2.04 17.78 2.92 19.54L6.74 15.01Z" fill="#FBBC05"></path>
              <path d="M12.25 6.34C13.77 6.34 15.09 6.88 16.03 7.77L19.61 4.19C17.72 2.45 15.22 1.33 12.25 1.33C8.12 1.33 4.7 3.44 2.92 6.8L6.74 9.33C7.57 7.01 9.72 5.34 12.25 5.34Z" fill="#EA4335"></path>
            </svg>
            Sign in with Google
          </button>

          <button onClick={() => handleSocialLogin('github')} className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-surface-dark bg-background-dark px-5 text-base font-medium text-gray-200 transition-colors hover:bg-surface-dark">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
