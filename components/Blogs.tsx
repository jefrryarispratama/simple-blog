import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import AlertDeleteDialog from "./AlertDeleteDialog";
import { buttonVariants } from "./ui/button";
import BlogPagination from "./BlogPagination";

const ITEMS_PER_PAGE = 5;

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) => {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  await connection();

  const whereCondition = {
    OR: [{ title: { contains: query } }, { desc: { contains: query } }],
  };

  const [blogs, totalBlogs] = await Promise.all([
    prisma.blog.findMany({
      where: whereCondition,
      skip: skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.blog.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalBlogs / ITEMS_PER_PAGE);

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-muted-foreground">
        {query ? (
          // Jika user sedang mencari sesuatu tapi tidak ada hasil
          <>
            <p className="text-lg font-medium">
              Maaf, kata yang anda cari tidak ditemukan.
            </p>
            <p className="text-sm">
              Tidak ada hasil untuk &quot;{query}&quot;. Coba kata kunci lain.
            </p>
          </>
        ) : (
          // Jika memang database benar-benar kosong (tidak ada query)
          <>
            <p className="text-lg font-medium">There is no blog yet.</p>
            <p className="text-sm">
              Please make a new blog so you can see here.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
      {" "}
      {blogs.map((blog) => (
        <Card key={blog.id} className="rounded-sm border-dashed border-2 flex">
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription className="line-clamp-3">
              {blog.desc}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex gap-2">
            <Link
              className={buttonVariants({ variant: "default", size: "sm" })}
              href={`/blog/${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              Details
            </Link>
            <AlertDeleteDialog id={blog.id} />
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between mt-4">
        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Blogs;
