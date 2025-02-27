import {
  API_ROUTES,
  ApiResponse,
  Project,
  ProjectResponse,
} from "@portfolio-v3/shared";
import { GetProjectsClient } from "./projects-client-get";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { PROJECTS } = API_ROUTES;

export class ProjectsClient extends GetProjectsClient {
  async create(data: Project): Promise<ApiResponse<ProjectResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to create projects",
      };
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<ProjectResponse>(PROJECTS.BASE, {
      method: "POST",
      body: data,
      headers,
    });
  }

  async update(
    slug: string,
    _etag: string,
    data: Partial<Project>,
  ): Promise<ApiResponse<ProjectResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to update projects",
      };
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<ProjectResponse>(PROJECTS.BY_SLUG(slug), {
      method: "PATCH",
      body: data,
      headers,
      etag: _etag,
    });
  }

  async delete(slug: string, etag: string): Promise<ApiResponse<void>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to delete projects",
      };
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<void>(PROJECTS.BY_SLUG(slug), {
      method: "DELETE",
      headers,
      etag,
    });
  }
}

export const projectsClient = new ProjectsClient();
