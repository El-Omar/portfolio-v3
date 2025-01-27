import { ProjectResponse } from "@portfolio-v3/shared";
import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";

type Props = {
  project: ProjectResponse;
  index: number;
  y: MotionValue<number>;
  firstColumn?: boolean;
};

const ProjectCard = ({ project, index, y, firstColumn = false }: Props) => {
  const correctIndex = firstColumn ? index * 2 + 1 : index * 2 + 2;
  const displayNumber = correctIndex.toString().padStart(2, "0");

  return (
    <motion.div
      style={{ y }}
      className="
        opacity-0
        intersect-half intersect-once intersect:motion-opacity-out-100
        relative w-full mb-8 sm:mb-16 lg:mb-32 last:mb-0
        first:mt-[10vh] lg:first:mt-[10vh]
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
          {/* Project Number */}
          <div className="absolute -left-4 -top-12 z-10 hidden md:block">
            <span className="text-4xl sm:text-5xl lg:text-7xl font-bold text-primary z-10">
              {displayNumber}
            </span>
          </div>

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
    </motion.div>
  );
};

export default ProjectCard;
