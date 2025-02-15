"use client";

import { ProjectResponse } from "@portfolio-v3/shared";
import { useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ProjectCardAnimated from "./ProjectCardAnimated";

type Props = {
  projects: ProjectResponse[];
  speed?: number;
  firstColumn?: boolean;
};

const ProjectColumn = ({ projects, speed = 1, firstColumn = false }: Props) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: columnRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 1000]);

  return (
    <div ref={columnRef} className="flex flex-col">
      {projects.map((project, index) => (
        <ProjectCardAnimated
          key={project.slug}
          project={project}
          index={index}
          y={y}
          firstColumn={firstColumn}
        />
      ))}
    </div>
  );
};

export default ProjectColumn;
