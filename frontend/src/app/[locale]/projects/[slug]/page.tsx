import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { getProjectBySlug } from "@/app/actions/projects";
import ProjectDetail from "@/components/projects/ProjectDetail";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const ProjectPage = async ({
  params,
}: ProjectPageProps): Promise<ReactElement> => {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug);

  if (projectData.status === "error" || !projectData.data) {
    notFound();
  }

  const project = projectData.data;

  return <ProjectDetail project={project} />;
};

export default ProjectPage;
