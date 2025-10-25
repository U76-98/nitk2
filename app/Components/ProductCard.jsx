import React from 'react';
import Link from 'next/link';
import { FaCoins } from 'react-icons/fa';

export default function ProductCard({ product = {} }) {
  // Use a default object to prevent errors
  const { id, name, price } = product;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-green-100 flex items-center justify-center">
        <span className="text-gray-500">Image</span>
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {name}
        </h3>
        
        {/* Price (Eco Coins) */}
        <div className="flex items-center mb-3">
          <FaCoins className="text-yellow-600 mr-1" />
          <span className="text-xl font-bold text-green-700">{price} Eco Coins</span>
        </div>

        <Link 
          href={`/checkout?product=${id}`}
          className="w-full mt-auto" // mt-auto pushes the button to the bottom
        >
          <button className="w-full py-2 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}