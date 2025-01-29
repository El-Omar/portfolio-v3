import { BlogResponse } from "@portfolio-v3/shared";
import { ReactElement } from "react";
import BlogCard from "./BlogCard";

type Props = {
  blogs: BlogResponse[];
};

const BlogGrid = ({ blogs }: Props): ReactElement => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-600 dark:text-neutral-400">
          No blog posts found
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogGrid;
