// This file is: app/Components/ArrivalsCard.jsx
import React from 'react';

export default function ArrivalsCard({ arrivals = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Inbound Garbage Arrivals
      </h3>
      <div className="space-y-3">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 gap-4 text-sm font-semibold text-gray-500 mb-2 px-3">
          <span>Vehicle / Source</span>
          <span>ETA</span>
          <span>Quantity (tons)</span>
          <span>Status</span>
        </div>
        {/* Arrival List */}
        <ul className="space-y-3">
          {arrivals.map(arrival => (
            <li key={arrival.id} className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {/* Column 1: Source */}
              <div className="font-semibold text-gray-800">
                {arrival.vehicle}
                <span className="block md:hidden text-sm font-normal text-gray-500">{arrival.from}</span>
              </div>
              {/* Column 2: ETA */}
              <div className="font-medium text-gray-700">
                <span className="md:hidden text-gray-500 text-sm">ETA: </span>
                {arrival.eta}
              </div>
              {/* Column 3: Quantity */}
              <div className="font-medium text-gray-700">
                <span className="md:hidden text-gray-500 text-sm">Qty: </span>
                {arrival.qty}
              </div>
              {/* Column 4: Status */}
              <div className="text-left md:text-left">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  arrival.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  arrival.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {arrival.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}