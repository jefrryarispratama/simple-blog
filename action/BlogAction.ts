"use server";

import { prisma } from "@/lib/prisma";
import {
  AddBlogFormSchema,
  AddBlogFormType,
  EditBlogFormSchema,
  EditBlogFormType,
} from "@/lib/zodSchemas";
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


export async function getBlogById(id: string) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        OR: [{ id: id }, { title: id.replace(/-/g, " ") }],
      },
    });
    return blog;
  } catch {
    return null;
  }
}

export async function updateBlogById(blogId: string, data: EditBlogFormType) {
  const result = EditBlogFormSchema.safeParse(data);

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
    await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        desc,
      },
    });
    return { success: true, message: "data has been updated" };
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
