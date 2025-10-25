// This file is: app/Components/LoginPage.jsx
"use client"; // Needs state and handlers

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Import the Supabase client
import { supabase } from '../../utils/supabaseClient'; // Adjust path if needed

// (You can keep or remove the ROLE_CONFIG if you still want the title to change based on the role prop)
const ROLE_CONFIG = {
  Citizen: { title: 'Citizen Login' },
  'Green Champions': { title: 'Green Champion Login' },
  'Processing Plants': { title: 'Processing Plant Login' },
  default: { title: 'Login' }
};

export default function LoginPage({ role }) { // It still receives the role prop for the title
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the display title based on the role prop
  const config = ROLE_CONFIG[role] || ROLE_CONFIG.default;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Attempt to sign in using Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (signInError) {
        throw signInError; // Throw error to be caught below
      }

      // Login successful!
      // Supabase automatically handles session/cookies
      console.log('Login successful:', data);

      // Redirect to the citizen dashboard
      router.push('/citizen-dashboard');

    } catch (error) {
      console.error('Login Error:', error);
      // Provide a user-friendly error message
      if (error.message.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(error.message || 'An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md"> {/* Adjusted width */}
      {/* Title changes based on role, but logic is only for citizens */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {config.title}
      </h2>

      {/* Display login errors */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>
    </div>
  );
}