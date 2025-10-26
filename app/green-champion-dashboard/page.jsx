import React from 'react';
import Link from 'next/link';
import AppNavbar from '../Components/AppNavbar';
import GreenChampionStats from '../Components/GreenChampionStats';
import ChampionSchedulesCard from '../Components/ChampionSchedulesCard';
import ChampionEventsCard from '../Components/ChampionEventsCard';
import PendingReportsCard from '../Components/PendingReportsCard';
import GarbageProcessingCard from '../Components/GarbageProcessingCard';
import NotificationsCard from '../Components/NotificationsCard';
import ChampionOrdersCard from '../Components/ChampionOrdersCard';

import { createClient } from '@/app/lib/supabase/server';

const getDashboardData = async () => {
  
  const supabase = createClient();

  const { data: reports, error: reportsError } = await supabase
    .from('citizen_reports')
    .select('id, location, status') 
    .eq('status', 'Pending') 
    .order('created_at', { ascending: false }); 

  if (reportsError) {
    console.error('Error fetching reports:', reportsError.message);
  }
  
  const today = new Date().toISOString();
  const { data: eventsData, error: eventsError } = await supabase
    .from('green_events')
    .select('id, event_title, event_date')
    .gte('event_date', today)
    .order('event_date', { ascending: true })
    .limit(5);

  if (eventsError) {
    console.error('Error fetching events:', eventsError.message);
  }

 
  const events = (eventsData || []).map(event => ({
    id: event.id,
    name: event.event_title,
    date: new Date(event.event_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }));


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
    
    events: events,
    reports: reports || [],
  };


export default async function GreenChampionDashboard() {
  
  const data = await getDashboardData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Green Champion Dashboard
        </h2>

        <GreenChampionStats stats={data.stats} />

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="w-full lg:w-2/3 space-y-6">
            <ChampionSchedulesCard schedules={data.schedules} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            	<PendingReportsCard reports={data.reports} />
  	            <GarbageProcessingCard />
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
  	          <NotificationsCard notifications={data.notifications} />
            
  	        	<ChampionEventsCard events={data.events} /> 
  	        	
            <ChampionOrdersCard orders={data.orders} />

  	          <Link 
    	          href="/marketplace/add-item" 
    	          className="
    	            block w-full py-3 px-4 
  	              bg-green-700 text-white text-center font-medium 
  	              rounded-full hover:bg-green-800 transition duration-200
    	          "
      	      >
    	          + Add New Product to Marketplace
f     	      </Link>
      	  </div>

      	</div>
      </main>
    </div>
  );
}