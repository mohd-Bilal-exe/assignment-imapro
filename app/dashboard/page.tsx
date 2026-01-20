'use client';

import { useState } from 'react';
import ComposeTab from './components/ComposeTab';
import ReportsTab from './components/ReportsTab';
import ConfigsTab from './components/ConfigsTab';
import { Info, Mail, Settings, SquarePen, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('compose');

  const tabs = [
    { id: 'compose', label: 'Compose', icon: <SquarePen className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <Info className="w-4 h-4" /> },
    { id: 'configs', label: 'Configs', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-linear-to-br from-slate-50 dark:from-slate-950 to-slate-100 dark:to-slate-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="top-0 z-50 sticky bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-lg border-gray-200 dark:border-slate-800 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 container">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="hidden sm:block bg-clip-text bg-linear-to-r from-blue-600 to-blue-700 font-bold text-transparent text-2xl">
                BulkSend.imapro
              </h1>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-full w-full sm:w-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-3xl text-sm font-medium transition-all duration-200
                    ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-md'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex justify-center items-center bg-linear-to-br from-emerald-400 to-emerald-600 shadow-lg rounded-full w-8 h-8 font-bold text-white text-xs">
                JS
              </div>
              <button className="hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 dark:text-gray-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl container">
        <div className="animate-slide-in-up">
          {activeTab === 'compose' && <ComposeTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'configs' && <ConfigsTab />}
        </div>
      </div>
    </div>
  );
}
