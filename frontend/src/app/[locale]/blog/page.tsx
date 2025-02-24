import { ReactElement } from "react";
import PageTransition from "../PageTransition";
import { getBlogs } from "@/app/actions/blogs";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogHeader from "@/components/blog/BlogHeader";
import CategoryFilter from "@/components/blog/CategoryFilter";
import Container from "@/components/ui/Container";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

const BlogPage = async ({ searchParams }: Props): Promise<ReactElement> => {
  const response = await getBlogs({ status: "published" });
  const blogs = response.status === "success" ? response.data : [];
  const params = await searchParams;

  const categories = Array.from(
    new Set(blogs.flatMap((blog) => blog.categories)),
  ).sort();

  const filteredBlogs = params.category
    ? blogs.filter((blog) => blog.categories.includes(params.category!))
    : blogs;

  return (
    <PageTransition>
      <Container className="py-16 lg:py-32 relative flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 lg:border-r rtl:lg:border-l rtl:lg:border-r-0 lg:border-neutral-200 dark:border-neutral-700 lg:pr-6 rtl:lg:pr-0 rtl:lg:pl-6">
          <div className="lg:sticky lg:top-24 border-neutral-200 dark:border-neutral-700">
            <div className="space-y-8">
              <BlogHeader />
              <hr className="border-neutral-200 dark:border-neutral-600 w-28" />
              <CategoryFilter categories={categories} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <BlogGrid blogs={filteredBlogs} />
        </div>
      </Container>
    </PageTransition>
  );
};

export default BlogPage;
