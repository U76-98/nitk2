"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

const ROLE_CONFIG = {
  Citizen: { title: "Citizen Login" },
  "Green Champions": { title: "Green Champion Login" },
  "Processing Plants": { title: "Processing Plant Login" },
  default: { title: "Login" },
};

export default function LoginPage({ role }) {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = ROLE_CONFIG[role] || ROLE_CONFIG.default;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      console.log("Login successful:", data);
      router.push("/citizen-dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login Error:", error);
      if (error.message.includes("Invalid login credentials")) {
        setError("Incorrect email or password. Please try again.");
      } else {
        setError(error.message || "An unexpected error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-green-100 rounded-3xl shadow-lg p-8 animate-fade-in">
        
        <h1 className="text-center text-4xl font-extrabold text-green-700 mb-2 tracking-tight">
          EcoConnect
        </h1>
        <h2 className="text-center text-lg text-gray-700 font-medium mb-8">
          {config.title}
        </h2>

        {error && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm"
            role="alert"
          >
            <strong className="font-semibold">Error:</strong> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 font-semibold rounded-xl transition duration-200 text-white ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-700 hover:bg-green-800 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-700 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
