

import React from 'react';
import AppNavbar from '../Components/AppNavbar';
import ProductCard from '../Components/ProductCard';
import { createClient } from '@/app/lib/supabase/server';

async function getMarketplaceData() {
  const supabase = createClient();

  const { data: productsData, error: productsError } = await supabase
    .from('market_items')
    .select('id, item_name, eco_cost, image_url');

  if (productsError) {
    console.error('Error fetching products:', productsError.message);
    return { user: { ecoCoins: 0 }, products: [] };
  }

  const products = productsData.map(product => ({
    id: product.id,
    name: product.item_name,  // Map from 'item_name'
    price: product.eco_cost,  // Map from 'eco_cost'
    image: product.image_url  // Map from 'image_url'
  }));
  
  const userDetails = { ecoCoins: 0 };

  return { user: userDetails, products };
}


export default async function MarketplacePage() {
  
  const { user, products } = await getMarketplaceData();

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      
      <AppNavbar ecoCoins={user.ecoCoins} />

      <main className="container mx-auto px-4 lg:px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Rewards Marketplace
        </h2>
        
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No items available in the marketplace right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}