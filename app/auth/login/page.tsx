'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
const [formData, setFormData]=useState({email:"", password:""})
  const showAlert = (type: string, message: string) => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert({ type: '', message: '' });
  };
const debouncedInput=(key:string, value:string)=>{
    setTimeout(()=>setFormData((prev)=>({...prev, [key]:value})), 300)
}
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    clearAlert();
    setLoading(true);

    const { email, password } = formData;
    if (!email || !password) {
      showAlert('danger', 'Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', 'Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        showAlert('danger', result.message || 'Login failed');
      }
    } catch (error) {
      showAlert('danger', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 w-full">
      {alert.message && (
        <div
          className={`p-4 rounded-xl border animate-slide-in-down ${
            alert.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="text-xl">{alert.type === 'success' ? '✓' : '✕'}</div>
            <span className="font-medium text-sm sm:text-base">{alert.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Email Address
          </label>
          <input
            id="loginEmail"
            type="email"
            placeholder="you@example.com"
            required
            onChange={(e) => debouncedInput("email", e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Password
          </label>
          <input
            id="loginPassword"
            type="password"
            placeholder="••••••••"
            required
            onChange={(e) => debouncedInput("password", e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" disabled={loading} className="justify-center w-full btn-primary">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block border-2 border-transparent border-t-white rounded-full w-4 h-4 animate-spin"></span>
              Signing in...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 dark:bg-slate-700 h-px"></div>
        <span className="font-medium text-gray-500 dark:text-gray-400 text-xs">OR</span>
        <div className="flex-1 bg-gray-200 dark:bg-slate-700 h-px"></div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
        Don't have an account?{' '}
        <Link
          href="/auth/signup"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
