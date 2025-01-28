import { notFound } from "next/navigation";
import { ReactElement } from "react";
import EditBlogForm from "./EditBlogForm";
import { getBlogBySlug } from "@/app/actions/blogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const EditBlogPage = async ({ params }: Props): Promise<ReactElement> => {
  const pars = await params;
  const blogData = await getBlogBySlug(pars.slug);

  if (blogData.status === "error" || !blogData.data) {
    notFound();
  }

  return <EditBlogForm blog={blogData.data} />;
};

export default EditBlogPage;
