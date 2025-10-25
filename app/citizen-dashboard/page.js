// This file is: app/citizen-dashboard/page.jsx
"use client"; // 1. Make it a Client Component

import React, { useState, useEffect } from 'react'; // 2. Import hooks
import { useRouter } from 'next/navigation'; // For redirect
// 3. Import the CLIENT-SIDE Supabase utility
import { supabase } from '../../utils/supabaseClient'; // Adjust path

// Import components (no change here)
import AppNavbar from '../Components/AppNavbar';
import ProfileCard from '../Components/ProfileCard';
import ReportDumpingCard from '../Components/ReportDumpingCard';
import MarketplaceCard from '../Components/MarketplaceCard';
import ScheduleCard from '../Components/ScheduleCard';
import TrainingCard from '../Components/TrainingCard';
import EventsCard from '../Components/EventsCard';

// (Mock data for OTHER cards can stay for now, or be fetched in useEffect too)
const mockSchedule = { day: 'Today, Oct 26th', time: 'Approx. 11:30 AM', vehicle: 'Truck #G-14B' };
const mockTraining = { completed: 3, total: 5 };
const mockEvent = { title: 'Community Park Cleanup', date: 'Saturday, Nov 1st', reward: 50 };
// --- END MOCK DATA ---


export default function CitizenHomePage() {
  const router = useRouter();

  // 4. State for user data and loading status
  const [user, setUser] = useState(null); // Start as null to indicate loading
  const [loading, setLoading] = useState(true);

  // 5. Fetch data using useEffect (runs in the browser)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      // Get the current user session from Supabase client-side
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        console.error('No active session found:', sessionError);
        router.push('/login?role=Citizen'); // Redirect if not logged in
        return; // Stop execution
      }

      // If session exists, fetch the profile data
      const loggedInUser = session.user;
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', loggedInUser.id)
        .single();

      if (profileError) {
        console.error(`Error fetching profile for user ${loggedInUser.id}:`, profileError);
        // Handle missing profile - maybe show default data or redirect?
         setUser({
            name: loggedInUser.email, // Fallback name
            ecoCoins: 0,
            email: loggedInUser.email,
            phone: null,
            address: {},
         });
      } else {
        // Prepare data for ProfileCard
        setUser({
          name: profileData.full_name,
          ecoCoins: profileData.eco_coins,
          email: loggedInUser.email, // Use email from auth session
          phone: profileData.phone,
          address: { street: profileData.address } // Assuming single address column
        });
      }
      setLoading(false);
    };

    fetchUserData();
  }, [router]); // Dependency array

  // 6. Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  // If loading is false but user is still null (shouldn't happen if redirect works)
  if (!user) {
     return null; // Or some error message
  }


  // --- Render the dashboard ---
  return (
    <div className="min-h-screen bg-green-50 font-inter">
      {/* Navbar might briefly show no coins, then update */}
      <AppNavbar ecoCoins={user?.ecoCoins} />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Citizen Dashboard
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/2">
             <ReportDumpingCard />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Use mock data for now */}
                <ScheduleCard schedule={mockSchedule} />
                <TrainingCard progress={mockTraining} />
                <EventsCard event={mockEvent} />
             </div>
          </div>
          {/* Right Column */}
          <div className="w-full lg:w-1/2">
            {/* Pass the user state */}
            <ProfileCard user={user} />
            <MarketplaceCard />
          </div>
        </div>
      </main>
    </div>
  );
}