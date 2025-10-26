
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';
import AppNavbar from '@/app/Components/AppNavbar';

export default function AddMarketItemPage() {
  const supabase = createClient();
  const router = useRouter();

  const [itemName, setItemName] = useState('');
  const [ecoCost, setEcoCost] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const costAsNumber = parseInt(ecoCost, 10);

    if (!itemName || !ecoCost || !imageUrl) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (isNaN(costAsNumber) || costAsNumber <= 0) {
      setError('Eco Cost must be a positive number.');
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from('market_items')
      .insert([
        { 
          item_name: itemName,  // Column name in your DB
          eco_cost: costAsNumber, // Column name in your DB
          image_url: imageUrl   // Column name in your DB
        }
      ]);

    setLoading(false);

    if (insertError) {
      console.error('Error adding product:', insertError);
      setError(`Failed to add product: ${insertError.message}`);
    } else {
      setSuccess('Product added successfully!');
      
      // Clear the form
      setItemName('');
      setEcoCost('');
      setImageUrl('');

      router.refresh(); 
    }
  };

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Add New Marketplace Item
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="itemName" 
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label 
                htmlFor="ecoCost" 
                className="block text-sm font-medium text-gray-700"
              >
                Cost (in Eco Coins)
              </label>
              <input
                type="number"
                id="ecoCost"
                value={ecoCost}
                onChange={(e) => setEcoCost(e.target.value)}
                min="1"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label 
                htmlFor="imageUrl" 
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{success}</span>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 font-medium text-white bg-green-700 rounded-full hover:bg-green-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}