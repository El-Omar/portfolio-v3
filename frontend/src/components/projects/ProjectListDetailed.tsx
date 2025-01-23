import { ReactElement } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getProjects } from "@/app/actions/projects";
import MasonryLayout from "@/components/ui/MasonryLayout";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const aspectRatios = ["aspect-[4/3]", "aspect-[3/4]"];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block shadow-xl rounded-xl overflow-hidden"
    >
      <div className="space-y-4">
        {project.imageUrl && (
          <div className={`relative ${aspectRatio}`}>
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="py-4 text-center">
          <h2 className="font-medium text-lg text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-full
                    bg-neutral-100 dark:bg-neutral-800/50
                    text-neutral-600 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProjectsListDetailed = async (): Promise<ReactElement> => {
  const projectsData = await getProjects({ published: true });

  if (projectsData.status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

  return (
    <MasonryLayout
      columns={{ default: 1, md: 2, lg: 3 }}
      gap="gap-8"
      className="max-w-[1400px]"
    >
      {projectsData.data.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </MasonryLayout>
  );
};

export default ProjectsListDetailed;
