"use client";

import { Braces, Check, Eraser, FileAxis3d, Hourglass, Mails, RefreshCcw, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReportsTab() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0, pending: 0 });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    // Mock Data
    const mockReports = [
      {
        id: 1,
        email: "user1@example.com",
        status: "sent",
        name: "John Doe",
        company: "ABC Corp",
        subject: "Welcome",
        timestamp: new Date().toISOString(),
        error: null,
      },
      {
        id: 2,
        email: "user2@example.com",
        status: "failed",
        name: "Jane Smith",
        company: "XYZ Inc",
        subject: "Welcome",
        timestamp: new Date().toISOString(),
        error: "Invalid email",
      },
      {
        id: 3,
        email: "ceo@tech.com",
        status: "pending",
        name: "Bob Wilson",
        company: "Tech Lyfe",
        subject: "Welcome",
        timestamp: new Date().toISOString(),
        error: null,
      },
    ];
    setReports(mockReports as any);
    setStats({
      total: mockReports.length,
      sent: mockReports.filter((r) => r.status === "sent").length,
      failed: mockReports.filter((r) => r.status === "failed").length,
      pending: mockReports.filter((r) => r.status === "pending").length,
    });
  };

  const StatCard = ({ title, value, color, icon }: any) => {
    const colors: any = {
      blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800",
      green:
        "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-100 dark:border-green-800",
      red: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-100 dark:border-red-800",
      yellow:
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-100 dark:border-yellow-800",
    };

    return (
      <div className={`p-5 rounded-2xl border ${colors[color]} flex items-center justify-between`}>
        <div>
          <p className="opacity-80 font-semibold text-sm uppercase tracking-wider">{title}</p>
          <p className="mt-1 font-bold text-3xl">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-white/50 dark:bg-black/20 text-2xl`}>{icon}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 bg-white dark:bg-slate-800 shadow-sm p-6 border border-gray-100 dark:border-slate-700 rounded-3xl">
        <h3 className="font-bold text-gray-900 dark:text-white text-xl">Emails Reports</h3>
        <div className="flex flex-wrap gap-2">
          <button className="flex justify-center items-center btn-secondary">
            <FileAxis3d className="inline-block mr-1 size-4" /> CSV
          </button>
          <button className="btn-secondary">
            <Braces className="inline-block mr-1 size-4" /> JSON
          </button>
          <button
            onClick={loadReports}
            className="flex justify-center items-center bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 px-4 py-2 rounded-xl font-semibold text-blue-700 dark:text-blue-400 text-sm transition-colors"
          >
            <RefreshCcw className="inline-block mr-1 size-4" />
            Refresh
          </button>
          <button className="bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 px-4 py-2 rounded-xl font-semibold text-red-700 dark:text-red-400 text-sm transition-colors">
            <Eraser className="inline-block mr-1 size-4" /> Clear
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} color="blue" icon={<Mails />} />
        <StatCard title="Sent" value={stats.sent} color="green" icon={<Check />} />
        <StatCard title="Failed" value={stats.failed} color="red" icon={<X />} />
        <StatCard title="Pending" value={stats.pending} color="yellow" icon={<Hourglass />} />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-slate-900/50 border-gray-100 dark:border-slate-700 border-b">
              <tr>
                {["Email", "Status", "Name", "Company", "Subject", "Time", "Error"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 text-xs text-left uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {reports.map((report: any) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 text-sm">
                    {report.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${
                        report.status === "sent"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : report.status === "failed"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                    {report.company}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                    {report.subject}
                  </td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm whitespace-nowrap">
                    {new Date(report.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 max-w-xs text-red-500 dark:text-red-400 text-sm truncate">
                    {report.error || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
