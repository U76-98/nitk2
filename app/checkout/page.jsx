"use client"; 

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 

import AppNavbar from '../Components/AppNavbar';
import UserDetailsCard from '../Components/UserDetailsCard';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import ReviewOrderCard from '../Components/ReviewOrderCard';

const allProducts = [
  { id: 1, name: 'Recycled Paper Notebook', price: 25 },
];
const fetchProductData = async (id) => {};
const fetchUserData = async () => {
  return {
    name: 'Jane Citizen',
    email: 'jane.citizen@example.com',
    ecoCoins: 175,
    address: {
      street: '123 Eco Lane',
      city: 'Greenfield',
      zip: '12345',
      country: 'EcoLand'
    }
  };
};

export default function CheckoutPage() {
  
  const [step, setStep] = useState(1);
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  useEffect(() => {
    const loadData = async () => {
      if (productId) {
        const [userData, productData] = await Promise.all([
          fetchUserData(),
          fetchProductData(productId)
        ]);
        setUser(userData);
        setProduct(productData);
        
        setName(userData.name);
        setEmail(userData.email);
      }
    };
    loadData();
  }, [productId]);

  const totalCost = (product?.price || 0);
  const balanceAfter = (user?.ecoCoins || 0) - totalCost;

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar ecoCoins={user.ecoCoins} />

      <main className="container mx-auto px-6 py-8">
        
        <div className="text-xl font-semibold text-gray-800 mb-4">
          Checkout
        </div>
        <div className="flex border-b border-gray-300 mb-6">
          <div className={`py-2 px-4 ${step === 1 ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}>
            1. Details & Address
          </div>
          <div className={`py-2 px-4 ${step === 2 ? 'border-b-2 border-green-700 text-green-700' : 'text-gray-500'}`}>
            2. Review & Confirm
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-2/3 space-y-6">
            
            {step === 1 && (
              <UserDetailsCard 
                user={user}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                onNextStep={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <ReviewOrderCard
                user={user}
                name={name}
                email={email}
                totalCost={totalCost}
                onBackStep={() => setStep(1)}
              />
            )}

          </div>

          <div className="w-full lg:w-1/3">
            <OrderSummaryCard 
              product={product} 
              totalCost={totalCost} 
              balanceAfter={balanceAfter}
              isFinalStep={step === 2}
            />
          </div>

        </div>
      </main>
    </div>
  );
}