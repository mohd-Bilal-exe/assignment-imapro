import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">📧 Bulk Email Sender</h1>
          <div className="space-x-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/auth" className="hover:underline">Login</Link>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Welcome to Bulk Email Sender</h2>
        <div className="space-x-4">
          <Link href="/dashboard" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
            Go to Dashboard
          </Link>
          <Link href="/auth" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
            Login / Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
