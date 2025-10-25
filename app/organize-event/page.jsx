// This file is: app/organize-event/page.jsx
"use client"; // This MUST be a Client Component for the interactive form

import React, { useState, useEffect } from 'react';
import AppNavbar from '../Components/AppNavbar'; // Reusing our navbar
import { 
  FaMapMarkerAlt, FaUsers, FaCoins, FaCalendarAlt, 
  FaClipboardList, FaInfoCircle 
} from 'react-icons/fa';

// --- MOCK DATA FETCHING ---
// In a real app, this would fetch from your API
const getPendingReports = async () => {
  return [
    { id: 'R-501', location: 'Ward 5, Near Market', description: 'Large pile of construction debris.' },
    { id: 'R-502', location: 'Ward 2, Highway side', description: 'Plastic and food waste.' },
    { id: 'R-503', location: 'Panambur Beach (North End)', description: 'Recent tourist litter.' },
  ];
}
// --- END MOCK DATA ---


export default function OrganizeEventPage() {
  
  // State for the list of reports
  const [reports, setReports] = useState([]);
  
  // State to track which report is selected
  const [selectedReport, setSelectedReport] = useState(null);
  
  // State for all the form inputs
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    participants: '',
    ecoCoins: '',
    description: '',
  });

  // 1. Fetch the list of pending reports when the page loads
  useEffect(() => {
    const loadReports = async () => {
      const fetchedReports = await getPendingReports();
      setReports(fetchedReports);
    };
    loadReports();
  }, []); // Empty array means this runs once on load

  // 2. Handle what happens when a report is clicked
  const handleReportSelect = (report) => {
    setSelectedReport(report);
    // Pre-fill the form with data from the report
    setFormData({
      ...formData,
      title: `Cleanup at ${report.location}`, // Suggest a title
      description: `Event to clean up: ${report.description}`, // Pre-fill description
    });
  };
  
  // 3. Update form state as user types
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 4. Handle the final form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted!");
    console.log("Based on Report:", selectedReport);
    console.log("Event Details:", formData);
    // In a real app, you would send this to your backend
    alert('Event Published! (Check console for details)');
  };

  return (
    <div className="min-h-screen bg-green-50 font-inter">
      <AppNavbar />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Organize New Event
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- LEFT COLUMN: Step 1 --- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                1. Select a Report
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Events must be linked to a pending report.
              </p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {reports.map(report => (
                  <button 
                    key={report.id}
                    onClick={() => handleReportSelect(report)}
                    className={`w-full text-left p-4 rounded-lg transition duration-200 ${
                      selectedReport?.id === report.id
                        ? 'bg-green-100 border-2 border-green-700'
                        : 'bg-gray-50 hover:bg-gray-100 border'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{report.location}</p>
                    <p className="text-sm text-gray-600 truncate">{report.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Step 2 --- */}
          <div className="w-full lg:w-2/3">
            {/* The 'fieldset' disables the form until a report is selected */}
            <fieldset disabled={!selectedReport} className="w-full">
              <form 
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    2. Event Details
                  </h3>
                  {selectedReport && (
                    <button 
                      type="button" 
                      onClick={() => setSelectedReport(null)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {!selectedReport && (
                  <div className="text-center text-gray-500 p-8">
                    Please select a report from the left to begin.
                  </div>
                )}
                
                {/* This content only shows AFTER a report is selected */}
                <div className={`${selectedReport ? 'block' : 'hidden'}`}>
                  {/* Location (from report, not editable) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800">Location (from Report)</label>
                    <div className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-lg bg-gray-100 text-gray-700">
                      <FaMapMarkerAlt className="inline-block mr-2 text-gray-500" />
                      {selectedReport?.location}
                    </div>
                  </div>
                  
                  {/* Event Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800">Event Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  {/* Date & Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800">Date & Time</label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                      required
                    />
                  </div>
                  
                  {/* Participant Limit & Eco Coins */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800">Participant Limit</label>
                      <input
                        type="number"
                        name="participants"
                        value={formData.participants}
                        onChange={handleFormChange}
                        placeholder="e.g., 50"
                        className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800">Eco Coin Reward (per person)</label>
                      <input
                        type="number"
                        name="ecoCoins"
                        value={formData.ecoCoins}
                        onChange={handleFormChange}
                        placeholder="e.g., 100"
                        className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-800">Description / Instructions</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="4"
                      placeholder="e.g., Please bring gloves and water. Bags will be provided."
                      className="w-full mt-1 px-3 py-2 border border-gray-500 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-3 px-4 bg-green-700 text-white font-medium rounded-full hover:bg-green-800 transition duration-200"
                  >
                    Publish Event
                  </button>
                </div>

              </form>
            </fieldset>
          </div>
        </div>
      </main>
    </div>
  );
}