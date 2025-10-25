// This file is: app/processing-plant-dashboard/page.jsx
// !! NO "use client" !! This is now a Server Component

import React from 'react';
import AppNavbar from '../Components/AppNavbar';
import PlantStats from '../Components/PlantStats';
import ArrivalsCard from '../Components/ArrivalsCard';
import RequestGarbageCard from '../Components/RequestGarbageCard';

// --- MOCK DATA FETCHING ---
const getPlantData = async () => {
  return {
    stats: {
      processedToday: 12.5,
      currentCapacity: 75,
      inboundToday: 3,
    },
    arrivals: [
      { id: 'S-101', vehicle: 'G-14B', from: 'Ward 1-3', eta: '10:30 AM', status: 'In Transit', qty: 2.5 },
      { id: 'S-102', vehicle: 'V-07C', from: 'Ward 4-6', eta: '1:00 PM', status: 'Pending', qty: 1.5 },
      // ... more arrivals
    ],
  };
}
// --- END MOCK DATA ---


export default async function ProcessingPlantDashboard() {
  
  // Fetch data on the server
  const data = await getPlantData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Processing Plant Dashboard
        </h2>

        {/* 1. Stats Component (Server) */}
        <PlantStats stats={data.stats} />

        {/* 2. MAIN 2-COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* --- LEFT COLUMN (Arrivals) --- */}
          <div className="w-full lg:w-2/3">
            {/* Arrivals Component (Server) */}
            <ArrivalsCard arrivals={data.arrivals} />
          </div>

          {/* --- RIGHT COLUMN (Request Form) --- */}
          <div className="w-full lg:w-1/3">
            {/* Request Form Component (Client) */}
            <RequestGarbageCard />
          </div>
        </div>
      </main>
    </div>
  );
}