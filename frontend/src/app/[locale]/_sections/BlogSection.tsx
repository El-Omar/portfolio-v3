import { ArrowRight } from "lucide-react";
import { ReactElement } from "react";
import { getBlogs } from "@/app/actions/blogs";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Paragraph from "@/components/ui/Paragraph";
import Title from "@/components/ui/Title";
import TitleAccent from "@/components/ui/TitleAccent";
import { Link } from "@/i18n/routing";

const BlogSection = async (): Promise<ReactElement> => {
  const response = await getBlogs({
    status: "published",
    featured: true,
    limit: 3,
  });
  const blogs = response.status === "success" ? response.data : [];

  if (response.status !== "success") {
    return (
      <Container>
        <p>No blog posts found</p>
      </Container>
    );
  }

  return (
    <Container>
      <article className="w-full py-32">
        <div className="px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-20 mb-16">
            <div className="flex-1 space-y-6">
              <Title>
                Writing about <br />
                <TitleAccent>nothing & everything</TitleAccent>
              </Title>
              <Paragraph className="text-neutral-600 dark:text-neutral-400 max-w-xl">
                Here&apos;s where I explore storytelling and share some
                fragments of random thoughts; sometimes about tech, mostly about
                life.
              </Paragraph>
            </div>
            <div className="flex-1 flex justify-end">
              <Button variant="fancy" asChild>
                <Link href="/blog">
                  View all posts <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
            {blogs.length === 0 && (
              <div className="col-span-3">
                <p>No blog posts found</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </Container>
  );
};

export default BlogSection;
