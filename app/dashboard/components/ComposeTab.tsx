"use client";

import { Eye, File, FileSliders, MailPlus, Send, Settings } from "lucide-react";
import { useState } from "react";

export default function ComposeTab() {
  const [selectedConfig, setSelectedConfig] = useState("");
  const [showNewConfig, setShowNewConfig] = useState(false);
  const [useBatch, setUseBatch] = useState(false);
  const [scheduleEmail, setScheduleEmail] = useState(false);

  const handleSendEmails = async () => {
    alert("Email sending functionality to be implemented");
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500";
  const labelClasses = "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-1";
  const cardClasses =
    "bg-white dark:bg-slate-800/50 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-700 backdrop-blur-sm";

  return (
    <div className="space-y-8">
      <div className="gap-8 grid lg:grid-cols-3">
        {/* Left Column: Configuration */}
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
                  onChange={(e) => setSelectedConfig(e.target.value)}
                >
                  <option value="">Choose configuration...</option>
                  <option value="gmail">Gmail Config</option>
                  <option value="outlook">Outlook Config</option>
                </select>
              </div>

              <button
                onClick={() => setShowNewConfig(!showNewConfig)}
                className="flex justify-center items-center gap-2 py-3 border-2 border-gray-300 hover:border-blue-500 dark:border-slate-600 dark:hover:border-blue-400 border-dashed rounded-xl w-full font-medium text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 dark:text-slate-400 transition-colors"
              >
                <span>+</span> Add New SMTP
              </button>

              {/* Collapsible New Config Form */}
              {showNewConfig && (
                <div className="space-y-3 bg-gray-50 dark:bg-slate-900/50 slide-in-from-top-2 p-4 border border-gray-100 dark:border-slate-700 rounded-2xl animate-in fade-in">
                  <input type="text" placeholder="Config Name" className={inputClasses} />
                  <div className="gap-3 grid grid-cols-2">
                    <input type="text" placeholder="Host" className={inputClasses} />
                    <input type="number" placeholder="Port" className={inputClasses} />
                  </div>
                  <input type="text" placeholder="User" className={inputClasses} />
                  <input type="password" placeholder="Pass" className={inputClasses} />
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 py-2 rounded-lg font-medium text-white text-sm transition-colors">
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
              <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <label
                  htmlFor="useBatch"
                  className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  Batch Mode
                </label>
                <div className="inline-block relative mr-2 w-12 align-middle transition duration-200 ease-in select-none">
                  <input
                    type="checkbox"
                    name="toggle"
                    id="useBatch"
                    checked={useBatch}
                    onChange={(e) => setUseBatch(e.target.checked)}
                    className="peer block right-6 checked:right-0 absolute bg-white border-4 rounded-full w-6 h-6 appearance-none cursor-pointer toggle-checkbox"
                  />
                  <label
                    htmlFor="useBatch"
                    className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${useBatch ? "bg-blue-500" : "bg-gray-300 dark:bg-slate-600"}`}
                  ></label>
                </div>
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

              <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <label
                  htmlFor="scheduleEmail"
                  className="font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
                >
                  Schedule
                </label>
                <input
                  type="checkbox"
                  id="scheduleEmail"
                  checked={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.checked)}
                  className="bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-blue-500 w-5 h-5 text-blue-600"
                />
              </div>

              {scheduleEmail && <input type="datetime-local" className={inputClasses} />}
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
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
                  placeholder="Hello {{FirstName}}, welcome to {{Company}}!"
                  className={`${inputClasses} font-medium`}
                />
              </div>

              <div className="grow">
                <label className={labelClasses}>Body</label>
                <textarea
                  rows={12}
                  placeholder="Start typing your email content..."
                  className={`${inputClasses} font-mono text-sm leading-relaxed resize-y`}
                />
              </div>

              <div className="flex sm:flex-row flex-col gap-4 pt-4 border-gray-100 dark:border-slate-700 border-t">
                <button
                  onClick={handleSendEmails}
                  className="flex-1 bg-linear-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 shadow-blue-500/30 shadow-lg py-3.5 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 active:translate-y-0 transform"
                >
                  <Send className="inline-block mr-1" /> Send Emails
                </button>
                <button className="bg-white hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600 px-8 py-3.5 border border-gray-200 dark:border-slate-600 rounded-xl font-semibold text-gray-700 dark:text-gray-200 transition-colors">
                  <Eye className="inline-block mr-1" /> Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
