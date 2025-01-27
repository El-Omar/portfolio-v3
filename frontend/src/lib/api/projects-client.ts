import {
  API_ROUTES,
  ApiResponse,
  GetProjectsQuery,
  Project,
  ProjectResponse,
} from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { PROJECTS } = API_ROUTES;

export type GetProjectsOptions = GetProjectsQuery & {
  fields?: string[];
};

export class ProjectsClient extends BaseApiClient {
  async getAll(
    options: GetProjectsOptions = {},
  ): Promise<ApiResponse<ProjectResponse[]>> {
    const params: Record<string, string> = {};

    if (options.featured !== undefined)
      params.featured = String(options.featured);
    if (options.published !== undefined)
      params.published = String(options.published);
    if (options.fields?.length) params.fields = options.fields.join(",");
    if (options.include !== undefined) params.include = String(options.include);
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);

    return this.fetch<ProjectResponse[]>(PROJECTS.BASE, {
      method: "GET",
      params,
      next: { tags: ["projects"] },
    });
  }

  async getBySlug(slug: string): Promise<ApiResponse<ProjectResponse>> {
    return this.fetch<ProjectResponse>(PROJECTS.BY_SLUG(slug), {
      method: "GET",
      next: { tags: ["projects"] },
      // TODO: Uncomment this when we have caching working
      // cache: true,
      // etag,
    });
  }

  async create(data: Project): Promise<ApiResponse<ProjectResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to create projects",
      };
    }

    return this.fetch<ProjectResponse>(PROJECTS.BASE, {
      method: "POST",
      body: data,
      protected: true,
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

    return this.fetch<ProjectResponse>(PROJECTS.BY_SLUG(slug), {
      method: "PATCH",
      body: data,
      protected: true,
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

    return this.fetch<void>(PROJECTS.BY_SLUG(slug), {
      method: "DELETE",
      protected: true,
      etag,
    });
  }
}

export const projectsClient = new ProjectsClient();
