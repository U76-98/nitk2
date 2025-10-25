"use client"; // Required to use the router hook

import React from 'react';
import { useRouter } from 'next/navigation'; // Import the App Router's router
import RoleSelectionPage from './Components/RoleSelectionPage';
// No need to import LoginPage here anymore

export default function Page() {
  const router = useRouter(); // Initialize the router
  
  // We no longer need the 'view' or 'selectedRole' state here

  // This function will now navigate to the /login page
  const handleRoleSelect = (role) => {
    // We pass the role as a query parameter in the URL
    // This will send the user to: /login?role=Citizen (for example)
    router.push(`/login?role=${role}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      {/* This page is now ONLY responsible for role selection.
        The login component will be on its own separate page.
      */}
      <RoleSelectionPage onSelectRole={handleRoleSelect} />
    </div>
  );
}