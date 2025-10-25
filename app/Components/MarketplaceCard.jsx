import React from 'react';
import Link from 'next/link';

export default function MarketplaceCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Marketplace</h2>
      <p className="text-gray-600 mb-4">
        Spend your Eco Coins on rewards and vouchers.
      </p>

      <Link href="/marketplace" passHref>
        <button className="w-full py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200">
          Browse the Market
        </button>
      </Link>
    </div>
  );
}