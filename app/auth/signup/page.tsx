'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const showAlert = (type: string, message: string) => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert({ type: '', message: '' });
  };

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    clearAlert();
    setLoading(true);

    const name = (document.getElementById('registerName') as HTMLInputElement).value;
    const email = (document.getElementById('registerEmail') as HTMLInputElement).value;
    const password = (document.getElementById('registerPassword') as HTMLInputElement).value;

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', 'Account created successfully! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        showAlert('danger', result.message || 'Registration failed');
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

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Full Name
          </label>
          <input
            id="registerName"
            type="text"
            placeholder="John Doe"
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Email Address
          </label>
          <input
            id="registerEmail"
            type="email"
            placeholder="you@example.com"
            required
            className="input-field"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
            Password
          </label>
          <input
            id="registerPassword"
            type="password"
            placeholder="••••••••"
            required
            minLength={8}
            className="input-field"
          />
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-xs">Minimum 8 characters</p>
        </div>

        <button type="submit" disabled={loading} className="justify-center w-full btn-primary">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block border-2 border-transparent border-t-white rounded-full w-4 h-4 animate-spin"></span>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 dark:bg-slate-700 h-px"></div>
        <span className="font-medium text-gray-500 dark:text-gray-400 text-xs">OR</span>
        <div className="flex-1 bg-gray-200 dark:bg-slate-700 h-px"></div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm text-center">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
