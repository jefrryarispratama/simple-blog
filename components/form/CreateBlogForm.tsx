"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addBlog } from "@/action/BlogAction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddBlogFormSchema } from "@/lib/zodSchemas";

type IFormInput = z.infer<typeof AddBlogFormSchema>;

const CreateBlogForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(AddBlogFormSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const result = await addBlog(data);
    if (result.success === true) {
      reset();
      router.push("/");
      toast.success(result.message);
    } else if (result.success === false) {
      toast.error(result.message);
    }
  };
  return (
    <Card className="w-full sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add new blog</CardTitle>
        <CardDescription>Create your new blog now!</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="blog-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input {...register("title")} />
              {errors?.title?.message && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Desc</Label>
              <Textarea {...register("desc")} maxLength={500} />
              {errors?.desc?.message && (
                <p className="text-red-500">{errors.desc.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="blog-form" disabled={isSubmitting}>
          {isSubmitting ? "Submit..." : "submit"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBlogForm;
