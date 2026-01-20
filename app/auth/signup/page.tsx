'use client';

import { useState } from 'react';

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
          window.location.href = '/';
        }, 1000);
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
    <div className="w-full max-w-md">
      {alert.message && (
        <div className={`p-3 mb-4 rounded ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {alert.message}
        </div>
      )}
      
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          id="registerName"
          type="text"
          placeholder="Full Name"
          required
          className="w-full p-3 border rounded text-black"
        />
        <input
          id="registerEmail"
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 border rounded text-black"
        />
        <input
          id="registerPassword"
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border rounded text-black"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
    </div>
  );
}