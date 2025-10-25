// This file is: app/Components/ChampionSchedulesCard.jsx
import React from 'react';
import { FaCalendarPlus } from 'react-icons/fa';
// Note: We'll use a simple button for now, but this could be a <Link>
// import Link from 'next/link';

export default function ChampionSchedulesCard({ schedules = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Collection Schedules</h3>
        {/* <Link href="/manage-schedule"> */}
          <button className="flex items-center gap-2 py-2 px-4 bg-green-100 text-green-800 font-medium rounded-full hover:bg-green-200">
            <FaCalendarPlus /> Manage Schedule
          </button>
        {/* </Link> */}
      </div>
      <ul className="space-y-3">
        {schedules.map(s => (
          <li key={s.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="font-semibold text-gray-700">{s.area}</span>
              <span className="text-sm text-gray-500 ml-2">(Vehicle: {s.id})</span>
            </div>
            <span className="text-sm font-medium text-blue-600">{s.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}