import z from "zod";

export const AddBlogFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  desc: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "The description can't be more than 500 characters" }),
});

export type AddBlogFormType = z.infer<typeof AddBlogFormSchema>;

