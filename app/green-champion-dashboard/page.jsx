// This file is: app/green-champion-dashboard/page.jsx
// This is a Server Component (NO "use client")

import React from 'react';
import AppNavbar from '../Components/AppNavbar';
import GreenChampionStats from '../Components/GreenChampionStats';
import ChampionSchedulesCard from '../Components/ChampionSchedulesCard';
import ChampionEventsCard from '../Components/ChampionEventsCard';
import PendingReportsCard from '../Components/PendingReportsCard';
import GarbageProcessingCard from '../Components/GarbageProcessingCard';
import NotificationsCard from '../Components/NotificationsCard';
import ChampionOrdersCard from '../Components/ChampionOrdersCard';

// --- MOCK DATA FETCHING ---
const getDashboardData = async () => {
  return {
    stats: {
      peopleTrained: 142,
      shgTrained: 18,
      garbageCollected: 4.7,
      eventsConducted: 21,
      reportsResolved: 94,
    },
    orders: [
      { id: 'ORD-1024', item: 'Bamboo Toothbrush Set', qty: 2, user: 'Jane Citizen' },
      { id: 'ORD-1023', item: 'Recycled Paper Notebook', qty: 1, user: 'Alex M.' },
    ],
    notifications: [
      { id: 1, text: 'New illegal dumping report in Ward 5.', time: '5m ago' },
      { id: 2, text: 'Vehicle G-14B maintenance due.', time: '2h ago' },
    ],
    schedules: [
      { id: 'V-12A', area: 'Ward 1-3', status: 'On Route' },
      { id: 'PC-07C', area: 'Ward 4-6', status: 'Pending' },
    ],
    events: [
      { id: 1, name: 'Beach Cleanup @ Panambur', date: 'Nov 1st' },
      { id: 2, name: 'Composting Workshop', date: 'Nov 5th' },
    ],
    reports: [
      { id: 'R-501', location: 'Ward 5, Near Market', status: 'Pending' },
      { id: 'R-502', location: 'Ward 2, Highway side', status: 'Pending' },
    ]
  };
}
// --- END MOCK DATA ---


export default async function GreenChampionDashboard() {
  
  // Fetch all data for the dashboard
  const data = await getDashboardData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Green Champion Dashboard
        </h2>

        {/* --- 1. KEY STATS ROW --- */}
        <GreenChampionStats stats={data.stats} />

        {/* --- 2. MAIN 2-COLUMN LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* --- LEFT COLUMN (Monitoring Cards) --- */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            <ChampionSchedulesCard schedules={data.schedules} />
            
            <ChampionEventsCard events={data.events} />
            
            {/* Garbage/Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PendingReportsCard reports={data.reports} />
              <GarbageProcessingCard />
            </div>

          </div>

          {/* --- RIGHT COLUMN (Action Feeds) --- */}
          <div className="w-full lg:w-1D/3 space-y-6">
            <NotificationsCard notifications={data.notifications} />
            <ChampionOrdersCard orders={data.orders} />
          </div>

        </div>
      </main>
    </div>
  );
}