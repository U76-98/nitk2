import React from 'react';
import { FaBell } from 'react-icons/fa';

export default function NotificationsCard({ notifications = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FaBell className="text-yellow-500" /> Notifications
      </h3>
      <ul className="space-y-3">
        {notifications.map(n => (
          <li key={n.id} className="pb-3 border-b border-gray-100 last:border-b-0">
            <p className="text-sm text-gray-700">{n.text}</p>
            <span className="text-xs text-gray-400">{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}