// This file is: app/Components/ChampionEventsCard.jsx
import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function ChampionEventsCard({ events = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Events</h3>
        <Link href="/organize-event">
          <button className="flex items-center gap-2 py-2 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800">
            <FaPlus /> Organise Event
          </button>
        </Link>
      </div>
      <ul className="space-y-3">
        {events.map(e => (
          <li key={e.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700">{e.name}</span>
            <span className="text-sm text-gray-500">{e.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}