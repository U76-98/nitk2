// This file is: app/Components/RequestGarbageCard.jsx
"use client"; // This is now a Client Component

import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function RequestGarbageCard() {
  // State for the form lives inside this component
  const [tonsRequested, setTonsRequested] = useState('');

  // Handle the form submission
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (tonsRequested > 0) {
      alert(`Request for ${tonsRequested} tons of garbage has been sent!`);
      // In a real app, you'd send this to the backend
      setTonsRequested(''); // Clear the input
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Request Garbage
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        If your plant is below capacity, you can request additional garbage shipments.
      </p>
      <form onSubmit={handleRequestSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-800">
            Quantity (in tons)
          </label>
          <input
            type="number"
            value={tonsRequested}
            onChange={(e) => setTonsRequested(e.target.value)}
            placeholder="e.g., 20"
            min="1"
            className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>
        <button 
          type="submit"
          className="w-full py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200"
        >
          <FaPlus className="inline-block mr-2" />
          Submit Request
        </button>
      </form>
    </div>
  );
}