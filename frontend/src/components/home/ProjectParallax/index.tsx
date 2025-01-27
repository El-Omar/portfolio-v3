import { ProjectResponse } from "@portfolio-v3/shared";
import ProjectColumn from "./ProjectColumn";

type Props = {
  projects: ProjectResponse[];
};

const ProjectsParallax = ({ projects }: Props) => {
  const columns = projects.reduce((acc, project, i) => {
    const columnIndex = i % 2;
    acc[columnIndex] = [...(acc[columnIndex] || []), project];
    return acc;
  }, [] as ProjectResponse[][]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <ProjectColumn projects={columns[0]} speed={-0.3} firstColumn />
        <ProjectColumn projects={columns[1]} speed={0.6} />
      </div>
    </div>
  );
};

export default ProjectsParallax;
