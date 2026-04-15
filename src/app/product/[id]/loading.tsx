import SiteHeader from "@/components/SiteHeader";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

          <p className="text-gray-500 text-sm">Loading products...</p>
        </div>
      </main>
    </div>
  );
}
