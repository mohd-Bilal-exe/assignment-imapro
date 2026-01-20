"use client";

import { useState, useEffect } from "react";

export default function ConfigsTab() {
  const [configs, setConfigs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);

  useEffect(() => {
    // Mock Load
    setConfigs([
      {
        id: 1,
        name: "Gmail Personal",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        user: "me@gmail.com",
        fromEmail: "me@gmail.com",
        fromName: "John",
        isDefault: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Work Outlook",
        host: "smtp.outlook.com",
        port: 587,
        secure: true,
        user: "work@corp.com",
        fromEmail: "work@corp.com",
        fromName: "John Doe",
        isDefault: false,
        createdAt: new Date().toISOString(),
      },
    ] as any);
  }, []);

  const inputClasses =
    "w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-slate-700 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 dark:text-white transition-all";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 dark:text-white text-xl">⚙️ SMTP Gateways</h3>
        <button className="bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 shadow-lg px-5 py-2.5 rounded-xl font-medium text-white transition-all">
          + Add Gateway
        </button>
      </div>

      <div className="gap-6 grid md:grid-cols-2">
        {configs.map((config: any) => (
          <div
            key={config.id}
            className="group relative bg-white dark:bg-slate-800 shadow-sm hover:shadow-md p-6 border border-gray-100 hover:border-blue-200 dark:border-slate-700 dark:hover:border-slate-600 rounded-3xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`p-3 rounded-2xl ${config.isDefault ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-gray-400"}`}
                >
                  {config.isDefault ? "★" : "✉"}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{config.name}</h4>
                  <p className="font-mono text-gray-500 dark:text-gray-400 text-xs">
                    {config.host}:{config.port}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => {
                    setEditingConfig(config);
                    setShowEditModal(true);
                  }}
                  className="hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-lg text-gray-500 dark:text-gray-400"
                >
                  ✏️
                </button>
                <button className="hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg text-red-500">
                  🗑️
                </button>
              </div>
            </div>

            <div className="gap-y-2 grid grid-cols-2 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-xl text-gray-600 dark:text-gray-400 text-sm">
              <span>Username:</span>{" "}
              <span className="font-mono text-gray-900 dark:text-gray-200 text-right">
                {config.user}
              </span>
              <span>Security:</span>{" "}
              <span className="text-right">{config.secure ? "🔒 TLS/SSL" : "⚠️ None"}</span>
              <span>Sender:</span> <span className="text-right truncate">{config.fromName}</span>
            </div>

            {!config.isDefault && (
              <button className="hover:bg-gray-100 dark:hover:bg-slate-700 mt-4 py-2 rounded-xl w-full font-medium text-gray-500 dark:text-gray-400 text-sm transition-colors">
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modern Modal */}
      {showEditModal && editingConfig && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 shadow-2xl p-8 border border-gray-100 dark:border-slate-700 rounded-3xl w-full max-w-lg animate-in duration-200 zoom-in-95">
            <h3 className="mb-6 font-bold text-gray-900 dark:text-white text-2xl">Edit Gateway</h3>

            <div className="space-y-4">
              <div>
                <label className="ml-1 font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">
                  Configuration Name
                </label>
                <input
                  type="text"
                  defaultValue={editingConfig.name}
                  className={`${inputClasses} mt-1`}
                />
              </div>

              <div className="gap-4 grid grid-cols-3">
                <div className="col-span-2">
                  <label className="ml-1 font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">
                    Host
                  </label>
                  <input
                    type="text"
                    defaultValue={editingConfig.host}
                    className={`${inputClasses} mt-1`}
                  />
                </div>
                <div>
                  <label className="ml-1 font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">
                    Port
                  </label>
                  <input
                    type="number"
                    defaultValue={editingConfig.port}
                    className={`${inputClasses} mt-1`}
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div>
                  <label className="ml-1 font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">
                    Username
                  </label>
                  <input
                    type="text"
                    defaultValue={editingConfig.user}
                    className={`${inputClasses} mt-1`}
                  />
                </div>
                <div>
                  <label className="ml-1 font-bold text-gray-500 dark:text-gray-400 text-xs uppercase">
                    Password
                  </label>
                  <input type="password" placeholder="••••••" className={`${inputClasses} mt-1`} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-white transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 px-6 py-3 rounded-xl font-bold text-gray-700 dark:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
