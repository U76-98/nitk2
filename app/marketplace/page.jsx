import React from 'react';
import AppNavbar from '../Components/AppNavbar';
import ProductCard from '../Components/ProductCard'; // 1. Import the new component

// --- (Data fetching functions stay the same) ---
const getUserData = async () => {
  return {
    ecoCoins: 175,
  };
}

const getProducts = async () => {
  return [
    { id: 1, name: 'Recycled Paper Notebook', price: 25 },
    { id: 2, name: 'Bamboo Toothbrush Set', price: 40 },
    { id: 3, name: 'Local Farm Box Voucher', price: 150 },
    { id: 4, name: 'Reusable Glass Coffee Cup', price: 80 },
    // ... add your other products
  ];
}
// --- END MOCK DATA ---


export default async function MarketplacePage() {
  
  const user = await getUserData();
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-green-50 font-inter">

      <AppNavbar ecoCoins={user.ecoCoins} />

      <main className="container mx-auto px-4 lg:px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Rewards Marketplace
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 2. Use the new component inside the map loop */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      </main>
    </div>
  );
}