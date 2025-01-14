import { ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { getProjects } from "@/app/actions/projects";

const ProjectsListDetailed = async (): Promise<ReactElement> => {
  const projectsData = await getProjects();

  if (projectsData.status === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load projects</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projectsData.data.map((project) => (
        <Card
          key={project.slug}
          className="group hover:shadow-lg transition-shadow"
        >
          <Link href={`/projects/${project.slug}`}>
            <CardContent className="p-6 space-y-4">
              {project.imageUrl && (
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-300">
                {project.description.length > 150
                  ? `${project.description.substring(0, 150)}...`
                  : project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-full">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ProjectsListDetailed;
