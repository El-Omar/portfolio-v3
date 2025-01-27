import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ReactElement } from "react";
import { Link } from "@/i18n/routing";

const BlogCard = (): ReactElement => {
  return (
    <Link
      href="/blog/post-slug"
      className="group flex flex-col overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
        <Image
          alt="Blog post thumbnail"
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

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
            March 15, 2024
          </time>
          <span className="text-xs px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded">
            Design Systems
          </span>
        </div>

        <h3 className="text-lg font-medium group-hover:text-cool-red transition-colors duration-300">
          Building scalable design systems
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
          Learn how to create and maintain a design system that grows with your
          product. Well cover component architecture, documentation, and team
          collaboration.
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
