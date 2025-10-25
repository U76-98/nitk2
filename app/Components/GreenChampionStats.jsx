// This file is: app/Components/GreenChampionStats.jsx
import React from 'react';
import { 
  FaUsers, FaHandsHelping, FaTrash, FaCalendarAlt, FaCheckCircle 
} from 'react-icons/fa';

export default function GreenChampionStats({ stats = {} }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaUsers className="text-2xl text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">People Trained</p>
          <p className="text-2xl font-bold text-gray-800">{stats.peopleTrained || 0}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaHandsHelping className="text-2xl text-green-500" />
        <div>
          <p className="text-sm text-gray-500">SHG Trained</p>
          <p className="text-2xl font-bold text-gray-800">{stats.shgTrained || 0}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaTrash className="text-2xl text-yellow-600" />
        <div>
          <p className="text-sm text-gray-500">Garbage Collected</p>
          <p className="text-2xl font-bold text-gray-800">{stats.garbageCollected || 0} <span className="text-lg">tons</span></p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaCalendarAlt className="text-2xl text-purple-500" />
        <div>
          <p className="text-sm text-gray-500">Events Conducted</p>
          <p className="text-2xl font-bold text-gray-800">{stats.eventsConducted || 0}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center space-x-4">
        <FaCheckCircle className="text-2xl text-red-500" />
        <div>
          <p className="text-sm text-gray-500">Reports Resolved</p>
          <p className="text-2xl font-bold text-gray-800">{stats.reportsResolved || 0}</p>
        </div>
      </div>
    </div>
  );
}