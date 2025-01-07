"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, Project } from "@portfolio-v3/shared";
import { projectsClient } from "@/lib/api/projects-client";

export async function getProjects(): Promise<ApiResponse<Project[]>> {
  try {
    return await projectsClient.getAll();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load projects");
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await projectsClient.getBySlug(slug);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load project");
  }
}

export async function createProject(prevState: unknown, data: Project) {
  try {
    const response = await projectsClient.create(data);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create project");
  }
}

export async function updateProject(id: string, data: Partial<Project>) {
  try {
    const response = await projectsClient.update(id, data);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update project");
  }
}

export async function deleteProject(id: string) {
  try {
    const response = await projectsClient.delete(id);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete project");
  }
}
