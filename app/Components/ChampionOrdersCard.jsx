import React from 'react';
import { FaBoxOpen } from 'react-icons/fa';

export default function ChampionOrdersCard({ orders = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaBoxOpen /> Marketplace Orders
        </h3>
          <button className="text-sm text-blue-600 hover:underline">View All</button>
      </div>
      <ul className="space-y-3">
        {orders.map(o => (
          <li key={o.id} className="pb-3 border-b border-gray-100 last:border-b-0">
            <p className="text-sm font-semibold text-gray-700">{o.item} (x{o.qty})</p>
            <span className="text-xs text-gray-500">For: {o.user} - ID: {o.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}