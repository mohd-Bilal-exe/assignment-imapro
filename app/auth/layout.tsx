export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center bg-linear-to-br from-slate-50 dark:from-slate-950 to-blue-50 dark:to-blue-950 p-4 sm:p-6 min-h-screen">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="shadow-lg p-8 sm:p-10 card-base">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-linear-to-br from-blue-600 to-blue-700 shadow-blue-500/30 shadow-lg p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6z" />
                </svg>
              </div>
            </div>
            <h1 className="bg-clip-text bg-linear-to-r from-blue-600 to-blue-700 mb-2 font-bold text-transparent text-2xl sm:text-3xl">
              BulkSend.imapro
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enterprise email delivery platform
            </p>
          </div>
          <div className="space-y-6">{children}</div>
        </div>
        <div className="mt-6 text-gray-600 dark:text-gray-400 text-sm text-center">
          <p>© 2026 BulkSend.imapro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
