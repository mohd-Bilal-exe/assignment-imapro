export default function AuthPage() {
  return (
    <div className="w-full max-w-md text-center">
      <p className="text-lg mb-6">Choose an option to continue</p>
      <div className="space-y-4">
        <a href="/auth/login" className="block w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
          Login
        </a>
        <a href="/auth/signup" className="block w-full bg-green-500 text-white p-3 rounded hover:bg-green-600">
          Sign Up
        </a>
      </div>
    </div>
  );
}