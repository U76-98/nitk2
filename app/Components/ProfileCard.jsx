import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCoins } from 'react-icons/fa';

export default function ProfileCard({ user = {} }) {
  const { name, ecoCoins, email, phone, address = {} } = user;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center">
          <FaUser className="text-green-800 text-3xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name || 'Name not available'}</h3>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-gray-600">Your Balance</p>
        <div className="flex items-center mt-1">
            <FaCoins className="text-yellow-600 text-3xl mr-2" />
            <span className="text-3xl font-bold text-green-700">{ecoCoins !== undefined ? ecoCoins : '--'} Eco Coins</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-800 border-b pb-2">
          Contact Information
        </h4>
        
        <div className="flex items-center">
          <FaEnvelope className="text-gray-500 w-5 mr-3 flex-shrink-0" />
          <span className="text-gray-700 break-all">{email || 'Email not available'}</span>
        </div>
        
        <div className="flex items-center">
          <FaPhone className="text-gray-500 w-5 mr-3 flex-shrink-0" />
          <span className="text-gray-700">{phone || 'Phone not available'}</span>
        </div>

        <div className="flex items-start">
          <FaMapMarkerAlt className="text-gray-500 w-5 mr-3 mt-1 flex-shrink-0" />
          <div className="text-gray-700">
            <p>{address.street || 'Street not available'}</p>
            <p>{address.city || 'City not available'}{address.zip ? `, ${address.zip}` : ''}</p>
            <p>{address.country || 'Country not available'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}