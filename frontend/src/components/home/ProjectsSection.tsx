"use client";

import { ProjectResponse } from "@portfolio-v3/shared";
import SectionTransition from "./SectionTransition";
import ProjectsParallax from "@/components/home/ProjectParallax";
import ParallaxTitleSection from "../ui/ParallaxTitleSection";

const ProjectsSection = ({ projects }: { projects: ProjectResponse[] }) => {
  return (
    <ParallaxTitleSection
      className="w-full mt-40 bg-neutral-100 overflow-clip"
      contentClassName="mt-[30vh]"
      title={
        <SectionTransition
          title="Showcasing"
          titleAccent="projects"
          subtitle="I've worked"
          subtitleAccent="on"
          align="center"
          className="py-0"
        />
      }
    >
      <ProjectsParallax projects={projects} />
    </ParallaxTitleSection>
  );
};

export default ProjectsSection;
