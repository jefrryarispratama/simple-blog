import BlogContent from "@/components/BlogContent";
import { BlogContentSkeleton } from "@/components/Skeleton";
import Link from "next/link";
import { Suspense } from "react";

const BlogPage = ({ params }: { params: Promise<{ blogId: string }> }) => {
  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <nav className="mb-8">
        <Link
          href="/"
          className=" hover:bg-gray-200 transition-all border px-4 rounded-sm py-2"
        >
          ← Back
        </Link>
      </nav>
      <Suspense fallback={<BlogContentSkeleton />}>
        <BlogContent params={params} />
      </Suspense>
    </div>
  );
};

export default BlogPage;
