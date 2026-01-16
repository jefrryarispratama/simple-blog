import { Skeleton } from "./ui/skeleton";

export function BlogsSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-30 w-full rounded-xl" />
      <Skeleton className="h-30 w-full rounded-xl" />
      <Skeleton className="h-30 w-full rounded-xl" />
    </div>
  );
}

export function BlogContentSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-10  w-50" />
      <div className="space-y-2">
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );
}
