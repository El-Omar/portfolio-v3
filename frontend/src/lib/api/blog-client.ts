import {
  API_ROUTES,
  ApiResponse,
  Blog,
  BlogResponse,
} from "@portfolio-v3/shared";
import { GetBlogsClient } from "./blog-client-get";
import { verifyAuth } from "@/lib/auth/verifyAuth";

const { BLOGS } = API_ROUTES;
export class BlogsClient extends GetBlogsClient {
  async create(data: Blog): Promise<ApiResponse<BlogResponse>> {
    const auth = await verifyAuth();
    if (!auth.success) {
      return {
        status: "error",
        message: "Authentication required to create blogs",
      };
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<BlogResponse>(BLOGS.BASE, {
      method: "POST",
      body: data,
      headers,
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

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<BlogResponse>(BLOGS.BY_SLUG(slug), {
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
        message: "Authentication required to delete blogs",
      };
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    return this.fetch<void>(BLOGS.BY_SLUG(slug), {
      method: "DELETE",
      headers,
      etag,
    });
  }
}

export const blogsClient = new BlogsClient();
