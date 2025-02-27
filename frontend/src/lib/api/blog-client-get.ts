import {
  API_ROUTES,
  ApiResponse,
  BlogResponse,
  GetBlogsQuery,
} from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";

const { BLOGS } = API_ROUTES;

export type GetBlogsOptions = GetBlogsQuery & {
  fields?: string[];
};

/**
 * We are separating the public client to avoid dynamic server usage
 * with the cookies, as most pages are static.
 */
export class GetBlogsClient extends BaseApiClient {
  async getAll(
    options: GetBlogsOptions = {},
  ): Promise<ApiResponse<BlogResponse[]>> {
    const params: Record<string, string> = {};

    if (options.featured !== undefined)
      params.featured = String(options.featured);
    if (options.status) params.status = options.status;
    if (options.category) params.category = options.category;
    if (options.tag) params.tag = options.tag;
    if (options.author) params.author = options.author;
    if (options.search) params.search = options.search;
    if (options.startDate) params.startDate = options.startDate;
    if (options.endDate) params.endDate = options.endDate;
    if (options.orderBy) params.orderBy = options.orderBy;
    if (options.orderDirection) params.orderDirection = options.orderDirection;
    if (options.fields?.length) params.fields = options.fields.join(",");
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);

    return this.fetch<BlogResponse[]>(BLOGS.BASE, {
      method: "GET",
      params,
      next: { tags: ["blogs"] },
    });
  }

  async getBySlug(slug: string): Promise<ApiResponse<BlogResponse>> {
    return this.fetch<BlogResponse>(BLOGS.BY_SLUG(slug), {
      method: "GET",
      next: { tags: ["blogs"] },
    });
  }
}

export const getBlogsClient = new GetBlogsClient();
