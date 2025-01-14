"use client";

import { ReactElement, useActionState } from "react";
import ProjectForm from "../ProjectForm";
import { ApiResponse, Project, ProjectResponse } from "@portfolio-v3/shared";
import { createProject } from "@/app/actions/projects";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

const NewProjectPage = (): ReactElement => {
  const router = useRouter();
  const [result, onSubmit, isPending] = useActionState<
    ApiResponse<ProjectResponse> | Project | null,
    FormData
  >(async (previousState, formData) => {

    const result = await createProject(previousState, formData);

    if (result?.status === "error") {
      const error = result.message || "Failed to create project";
      toast.error(error);
      return result;
    }

    toast.success("Project created successfully");
    router.push("/admin/dashboard/projects");
    return result;
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
      <h1 className="text-3xl font-bold">New Project</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ProjectForm onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
};

export default NewProjectPage;
