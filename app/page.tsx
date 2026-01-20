import { ChartColumnStacked, CircleGauge, Lock, LogIn, Mails } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-linear-to-br from-slate-50 dark:from-slate-950 via-blue-50 dark:via-blue-950 to-slate-100 dark:to-slate-900 min-h-screen">
      {/* Navigation */}
      <nav className="top-0 z-50 sticky bg-white/80 dark:bg-slate-900/80 shadow-sm backdrop-blur-md border-gray-200 dark:border-slate-800 border-b">
        <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8 h-16 container">
          <Link href="/" className="group flex items-center gap-3">
            <div className="bg-linear-to-br from-blue-600 to-blue-700 group-hover:shadow-blue-500/30 group-hover:shadow-lg p-2.5 rounded-xl transition-all duration-300">
              <Mails />
            </div>
            <span className="hidden sm:inline bg-clip-text bg-linear-to-r from-blue-600 to-blue-700 font-bold text-transparent text-xl">
              BulkSend.imapro
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/dashboard"
              className="hover:bg-gray-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 text-sm transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              href="/auth/login"
              className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/30 hover:shadow-lg px-4 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-200"
            >
              Sign In
              <LogIn className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 container">
        <div className="mx-auto max-w-3xl text-center animate-slide-in-up">
          <div className="mb-8 sm:mb-12">
            <h1 className="bg-clip-text bg-linear-to-r from-blue-600 via-blue-700 to-indigo-700 mb-6 font-bold text-transparent text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Send Emails at Scale
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
              The most powerful bulk email solution for teams and enterprises. Send millions of
              emails with precision, track deliverability, and maximize your ROI.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6">
            <Link href="/auth/signup" className="justify-center btn-primary">
              Get Started Free
            </Link>
            <Link
              href="/dashboard"
              className="flex justify-center items-center gap-2 bg-white dark:bg-slate-800 px-6 py-3 border-2 border-gray-200 hover:border-blue-500 dark:border-slate-700 dark:hover:border-blue-400 rounded-xl font-semibold text-gray-900 dark:text-white transition-all duration-200"
            >
              <Mails />
              View Dashboard (Mock)
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="gap-6 sm:gap-8 grid grid-cols-1 md:grid-cols-3 mt-16 sm:mt-24 lg:mt-32">
          {[
            {
              icon: <CircleGauge className="size-6" />,
              title: 'Lightning Fast',
              desc: 'Send thousands of emails per second',
            },
            {
              icon: <ChartColumnStacked className="size-6" />,
              title: 'Analytics',
              desc: 'Real-time delivery and engagement tracking',
            },
            {
              icon: <Lock className="size-6" />,
              title: 'Enterprise Grade',
              desc: 'Bank-level security and compliance',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 card-base hover-lift"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 text-3xl sm:text-4xl">{feature.icon}</div>
              <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-lg sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
