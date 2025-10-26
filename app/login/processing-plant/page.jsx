
import React from 'react';
import AppNavbar from '../../Components/AppNavbar'; 
import ProcessingPlantLoginForm from '../../Components/ProcessingPlantLoginForm';

export default function ProcessingPlantLoginPage() {
  return (
    <div className="min-h-screen bg-green-50 font-inter">
       <AppNavbar />
       <main className="container mx-auto px-6 py-8 flex flex-col items-center">
        <ProcessingPlantLoginForm />
       </main>
    </div>
  );
}