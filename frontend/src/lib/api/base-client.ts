import { env } from "@/config/env";

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

    const fetchOptions: RequestInit = {
      method: options.method,
      headers,
      credentials: options.protected ? "include" : "same-origin",
      body: options.body ? JSON.stringify(options.body) : undefined,
      ...(options.next && { next: options.next }),
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API call failed");
    }

    return response.json();
  }
}
