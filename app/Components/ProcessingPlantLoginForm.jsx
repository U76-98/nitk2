"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client'; 

export default function ProcessingPlantLoginForm() {
  
  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });

    if (signInError) {
      console.error('Login Error:', signInError);
      setError('Incorrect username or password.');
    } else {
      console.log('Processing Plant login successful:', data.user.email);
      router.push('/processing-plant-dashboard');
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Processing Plant Login
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Username</label>
          <input
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
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
            className="w-full px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
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