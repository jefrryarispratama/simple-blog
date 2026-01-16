"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBlogData(blogId: string) {
  try {
    return await prisma.blog.findFirst({
      where: { title: blogId.replace(/-/g, " ") },
    });
  } catch (e) {
    console.log(e);
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
