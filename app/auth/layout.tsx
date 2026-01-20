export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center bg-zinc-50 dark:bg-black min-h-screen text-white">
      <div className="flex flex-col gap-6 bg-yellow-50/10 p-8 rounded-2xl min-w-96">
        <div className="text-center">
          <span className="text-4xl">Continue to </span>
          <h1 className="text-5xl font-bold">Bulk Email</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
