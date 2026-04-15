import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => (
  <div className="rounded-lg bg-card border border-border shadow-sm overflow-hidden">
    <Skeleton className="aspect-square w-full" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
);

export default ProductCardSkeleton;
