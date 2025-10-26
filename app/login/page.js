
import React from 'react';
import Link from 'next/link';
import LoginPage from '../Components/LoginPage';
import AppNavbar from '../Components/AppNavbar';

export default async function LoginPageWrapper({ searchParams }) {
  const resolvedParams = await searchParams;
  const role = resolvedParams.role;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-50 to-white font-inter">
      <AppNavbar />
      <main className="container mx-auto px-6 py-12 flex flex-col items-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 border border-green-100">
          <LoginPage role={role} />
        </div>
        {(!role || role === 'Citizen') && (
          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:text-green-800 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
