import React from 'react';

export default function TrainingCard({ progress = {} }) {
  const percentage = (progress.completed / progress.total) * 100 || 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Training</h2>
      <p className="text-gray-600 mb-3">Complete your compulsory courses.</p>
      <div className="mb-2">
        <span className="text-sm font-semibold text-gray-700">
          {progress.completed || 0} of {progress.total || 0} Courses Completed
        </span>
        <div className="w-full bg-green-100 rounded-full h-2.5 mt-1">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${percentage}%` }}>
          </div>
        </div>
      </div>
      <button className="w-full mt-4 py-2 px-4 bg-green-100 text-green-800 font-medium rounded-full hover:bg-green-200 transition duration-200">
        Continue Training
      </button>
    </div>
  );
}