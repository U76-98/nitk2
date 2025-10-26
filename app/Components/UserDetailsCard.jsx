
"use client"; 
import React from 'react';

export default function UserDetailsCard({ user = {}, name, setName, email, setEmail, onNextStep }) {
  
  
  const { address = {} } = user;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        1. User Details & Address
      </h3>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Your Details</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-800">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-800 mb-2">Shipping Address</h4>
        <div className="border rounded-xl p-4 text-gray-700 bg-gray-50">
          <p>{address.street}</p>
          <p>{address.city}, {address.zip}</p>
          <p>{address.country}</p>
        </div>
        <button className="mt-2 text-sm text-blue-600 hover:underline">
          Change address
        </button>
      </div>

      <button 
        onClick={onNextStep}
        className="w-full mt-6 py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200"
      >
        Continue to Review
      </button>
    </div>
  );
}