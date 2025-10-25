import React from 'react';

export default function EventsCard({ event = {} }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm md:col-span-2">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Upcoming Events</h2>
      <p className="text-gray-600 mb-4">Join an event, help the community, and earn Eco Coins.</p>
      <div className="border border-green-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
          <h3 className="font-semibold text-lg text-blue-700">{event.title}</h3>
          <p className="text-gray-600">{event.date}</p>
        </div>
        <div className="mt-3 sm:mt-0 text-left sm:text-right">
          <span className="block text-green-700 font-medium">Earn {event.reward || 0} Eco Coins</span>
          <button className="mt-1 px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-full hover:bg-green-800 transition duration-200">
            Register
          </button>
        </div>
      </div>
      <a href="#" className="text-sm text-blue-600 hover:underline mt-4 block">View All Events</a>
    </div>
  );
}