import { BlogResponse } from "@portfolio-v3/shared";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/dates";

type Props = {
  blog: BlogResponse;
};

const BlogCard = ({ blog }: Props): ReactElement => {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        {blog.coverImage ? (
          <>
            <Image
              src={blog.coverImage.url}
              alt={blog.title}
              fill
              className="object-cover"
            />
            {/* Colored Overlay */}
            <div
              className="absolute inset-0 backdrop-grayscale-[0.5]
              transition-opacity duration-500 ease-out
              group-hover:opacity-0"
            />
          </>
        ) : (
          <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
        )}

        {/* Arrow Icon */}
        <div
          className="absolute top-4 right-4 p-2 
          bg-white/90 dark:bg-neutral-900/90 
          rounded-full opacity-0 translate-y-2 group-hover:opacity-100 
          group-hover:translate-y-0 transition-all duration-300
          shadow-sm z-10"
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 py-3">
        {/* Meta info */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <time className="tracking-wider">{formatDate(blog.writtenAt)}</time>
          <span>{blog.readingTime} min read</span>
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-1">
            {blog.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
            {blog.description}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {blog.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
