import {
  API_ROUTES,
  ApiResponse,
  Blog,
  BlogResponse,
  GetBlogsQuery,
} from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { BLOGS } = API_ROUTES;

export type GetBlogsOptions = GetBlogsQuery & {
  fields?: string[];
};

export class BlogsClient extends BaseApiClient {
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
      // TODO: Uncomment this when we have caching working
      // cache: true,
      // etag,
    });
  }

  async create(data: Blog): Promise<ApiResponse<BlogResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to create blogs",
      };
    }

    return this.fetch<BlogResponse>(BLOGS.BASE, {
      method: "POST",
      body: data,
      protected: true,
    });
  }

  async update(
    slug: string,
    _etag: string,
    data: Partial<Blog>,
  ): Promise<ApiResponse<BlogResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to update blogs",
      };
    }

    return this.fetch<BlogResponse>(BLOGS.BY_SLUG(slug), {
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
        message: "Authentication required to delete blogs",
      };
    }

    return this.fetch<void>(BLOGS.BY_SLUG(slug), {
      method: "DELETE",
      protected: true,
      etag,
    });
  }
}

export const blogsClient = new BlogsClient();
