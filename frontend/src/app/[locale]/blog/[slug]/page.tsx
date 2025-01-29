import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { getBlogBySlug } from "@/app/actions/blogs";
import BilingualLogoWithPen from "@/components/ui/BilingualLogoWithPen";
import Container from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/dates";
import { fontSpectral } from "@/lib/utils/fonts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const BackButton = () => (
  <Link href="/blog" className="group inline-flex items-center gap-3">
    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    <span className="text-sm text-neutral-600 hover:text-primary">
      Back to articles
    </span>
  </Link>
);

const BlogDetailPage = async ({ params }: Props): Promise<ReactElement> => {
  const pars = await params;
  const response = await getBlogBySlug(pars.slug);

  if (response.status === "error" || !response.data) {
    notFound();
  }

  const blog = response.data;

  return (
    <Container>
      <div className="py-12">
        <BackButton />
      </div>
      <article
        className={cn(
          "w-full py-28 bg-neutral-50 mb-12 lg:mb-24",
          fontSpectral.variable,
        )}
      >
        <div className="max-w-[728px] mx-auto">
          {/* Header */}
          <header className="space-y-8 mb-6">
            <div className="space-y-4">
              {/* Title */}
              <h1 className="text-4xl font-bold">{blog.title}</h1>

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
          <div
            className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-xl
            prose-h2:mb-2 prose-h2:mt-6 prose-h3:mb-1 prose-h3:mt-4
            prose-p:text-neutral-900 dark:prose-p:text-neutral-500
            prose-p:text-[19px] prose-p:leading-relaxed
            prose-p:font-spectral
            [&>blockquote:not(.pull-quote)]:border-l-4 [&>blockquote:not(.pull-quote)]:border-cool-red
            [&>blockquote:not(.pull-quote)]:pl-6 [&>blockquote:not(.pull-quote)]:font-baskerville
            [&>blockquote:not(.pull-quote)]:not-italic [&>blockquote:not(.pull-quote)_p]:before:content-none
            [&>blockquote:not(.pull-quote)_p]:after:content-none
            [&>ul>li>p:last-child]:m-0
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
            prose-code:text-primary prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-800
            prose-img:rounded-lg prose-img:border prose-img:border-neutral-200 dark:prose-img:border-neutral-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

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
