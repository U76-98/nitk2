"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import AppNavbar from "@/app/Components/AppNavbar";

export default function ReportNewPage() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [location, setLocation] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !phone || !location || !photoUrl) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from("citizen_reports")
      .insert([
        {
          reporter_name: name,
          reporter_phone: phone,
          location: location,
          photo_url: photoUrl,
        },
      ]);

    setLoading(false);

    if (insertError) {
      console.error("Error submitting report:", insertError);
      setError(`Failed to submit report: ${insertError.message}`);
    } else {
      setSuccess("Report submitted successfully! Thank you.");
      setName("");
      setPhone("");
      setLocation("");
      setPhotoUrl("");

      router.refresh();
      setTimeout(() => router.push("/citizen-dashboard"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 font-inter text-gray-900">
      <AppNavbar ecoCoins={0} />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-black mb-6">
          Create New Report
        </h2>

        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Reporter Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              />
            </div>

            {/* Reporter Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-900"
              >
                Your Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              />
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-900"
              >
                Location (Ward)
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              >
                <option value="" disabled>
                  Select a ward
                </option>
                <option value="Ward 1">Ward 1</option>
                <option value="Ward 2">Ward 2</option>
                <option value="Ward 3">Ward 3</option>
                <option value="Ward 4">Ward 4</option>
                <option value="Ward 5">Ward 5</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="photoUrl"
                className="block text-sm font-semibold text-gray-900"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoUrl"
                placeholder="https://example.com/image.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600"
              />
            </div>

            {/* Alerts */}
            {error && (
              <div
                className="bg-red-100 border border-red-500 text-red-800 px-4 py-3 rounded-lg"
                role="alert"
              >
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div
                className="bg-green-100 border border-green-600 text-green-800 px-4 py-3 rounded-lg"
                role="alert"
              >
                <span>{success}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-400 rounded-md hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 font-semibold rounded-md transition duration-200 ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
                }`}
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
