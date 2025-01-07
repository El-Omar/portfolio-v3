import { env } from "@/config/env";
import { AUTH } from "@portfolio-v3/shared";
import { cookies } from "next/headers";

export type RequestOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  next?: { tags: string[] };
  protected?: boolean;
};

export class BaseApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.API_URL;
  }

  protected async fetch<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add auth token for protected routes
    if (options.protected) {
      const cookie = await cookies();
      const token = cookie.get(AUTH.KEY);

      if (!token) {
        throw new Error("Authentication required");
      }

      headers["Authorization"] = `Bearer ${token.value}`;
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      ...(options.body && { body: JSON.stringify(options.body) }),
      ...(options.next && { next: options.next }),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }
}
