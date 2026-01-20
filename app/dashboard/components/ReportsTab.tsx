'use client';

import { Braces, Check, Eraser, FileAxis3d, Hourglass, Mails, RefreshCcw, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ReportsTab() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0, pending: 0 });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    // Mock reports Data
    const mockReports = [
      {
        id: 1,
        email: 'user1@example.com',
        status: 'sent',
        name: 'John Doe',
        company: 'ABC Corp',
        subject: 'Welcome',
        timestamp: new Date().toISOString(),
        error: null,
      },
      {
        id: 2,
        email: 'user2@example.com',
        status: 'failed',
        name: 'Jane Smith',
        company: 'XYZ Inc',
        subject: 'Welcome',
        timestamp: new Date().toISOString(),
        error: 'Invalid email',
      },
      {
        id: 3,
        email: 'ceo@tech.com',
        status: 'pending',
        name: 'Bob Wilson',
        company: 'Tech Lyfe',
        subject: 'Welcome',
        timestamp: new Date().toISOString(),
        error: null,
      },
    ];
    setReports(mockReports as any);
    setStats({
      total: mockReports.length,
      sent: mockReports.filter(r => r.status === 'sent').length,
      failed: mockReports.filter(r => r.status === 'failed').length,
      pending: mockReports.filter(r => r.status === 'pending').length,
    });
  };

  const StatCard = ({ title, value, color, icon }: any) => {
    const colors: any = {
      blue: 'bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50',
      green:
        'bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50',
      red: 'bg-linear-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50',
      yellow:
        'bg-linear-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50',
    };

    return (
      <div
        className={`p-6 rounded-2xl ${colors[color]} flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-1`}
      >
        <div>
          <p className="opacity-75 font-semibold text-xs uppercase tracking-wider">{title}</p>
          <p className="mt-2 font-bold text-3xl">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-white/40 dark:bg-black/20 text-2xl`}>{icon}</div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md p-6 border border-gray-100 dark:border-slate-700 rounded-3xl transition-all">
        <h3 className="font-bold text-gray-900 dark:text-white text-xl">📊 Email Reports</h3>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 btn-secondary">
            <FileAxis3d className="w-4 h-4" /> CSV
          </button>
          <button className="flex items-center gap-2 btn-secondary">
            <Braces className="w-4 h-4" /> JSON
          </button>
          <button
            onClick={loadReports}
            className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 hover:shadow-md px-4 py-2 rounded-lg font-semibold text-blue-700 dark:text-blue-400 text-sm transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 hover:shadow-md px-4 py-2 rounded-lg font-semibold text-red-700 dark:text-red-400 text-sm transition-all">
            <Eraser className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
        <StatCard title="Total" value={stats.total} color="blue" icon={<Mails />} />
        <StatCard title="Sent" value={stats.sent} color="green" icon={<Check />} />
        <StatCard title="Failed" value={stats.failed} color="red" icon={<X />} />
        <StatCard title="Pending" value={stats.pending} color="yellow" icon={<Hourglass />} />
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-slate-700 rounded-3xl overflow-hidden transition-all">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-linear-to-r from-gray-50 dark:from-slate-900/50 to-gray-100 dark:to-slate-800/50 border-gray-200 dark:border-slate-700 border-b">
              <tr>
                {['Email', 'Status', 'Name', 'Company', 'Subject', 'Time', 'Error'].map(h => (
                  <th
                    key={h}
                    className="px-6 py-4 font-bold text-gray-600 dark:text-gray-400 text-xs text-left uppercase tracking-wider"
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
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-200 text-sm">
                    {report.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all
                      ${
                        report.status === 'sent'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : report.status === 'failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
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
                  <td className="px-6 py-4 max-w-xs text-red-600 dark:text-red-400 text-sm truncate">
                    {report.error || '-'}
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
