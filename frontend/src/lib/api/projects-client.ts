import { ApiResponse, Project, API_ROUTES } from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { PROJECTS } = API_ROUTES;
export class ProjectsClient extends BaseApiClient {
  async getAll(): Promise<ApiResponse<Project[]>> {
    return this.fetch<ApiResponse<Project[]>>(PROJECTS.BASE, {
      method: "GET",
      next: { tags: ["projects"] },
    });
  }

  async getBySlug(slug: string): Promise<ApiResponse<Project>> {
    return this.fetch<ApiResponse<Project>>(PROJECTS.BY_SLUG(slug), {
      method: "GET",
    });
  }

  async create(data: Project): Promise<ApiResponse<Project>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to create projects");
    }

    return this.fetch<ApiResponse<Project>>(PROJECTS.BASE, {
      method: "POST",
      body: data,
      protected: true,
    });
  }

  async update(
    slug: string,
    data: Partial<Project>
  ): Promise<ApiResponse<Project>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to update projects");
    }

    return this.fetch<ApiResponse<Project>>(PROJECTS.BY_SLUG(slug), {
      method: "PATCH",
      body: data,
      protected: true,
    });
  }

  async delete(slug: string): Promise<ApiResponse<void>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      throw new Error("Authentication required to delete projects");
    }

    return this.fetch<ApiResponse<void>>(PROJECTS.BY_SLUG(slug), {
      method: "DELETE",
      protected: true,
    });
  }
}

export const projectsClient = new ProjectsClient();
