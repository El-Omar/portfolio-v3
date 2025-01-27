import { ApiResponse, LoginResponse } from "@portfolio-v3/shared";
import { BaseApiClient } from "./base-client";
import { env } from "@/config/env";

export class AuthClient extends BaseApiClient {
  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<LoginResponse>> {
    const endpoint = `/${env.CMS_ADMIN_PATH}/auth/login`;

    try {
      const response = await this.fetch<LoginResponse>(endpoint, {
        method: "POST",
        body: { email, password },
      });

      if (response.status !== "success") {
        return {
          status: "error",
          message: response.message || "Failed to login",
        };
      }

      return {
        status: "success",
        data: response.data,
      };
    } catch (error) {
      return {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to login",
      };
    }
  }
}

export const authClient = new AuthClient();
