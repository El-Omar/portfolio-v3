import { ProjectResponse } from "@portfolio-v3/shared";
import { useMemo } from "react";
import ProjectColumn from "./ProjectColumn";
import Container from "@/components/ui/Container";

type Props = {
  projects: ProjectResponse[];
};

const ProjectsParallax = ({ projects }: Props) => {
  const columns = useMemo(() => {
    return projects.reduce((acc, project, i) => {
      const columnIndex = i % 2;
      acc[columnIndex] = [...(acc[columnIndex] || []), project];
      return acc;
    }, [] as ProjectResponse[][]);
  }, [projects]);

  return (
    <Container className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <ProjectColumn projects={columns[0]} speed={-0.3} firstColumn />
      <ProjectColumn projects={columns[1]} speed={0.6} />
    </Container>
  );
};

export default ProjectsParallax;
