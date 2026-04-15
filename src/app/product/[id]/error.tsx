"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="text-gray-500 text-center max-w-md">
        Failed to load the product. The server might be unavailable.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Try again
        </button>

        <Link href="/" className="px-4 py-2 border rounded-lg">
          Go Home
        </Link>
      </div>
    </div>
  );
}
