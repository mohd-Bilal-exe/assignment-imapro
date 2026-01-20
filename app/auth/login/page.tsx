'use client';

import { useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const showAlert = (type: string, message: string) => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert({ type: '', message: '' });
  };

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    clearAlert();
    setLoading(true);

    const email = (document.getElementById('loginEmail') as HTMLInputElement).value;
    const password = (document.getElementById('loginPassword') as HTMLInputElement).value;

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
          window.location.href = '/';
        }, 1000);
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
    <div className="w-full max-w-md">
      {alert.message && (
        <div className={`p-3 mb-4 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {alert.message}
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          id="loginEmail"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded text-black"
        />
        <input
          id="loginPassword"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}