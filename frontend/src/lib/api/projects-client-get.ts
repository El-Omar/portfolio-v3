import {
  API_ROUTES,
  ApiResponse,
  GetProjectsQuery,
  ProjectResponse,
} from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";

const { PROJECTS } = API_ROUTES;

export type GetProjectsOptions = GetProjectsQuery & {
  fields?: string[];
};

/**
 * We are separating the public client to avoid dynamic server usage
 * with the cookies, as most pages are static.
 */
export class GetProjectsClient extends BaseApiClient {
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
    if (options.sort) params.sort = options.sort;
    if (options.asc !== undefined) params.asc = String(options.asc);

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
    });
  }
}

export const getProjectsClient = new GetProjectsClient();
