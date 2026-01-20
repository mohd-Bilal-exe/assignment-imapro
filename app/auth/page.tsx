import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="space-y-6 w-full">
      <h2 className="bg-clip-text bg-linear-to-r from-blue-600 to-blue-700 mb-8 font-bold text-transparent text-2xl text-center">
        Choose an option
      </h2>

      <div className="space-y-3">
        <Link href="/auth/login" className="block justify-center w-full btn-primary">
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="block bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 px-6 py-3 rounded-xl font-semibold text-blue-700 dark:text-blue-400 text-center transition-all duration-200"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
