import React from 'react';
import { FaTruck } from 'react-icons/fa';

export default function GarbageProcessingCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Garbage Processing</h3>
      <p className="text-gray-600 mb-4">Coordinate and send collected waste to processing plants.</p>
      
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 text-white font-medium rounded-full hover:bg-gray-900">
          <FaTruck /> Send to Processing Plant
        </button>
    </div>
  );
}