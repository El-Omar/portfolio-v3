import { ReactElement } from "react";
import { getBlogs } from "@/app/actions/blogs";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Container from "@/components/ui/Container";

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { category?: string };
}): Promise<ReactElement> => {
  const response = await getBlogs({ status: "published" });
  const blogs = response.status === "success" ? response.data : [];

  const categories = Array.from(
    new Set(blogs.flatMap((blog) => blog.categories)),
  ).sort();

  const filteredBlogs = searchParams.category
    ? blogs.filter((blog) => blog.categories.includes(searchParams.category!))
    : blogs;

  return (
    <Container className="py-16 lg:py-32 relative flex flex-col lg:flex-row gap-12">
      {/* Left Sidebar */}
      <div className="lg:w-1/4 lg:border-r lg:pr-6">
        <div className="lg:sticky lg:top-24 border-neutral-200 dark:border-neutral-700">
          <div className="space-y-8">
            <BlogHeader />
            <hr className="border-neutral-200 dark:border-neutral-700 w-28" />
            <CategoryFilter categories={categories} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <BlogGrid blogs={filteredBlogs} />
      </div>
    </Container>
  );
};

export default BlogPage;
