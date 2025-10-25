// This file is: app/login/page.jsx
import React from 'react';
import Link from 'next/link';
import LoginPage from '../Components/LoginPage'; // The component we just updated
import AppNavbar from '../Components/AppNavbar';

// Make async if needed for searchParams
export default async function LoginPageWrapper({ searchParams }) {

  // Await searchParams if using async
  const resolvedParams = await searchParams;
  const role = resolvedParams.role;

  console.log("LOGIN PAGE WRAPPER ROLE:", role); // Keep this for debugging

  return (
    <div className="min-h-screen bg-green-50 font-inter">
       <AppNavbar />
       <main className="container mx-auto px-6 py-8 flex flex-col items-center">
        {/* Pass the role */}
        <LoginPage role={role} />

        {/* Conditionally show Signup link */}
        {(!role || role === 'Citizen') && (
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-green-700 hover:underline">
              Sign Up
            </Link>
          </p>
        )}
       </main>
    </div>
  );
}