import React from 'react';

export default function RoleSelectionPage({ onSelectRole }) {
  const roles = ['Citizen', 'Green Champion', 'Processing Plant'];

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Select Your Role
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please choose how you'd like to log in.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onSelectRole(role)}
            className="w-full px-4 py-3 text-lg font-semibold text-center text-blue-700 bg-white border-2 border-blue-600 rounded-lg shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}
