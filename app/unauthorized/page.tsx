import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold text-red-500">
        Access Denied
      </h1>

      <p className="mt-3 text-gray-600">
        You must sign in first to view your orders.
      </p>

      <Link
        href="/login"
        className="mt-5 px-4 py-2 bg-black text-white rounded"
      >
        Go to Sign in
      </Link>
    </div>
  );
}