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
    options: {
      method: string;
      body?: unknown;
      protected?: boolean;
      headers?: Record<string, string>;
      next?: NextFetchRequestConfig;
    }
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const cookie = await cookies();
    const authToken = cookie.get(AUTH.KEY)?.value;

    if (options.protected && authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      ...(options.next && { next: options.next }),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const error = await response.json();
      const errorsList = error.errors?.join(", ");
      throw new Error(errorsList || error.message || "API call failed");
    }

    return response.json();
  }
}
