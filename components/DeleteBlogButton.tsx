"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteBlogById } from "@/action/BlogAction";
import { toast } from "sonner";

const DeleteBlogButton = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBlogById(id);
      toast.success("Data Berhasil di Delete");
    });
  };

  return (
    <Button
      size={"sm"}
      onClick={handleDelete}
      variant={"destructive"}
      className="rounded-sm"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteBlogButton;
