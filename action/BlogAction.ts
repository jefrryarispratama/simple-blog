"use server";

import { prisma } from "@/lib/prisma";
import { AddBlogFormSchema, AddBlogFormType } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function getBlogData(blogId: string) {
  try {
    return await prisma.blog.findFirst({
      where: { title: blogId.replace(/-/g, " ") },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function addBlog(data: AddBlogFormType) {
  const result = AddBlogFormSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors = z.treeifyError(result.error);

    return {
      success: false,
      errors: formattedErrors,
      message: "Validation failed",
    };
  }

  try {
    const { title, desc } = result.data;
    await prisma.blog.create({
      data: {
        title,
        desc,
      },
    });
    return { success: true, message: "Blog berhasil dibuat" };
  } catch {
    return { success: false, message: "Database Error" };
  }
}

export async function deleteBlogById(id: string) {
  try {
    await prisma.blog.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  } catch {
    return "Delete blog failed";
  }
}
