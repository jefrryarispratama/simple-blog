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

export async function addBlog(data: { title: string; desc: string }) {
  //perlu di validasi lagi pakek zod
  try {
    await prisma.blog.create({
      data: {
        title: data.title,
        desc: data.desc,
      },
    });
    return { success: true, message: "blog berhasil di buat" };
  } catch {
    return { success: false, message: "blog gagal di buat" };
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
