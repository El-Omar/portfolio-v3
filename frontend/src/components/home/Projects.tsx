import { getProjects } from "@/app/actions/projects";
import Image from "next/image";
import { ReactElement } from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";

const Projects = async (): Promise<ReactElement> => {
  const response = await getProjects({ published: true });

  if (response.status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

  const projects = response.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className={`group relative flex flex-col justify-stretch overflow-hidden
            ${i === 0 ? "lg:col-span-2 row-span-2" : ""}`}
        >
          {/* Image Container */}
          <div
            className={`relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 ${
              i === 0 ? "h-full" : ""
            }`}
          >
            {project.imageUrl && (
              <Image
                fill
                src={project.imageUrl}
                alt={project.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

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
          <div className="space-y-2 p-4 bg-neutral-800 border-t border-neutral-800/50 dark:border-neutral-700/50">
            <h3 className="text-lg font-medium text-white group-hover:text-cool-red transition-colors duration-300">
              {project.title}
            </h3>
            {i === 0 && (
              <p className="text-sm text-neutral-300 line-clamp-2">
                {project.description}
              </p>
            )}
            <div className="flex gap-2 flex-wrap">
              {project.technologies?.slice(0, 4).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 
                    bg-neutral-600/50 
                    text-neutral-300 dark:text-neutral-400 rounded
                    border border-neutral-700/50 dark:border-neutral-600/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
