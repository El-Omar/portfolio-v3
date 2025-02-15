import { ProjectResponse } from "@portfolio-v3/shared";
import Image from "next/image";
import { Link } from "@/i18n/routing";

type Props = {
  project: ProjectResponse;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <article
      className="
        relative w-full mb-8 sm:mb-16 lg:mb-32 last:mb-10
      "
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className="
            absolute -left-5 -top-10 opacity-50
            hidden md:block md:w-24 md:h-24 
            rounded-full bg-gold-dark
            mb-3
          "
        />
        <div className="group relative">
          <div
            className="
              relative w-full aspect-[16/9]
              rounded-lg overflow-hidden
              transition duration-500 ease-in-out
              shadow-xl
            "
          >
            {project.imageUrl && (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
