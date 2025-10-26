import React from 'react';
import Link from 'next/link';

export default function ReportDumpingCard({ user }) {
  
  const reportUrl = `/report-new?name=${encodeURIComponent(user?.name || '')}&phone=${encodeURIComponent(user?.phone || '')}`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm md:col-span-2 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Report Illegal Dumping
      </h2>
      <p className="text-gray-600 mb-4">
        Spotted a violation? Use our secure photo upload to report it.
      </p>
      
      <Link href={reportUrl} passHref>
        <button className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition duration-200">
          Create New Report
        </button>
      </Link>
    </div>
  );
}