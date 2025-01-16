import { env } from "@/config/env";
import { ApiResponse, AUTH } from "@portfolio-v3/shared";
import { cookies } from "next/headers";

export type RequestOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  next?: { tags: string[] };
  protected?: boolean;
  etag?: string;
  cache?: boolean;
  params?: Record<string, string>;
};

export abstract class BaseApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.API_URL;
  }

  protected async fetch<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<ApiResponse<T>> {
    let url = `${this.baseUrl}${endpoint}`;

    // Add query parameters if they exist
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const cookie = await cookies();
    const authToken = cookie.get(AUTH.KEY)?.value;

    if (options.protected && authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    if (options.etag) {
      if (options.method === "GET" && options.cache) {
        headers["If-None-Match"] = options.etag;
      } else if (["DELETE", "PATCH", "PUT"].includes(options.method)) {
        headers["If-Match"] = options.etag;
      }
    }

    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      ...(options.next && { next: options.next }),
    });

    // If we got a 304 Not Modified or 204 No Content, return null
    if (response.status === 304 || response.status === 204) {
      return {
        status: "success",
        data: null as T,
      };
    }

    if (!response.ok) {
      const error = await response.json();
      const errorsList = error.errors?.join(", ");
      return {
        status: "error",
        message: errorsList || error.message || "API call failed",
      };
    }

    return response.json();
  }
}
