"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const CreateButton = () => {
  const router = useRouter();

  return (
    <Button
      size={"sm"}
      onClick={() => {
        router.push("/create-blog");
      }}
    >
      Create
    </Button>
  );
};

export default CreateButton;
