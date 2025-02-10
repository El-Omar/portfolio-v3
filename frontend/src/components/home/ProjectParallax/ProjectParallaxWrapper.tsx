"use client";

import { ProjectResponse } from "@portfolio-v3/shared";
import { ReactElement } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsParallax from ".";
import Container from "@/components/ui/Container";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

type Props = {
  projects: ProjectResponse[];
};

const ProjectParallaxWrapper = ({ projects }: Props): ReactElement => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return <ProjectsParallax projects={projects} />;
  }

  return (
    <Container className="grid grid-cols-1 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </Container>
  );
};

export default ProjectParallaxWrapper;
