

import React from 'react';
import AppNavbar from '../Components/AppNavbar';
import PlantStats from '../Components/PlantStats';
import ArrivalsCard from '../Components/ArrivalsCard';
import RequestGarbageCard from '../Components/RequestGarbageCard';

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
    ],
  };
}


export default async function ProcessingPlantDashboard() {
  
  const data = await getPlantData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Processing Plant Dashboard
        </h2>

        <PlantStats stats={data.stats} />

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-2/3">
            <ArrivalsCard arrivals={data.arrivals} />
          </div>

          <div className="w-full lg:w-1/3">
            <RequestGarbageCard />
          </div>
        </div>
      </main>
    </div>
  );
}