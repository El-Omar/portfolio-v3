import { ReactElement } from "react";
import { getBlogs } from "@/app/actions/blogs";
import BlogList from "@/components/blog/BlogList";

const BlogSection = async (): Promise<ReactElement> => {
  const response = await getBlogs({
    status: "published",
    featured: true,
    limit: 3,
  });

  const blogs = response.status === "success" ? response.data : [];

  return <BlogList blogs={blogs} />;
};

export default BlogSection;
