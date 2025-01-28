import { BlogResponse } from "@portfolio-v3/shared";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/dates";

type Props = {
  blog: BlogResponse;
};

const BlogCard = ({ blog }: Props): ReactElement => {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        {blog.coverImage ? (
          <Image
            src={blog.coverImage.url}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-neutral-100" />
        )}

        {/* Arrow Icon */}
        <div
          className="absolute top-4 right-4 p-2 
          bg-neutral-900/90 dark:bg-neutral-800/90 
          rounded-full opacity-0 translate-y-2 group-hover:opacity-100 
          group-hover:translate-y-0 transition-all duration-300
          border border-neutral-800/20 dark:border-neutral-700/50"
        >
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 p-4 bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center gap-2">
          <time className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {formatDate(blog.writtenAt)}
          </time>
          <div className="flex gap-2">
            {blog.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-lg font-medium group-hover:text-cool-red transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {blog.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{blog.readingTime} min read</span>
          {blog.author && (
            <>
              <span>•</span>
              <span>{blog.author}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
