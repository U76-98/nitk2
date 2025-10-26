import React from 'react';

export default function OrderSummaryCard({ product, totalCost, balanceAfter, isFinalStep }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-28">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Order Summary
      </h3>
      
      {product ? (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">{product.name}</span>
          <span className="font-medium text-gray-800">{product.price} Coins</span>
        </div>
      ) : (
        <p className="text-red-600">Product not found.</p>
      )}
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600">Shipping</span>
        <span className="font-medium text-green-700">FREE</span>
      </div>
      
      <hr className="my-3 border-gray-200" />
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-800">Total</span>
        <span className="text-lg font-bold text-green-700">{totalCost} Coins</span>
      </div>
      
      {isFinalStep && (
        <div className="text-sm text-gray-600 mb-5">
          Your new balance will be: 
          <span className="font-bold text-gray-800"> {balanceAfter} Coins</span>
        </div>
      )}
      
    </div>
  );
}