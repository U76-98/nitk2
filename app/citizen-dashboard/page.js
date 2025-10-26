
"use client"; 

import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 


import { createClient } from '@/app/lib/supabase/client'; 


import AppNavbar from '../Components/AppNavbar';
import ProfileCard from '../Components/ProfileCard';
import ReportDumpingCard from '../Components/ReportDumpingCard';
import MarketplaceCard from '../Components/MarketplaceCard';
import ScheduleCard from '../Components/ScheduleCard';
import TrainingCard from '../Components/TrainingCard';
import EventsCard from '../Components/EventsCard';


const mockSchedule = { day: 'Today, Oct 26th', time: 'Approx. 11:30 AM', vehicle: 'Truck #G-14B' };
const mockTraining = { completed: 3, total: 5 };
const mockEvent = { title: 'Community Park Cleanup', date: 'Saturday, Nov 1st', reward: 50 };



export default function CitizenHomePage() {
  const router = useRouter();
  
  
  const supabase = createClient(); 


  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  
 
  const [event, setEvent] = useState(mockEvent);

 
  useEffect(() => {
   
    const fetchDashboardData = async () => {
      setLoading(true);
      
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error('No active session found:', sessionError);
        router.push('/login?role=Citizen'); 
        return; 
      }

      
      const loggedInUser = session.user;
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', loggedInUser.id) 
        .single();

      if (profileError) {
        console.error(`Error fetching profile for user ${loggedInUser.id}:`, profileError);
        setUser({
          name: loggedInUser.email, ecoCoins: 0, email: loggedInUser.email,
          phone: null, address: {},
        });
      } else {
        setUser({
          name: profileData.full_name,
          ecoCoins: profileData.eco_coins,
          email: loggedInUser.email, 
          phone: profileData.phone,
          address: { street: profileData.address } 
        });
      }

      
      const today = new Date().toISOString();
      const { data: eventData, error: eventError } = await supabase
        .from('green_events')
        .select('event_title, event_date, eco_coin_reward') 
        .gte('event_date', today) 
        .order('event_date', { ascending: true }) 
        .limit(1) 
        .maybeSingle(); 
      if (eventError) {
        console.error('Error fetching event:', eventError.message);
        
      } else if (eventData) {
        
        setEvent({
          title: eventData.event_title,
          date: new Date(eventData.event_date).toLocaleDateString('en-US', {
            weekday: 'long', month: 'short', day: 'numeric'
          }),
          reward: eventData.eco_coin_reward || 0 
        });
      }
      
      setLoading(false);
    };

    fetchDashboardData();
  }, [router, supabase]); 


  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

 
  if (!user) {
    return null; 
  }


  
  return (
    <div className="min-h-screen bg-green-50 font-inter">
  
      <AppNavbar ecoCoins={user?.ecoCoins} />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Citizen Dashboard
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-1/2">
            <ReportDumpingCard user={user} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <ScheduleCard schedule={mockSchedule} />
              <TrainingCard progress={mockTraining} />
              
              
              <EventsCard event={event} />

            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            
            <ProfileCard user={user} />
            <MarketplaceCard />
          </div>
        </div>
      </main>
    </div>
  );
}