import Image from "next/image";
import { ReactElement } from "react";
import Paragraph from "../ui/Paragraph";
import Title from "../ui/Title";
import { getProjects } from "@/app/actions/projects";
import { Link } from "@/i18n/routing";
import { getYearMonthDay } from "@/lib/utils/dates";

const ProjectsListDetailed = async (): Promise<ReactElement> => {
  const response = await getProjects({
    published: true,
    sort: "startDate",
    asc: false,
  });

  if (response.status === "error") {
    return <div>Error loading projects</div>;
  }

  const projects = response.data || [];

  return (
    <div className="space-y-16 w-full pb-28">
      {projects?.map((project, index) => (
        <Link
          key={project._id}
          href={`/projects/${project.slug}`}
          className="group block"
        >
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 bg-neutral-100 dark:bg-neutral-900">
            {/* Project Image */}
            <div
              className={`${
                index % 2 === 1 ? "lg:order-2" : ""
              } relative aspect-[16/9] overflow-hidden border border-neutral-200 dark:border-neutral-800`}
            >
              {project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
              )}
            </div>

            {/* Project Info */}
            <div className="flex flex-col justify-center p-6 lg:p-12">
              {/* Year */}
              <span className="text-xl text-neutral-400 dark:text-neutral-400">
                {getYearMonthDay(project.startDate)[0]}
              </span>

              {/* Title & Description */}

              <Title className="md:text-3xl text-2xl mt-3 mb-3">
                {project.title}
              </Title>
              <Paragraph className="mb-4 ml-0">{project.description}</Paragraph>

              {/* Read More Link */}
              <div className="flex items-center gap-2 text-sm font-medium group/link pt-4 text-cool-red">
                <span className="uppercase tracking-wider">Read More</span>
                <span className="text-lg group-hover/link:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsListDetailed;
