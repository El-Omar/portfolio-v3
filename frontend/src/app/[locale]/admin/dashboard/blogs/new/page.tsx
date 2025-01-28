"use client";

import { ApiResponse, Blog, BlogResponse } from "@portfolio-v3/shared";
import { ReactElement, useActionState } from "react";
import { toast } from "sonner";
import BlogForm from "../BlogForm";
import { createBlog } from "@/app/actions/blogs";
import { useRouter } from "@/i18n/routing";

const NewBlogPage = (): ReactElement => {
  const router = useRouter();
  const [result, onSubmit, isPending] = useActionState<
    ApiResponse<BlogResponse> | Blog | null,
    FormData
  >(async (previousState, formData) => {
    const result = await createBlog(previousState, formData);

    if (result?.status === "error") {
      const error = result.message || "Failed to create blog post";
      toast.error(error);
      return result;
    }

    toast.success("Blog post created successfully");
    router.push("/admin/dashboard/blogs");
    return result;
  }, null);

  const error = (() => {
    if (result && "status" in result && result.status === "error") {
      const msg =
        result.errors?.join(", ") ||
        result.message ||
        "Some unknown error happened";
      return msg;
    }
    return "";
  })();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">New Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <BlogForm onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
};

export default NewBlogPage;
