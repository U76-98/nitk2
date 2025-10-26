import React from 'react';
import Link from 'next/link';
import { FaCoins } from 'react-icons/fa';

export default function ProductCard({ product = {} }) {
  const { id, name, price, image } = product;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name || 'Product Image'} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={name}>
          {name || 'Unnamed Product'}
        </h3>

        <div className="flex items-center mb-3">
          <FaCoins className="text-yellow-600 mr-1" />
          <span className="text-xl font-bold text-green-700">{price !== undefined ? price : '--'} Eco Coins</span>
        </div>

        <Link
          href={`/checkout?product=${id}`}
          className="w-full mt-auto"
        >
          <button className="w-full py-2 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}