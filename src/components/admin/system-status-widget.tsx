"use client";

import React from "react";
import { CheckCircle, Activity, Server } from "lucide-react";

interface SystemStatusWidgetProps {
  minimal?: boolean;
}

const SystemStatusWidget = ({ minimal = false }: SystemStatusWidgetProps) => {
  const systemStatus = "Online";
  const uptime = "99.9%";
  const lastCheck = "2 min ago";

  if (minimal) {
    return (
      <div className="flex flex-col justify-between p-4 w-full h-32 text-white bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-2xl shadow-lg">
        <div className="flex items-center">
          <Server size={16} className="mr-2 text-white/80" />
          <span className="text-sm font-semibold">System Status</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center">
            <CheckCircle size={20} className="mr-2 text-green-300" />
            <span className="text-lg font-bold">{systemStatus}</span>
          </div>
          <div className="flex justify-between items-center text-white/70">
            <span className="text-xs">Uptime: {uptime}</span>
            <span className="text-xs">{lastCheck}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden relative p-6 text-white bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 rounded-3xl shadow-2xl transition-all duration-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 dark:bg-white/5"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5 dark:bg-white/10"></div>

        <div className="flex relative z-10 justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Server size={20} className="text-white/80 dark:text-gray-300" />
            <span className="text-lg font-semibold text-white/90 dark:text-gray-200">
              System Status
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity size={16} className="text-white/70 dark:text-gray-400" />
            <span className="text-sm text-white/70 dark:text-gray-400">
              Live
            </span>
          </div>
        </div>

        <div className="relative z-10 mb-6">
          <div className="flex items-center space-x-4">
            <div className="transition-transform duration-300 transform hover:scale-110">
              <CheckCircle
                size={64}
                className="text-green-300 dark:text-green-400"
              />
            </div>
            <div>
              <div className="mb-1 text-4xl font-bold text-white dark:text-gray-100">
                {systemStatus}
              </div>
              <div className="mb-1 text-lg font-medium text-white/90 dark:text-gray-200">
                All systems operational
              </div>
              <div className="text-sm text-white/70 dark:text-gray-400">
                Uptime: {uptime}
              </div>
            </div>
          </div>
        </div>

        <div className="grid relative z-10 grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl backdrop-blur-sm transition-colors duration-300 bg-white/15 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Activity
                size={18}
                className="text-green-300 dark:text-green-400"
              />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Response Time
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              45ms
            </div>
          </div>

          <div className="p-3 rounded-xl backdrop-blur-sm transition-colors duration-300 bg-white/15 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Server size={18} className="text-blue-300 dark:text-blue-400" />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                CPU Usage
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              23%
            </div>
          </div>

          <div className="p-3 rounded-xl backdrop-blur-sm transition-colors duration-300 bg-white/15 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <CheckCircle
                size={18}
                className="text-purple-300 dark:text-purple-400"
              />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Services
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              12/12
            </div>
          </div>

          <div className="p-3 rounded-xl backdrop-blur-sm transition-colors duration-300 bg-white/15 dark:bg-white/10 hover:bg-white/20 dark:hover:bg-white/15">
            <div className="flex items-center mb-2 space-x-2">
              <Activity
                size={18}
                className="text-orange-300 dark:text-orange-400"
              />
              <span className="text-sm font-medium text-white/90 dark:text-gray-200">
                Memory
              </span>
            </div>
            <div className="text-xl font-semibold text-white dark:text-gray-100">
              67%
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-4 mt-6 border-t border-white/20 dark:border-white/10">
          <div className="flex justify-between items-center text-sm">
            <span className="text-white/70 dark:text-gray-400">
              Last updated: {lastCheck}
            </span>
            <button className="px-3 py-1 text-xs font-medium text-white rounded-full transition-colors bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusWidget;
