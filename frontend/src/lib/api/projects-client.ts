import { ApiResponse, Project } from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

export class ProjectsClient extends BaseApiClient {
  async getAll(): Promise<ApiResponse<Project[]>> {
    return this.fetch<ApiResponse<Project[]>>("/projects", {
      method: "GET",
      next: { tags: ["projects"] },
    });
  }

  async getBySlug(slug: string): Promise<ApiResponse<Project>> {
    return this.fetch<ApiResponse<Project>>(`/projects/${slug}`, {
      method: "GET",
    });
  }

  async create(data: Project): Promise<ApiResponse<Project>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to create projects");
    }

    return this.fetch<ApiResponse<Project>>("/projects", {
      method: "POST",
      body: data,
      protected: true,
    });
  }

  async update(
    id: string,
    data: Partial<Project>
  ): Promise<ApiResponse<Project>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to update projects");
    }

    return this.fetch<ApiResponse<Project>>(`/projects/${id}`, {
      method: "PATCH",
      body: data,
      protected: true,
    });
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to delete projects");
    }

    return this.fetch<ApiResponse<void>>(`/projects/${id}`, {
      method: "DELETE",
      protected: true,
    });
  }
}

export const projectsClient = new ProjectsClient();
