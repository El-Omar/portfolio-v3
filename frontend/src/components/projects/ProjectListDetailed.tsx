import { ReactElement } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getProjects } from "@/app/actions/projects";
import MasonryLayout from "@/components/ui/MasonryLayout";

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const aspectRatios = [
    "aspect-[4/3]",
    "aspect-[3/4]",
  ];
  const aspectRatio = aspectRatios[index % aspectRatios.length];

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="space-y-4">
        {project.imageUrl && (
          <div
            className={`relative ${aspectRatio} overflow-hidden bg-neutral-100 flex items-center justify-center `}
          >
            <div className="absolute inset-0 bg-neutral-200 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="relative h-[calc(100%_-_0rem)] w-[calc(100%_-_0rem)]">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 duration-300"
              />
            </div>
          </div>
        )}
        <div className="space-y-2 text-center">
          <h2 className="font-medium">{project.title}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>
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
