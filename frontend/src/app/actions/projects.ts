"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, Project } from "@portfolio-v3/shared";
import { projectsClient } from "@/lib/api/projects-client";
import { uploadClient } from "@/lib/api/upload-client";

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

export async function createProject(prevState: unknown, formData: FormData) {
  try {
    const projectData = Object.fromEntries(formData.entries()) as unknown as Project;
    const imageFile = formData.get('image') as File;

    // If image is provided, upload it first
    if (imageFile && imageFile.size > 0) {
      const imageUrl = await uploadClient.uploadFile(imageFile);
      projectData.imageUrl = imageUrl;
    }

    const response = await projectsClient.create(projectData);
    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create project");
  }
}

export async function updateProject(slug: string, formData: FormData) {
  try {
    const projectData = Object.fromEntries(formData.entries()) as unknown as Partial<Project>;
    const imageFile = formData.get('image') as File;

    // If new image is provided, upload it first
    if (imageFile && imageFile.size > 0) {
      const imageUrl = await uploadClient.uploadFile(imageFile);
      projectData.imageUrl = imageUrl;
    }

    const response = await projectsClient.update(slug, projectData);
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
