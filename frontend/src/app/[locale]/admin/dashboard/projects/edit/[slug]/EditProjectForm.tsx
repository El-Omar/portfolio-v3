"use client";

import { ApiResponse, Project, ProjectResponse } from "@portfolio-v3/shared";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateProject } from "@/app/actions/projects";
import { useRouter } from "@/i18n/routing";
import ProjectForm from "../../ProjectForm";

type Props = {
  project: ProjectResponse;
};

const EditProjectForm = ({ project }: Props) => {
  const router = useRouter();
  const [result, onSubmit, isPending] = useActionState<
    ApiResponse<ProjectResponse> | Project | null,
    FormData
  >(async (previousState, formData) => {
    const response = await updateProject(previousState, formData, project);

    if (response.status === "error") {
      toast.error(response.message);
      return response;
    }

    toast.success("Project updated successfully");
    router.push("/admin/dashboard/projects");
    router.refresh();

    return response;
  }, null);

  const error = (() => {
    if (result && "status" in result && result.status === "error") {
      const msg =
        result.errors?.join(", ") ||
        result.message ||
        "Some unknown error happened";
      return msg;
    }
    return "";
  })();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Project</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProjectForm
        onSubmit={onSubmit}
        isPending={isPending}
        project={project}
      />
    </div>
  );
};

export default EditProjectForm;
