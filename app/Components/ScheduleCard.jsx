import React from 'react';

export default function ScheduleCard({ schedule = {} }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Collection Schedule</h2>
      <p className="text-gray-600 font-medium">{schedule.day}</p>
      <p className="text-3xl font-bold text-green-700 my-2">{schedule.time}</p>
      <p className="text-sm text-gray-500">Vehicle: {schedule.vehicle}</p>
      <a href="#" className="text-sm text-blue-600 hover:underline mt-3 block">View Full Week</a>
    </div>
  );
}