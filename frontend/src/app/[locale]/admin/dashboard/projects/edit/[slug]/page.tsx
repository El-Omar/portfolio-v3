import { ReactElement } from "react";
import { getProjectBySlug } from "@/app/actions/projects";
import EditProjectForm from "./EditProjectForm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const EditProjectPage = async ({ params }: Props): Promise<ReactElement> => {
  const pars = await params;
  const projectData = await getProjectBySlug(pars.slug);

  if (projectData.status === "error" || !projectData.data) {
    notFound();
  }

  return <EditProjectForm project={projectData.data} />;
};

export default EditProjectPage; 