'use client';

import { Info, Lock, Mail, Pencil, Star, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ConfigsTab() {
  const [loading, setLoading] = useState(true);
  const [configs, setConfigs] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/dashboard/configs');
        const data = await res.json();
        setLoading(false);
        setConfigs(data?.configs || []);
      } catch (err) {
        console.error('Failed to load configs', err);
      }
    };

    load();
  }, []);

  const inputClasses =
    'w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-gray-900 dark:text-white transition-all';
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full"> Loading... </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-2xl">
          <span className="text-2xl">⚙️</span> SMTP Gateways
        </h3>
        <button className="justify-center w-full sm:w-auto btn-primary">
          <span className="mr-2 text-lg">+</span> Add Gateway
        </button>
      </div>

      <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
        {configs.map((config: any) => (
          <div
            key={config.id}
            className="group relative bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg p-6 border border-gray-100 hover:border-blue-300 dark:border-slate-700 dark:hover:border-blue-600 rounded-2xl transition-all hover:-translate-y-1 duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-1 items-center gap-3">
                <div
                  className={`p-3 rounded-xl text-xl ${config.isDefault ? 'bg-linear-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-900/50 text-amber-600 dark:text-amber-400' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'}`}
                >
                  {config.isDefault ? <Star fill="oklch(82.8% 0.189 84.429)" /> : <Mail />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 dark:text-white text-base truncate">
                    {config.name}
                  </h4>
                  <p className="font-mono text-gray-500 dark:text-gray-400 text-xs truncate">
                    {config.host}:{config.port}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 ml-2 transition-opacity">
                <button
                  onClick={() => {
                    setEditingConfig(config);
                    setShowEditModal(true);
                  }}
                  className="hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-lg text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-400 transition-colors"
                  title="Edit"
                >
                  <Pencil />
                </button>
                <button
                  className="hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg text-gray-500 hover:text-red-600 dark:hover:text-red-400 dark:text-gray-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 />
                </button>
              </div>
            </div>

            <div className="gap-3 grid grid-cols-2 bg-gray-50 dark:bg-slate-900/50 p-4 rounded-lg text-gray-600 dark:text-gray-400 text-xs">
              <span className="font-medium">User:</span>
              <span className="font-mono text-gray-900 dark:text-gray-200 text-right truncate">
                {config.user}
              </span>
              <span className="font-medium">Security:</span>
              <span className="text-right">
                {config.secure ? (
                  <span className="flex justify-end items-center gap-1">
                    <Lock className="inline-block size-3" /> TLS
                  </span>
                ) : (
                  <span className="flex justify-end items-center gap-1">
                    <Info className="inline-block size-3" /> None
                  </span>
                )}
              </span>
              <span className="font-medium">Sender:</span>
              <span className="text-right truncate">{config.fromName}</span>
            </div>

            {!config.isDefault && (
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/dashboard/configs/${config.id}`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ action: 'default' }),
                    });
                    if (res.ok) {
                      setConfigs(prev => prev.map((c: any) => ({ ...c, isDefault: c.id === config.id })));
                    } else {
                      alert('Set default failed');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Set default failed');
                  }
                }}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/30 mt-4 py-2 border border-blue-200 dark:border-blue-800 rounded-lg w-full font-medium text-blue-600 dark:text-blue-400 text-sm transition-colors"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Modern Modal */}
      {showEditModal && editingConfig && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-gray-900/60 dark:bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 rounded-2xl w-full max-w-lg animate-scale-in">
            <h3 className="mb-6 font-bold text-gray-900 dark:text-white text-2xl">Edit Gateway</h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                  Configuration Name
                </label>
                <input type="text" defaultValue={editingConfig.name} className={inputClasses} />
              </div>

              <div className="gap-4 grid grid-cols-3">
                <div className="col-span-2">
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    Host
                  </label>
                  <input type="text" defaultValue={editingConfig.host} className={inputClasses} />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    Port
                  </label>
                  <input type="number" defaultValue={editingConfig.port} className={inputClasses} />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    Username
                  </label>
                  <input type="text" defaultValue={editingConfig.user} className={inputClasses} />
                </div>
                <div>
                  <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-sm">
                    Password
                  </label>
                  <input type="password" placeholder="••••••" className={inputClasses} />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 justify-center btn-primary"
              >
                Save Changes
              </button>
              <button onClick={() => setShowEditModal(false)} className="px-6 btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
