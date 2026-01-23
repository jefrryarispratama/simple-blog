// app/(crud)/edit-blog/[blogId]/page.tsx
import EditBlogForm from "@/components/form/EditBlogForm";
import { getBlogById } from "@/action/BlogAction";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { connection } from "next/server";

// 1. Komponen ini yang melakukan kerja berat (Dynamic)
async function EditBlogContent({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  await connection(); // Sekarang aman karena di dalam Suspense
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  if (!blog) notFound();

  return <EditBlogForm initialData={blog} />;
}

// 2. Halaman Utama (Synchronous Shell)
const EditBlogPage = ({ params }: { params: Promise<{ blogId: string }> }) => {
  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      {/* Suspense membungkus komponen yang punya await */}
      <Suspense fallback={<p>Loading data...</p>}>
        <EditBlogContent params={params} />
      </Suspense>
    </div>
  );
};

export default EditBlogPage;
