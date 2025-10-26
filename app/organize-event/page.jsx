"use client";

import React, { useState, useEffect } from "react";
import AppNavbar from "../Components/AppNavbar";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCoins,
  FaCalendarAlt,
  FaClipboardList,
} from "react-icons/fa";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OrganizeEventPage() {
  const supabase = createClient();
  const router = useRouter();

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    participants: "",
    ecoCoins: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Load pending reports
  useEffect(() => {
    const loadReports = async () => {
      const { data: fetchedReports, error } = await supabase
        .from("citizen_reports")
        .select("id, location, reporter_name")
        .eq("status", "Pending");

      if (error) {
        console.error("Error fetching reports:", error);
        setError("Could not load pending reports.");
      } else {
        setReports(
          fetchedReports.map((r) => ({
            id: r.id,
            location: r.location,
            description: `Reported by ${r.reporter_name}`,
          }))
        );
      }
    };
    loadReports();
  }, [supabase]);

  // When user selects a report
  const handleReportSelect = (report) => {
    setSelectedReport(report);
    setFormData({
      ...formData,
      title: `Cleanup at ${report.location}`,
      description: `Event to clean up ${report.location}. ${report.description}.`,
    });
  };

  // Handle input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!formData.date) {
      setError("Please select a date and time.");
      setLoading(false);
      return;
    }

    const [date, time] = formData.date.split("T");
    const newEvent = {
      report_id: selectedReport.id,
      event_title: formData.title,
      event_date: date,
      event_time: time,
      event_location: selectedReport.location,
      participant_limit: parseInt(formData.participants, 10),
      description: formData.description,
      eco_coin_reward: parseInt(formData.ecoCoins, 10),
    };

    const { error: insertError } = await supabase
      .from("green_events")
      .insert(newEvent);

    setLoading(false);

    if (insertError) {
      setError(`Failed to create event: ${insertError.message}`);
    } else {
      setSuccess("✅ Event published successfully!");
      setSelectedReport(null);
      setFormData({
        title: "",
        date: "",
        participants: "",
        ecoCoins: "",
        description: "",
      });
      router.refresh();
      setTimeout(() => router.push("/green-champion-dashboard"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-inter text-gray-900">
      <AppNavbar />

      <main className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🌿 Organize New Event
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT PANEL */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1️⃣ Select a Report
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Link your event to a pending citizen report.
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-100">
                {error && !reports.length && (
                  <div className="text-center text-red-600 p-4">{error}</div>
                )}
                {reports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => handleReportSelect(report)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedReport?.id === report.id
                        ? "bg-green-100 border-green-600 shadow-md"
                        : "bg-gray-50 hover:bg-green-50 border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      {report.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full lg:w-2/3">
            <fieldset disabled={!selectedReport || loading} className="w-full">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6 transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    2️⃣ Event Details
                  </h3>
                  {selectedReport && (
                    <button
                      type="button"
                      onClick={() => setSelectedReport(null)}
                      disabled={loading}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                {!selectedReport && (
                  <div className="text-center text-gray-500 py-10 italic">
                    Please select a report from the left to begin.
                  </div>
                )}

                {selectedReport && (
                  <div className="space-y-5">
                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        <FaMapMarkerAlt className="inline-block mr-2 text-green-600" />
                        Location
                      </label>
                      <div className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg text-gray-800">
                        {selectedReport?.location}
                      </div>
                    </div>

                    {/* Event Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        <FaClipboardList className="inline-block mr-2 text-green-600" />
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    {/* Date & Time */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        <FaCalendarAlt className="inline-block mr-2 text-green-600" />
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    {/* Participants & Eco Coins */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                          <FaUsers className="inline-block mr-2 text-green-600" />
                          Participant Limit
                        </label>
                        <input
                          type="number"
                          name="participants"
                          value={formData.participants}
                          onChange={handleFormChange}
                          min="1"
                          placeholder="e.g., 50"
                          className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-1">
                          <FaCoins className="inline-block mr-2 text-green-600" />
                          Eco Coin Reward (per person)
                        </label>
                        <input
                          type="number"
                          name="ecoCoins"
                          value={formData.ecoCoins}
                          onChange={handleFormChange}
                          min="0"
                          placeholder="e.g., 100"
                          className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        Description / Instructions
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        rows="4"
                        placeholder="e.g., Bring gloves, water; bags will be provided."
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-green-500"
                      ></textarea>
                    </div>

                    {/* Alerts */}
                    {error && (
                      <div className="bg-red-100 border border-red-500 text-red-800 px-4 py-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="bg-green-100 border border-green-500 text-green-800 px-4 py-3 rounded-lg text-sm">
                        {success}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition duration-200 shadow-md disabled:opacity-50"
                    >
                      {loading ? "Publishing..." : "Publish Event"}
                    </button>
                  </div>
                )}
              </form>
            </fieldset>
          </div>
        </div>
      </main>
    </div>
  );
}
