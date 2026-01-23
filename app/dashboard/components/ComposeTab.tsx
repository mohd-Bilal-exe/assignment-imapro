'use client';

import { Eye, File, FileSliders, MailPlus, Send, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ComposeTab() {
  const [loading, setLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState('');
  const [showNewConfig, setShowNewConfig] = useState(false);
  const [useBatch, setUseBatch] = useState(false);
  const [scheduleEmail, setScheduleEmail] = useState(false);
  const [configs, setConfigs] = useState<any[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
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
  const handleSendEmails = async () => {
    if (!selectedConfig) return alert('Select SMTP configuration');
    try {
      const payload = {
        configId: selectedConfig,
        subject,
        body,
        useBatch,
        schedule: scheduleEmail ? true : false,
      };

      const res = await fetch('/api/dashboard/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Emails queued');
      } else {
        alert(data.message || 'Send failed');
      }
    } catch (err) {
      console.error(err);
      alert('Send failed');
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full"> Loading... </div>
    );
  }
  const inputClasses =
    'w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500';
  const labelClasses = 'block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1';
  const cardClasses =
    'bg-white dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-700 backdrop-blur-sm transition-all hover:shadow-md';

  return (
    <div className="space-y-8">
      <div className="gap-8 grid lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <div className={cardClasses}>
            <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 dark:text-white text-xl">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <FileSliders />
              </span>
              Configuration
            </h3>

            <div className="space-y-5">
              <div>
                <label className={labelClasses}>Select SMTP</label>
                <select
                  className={inputClasses}
                  value={selectedConfig}
                  onChange={e => setSelectedConfig(e.target.value)}
                >
                  <option value="">Choose configuration...</option>
                  {configs.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowNewConfig(!showNewConfig)}
                className="flex justify-center items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-3 border-2 border-gray-300 hover:border-blue-500 dark:border-slate-600 dark:hover:border-blue-400 border-dashed rounded-xl w-full font-medium text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-400 transition-all duration-200"
              >
                <span className="text-lg">+</span> Add New SMTP
              </button>

              {showNewConfig && (
                <div className="space-y-3 bg-gray-50 dark:bg-slate-900/50 p-4 border border-gray-100 dark:border-slate-700 rounded-2xl animate-slide-in-down">
                  <input type="text" placeholder="Config Name" className={inputClasses} />
                  <div className="gap-3 grid grid-cols-2">
                    <input type="text" placeholder="Host" className={inputClasses} />
                    <input type="number" placeholder="Port" className={inputClasses} />
                  </div>
                  <input type="text" placeholder="User" className={inputClasses} />
                  <input type="password" placeholder="Pass" className={inputClasses} />
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-linear-to-r from-emerald-500 hover:from-emerald-600 to-emerald-600 hover:to-emerald-700 hover:shadow-emerald-500/30 hover:shadow-lg py-2 rounded-lg font-medium text-white text-sm transition-all">
                      Save
                    </button>
                    <button
                      onClick={() => setShowNewConfig(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={cardClasses}>
            <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 dark:text-white text-xl">
              <span className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                <Settings />
              </span>
              Settings
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 p-3 rounded-xl transition-colors">
                <label
                  htmlFor="useBatch"
                  className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  Batch Mode
                </label>
                <input
                  type="checkbox"
                  id="useBatch"
                  checked={useBatch}
                  onChange={e => setUseBatch(e.target.checked)}
                  className="bg-gray-100 dark:bg-slate-700 dark:checked:bg-blue-600 border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 w-5 h-5 text-blue-600 cursor-pointer"
                />
              </div>

              {useBatch && (
                <div className="gap-3 grid grid-cols-2 bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800/30 rounded-2xl">
                  <div>
                    <label className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wide">
                      Batch Size
                    </label>
                    <input
                      type="number"
                      defaultValue="20"
                      className="bg-white dark:bg-slate-900 mt-1 px-2 py-1 border-none rounded-lg w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wide">
                      Delay (s)
                    </label>
                    <input
                      type="number"
                      defaultValue="45"
                      className="bg-white dark:bg-slate-900 mt-1 px-2 py-1 border-none rounded-lg w-full text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 p-3 rounded-xl transition-colors">
                <label
                  htmlFor="scheduleEmail"
                  className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  Schedule Email
                </label>
                <input
                  type="checkbox"
                  id="scheduleEmail"
                  checked={scheduleEmail}
                  onChange={e => setScheduleEmail(e.target.checked)}
                  className="bg-gray-100 dark:bg-slate-700 dark:checked:bg-blue-600 border-gray-300 dark:border-slate-600 rounded focus:ring-2 focus:ring-blue-500 w-5 h-5 text-blue-600 cursor-pointer"
                />
              </div>

              {scheduleEmail && <input type="datetime-local" className={inputClasses} />}
            </div>
          </div>
        </div>

        <div className="space-y-8 lg:col-span-2">
          <div className={cardClasses}>
            <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 dark:text-white text-xl">
              <span className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg text-orange-600 dark:text-orange-400">
                <File />
              </span>
              Data Source
            </h3>
            <div className="gap-6 grid md:grid-cols-2">
              <div>
                <label className={labelClasses}>Contact List (Excel)</label>
                <div className="group relative">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    className="z-10 absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex justify-center items-center dark:group-hover:bg-slate-800 group-hover:bg-blue-50 p-4 border-2 border-gray-300 dark:border-slate-600 group-hover:border-blue-500 border-dashed rounded-xl w-full transition-all">
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-slate-400 group-hover:text-blue-500 text-sm">
                        Click to upload .xlsx
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className={labelClasses}>Template (HTML)</label>
                <div className="group relative">
                  <input
                    type="file"
                    accept=".html"
                    className="z-10 absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex justify-center items-center dark:group-hover:bg-slate-800 group-hover:bg-blue-50 p-4 border-2 border-gray-300 dark:border-slate-600 group-hover:border-blue-500 border-dashed rounded-xl w-full transition-all">
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-slate-400 group-hover:text-blue-500 text-sm">
                        Click to upload .html
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${cardClasses} flex flex-col h-auto`}>
            <h3 className="flex items-center gap-2 mb-6 font-bold text-gray-900 dark:text-white text-xl">
              <span className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-green-600 dark:text-green-400">
                <MailPlus />
              </span>
              Message
            </h3>

            <div className="space-y-5 grow">
              <div>
                <label className={labelClasses}>Subject Line</label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="Hello {{FirstName}}, welcome to {{Company}}!"
                  className={`${inputClasses} font-medium`}
                />
              </div>

              <div className="grow">
                <label className={labelClasses}>Body</label>
                <textarea
                  rows={12}
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Start typing your email content..."
                  className={`${inputClasses} font-mono text-sm leading-relaxed resize-y`}
                />
              </div>

              <div className="flex sm:flex-row flex-col gap-4 pt-4 border-gray-100 dark:border-slate-700 border-t">
                <button
                  onClick={handleSendEmails}
                  className="flex flex-1 justify-center items-center gap-2 bg-linear-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 shadow-blue-500/30 shadow-lg hover:shadow-blue-500/40 py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  <Send className="w-5 h-5" /> Send Emails
                </button>
                <button className="flex justify-center items-center gap-2 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600 hover:shadow-md px-8 py-3.5 border border-gray-200 dark:border-slate-600 rounded-xl font-semibold text-gray-700 dark:text-gray-200 transition-all">
                  <Eye className="w-5 h-5" /> Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
