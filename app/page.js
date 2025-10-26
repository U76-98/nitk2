"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; 
import RoleSelectionPage from './Components/RoleSelectionPage'; 

export default function Page() {
  const router = useRouter(); 

  const handleRoleSelect = (role) => {
    
    if (role === 'Green Champion') {
      router.push('/login/green-champion');

    } else if (role === 'Processing Plant') { 
      router.push('/login/processing-plant'); 

    } else if (role === 'Citizen') {
      router.push('/login');

    } else {
      router.push(`/login?role=${encodeURIComponent(role)}`);
    }
    
  };

  return (
    <div className="min-h-screen bg-green-50 font-inter flex items-center justify-center">
      <RoleSelectionPage onSelectRole={handleRoleSelect} />
    </div>
  );
}