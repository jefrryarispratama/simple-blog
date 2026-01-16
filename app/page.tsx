import Blogs from "@/components/Blogs";
import CreateButton from "@/components/CreateButton";
import Search from "@/components/Search";
import { BlogsSkeleton } from "@/components/Skeleton";
import { Suspense } from "react";
export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="flex flex-row items-center justify-between mb-12">
        <div>
          <h1 className="font-bold text-3xl">Simplest Blog</h1>
          <p>See our latest news in this website or create one!</p>
        </div>

        <CreateButton />
      </div>

      <Suspense
        fallback={
          <div className="h-10 w-full bg-muted animate-pulse rounded-md mb-6" />
        }
      >
        <Search />
      </Suspense>
      <Suspense fallback={<BlogsSkeleton />}>
        <Blogs searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
