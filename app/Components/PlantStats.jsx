import React from 'react';
import { FaRecycle, FaChartBar, FaTruck } from 'react-icons/fa';

export default function PlantStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaRecycle className="text-2xl text-green-500" />
        <div>
          <p className="text-sm text-gray-500">Processed Today</p>
          <p className="text-2xl font-bold text-gray-800">{stats.processedToday || 0} <span className="text-lg">tons</span></p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaChartBar className="text-2xl text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Current Capacity</p>
          <p className="text-2xl font-bold text-gray-800">{stats.currentCapacity || 0}% Full</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaTruck className="text-2xl text-yellow-600" />
        <div>
          <p className="text-sm text-gray-500">Inbound Shipments Today</p>
          <p className="text-2xl font-bold text-gray-800">{stats.inboundToday || 0}</p>
        </div>
      </div>
    </div>
  );
}