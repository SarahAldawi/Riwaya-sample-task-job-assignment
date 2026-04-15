"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="max-w-lg w-full text-center space-y-6 animate-fade-in">
          <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl">
            ⚠️
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Something went wrong
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            We couldn’t load this product right now. This might be a temporary
            issue with the server or your connection.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition hover:opacity-90"
            >
              Try again
            </button>

            <Link
              href="/"
              className="px-6 py-3 border rounded-lg font-medium hover:bg-secondary transition"
            >
              Back to collection
            </Link>
          </div>
          
          {process.env.NODE_ENV === "development" && (
            <div className="pt-4 border-t border-dashed mt-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                Debug Info
              </p>
              <p className="text-xs text-muted-foreground break-all bg-muted p-2 rounded">
                {error?.message || "No error message provided"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
