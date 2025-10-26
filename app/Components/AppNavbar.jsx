import React from 'react';
import Link from 'next/link';
import { FaCoins } from 'react-icons/fa';

export default function AppNavbar({ ecoCoins }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/citizen-dashboard">
          <h1 className="text-2xl font-bold text-green-800 cursor-pointer">
            EcoConnect
          </h1>
        </Link>
        
        {ecoCoins !== undefined && (
          <div className="flex items-center space-x-2">
            <FaCoins className="text-yellow-600 text-xl" />
            <span className="font-semibold text-lg text-gray-800">{ecoCoins}</span>
          </div>
        )}

      </nav>
    </header>
  );
}