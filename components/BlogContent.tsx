import { getBlogData } from "@/action/BlogAction";
import { notFound } from "next/navigation";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const blog = await getBlogData(blogId);

  if (!blog) {
    notFound();
  }

  return (
    <div className="mt-12 max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="mt-4 text-gray-600">{blog.desc}</p>
    </div>
  );
};

export default BlogPage;
