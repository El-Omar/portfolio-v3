import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { getBlogBySlug } from "@/app/actions/blogs";
import BackButton from "@/components/layout/BackButton";
import PageScrollProgress from "@/components/layout/PageScrollProgress";
import BilingualLogoWithPen from "@/components/ui/BilingualLogoWithPen";
import Container from "@/components/ui/Container";
import Markup from "@/components/ui/Markup";
import Title from "@/components/ui/Title";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/dates";
import { fontSpectral } from "@/lib/utils/fonts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BlogDetailPage = async ({ params }: Props): Promise<ReactElement> => {
  const pars = await params;
  const response = await getBlogBySlug(pars.slug);

  if (response.status === "error" || !response.data) {
    notFound();
  }

  const blog = response.data;

  return (
    <Container>
      <div className="py-6 lg:py-12">
        <BackButton label="Back to articles" />
      </div>
      <article
        className={cn(
          "w-full pb-28 bg-neutral-50 mb-12 lg:mb-24 relative",
          fontSpectral.variable,
        )}
      >
        <PageScrollProgress className="sticky top-0" />
        <div className="max-w-[728px] mx-auto pt-12 lg:pt-28 px-8 lg:px-0">
          {/* Header */}
          <header className="space-y-8 mb-6">
            <div className="space-y-4">
              {/* Title */}
              <Title className="text-2xl md:text-3xl">{blog.title}</Title>

              <p className="text-lg text-neutral-600">{blog.description}</p>

              {/* Meta */}
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <time className="tracking-wider">
                  {formatDate(blog.writtenAt)}
                </time>
                <span>•</span>
                <span>{blog.readingTime} min read</span>
              </div>
            </div>

            {/* Cover Image */}
            {blog.coverImage && (
              <div className="relative aspect-[2/1] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
                <Image
                  src={blog.coverImage.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <Markup markup={blog.content} />

          {/* Footer */}
          <footer className="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium mb-1">Written by</h3>
                {blog.author === "Elomar" ? (
                  <div className="mt-3">
                    <BilingualLogoWithPen />
                  </div>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {blog.author}
                  </p>
                )}
              </div>
              <Link
                href="/blog"
                className="text-sm text-neutral-600 hover:text-primary"
              >
                Back to blog
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </Container>
  );
};

export default BlogDetailPage;
