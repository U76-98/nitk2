// This file is: app/Components/ReviewOrderCard.jsx
"use client"; 
import React from 'react';

// 1. Accept the new 'name' and 'email' props
export default function ReviewOrderCard({ user, name, email, totalCost, onBackStep }) {
  const { address = {} } = user;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Review Your Order
      </h3>
      
      {/* Shipping Summary */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700">Shipping To:</h4>
        <div className="text-gray-600 text-sm pl-4">
          {/* 2. Use the new props for name and email */}
          <p className="font-semibold">{name}</p>
          <p>{email}</p>
          <hr className="my-1 border-gray-200" />
          {/* Use the 'user' prop for the address */}
          <p>{address.street}</p>
          <p>{address.city}, {address.zip}</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700">Payment Method:</h4>
        <div className="text-gray-600 text-sm pl-4">
          <p>Eco Coins (Balance: {user.ecoCoins})</p>
        </div>
      </div>

      <hr className="my-4" />
      
      {/* (Action Buttons stay the same) */}
      <div className="flex flex-col gap-4">
        <button 
          className="w-full py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200"
        >
          Confirm & Spend {totalCost} Coins
        </button>
        <button 
          onClick={onBackStep}
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}