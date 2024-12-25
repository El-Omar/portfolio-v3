"use server";

import { revalidatePath } from "next/cache";
import { env } from "@/config/env";
import { Project, ProjectCreate, ProjectsResponse } from "@/types/Project";

export async function getProjects(): Promise<ProjectsResponse> {
  try {
    const res = await fetch(`${env.API_URL}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["projects"] }, // For revalidation
    });

    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load projects");
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const res = await fetch(`${env.API_URL}/projects/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to load project");
  }
}

export async function createProject(data: ProjectCreate) {
  try {
    const res = await fetch(`${env.API_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create project");

    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create project");
  }
}

export async function updateProject(id: string, data: Partial<Project>) {
  try {
    const res = await fetch(`${env.API_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update project");

    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update project");
  }
}

export async function deleteProject(id: string) {
  try {
    const res = await fetch(`${env.API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to delete project");

    revalidatePath("/admin/dashboard/projects");
    revalidatePath("/");
    return res.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete project");
  }
}
