// This file is: app/Components/PendingReportsCard.jsx
import React from 'react';

export default function PendingReportsCard({ reports = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Reports</h3>
      <ul className="space-y-2">
        {reports.map(r => (
          <li key={r.id} className="text-sm text-gray-700">
            <span className="font-semibold">{r.location}</span> - <span className="text-red-600">{r.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}