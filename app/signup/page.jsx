// This file is: app/signup/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AppNavbar from '../Components/AppNavbar';
import { supabase } from '../../utils/supabaseClient'; // Adjust path if needed

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '', // Single field for address
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (loading) return;
    setError(null);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step A: Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData?.user) throw new Error('Signup completed but no user data received.');

      // Step B: Insert profile data into 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address, // Send the single address string
        });

      if (profileError) {
        console.error("Profile insert error:", profileError);
        throw new Error(`Account created, but failed to save profile details: ${profileError.message}.`);
      }

      alert("Signup successful! Please check your email to verify your account.");
      router.push('/login');

    } catch (error) {
      console.error('Signup Error:', error);
      setError(error.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8 flex justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Citizen Account
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* --- Personal Details --- */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                disabled={loading}
              />
            </div>

            {/* --- Address --- */}
            <hr className="my-6 border-gray-200" />
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Full Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., 123 Eco Lane, Greenfield, 12345, EcoLand"
                className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                disabled={loading}
              />
            </div>

            {/* --- Password --- */}
            <hr className="my-6 border-gray-200" />
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                required
                minLength={6}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            {/* --- Submit Button --- */}
            <button
              type="submit"
              className={`w-full mt-6 py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>

            {/* --- Link to Login --- */}
            <p className="text-center text-sm text-gray-600 pt-4">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-700 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}