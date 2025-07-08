"use client";

import React, { useState, useEffect } from "react";
import WeatherWidget from "@/src/components/admin/weather-widget";
import NewsWidget from "@/src/components/admin/news-widget";

interface AdminStats {
  totalUsers: number;
  totalDashboards: number;
  activeUsers: number;
  systemStatus: string;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalDashboards: 0,
    activeUsers: 0,
    systemStatus: "Loading...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {loading ? "..." : stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Dashboards
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {loading ? "..." : stats.totalDashboards.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-lg transition-all duration-300 dark:bg-gray-800 hover:shadow-xl dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  System Status
                </p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.systemStatus}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 mx-auto mt-6 lg:grid-cols-2">
        <WeatherWidget />
        <NewsWidget />
      </div>
    </div>
  );
}
