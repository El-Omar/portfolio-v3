"use client";

import { ApiResponse, Blog, BlogResponse } from "@portfolio-v3/shared";
import { useActionState } from "react";
import { toast } from "sonner";
import BlogForm from "../../BlogForm";
import { updateBlog } from "@/app/actions/blogs";
import { useRouter } from "@/i18n/routing";

type Props = {
  blog: BlogResponse;
};

const EditBlogForm = ({ blog }: Props) => {
  const router = useRouter();
  const [result, onSubmit, isPending] = useActionState<
    ApiResponse<BlogResponse> | Blog | null,
    FormData
  >(async (previousState, formData) => {
    const response = await updateBlog(previousState, formData, blog);

    if (response.status === "error") {
      toast.error(response.message);
      return response;
    }

    toast.success("Blog post updated successfully");
    router.push("/admin/dashboard/blogs");
    router.refresh();

    return response;
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
      <h1 className="text-3xl font-bold">Edit Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <BlogForm onSubmit={onSubmit} isPending={isPending} blog={blog} />
    </div>
  );
};

export default EditBlogForm;
