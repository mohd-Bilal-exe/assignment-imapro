"use client";

import { useState } from "react";
import ComposeTab from "./components/ComposeTab";
import ReportsTab from "./components/ReportsTab";
import ConfigsTab from "./components/ConfigsTab";
import { Info, Mail, Settings, SquarePen } from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("compose");

  const tabs = [
    { id: "compose", label: "Compose", icon: <SquarePen className="inline-block mr-1" /> },
    { id: "reports", label: "Reports", icon: <Info className="inline-block mr-1" /> },
    { id: "configs", label: "Configs", icon: <Settings className="inline-block mr-1" /> },
  ];

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Navigation */}
      <nav className="top-0 z-50 sticky bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4 border-gray-200 dark:border-slate-800 border-b">
        <div className="flex md:flex-row flex-col justify-between items-center gap-4 mx-auto container">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <Mail />
            </div>
            <h1 className="bg-clip-text bg-linear-to-r from-blue-600 dark:from-blue-400 to-indigo-600 dark:to-indigo-400 font-bold text-transparent text-2xl">
              BulkSend.io
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 p-1.5 rounded-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-slate-700/50"
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex justify-center items-center bg-linear-to-tr from-green-400 to-emerald-600 shadow-lg rounded-full ring-2 ring-white dark:ring-slate-800 w-8 h-8 font-bold text-white text-xs">
              JS
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="mx-auto p-4 md:p-8 max-w-7xl container">
        <div className="slide-in-from-bottom-4 animate-in duration-500 fade-in">
          {activeTab === "compose" && <ComposeTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "configs" && <ConfigsTab />}
        </div>
      </div>
    </div>
  );
}
